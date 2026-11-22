# Hand-written chapters of the Masterchef book (everything except the world atlas).
# Page = [id, title, markdown text, viz or None]. Markdown: **bold** (map chips), tables (| ... |, first row = header),
# "- " bullets, "1. " steps, "## " subheads, "> " callouts, [@ref] citations, {{r:id}} recipe rows.

CORE = []
DEEP = {}

def ch(title, pages):
    CORE.append({"t": title, "s": pages})

ch("Start here", [
    ["cover", "Masterchef", "", {"type": "cover"}],
    ["how", "How this book works",
     """This book takes you from **survival cooking** (healthy food every day, from zero) to cooking any cuisine on earth.
- **Read** a page, then **cook** its dishes. Every dish in this book is a recipe in the Project Masterchef app.
- **Cook every dish twice.** The first time you follow. The second time you cook.
- **Taste at every stage.** Salt, acid, fat and heat get adjusted while you cook, not after.
- **Use a thermometer** for meat. Colour lies; thermometers don't.
- **Write it down** in the app's cook log after every attempt.
> Mistakes are the curriculum. Every recipe has an "if it goes wrong" section for a reason.""",
     {"type": "loop", "steps": ["Read the page", "Cook it once", "Cook it twice", "Log what changed", "Drill the lesson"]}],
    ["levels", "The four levels",
     """| Level | You can… | Parts |
| **Apprentice** | Feed yourself healthy food every day and keep it safe | 1 |
| **Cook** | Control heat, knives and seasoning; the six-dish path cooked twice | 2–3 |
| **Chef** | Use the mother techniques; cook confidently from five or more cuisines | 4–5 |
| **Masterchef** | Taste, plan, time and plate a multi-course meal; invent dishes that work | 6 |
- Set up your **health profile** in the app first. Recipe pages then show your portion and warn about anything that clashes with your diet, allergies or conditions.
- This book is general cooking and nutrition information, not medical advice. Your doctor, dietitian or pharmacist outranks it.""",
     {"type": "stack", "layers": ["Masterchef", "Chef", "Cook", "Apprentice"]}],
])

ch("Survival: what your body needs", [
    ["plate", "The balanced plate",
     """Surviving well isn't about a perfect diet. It's about hitting a few targets most days with food you actually like.
- **Half the plate**: vegetables and fruit. Fresh, frozen and canned all count.
- **A quarter**: **protein foods**. Eggs, chicken, fish, tofu, beans, lentils, yogurt.
- **A quarter**: **whole grains**. Brown rice, oats, whole-wheat pasta, whole-grain bread.
- **Water** as your usual drink.
That's the plate in Canada's food guide, which also says to choose plant-based protein more often [@cfg_plate]. It works for mixed dishes too: a stir-fry, a curry or a soup can still be half vegetables.""",
     {"type": "plate", "segs": [["Vegetables + fruit", .5], ["Protein foods", .25], ["Whole grains", .25]]}],
    ["macros", "Macros and calories in plain words",
     """| Nutrient | kcal per gram | What it does | Where you get it |
| **Protein** | 4 | Builds and repairs muscle, keeps you full | Meat, fish, eggs, dairy, tofu, beans, lentils |
| **Carbohydrates** | 4 | Your main fuel | Grains, fruit, vegetables, legumes |
| **Fat** | 9 | Essential, but dense | Olive oil, nuts, seeds, fish |
| **Fibre** | ~2 | Digestion, fullness, cholesterol | Beans, oats, vegetables, fruit, whole grains |
| **Alcohol** | 7 | Nothing useful | Drinks, and wine in sauces |
- **Calories** are your energy budget. The app estimates yours with the **Mifflin-St Jeor** equation from your weight, height, age and sex [@mifflin1990], then adjusts for activity and goal.
- Most adults need **25–38 g of fibre** a day and many get half that.""",
     {"type": "bars", "items": [["Fat", 9], ["Alcohol", 7], ["Protein", 4], ["Carbohydrates", 4]], "unit": "Calories per gram: fat is more than twice as dense as protein or carbs."}],
    ["sodium", "Salt and sodium",
     """**Sodium** is the part of salt your blood pressure cares about.
- Health Canada recommends most people aim for about **1,500 mg** a day and stay **under 2,300 mg** [@hc_sodium]. That's just over one teaspoon of salt.
- Most sodium comes from **processed and restaurant food**, not your salt shaker. Sauces, broth, cheese, cured meat, soy sauce and stock cubes add up fast.
- The app's recipe cards show sodium per serving. Several healthy dishes are still salty: phở, tom yum and pad thai all run over 2,000 mg.
## Cut sodium without losing flavour
- Use **low-sodium broth** and rinse canned beans.
- Salt at the end, **after tasting**.
- Use **acid** (lemon, vinegar), herbs, garlic, chili and **umami** (tomato paste, mushrooms) instead.
- Measure soy sauce and fish sauce by the teaspoon.""",
     {"type": "bars", "items": [["Daily limit", 2300], ["Daily aim", 1500], ["1 tbsp soy sauce", 900], ["1 stock cube", 900], ["1 tsp salt", 2300]], "unit": "Milligrams of sodium (approximate; check labels)."}],
    ["why-cook", "Why home cooking is the survival skill",
     """Restaurant and packaged food is engineered for flavour, which usually means more salt, sugar and fat than you'd add yourself. When you cook, you hold the salt shaker.
- You control **portions**: the app scales every recipe to "your portion" from your height and goal.
- You control **cost**: most survival dishes in the app cost a few dollars a serving.
- You control **what goes in**: allergies, diets and health conditions are flagged on every recipe.
> Cooking at home is the single biggest health upgrade in this book.""",
     {"type": "flows", "rows": [["Takeout", "Their salt", "Their portion", "Their price"], ["Home", "Your salt", "Your portion", "Your price"]]}],
])

