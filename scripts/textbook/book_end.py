END = []

END.append({"t": "Becoming a Masterchef", "s": [
    ["palate", "Training your palate",
     """Great cooks are great tasters, and a **palate** is trained, not born.
1. Taste every component on its own before combining: the sauce, the rice, the vegetable.
2. Taste side by side: two olive oils, three vinegars, cheap and good soy sauce.
3. Season a cup of plain broth one lever at a time (salt, then acid, then sweet, then fat) and notice each change.
4. When you eat out, name what you taste: what's the acid? the fat? the crunch?
5. Recreate a restaurant dish at home from memory, then compare notes.
- Keep a flavour journal (the cook log works) of pairings that surprised you.""",
     {"type": "loop", "steps": ["Taste", "Name it", "Adjust one lever", "Taste again", "Write it down"]}],
    ["menus", "Menus, timing and mise en place",
     """## Build a balanced menu
- Vary **methods**: a braised main wants a crisp, fresh side.
- Vary **richness**: a rich main wants a light starter and a bright dessert.
- Vary colour and texture: something crunchy, something soft, something green.
- At most **one** dish that needs last-minute attention.
- Cover every guest's diet with a full meal, not just sides.
## Work backwards
Write the serving time at the bottom of a page and plan upwards: what rests, what holds warm, what can be made the day before (braises, desserts, dressings, dough).
> **Mise en place**: everything chopped, measured and in bowls before the first pan is hot.""",
     {"type": "timeline", "items": [["Day before", "dessert, braise"], ["−3 h", "mise en place"], ["−1 h", "main in oven"], ["−20 min", "starter out"], ["0", "serve"], ["+40", "dessert"]]}],
    ["plating", "Plating",
     """- **Warm plates** for hot food, cold plates for cold.
- Odd numbers, **height**, and empty space.
- Sauce **under** crisp things, never over them.
- One garnish that you can eat and that belongs in the dish.
- Wipe the rim.
- Serve the hot thing **last** and fast.""",
     {"type": "hub", "center": "The plate", "spokes": ["Warm plate", "Height", "Sauce under", "Odd numbers", "Edible garnish", "Clean rim"]}],
    ["pressure", "Pressure tests and the mystery box",
     """Competition cooking tests three things: technique under pressure, using what's in front of you, and having your own point of view.
| Drill | How |
| **Mystery box** | Five random ingredients from your kitchen, a dish in 45 minutes. First ask: which mother technique fits? |
| **Pressure test** | A technical dish exactly to spec, against a clock: risotto in 25 minutes, a béchamel, an omelette, a pie crust |
| **Invention test** | Move a dish to another cuisine: bulgogi tacos, miso risotto, curry-spiced shakshuka. Keep the technique, change the flavour base. |
| **Service** | The same dish for eight people. Scale it and shop with the app's grocery list. |
| **Recreate** | Taste a dish once, cook it from memory. |""",
     {"type": "split3", "cols": [["Mystery box", "5 ingredients", "45 minutes", "Pick a technique"], ["Pressure test", "One spec", "A clock", "Exact result"], ["Invention", "Keep technique", "Swap base", "New dish"]]}],
    ["invent", "Inventing your own dishes",
     """1. Start from a **technique** you trust.
2. Choose a **flavour base** from the atlas.
3. Add **contrast**: acid, crunch, freshness, heat.
4. Cook it three times, changing one thing each time, and note the results.
5. Write it up like the app's recipes: what it teaches, steps, fixes, variations.""",
     {"type": "flow", "steps": ["Technique", "Flavour base", "Contrast", "Cook ×3", "Write it up"]}],
    ["final", "The Masterchef checklist",
     """Tick these off as you go. They're saved in your browser.
- All six path dishes cooked twice.
- Every Foundations lesson complete.
- At least one dish from every region of the atlas.
- Five sauces or emulsions from memory.
- A yeast bread, a pastry and a custard.
- A three-course dinner party, hosted.
- Three original recipes that friends asked for.""",
     {"type": "checklist", "key": "final", "items": ["All six path dishes, twice", "Foundations lessons complete", "One dish from every atlas region", "Five sauces from memory", "A yeast bread", "A pastry", "A custard", "A three-course dinner party", "Three original recipes friends asked for"]}],
]})

