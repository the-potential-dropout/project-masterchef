import json, re, math, sys, html
import os
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from book_core import CORE, DEEP
from book_end import END, REFS, G

SRC = json.load(open(sys.argv[1]))
F = SRC['facts']
TB = {p['id']: p for p in SRC['textbook']}
LIVE = 'https://the-potential-dropout.github.io/project-masterchef/'

def slug(s):
    s = s.lower().replace('ʻ', '')
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')

def short(t, n=24):
    t = re.split(r'[,(]', t)[0].strip()
    if len(t) <= n: return t
    w = t.split(); o = ''
    for x in w:
        if len(o) + len(x) + 1 > n: break
        o = (o + ' ' + x).strip()
    return o or t[:n]

# ---------- atlas ----------
def parse_region(c):
    b = c['blocks']; lead = b[0]; recipes = []; related = False; kitchens = []; extra = []
    i = 1
    while i < len(b):
        x = b[i]
        if isinstance(x, dict) and 'recipes' in x and not kitchens: recipes = x['recipes']
        elif isinstance(x, dict) and x.get('h') == 'Practise the techniques in the app': related = True
        elif isinstance(x, dict) and 'table' in x:
            name = b[i-1]['h']; t = dict(x['table'])
            k = {'name': name, 'base': t['Flavour base'], 'pantry': t['Pantry'], 'tech': t['Techniques'].split('; '), 'dishes': [], 'warn': None, 'tip': None}
            kitchens.append(k)
        elif isinstance(x, dict) and 'steps' in x and kitchens: kitchens[-1]['dishes'] = x['steps']
        elif isinstance(x, dict) and 'warn' in x and kitchens: kitchens[-1]['warn'] = x['warn']
        elif isinstance(x, dict) and 'tip' in x:
            if kitchens and kitchens[-1]['tip'] is None and i == len(b)-1 and c['id'] == 'atlas-south-asia': extra.append(x['tip'])
            elif kitchens: kitchens[-1]['tip'] = x['tip']
        i += 1
    return lead, recipes, related, kitchens, extra

KSHORT = {"Bengal, Bangladesh and Nepal": "Bengal + Nepal", "China (everyday home cooking)": "China", "Afghanistan, Uzbekistan and Central Asia": "Central Asia",
 "Morocco, Algeria and Tunisia": "The Maghreb", "The American South, Cajun and Creole": "The South + Cajun", "Jamaica and the English-speaking islands": "Jamaica + islands",
 "Cuba, Puerto Rico, Dominican Republic and Haiti": "Cuba, PR, DR, Haiti", "Argentina, Uruguay and Chile": "Argentina + Chile", "Colombia, Venezuela and Ecuador": "Colombia + Venezuela",
 "The Pacific Islands and Hawaiʻi": "Pacific + Hawaiʻi", "Germany, Austria and Switzerland": "German-speaking", "East Africa (Kenya, Tanzania, Uganda)": "East Africa",
 "Arabian Peninsula and Yemen": "Arabia + Yemen", "Jewish diaspora kitchens": "Jewish kitchens", "Laos, Cambodia and Myanmar": "Laos, Cambodia, Myanmar",
 "Poland, Ukraine and Russia": "Poland, Ukraine, Russia", "Diner and everyday American": "Diner classics", "Canada and Indigenous foods": "Canada + Indigenous",
 "Australia and New Zealand": "Australia + NZ"}
def klabel(n):
    return KSHORT.get(n, n.replace(' and ', ' + '))

def rrows(ids):
    return '\n'.join('{{r:%s}}' % r for r in ids)

ATLAS = []
KHOME = {}
ATLAS.append({"t": "The world atlas: how to learn any cuisine", "s": [
    ["atlas-how", "Four layers of every cuisine",
     """There are thousands of cuisines, but you don't learn them dish by dish. You learn each in four layers, and every chapter of this atlas follows them:
1. The **flavour base**: the aromatics most dishes start with (soffritto, mirepoix, the holy trinity, ginger-garlic-scallion).
2. The **pantry**: the 10–20 ingredients that make food taste of that place.
3. The **techniques**: how heat is applied there (wok, tandoor, braise, grill, steam, ferment).
4. The **dishes**: everyday home food first, celebration food later.
- Buy a cuisine's pantry once and you can cook dozens of its dishes for the price of the fresh ingredients.
- A good pace: one cuisine a month, three home dishes and one celebration dish.""",
     {"type": "stack", "layers": ["Dishes", "Techniques", "Pantry", "Flavour base"]}],
    ["atlas-healthy", "Eating healthily across the world",
     """Almost every traditional cuisine eats well by default: lots of vegetables, legumes and grains, with small amounts of meat. The dishes hardest on health are usually festival or restaurant food: deep-fried, cream-heavy or very salty.
- Cook the **everyday** food often and the **feast** food sometimes.
- Watch **sodium** in fermented and soy-based cuisines; watch **saturated fat** in butter-, cream- and palm-oil-heavy ones.
- Every region page lists the ingredients that are dangerous if done wrong.""",
     {"type": "hub", "center": "The world's kitchens", "spokes": ["Europe", "Middle East", "Africa", "South Asia", "East Asia", "Southeast Asia", "The Americas", "Oceania"]}],
]})

