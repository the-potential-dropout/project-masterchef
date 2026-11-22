/**
 * The Masterchef textbook: a long-form course that sits next to the lessons.
 * Lessons drill facts; the textbook explains the why, in order, from survival cooking
 * to cooking any cuisine on earth. Recipe ids and branch ids are checked by scripts/check-textbook.ts.
 */
import { atlas } from './textbookWorld'

export type Block =
  | string
  | { h: string }
  | { list: string[] }
  | { steps: string[] }
  | { tip: string }
  | { warn: string }
  | { table: [string, string][] }
  /** recipe cards with live cost and nutrition */
  | { recipes: string[] }

export interface Chapter {
  id: string
  title: string
  glyph: string
  summary: string
  /** Learn branch to practise this chapter */
  branch?: string
  blocks: Block[]
  /** "you've got it when…" checklist */
  mastery?: string[]
}

export interface Part {
  id: string
  title: string
  blurb: string
  chapters: Chapter[]
}

const intro: Part = {
  id: 'start',
  title: 'Start here',
  blurb: 'How this book works and how you will grow from survival cook to Masterchef.',
  chapters: [
    {
      id: 'how-to-use',
      title: 'How to use this book',
      glyph: '📖',
      summary: 'Read a chapter, cook its dishes twice, drill the lessons, tick the checklist.',
      blocks: [
        'This textbook is the long version of everything else in the app. The lessons drill facts in two minutes. The recipes tell you what to do tonight. The book tells you why, in the order a cook actually needs it.',
        { h: 'The order' },
        {
          steps: [
            'Survival first: eat well every day with a handful of cheap, healthy dishes. Nothing else matters if you are living on takeout.',
            'Foundations: knives, heat, oils, measuring, doneness, food safety and seasoning. These are the same in every kitchen on earth.',
            'The six-dish path: six dishes that each teach one technique, ending with dinner for friends.',
            'Mother techniques: stocks, sauces, braises, frying, doughs, eggs, grains, beans and fermentation. Every cuisine is built from these.',
            'The world atlas: every major cuisine on earth, its pantry, its flavour base, its techniques and the dishes to master.',
            'Becoming a Masterchef: palate training, menus, timing, plating, pressure tests and inventing your own dishes.',
          ],
        },
        { h: 'The rules' },
        {
          list: [
            'Cook every dish twice. The first time you follow. The second time you cook.',
            'Taste at every stage. Salt, acid, fat and heat are adjusted while cooking, not after.',
            'Use a thermometer for meat. Colour lies, thermometers do not.',
            'Write a note in the cook log after every attempt. Future you will thank you.',
            'Mistakes are the curriculum. Every recipe has an “If it goes wrong” section for a reason.',
          ],
        },
        { h: 'The four levels' },
        {
          table: [
            ['Apprentice', 'You can feed yourself healthy food every day and keep it safe. (Part 1)'],
            ['Cook', 'You control heat, knives and seasoning, and have cooked the six-dish path twice. (Parts 2–3)'],
            ['Chef', 'You know the mother techniques and can cook confidently from at least five cuisines. (Parts 4–5)'],
            ['Masterchef', 'You can taste, plan, time and plate a multi-course meal, and invent dishes that work. (Part 6)'],
          ],
        },
        { tip: 'Set up your health profile first (Health tab). Every recipe card in this book then shows its cost and nutrition, and the recipe pages warn you about anything that clashes with your diet, allergies or conditions.' },
        { warn: 'This book gives general cooking and nutrition information, not medical advice. If you have a medical condition, allergy or are pregnant, your doctor, dietitian or pharmacist outranks this book.' },
      ],
    },
  ],
}