END.append({"t": "Sources and further reading", "s": [
    ["biblio", "Bibliography", "Sources cited in this book, numbered in order of first citation. Guidance changes; check the official page before relying on a number. This book is general cooking and nutrition information, not medical advice.", None],
    ["reading", "Further reading",
     """- **Harold McGee**, *On Food and Cooking*: the science of everything in the kitchen.
- **Samin Nosrat**, *Salt, Fat, Acid, Heat*: the flavour levers, beautifully explained.
- **J. Kenji López-Alt**, *The Food Lab* and *The Wok*: technique, tested.
- **Nik Sharma**, *The Flavor Equation*: how taste works.
- **Mark Bittman**, *How to Cook Everything*: the reference for every staple.
- **Marcella Hazan**, *Essentials of Classic Italian Cooking*.
- **Madhur Jaffrey**, *Indian Cookery* and *World Vegetarian*.
- **Fuchsia Dunlop**, *Every Grain of Rice* (Chinese home cooking).
- **Diana Kennedy**, *The Essential Cuisines of Mexico*.
- **Andrea Nguyen**, *Into the Vietnamese Kitchen*.
- **Yotam Ottolenghi and Sami Tamimi**, *Jerusalem*.
- **Health Canada** food safety pages and **Canada's food guide**; **USDA FSIS** food safety basics.""", None],
]})

REFS = {
    "cfg_plate": ["Health Canada", "Make healthy meals with Canada's food guide plate", "Canada's food guide", "https://www.canada.ca/en/health-canada/services/food-guide/eating-support/cooking/make-healthy-meals-plate.html"],
    "mifflin1990": ["Mifflin, M. D., St Jeor, S. T., Hill, L. A., Scott, B. J., Daugherty, S. A. and Koh, Y. O.", "A new predictive equation for resting energy expenditure in healthy individuals", "American Journal of Clinical Nutrition 51(2): 241–247 (1990)", "https://pubmed.ncbi.nlm.nih.gov/2305711/"],
    "hc_sodium": ["Health Canada", "Sodium Intake of Canadians in 2017", "Health Canada (2018)", "https://www.canada.ca/en/health-canada/services/publications/food-nutrition/sodium-intake-canadians-2017.html"],
    "hc_temps": ["Health Canada", "Safe cooking temperatures", "Health Canada (2024)", "https://www.canada.ca/en/health-canada/services/general-food-safety-tips/safe-internal-cooking-temperatures.html"],
    "fsis_temps": ["USDA Food Safety and Inspection Service", "Safe Minimum Internal Temperature Chart", "USDA FSIS", "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart"],
    "fsis_danger": ["USDA Food Safety and Inspection Service", "\"Danger Zone\" (40°F – 140°F)", "USDA FSIS", "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/danger-zone-40f-140f"],
    "fsis_leftovers": ["USDA Food Safety and Inspection Service", "Leftovers and Food Safety", "USDA FSIS", "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety"],
    "wa_rice": ["Government of Western Australia, Department of Health", "Safe cooling of cooked rice", "HealthyWA", "https://www.healthywa.wa.gov.au/Articles/S_T/Safe-cooling-of-cooked-rice"],
    "hc_lectins": ["Health Canada", "Lectins in Dry Legumes", "Health Canada", "https://www.canada.ca/en/health-canada/services/food-nutrition/food-safety/chemical-contaminants/natural-toxins/lectins-legumes.html"],
    "nchfp": ["National Center for Home Food Preservation", "Home canning: how do I can?", "University of Georgia", "https://nchfp.uga.edu/"],
    "hc_fiddle": ["Health Canada", "Food safety tips for fiddleheads", "Health Canada", "https://www.canada.ca/en/health-canada/services/food-safety-fruits-vegetables/fiddlehead-safety-tips.html"],
}