atlas_ids = [c['id'] for c in TB['atlas']['chapters'] if c['id'] not in ('atlas-how', 'atlas-day')]
for cid in atlas_ids:
    c = next(x for x in TB['atlas']['chapters'] if x['id'] == cid)
    lead, recipes, related, kitchens, extra = parse_region(c)
    rid = cid.replace('atlas-', '')
    pages = []
    txt = lead + '\n'
    if len(kitchens) > 1:
        txt += '| Kitchen | Flavour base |\n' + '\n'.join(f'| **{k["name"]}** | {k["base"]} |' for k in kitchens) + '\n'
    else:
        txt += f'## Flavour base\n{kitchens[0]["base"]}\n'
    if recipes:
        txt += ('## Practise the techniques in the app\nNo dishes from here in the app yet; these use the same techniques.\n' if related else '## Cook these in the app\n') + rrows(recipes) + '\n'
    for e in extra: txt += f'> {e}\n'
    if len(kitchens) > 1:
        viz = {"type": "hub", "center": c['title'], "spokes": [klabel(k['name']) for k in kitchens]} if len(kitchens) <= 8 else None
    else:
        viz = {"type": "hub", "center": klabel(kitchens[0]['name']), "spokes": [short(p, 16) for p in kitchens[0]['pantry'].split(', ')[:8]]}
    pages.append([rid, f"{c['title']}: overview", txt.strip(), viz])
    for k in kitchens:
        pid = 'k-' + slug(k['name']); KHOME[k['name']] = pid
        t = f"**Flavour base**: {k['base']}\n\n**Pantry**: {k['pantry']}.\n## Techniques\n" + '\n'.join('- ' + x[0].upper() + x[1:] for x in k['tech']) + '\n## Dishes to master, easiest first\n'
        t += '\n'.join(f"{n+1}. **{d.split(',')[0].split(' (')[0].strip()}**{d[len(d.split(',')[0].split(' (')[0]):]}" for n, d in enumerate(k['dishes']))
        if k['warn']: t += f"\n> ⚠️ {k['warn']}"
        if k['tip']: t += f"\n> 💡 {k['tip']}"
        steps = [short(d, 22) for d in k['dishes']][:8]
        pages.append([pid, k['name'] if len(kitchens) > 1 else f"{k['name']}: pantry, techniques, dishes", t, {"type": "flow", "steps": steps}])
    ATLAS.append({"t": c['title'], "s": pages})

ATLAS.append({"t": "Through the day and ways of eating", "s": [
    ["day-meals", "Breakfast, salads and desserts",
     """Some skills cut across every cuisine. The app has a lesson branch for each.
- **Breakfast**: every culture has one: congee, idli, shakshuka, gallo pinto, miso soup and rice. For daily health, oats, eggs, yogurt and fruit are hard to beat.
- **Salads**: a real salad has a base, a protein, crunch, acid and something rich. Salt the leaves; dress just before serving.
- **Desserts**: baking rewards weighing and patience.
{{r:shakshuka}}
{{r:french-toast}}
{{r:caesar-salad}}
{{r:cobb-salad}}
{{r:banana-bread}}
{{r:panna-cotta}}""",
     {"type": "split3", "cols": [["Breakfast", "Oats", "Eggs", "Shakshuka"], ["Salads", "Caesar", "Cobb", "Chickpea"], ["Desserts", "Cookies", "Crisp", "Panna cotta"]]}],
    ["day-drinks", "Drinks: smoothies, café and cocktails",
     """Each drink has a technique: blender order, extraction, steeping, shaking and stirring. Every cocktail in the app has a mocktail version.
{{r:chai}}
{{r:cold-brew}}
{{r:hot-chocolate}}
{{r:lemonade}}
{{r:margarita}}
{{r:old-fashioned}}
> ⚠️ Alcohol doesn't fully cook off in sauces. The app flags it for no-alcohol, halal and pregnancy profiles.""",
     {"type": "flow", "steps": ["Smoothie|blend", "Cold brew|steep cold", "Chai|simmer", "Margarita|shake", "Old fashioned|stir"]}],
    ["day-plants", "Plant-based and seafood",
     """**Plant-based** cooking is the world's oldest cuisine: dal, falafel, gallo pinto, misir wot, ratatouille. Combine legumes and grains, season tofu boldly, and get B12 from fortified foods or a supplement.
**Seafood** cooks fast and gently: dry it, cook skin-side down, pull it when it just flakes. Aim for fatty fish (salmon, sardines, mackerel, trout) about twice a week for omega-3s.
{{r:tofu-scramble}}
{{r:bean-burgers}}
{{r:buddha-bowl}}
{{r:fish-tacos}}
{{r:shrimp-scampi}}
{{r:moules}}""",
     {"type": "split", "lt": "Plant-based", "rt": "Seafood", "left": ["Legumes + grains", "Bold tofu", "B12 source", "Nuts + seeds"], "right": ["Pat dry", "Skin side down", "Pull when flaky", "Fatty fish 2×/wk"]}],
]})