ch("Survival: pantry and dishes", [
    ["pantry", "The survival pantry",
     """A stocked pantry is what stops you ordering takeout at 9 pm.
| Where | Keep |
| **Cupboard** | Rolled oats, rice, whole-wheat pasta, red lentils, canned chickpeas and beans, canned tomatoes, tomato paste, low-sodium broth, peanut butter or tahini, olive oil, a high-heat oil, vinegar, soy sauce, onions, garlic, potatoes |
| **Spices** | Kosher salt, black pepper, cumin, coriander, smoked paprika, chili flakes, garam masala, dried oregano, cinnamon |
| **Fridge** | Eggs, plain yogurt, lemons, tofu or chicken thighs, carrots, cabbage, greens, parmesan |
| **Freezer** | Frozen vegetables and berries, fish fillets or shrimp, your own batch-cooked meals, sliced bread |
- **Frozen vegetables** are picked ripe, just as nutritious, and never go bad.
- The app's grocery list counts packs, prices the trip and leaves pantry staples out unless you say you're out.""",
     {"type": "hub", "center": "Survival pantry", "spokes": ["Oats", "Lentils", "Canned beans", "Canned tomato", "Eggs", "Yogurt", "Frozen veg", "Rice"]}],
    ["cheap", "Cheap and healthy, ranked",
     """Per serving, the cheapest nutrition you can buy is dried **lentils**, **beans**, oats, eggs, cabbage, carrots, frozen vegetables and canned fish.
These are the cheapest survival dishes in the app, with their estimated cost and nutrition per serving:
{{r:dal-tadka}}
{{r:chana-masala}}
{{r:lentil-shepherds}}
{{r:gigantes}}
{{r:roasted-chickpeas}}
- The "Under $2.50 a serving" folder in the app's recipes is the budget survival menu. Prices are estimates you can edit.""",
     {"type": "bars", "items": [], "fromRecipes": ["dal-tadka", "roasted-chickpeas", "lentil-shepherds", "chana-masala", "gigantes", "overnight-oats", "salmon-asparagus"], "key": "cost", "unit": "Estimated cost per serving, in dollars, from the app's grocery prices."}],
    ["sv-breakfast", "Survival breakfasts",
     """Start the day with protein and fibre and lunch takes care of itself.
{{r:overnight-oats}}
{{r:avocado-toast}}
{{r:tofu-scramble}}
{{r:eggs}}
- **Overnight oats** need no cooking: mix tonight, eat tomorrow.
- The **jammy egg** teaches timing: 6–7 minutes in boiling water, then ice.
- **Scrambled eggs** are also dish one of the six-dish path, because they teach heat control.""",
     {"type": "bars", "items": [], "fromRecipes": ["overnight-oats", "avocado-toast", "tofu-scramble", "eggs"], "key": "P", "unit": "Grams of protein per serving."}],
    ["sv-lunch", "Survival lunches: salads and bowls that keep",
     """Make once, eat three times. Salads built on beans, grains and sturdy vegetables keep for days in the fridge.
{{r:chickpea-salad}}
{{r:black-bean-kale}}
{{r:buddha-bowl}}
- The **Buddha bowl** is the template for a balanced plate: grain + protein + vegetables + sauce.
- Dress leafy salads just before eating; dress bean and grain salads ahead (they get better).""",
     {"type": "split3", "cols": [["Base", "Grain", "Beans", "Greens"], ["Add", "Protein", "Crunch", "Something rich"], ["Finish", "Acid", "Herbs", "Salt"]]}],
    ["sv-dinner", "Survival dinners",
     """**Lentils** and **chickpeas** are the survival super-foods: protein, lots of fibre, very cheap, and they reheat well. Dal and chana masala also teach your first spice technique, blooming spices in hot fat.
{{r:dal-tadka}}
{{r:chana-masala}}
{{r:aloo-gobi}}
{{r:salmon-asparagus}}
{{r:sheet-pan-chicken}}
- **Salmon** is a 25-minute dinner with omega-3 fats.
- **Sheet-pan chicken** is a whole dinner on one tray. It makes big portions; check "your portion" in the app.""",
     {"type": "bars", "items": [], "fromRecipes": ["dal-tadka", "chana-masala", "aloo-gobi", "salmon-asparagus", "sheet-pan-chicken"], "key": "fib", "unit": "Grams of fibre per serving."}],
    ["sv-batch", "Batch cooking: cook once, eat five times",
     """**Batch cooking** is the survival strategy: big pots on Sunday, easy meals all week.
{{r:chili}}
{{r:minestrone}}
{{r:lentil-shepherds}}
- Cool fast in **shallow containers**, fridge what you'll eat in 3–4 days, freeze the rest with a date label.
- Soups and chili can run high in sodium: low-sodium broth, rinsed beans, salt at the end.""",
     {"type": "flow", "steps": ["Big pot|Sunday", "Cool fast|shallow boxes", "Fridge|3–4 days", "Freezer|months", "Reheat|to 74°C / 165°F"]}],
    ["sv-snacks", "Healthy snacks, sides and smoothies",
     """{{r:roasted-chickpeas}}
{{r:edamame}}
{{r:popcorn}}
{{r:bok-choy}}
{{r:berry-smoothie}}
{{r:pb-smoothie}}
- A **smoothie** is a fast way to get fruit, greens and protein in. Add yogurt, milk, tofu or peanut butter for protein, and keep the whole fruit (juice loses the fibre).""",
     {"type": "bars", "items": [], "fromRecipes": ["edamame", "roasted-chickpeas", "popcorn", "pb-smoothie", "berry-smoothie"], "key": "kcal", "unit": "Calories per serving."}],
    ["sv-week", "Your first survival week",
     """The trick to eating well every day isn't cooking every day. It's cooking twice a week and assembling the rest.
| Day | Do |
| **Sunday** (2 h) | Shop from the app's grocery list. Make chili and dal, three jars of overnight oats and a chickpea salad. Cool, fridge, freeze. |
| **Mon–Wed** | Oats, chickpea salad, chili or dal with rice. |
| **Wednesday** (30 min) | One fresh dinner (salmon or stir-fry) and a pot of rice. |
| **Thu–Sun** | Eggs on toast, leftovers and frozen portions. |
- Rate each dish in the cook log. After a month you'll know your real five-dish survival kit.""",
     {"type": "timeline", "items": [["Sun", "batch cook"], ["Mon", "oats + salad"], ["Tue", "chili"], ["Wed", "fresh dinner"], ["Thu", "dal + rice"], ["Fri", "freezer meal"]]}],
])