const survival: Part = {
  id: 'survival',
  title: 'Part 1 · Survival: healthy food from day one',
  blurb: 'Before technique, before cuisines: a small set of healthy, cheap dishes that keep you fed, strong and well.',
  chapters: [
    {
      id: 'survival-plate',
      title: 'What your body needs every day',
      glyph: '🥦',
      summary: 'Protein, fibre, plants, good fats, water, and not too much salt. In plain words.',
      branch: 'foundations',
      blocks: [
        'Surviving well is not about a perfect diet. It is about hitting a few targets most days with food you actually like. Get these right and everything else is detail.',
        { h: 'The plate' },
        {
          list: [
            'Half the plate: vegetables and fruit. Fresh, frozen and canned all count (rinse canned ones to cut salt).',
            'A quarter: protein. Eggs, chicken, fish, tofu, beans, lentils, yogurt.',
            'A quarter: whole grains or starch. Brown rice, oats, whole-wheat pasta, potatoes with skin, bread.',
            'Drink water most of the time.',
          ],
        },
        { h: 'The numbers that matter' },
        {
          table: [
            ['Protein', '4 kcal per gram. Aim for some at every meal; it keeps you full and builds muscle. The Health tab sets your daily target from your height, weight and goal.'],
            ['Fibre', 'Most adults need 25–38 g a day and many get half that. Beans, lentils, oats, vegetables, fruit and whole grains.'],
            ['Fat', '9 kcal per gram, more than double protein or carbs. Favour olive oil, canola, nuts, seeds and fish.'],
            ['Saturated fat', 'Butter, cheese, fatty meat, coconut oil. Fine in moderation; replace with unsaturated fats where you can.'],
            ['Sodium', 'Keep it under about 2,300 mg a day (2,000 mg with high blood pressure). Sauces, broth, cheese, cured meat and soy sauce add up fast.'],
            ['Calories', 'Your body’s energy budget. The Health tab works it out (Mifflin-St Jeor) and adjusts for your goal.'],
          ],
        },
        { h: 'Why home cooking is the survival skill' },
        'Restaurant and packaged food is engineered for flavour, which usually means more salt, sugar and fat than you would add yourself. When you cook, you hold the salt shaker. That single fact is the biggest health upgrade in this book.',
        { tip: 'Use the Day builder in the Health tab: stack the meals you plan to eat today and see where you land against your targets. It suggests foods to fill protein or fibre gaps.' },
      ],
      mastery: ['You can describe a balanced plate without looking.', 'You know your own daily protein and fibre targets from the Health tab.', 'You can name three high-sodium foods to watch.'],
    },
    {
      id: 'survival-pantry',
      title: 'The survival pantry and shopping list',
      glyph: '🧺',
      summary: 'What to keep in the cupboard, fridge and freezer so a healthy meal is always 20 minutes away.',
      blocks: [
        'A stocked pantry is what stops you ordering takeout at 9 pm. Buy these once, top up as you go. The grocery list in the app works out packs, prices and your weekly total, and leaves pantry staples out unless you say you are out.',
        { h: 'Cupboard' },
        { list: ['Rolled oats', 'Rice (white and brown) and a whole-wheat pasta', 'Red lentils (cook in 15–20 min, no soaking)', 'Canned chickpeas, black beans and kidney beans', 'Canned tomatoes and tomato paste', 'Low-sodium broth or bouillon', 'Peanut butter or tahini', 'Olive oil and a neutral high-heat oil (canola or avocado)', 'Vinegar (red wine or cider) and soy sauce or tamari', 'Onions, garlic and potatoes (cool, dark place)'] },
        { h: 'Spice starter kit' },
        { list: ['Kosher salt and black pepper', 'Cumin and coriander', 'Smoked paprika and chili flakes', 'Garam masala or curry powder', 'Dried oregano', 'Cinnamon'] },
        { h: 'Fridge' },
        { list: ['Eggs', 'Plain yogurt (Greek for more protein)', 'Lemons or limes', 'A block of firm tofu or a pack of chicken thighs', 'Carrots, cabbage and a bag of greens (they last)', 'One hard cheese, like parmesan (a little goes a long way)'] },
        { h: 'Freezer: the survival vault' },
        { list: ['Frozen vegetables (peas, spinach, broccoli, stir-fry mix): picked ripe, just as nutritious, never go bad', 'Frozen berries and banana chunks for oats and smoothies', 'Frozen fish fillets or shrimp', 'Portions of your own batch cooking (chili, dal, soup)', 'Sliced bread (toast it straight from frozen)'] },
        { h: 'Cheap and healthy, ranked' },
        'Per serving, dried lentils, beans, oats, eggs, cabbage, carrots, frozen vegetables and canned fish are the cheapest nutrition you can buy. Look at the cost per serving on the recipe cards below: the plant-based dishes regularly come in under a couple of dollars.',
        { recipes: ['dal-tadka', 'chana-masala', 'lentil-shepherds', 'gigantes'] },
        { tip: 'The “Under $2.50 a serving” folder in Recipes → By diet and goal is the budget survival menu. Prices are estimates and editable in Groceries → Prices.' },
      ],
      mastery: ['Your pantry has the cupboard and spice lists stocked.', 'Your freezer always holds at least two meals you cooked.', 'You have built one grocery list in the app and stayed in your weekly budget.'],
    },
    {
      id: 'survival-dishes',
      title: 'The survival dishes',
      glyph: '🥣',
      summary: 'Two dozen healthy dishes, from no-cook to batch-cook, that keep you fed and well.',
      blocks: [
        'These are your first dishes, before any fancy technique. Each is healthy, cheap, and forgiving. Learn three from each group and you will never go hungry or live on takeout again.',
        { h: 'Breakfast: zero to five minutes' },
        'Overnight oats need no cooking at all: mix tonight, eat tomorrow. Avocado toast with a jammy egg teaches you to time an egg. A tofu scramble is the plant-based protein breakfast.',
        { recipes: ['overnight-oats', 'avocado-toast', 'tofu-scramble', 'eggs'] },
        { tip: 'Scrambled eggs are also lesson one of the six-dish path, because they teach heat control. Cook them now; you will cook them again later.' },
        { h: 'Lunch: no-cook bowls and salads that keep' },
        'Chickpea salad and warm black bean and kale salad keep for days in the fridge, so make them once and eat them three times. The Buddha bowl is the template for a balanced plate: grain, protein, vegetables, sauce.',
        { recipes: ['chickpea-salad', 'black-bean-kale', 'buddha-bowl'] },
        { h: 'Dinner: one-pot plant protein' },
        'Lentils and chickpeas are the survival super-foods: protein, lots of fibre, very cheap, and they reheat beautifully. Dal tadka and chana masala also teach your first spice technique (blooming spices in hot fat).',
        { recipes: ['dal-tadka', 'chana-masala', 'aloo-gobi', 'gigantes'] },
        { h: 'Dinner: lean protein, fast' },
        'Salmon with asparagus is a 25-minute dinner with omega-3 fats. Sheet-pan chicken is a whole dinner on one tray (it makes big portions: check “your portion” on the recipe page once your profile is set).',
        { recipes: ['salmon-asparagus', 'sheet-pan-chicken'] },
        { h: 'Batch cooking: cook once, eat five times' },
        'Chili, minestrone and lentil shepherd’s pie are made in big pots and freeze well. One Sunday of batch cooking feeds you most of the week.',
        { recipes: ['chili', 'minestrone', 'lentil-shepherds'] },
        { warn: 'Minestrone, chili and soups can run high in sodium because of broth and canned beans. Use low-sodium broth, rinse canned beans, and salt at the end, after tasting.' },
        { h: 'Healthy snacks and sides' },
        { recipes: ['roasted-chickpeas', 'edamame', 'popcorn', 'bok-choy', 'oi-muchim'] },
        { h: 'Smoothies for busy days' },
        'A smoothie is a fast way to get fruit, greens and protein in. Add yogurt, milk, tofu or peanut butter for protein, and keep the whole fruit in (juice loses the fibre).',
        { recipes: ['berry-smoothie', 'green-smoothie', 'pb-smoothie'] },
      ],
      mastery: ['You have cooked at least one dish from each group, twice.', 'You can make a breakfast, a lunch and a dinner without a recipe open.', 'You have at least two batch-cooked meals in the freezer.'],
    },
    {
      id: 'survival-week',
      title: 'Your first survival week',
      glyph: '🗓️',
      summary: 'A one-batch, one-shop week plan that covers every meal for about the price of two takeouts.',
      blocks: [
        'The trick to eating well every day is not cooking every day. It is cooking twice a week and assembling the rest.',
        { h: 'Sunday (about 2 hours)' },
        { steps: ['Shop with the app’s grocery list: add chili, dal tadka, overnight oats and chickpea salad, set your servings, and check the weekly total.', 'Start the chili; while it simmers, cook the dal.', 'Mix three jars of overnight oats.', 'Make the chickpea salad.', 'Cool everything quickly (shallow containers), then fridge what you will eat in 3–4 days and freeze the rest, labelled with the date.'] },
        { h: 'The week' },
        {
          table: [
            ['Breakfast', 'Overnight oats Monday to Wednesday, eggs on toast Thursday and Friday.'],
            ['Lunch', 'Chickpea salad Monday to Wednesday, leftover chili or dal after that.'],
            ['Dinner', 'Chili, dal with rice, then a fresh 25-minute dinner on Wednesday (salmon or stir-fry), then frozen portions.'],
            ['Snacks', 'Fruit, yogurt, roasted chickpeas, popcorn.'],
          ],
        },
        { h: 'Wednesday (30 minutes)' },
        'Cook one fresh dinner and a second small batch (another salad, or a pot of rice for the rest of the week). Wednesday stops the week from feeling like leftovers forever.',
        { warn: 'Leftovers: eat within 3–4 days, reheat once, to 165°F (74°C), until steaming. Cool and fridge cooked rice within an hour or two: rice bacteria make toxins that reheating does not destroy.' },
        { tip: 'Rate each dish in the cook log. After a month you will know which five dishes are your real survival kit.' },
      ],
      mastery: ['You have run one full batch-cook week.', 'You spent less on food that week than a normal takeout week.'],
    },
    {
      id: 'survival-safety',
      title: 'Food safety: the rules that keep you out of hospital',
      glyph: '🧼',
      summary: 'Temperatures, the danger zone, raw meat, leftovers and the foods that are dangerous if done wrong.',
      branch: 'foundations',
      blocks: [
        'Food safety is the one area of cooking where “close enough” is not good enough. These rules come from Health Canada and the USDA, and they are the same in every cuisine. Where the two differ, both are shown; the higher number is the cautious choice.',
        { h: 'Safe internal temperatures' },
        {
          table: [
            ['Poultry pieces, ground poultry', 'Health Canada 74°C (165°F) · USDA 165°F'],
            ['Whole poultry', 'Health Canada 82°C (180°F) · USDA 165°F'],
            ['Ground beef, pork, lamb', 'Both 71°C (160°F)'],
            ['Beef, veal, lamb steaks and roasts', 'Health Canada 63°C (145°F) medium-rare · USDA 145°F + 3-minute rest'],
            ['Pork chops and roasts', 'Health Canada 71°C (160°F) · USDA 145°F + 3-minute rest'],
            ['Fish', 'Health Canada 70°C (158°F) · USDA 145°F'],
            ['Egg dishes', 'Health Canada 74°C (165°F) · USDA 160°F'],
            ['Leftovers, reheated', 'Both 74°C (165°F)'],
          ],
        },
        { h: 'The danger zone' },
        'Bacteria grow fastest between 40°F and 140°F (4–60°C). Refrigerate cooked food within 2 hours (1 hour above 90°F / 32°C). Fridge at or below 40°F (4°C), freezer at 0°F (−18°C). Thaw in the fridge, in cold water changed every 30 minutes, or in the microwave if cooking right away, never on the counter.',
        { h: 'Clean habits' },
        { list: ['Never rinse raw chicken: it splashes bacteria around the sink. Pat it dry.', 'One board for raw meat, another for produce, or cut produce first.', 'Wash hands for 20 seconds after raw meat and eggs.', 'Marinade that touched raw meat must be boiled before it is used as a sauce.'] },
        { h: 'Foods that are dangerous if done wrong' },
        'Every cuisine has a few ingredients that need specific handling. You will meet them in the atlas; here is the master list.',
        {
          table: [
            ['Dried red kidney beans', 'Contain a toxin (lectin) destroyed only by a hard boil. Soak, then boil vigorously for at least 10 minutes before simmering. Never cook them from dry in a slow cooker. Canned beans are already safe.'],
            ['Cooked rice', 'Cool fast and refrigerate within 1–2 hours; reheat once until steaming.'],
            ['Garlic or herbs in oil', 'Homemade infused oils can grow botulism at room temperature. Keep them in the fridge and use within a few days, or freeze.'],
            ['Home canning', 'Low-acid foods (vegetables, meat, beans) need a pressure canner, not a water bath. Follow a tested recipe exactly.'],
            ['Raw fish for sushi or ceviche', 'Buy fish sold for raw eating, or fish frozen to kill parasites. Lime juice in ceviche does not kill bacteria or parasites.'],
            ['Shellfish', 'Mussels and clams must be alive before cooking: discard ones that stay open when tapped. Discard any that do not open after cooking.'],
            ['Cassava (yuca)', 'Must be peeled and fully cooked; never eat it raw. Bitter varieties need extra soaking and processing.'],
            ['Bamboo shoots, fiddleheads, elderberries', 'Must be cooked; some are toxic raw. Boil fiddleheads 15 minutes (or steam 10–12) and discard the water.'],
            ['Ackee (Jamaican)', 'Only eat fruit that has opened naturally on the tree, with the black seeds and pink membrane removed. Canned ackee is the safe choice.'],
            ['Wild mushrooms', 'Never forage without an expert. Some deadly species look like edible ones.'],
            ['Pufferfish (fugu)', 'Only prepared by licensed chefs. Not a home ingredient.'],
            ['Raw or runny eggs, rare meat, raw sprouts, unpasteurised cheese', 'Higher risk for pregnant people, young children, older adults and anyone with a weak immune system. The Health tab flags these.'],
          ],
        },
        { h: 'Fire and burn safety' },
        { list: ['A grease fire: turn off the heat and smother it with a lid or baking sheet. Never throw water on it.', 'Keep a fire extinguisher (class K or ABC) in the kitchen.', 'Turn pan handles inward. Dry food before it goes into hot oil; water makes oil spit.', 'Deep-frying: never fill a pot more than halfway with oil, and use a thermometer (350–375°F / 175–190°C).'] },
        { h: 'Allergens' },
        'If you cook for others, ask about allergies first. The main ones are peanuts, tree nuts, milk, eggs, wheat (gluten), soy, fish, shellfish, sesame and mustard. Hidden sources: soy sauce (wheat), pesto (nuts), Worcestershire and Caesar dressing (fish), many curry pastes (shrimp), refined peanut oil. Recipe pages flag allergens against your profile.',
      ],
      mastery: ['You own a thermometer and use it on every piece of meat.', 'You can list the safe temperatures from memory.', 'You know what to do with a grease fire.'],
    },
  ],
}

