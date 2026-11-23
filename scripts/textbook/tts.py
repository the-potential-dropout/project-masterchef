"""Adds the read-aloud player (browser Web Speech API, no network) to a built textbook page.
Usage: python3 tts.py file.html [file.html …]  (safe to run twice: it replaces its own earlier copy)."""
import re, sys

CSS = r"""<style id="tts-css">
/* read aloud */
.stage{padding-bottom:180px}
#tts{position:fixed;right:max(2vw,12px);bottom:74px;z-index:55;display:flex;align-items:center;gap:6px;flex-wrap:wrap;background:#1b2230;color:#fff;border-radius:18px;padding:6px 8px;box-shadow:0 10px 30px #0004;font:500 14px/1.2 system-ui,sans-serif;max-width:calc(100vw - 24px)}
body.mapm #tts{bottom:14px}
#tts button,#tts select{font:inherit;color:#fff;background:#ffffff1a;border:1px solid #ffffff33;border-radius:12px;min-height:38px;padding:0 10px;cursor:pointer}
#tts select{max-width:190px;padding-right:6px}
#tts select option{color:#1b2230;background:#fff}
#tts button:hover,#tts select:hover{background:#ffffff2e}
#tts button:focus-visible,#tts select:focus-visible{outline:3px solid #ffd27a;outline-offset:1px}
#tts #ttsplay{background:#ffd27a;color:#1b2230;border-color:#ffd27a;font-weight:700;min-width:92px}
#tts .ttsst{padding:0 4px;color:#ffffffcc;font-size:13px;white-space:nowrap}
#tts label{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.tts-r{cursor:pointer;border-radius:8px;transition:background-color .2s,box-shadow .2s}
.tts-r:hover{background-color:color-mix(in srgb,var(--acc,#2b74b8) 8%,transparent)}
.tts-cur,.tts-cur:hover{background-color:color-mix(in srgb,#ffd27a 55%,transparent);box-shadow:0 0 0 4px color-mix(in srgb,#ffd27a 55%,transparent)}
tr.tts-cur td,tr.tts-cur th{background-color:color-mix(in srgb,#ffd27a 55%,transparent)}
@media(max-width:700px){#tts{left:10px;right:10px;bottom:70px;flex-wrap:nowrap;justify-content:center;gap:5px;padding:5px 6px}#tts .t,#tts .ttsst{display:none}#tts #ttsplay{min-width:52px}#tts button,#tts select{padding:0 8px}#tts #ttsvoice{flex:1;max-width:none;width:0}.pill{bottom:128px}}
@media(prefers-reduced-motion:reduce){.tts-r{transition:none}}
</style>"""

HTML = """<div id="tts" role="region" aria-label="Read aloud"><button type="button" id="ttsplay" aria-label="Play">▶<span class="t"> Play</span></button><button type="button" id="ttsstop" aria-label="Stop">■<span class="t"> Stop</span></button><label for="ttsrate">Speed</label><select id="ttsrate" title="Speed"><option value="0.75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option></select><label for="ttsvoice">Voice</label><select id="ttsvoice" title="Voice"><option value="">Default voice</option></select><span class="ttsst" id="ttsst" aria-live="polite">Read aloud</span></div>"""