ch("Survival: food safety", [
    ["temps", "Safe internal temperatures",
     """Use an instant-read **thermometer** in the thickest part, not touching bone. Health Canada and the USDA don't always agree, so here are both:
| Food | Health Canada | USDA |
| Poultry pieces and ground poultry | 74°C (165°F) | 165°F (74°C) |
| Whole poultry | 82°C (180°F) | 165°F (74°C) |
| Ground beef, pork, lamb | 71°C (160°F) | 160°F (71°C) |
| Beef, veal, lamb steaks and roasts | 63°C (145°F) medium-rare | 145°F (63°C) + 3-min rest |
| Pork chops and roasts | 71°C (160°F) | 145°F (63°C) + 3-min rest |
| Fish | 70°C (158°F) | 145°F (63°C) |
| Egg dishes | 74°C (165°F) | 160°F (71°C) |
| Leftovers, reheated | 74°C (165°F) | 165°F (74°C) |
Sources: Health Canada [@hc_temps] and USDA [@fsis_temps]. When they differ, the higher number is the cautious choice, and it's the one to use for anyone pregnant, very young, older or with a weak immune system.""",
     {"type": "thermo", "marks": [[63, "Beef steak (both)"], [70, "Fish (Health Canada)"], [71, "Ground meat, pork (HC)"], [74, "Poultry pieces, leftovers"], [82, "Whole poultry (HC)"]]}],
    ["danger", "The danger zone and the 2-hour rule",
     """Bacteria grow fastest between **4°C and 60°C (40–140°F)**: the **danger zone**. In that range they can double in as little as 20 minutes [@fsis_danger].
- Refrigerate cooked food **within 2 hours**, or within 1 hour if it's above 32°C (90°F) [@fsis_danger].
- Fridge at or below 4°C (40°F); freezer at −18°C (0°F).
- Cool big batches fast in **shallow containers**.
- **Thaw** in the fridge, in cold water changed every 30 minutes, or in the microwave if you're cooking right away. Never on the counter.
- **Leftovers**: eat within 3–4 days and reheat to 74°C (165°F) [@fsis_leftovers].""",
     {"type": "danger"}],
    ["clean", "Clean habits",
     """- **Never rinse raw chicken.** The splash spreads bacteria around the sink. Pat it dry instead.
- **Separate boards**: one for raw meat, one for produce, or cut produce first.
- **Wash hands** for 20 seconds after raw meat and eggs.
- **Marinade** that touched raw meat must be boiled before it's used as a sauce.
- **Cooked rice**: cool it and refrigerate it within an hour or two. *Bacillus cereus* spores survive cooking, grow in warm rice and make a toxin that reheating does not destroy [@wa_rice].""",
     {"type": "flows", "rows": [["Raw meat", "Its own board", "Hot soapy wash", "Then produce"], ["Cooked rice", "Spread to cool", "Fridge < 2 h", "Reheat once"]]}],
    ["risky", "Foods that are dangerous if done wrong",
     """Every cuisine has a few ingredients that need specific handling. You'll meet them in the atlas; here's the master list.
| Food | The rule |
| **Dried red kidney beans** | Soak at least 5 hours, discard the water, then boil vigorously for at least 10 minutes [@hc_lectins]. Never cook them from dry in a slow cooker. Canned beans are already safe. |
| **Garlic or herbs in oil** | Homemade infused oils can grow botulism at room temperature. Fridge them and use within a few days, or freeze. |
| **Home canning** | Low-acid foods (vegetables, meat, beans) need a pressure canner and a tested recipe [@nchfp]. |
| **Raw fish** (sushi, ceviche, poke) | Buy fish sold for raw eating or previously frozen to kill parasites. Lime juice doesn't kill bacteria. |
| **Mussels and clams** | Must be alive before cooking. Throw away any that don't open when cooked [@hc_temps]. |
| **Cassava** | Peel and cook fully; never eat it raw. |
| **Fiddleheads** | Boil 15 minutes or steam 10–12, and discard the water [@hc_fiddle]. |
| **Ackee** | Only canned, or fruit that opened naturally on the tree with seeds and membrane removed. |
| **Wild mushrooms, pufferfish** | Not home ingredients. |""",
     {"type": "split", "lt": "Raw: danger", "rt": "Done right: safe", "left": ["Raw kidney beans", "Raw cassava", "Raw fiddleheads", "Garlic oil on counter"], "right": ["Soak + hard boil", "Peel + cook fully", "Boil 15 / steam 12", "Fridge, few days"]}],
    ["fire", "Fire, burns and allergens",
     """## Fire and burns
- **Grease fire**: turn off the heat, smother it with a lid or baking sheet. **Never throw water on it.**
- Keep a kitchen fire extinguisher (class K or ABC).
- Turn pan handles inward. Dry food before it goes into hot oil; water makes oil spit.
- **Deep-frying**: never fill a pot more than halfway, and use a thermometer (175–190°C / 350–375°F).
## Allergens
Ask guests first. The main ones: peanuts, tree nuts, milk, eggs, wheat (gluten), soy, fish, shellfish, sesame and mustard.
- Hidden sources: soy sauce (wheat), pesto (nuts), Worcestershire and Caesar dressing (fish), many curry pastes (shrimp), most gochujang (wheat).
- The app flags allergens on every recipe against your profile.""",
     {"type": "flow", "steps": ["Flames!|stay calm", "Heat off", "Lid on|smother", "Leave it|until cool"]}],
])