const foundations: Part = {
  id: 'foundations',
  title: 'Part 2 · Foundations',
  blurb: 'Knives, heat, fat, measuring, doneness and seasoning: the grammar of every kitchen.',
  chapters: [
    {
      id: 'kit',
      title: 'Your kit',
      glyph: '🔪',
      summary: 'The few tools that do almost everything, and how to use them.',
      branch: 'foundations',
      blocks: [
        'You do not need a gadget drawer. You need about a dozen good tools.',
        { table: [['Chef’s knife', 'Almost all cutting. Hone weekly, sharpen a few times a year, hand-wash.'], ['Paring and serrated knives', 'Small jobs; bread and tomatoes.'], ['Cutting boards', 'A big wooden or plastic board, plus one for raw meat. A damp towel underneath stops it sliding.'], ['Non-stick skillet', 'Eggs, pancakes, delicate fish. Low to medium heat only, never empty on high, no metal tools.'], ['Cast iron or stainless skillet', 'Searing and browning. Preheat properly. Stainless makes the brown bits (fond) for pan sauces.'], ['Dutch oven', 'Heavy lidded pot, stove to oven: soups, stews, braises, bread.'], ['Sheet pan', 'Rimmed and heavy. Roasting and sheet-pan dinners.'], ['Instant-read thermometer', 'The most important tool for safety and doneness.'], ['Kitchen scale', 'Essential for baking. Press tare to zero it.'], ['Microplane', 'Zest, garlic, ginger, parmesan.'], ['Wooden spoon, silicone spatula, tongs, whisk, ladle, fish spatula', 'Your hands, extended.'], ['A big pot and a small saucepan', 'Pasta, stock, rice, sauces.']] },
        { h: 'Later, when you are ready' },
        { list: ['A wok (carbon steel) for stir-frying', 'A blender (immersion or jug) for soups, sauces and smoothies', 'A mortar and pestle for curry pastes, pesto and spice blends', 'A stand or hand mixer for baking', 'A rice cooker or pressure cooker if you cook rice or beans often'] },
      ],
      mastery: ['You have the core kit.', 'You can hone your knife and know when it needs sharpening.'],
    },
    {
      id: 'knives',
      title: 'Knife skills',
      glyph: '🧅',
      summary: 'The pinch grip, the claw, and the cuts every recipe asks for.',
      branch: 'foundations',
      blocks: [
        'Good knife work is about safety and evenness. Even pieces cook evenly. A sharp knife is safer than a dull one, because it goes where you aim instead of slipping.',
        { h: 'Grip and guide' },
        { list: ['Pinch grip: thumb and index finger pinch the blade just in front of the handle; other fingers wrap the handle.', 'The claw: curl the fingertips of your guiding hand under, so your knuckles guide the side of the blade.', 'Make it stable: cut a flat side onto round things so they do not roll.', 'Rock or glide forward; do not chop straight down with force.'] },
        { h: 'The cuts' },
        { table: [['Small dice', 'About ¼ inch (6 mm) cubes. Salsas, soffritto.'], ['Medium dice', 'About ½ inch (1 cm). Soups, stews, roasting.'], ['Mince', 'As fine as possible. Garlic, ginger, chili.'], ['Julienne', 'Matchsticks. Stir-fries, slaws, garnish.'], ['Chiffonade', 'Leafy herbs rolled tight and sliced into ribbons.'], ['Against the grain', 'Slice meat across the muscle fibres so every bite is short and tender.']] },
        { h: 'The onion, properly' },
        { steps: ['Halve it through the root, peel, leave the root on (it holds the layers together).', 'Lay flat. Make vertical cuts towards the root, not through it.', 'Optional: one or two horizontal cuts.', 'Slice across: perfect dice falls away. Throw away the root.'] },
        { tip: 'The stir-fry on the six-dish path is the knife-skills dish. Expect your first one to take a long time to prep; by the tenth it will take ten minutes.' },
      ],
      mastery: ['You can dice an onion evenly without the root falling apart.', 'You can mince garlic and slice meat against the grain.'],
    },
    {
      id: 'heat',
      title: 'Heat and cooking methods',
      glyph: '🔥',
      summary: 'Reading your stove, dry heat versus wet heat, browning, braising, resting.',
      branch: 'foundations',
      blocks: [
        'Cooking is controlling heat. Every method is a different way of getting heat into food.',
        { h: 'Reading the stove' },
        { table: [['Low (1–3)', 'Melting, gentle simmering, rice. A few lazy bubbles.'], ['Medium (4–6)', 'Softening onions, eggs, pancakes. A steady sizzle.'], ['Medium-high (7–8)', 'Browning, searing, stir-frying. Oil shimmers, food hisses.'], ['High (9–10)', 'Boiling water, wok cooking, a hard sear. Watch closely.']] },
        'A simmer has small bubbles breaking gently. A boil is big, rolling and constant. Most soups, stews and sauces want a simmer: boiling makes meat tough and sauces split.',
        { h: 'Dry heat: flavour through browning' },
        'Searing, roasting, grilling, broiling, stir-frying, frying. Above about 300°F (150°C) proteins and sugars brown (the Maillard reaction), creating hundreds of flavour compounds. Wet food cannot brown: dry it, do not crowd the pan, and let it sit before you move it.',
        { h: 'Wet heat: tenderness' },
        'Boiling, simmering, poaching, steaming, braising. Gentle and even, it never goes above about 212°F (100°C). It is perfect for delicate foods (fish, eggs) and for tough cuts, whose collagen melts into gelatin after hours at a low simmer.',
        { h: 'Combination: braising' },
        'Sear for flavour, then cook slowly, partly covered in liquid, until fork-tender. Tough, cheap cuts become the best food in the world. Chili, bourguignon and bolognese are all braises at heart.',
        { h: 'Carry-over and resting' },
        'Meat keeps cooking 5–10°F after it leaves the heat. Pull it a little early and rest it (5 minutes for steaks, 15 for roasts) so juices settle instead of running onto the board.',
        { h: 'Ovens, broilers and air fryers' },
        { list: ['Preheat 15–20 minutes. Middle rack for most things.', 'Convection: lower the temperature 25°F (15°C), or check 25% sooner.', 'Broiler: top rack, door watched. Golden to burnt in under a minute.', 'Air fryer: a small convection oven, usually 375–400°F (190–200°C). Do not overcrowd; shake halfway.'] },
      ],
      mastery: ['You can tell a simmer from a boil at a glance.', 'You have seared something to a deep brown crust without moving it too early.'],
    },
    {
      id: 'fats',
      title: 'Oils and fats',
      glyph: '🫒',
      summary: 'Smoke points, which fat for which job, and fats and your health.',
      branch: 'foundations',
      blocks: [
        'Fat carries flavour, conducts heat and makes things crisp. The right fat depends on how hot you are cooking and what you want it to taste like. The cheat sheets (Learn → cheat sheets → Oils and fats) list every common oil with its smoke point and health notes.',
        { table: [['High heat (searing, wok, frying)', 'Avocado, refined peanut, canola, light olive oil, ghee.'], ['Medium heat (everyday sautéing)', 'Extra-virgin olive oil, butter (it browns above medium).'], ['No heat (finishing, dressing)', 'Extra-virgin olive oil, toasted sesame oil, flaxseed oil.']] },
        'A fat past its smoke point turns bitter and produces irritating fumes. If the pan smokes, take it off the heat.',
        { h: 'Health' },
        'Olive, canola, avocado and nut oils are mostly unsaturated, linked with better heart health. Butter, ghee, coconut oil and lard are high in saturated fat; Health Canada advises replacing them with unsaturated fats where you can. Omega-3s come from fatty fish, flax, chia, walnuts and some canola. All fats are about 9 kcal per gram, so measure your oil instead of glugging it.',
        { warn: 'Refined peanut oil is usually low in allergens, but tell guests with peanut allergies anyway.' },
      ],
      mastery: ['You can pick the right fat for searing, sautéing and dressing.'],
    },
    {
      id: 'measuring',
      title: 'Measuring, ratios and portions',
      glyph: '⚖️',
      summary: 'Conversions, the ratios that free you from recipes, and how much to cook.',
      branch: 'foundations',
      blocks: [
        'Cooking is forgiving; baking is not. Measure carefully when baking (weigh, ideally) and loosely when cooking, tasting as you go.',
        { h: 'Conversions' },
        { table: [['3 tsp', '1 tbsp'], ['16 tbsp', '1 cup'], ['1 cup', '250 ml (Canadian metric) or 240 ml (US recipes)'], ['1 lb', '454 g'], ['1 oz', '28 g'], ['350 / 400 / 425°F', '175 / 200 / 220°C']] },
        { h: 'Ratios to memorise' },
        { table: [['Vinaigrette', '3 parts oil : 1 part acid, plus salt and a little mustard.'], ['White rice', '1 cup rice : 1½ cups water, 15 min covered + 10 min rest.'], ['Brown rice', '1 : 2, 40–45 min.'], ['Quinoa', '1 : 2, 15 min.'], ['Pasta water', 'About 1 tbsp salt per 4 litres; it should taste pleasantly salty.'], ['Roux', 'Equal weights fat and flour.'], ['Béchamel', 'About 2 tbsp each butter and flour per cup of milk for a medium sauce.'], ['Pancake/crêpe batter', 'Roughly 1 cup flour : 1 cup milk : 1 egg (thicker or thinner from there).'], ['Bread dough', 'About 100 flour : 65–70 water : 2 salt : 1 yeast, by weight.'], ['Pie crust', '3 flour : 2 fat : 1 cold water, by weight.'], ['Brine', 'About 5–6% salt for a wet brine; 2–3% salt for vegetable ferments.']] },
        { h: 'Portions' },
        { list: ['Dry pasta: about 100 g per person for a main.', 'Rice: 1 cup dry makes about 3 cups cooked, enough for 3–4 sides.', 'Meat or fish: 120–170 g raw per person.', 'Your size matters: once your profile is set, recipe pages show “your portion” scaled to your height and goal.'] },
      ],
      mastery: ['You can make a vinaigrette and a pot of rice without a recipe.'],
    },
    {
      id: 'doneness',
      title: 'Meat, fish and doneness',
      glyph: '🌡️',
      summary: 'Tender cuts hot and fast, tough cuts low and slow, and how to tell when anything is done.',
      branch: 'foundations',
      blocks: [
        'There are only two kinds of meat: tender cuts that want to be cooked quickly, and tough cuts that want hours.',
        { table: [['Tender: steaks, chops, breast, tenderloin, fish', 'Sear, grill or roast hot and fast. Pull at the right temperature and rest.'], ['Tough: chuck, short ribs, shoulder, shank, brisket', 'Braise or slow-roast until about 195–205°F inside, when collagen melts and it shreds.']] },
        'Safe minimums are in the food-safety chapter. Cooks often go beyond them for texture: chicken thighs are safe at 165°F but most tender at 175–185°F; tough cuts need 200°F to fall apart.',
        { h: 'How to use a thermometer' },
        'Thickest part, not touching bone. For a whole chicken, the thickest part of the thigh. For thin things (fish, shrimp), learn the visual cues: fish flakes and turns opaque; shrimp turn pink and curl into a C (an O means overcooked).',
        { tip: 'Sheet-pan chicken (path dish 2) exists to make you own and use a thermometer. Roast chicken (the hosting dish) puts it to work on a whole bird.' },
        { recipes: ['sheet-pan-chicken', 'picanha', 'salmon-asparagus'] },
      ],
      mastery: ['You can choose fast or slow cooking from the cut alone.', 'You have pulled meat early and let carry-over finish it.'],
    },
    {
      id: 'flavour',
      title: 'Seasoning and flavour',
      glyph: '🧂',
      summary: 'Salt, acid, fat, heat, umami, aromatics, spices and herbs: the levers behind every great dish.',
      branch: 'foundations',
      blocks: [
        'Most bland food is not missing an ingredient. It is missing salt or acid. Learn to taste and adjust and every recipe you cook gets better.',
        { h: 'The levers' },
        { table: [['Salt', 'Makes food taste more like itself. Season a little at each stage, not all at the end.'], ['Acid', 'Lemon, lime, vinegar, tomato, yogurt. Brightens heavy or dull food. The most-forgotten lever.'], ['Fat', 'Carries flavour and adds richness.'], ['Heat', 'Chili heat, and the browning heat of cooking.'], ['Sweet', 'Balances acid, bitterness and chili. A pinch of sugar rescues a sour tomato sauce.'], ['Bitter', 'Greens, coffee, dark chocolate, charred bits. A little adds depth.'], ['Umami', 'Savoury depth: soy sauce, parmesan, tomato paste, miso, mushrooms, fish sauce, anchovy.']] },
        { h: 'Taste-and-fix' },
        { table: [['Flat or boring', 'Salt first, then acid.'], ['Too salty', 'More unsalted bulk (water, potato, beans), acid, or fat. You cannot remove salt.'], ['Too sour', 'A little sweetness or fat.'], ['Too spicy', 'Dairy, coconut milk, sugar, starch, or more of everything else.'], ['Too sweet', 'Acid, salt or bitterness.'], ['Heavy or greasy', 'Acid and fresh herbs.']] },
        { h: 'Building flavour in layers' },
        { list: ['Aromatics: onion, garlic, ginger, celery, carrot, chili, cooked in fat at the start.', 'Bloom spices: cook ground spices in hot oil for 30–60 seconds to wake them up.', 'Toast whole spices in a dry pan until fragrant, then grind.', 'Hardy herbs (rosemary, thyme, bay) go in early; soft herbs (basil, cilantro, parsley, mint) at the end.', 'Deglaze: splash liquid into the hot pan and scrape up the brown bits. Free flavour.', 'Finish: a squeeze of citrus, a drizzle of good oil, fresh herbs, flaky salt.'] },
        'Every cuisine in the atlas has its own “flavour base”: the aromatics it starts almost everything with. Learn the base and you can cook a hundred dishes from that region.',
      ],
      mastery: ['You taste and adjust every dish before serving.', 'You have rescued a bland dish with salt and acid.'],
    },
  ],
}