BOOK = CORE + ATLAS + END
PAGES = [p for c in BOOK for p in c['s']]
ids = [p[0] for p in PAGES]
assert len(ids) == len(set(ids)), [i for i in ids if ids.count(i) > 1]

# ---------- recipe rows ----------
def rec_table(block_ids, base, target):
    h = '| Dish | Cost | kcal | Protein | Fibre | Sodium |\n'
    for r in block_ids:
        f = F[r]
        h += f"| [{f['title']}]({base}#/recipe/{r}) | ${f['cost']:.2f} | {f['kcal']} | {f['P']} g | {f['fib']} g | {f['Na']:,} mg |\n"
    return h.strip()

def expand(text, base):
    lines = text.split('\n'); out = []; buf = []
    for l in lines + ['']:
        m = re.fullmatch(r'\{\{r:([a-z0-9-]+)\}\}', l.strip())
        if m:
            assert m.group(1) in F, m.group(1); buf.append(m.group(1)); continue
        if buf: out.append(rec_table(buf, base, None)); buf = []
        out.append(l)
    return '\n'.join(out).strip()

# ---------- glossary ----------
GL = []
for gid, name, d, al, home in G:
    if home.startswith('@'):
        home = KHOME[home[1:]]
    assert home in ids, (gid, home)
    al = [a for a in al if a not in ('rest', 'tender', 'tough')]
    GL.append([gid, name, d, al, home])

# ---------- map layout ----------
PARTS = [("Start + survival", 0, 4), ("Foundations", 4, 8), ("The six-dish path + mother techniques", 8, 12),
         ("The world atlas: Europe and the Middle East", 12, 21), ("The world atlas: Africa and Asia", 21, 31),
         ("The world atlas: the Americas, Oceania and every day", 31, 37), ("Becoming a Masterchef", 37, len(BOOK))]

def build_map():
    heads = []; sec = []; y = 0; W_ = 816; GAP = 80; COLS = 4; maxx = 0
    for title, a, b in PARTS:
        heads.append([0, y, title]); y += 110; x = 0; rowh = 0; n = 0
        for ci in range(a, b):
            c = BOOK[ci]; pg = [p[0] for p in c['s']]
            chips = len({m for p in c['s'] for m in re.findall(r'\*\*(.+?)\*\*', p[2])}) if c['s'] else 0
            chips = min(chips, 18)
            h = 120 + math.ceil(len(pg) / 1) * 64 + math.ceil(chips / 3) * 62
            sec.append([f"m{ci}", x, y, W_, h, c['t'], pg])
            rowh = max(rowh, h); n += 1; maxx = max(maxx, x + W_)
            if n % COLS == 0: y += rowh + GAP; x = 0; rowh = 0
            else: x += W_ + GAP
        if n % COLS: y += rowh + GAP
        y += 60
    return {"heads": heads, "sec": sec, "links": [["m3", "m7"], ["m1", "m2"]], "w": maxx, "h": y}

MAP = build_map()

def render():
    base = '../'
    book = [{"t": c['t'], "s": [[p[0], p[1], expand(p[2], base), p[3]] for p in c['s']]} for c in BOOK]
    for c in book:
        for p in c['s']:
            v = p[3]
            if v and v.get('fromRecipes'):
                k = v['key']; v['items'] = [[short(F[r]['title'], 20), F[r][k]] for r in v['fromRecipes']]; v['items'].sort(key=lambda x: -x[1]); del v['fromRecipes']
    order = []
    for c in book:
        for p in c['s']:
            for k in re.findall(r'\[@([^\]]+)\]', p[2] + DEEP.get(p[0], '')):
                if k not in order: order.append(k)
    for k in REFS:
        if k not in order: order.append(k)
    data = ('const BOOK=' + json.dumps(book, ensure_ascii=False) + ';\nconst D=' + json.dumps(DEEP, ensure_ascii=False) + ';\nconst M={};\nconst R={};\n'
            + 'const REFS=' + json.dumps(REFS, ensure_ascii=False) + ';\nconst REFORDER=' + json.dumps(order) + ';\nconst NCITED=' + str(len(order)) + ';\nconst KX=[];\n'
            + 'const G=' + json.dumps(GL, ensure_ascii=False) + ';\nconst MAP=' + json.dumps(MAP, ensure_ascii=False) + ';\nconst LINKT="_top";\n')
    eng = open(os.path.join(HERE, 'engine.html')).read()
    return eng.replace('/*__DATA__*/\n', data)

if __name__ == '__main__':
    out = sys.argv[2]
    open(out, 'w').write(render())
    print('textbook:', len(PAGES), 'pages,', len(BOOK), 'chapters,', len(GL), 'terms ->', out)