ch("Foundations: kit and knives", [
    ["kit", "Your kit",
     """You don't need a gadget drawer. You need about a dozen good tools.
| Tool | Use |
| **Chef's knife** | Almost all cutting. Hone weekly, sharpen a few times a year. |
| **Non-stick skillet** | Eggs, pancakes, delicate fish. Low–medium heat, never empty on high. |
| **Cast iron or stainless skillet** | Searing and browning; stainless makes **fond** for pan sauces. |
| **Dutch oven** | Soups, stews, braises, bread. Stove to oven. |
| **Sheet pan** | Roasting and sheet-pan dinners. |
| **Instant-read thermometer** | Safety and doneness. |
| **Kitchen scale** | Baking. Press tare to zero it. |
| Microplane, tongs, spatula, whisk | Your hands, extended. |
- Later: a **wok**, a blender, a mortar and pestle, a stand mixer.""",
     {"type": "hub", "center": "Core kit", "spokes": ["Chef's knife", "Boards", "Non-stick pan", "Cast iron", "Dutch oven", "Sheet pan", "Thermometer", "Scale"]}],
    ["knife-grip", "Grip, guide and the claw",
     """Good knife work is about **safety** and **evenness**: even pieces cook evenly. A sharp knife is safer than a dull one, because it goes where you aim instead of slipping.
- **Pinch grip**: thumb and index finger pinch the blade just in front of the handle.
- **The claw**: curl the fingertips of your other hand under, so your knuckles guide the side of the blade.
- **Stable base**: cut a flat side onto round things so they don't roll. A damp towel under the board stops it sliding.
- Rock or glide forward; don't chop straight down with force.""",
     {"type": "flow", "steps": ["Flat side down", "Pinch grip", "Claw hand", "Glide forward"]}],
    ["cuts", "The cuts every recipe asks for",
     """| Cut | Size | Used for |
| **Small dice** | ~6 mm (¼ in) | Salsas, soffritto |
| **Medium dice** | ~1 cm (½ in) | Soups, stews, roasting |
| **Mince** | As fine as possible | Garlic, ginger, chili |
| **Julienne** | Matchsticks | Stir-fries, slaws |
| **Chiffonade** | Ribbons of rolled leaves | Basil, mint |
| **Against the grain** | Across the muscle fibres | Meat, so every bite is tender |
## The onion, properly
1. Halve through the root; peel; keep the root on.
2. Lay flat. Cut towards the root, not through it.
3. Optional: one or two horizontal cuts.
4. Slice across. Perfect dice falls away.""",
     {"type": "flow", "steps": ["Halve|through root", "Peel", "Vertical cuts|to the root", "Slice across|dice!"]}],
])

ch("Foundations: heat", [
    ["stove", "Reading your stove",
     """Cooking is controlling heat.
| Setting | Use | Looks like |
| **Low** (1–3) | Melting, gentle simmer, rice | A few lazy bubbles |
| **Medium** (4–6) | Onions, eggs, pancakes | Steady sizzle |
| **Medium-high** (7–8) | Browning, searing, stir-fries | Oil shimmers, food hisses |
| **High** (9–10) | Boiling water, wok, hard sear | Watch closely |
A **simmer** has small bubbles breaking gently; a **boil** is big, rolling and constant. Most soups, stews and sauces want a simmer: boiling toughens meat and splits sauces.""",
     {"type": "simmer"}],
    ["maillard", "Dry heat and browning",
     """Searing, roasting, grilling, broiling, stir-frying and frying are **dry heat**. Above about 140–165°C (285–330°F), proteins and sugars react and brown: the **Maillard reaction**, which creates hundreds of flavour compounds. Sugars alone brown by **caramelization** at higher temperatures.
- **Wet food can't brown**: while there's water on the surface it stays near 100°C. Pat food dry.
- **Don't crowd the pan**: crowded food steams in its own juices.
- **Leave it alone**: let a crust form before you flip.
- Past brown is **burnt**: bitter, acrid. Garlic burns fastest.""",
     {"type": "maillard"}],
    ["wet", "Wet heat, braising and resting",
     """**Wet heat** (boiling, simmering, poaching, steaming, braising) never goes much above 100°C. It's gentle and even, perfect for delicate foods (fish, eggs) and for tough cuts, whose **collagen** melts into gelatin after hours at a low simmer.
- **Braising** = sear for flavour, then cook slowly, partly covered in liquid, until fork-tender.
- **Carry-over cooking**: meat keeps rising 3–5°C (5–10°F) after it leaves the heat. Pull it a little early.
- **Resting** (5 minutes for steaks, 15 for roasts) lets juices settle.""",
     {"type": "carry"}],
    ["ovens", "Ovens, broilers and air fryers",
     """- **Preheat** 15–20 minutes. Middle rack for most things.
- **Convection** (fan): lower the temperature 15°C (25°F), or check 25% sooner.
- **Broiler**: top rack, door watched. Golden to burnt in under a minute.
- **Air fryer**: a small convection oven, usually 190–200°C (375–400°F). Don't overcrowd; shake halfway.
| Common temperatures | Use |
| 150–165°C (300–325°F) | Braises, slow roasts |
| 175°C (350°F) | Cakes, cookies, casseroles |
| 200–220°C (400–425°F) | Roast vegetables, chicken |
| 230–290°C (450–550°F) | Pizza, bread, hard roasting |""",
     {"type": "bars", "items": [["Pizza", 260], ["Roast vegetables", 220], ["Roast chicken", 220], ["Cookies", 175], ["Braise", 150]], "unit": "Typical oven temperatures, °C."}],
])