const path: Part = {
  id: 'path',
  title: 'Part 3 · The six-dish path',
  blurb: 'Six dishes, each secretly teaching one technique. Cook each twice. Dish six is dinner for friends.',
  chapters: [
    {
      id: 'six',
      title: 'The six dishes and what they teach',
      glyph: '⭐',
      summary: 'Heat control, roasting, building flavour, knife work, pan sauces, and hosting.',
      branch: 'foundations',
      blocks: [
        'The Home tab is the six-dish path. Each dish was chosen to teach one technique you will use for the rest of your life. Two dots fill in as you cook each one twice.',
        { table: [['1 · Scrambled eggs', 'Heat control. Pull them while glossy; they finish on the plate.'], ['2 · Sheet-pan chicken', 'Roasting and doneness. Own a thermometer.'], ['3 · Big-pot chili', 'Building flavour in layers and batch cooking. Garlic burns: add it after the onions soften.'], ['4 · Stir-fry with rice', 'Knife work and high heat. Prep everything before the pan gets hot.'], ['5 · Garlic tomato pasta', 'Pan sauces and starchy pasta water, which turns oil and juices into a glossy sauce.'], ['★ · Roast chicken and salad', 'Hosting: timing several things to finish together, for other people.']] },
        { recipes: ['eggs', 'sheet-pan-chicken', 'chili', 'stir-fry', 'pasta', 'roast-chicken'] },
        { h: 'Hosting the milestone dinner' },
        'The roast chicken recipe has a timeline. Work backwards from when you want to eat: the bird needs to rest 15 minutes, which is exactly when you dress the salad and carve. Ask guests about allergies and diets when you invite them, not at the door.',
        { tip: 'After each dish, write one line in the cook log: what you would change next time. The second attempt is where the lesson sticks.' },
      ],
      mastery: ['All twelve dots on the path are filled.', 'You have cooked dinner for at least two other people.'],
    },
  ],
}