JS = r"""
// ---- read aloud: browser speech synthesis, works offline ----
{const SS=window.speechSynthesis,bar=document.getElementById('tts');
if(!SS||typeof SpeechSynthesisUtterance=='undefined'){bar.remove()}else{
 try{SS.cancel()}catch(e){}
 const SKIP='.viz,button,.acts,.toc,.meta,.hint,pre,code,svg,[hidden],[aria-hidden="true"]',SEL='h1,h2,h3,p,li,tr';
 const clean=s=>s.replace(/\s+/g,' ').replace(/\s+([,.;:!?])/g,'$1').trim();
 const strip=el=>{const c=el.cloneNode(true);c.querySelectorAll('.cite,.cites,button,svg,.bmk,sup,pre,code').forEach(x=>x.remove());return clean(c.textContent)};
 const text=el=>{if(el.tagName!='TR')return strip(el);if(el.closest('thead'))return '';const t=el.closest('table'),hs=t?[...t.querySelectorAll('thead th')].map(strip):[];
  const cs=[...el.children].map(strip);const first=cs.shift()||'';const rest=cs.map((c,k)=>c&&(hs[k+1]?hs[k+1]+' '+c:c)).filter(Boolean);return first+(rest.length?': '+rest.join('; '):'')+'.'};
 const items=[];
 secs.forEach((s,si)=>s.querySelectorAll(SEL).forEach(el=>{if(el.closest(SKIP)||el.style.display=='none')return;for(let a=el.parentElement;a&&a!==s;a=a.parentElement)if(a.matches(SEL))return;
  const t=clean(text(el));if(!/[A-Za-z0-9]/.test(t))return;el.classList.add('tts-r');el.dataset.tts=items.length;items.push({el,si,text:t})}));
 const MAX=180;
 const chunk=t=>{const out=[];let buf='';for(let s of t.split(/(?<=[.!?…:;])\s+/)){s=s.trim();if(!s)continue;
   while(s.length>MAX){let k=s.lastIndexOf(', ',MAX);if(k<60)k=s.lastIndexOf(' ',MAX);if(k<30)k=MAX;out.push(s.slice(0,k+1).trim());s=s.slice(k+1).trim()}
   if(buf&&(buf+' '+s).length>MAX){out.push(buf);buf=s}else buf=buf?buf+' '+s:s}
  if(buf)out.push(buf);return out};
 const $p=document.getElementById('ttsplay'),$st=document.getElementById('ttsst'),$rate=document.getElementById('ttsrate'),$voice=document.getElementById('ttsvoice');
 const store=(k,v)=>{try{localStorage.setItem('tts-'+k,v)}catch(e){}};
 const load=k=>{try{return localStorage.getItem('tts-'+k)}catch(e){return null}};
 let st='idle',idx=0,ci=0,chunks=[],tok=0,rate=+(load('rate')||1),voice=null,started=0,lastEl=null;
 if([...$rate.options].some(o=>+o.value==rate))$rate.value=String(rate);else rate=1;
 function fillVoices(){const vs=SS.getVoices();if(!vs.length)return;const lang=(document.documentElement.lang||'en').toLowerCase().slice(0,2),want=load('voice');
  const sorted=[...vs].sort((a,b)=>(b.lang.toLowerCase().startsWith(lang)-a.lang.toLowerCase().startsWith(lang))||(b.default-a.default)||a.name.localeCompare(b.name));
  $voice.innerHTML='<option value="">Default voice</option>'+sorted.map(v=>`<option value="${v.voiceURI.replace(/"/g,'&quot;')}">${v.name.replace(/</g,'&lt;')} (${v.lang})</option>`).join('');
  voice=sorted.find(v=>v.voiceURI==want)||null;$voice.value=voice?voice.voiceURI:''}
 fillVoices();if(SS.addEventListener)SS.addEventListener('voiceschanged',fillVoices);else SS.onvoiceschanged=fillVoices;
 function ui2(){const playing=st=='playing';$p.innerHTML=playing?'❚❚<span class="t"> Pause</span>':'▶<span class="t"> Play</span>';$p.setAttribute('aria-label',playing?'Pause':'Play');
  $st.textContent=st=='idle'?'Read aloud':`${playing?'Reading':'Paused'} · p.${items[idx]?items[idx].si+1:''}`}
 function view(el){const r=el.getBoundingClientRect();if(r.top<90||r.bottom>innerHeight-150)el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'})}
 function mark(it){if(lastEl)lastEl.classList.remove('tts-cur');lastEl=it.el;it.el.classList.add('tts-cur');if(mode=='map')return;
  if(it.si!==cur){goTo(it.si);setTimeout(()=>view(it.el),mode=='book'?650:160)}else view(it.el)}
 function next(){if(st!='playing')return;
  while(idx<items.length&&!chunks.length){chunks=chunk(items[idx].text);ci=0;if(!chunks.length)idx++}
  if(idx>=items.length){stop();return}
  if(ci===0||!lastEl||lastEl!==items[idx].el)mark(items[idx]);
  if(ci>=chunks.length){idx++;chunks=[];next();return}
  const u=new SpeechSynthesisUtterance(chunks[ci]);u.rate=rate;u.lang=voice?voice.lang:(document.documentElement.lang||'en');if(voice)u.voice=voice;
  const my=++tok;u.onstart=()=>{if(my===tok)started=Date.now()};
  u.onend=()=>{if(my!==tok)return;ci++;next()};
  u.onerror=e=>{if(my!==tok||e.error=='interrupted'||e.error=='canceled')return;ci++;next()};
  started=Date.now();SS.speak(u);ui2()}
 // some browsers drop an utterance without firing end: move on if nothing is speaking
 setInterval(()=>{if(st=='playing'&&!SS.speaking&&!SS.pending&&Date.now()-started>2500){tok++;ci++;next()}},1000);
 function restart(){tok++;SS.cancel();setTimeout(next,80)}
 function startAt(i){idx=Math.max(0,Math.min(items.length-1,i));chunks=[];ci=0;st='playing';if(lastEl)lastEl.classList.remove('tts-cur');lastEl=null;restart();ui2()}
 function pause(){st='paused';tok++;SS.cancel();ui2()}
 function stop(){st='idle';tok++;SS.cancel();chunks=[];ci=0;if(lastEl)lastEl.classList.remove('tts-cur');lastEl=null;ui2()}
 $p.onclick=()=>{if(st=='playing')pause();else if(st=='paused'){st='playing';restart();ui2()}else{const f=items.findIndex(x=>x.si>=cur);startAt(f<0?0:f)}};
 document.getElementById('ttsstop').onclick=stop;
 $rate.onchange=()=>{rate=+$rate.value;store('rate',rate);if(st=='playing')restart()};
 $voice.onchange=()=>{voice=SS.getVoices().find(v=>v.voiceURI==$voice.value)||null;store('voice',$voice.value);if(st=='playing')restart()};
 document.addEventListener('click',e=>{const r=e.target.closest('.tts-r');if(!r||e.target.closest('a,button,.term,.cite,input,select,label,.viz'))return;
  const sel=window.getSelection&&getSelection();if(sel&&!sel.isCollapsed&&String(sel).trim())return;startAt(+r.dataset.tts)});
 const off=()=>{tok++;try{SS.cancel()}catch(e){}};addEventListener('pagehide',off);addEventListener('beforeunload',off);
 ui2()}}
"""

def inject(path):
    s = open(path).read()
    s = re.sub(r'<style id="tts-css">.*?</style>', '', s, flags=re.S)
    s = re.sub(r'<div id="tts" role="region".*?</div>', '', s, flags=re.S)
    s = re.sub(r'\n// ---- read aloud: browser speech synthesis.*?ui2\(\)\}\}\n', '\n', s, flags=re.S)
    i = s.index('</head>'); s = s[:i] + CSS + s[i:]
    i = s.index('<div class="pill" id="pill">'); s = s[:i] + HTML + '\n' + s[i:]
    i = s.rindex('}</script>'); s = s[:i] + JS + s[i:]
    open(path, 'w').write(s)

if __name__ == '__main__':
    for p in sys.argv[1:]:
        inject(p); print('read-aloud added:', p)