ch("Foundations: fat, measuring and doneness", [
    ["smoke", "Oils, fats and smoke points",
     """Fat carries flavour, conducts heat and makes things crisp. The **smoke point** is where a fat starts to smoke, turn bitter and give off irritating fumes.
| Heat | Fats |
| **High** (searing, wok, frying) | Avocado, refined peanut, canola, light olive oil, ghee |
| **Medium** (everyday sautéing) | Extra-virgin olive oil, butter |
| **None** (finishing, dressing) | Extra-virgin olive oil, toasted sesame oil, flaxseed oil |
- **Unsaturated fats** (olive, canola, avocado, nut oils) are linked with better heart health. **Saturated fats** (butter, ghee, coconut oil, lard) are best in moderation.
- All fats are about 9 kcal per gram: measure your oil instead of glugging it.""",
     {"type": "bars", "items": [["Avocado oil", 500], ["Ghee", 470], ["Light olive oil", 465], ["Peanut (refined)", 450], ["Canola", 425], ["Extra-virgin olive", 390], ["Toasted sesame", 350], ["Butter", 325], ["Flaxseed", 225]], "unit": "Approximate smoke points, °F. They vary by brand and refinement."}],
    ["ratios", "Measuring and the ratios that free you",
     """Cooking is forgiving; baking isn't. Weigh when you bake; taste as you go when you cook.
| Ratio | Recipe |
| **Vinaigrette** | 3 oil : 1 acid + salt + a little mustard |
| **White rice** | 1 rice : 1½ water, 15 min covered + 10 min rest |
| **Brown rice / quinoa** | 1 : 2 |
| **Roux** | Equal weights fat and flour |
| **Béchamel** | ~2 tbsp butter + 2 tbsp flour per cup of milk |
| **Bread** | 100 flour : 65–70 water : 2 salt : 1 yeast (by weight) |
| **Pie crust** | 3 flour : 2 fat : 1 cold water (by weight) |
| **Brine** | ~5–6% salt (meat); 2–3% (vegetable ferments) |
- 3 tsp = 1 tbsp; 16 tbsp = 1 cup; 1 cup = 250 ml (Canadian metric) or 240 ml (US recipes); 1 lb = 454 g.""",
     {"type": "rice"}],
    ["portions", "Portions",
     """| Food | Per person (main course) |
| Dry pasta | About 100 g |
| Raw meat or fish | 120–170 g |
| Rice | 1 cup dry feeds 3–4 as a side |
| Vegetables | Half the plate |
- People are different sizes. Once your profile is set, every recipe page in the app shows **your portion** ("about 1.25 servings"), scaled from your height and goal.""",
     {"type": "plate", "segs": [["Vegetables", .5], ["120–170 g protein", .25], ["~100 g dry grain", .25]]}],
    ["cuts-meat", "Tender cuts, tough cuts",
     """There are only two kinds of meat:
| Kind | Examples | Cook |
| **Tender** | Steaks, chops, breast, tenderloin, fish | Hot and fast; pull at temperature; rest |
| **Tough** | Chuck, short ribs, shoulder, shank, brisket | Low and slow until about 93°C (200°F) inside, when collagen melts |
- Chicken thighs are safe at 74°C but most tender at 80–85°C (175–185°F).
- Thin things: **fish** flakes and turns opaque; **shrimp** turn pink and curl into a C (an O means overcooked).
{{r:sheet-pan-chicken}}
{{r:picanha}}
{{r:salmon-asparagus}}""",
     {"type": "split", "lt": "Tender: fast", "rt": "Tough: slow", "left": ["Steak · sear", "Chicken breast · roast", "Fish · pan-fry", "Pork chop · grill"], "right": ["Chuck · braise", "Short ribs · braise", "Pork shoulder · slow roast", "Brisket · smoke"]}],
])