const techniques: Part = {
  id: 'techniques',
  title: 'Part 4 · Mother techniques',
  blurb: 'The handful of techniques every cuisine on earth is built from. Learn them once, use them everywhere.',
  chapters: [
    {
      id: 'stocks',
      title: 'Stocks, broths and soups',
      glyph: '🍲',
      summary: 'Extracting flavour from bones, shells, vegetables and seaweed.',
      branch: 'soups',
      blocks: [
        'A stock is water that has been taught to taste of something. It is the base of soups, sauces, risottos and braises everywhere.',
        { table: [['Chicken stock', 'Bones or wings, onion, carrot, celery, bay, peppercorns. Barely simmer 3–4 hours. Never boil hard (it goes cloudy and greasy).'], ['Beef or brown stock', 'Roast the bones and vegetables first for colour and depth; 6–8 hours.'], ['Fish or shellfish stock', 'Fish frames or shrimp shells; only 20–40 minutes, or it turns bitter.'], ['Vegetable stock', 'Onion, carrot, celery, mushrooms, leek tops, herbs; 45 minutes.'], ['Dashi (Japan)', 'Kombu and bonito flakes steeped, not boiled: 10 minutes of work.'], ['Phở broth (Vietnam)', 'Charred onion and ginger, toasted star anise, cinnamon, clove.']] },
        'Salt stock lightly or not at all: it gets reduced later and concentrates.',
        { h: 'Soup families' },
        { list: ['Brothy: chicken noodle, phở, miso, avgolemono.', 'Puréed: butternut squash, roasted and blended.', 'Bisque: shellfish stock, enriched and blended.', 'Chowder: thickened with a roux or potatoes, often with milk.', 'Hearty: minestrone, lentil, bean.'] },
        { recipes: ['chicken-noodle', 'miso-soup', 'butternut-soup', 'shrimp-bisque', 'pho-ga', 'avgolemono'] },
        { warn: 'Blending hot soup: fill the blender no more than a third, remove the centre of the lid and cover with a towel. Steam pressure can blow the lid off.' },
      ],
      mastery: ['You have made a stock from scratch and used it.'],
    },
    {
      id: 'sauces',
      title: 'Sauces and emulsions',
      glyph: '🥄',
      summary: 'Roux sauces, pan sauces, emulsions, reductions and the world’s cold sauces.',
      blocks: [
        'Sauces are where cooks become chefs. Almost every sauce is one of a few types.',
        { h: 'Thickened with a roux' },
        'Cook equal parts fat and flour, then whisk in liquid. With milk it is béchamel (mac and cheese, lasagne, croque monsieur). With stock it is velouté. Cook the roux longer for colour and nuttiness, all the way to the dark roux of Cajun gumbo.',
        { recipes: ['mac-cheese', 'croque-monsieur', 'clam-chowder'] },
        { h: 'Pan sauces' },
        'Sear meat, pour off excess fat, deglaze with wine or stock, scrape up the fond, reduce, then swirl in cold butter off the heat. Five minutes, restaurant results.',
        { recipes: ['shrimp-scampi', 'teriyaki'] },
        { h: 'Emulsions' },
        'An emulsion holds fat and water together. Starch (pasta water), egg yolk, mustard and blending all help. Vinaigrette, mayonnaise, aioli, hollandaise, carbonara, cacio e pepe and hummus are all emulsions. Keep it from getting too hot (eggs scramble, cheese clumps) and add fat slowly.',
        { recipes: ['carbonara', 'cacio-e-pepe', 'hummus', 'caesar-salad'] },
        { h: 'Tomato sauces' },
        'Quick (garlic, tomato, 20 minutes, as in arrabbiata) or long-simmered (ragù, 3 hours). A pinch of sugar or a knob of butter balances acidic tomatoes.',
        { recipes: ['arrabbiata', 'bolognese'] },
        { h: 'Cold and raw sauces of the world' },
        { list: ['Salsa and pico de gallo (Mexico)', 'Chimichurri (Argentina) and vinagrete (Brazil)', 'Pesto (Italy)', 'Tzatziki (Greece) and raita (India)', 'Nước chấm (Vietnam)', 'Green chutney (India), zhoug (Yemen), mojo (Cuba, Canaries)'] },
        { recipes: ['pesto-pasta', 'guac-pico', 'tzatziki', 'vinagrete'] },
      ],
      mastery: ['You can make a béchamel, a pan sauce and a vinaigrette without a recipe.', 'You have rescued a broken emulsion.'],
    },
    {
      id: 'braise-roast',
      title: 'Braising, roasting and grilling',
      glyph: '🍖',
      summary: 'Big flavour from big heat, and big tenderness from long, slow heat.',
      blocks: [
        { h: 'Braising' },
        { steps: ['Season and sear the meat in batches until deeply brown.', 'Soften aromatics in the same pot.', 'Deglaze, add liquid to come partway up the meat.', 'Cover and cook at a low simmer or in a 300–325°F oven until fork-tender (2½–3½ hours for beef chuck).', 'Skim the fat, reduce the sauce, adjust the seasoning.'] },
        'Every cuisine braises: bourguignon (France), ragù (Italy), adobo (Philippines), red-braised pork (China), tagine (Morocco), birria (Mexico), rendang (Indonesia), stifado (Greece), pot roast (USA). Braises taste better the next day.',
        { recipes: ['bourguignon', 'bolognese', 'maafe'] },
        { h: 'Roasting' },
        'High heat (400–450°F) for vegetables and small cuts; moderate heat (325–350°F) for big roasts. Space things out on the pan, oil them lightly, and do not stir too often.',
        { recipes: ['roast-chicken', 'lemon-potatoes', 'shawarma'] },
        { h: 'Grilling and broiling' },
        'Direct heat for flavour and char. Marinades with acid (citrus, yogurt) and fruit enzymes (pear, pineapple) tenderise, but too long turns meat mushy. Charred is good; blackened and burnt is bitter.',
        { recipes: ['souvlaki', 'suya', 'picanha', 'bulgogi'] },
      ],
      mastery: ['You have braised a tough cut until it fell apart.'],
    },
    {
      id: 'frying',
      title: 'Sautéing, stir-frying and frying',
      glyph: '🍳',
      summary: 'From a film of oil to a full pot: the hot-fat methods.',
      blocks: [
        { table: [['Sauté', 'A little fat, medium-high, food moved often.'], ['Stir-fry', 'Very high heat, small pieces, constant motion, everything prepped first. Cook in batches so the wok stays hot.'], ['Pan-fry and shallow-fry', 'Fat partway up the food; flip once. Cutlets, fish, fritters.'], ['Deep-fry', 'Food submerged at 350–375°F (175–190°C), small batches, a thermometer, a lid nearby.']] },
        { h: 'Breading, the standard way' },
        'Flour, then beaten egg, then crumbs (panko for crunch). Use one hand for wet and one for dry. Rest the breaded food 10 minutes so the coating sticks.',
        { recipes: ['tonkatsu', 'eggplant-parm', 'fish-tacos'] },
        { h: 'Stir-frying' },
        'Velvet meat with a little cornstarch and soy for a silky texture. Sauce goes in last and only for a minute. Cold, day-old rice fries best.',
        { recipes: ['stir-fry', 'kung-pao', 'egg-fried-rice', 'kra-pao'] },
        { tip: 'Healthier frying: shallow-fry or air-fry instead of deep-fry, drain on a rack, and use a high-smoke-point unsaturated oil.' },
      ],
      mastery: ['You have cooked a stir-fry in batches without steaming the meat.'],
    },
    {
      id: 'doughs',
      title: 'Doughs, batters and baking',
      glyph: '🥖',
      summary: 'Gluten, leavening, and the science that makes baking reliable.',
      branch: 'desserts',
      blocks: [
        'Baking is chemistry. Weigh your ingredients, follow the method, and only change one thing at a time.',
        { table: [['Yeast doughs', 'Bread, pizza, buns. Knead to develop gluten, let rise, shape, rise again, bake hot.'], ['Quick breads', 'Banana bread, muffins: the muffin method (wet into dry, stir just until combined; lumps are fine).'], ['Creamed batters', 'Cookies, cakes: beat butter and sugar until fluffy to trap air.'], ['Pastry', 'Pie, quiche, scones: cold fat cut into flour, minimal water, minimal handling.'], ['Thin batters', 'Crêpes, pancakes. Rest the batter so the flour hydrates.'], ['Laminated and unleavened doughs', 'Scallion pancakes, phyllo, flatbreads, tortillas, dumpling wrappers.']] },
        { h: 'Leavening' },
        'Baking soda needs an acid (buttermilk, yogurt, brown sugar). Baking powder has its own acid. Yeast is alive: it needs warmth, time and food, and is killed above about 140°F (60°C).',
        { recipes: ['pizza', 'banana-bread', 'cookies', 'pancakes', 'crepes', 'quiche', 'dumplings'] },
        { warn: 'Raw flour and raw batter can carry E. coli. Do not eat raw cookie dough unless the flour has been heat-treated.' },
      ],
      mastery: ['You have baked a yeast dough and a quick bread.'],
    },
    {
      id: 'eggs-grains-beans',
      title: 'Eggs, grains and legumes',
      glyph: '🌾',
      summary: 'The staples of every civilisation, and how to cook each one well.',
      blocks: [
        { h: 'Eggs' },
        { table: [['Scrambled', 'Medium-low, constant folding, pull while glossy.'], ['Boiled', 'Into boiling water: 6–7 min jammy, 10–12 min hard; ice bath.'], ['Poached', 'Fresh eggs, barely simmering water, 3–4 min. Or poach in sauce (shakshuka).'], ['Fried', 'Medium heat, a lid to set the top.'], ['Custards', 'Low heat or a water bath; temper hot liquid into eggs slowly so they do not scramble.']] },
        { recipes: ['shakshuka', 'quiche', 'oyakodon'] },
        { h: 'Grains' },
        'Rice: rinse until the water runs clearer (except for risotto and paella, which want the starch). Toast grains in fat first for a nuttier result (pilaf, arroz rojo, jollof). Whole grains (brown rice, quinoa, farro, barley, bulgur) bring fibre.',
        { recipes: ['risotto', 'arroz-rojo', 'jollof', 'biryani', 'onigiri', 'mango-sticky-rice'] },
        { h: 'Legumes' },
        'Lentils need no soaking. Dried beans: soak overnight, drain, and simmer 1–2 hours (boil red kidney beans hard for 10 minutes first). Salt beans when they are nearly tender, and add acid (tomato, vinegar) late, because acid stops them softening. Beans and grains together make complete protein.',
        { recipes: ['dal-tadka', 'chana-masala', 'gigantes', 'hummus', 'bean-burgers'] },
      ],
      mastery: ['You can cook rice, lentils and an egg three ways without a recipe.'],
    },
    {
      id: 'ferment',
      title: 'Pickling, fermenting and preserving',
      glyph: '🫙',
      summary: 'Quick pickles, live ferments, curing and the long flavours of the world.',
      blocks: [
        'Before refrigerators, every cuisine preserved food with salt, acid, sugar, smoke or fermentation. Those flavours (kimchi, miso, sauerkraut, fish sauce, yogurt, cheese, cured ham) are now the backbone of world cooking.',
        { table: [['Quick pickle', 'Vinegar, water, sugar and salt poured over vegetables; ready in 30 minutes, keeps a couple of weeks in the fridge. Bánh mì pickles, vinagrete, pickled onions.'], ['Salting vegetables', 'Salt draws water out for crunch and stops dressings going watery (oi muchim, tzatziki).'], ['Lacto-fermentation', 'Vegetables in 2–3% salt brine at room temperature for days to weeks. Sauerkraut, kimchi, sour pickles. Keep everything under the brine.'], ['Yogurt and dairy', 'Milk plus live culture kept warm overnight.'], ['Curing', 'Salt and time on meat or fish (gravlax, bacon). Use tested recipes and curing salt where specified.']] },
        { recipes: ['banh-mi', 'oi-muchim', 'kimchi-fried-rice', 'kimchi-jjigae'] },
        { warn: 'Fermentation safety: fuzzy mould on the surface, a rotten smell or slime means throw it out. Home canning of low-acid foods needs a pressure canner. Garlic-in-oil must be refrigerated.' },
      ],
      mastery: ['You have made a quick pickle and used it in a dish.'],
    },
  ],
}

