import type { Block, Chapter, Part } from './textbook'

interface Kitchen {
  name: string
  /** the aromatics most dishes start from */
  base: string
  pantry: string[]
  techniques: string[]
  /** beginner → advanced */
  dishes: string[]
  watch?: string[]
  health?: string
}

/** Turns one country or region kitchen into textbook blocks. */
function kitchen(k: Kitchen): Block[] {
  const out: Block[] = [
    { h: k.name },
    { table: [['Flavour base', k.base], ['Pantry', k.pantry.join(', ')], ['Techniques', k.techniques.join('; ')]] },
    { h: `${k.name}: dishes to master, easiest first` },
    { steps: k.dishes },
  ]
  if (k.watch?.length) out.push({ warn: k.watch.join(' ') })
  if (k.health) out.push({ tip: k.health })
  return out
}

function region(c: Omit<Chapter, 'blocks'> & { lead: string; kitchens: Kitchen[]; recipes?: string[]; related?: boolean; extra?: Block[] }): Chapter {
  const blocks: Block[] = [c.lead]
  if (c.recipes?.length) {
    if (c.related) blocks.push({ h: 'Practise the techniques in the app' }, 'The app has no dishes from here yet. These use the same techniques, so cook them first.')
    else blocks.push({ h: 'Cook these in the app' })
    blocks.push({ recipes: c.recipes })
  }
  for (const k of c.kitchens) blocks.push(...kitchen(k))
  if (c.extra) blocks.push(...c.extra)
  return { id: c.id, title: c.title, glyph: c.glyph, summary: c.summary, branch: c.branch, mastery: c.mastery, blocks }
}