ch("Foundations: seasoning and flavour", [
    ["levers", "The flavour levers",
     """Most bland food isn't missing an ingredient. It's missing **salt** or **acid**.
| Lever | What it does |
| **Salt** | Makes food taste more like itself. Season a little at each stage. |
| **Acid** | Lemon, lime, vinegar, tomato, yogurt. Brightens heavy or dull food. The most-forgotten lever. |
| **Fat** | Carries flavour and adds richness. |
| **Heat** | Chili heat, and the browning heat of cooking. |
| **Sweet** | Balances acid, bitterness and chili. |
| **Bitter** | Greens, coffee, char. A little adds depth. |
| **Umami** | Savoury depth: soy sauce, parmesan, tomato paste, miso, mushrooms, fish sauce, anchovy. |""",
     {"type": "hub", "center": "Delicious", "spokes": ["Salt", "Acid", "Fat", "Heat", "Sweet", "Bitter", "Umami"]}],
    ["taste-fix", "Taste and fix",
     """Taste before you serve, every time.
| Problem | Fix |
| Flat, boring | **Salt** first, then **acid** |
| Too salty | Add unsalted bulk (water, potato, beans), acid or fat. You can't remove salt. |
| Too sour | A little sweetness or fat |
| Too spicy | Dairy, coconut milk, sugar, starch, or more of everything else |
| Too sweet | Acid, salt or bitterness |
| Heavy, greasy | Acid and fresh herbs |
Try the balancer: move the sliders and see what a cook would do next.""",
     {"type": "balance"}],
    ["layers", "Building flavour in layers",
     """- **Aromatics** (onion, garlic, ginger, celery, carrot, chili) cooked in fat at the start.
- **Bloom spices**: ground spices in hot oil for 30–60 seconds wakes them up.
- **Toast whole spices** in a dry pan until fragrant, then grind.
- **Hardy herbs** (rosemary, thyme, bay) go in early; **soft herbs** (basil, cilantro, parsley, mint) at the end.
- **Deglaze**: splash liquid into the hot pan and scrape up the **fond**. Free flavour.
- **Finish**: a squeeze of citrus, a drizzle of good oil, fresh herbs, flaky salt.
> Every cuisine has a **flavour base**: the aromatics it starts almost everything with. Learn the base and you can cook a hundred dishes from that region.""",
     {"type": "flow", "steps": ["Fat|hot pan", "Aromatics|soften", "Spices|bloom", "Liquid|deglaze", "Simmer|build", "Finish|acid + herbs"]}],
])

ch("The six-dish path", [
    ["six", "Six dishes, six techniques",
     """The Home screen of the app is the **six-dish path**. Each dish was chosen to teach one technique you'll use for the rest of your life. Two dots fill in as you cook each one twice.
| # | Dish | Teaches |
| 1 | Scrambled eggs | **Heat control**: pull them while glossy |
| 2 | Sheet-pan chicken | Roasting and doneness: own a thermometer |
| 3 | Big-pot chili | Building flavour in layers; batch cooking |
| 4 | Stir-fry with rice | Knife work and high heat |
| 5 | Garlic tomato pasta | Pan sauces and **pasta water** |
| ★ | Roast chicken + salad | **Hosting**: timing several things for other people |""",
     {"type": "flow", "steps": ["Eggs|heat", "Sheet pan|roasting", "Chili|flavour", "Stir-fry|knife + wok", "Pasta|pan sauce", "Roast chicken|hosting"]}],
    ["six-cards", "The path, with numbers",
     """{{r:eggs}}
{{r:sheet-pan-chicken}}
{{r:chili}}
{{r:stir-fry}}
{{r:pasta}}
{{r:roast-chicken}}
- One new dish a week is a good pace.
- After each, write one line in the cook log: what you'd change next time.""",
     {"type": "checklist", "key": "six", "items": ["Scrambled eggs, twice", "Sheet-pan chicken, twice", "Big-pot chili, twice", "Stir-fry with rice, twice", "Garlic tomato pasta, twice", "Roast chicken dinner for friends, twice"]}],
    ["hosting", "Hosting the milestone dinner",
     """The roast chicken recipe has a **timeline**. Work backwards from when you want to eat.
- The bird **rests** 15 minutes: exactly when you dress the salad and carve.
- Ask guests about **allergies** and diets when you invite them, not at the door.
- Make dessert the day before.
- **Mise en place**: everything prepped before the oven goes on.""",
     {"type": "timeline", "items": [["−2 h", "prep, oven on"], ["−1:45", "chicken in"], ["−40", "potatoes, wash greens"], ["−15", "rest bird, dress salad"], ["0", "carve + serve"]]}],
])