const master: Part = {
  id: 'masterchef',
  title: 'Part 6 · Becoming a Masterchef',
  blurb: 'Palate, menus, timing, plating, pressure tests and your own food.',
  chapters: [
    {
      id: 'palate',
      title: 'Training your palate',
      glyph: '👅',
      summary: 'Tasting deliberately, so you can fix, balance and invent.',
      blocks: [
        'Great cooks are great tasters. A palate is trained, not born.',
        { steps: ['Taste every component on its own before combining: the sauce, the rice, the vegetable.', 'Taste side by side: two olive oils, three vinegars, cheap and good soy sauce.', 'Season a cup of plain broth one lever at a time (salt, then acid, then sweet, then fat) and note how each changes it.', 'When you eat out, name what you taste: what is the acid? The fat? What gives the crunch?', 'Recreate a restaurant dish at home from memory, then compare notes.'] },
        'Keep a flavour journal (the cook log works) of pairings that surprised you.',
      ],
      mastery: ['You can identify the acid, fat and main aromatic in a dish you did not cook.'],
    },
    {
      id: 'menus',
      title: 'Menus, timing and hosting',
      glyph: '🕰️',
      summary: 'Planning a multi-course meal so everything lands hot, on time, and you get to sit down.',
      blocks: [
        { h: 'Build a balanced menu' },
        { list: ['Vary methods: if the main is braised, make a crisp, fresh side.', 'Vary richness: a rich main wants a light starter and a bright dessert.', 'Vary colour and texture: something crunchy, something soft, something green.', 'At most one dish that needs last-minute attention.', 'Cover dietary needs: ask guests, and make sure there is a full meal for anyone who skips the main.'] },
        { h: 'Work backwards' },
        'Write the serving time at the bottom of a page and plan up: what rests, what holds warm, what can be made the day before (braises, desserts, dressings, dough). The roast chicken recipe’s timeline is the template.',
        { h: 'Mise en place' },
        'Everything chopped, measured and in bowls before the first pan is hot. This is the single habit that separates calm kitchens from chaos.',
        { h: 'Plating' },
        { list: ['Warm plates for hot food.', 'Odd numbers, height, and negative space.', 'Sauce under, not over, crisp things.', 'One garnish that you can eat and that belongs in the dish.', 'Wipe the rim.'] },
      ],
      mastery: ['You have hosted a three-course dinner where everything came out on time.'],
    },
    {
      id: 'pressure',
      title: 'Pressure tests and invention',
      glyph: '🏆',
      summary: 'The competition drills that turn a good cook into a Masterchef.',
      blocks: [
        'Competition cooking tests three things: technique under pressure, using what is in front of you, and having your own point of view. Practise all three.',
        { table: [['Mystery box', 'Pick five random ingredients from your kitchen; make a dish in 45 minutes. Start by asking: which mother technique fits these?'], ['Pressure test', 'Cook a technical dish exactly to spec, against a clock: risotto in 25 minutes, a béchamel, a perfect omelette, a pie crust.'], ['Invention test', 'Take one dish and move it to another cuisine: tacos with bulgogi, risotto with miso, a shakshuka with curry spices. Keep the technique, change the flavour base.'], ['Team or service challenge', 'Cook the same dish for eight people. Scale the recipe and use the grocery list to shop for it.'], ['Recreate', 'Taste a dish once, cook it from memory.']] },
        { h: 'Developing your own dishes' },
        { steps: ['Start from a technique you trust.', 'Choose a flavour base from the atlas.', 'Add contrast: acid, crunch, freshness, heat.', 'Cook it three times, changing one thing each time, and note results.', 'Write it up in the same format as the app’s recipes: what it teaches, steps, fixes, variations.'] },
        { h: 'The Masterchef checklist' },
        { list: ['All six path dishes cooked twice.', 'All Foundations lessons complete.', 'At least one dish cooked from every region of the atlas.', 'Five mother sauces or emulsions from memory.', 'A yeast bread, a pastry and a custard.', 'A three-course dinner party hosted.', 'Three original recipes that friends asked for.'] },
      ],
      mastery: ['You have won your own mystery box at least once (your guests are the judges).'],
    },
  ],
}

export const textbook: Part[] = [intro, survival, foundations, path, techniques, atlas, master]
export const allChapters = textbook.flatMap((p) => p.chapters.map((c) => ({ chapter: c, part: p })))
export const findChapter = (id: string) => allChapters.find((x) => x.chapter.id === id)