const chapters: Chapter[] = [
  {
    id: 'atlas-how',
    title: 'How to learn any cuisine',
    glyph: '🧭',
    summary: 'Every cuisine is a pantry, a flavour base and a few techniques. Learn those and the dishes follow.',
    blocks: [
      'There are thousands of cuisines, but you do not learn them dish by dish. You learn each one in four layers, and the rest of this atlas is organised the same way.',
      { steps: ['The flavour base: the aromatics most dishes start with (soffritto, mirepoix, the holy trinity, ginger-garlic-scallion, onion-ginger-garlic paste).', 'The pantry: the 10–20 ingredients that make food taste of that place.', 'The techniques: how heat is applied there (wok, tandoor, braise, grill, steam, ferment).', 'The dishes: start with the everyday home dishes, then the celebration dishes.'] },
      'Buy a cuisine’s pantry once and you can cook dozens of its dishes for the price of the fresh ingredients. Learn one cuisine per month: its pantry, three home dishes, one celebration dish.',
      { h: 'Healthy across the world' },
      'Almost every traditional cuisine eats well by default: lots of vegetables, legumes, grains and small amounts of meat. The dishes that are hardest on health are usually festival or restaurant food (deep-fried, cream-heavy, very salty). Cook the everyday food often and the feast food sometimes.',
      { tip: 'Each region below names the branch in Learn where you can drill it and the app recipes to cook. Where the app has no recipe yet, the dish list tells you what to look for.' },
    ],
  },
  region({
    id: 'atlas-italy', title: 'Italy', glyph: '🇮🇹', branch: 'italian',
    summary: 'Few ingredients, very good ones, treated with respect.',
    lead: 'Italian cooking is regional (there is no single “Italian food”) and built on a simple idea: buy the best ingredients you can and do as little to them as needed. Pasta shape matches sauce, and sauce is a coating, not a soup.',
    recipes: ['arrabbiata', 'cacio-e-pepe', 'carbonara', 'pesto-pasta', 'minestrone', 'risotto', 'bolognese', 'eggplant-parm', 'pizza', 'tiramisu'],
    kitchens: [{
      name: 'Italy', base: 'Soffritto (onion, carrot, celery in olive oil), or garlic and olive oil in the south.',
      pantry: ['extra-virgin olive oil', 'canned San Marzano-style tomatoes', 'parmigiano and pecorino', 'dried pasta', 'arborio or carnaroli rice', 'anchovies', 'capers', 'basil', 'oregano', 'chili flakes', 'guanciale or pancetta', 'white beans'],
      techniques: ['salting pasta water and finishing pasta in the sauce with its cooking water', 'risotto (toast, add hot stock gradually, finish off heat with butter and cheese)', 'long-simmered ragù', 'fresh egg pasta', 'pizza at maximum oven heat'],
      dishes: ['Aglio e olio, arrabbiata', 'Cacio e pepe, carbonara (sauce made off the heat)', 'Minestrone, pasta e fagioli', 'Risotto', 'Ragù bolognese, lasagne', 'Fresh pasta, gnocchi', 'Osso buco, saltimbocca', 'Pizza, focaccia', 'Tiramisu, panna cotta'],
      watch: ['Carbonara uses raw egg cooked only by the pasta’s heat: keep it moving off the heat and serve at once; the Health tab flags it in pregnancy.'],
      health: 'Everyday Italian is Mediterranean diet territory: olive oil, beans, vegetables, a small portion of pasta. Watch the cheese and cured meat for salt and saturated fat.',
    }],
    mastery: ['You can cook three pasta sauces without a recipe and finish them with pasta water.'],
  }),
  region({
    id: 'atlas-france', title: 'France', glyph: '🇫🇷', branch: 'french',
    summary: 'The grammar of Western professional cooking: stocks, sauces, braises and pastry.',
    lead: 'Professional kitchens worldwide still run on French technique and vocabulary: mise en place, mirepoix, roux, the mother sauces. Home French cooking is simpler: bistro braises, tarts, salads and good bread.',
    recipes: ['crepes', 'croque-monsieur', 'quiche', 'nicoise', 'moules', 'ratatouille', 'french-onion', 'bourguignon'],
    kitchens: [{
      name: 'France', base: 'Mirepoix (onion, carrot, celery), shallots, butter, wine, thyme and bay (bouquet garni).',
      pantry: ['butter and cream', 'shallots', 'dijon mustard', 'red and white wine', 'wine vinegar', 'herbes de Provence', 'tarragon, chervil, chives', 'gruyère and comté', 'lardons', 'good bread'],
      techniques: ['mother sauces (béchamel, velouté, espagnole, tomato, hollandaise)', 'pan sauces finished with butter', 'braising in wine', 'confit (slow cooking in fat)', 'custards and pastry', 'emulsions (mayonnaise, vinaigrette)'],
      dishes: ['Vinaigrette, omelette, crêpes', 'Croque monsieur, quiche', 'Salade niçoise, moules marinières', 'Ratatouille, French onion soup', 'Steak frites with a pan sauce', 'Coq au vin, bœuf bourguignon', 'Hollandaise, béarnaise', 'Tarte tatin, crème brûlée, choux pastry'],
      watch: ['Mussels: discard any that stay open when tapped before cooking, or stay closed after.', 'Flambéing: pull the pan off the heat before adding alcohol, and keep your face back.'],
      health: 'Rich classics are high in butter and cream. Provençal cooking (olive oil, vegetables, fish) is the lighter side; ratatouille and niçoise are everyday healthy French.',
    }],
  }),
  region({
    id: 'atlas-iberia', related: true, title: 'Spain and Portugal', glyph: '🇪🇸',
    summary: 'Olive oil, smoked paprika, saffron, seafood and the art of small plates.',
    lead: 'Iberian food is built on olive oil, garlic, paprika and the sea. Tapas (Spain) and petiscos (Portugal) teach you to cook many small, intensely flavoured things.',
    recipes: ['shrimp-scampi', 'lemon-potatoes'],
    kitchens: [
      {
        name: 'Spain', base: 'Sofrito (onion, garlic, tomato, pepper slowly cooked in olive oil).',
        pantry: ['olive oil', 'pimentón (sweet, hot and smoked paprika)', 'saffron', 'sherry vinegar', 'bomba rice', 'chorizo and jamón', 'piquillo peppers', 'manchego', 'almonds'],
        techniques: ['paella (rice cooked in a wide pan, not stirred, forming a socarrat crust)', 'slow-poaching potatoes in oil for tortilla', 'gambas al ajillo (shrimp sizzled in garlic oil)', 'cold soups blended with bread and oil'],
        dishes: ['Pan con tomate', 'Gambas al ajillo', 'Patatas bravas', 'Tortilla española', 'Gazpacho and salmorejo', 'Paella valenciana or de marisco', 'Fabada, cocido', 'Churros, crema catalana'],
        health: 'Gazpacho, legume stews and grilled fish are very healthy everyday Spain. Cured meats and cheese are the salty part.',
      },
      {
        name: 'Portugal', base: 'Onion, garlic, olive oil, bay, piri-piri chili.',
        pantry: ['bacalhau (salt cod)', 'piri-piri', 'chouriço', 'sardines', 'olive oil', 'kale', 'potatoes', 'cinnamon'],
        techniques: ['desalting salt cod (soak 24–48 hours, changing the water)', 'grilling sardines', 'piri-piri marinades', 'custard tarts'],
        dishes: ['Caldo verde (kale and potato soup)', 'Grilled sardines', 'Piri-piri chicken', 'Bacalhau à Brás', 'Cataplana (seafood stew)', 'Pastéis de nata'],
        watch: ['Salt cod is extremely salty until properly soaked; taste a flake before cooking.'],
      },
    ],
  }),
  region({
    id: 'atlas-greece-turkey', title: 'Greece, Turkey and the Balkans', glyph: '🇬🇷', branch: 'greek',
    summary: 'Lemon, oregano, olive oil, yogurt, grilled meats and flaky pastry.',
    lead: 'From Greece through Turkey to the Balkans, cooks share a pantry of olive oil, lemon, yogurt, herbs and pastry, and a love of grilling and slow-baked vegetables (ladera: vegetables cooked in olive oil).',
    recipes: ['horiatiki', 'tzatziki', 'souvlaki', 'avgolemono', 'gigantes', 'lemon-potatoes', 'spanakopita'],
    kitchens: [
      {
        name: 'Greece', base: 'Olive oil, lemon, garlic, oregano, dill.',
        pantry: ['olive oil', 'lemons', 'feta', 'Greek yogurt', 'dried oregano', 'dill and mint', 'kalamata olives', 'phyllo', 'giant beans', 'orzo'],
        techniques: ['lemon-oregano marinades', 'tempering eggs into broth (avgolemono)', 'phyllo pies', 'oven-baked beans and vegetables in tomato and oil'],
        dishes: ['Greek salad, tzatziki', 'Souvlaki', 'Avgolemono', 'Gigantes plaki, lemon potatoes', 'Spanakopita', 'Moussaka, pastitsio', 'Baklava'],
      },
      {
        name: 'Turkey', base: 'Onion, garlic, tomato and pepper paste (biber salçası), butter or olive oil.',
        pantry: ['pepper paste', 'Aleppo/pul biber and urfa chili', 'sumac', 'yogurt', 'bulgur', 'red lentils', 'pomegranate molasses', 'pistachios', 'phyllo and yufka'],
        techniques: ['kebabs on the grill', 'yogurt sauces with browned chili butter', 'stuffed vegetables (dolma)', 'flatbreads'],
        dishes: ['Mercimek çorbası (red lentil soup)', 'Menemen (eggs with peppers and tomato)', 'Çoban salatası', 'Köfte and adana kebab', 'İmam bayıldı', 'Lahmacun, pide', 'Mantı (dumplings with yogurt)', 'Baklava, künefe'],
      },
      {
        name: 'The Balkans', base: 'Onion, peppers, paprika, garlic, lard or sunflower oil.',
        pantry: ['roasted red peppers', 'sour cream and white cheese', 'paprika', 'sauerkraut', 'phyllo'],
        techniques: ['roasting and peeling peppers', 'grilled minced-meat sausages', 'burek pastry'],
        dishes: ['Ajvar (roasted pepper relish)', 'Shopska salad', 'Ćevapi', 'Burek', 'Sarma (cabbage rolls)'],
      },
    ],
  }),
  region({
    id: 'atlas-north-europe', related: true, title: 'British Isles, Central and Northern Europe', glyph: '🇩🇪',
    summary: 'Roasts, pies, potatoes, rye, dairy, fish and the comfort food of cold climates.',
    lead: 'Cold-climate cooking is about preserving (smoking, curing, pickling, fermenting), roasting and baking, and making root vegetables, cabbage, grains and dairy delicious.',
    recipes: ['roast-chicken', 'chicken-noodle', 'apple-crisp', 'lentil-shepherds'],
    kitchens: [
      {
        name: 'Britain and Ireland', base: 'Onion, butter, thyme, bay, black pepper.',
        pantry: ['potatoes', 'root vegetables', 'cheddar', 'oats', 'mustard', 'Worcestershire sauce', 'malt vinegar', 'flour and suet'],
        techniques: ['the Sunday roast with gravy from the pan juices', 'pies and pastry', 'fish and chips batter', 'scones and baking'],
        dishes: ['Porridge, a full breakfast', 'Shepherd’s or cottage pie', 'Irish stew', 'Roast with Yorkshire puddings and gravy', 'Fish and chips', 'Scones, crumble, sticky toffee pudding'],
      },
      {
        name: 'Germany, Austria and Switzerland', base: 'Onion, butter or lard, caraway, mustard.',
        pantry: ['sauerkraut', 'mustards', 'rye and pretzel breads', 'caraway', 'juniper', 'paprika', 'quark', 'Swiss cheeses'],
        techniques: ['schnitzel (pounded, breaded, shallow-fried)', 'braising with vinegar (sauerbraten)', 'potato dumplings', 'cheese fondue'],
        dishes: ['Kartoffelsalat', 'Bratwurst and sauerkraut', 'Wiener schnitzel', 'Spätzle and käsespätzle', 'Rösti', 'Goulash (Austrian style)', 'Apfelstrudel'],
      },
      {
        name: 'The Nordics', base: 'Dill, butter, onion, allspice.',
        pantry: ['rye', 'dill', 'cured and smoked fish', 'lingonberries', 'dairy (skyr, butter)', 'root vegetables', 'cardamom'],
        techniques: ['curing fish with salt and sugar (gravlax)', 'pickling herring', 'open sandwiches', 'cardamom baking'],
        dishes: ['Smørrebrød (open rye sandwiches)', 'Gravlax with mustard-dill sauce', 'Swedish meatballs with lingonberry', 'Salmon soup (lohikeitto)', 'Cinnamon and cardamom buns'],
        watch: ['Curing raw fish: use fish that is sold for raw eating or has been frozen to kill parasites.'],
        health: 'Nordic eating is high in oily fish, whole-grain rye and berries, and often cited as one of the healthiest regional diets.',
      },
    ],
  }),
  region({
    id: 'atlas-east-europe', related: true, title: 'Eastern Europe and the Caucasus', glyph: '🇵🇱',
    summary: 'Dumplings, beets, cabbage, sour cream, dill, paprika, walnuts and herbs.',
    lead: 'From Poland and Ukraine to Hungary and Georgia, this is soup-and-dumpling country, with sour flavours (fermented vegetables, sour cream) balancing hearty food.',
    recipes: ['dumplings'],
    kitchens: [
      {
        name: 'Poland, Ukraine and Russia', base: 'Onion, dill, butter, sour cream, bay.',
        pantry: ['beets', 'cabbage and sauerkraut', 'potatoes', 'buckwheat', 'dill', 'sour cream', 'farmer’s cheese', 'rye'],
        techniques: ['filled dumplings (pierogi, varenyky, pelmeni)', 'beet soups', 'stuffed cabbage', 'fermenting vegetables'],
        dishes: ['Buckwheat (kasha) with mushrooms', 'Borscht', 'Pierogi or varenyky', 'Golabki (cabbage rolls)', 'Bigos (hunter’s stew)', 'Syrniki (cheese pancakes)'],
      },
      {
        name: 'Hungary', base: 'Onion slowly cooked in lard or oil, then lots of paprika off the heat.',
        pantry: ['sweet and hot Hungarian paprika', 'peppers', 'caraway', 'sour cream'],
        techniques: ['adding paprika off the heat so it does not burn and turn bitter'],
        dishes: ['Lecsó (pepper and tomato stew)', 'Gulyás (goulash soup)', 'Chicken paprikash with nokedli'],
      },
      {
        name: 'Georgia and Armenia', base: 'Walnuts, garlic, coriander, fenugreek, fresh herbs.',
        pantry: ['walnuts', 'khmeli suneli spice blend', 'pomegranate', 'tkemali (sour plum sauce)', 'sulguni cheese', 'tarragon, cilantro, dill'],
        techniques: ['walnut sauces', 'cheese breads', 'pleated dumplings (khinkali)'],
        dishes: ['Pkhali (vegetable-walnut pâtés)', 'Lobio (spiced beans)', 'Khachapuri', 'Khinkali', 'Chakhokhbili (chicken in tomato and herbs)'],
      },
    ],
  }),
  region({
    id: 'atlas-levant', title: 'The Levant, Arabia and Jewish kitchens', glyph: '🧆', branch: 'levantine',
    summary: 'Tahini, lemon, garlic, herbs, chickpeas, spice-crusted grills and generous mezze.',
    lead: 'Lebanon, Syria, Palestine, Jordan and Israel share mezze culture: many small plates of dips, salads and pickles. The Gulf and Yemen add rice dishes with warm spice blends. Jewish cooking spans every region it travelled through.',
    recipes: ['hummus', 'tabbouleh', 'shawarma', 'shakshuka'],
    kitchens: [
      {
        name: 'The Levant', base: 'Garlic, lemon, olive oil, parsley, mint; seven-spice (baharat).',
        pantry: ['tahini', 'chickpeas', 'bulgur', 'sumac', 'za’atar', 'pomegranate molasses', 'Aleppo pepper', 'labneh', 'pita', 'pickled turnips'],
        techniques: ['blending to an emulsion (hummus, toum)', 'spice marinades and high-heat roasting', 'fine herb chopping for tabbouleh', 'frying falafel from soaked (not cooked) chickpeas'],
        dishes: ['Hummus, baba ghanoush', 'Tabbouleh, fattoush', 'Shakshuka', 'Falafel', 'Chicken shawarma with toum', 'Mujaddara (lentils, rice, crispy onions)', 'Kibbeh', 'Knafeh'],
      },
      {
        name: 'Arabian Peninsula and Yemen', base: 'Onion, garlic, loomi (dried lime), baharat, cardamom.',
        pantry: ['basmati', 'dried limes', 'cardamom', 'saffron', 'dates', 'hawaij (Yemeni spice)', 'zhoug (green chili sauce)'],
        techniques: ['cooking meat and rice together in spiced broth', 'slow-cooking under ground or in sealed pots'],
        dishes: ['Saluf bread with zhoug', 'Shorbat adas (lentil soup)', 'Kabsa or machboos', 'Mandi', 'Luqaimat (honey dumplings)'],
      },
      {
        name: 'Jewish diaspora kitchens', base: 'Varies: onion and schmaltz (Ashkenazi), olive oil and spices (Sephardi and Mizrahi).',
        pantry: ['matzo meal', 'dill', 'horseradish', 'chicken stock', 'tahini', 'date syrup'],
        techniques: ['slow overnight Sabbath stews (cholent, hamin, dafina)', 'braided enriched bread'],
        dishes: ['Matzo ball soup', 'Latkes', 'Sabich', 'Challah', 'Brisket', 'Cholent or hamin'],
        health: 'Kosher and halal diets: the Health tab flags pork and alcohol. Kosher kitchens also separate meat and dairy.',
      },
    ],
  }),
  region({
    id: 'atlas-persia', related: true, title: 'Persia and Central Asia', glyph: '🇮🇷',
    summary: 'Saffron rice with a golden crust, herb-heavy stews, sour fruit and the great plov.',
    lead: 'Iranian cooking is perfumed and balanced between sweet and sour (dried limes, pomegranate, barberries), with mountains of fresh herbs. Afghanistan and Central Asia cook rice pilafs in huge pots.',
    recipes: ['biryani'],
    kitchens: [
      {
        name: 'Iran', base: 'Onion fried golden, turmeric, saffron.',
        pantry: ['saffron', 'basmati', 'dried limes', 'barberries', 'pomegranate molasses', 'dried mint', 'advieh spice', 'walnuts', 'kashk (whey)'],
        techniques: ['parboiled and steamed rice with a crispy crust (tahdig)', 'blooming saffron in hot water', 'khoresh (slow stews)'],
        dishes: ['Mast-o-khiar (yogurt and cucumber)', 'Kuku sabzi (herb frittata)', 'Chelow with tahdig', 'Ghormeh sabzi', 'Fesenjan (pomegranate-walnut stew)', 'Joojeh kabab'],
      },
      {
        name: 'Afghanistan, Uzbekistan and Central Asia', base: 'Onion, carrot, cumin, lamb fat.',
        pantry: ['rice', 'yellow carrots', 'cumin', 'chickpeas', 'raisins', 'yogurt', 'lamb'],
        techniques: ['plov in a heavy pot (meat, onion and carrot first, then rice steamed on top)', 'steamed dumplings', 'tandoor-style breads'],
        dishes: ['Bolani (stuffed flatbreads)', 'Kabuli pulao', 'Plov', 'Mantu and ashak (dumplings)', 'Lagman (pulled noodles)'],
      },
    ],
  }),
  region({
    id: 'atlas-north-africa', related: true, title: 'North Africa', glyph: '🇲🇦',
    summary: 'Tagines, couscous, harissa, preserved lemons and warm spice blends.',
    lead: 'Morocco, Algeria, Tunisia, Libya and Egypt cook with warm spices, slow braises, and a balance of savoury, sweet and sour.',
    recipes: ['shakshuka', 'chana-masala'],
    kitchens: [
      {
        name: 'Morocco, Algeria and Tunisia', base: 'Onion, garlic, ginger, cumin, paprika, cinnamon, saffron; harissa in Tunisia.',
        pantry: ['ras el hanout', 'harissa', 'preserved lemons', 'green olives', 'couscous', 'chickpeas', 'dried apricots and dates', 'cilantro and parsley', 'almonds'],
        techniques: ['tagine (slow braise under a cone lid, low heat)', 'steaming couscous', 'charmoula marinades', 'preserving lemons in salt'],
        dishes: ['Zaalouk (eggplant salad)', 'Harira (lentil and chickpea soup)', 'Chicken tagine with preserved lemon and olives', 'Couscous with seven vegetables', 'Lamb tagine with prunes', 'Pastilla'],
        watch: ['A clay tagine cracks on direct high heat: use a heat diffuser and keep the flame low.'],
      },
      {
        name: 'Egypt', base: 'Garlic, onion, cumin, coriander.',
        pantry: ['fava beans', 'lentils', 'rice and vermicelli', 'tahini', 'dukkah'],
        techniques: ['slow-cooked beans', 'crispy fried onions', 'layered rice-lentil-pasta dishes'],
        dishes: ['Ful medames', 'Ta’ameya (fava falafel)', 'Molokhia', 'Koshari'],
        health: 'Ful and koshari are cheap, high-fibre, plant-protein meals; survival food at its finest.',
      },
    ],
  }),
  region({
    id: 'atlas-west-africa', title: 'West Africa', glyph: '🌍', branch: 'west-african',
    summary: 'Tomato-pepper bases, palm oil, peanuts, smoky grills and one-pot rice.',
    lead: 'Nigeria, Ghana, Senegal and their neighbours build food on a blended base of tomato, pepper and onion, plus deep flavour from crayfish, fermented seeds, smoked fish and palm oil. Starchy “swallows” (fufu, eba, banku) are eaten with soups and stews.',
    recipes: ['jollof', 'maafe', 'suya'],
    kitchens: [{
      name: 'West Africa', base: 'Blended tomato, red bell pepper, scotch bonnet and onion, fried down in oil until it darkens and the oil rises.',
      pantry: ['scotch bonnets', 'tomato paste', 'palm oil', 'ground peanuts and peanut butter', 'dried crayfish', 'stock cubes', 'yaji/suya spice', 'plantains', 'cassava and yam flours', 'black-eyed peas', 'egusi (melon seeds)'],
      techniques: ['frying the pepper base down to remove the raw taste', 'cooking rice in sauce (jollof)', 'thickening stews with nut butter or ground seeds', 'pounding starches', 'dry rubs and grilling'],
      dishes: ['Fried plantains (dodo)', 'Akara (black-eyed pea fritters)', 'Jollof rice', 'Maafe (peanut stew), groundnut soup', 'Suya', 'Egusi soup with fufu or eba', 'Thieboudienne (Senegalese fish and rice)', 'Kelewele, chin chin'],
      watch: ['Cassava (gari, fufu, raw roots) must be properly processed and cooked; never eat raw cassava.', 'Scotch bonnets are very hot: wear gloves, and do not touch your eyes.', 'Stock cubes are very high in sodium; use half and taste.'],
      health: 'Bean, vegetable and peanut dishes are excellent plant protein. Palm oil is high in saturated fat; use it for flavour, with a neutral oil for the rest.',
    }],
  }),
  region({
    id: 'atlas-east-south-africa', related: true, title: 'East and Southern Africa', glyph: '🇪🇹',
    summary: 'Berbere and injera, coastal Swahili curries, braai and Cape Malay spice.',
    lead: 'Ethiopia and Eritrea have one of the world’s most distinctive cuisines: spiced stews (wat) served on sour fermented flatbread. The Swahili coast blends African, Arab and Indian cooking. Southern Africa grills (braai) and has a Cape Malay spice tradition.',
    recipes: ['dal-tadka', 'chana-masala'],
    kitchens: [
      {
        name: 'Ethiopia and Eritrea', base: 'Lots of red onion cooked slowly, often without oil first, then niter kibbeh (spiced butter) and berbere.',
        pantry: ['berbere', 'mitmita', 'niter kibbeh (or a spiced oil for vegan dishes)', 'red lentils', 'split peas', 'teff flour', 'collard greens'],
        techniques: ['dry-cooking onions down to a jammy base', 'fermenting teff batter for injera (2–4 days)'],
        dishes: ['Misir wot (red lentils)', 'Shiro (chickpea flour stew)', 'Gomen (collards)', 'Doro wat (chicken with egg)', 'Injera'],
        health: 'Ethiopian fasting food is fully vegan: lentils, split peas and greens. Perfect healthy plant cooking.',
      },
      {
        name: 'East Africa (Kenya, Tanzania, Uganda)', base: 'Onion, tomato, garlic, ginger; coconut and spices on the coast.',
        pantry: ['maize flour', 'coconut milk', 'cardamom', 'pilau masala', 'beans', 'kale (sukuma)'],
        techniques: ['ugali (stiff maize porridge)', 'pilau spiced rice', 'nyama choma (grilled meat)'],
        dishes: ['Sukuma wiki (braised greens)', 'Ugali', 'Pilau', 'Coconut bean curry (maharagwe)', 'Nyama choma', 'Chapati, mandazi'],
      },
      {
        name: 'South Africa', base: 'Onion, garlic, curry spices (Cape Malay), chili.',
        pantry: ['curry powder', 'apricot jam and chutney', 'boerewors spices (coriander)', 'maize meal'],
        techniques: ['braai (wood-fire grilling)', 'bobotie (spiced mince baked with an egg custard)'],
        dishes: ['Chakalaka (spicy vegetable relish)', 'Pap (maize porridge)', 'Bunny chow', 'Bobotie', 'Braai: boerewors and sosaties', 'Malva pudding'],
      },
    ],
  }),
  region({
    id: 'atlas-south-asia', title: 'India and South Asia', glyph: '🇮🇳', branch: 'indian',
    summary: 'The world’s great spice kitchen: tadka, masalas, breads, dals and regional diversity.',
    lead: 'India alone has dozens of distinct cuisines. The north cooks with wheat breads, dairy and tandoors; the south with rice, coconut, curry leaves and tamarind; the east with mustard oil and fish; the west with everything from Goan vinegar curries to Gujarati vegetarian thalis. Pakistan, Bangladesh, Sri Lanka and Nepal each add their own.',
    recipes: ['dal-tadka', 'chana-masala', 'aloo-gobi', 'palak-paneer', 'butter-chicken', 'biryani', 'chai'],
    kitchens: [
      {
        name: 'North India and Pakistan', base: 'Onion browned slowly, ginger-garlic paste, tomato, then ground spices.',
        pantry: ['cumin seeds', 'coriander', 'turmeric', 'Kashmiri chili', 'garam masala', 'cardamom', 'cloves', 'bay', 'ghee', 'basmati', 'atta flour', 'lentils and chickpeas', 'paneer', 'yogurt', 'kasuri methi'],
        techniques: ['tadka/tempering (whole spices in hot fat poured over dal)', 'bhuna (frying the masala until oil separates)', 'yogurt marinades', 'dum (sealed steaming for biryani)', 'flatbreads on a tawa'],
        dishes: ['Jeera rice, raita, chapati', 'Dal tadka, chana masala', 'Aloo gobi, palak paneer', 'Rajma (kidney bean curry)', 'Butter chicken, karahi', 'Biryani', 'Nihari, haleem', 'Gulab jamun, kheer'],
        watch: ['Rajma from dried kidney beans: soak and boil hard for 10 minutes first.', 'Whole spices (cloves, cardamom, bay) are usually not eaten: warn guests or fish them out.'],
      },
      {
        name: 'South India and Sri Lanka', base: 'Mustard seeds, curry leaves, dried red chili and urad dal popped in coconut oil.',
        pantry: ['curry leaves', 'mustard seeds', 'coconut', 'tamarind', 'rice and urad dal', 'sambar powder', 'Sri Lankan roasted curry powder', 'Maldive fish'],
        techniques: ['fermented rice-lentil batters (dosa, idli)', 'coconut-based curries', 'tamarind sour gravies'],
        dishes: ['Coconut chutney, upma', 'Sambar, rasam', 'Lemon rice, curd rice', 'Dosa and idli', 'Kerala fish curry', 'Sri Lankan dhal and pol sambol', 'Kottu roti, hoppers'],
      },
      {
        name: 'Bengal, Bangladesh and Nepal', base: 'Mustard oil, panch phoron (five-spice), green chili; timur pepper and ginger in Nepal.',
        pantry: ['mustard oil and seeds', 'panch phoron', 'hilsa and other river fish', 'jaggery', 'timur', 'lentils'],
        techniques: ['heating mustard oil to its smoking point first to tame it', 'steamed dumplings (momo)'],
        dishes: ['Dal bhat (lentils and rice)', 'Shorshe maach (fish in mustard)', 'Momos with tomato achar', 'Mishti doi, rasgulla'],
      },
    ],
    extra: [{ tip: 'Indian vegetarian cooking is one of the best healthy diets on earth: dal, beans, vegetables, yogurt and whole-wheat breads. Restaurant curries are much richer than home food; go easy on cream and ghee.' }],
  }),
  region({
    id: 'atlas-china', title: 'China', glyph: '🇨🇳', branch: 'chinese',
    summary: 'Eight great regional cuisines, the wok, and the balance of the five flavours.',
    lead: 'China is a continent of cuisines. Cantonese is subtle and fresh; Sichuan is numbing and spicy; Hunan is hot and sour; Shandong and Beijing are wheat, noodles and roast duck; Jiangsu and Zhejiang are sweet, delicate and soy-braised; Fujian is soups and seafood. All share the wok, the cleaver and a respect for texture.',
    recipes: ['tomato-egg', 'bok-choy', 'egg-fried-rice', 'kung-pao', 'mapo-tofu', 'scallion-pancakes', 'dumplings'],
    kitchens: [
      {
        name: 'China (everyday home cooking)', base: 'Ginger, garlic and scallion, sizzled in oil.',
        pantry: ['light and dark soy sauce', 'Shaoxing wine', 'Chinkiang black vinegar', 'oyster sauce', 'toasted sesame oil', 'cornstarch', 'white pepper', 'star anise', 'dried chilies', 'Sichuan peppercorns', 'doubanjiang (chili bean paste)', 'fermented black beans', 'jasmine rice', 'noodles'],
        techniques: ['stir-frying in batches over high heat', 'velveting meat with cornstarch', 'steaming fish and dumplings', 'red-braising (soy, sugar, wine)', 'balancing sweet, sour, salty, bitter and spicy in one sauce'],
        dishes: ['Tomato and egg stir-fry', 'Garlic greens, egg fried rice', 'Kung pao chicken, mapo tofu', 'Scallion pancakes', 'Dumplings (jiaozi)', 'Steamed whole fish with ginger and scallion', 'Red-braised pork belly', 'Dan dan noodles, hand-pulled noodles', 'Peking-style roast duck'],
        watch: ['Fried rice: always use rice that was cooled and refrigerated within an hour or two of cooking.', 'Wok smoke and oil: open a window, use high-smoke-point oil, and keep the sesame oil for finishing.', 'Soy sauce and doubanjiang contain wheat: use tamari and check labels for celiac.'],
        health: 'Lots of vegetables and modest meat make everyday Chinese food balanced. The sauces are where sodium hides: measure soy sauce rather than pouring.',
      },
    ],
  }),
  region({
    id: 'atlas-japan', title: 'Japan', glyph: '🇯🇵', branch: 'japanese',
    summary: 'Dashi, seasonality, precise knife work and the art of restraint.',
    lead: 'Japanese home cooking is built on dashi (seaweed and bonito stock), rice, and a few seasonings: soy, mirin, sake, miso. A traditional meal is “one soup, three sides” (ichijū sansai) with rice.',
    recipes: ['miso-soup', 'onigiri', 'oyakodon', 'gyudon', 'teriyaki', 'yakisoba', 'tonkatsu'],
    kitchens: [{
      name: 'Japan', base: 'Dashi plus soy sauce, mirin and sake.',
      pantry: ['kombu', 'bonito flakes', 'white and red miso', 'soy sauce', 'mirin', 'sake', 'rice vinegar', 'short-grain rice', 'nori', 'panko', 'tofu', 'katsuobushi', 'shichimi togarashi'],
      techniques: ['making dashi without boiling the kombu', 'washing and steaming short-grain rice', 'simmering in seasoned broth (nimono)', 'glazing (teriyaki)', 'shallow-frying breaded cutlets', 'tempura batter (ice-cold, barely mixed)', 'sushi rice seasoning and shaping'],
      dishes: ['Miso soup, rice, pickles', 'Onigiri', 'Tamagoyaki (rolled omelette)', 'Oyakodon, gyudon', 'Chicken teriyaki, yakisoba', 'Tonkatsu, karaage', 'Ramen from scratch', 'Tempura', 'Sushi and sashimi'],
      watch: ['Raw fish: buy fish sold for raw eating (often labelled sashimi-grade) from a trusted fishmonger, keep it very cold, eat it the same day.', 'Kombu is very high in iodine; normal dashi is fine, but do not eat large amounts of seaweed daily.'],
      health: 'Japanese home food is light on fat and rich in fish, soy and vegetables, but high in sodium from soy and miso. Use low-sodium soy and keep miso to a bowl a day if you watch blood pressure.',
    }],
  }),
  region({
    id: 'atlas-korea', title: 'Korea', glyph: '🇰🇷', branch: 'korean',
    summary: 'Fermented pastes, kimchi, banchan, grilling and bold balance.',
    lead: 'Korean food is about fermentation (kimchi, gochujang, doenjang, soy), many small side dishes (banchan) shared around rice and soup, and the grill.',
    recipes: ['oi-muchim', 'kimchi-fried-rice', 'bibimbap', 'japchae', 'bulgogi', 'kimchi-jjigae'],
    kitchens: [{
      name: 'Korea', base: 'Garlic, scallion, sesame oil and toasted sesame seeds; gochujang and doenjang.',
      pantry: ['gochujang', 'gochugaru (chili flakes)', 'doenjang', 'soy sauce', 'toasted sesame oil and seeds', 'kimchi', 'rice', 'sweet potato glass noodles', 'Asian pear', 'tofu'],
      techniques: ['seasoning each vegetable separately (namul)', 'fruit-based marinades that tenderise', 'salting vegetables', 'making kimchi (salt, paste, ferment)', 'stews in a stone or clay pot (jjigae)'],
      dishes: ['Oi muchim, spinach namul', 'Gyeran-mari (rolled omelette)', 'Kimchi fried rice', 'Bibimbap, japchae', 'Bulgogi, dak-galbi', 'Kimchi jjigae, sundubu jjigae', 'Tteokbokki', 'Homemade kimchi', 'Korean fried chicken'],
      watch: ['Most gochujang contains wheat; check labels for celiac.', 'Kimchi is very salty; it is a condiment, not a vegetable portion.'],
      health: 'Banchan are mostly vegetables, and ferments bring flavour without much fat. Sodium is the thing to watch.',
    }],
  }),
  region({
    id: 'atlas-thai-mekong', title: 'Thailand, Laos, Cambodia and Myanmar', glyph: '🇹🇭', branch: 'thai',
    summary: 'Sweet, sour, salty, spicy and bitter in every bite; pastes, herbs and fish sauce.',
    lead: 'Mainland Southeast Asian cooking balances strong flavours: lime and tamarind for sour, palm sugar for sweet, fish sauce for salt, chilies for heat. Pastes are pounded in a mortar, herbs go in by the handful.',
    recipes: ['kra-pao', 'larb', 'tom-yum', 'green-curry', 'pad-thai', 'mango-sticky-rice'],
    kitchens: [
      {
        name: 'Thailand', base: 'Pounded garlic, chili, shallot, lemongrass, galangal, cilantro root.',
        pantry: ['fish sauce', 'palm sugar', 'tamarind', 'limes', 'coconut milk', 'curry pastes', 'lemongrass', 'galangal', 'makrut lime leaves', 'Thai holy basil and Thai basil', 'jasmine and sticky rice', 'rice noodles', 'dried shrimp'],
        techniques: ['pounding pastes in a mortar', 'cracking coconut cream and frying curry paste in it', 'infusing broths with aromatics', 'toasted rice powder', 'tasting and balancing at the end'],
        dishes: ['Pad kra pao with a fried egg', 'Som tam (green papaya salad)', 'Larb', 'Tom yum, tom kha', 'Green and red curry', 'Pad thai, pad see ew', 'Massaman curry', 'Mango sticky rice'],
        watch: ['Many curry pastes contain shrimp paste: not vegan, and a shellfish allergen.', 'Fish sauce is very salty: add by the teaspoon and taste.'],
      },
      {
        name: 'Laos, Cambodia and Myanmar', base: 'Lemongrass, galangal, garlic and shallot pastes (kroeung in Cambodia), fermented fish.',
        pantry: ['sticky rice', 'padaek or prahok (fermented fish)', 'kroeung paste', 'fresh herbs', 'chickpea flour (Myanmar)'],
        techniques: ['steaming sticky rice in a basket', 'fish steamed in banana leaf (amok)', 'slow-fried onion and turmeric bases (Myanmar)'],
        dishes: ['Larb (the Lao original)', 'Fish amok', 'Lok lak', 'Mohinga (fish noodle soup)', 'Tea leaf salad (lahpet thoke)'],
      },
    ],
  }),
  region({
    id: 'atlas-vietnam', title: 'Vietnam', glyph: '🇻🇳', branch: 'vietnamese',
    summary: 'Fresh herbs, clear broths, nước chấm, rice paper and quick pickles.',
    lead: 'Vietnamese food is among the freshest in the world: plates of raw herbs and lettuce, bright dipping sauce, and long-simmered clear broths. The north is subtle, the centre spicy, the south sweeter.',
    recipes: ['goi-cuon', 'banh-mi', 'bun-bo', 'pho-ga'],
    kitchens: [{
      name: 'Vietnam', base: 'Fish sauce, lime, sugar, garlic and chili (nước chấm); shallots fried crisp; lemongrass.',
      pantry: ['fish sauce', 'rice paper', 'rice vermicelli and phở noodles', 'mint, Thai basil, cilantro, perilla', 'star anise', 'cinnamon', 'lemongrass', 'pickled carrot and daikon', 'baguettes'],
      techniques: ['charring onion and ginger for broth', 'balancing nước chấm', 'rolling rice paper', 'quick pickling', 'caramel sauce for braises (kho)'],
      dishes: ['Gỏi cuốn (fresh rolls)', 'Nước chấm and noodle salads (bún)', 'Bánh mì', 'Phở gà, phở bò', 'Cá kho (caramel fish)', 'Bún chả', 'Bánh xèo (crispy crêpes)'],
      health: 'Herb- and vegetable-heavy and low in fat. Broth and fish sauce make phở very high in sodium; drink less of the broth if that matters for you.',
    }],
  }),
  region({
    id: 'atlas-maritime-sea', related: true, title: 'The Philippines, Indonesia, Malaysia and Singapore', glyph: '🇵🇭',
    summary: 'Adobo and sinigang, sambal and rendang, laksa and hawker classics.',
    lead: 'Island Southeast Asia mixes Malay, Chinese, Indian, Spanish, Dutch and Arab influences. Expect spice pastes (rempah), coconut, sour soups, and sweet-salty soy.',
    recipes: ['green-curry', 'egg-fried-rice'],
    kitchens: [
      {
        name: 'The Philippines', base: 'Garlic, onion, vinegar, soy, bay and black pepper.',
        pantry: ['cane or coconut vinegar', 'soy sauce', 'calamansi', 'fish sauce (patis)', 'shrimp paste (bagoong)', 'tamarind', 'bay leaves', 'jasmine rice'],
        techniques: ['adobo (braising in vinegar and soy)', 'sour tamarind soups', 'garlic fried rice from leftovers'],
        dishes: ['Sinangag (garlic fried rice)', 'Chicken adobo', 'Sinigang', 'Pancit', 'Lumpia', 'Kare-kare', 'Halo-halo'],
      },
      {
        name: 'Indonesia and Malaysia', base: 'Rempah/bumbu: pounded shallot, garlic, chili, lemongrass, galangal, turmeric, candlenut, shrimp paste.',
        pantry: ['kecap manis (sweet soy)', 'sambal oelek', 'belacan/terasi', 'coconut milk', 'tamarind', 'peanuts', 'candlenuts', 'pandan', 'tempeh'],
        techniques: ['frying the spice paste until fragrant and the oil splits', 'slow-reducing coconut braises until dry (rendang)', 'satay grilling', 'frying tempeh'],
        dishes: ['Nasi goreng', 'Gado-gado (salad with peanut sauce)', 'Satay', 'Mee goreng', 'Laksa', 'Beef rendang', 'Nasi lemak'],
        watch: ['Candlenuts are toxic raw; always cook them.'],
        health: 'Tempeh is a fermented soy protein with lots of fibre: one of the best plant proteins in the world.',
      },
      {
        name: 'Singapore', base: 'A crossroads of Chinese, Malay and Indian bases.',
        pantry: ['chili crab sauce ingredients', 'dark soy', 'ginger', 'pandan', 'kaya (coconut jam)'],
        techniques: ['poached chicken with flavoured rice', 'hawker-stall high-heat noodle frying'],
        dishes: ['Kaya toast', 'Hainanese chicken rice', 'Char kway teow', 'Chili crab'],
      },
    ],
  }),
  region({
    id: 'atlas-mexico', title: 'Mexico and Central America', glyph: '🇲🇽', branch: 'mexican',
    summary: 'Corn, chilies, beans, lime and a sauce for every occasion.',
    lead: 'Mexican cooking is ancient and regional, built on corn (nixtamalised into masa), beans, squash and dozens of dried and fresh chilies. Salsas and moles are its sauces. Central America shares corn and beans with its own dishes.',
    recipes: ['guac-pico', 'arroz-rojo', 'tinga', 'fish-tacos', 'agua-fresca', 'margarita'],
    kitchens: [
      {
        name: 'Mexico', base: 'Toasted dried chilies, charred tomato, onion and garlic, blended and fried.',
        pantry: ['dried ancho, guajillo, pasilla and chipotle chilies', 'fresh jalapeños and serranos', 'corn tortillas and masa harina', 'black and pinto beans', 'limes', 'cilantro', 'Mexican oregano', 'cumin', 'tomatillos', 'queso fresco and cotija', 'Mexican chocolate'],
        techniques: ['toasting and soaking dried chilies', 'charring vegetables on a dry pan (comal)', 'frying a blended salsa to deepen it', 'toasting rice before cooking', 'poaching and shredding meat', 'pressing tortillas from masa'],
        dishes: ['Pico de gallo, guacamole', 'Frijoles de la olla, refried beans', 'Arroz rojo', 'Chicken tinga tacos', 'Chilaquiles, huevos rancheros', 'Pozole', 'Tamales', 'Birria, cochinita pibil', 'Mole poblano'],
        watch: ['Toast dried chilies only a few seconds per side: burnt chilies make a bitter sauce.', 'Chipotles in adobo are hot; start with one.'],
        health: 'Beans, corn tortillas, salsa and grilled protein are a balanced, high-fibre plate. The cheese, sour cream and frying are the extras.',
      },
      {
        name: 'Central America', base: 'Onion, sweet pepper, garlic, cilantro (sofrito); achiote.',
        pantry: ['black and red beans', 'rice', 'corn masa', 'plantains', 'achiote', 'Lizano-style sauce'],
        techniques: ['rice and beans fried together', 'stuffed masa cakes'],
        dishes: ['Gallo pinto', 'Pupusas with curtido (El Salvador)', 'Baleadas (Honduras)', 'Pepián (Guatemala)'],
      },
    ],
  }),
  region({
    id: 'atlas-caribbean', related: true, title: 'The Caribbean', glyph: '🇯🇲',
    summary: 'Allspice and scotch bonnets, sofrito, rice and peas, and fire-grilled jerk.',
    lead: 'Caribbean food mixes Indigenous, African, European, Indian and Chinese traditions. Each island has its own accent: jerk and curry goat in Jamaica, sofrito and pernil in Puerto Rico, mojo in Cuba, epis in Haiti, roti and doubles in Trinidad.',
    recipes: ['arroz-rojo', 'mojito'],
    kitchens: [
      {
        name: 'Jamaica and the English-speaking islands', base: 'Scallion, thyme, scotch bonnet, allspice (pimento), garlic.',
        pantry: ['allspice', 'scotch bonnets', 'thyme', 'coconut milk', 'kidney beans', 'curry powder', 'plantains', 'canned ackee', 'salt fish'],
        techniques: ['jerk marinades and smoky grilling', 'rice and peas cooked in coconut milk', 'browning sugar for stews (brown stew)'],
        dishes: ['Fried plantain', 'Rice and peas', 'Brown stew chicken', 'Jerk chicken', 'Curry goat', 'Ackee and saltfish', 'Trinidad doubles and roti'],
        watch: ['Ackee: only canned or properly opened ripe fruit; unripe ackee is poisonous.', 'Rice and peas often use kidney beans: canned are safe; dried must be boiled hard first.'],
      },
      {
        name: 'Cuba, Puerto Rico, Dominican Republic and Haiti', base: 'Sofrito/recaito (onion, pepper, garlic, culantro); mojo (citrus and garlic); epis (Haiti).',
        pantry: ['sour orange', 'culantro', 'sazón and adobo seasonings', 'black beans and pigeon peas', 'plantains', 'yuca'],
        techniques: ['slow-roasting pork shoulder', 'mashing fried plantain (mofongo)', 'twice-fried plantain (tostones)'],
        dishes: ['Tostones', 'Black beans and rice (moros y cristianos)', 'Ropa vieja', 'Pernil', 'Mofongo', 'Griot with pikliz'],
      },
    ],
  }),
  region({
    id: 'atlas-south-america', title: 'South America', glyph: '🇧🇷', branch: 'brazilian',
    summary: 'Peruvian ceviche, Brazilian churrasco, Argentine asado, arepas and more.',
    lead: 'South America ranges from Peru, one of the world’s great food cultures (Indigenous, Spanish, Chinese and Japanese influences), to the grill cultures of Brazil and Argentina, and the corn and plantain kitchens of the north.',
    recipes: ['picanha', 'vinagrete', 'farofa'],
    kitchens: [
      {
        name: 'Peru', base: 'Ají amarillo, red onion, garlic, lime.',
        pantry: ['ají amarillo and ají panca pastes', 'limes', 'red onion', 'potatoes (many kinds)', 'quinoa', 'corn', 'soy sauce (chifa)', 'huacatay'],
        techniques: ['ceviche (raw fish “cooked” briefly in lime)', 'lomo saltado (wok stir-fry, Chinese-Peruvian)', 'potato terrines (causa)'],
        dishes: ['Papa a la huancaína', 'Causa', 'Lomo saltado', 'Ají de gallina', 'Ceviche', 'Anticuchos', 'Pollo a la brasa'],
        watch: ['Ceviche: lime acid does not kill bacteria or parasites. Use very fresh fish sold for raw eating (or previously frozen) and serve immediately.'],
      },
      {
        name: 'Brazil', base: 'Garlic, onion and salt (alho e sal); coconut, dendê oil and chili in Bahia.',
        pantry: ['coarse salt', 'cassava flour', 'black beans', 'rice', 'dendê (palm) oil', 'coconut milk', 'limes', 'cachaça'],
        techniques: ['churrasco: big cuts, coarse salt, fire', 'toasting cassava flour (farofa)', 'fine dice and quick-pickle salsa (vinagrete)', 'slow bean stews'],
        dishes: ['Vinagrete, farofa', 'Arroz e feijão', 'Picanha', 'Pão de queijo', 'Moqueca (fish stew)', 'Feijoada', 'Brigadeiros'],
      },
      {
        name: 'Argentina, Uruguay and Chile', base: 'Garlic, parsley, oregano, chili, olive oil (chimichurri).',
        pantry: ['coarse salt', 'chimichurri herbs', 'dulce de leche', 'merkén (Chile)', 'empanada dough'],
        techniques: ['asado (slow wood or charcoal grill)', 'empanadas', 'milanesa'],
        dishes: ['Chimichurri', 'Empanadas', 'Milanesa', 'Asado', 'Pastel de choclo (Chile)', 'Alfajores'],
      },
      {
        name: 'Colombia, Venezuela and Ecuador', base: 'Hogao (tomato, scallion, onion); sofrito.',
        pantry: ['precooked corn flour (masarepa)', 'plantains', 'beans', 'guascas herb', 'avocado'],
        techniques: ['arepas (corn cakes, griddled)', 'patacones (twice-fried plantain)', 'slow soups'],
        dishes: ['Arepas', 'Patacones', 'Ajiaco', 'Bandeja paisa', 'Pabellón criollo'],
      },
    ],
  }),
  region({
    id: 'atlas-north-america', title: 'The United States and Canada', glyph: '🇺🇸', branch: 'american',
    summary: 'Barbecue, Southern and Creole cooking, diners, and immigrant kitchens that became their own.',
    lead: 'North American food is regional and immigrant-built: Southern and soul food from African-American cooks, Cajun and Creole in Louisiana, Tex-Mex and New Mexican, barbecue traditions, New England seafood, Indigenous foods (corn, beans, squash, wild rice, salmon, maple), and French-Canadian comfort food.',
    recipes: ['pancakes', 'smash-burgers', 'mac-cheese', 'clam-chowder', 'corn-chowder', 'cobb-salad', 'cookies', 'caesar'],
    kitchens: [
      {
        name: 'The American South, Cajun and Creole', base: 'The holy trinity: onion, celery and green bell pepper; plus garlic.',
        pantry: ['cornmeal', 'buttermilk', 'Cajun/Creole seasoning', 'hot sauce', 'andouille', 'okra', 'collard greens', 'black-eyed peas', 'pecans'],
        techniques: ['dark roux (cooked to chocolate brown, stirring constantly)', 'buttermilk soaking and frying', 'low-and-slow greens', 'biscuits (cold fat, minimal handling)'],
        dishes: ['Cornbread, biscuits', 'Collard greens, black-eyed peas', 'Shrimp and grits', 'Red beans and rice', 'Gumbo, jambalaya', 'Fried chicken', 'Pecan pie, peach cobbler'],
        watch: ['Hot roux sticks and burns like napalm; long sleeves, a long spoon, and never leave it.'],
      },
      {
        name: 'Barbecue country', base: 'Dry rubs (paprika, brown sugar, salt, pepper, garlic) and wood smoke.',
        pantry: ['smoked paprika', 'brown sugar', 'apple cider vinegar', 'mustard', 'wood chips'],
        techniques: ['low-and-slow smoking at 225–275°F', 'the stall (internal temperature plateaus around 150–170°F; be patient or wrap)', 'resting big cuts for an hour'],
        dishes: ['Coleslaw, baked beans', 'Pulled pork (Carolina)', 'Ribs (Memphis, Kansas City)', 'Brisket (Texas)'],
      },
      {
        name: 'Diner and everyday American', base: 'Butter, onion, salt and pepper.',
        pantry: ['all-purpose flour', 'cheddar', 'ketchup and mustard', 'maple syrup', 'buttermilk'],
        techniques: ['smashing burgers for maximum browning', 'roux and béchamel cheese sauces', 'pancake batters (do not overmix)', 'creaming butter and sugar for cookies'],
        dishes: ['Pancakes', 'Smash burgers', 'Mac and cheese', 'Clam chowder', 'Cobb salad', 'Chocolate chip cookies, apple pie'],
      },
      {
        name: 'Canada and Indigenous foods', base: 'Butter, onion, maple, wild herbs.',
        pantry: ['maple syrup', 'wild rice', 'cheese curds', 'salmon', 'bannock ingredients', 'peameal bacon'],
        techniques: ['tourtière pastry', 'smoking and planking fish', 'bannock (quick pan bread)'],
        dishes: ['Bannock', 'Pea soup', 'Poutine', 'Cedar-plank salmon', 'Tourtière', 'Butter tarts, maple taffy on snow'],
        watch: ['Fiddleheads must be cooked: boil 15 minutes or steam 12, and discard the water.'],
      },
    ],
  }),
  region({
    id: 'atlas-oceania', related: true, title: 'Australia, New Zealand and the Pacific', glyph: '🌏',
    summary: 'Earth ovens, coconut and fish, poke, and modern multicultural cooking.',
    lead: 'Pacific Island cooking is built on root crops (taro, yam, breadfruit, sweet potato), coconut and fish, often cooked in an earth oven (umu, lovo, hāngī). Australia and New Zealand blend British roots, Indigenous ingredients and Asian and Mediterranean influences.',
    recipes: ['salmon-asparagus', 'onigiri'],
    kitchens: [
      {
        name: 'The Pacific Islands and Hawaiʻi', base: 'Coconut cream, lime, onion, chili; shoyu and sesame in Hawaiʻi.',
        pantry: ['coconut cream', 'taro', 'breadfruit', 'sweet potato', 'very fresh fish', 'limes', 'shoyu', 'sesame', 'seaweed'],
        techniques: ['earth-oven cooking wrapped in leaves', 'raw fish marinated in citrus and coconut', 'poke (cubed raw fish dressed with shoyu and sesame)'],
        dishes: ['Kokoda / ota ika (citrus-coconut fish)', 'Poke bowls', 'Palusami (taro leaves in coconut cream)', 'Lovo / umu / hāngī', 'Kalua pork'],
        watch: ['Taro and taro leaves must be well cooked; raw they irritate the mouth and throat.', 'Raw fish dishes: same rule as sushi and ceviche, use fish sold for raw eating.'],
      },
      {
        name: 'Australia and New Zealand', base: 'Modern and multicultural: olive oil, lemon, herbs, chili, soy.',
        pantry: ['lamb', 'seafood', 'macadamias', 'lemon myrtle and wattleseed (native)', 'kūmara (sweet potato)'],
        techniques: ['the barbecue', 'meat pies', 'meringue'],
        dishes: ['Smashed avocado toast', 'Barbecued prawns and lamb', 'Meat pie', 'Roast lamb with kūmara', 'Pavlova, Anzac biscuits, lamingtons'],
      },
    ],
  }),
  {
    id: 'atlas-day',
    title: 'Through the day and ways of eating',
    glyph: '🕘',
    summary: 'Breakfast, salads, soups, snacks, desserts, drinks, plant-based and seafood cooking.',
    blocks: [
      'Some skills cut across every cuisine. The app has a Learn branch for each.',
      { h: 'Breakfast' },
      'Every culture has one: congee (China), idli (India), shakshuka (North Africa), gallo pinto (Costa Rica), a full breakfast (Britain), miso soup and rice (Japan). For daily health, oats, eggs, yogurt and fruit are hard to beat.',
      { recipes: ['overnight-oats', 'avocado-toast', 'shakshuka', 'french-toast'] },
      { h: 'Salads' },
      'A real salad has a base, a protein, crunch, acid and something rich. Dress just before serving, salt the leaves, and make salads that keep (grains, beans, cabbage) for lunches.',
      { recipes: ['caesar-salad', 'caprese', 'cobb-salad', 'chickpea-salad'] },
      { h: 'Desserts and baking' },
      { recipes: ['banana-bread', 'apple-crisp', 'panna-cotta', 'tiramisu'] },
      { h: 'Drinks' },
      'Smoothies, juices, coffee, tea and cocktails each have techniques: blender order, extraction, steeping, shaking and stirring. Every cocktail in the app has a mocktail version.',
      { recipes: ['chai', 'cold-brew', 'hot-chocolate', 'lemonade', 'old-fashioned'] },
      { warn: 'Alcohol does not fully cook off in sauces. The Health tab flags it for no-alcohol, halal and pregnancy profiles.' },
      { h: 'Plant-based' },
      'Plant cooking is the world’s oldest cuisine: almost every region above has vegan classics (dal, falafel, gallo pinto, misir wot, mapo tofu without pork, ratatouille). Combine legumes and grains, season tofu boldly, and get B12 from fortified foods or a supplement.',
      { recipes: ['tofu-scramble', 'bean-burgers', 'buddha-bowl', 'lentil-shepherds'] },
      { h: 'Seafood' },
      'Fish cooks fast and gently: dry it well, cook it skin-side down, and pull it when it just flakes. Aim for fatty fish (salmon, sardines, mackerel, trout) about twice a week for omega-3s.',
      { recipes: ['salmon-asparagus', 'fish-tacos', 'shrimp-scampi', 'moules'] },
    ],
  },
]

export const atlas: Part = {
  id: 'atlas',
  title: 'Part 5 · The world atlas',
  blurb: 'Every major cuisine on earth: flavour base, pantry, techniques, dishes to master and what to watch out for.',
  chapters,
}