ch("Mother techniques: stocks and sauces", [
    ["stocks", "Stocks and broths",
     """A **stock** is water taught to taste of something: the base of soups, sauces, risottos and braises everywhere.
| Stock | How |
| **Chicken** | Bones or wings, onion, carrot, celery, bay, peppercorns. Barely simmer 3–4 h. Never boil hard. |
| **Brown** (beef) | Roast bones and vegetables first; 6–8 h. |
| **Fish / shellfish** | Frames or shrimp shells; only 20–40 min or it turns bitter. |
| **Vegetable** | Onion, carrot, celery, mushrooms, leek tops; 45 min. |
| **Dashi** (Japan) | Kombu and bonito flakes, steeped not boiled: 10 minutes. |
| **Phở broth** | Charred onion and ginger, toasted star anise, cinnamon, clove. |
- Salt stock lightly or not at all; it gets reduced later.""",
     {"type": "flow", "steps": ["Bones / veg", "Cold water", "Barely simmer", "Skim", "Strain", "Cool fast"]}],
    ["soups", "Soup families",
     """| Family | Examples in the app |
| Brothy | Chicken noodle, phở, miso, avgolemono |
| Puréed | Roasted butternut squash |
| **Bisque** | Shrimp bisque (shellfish stock, enriched, blended) |
| **Chowder** | Clam, corn (thickened with roux or potatoes) |
| Hearty | Minestrone, lentil |
{{r:chicken-noodle}}
{{r:butternut-soup}}
{{r:shrimp-bisque}}
{{r:pho-ga}}
- Blending hot soup: fill the blender only a third, vent the lid, cover with a towel.""",
     {"type": "split3", "cols": [["Brothy", "Chicken noodle", "Phở", "Miso"], ["Puréed", "Squash", "Bisque", "Corn chowder"], ["Hearty", "Minestrone", "Lentil", "Clam chowder"]]}],
    ["roux", "Roux sauces and pan sauces",
     """## Thickened with a roux
Cook equal parts fat and flour, then whisk in liquid. With milk: **béchamel** (mac and cheese, lasagne, croque monsieur). With stock: **velouté**. Cook the roux longer for colour, all the way to the dark roux of gumbo.
## Pan sauces
Sear meat, pour off excess fat, **deglaze** with wine or stock, scrape up the **fond**, reduce, then swirl in cold butter off the heat.
{{r:mac-cheese}}
{{r:croque-monsieur}}
{{r:shrimp-scampi}}""",
     {"type": "stack", "layers": ["Dark roux · gumbo", "Brown roux · gravy", "Blond roux · velouté", "White roux · béchamel"]}],
    ["emulsions", "Emulsions",
     """An **emulsion** holds fat and water together. Starch (pasta water), egg yolk, mustard and blending all help.
- Vinaigrette, mayonnaise, aioli, hollandaise, **carbonara**, cacio e pepe and **hummus** are all emulsions.
- Keep it from getting too hot (eggs scramble, cheese clumps) and add fat slowly.
- Broken? Start again with a spoon of water or a fresh yolk and whisk the broken sauce in slowly.
{{r:carbonara}}
{{r:cacio-e-pepe}}
{{r:hummus}}
{{r:caesar-salad}}""",
     {"type": "emulsion"}],
    ["world-sauces", "Tomato sauces and the world's cold sauces",
     """**Tomato sauces**: quick (garlic and tomato, 20 minutes, like arrabbiata) or long-simmered (ragù, 3 hours). A pinch of sugar or a knob of butter balances acidic tomatoes.
| Cold sauce | From |
| Salsa, pico de gallo | Mexico |
| Chimichurri; vinagrete | Argentina; Brazil |
| Pesto | Italy |
| Tzatziki; raita | Greece; India |
| Nước chấm | Vietnam |
| Green chutney; zhoug; mojo | India; Yemen; Cuba |
{{r:arrabbiata}}
{{r:pesto-pasta}}
{{r:tzatziki}}""",
     {"type": "hub", "center": "Cold sauces", "spokes": ["Salsa", "Chimichurri", "Pesto", "Tzatziki", "Nước chấm", "Chutney", "Zhoug"]}],
])

ch("Mother techniques: heat methods", [
    ["braise", "Braising",
     """1. Season and **sear** the meat in batches until deeply brown.
2. Soften aromatics in the same pot.
3. **Deglaze**, add liquid partway up the meat.
4. Cover; low simmer or 150–165°C (300–325°F) oven until fork-tender.
5. Skim the fat, reduce, adjust seasoning.
Every cuisine braises: bourguignon, ragù, adobo, red-braised pork, tagine, birria, rendang, stifado, pot roast. Braises taste better the next day.
{{r:bourguignon}}
{{r:bolognese}}
{{r:maafe}}""",
     {"type": "flow", "steps": ["Sear", "Aromatics", "Deglaze", "Low + slow", "Reduce"]}],
    ["roast-grill", "Roasting and grilling",
     """- **Roasting**: high heat (200–230°C) for vegetables and small cuts; moderate (165–175°C) for big roasts. Space things out; don't stir too often.
- **Grilling and broiling**: direct heat for char. **Marinades** with acid (citrus, yogurt) and fruit enzymes (pear, pineapple) tenderise, but too long turns meat mushy.
{{r:roast-chicken}}
{{r:shawarma}}
{{r:souvlaki}}
{{r:suya}}
{{r:bulgogi}}""",
     {"type": "split", "lt": "Roast", "rt": "Grill", "left": ["Hot dry air", "Space on the pan", "Big cuts: moderate", "Veg: very hot"], "right": ["Direct flame", "Marinate first", "Char, not burn", "Rest after"]}],
    ["fry", "Sauté, stir-fry and fry",
     """| Method | How |
| **Sauté** | A little fat, medium-high, food moved often |
| **Stir-fry** | Very high heat, small pieces, constant motion; prep everything first; cook in batches |
| **Pan-fry** | Fat partway up the food; flip once |
| **Deep-fry** | Submerged at 175–190°C (350–375°F), small batches, thermometer, lid nearby |
- **Breading**: flour → beaten egg → crumbs (panko for crunch). Rest 10 minutes so it sticks.
- **Velveting**: coat meat in cornstarch and a little soy before stir-frying for a silky texture.
{{r:stir-fry}}
{{r:kung-pao}}
{{r:egg-fried-rice}}
{{r:tonkatsu}}""",
     {"type": "flow", "steps": ["Prep all|mise en place", "Wok smoking", "Protein|batch 1", "Veg|batch 2", "Sauce|1 minute", "Serve now"]}],
])