# [id (matched text), display name, definition, aliases, home page id]
G = [
 ["survival cooking", "Survival cooking", "A small set of cheap, healthy dishes you can make any day, so you never depend on takeout.", [], "how"],
 ["protein foods", "Protein foods", "Meat, fish, eggs, dairy, tofu, beans, lentils, nuts: a quarter of the balanced plate.", ["protein"], "plate"],
 ["whole grains", "Whole grains", "Grains with the bran and germ kept: brown rice, oats, whole-wheat pasta, quinoa. More fibre.", ["whole grain"], "plate"],
 ["fibre", "Fibre", "The part of plants you can't digest. Helps digestion, fullness and cholesterol; most adults need 25–38 g a day.", ["fiber"], "macros"],
 ["calories", "Calories", "Units of food energy (kcal). Protein and carbs have 4 per gram, fat 9, alcohol 7.", ["kcal", "calorie"], "macros"],
 ["Mifflin-St Jeor", "Mifflin-St Jeor", "A 1990 equation estimating resting energy use from weight, height, age and sex. The app uses it for your calorie target.", [], "macros"],
 ["sodium", "Sodium", "The part of salt that affects blood pressure. Aim near 1,500 mg a day and stay under 2,300 mg.", [], "sodium"],
 ["umami", "Umami", "The savoury taste: soy sauce, parmesan, tomato paste, miso, mushrooms, fish sauce.", [], "levers"],
 ["batch cooking", "Batch cooking", "Cooking big pots once, then eating portions for days or freezing them.", ["batch-cooked", "batch cook"], "sv-batch"],
 ["danger zone", "Danger zone", "4–60°C (40–140°F): the temperatures where bacteria grow fastest.", [], "danger"],
 ["2-hour rule", "2-hour rule", "Refrigerate cooked food within 2 hours, or 1 hour above 32°C (90°F).", ["two-hour rule"], "danger"],
 ["thermometer", "Instant-read thermometer", "A probe that reads internal temperature in seconds. The only reliable test for meat.", ["instant-read thermometer"], "temps"],
 ["carry-over cooking", "Carry-over cooking", "Meat keeps getting hotter inside for a few minutes after it leaves the heat.", ["carry-over"], "wet"],
 ["resting", "Resting", "Leaving cooked meat alone for 5–15 minutes so juices settle and carry-over finishes it.", ["rest"], "wet"],
 ["Bacillus cereus", "Bacillus cereus", "A bacterium whose spores survive cooking rice and make a toxin if the rice cools slowly. Reheating doesn't destroy the toxin.", [], "clean"],
 ["kidney beans", "Red kidney beans", "Contain a lectin (phytohaemagglutinin) destroyed only by a vigorous boil of at least 10 minutes after soaking.", ["red kidney beans"], "risky"],
 ["botulism", "Botulism", "Rare, dangerous poisoning from a toxin made in airless, low-acid conditions: garlic-in-oil and badly home-canned food.", [], "risky"],
 ["cassava", "Cassava", "A starchy root (yuca) that must be peeled and fully cooked; never eaten raw.", ["yuca"], "risky"],
 ["fiddleheads", "Fiddleheads", "Young ostrich-fern shoots. Boil 15 minutes or steam 10–12, and discard the water.", [], "risky"],
 ["ackee", "Ackee", "Jamaica's national fruit. Only eat canned, or fruit that opened naturally with seeds removed.", [], "risky"],
 ["allergens", "Allergens", "Foods that cause allergic reactions: peanuts, tree nuts, milk, eggs, wheat, soy, fish, shellfish, sesame, mustard.", ["allergen", "allergies"], "fire"],
 ["grease fire", "Grease fire", "Burning oil. Turn off the heat and smother it with a lid; never use water.", [], "fire"],
 ["chef's knife", "Chef's knife", "The 20 cm all-purpose knife that does almost all cutting.", [], "kit"],
 ["fond", "Fond", "The brown bits stuck to the pan after searing: concentrated flavour for pan sauces.", [], "kit"],
 ["Dutch oven", "Dutch oven", "A heavy lidded pot that goes from stove to oven: soups, stews, braises, bread.", [], "kit"],
 ["pinch grip", "Pinch grip", "Holding the knife by pinching the blade just in front of the handle, for control.", [], "knife-grip"],
 ["the claw", "The claw", "Guiding hand with fingertips curled under, so knuckles guide the blade and fingers stay safe.", ["claw"], "knife-grip"],
 ["small dice", "Dice", "Even cubes: small about 6 mm, medium about 1 cm.", ["dice", "medium dice", "diced"], "cuts"],
 ["mince", "Mince", "Chop as finely as possible (garlic, ginger, chili).", ["minced"], "cuts"],
 ["julienne", "Julienne", "Matchstick-shaped strips.", [], "cuts"],
 ["chiffonade", "Chiffonade", "Leafy herbs rolled tight and sliced into ribbons.", [], "cuts"],
 ["against the grain", "Against the grain", "Slicing across the muscle fibres so each bite is short and tender.", [], "cuts"],
 ["simmer", "Simmer", "Small bubbles breaking gently, around 85–95°C. Most soups, stews and sauces want this.", ["simmering"], "stove"],
 ["boil", "Boil", "Big, rolling, constant bubbles at 100°C: pasta water, blanching.", ["boiling", "rolling boil"], "stove"],
 ["Maillard reaction", "Maillard reaction", "Browning of proteins and sugars at high, dry heat that creates deep savoury flavour.", ["Maillard", "browning"], "maillard"],
 ["caramelization", "Caramelization", "Browning of sugars alone at high heat: nutty, sweet, then bitter if pushed too far.", ["caramelize", "caramelising"], "maillard"],
 ["dry heat", "Dry heat", "Cooking with hot air, fat or metal (sear, roast, grill, fry). Gives browning.", [], "maillard"],
 ["wet heat", "Wet heat", "Cooking in water or steam (boil, simmer, poach, steam, braise). Gentle, never much above 100°C.", [], "wet"],
 ["braising", "Braising", "Searing, then cooking slowly, partly covered in liquid, until tough cuts turn tender.", ["braise", "braised", "braises"], "braise"],
 ["collagen", "Collagen", "Connective tissue in tough cuts that melts into gelatin after long, slow, moist cooking.", [], "wet"],
 ["convection", "Convection", "An oven fan that moves hot air: cook 15°C (25°F) lower or check sooner.", [], "ovens"],
 ["broiler", "Broiler", "The oven's top element: intense heat from above. Watch it.", [], "ovens"],
 ["air fryer", "Air fryer", "A small, powerful convection oven for crispy food with little oil.", [], "ovens"],
 ["smoke point", "Smoke point", "The temperature where a fat starts to smoke and break down, turning bitter.", ["smoke points"], "smoke"],
 ["unsaturated fats", "Unsaturated fats", "Mostly liquid fats (olive, canola, avocado, nut oils) linked with better heart health.", ["unsaturated"], "smoke"],
 ["saturated fats", "Saturated fats", "Mostly solid fats (butter, ghee, coconut oil, lard). Best in moderation.", ["saturated fat"], "smoke"],
 ["ghee", "Ghee", "Clarified butter: butter flavour with a high smoke point. Central to Indian cooking.", [], "smoke"],
 ["vinaigrette", "Vinaigrette", "Oil and acid dressing, classically 3 parts oil to 1 part acid, plus salt and mustard.", [], "ratios"],
 ["roux", "Roux", "Equal parts fat and flour cooked together to thicken sauces and soups.", [], "roux"],
 ["béchamel", "Béchamel", "Milk thickened with a white roux: the base of mac and cheese and lasagne.", ["bechamel"], "roux"],
 ["velouté", "Velouté", "Stock thickened with a blond roux.", ["veloute"], "roux"],
 ["your portion", "Your portion", "The app's serving size scaled to your height and goal.", [], "portions"],
 ["tender cuts", "Tender cuts", "Little-worked muscles (steaks, chops, breast, fish): cook hot and fast.", ["tender"], "cuts-meat"],
 ["tough cuts", "Tough cuts", "Hard-working muscles with collagen (chuck, shoulder, shank): cook low and slow.", ["tough"], "cuts-meat"],
 ["acid", "Acid", "Lemon, lime, vinegar, tomato, yogurt: the lever that brightens heavy or dull food.", [], "levers"],
 ["bloom spices", "Blooming spices", "Cooking ground spices in hot fat for 30–60 seconds to release their flavour.", ["bloom", "blooming"], "layers"],
 ["aromatics", "Aromatics", "Onion, garlic, ginger, celery, carrot, chili: the vegetables a dish starts with.", [], "layers"],
 ["deglaze", "Deglaze", "Adding liquid to a hot pan and scraping up the fond into a sauce.", ["deglazing"], "layers"],
 ["flavour base", "Flavour base", "The aromatics a cuisine starts almost everything with: soffritto, mirepoix, the holy trinity, ginger-garlic-scallion.", ["flavor base"], "layers"],
 ["hardy herbs", "Hardy herbs", "Rosemary, thyme, bay, sage: add early; they survive long cooking.", [], "layers"],
 ["soft herbs", "Soft herbs", "Basil, cilantro, parsley, mint, dill: add at the end.", [], "layers"],
 ["six-dish path", "Six-dish path", "The app's six starter dishes, each teaching one technique; cook each twice.", [], "six"],
 ["heat control", "Heat control", "Reading and adjusting the pan's heat; the lesson of scrambled eggs.", [], "six"],
 ["pasta water", "Pasta water", "Starchy, salty cooking water that turns oil and juices into a glossy sauce.", [], "six"],
 ["hosting", "Hosting", "Cooking several dishes to land together, on time, for other people.", [], "hosting"],
 ["mise en place", "Mise en place", "Everything chopped, measured and ready before the first pan is hot.", [], "menus"],
 ["stock", "Stock", "Water simmered with bones, shells, vegetables or seaweed to extract flavour.", ["stocks", "broth"], "stocks"],
 ["dashi", "Dashi", "Japanese stock of kombu seaweed and bonito flakes, steeped rather than boiled.", [], "stocks"],
 ["bisque", "Bisque", "A rich, blended soup made from shellfish stock.", [], "soups"],
 ["chowder", "Chowder", "A chunky soup thickened with roux or potatoes, often with milk.", [], "soups"],
 ["emulsion", "Emulsion", "Fat and water held together as tiny droplets, with help from starch, egg yolk, mustard or blending.", ["emulsions", "emulsified"], "emulsions"],
 ["pan sauce", "Pan sauce", "A quick sauce made in the searing pan: deglaze, reduce, finish with butter.", ["pan sauces"], "roux"],
 ["sear", "Sear", "Browning the surface of food hard in a hot pan.", ["searing", "seared"], "braise"],
 ["marinades", "Marinade", "A seasoned liquid (often with acid or fruit enzymes) that flavours and tenderises.", ["marinade", "marinate"], "roast-grill"],
 ["stir-fry", "Stir-fry", "Small pieces cooked very fast over very high heat with constant motion.", ["stir-frying"], "fry"],
 ["velveting", "Velveting", "Coating meat in cornstarch (and soy or egg white) before stir-frying so it stays silky.", [], "fry"],
 ["deep-fry", "Deep-fry", "Cooking food fully submerged in oil at 175–190°C.", ["deep-frying"], "fry"],
 ["breading", "Breading", "Flour, then egg, then crumbs, for a crisp crust.", [], "fry"],
 ["gluten", "Gluten", "Wheat proteins that form stretchy networks when dough is worked.", [], "dough"],
 ["baking soda", "Baking soda", "A leavener that needs an acid to make gas.", [], "dough"],
 ["baking powder", "Baking powder", "Baking soda with its own built-in acid.", [], "dough"],
 ["yeast", "Yeast", "A living leavener that ferments sugars into gas; dies above about 60°C.", [], "dough"],
 ["muffin method", "Muffin method", "Mixing wet into dry just until combined, for tender quick breads.", [], "dough"],
 ["temper", "Temper", "Slowly whisking hot liquid into eggs so they warm without scrambling.", ["tempering"], "eggs-grains"],
 ["complete protein", "Complete protein", "All the essential amino acids; beans plus grains together provide them.", [], "legumes"],
 ["lentils", "Lentils", "Small legumes that need no soaking; red ones cook in 15–20 minutes.", ["lentil"], "legumes"],
 ["quick pickle", "Quick pickle", "Vegetables in hot vinegar brine, ready in 30 minutes.", ["quick pickling", "pickled"], "ferment"],
 ["lacto-fermentation", "Lacto-fermentation", "Vegetables fermented by lactic-acid bacteria in a 2–3% salt brine: sauerkraut, kimchi.", ["fermentation", "fermented", "ferment"], "ferment"],
 ["palate", "Palate", "Your trained sense of taste.", [], "palate"],
 ["mystery box", "Mystery box", "A drill: cook something good from a few random ingredients against a clock.", [], "pressure"],
 ["pressure test", "Pressure test", "A drill: cook one technical dish exactly to spec, against a clock.", [], "pressure"],
 ["invention test", "Invention test", "A drill: move a dish into another cuisine by keeping the technique and changing the flavour base.", [], "pressure"],
 # cuisine terms (homes filled in by the builder)
 ["soffritto", "Soffritto", "Onion, carrot and celery cooked slowly in olive oil: Italy's flavour base.", [], "@Italy"],
 ["risotto", "Risotto", "Rice cooked by adding hot stock gradually while stirring, finished with butter and cheese.", [], "@Italy"],
 ["ragù", "Ragù", "A long-simmered Italian meat sauce, like bolognese.", ["ragu"], "@Italy"],
 ["mirepoix", "Mirepoix", "Onion, carrot and celery: France's flavour base.", [], "@France"],
 ["mother sauces", "Mother sauces", "The French base sauces: béchamel, velouté, espagnole, tomato, hollandaise.", [], "@France"],
 ["confit", "Confit", "Slow cooking in fat, classically duck legs.", [], "@France"],
 ["sofrito", "Sofrito", "Onion, garlic, tomato and pepper slowly cooked in olive oil (Spain, Latin America, Caribbean).", [], "@Spain"],
 ["pimentón", "Pimentón", "Spanish paprika: sweet, hot or smoked.", ["smoked paprika"], "@Spain"],
 ["paella", "Paella", "Rice cooked unstirred in a wide pan until a crust (socarrat) forms.", ["socarrat"], "@Spain"],
 ["phyllo", "Phyllo", "Paper-thin pastry sheets layered with fat (spanakopita, baklava, burek).", ["filo"], "@Greece"],
 ["avgolemono", "Avgolemono", "Greek egg-lemon sauce or soup, made by tempering eggs into hot broth.", [], "@Greece"],
 ["tahini", "Tahini", "Sesame paste: the base of hummus and many Levantine sauces.", [], "@The Levant"],
 ["sumac", "Sumac", "A tart, lemony red spice from the Levant and Turkey.", [], "@The Levant"],
 ["za’atar", "Za’atar", "A Levantine blend of wild thyme, sumac and sesame.", ["za'atar", "zaatar"], "@The Levant"],
 ["tahdig", "Tahdig", "The golden, crispy rice crust at the bottom of an Iranian rice pot.", [], "@Iran"],
 ["plov", "Plov", "Central Asian pilaf: meat, onion and carrot first, then rice steamed on top.", ["pilaf", "pulao", "pilau"], "@Afghanistan, Uzbekistan and Central Asia"],
 ["tagine", "Tagine", "A North African slow braise, and the cone-lidded clay pot it's cooked in.", [], "@Morocco, Algeria and Tunisia"],
 ["ras el hanout", "Ras el hanout", "A Moroccan blend of warm spices.", [], "@Morocco, Algeria and Tunisia"],
 ["harissa", "Harissa", "A North African chili paste.", [], "@Morocco, Algeria and Tunisia"],
 ["preserved lemons", "Preserved lemons", "Lemons cured in salt for weeks; the rind becomes soft and intensely lemony.", [], "@Morocco, Algeria and Tunisia"],
 ["jollof", "Jollof rice", "West African rice cooked in a tomato-pepper sauce.", ["jollof rice"], "@West Africa"],
 ["palm oil", "Palm oil", "A red, flavourful cooking oil central to West African food; high in saturated fat.", ["dendê"], "@West Africa"],
 ["berbere", "Berbere", "Ethiopia's chili-and-warm-spice blend.", [], "@Ethiopia and Eritrea"],
 ["injera", "Injera", "Sour, spongy fermented teff flatbread from Ethiopia and Eritrea.", ["teff"], "@Ethiopia and Eritrea"],
 ["tadka", "Tadka", "Whole spices sizzled in hot fat and poured over a dish (also called tempering).", ["tempering"], "@North India and Pakistan"],
 ["garam masala", "Garam masala", "A North Indian blend of warm spices, added near the end.", [], "@North India and Pakistan"],
 ["curry leaves", "Curry leaves", "Aromatic leaves popped in hot oil in South Indian and Sri Lankan cooking.", [], "@South India and Sri Lanka"],
 ["dosa", "Dosa", "A thin, crisp crêpe of fermented rice and lentil batter.", ["idli"], "@South India and Sri Lanka"],
 ["wok", "Wok", "A round-bottomed carbon-steel pan for very-high-heat stir-frying.", [], "@China (everyday home cooking)"],
 ["Shaoxing wine", "Shaoxing wine", "Chinese rice cooking wine.", [], "@China (everyday home cooking)"],
 ["doubanjiang", "Doubanjiang", "Fermented chili bean paste, the soul of Sichuan cooking.", [], "@China (everyday home cooking)"],
 ["Sichuan peppercorns", "Sichuan peppercorns", "Husks that make your mouth tingle and go numb (málà).", [], "@China (everyday home cooking)"],
 ["miso", "Miso", "Fermented soybean paste from Japan.", [], "@Japan"],
 ["mirin", "Mirin", "Sweet Japanese rice seasoning wine.", [], "@Japan"],
 ["tempura", "Tempura", "Japanese frying in an ice-cold, barely mixed batter.", [], "@Japan"],
 ["gochujang", "Gochujang", "Korean fermented chili paste (usually contains wheat).", [], "@Korea"],
 ["kimchi", "Kimchi", "Korean fermented cabbage or vegetables with chili.", [], "@Korea"],
 ["banchan", "Banchan", "The small side dishes shared at a Korean meal.", ["namul"], "@Korea"],
 ["fish sauce", "Fish sauce", "A salty, fermented anchovy sauce central to Southeast Asian cooking.", ["nam pla", "patis"], "@Thailand"],
 ["curry paste", "Curry paste", "A pounded paste of chili, aromatics and spices; often contains shrimp paste.", ["curry pastes"], "@Thailand"],
 ["galangal", "Galangal", "A sharp, piney relative of ginger used in Thai and Indonesian cooking.", [], "@Thailand"],
 ["lemongrass", "Lemongrass", "A citrus-scented grass bruised and infused in Southeast Asian dishes.", [], "@Thailand"],
 ["nước chấm", "Nước chấm", "Vietnamese dipping sauce: fish sauce, lime, sugar, garlic, chili.", ["nuoc cham"], "@Vietnam"],
 ["rice paper", "Rice paper", "Thin rice sheets softened in water and rolled around fillings.", [], "@Vietnam"],
 ["adobo", "Adobo", "Filipino braise in vinegar, soy, garlic and bay.", [], "@The Philippines"],
 ["rempah", "Rempah", "The pounded spice paste of Malay and Indonesian cooking (bumbu in Indonesia).", ["bumbu"], "@Indonesia and Malaysia"],
 ["rendang", "Rendang", "Beef slowly braised in coconut and spices until almost dry.", [], "@Indonesia and Malaysia"],
 ["tempeh", "Tempeh", "A fermented soybean cake: high-protein, high-fibre.", [], "@Indonesia and Malaysia"],
 ["masa", "Masa", "Dough from nixtamalised corn, for tortillas and tamales.", ["masa harina", "nixtamalised"], "@Mexico"],
 ["salsa", "Salsa", "Sauce, in Spanish: from fresh pico de gallo to cooked, blended chili salsas.", ["pico de gallo"], "@Mexico"],
 ["mole", "Mole", "A family of complex Mexican sauces of chilies, spices, nuts and sometimes chocolate.", [], "@Mexico"],
 ["jerk", "Jerk", "Jamaican marinade of allspice, scotch bonnet and thyme, grilled over smoke.", [], "@Jamaica and the English-speaking islands"],
 ["scotch bonnet", "Scotch bonnet", "A very hot, fruity chili of West Africa and the Caribbean.", ["scotch bonnets"], "@Jamaica and the English-speaking islands"],
 ["ceviche", "Ceviche", "Raw fish marinated briefly in lime; the acid does not kill bacteria or parasites.", [], "@Peru"],
 ["ají amarillo", "Ají amarillo", "Peru's fruity yellow chili.", [], "@Peru"],
 ["churrasco", "Churrasco", "Brazilian barbecue: big cuts, coarse salt, fire.", [], "@Brazil"],
 ["farofa", "Farofa", "Toasted cassava flour, a Brazilian side.", [], "@Brazil"],
 ["chimichurri", "Chimichurri", "Argentine sauce of parsley, garlic, oregano, chili, vinegar and oil.", [], "@Argentina, Uruguay and Chile"],
 ["holy trinity", "Holy trinity", "Onion, celery and green pepper: the Cajun and Creole flavour base.", [], "@The American South, Cajun and Creole"],
 ["dark roux", "Dark roux", "A roux cooked to chocolate brown for gumbo; nutty and thin-thickening.", [], "@The American South, Cajun and Creole"],
 ["smoking", "Smoking", "Low-and-slow barbecue at 110–135°C over wood smoke.", ["the stall"], "@Barbecue country"],
 ["poke", "Poke", "Hawaiian cubed raw fish dressed with shoyu and sesame.", [], "@The Pacific Islands and Hawaiʻi"],
 ["earth oven", "Earth oven", "Food wrapped in leaves and cooked in a pit over hot stones (umu, lovo, hāngī).", ["umu", "lovo", "hāngī"], "@The Pacific Islands and Hawaiʻi"],
]