ch("Mother techniques: dough, grains, beans and ferments", [
    ["dough", "Doughs, batters and baking",
     """Baking is chemistry: weigh, follow the method, change one thing at a time.
| Family | Key move | In the app |
| **Yeast doughs** | Knead for gluten, rise, shape, rise, bake hot | Pizza |
| **Quick breads** | Wet into dry, stir just until combined | Banana bread |
| **Creamed batters** | Beat butter and sugar until fluffy | Cookies |
| **Pastry** | Cold fat cut into flour, minimal handling | Quiche, apple crisp |
| **Thin batters** | Rest the batter | Crêpes, pancakes |
| **Laminated / unleavened** | Roll, fold, roll | Scallion pancakes, dumplings |
- **Baking soda** needs an acid (buttermilk, yogurt). **Baking powder** has its own. **Yeast** is alive and dies above about 60°C (140°F).
- Raw flour can carry E. coli: don't eat raw dough unless the flour is heat-treated.""",
     {"type": "split3", "cols": [["Yeast", "Pizza", "Bread", "Buns"], ["Chemical", "Pancakes", "Muffins", "Cookies"], ["Fat-layered", "Pie crust", "Phyllo", "Scallion pancakes"]]}],
    ["eggs-grains", "Eggs and grains",
     """| Eggs | How |
| **Scrambled** | Medium-low, constant folding, pull while glossy |
| **Boiled** | Into boiling water: 6–7 min jammy, 10–12 min hard; ice bath |
| **Poached** | Fresh eggs, barely simmering water, 3–4 min (or in sauce: shakshuka) |
| **Custard** | Low heat; **temper** hot liquid into eggs slowly |
**Rice**: rinse until clearer (except risotto and paella, which want the starch). **Toast** grains in fat first for pilafs, arroz rojo and jollof.
{{r:shakshuka}}
{{r:risotto}}
{{r:jollof}}
{{r:biryani}}""",
     {"type": "timeline", "items": [["3 min", "poached"], ["6 min", "jammy"], ["8 min", "soft-hard"], ["10 min", "hard"], ["12 min", "very hard"]]}],
    ["legumes", "Beans and lentils",
     """- **Lentils** need no soaking: red in 15–20 min, green or brown in 25–30.
- **Dried beans**: soak overnight, drain, simmer 1–2 hours. **Red kidney beans**: boil hard at least 10 minutes first [@hc_lectins].
- Salt beans when nearly tender; add acid (tomato, vinegar) late, because acid stops them softening.
- Beans + grains = **complete protein**.
{{r:dal-tadka}}
{{r:hummus}}
{{r:bean-burgers}}
{{r:gigantes}}""",
     {"type": "flow", "steps": ["Soak|5 h+", "Drain", "Hard boil|10 min", "Simmer|1–2 h", "Salt late"]}],
    ["ferment", "Pickling, fermenting and preserving",
     """Before fridges, every cuisine preserved food with salt, acid, sugar, smoke or fermentation. Those flavours (kimchi, miso, sauerkraut, fish sauce, yogurt, cheese) are now the backbone of world cooking.
| Method | How |
| **Quick pickle** | Hot vinegar, water, sugar and salt over vegetables; ready in 30 min; fridge 2 weeks |
| **Salting** | Draws water out for crunch (oi muchim, tzatziki) |
| **Lacto-fermentation** | Vegetables in 2–3% salt brine at room temperature for days; keep them under the brine |
| **Curing** | Salt and time on meat or fish; tested recipes only |
- Fuzzy mould, rot smell or slime: throw it out.
{{r:banh-mi}}
{{r:oi-muchim}}
{{r:kimchi-jjigae}}""",
     {"type": "timeline", "items": [["30 min", "quick pickle"], ["1 day", "salted cucumber"], ["3–7 days", "kimchi"], ["2–4 weeks", "sauerkraut"], ["months", "miso"]]}],
])

DEEP.update({
    "plate": "The plate is about proportions over a day, not perfection at every meal. A breakfast of oats and berries, a lunch of chickpea salad and a dinner of dal with rice and a side of greens adds up to a plate-shaped day even though no single meal looks like the picture.\n\nIf you're trying to lose fat, the plate still works: keep the half of vegetables, keep the protein, and shrink the grain quarter. If you're building muscle, grow the protein and grain quarters and keep the vegetables.",
    "temps": "Why do the two agencies differ? Safety is about time as well as temperature: bacteria die faster the hotter it is, so 63°C held for a few minutes can be as safe as a higher temperature reached for an instant. The USDA builds that into its 3-minute rest for whole cuts. Health Canada publishes simpler single numbers with more margin, for example 71°C for pork and 82°C for whole birds.\n\nFor everyday cooking, either set is a sound target for healthy adults. The higher Canadian numbers are the cautious choice for anyone at higher risk.",
    "maillard": "Browning is the reason a seared steak tastes nothing like a boiled one, and why roasted vegetables beat steamed ones for flavour. Because water can't get hotter than 100°C at normal pressure, wet surfaces stall below browning temperatures. That's why recipes keep telling you to pat things dry, use a hot pan and leave space between pieces.",
    "levers": "Professional cooks taste constantly and make small adjustments. A useful habit: before you add more of anything, ask which lever is missing. Ninety percent of the time the answer is salt or acid, and a pinch of salt plus a squeeze of lemon turns 'fine' into 'good'.",
    "emulsions": "Fat and water don't mix on their own. An emulsifier has one end that likes water and one that likes fat, so it coats tiny droplets and keeps them apart: lecithin in egg yolk, compounds in mustard, and the starch in pasta water all work this way. Adding fat slowly gives the emulsifier time to coat each new droplet; dumping it in at once overwhelms it, and the sauce 'breaks' into greasy puddles.",
    "danger": "Cooling is where home cooks most often go wrong. A big pot of chili can sit in the danger zone for many hours if you put it straight into the fridge, because the middle cools so slowly. Divide it into shallow containers (5 cm deep or less) and leave the lids off until it stops steaming.",
})
