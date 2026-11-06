/**
 * Cheat-sheet tables. Safe minimum temperatures follow Health Canada / USDA guidance;
 * "best" temps are common cook's preferences and are labelled as such.
 */

export interface Doneness {
  food: string
  method: string
  heat: string
  time: string
  tool: string
  /** safe / target internal temp in °F */
  f: number
  c: number
  note: string
}

export const doneness: Doneness[] = [
  { food: 'Chicken breast (boneless)', method: 'Roast or pan-sear', heat: '425°F (220°C) oven, or medium-high pan', time: '18–22 min in the oven', tool: 'Sheet pan or skillet + thermometer', f: 165, c: 74, note: 'Lean, so it dries out fast. Pull right at 165°F.' },
  { food: 'Chicken thighs', method: 'Roast, grill or braise', heat: '425°F (220°C) oven', time: '20–25 min boneless, 35–45 min bone-in', tool: 'Sheet pan + thermometer', f: 165, c: 74, note: 'Safe at 165°F, but most tender at 175–185°F.' },
  { food: 'Whole chicken', method: 'Roast', heat: '425°F (220°C) oven', time: 'About 17–20 min per lb', tool: 'Roasting pan + thermometer', f: 165, c: 74, note: 'Check the thickest part of the thigh; many cooks pull the breast at 160°F and let it rise.' },
  { food: 'Ground chicken or turkey', method: 'Pan-fry', heat: 'Medium-high', time: '6–8 min', tool: 'Skillet', f: 165, c: 74, note: 'Grinding spreads bacteria through the meat, so cook all the way.' },
  { food: 'Ground beef or pork', method: 'Pan-fry or burgers', heat: 'Medium-high to high', time: '6–10 min', tool: 'Skillet or cast iron', f: 160, c: 71, note: 'No pink, juices clear.' },
  { food: 'Beef steak (1 inch)', method: 'Sear', heat: 'High, cast iron preheated 5 min', time: '3–4 min per side', tool: 'Cast iron + thermometer', f: 145, c: 63, note: 'Health Canada and USDA: 145°F (63°C) plus a 3-min rest. Cooks often pull at 130°F for medium-rare.' },
  { food: 'Beef roast', method: 'Roast', heat: 'Sear hot, then 325°F (165°C)', time: 'About 15–20 min per lb', tool: 'Roasting pan + probe thermometer', f: 145, c: 63, note: 'Rest 15 min; it rises 5–10°F while resting.' },
  { food: 'Beef chuck or short ribs', method: 'Braise', heat: '300–325°F (150–165°C), covered', time: '2½–3½ hours', tool: 'Dutch oven', f: 200, c: 93, note: 'Tough cuts need long, slow, wet cooking until fork-tender (195–205°F).' },
  { food: 'Pork chops (1 inch)', method: 'Pan-sear', heat: 'Medium-high', time: '4–5 min per side', tool: 'Skillet + thermometer', f: 145, c: 63, note: '145°F with a 3-min rest. A little pink is fine.' },
  { food: 'Pork tenderloin', method: 'Roast', heat: '425°F (220°C)', time: '20–25 min', tool: 'Sheet pan or skillet', f: 145, c: 63, note: 'Sear first for colour.' },
  { food: 'Pork shoulder (pulled)', method: 'Slow-roast', heat: '300°F (150°C)', time: 'About 1 hr per lb', tool: 'Dutch oven or roasting pan', f: 200, c: 93, note: 'Shreds easily at 195–205°F.' },
  { food: 'Lamb chops', method: 'Sear or grill', heat: 'High', time: '3–4 min per side', tool: 'Cast iron or grill', f: 145, c: 63, note: 'Same guidance as beef steaks.' },
  { food: 'Salmon fillet', method: 'Roast or pan-sear', heat: '400°F (200°C) oven', time: '12–15 min', tool: 'Sheet pan or non-stick skillet', f: 145, c: 63, note: 'Official guidance is 145°F; many cooks prefer 125–130°F for silky salmon.' },
  { food: 'White fish (cod, haddock)', method: 'Bake or pan-fry', heat: '400°F (200°C)', time: '10–12 min', tool: 'Sheet pan or non-stick skillet', f: 145, c: 63, note: 'Done when it flakes easily with a fork.' },
  { food: 'Shrimp', method: 'Sauté or boil', heat: 'Medium-high', time: '2–3 min', tool: 'Skillet', f: 145, c: 63, note: 'Pink and opaque, curled into a C. An O shape means overcooked.' },
  { food: 'Egg dishes (frittata, quiche)', method: 'Bake', heat: '350°F (175°C)', time: '20–30 min', tool: 'Oven-safe skillet or dish', f: 160, c: 71, note: 'Centre should be just set.' },
  { food: 'Leftovers', method: 'Reheat', heat: 'Microwave or oven', time: 'Until steaming', tool: 'Thermometer', f: 165, c: 74, note: 'Reheat once, to 165°F, and stir in the microwave.' },
]

export interface CookTime {
  food: string
  how: string
  time: string
  ratio?: string
}

export const cookTimes: CookTime[] = [
  { food: 'White rice (jasmine, long-grain)', how: 'Rinse, simmer covered on low', time: '15 min + 10 min rest', ratio: '1 cup rice : 1½ cups water' },
  { food: 'Basmati rice', how: 'Rinse, simmer covered', time: '12–15 min + 10 min rest', ratio: '1 : 1½' },
  { food: 'Brown rice', how: 'Simmer covered', time: '40–45 min + 10 min rest', ratio: '1 : 2' },
  { food: 'Quinoa', how: 'Rinse, simmer covered', time: '15 min + 5 min rest', ratio: '1 : 2' },
  { food: 'Dry pasta', how: 'Rolling boil in well-salted water', time: '8–12 min (package minus 1–2 min if finishing in sauce)', ratio: 'About 100 g dry per person for a main' },
  { food: 'Red lentils', how: 'Simmer uncovered', time: '15–20 min', ratio: '1 : 3 or more' },
  { food: 'Green or brown lentils', how: 'Simmer uncovered', time: '25–30 min', ratio: '1 : 3' },
  { food: 'Dried beans', how: 'Soak overnight, then simmer', time: '1–2 hours', ratio: 'Cover by 2 inches of water' },
  { food: 'Hard-boiled eggs', how: 'Lower into boiling water, then ice bath', time: '10–12 min (6–7 min for jammy)' },
  { food: 'Potatoes (cubed, roasted)', how: '425°F (220°C) oven, tossed in oil', time: '30–40 min' },
  { food: 'Broccoli or cauliflower (roasted)', how: '425°F (220°C) oven', time: '20–25 min' },
  { food: 'Green beans or asparagus (roasted)', how: '425°F (220°C) oven', time: '10–15 min' },
  { food: 'Green vegetables (blanched)', how: 'Boiling salted water, then ice water', time: '1–3 min' },
  { food: 'Steamed vegetables', how: 'Covered steamer basket over simmering water', time: '4–8 min' },
  { food: 'Deep-frying', how: 'Oil at 350–375°F (175–190°C)', time: 'Depends on size; fry in small batches' },
]

export interface Oil {
  name: string
  smokeF: number
  flavour: string
  bestFor: string
  pros: string
  cons: string
  satFatPct: number
}

export const oils: Oil[] = [
  { name: 'Extra-virgin olive oil', smokeF: 390, flavour: 'Fruity, peppery', bestFor: 'Dressings, drizzling, everyday sautéing at medium heat', pros: 'Rich in monounsaturated fat and antioxidants (polyphenols); central to the Mediterranean diet', cons: 'More expensive; loses its delicate flavour at high heat', satFatPct: 14 },
  { name: 'Light (refined) olive oil', smokeF: 465, flavour: 'Neutral', bestFor: 'Roasting and higher-heat cooking', pros: 'Still mostly monounsaturated fat', cons: 'Fewer antioxidants than extra-virgin; "light" means flavour, not calories', satFatPct: 14 },
  { name: 'Canola oil', smokeF: 425, flavour: 'Neutral', bestFor: 'All-purpose: stir-fries, baking, roasting', pros: 'Lowest in saturated fat of common oils; has some omega-3 (ALA); cheap', cons: 'Highly refined; no flavour of its own', satFatPct: 7 },
  { name: 'Avocado oil', smokeF: 500, flavour: 'Mild, buttery', bestFor: 'High-heat searing and grilling', pros: 'Very high smoke point; mostly monounsaturated fat', cons: 'Expensive; quality and purity vary between brands', satFatPct: 12 },
  { name: 'Peanut oil (refined)', smokeF: 450, flavour: 'Mild, slightly nutty', bestFor: 'Deep-frying, wok cooking', pros: 'Stable at high heat; good monounsaturated fat content', cons: 'Tell guests with peanut allergies, even though refined oil is usually low in allergens', satFatPct: 17 },
  { name: 'Toasted sesame oil', smokeF: 350, flavour: 'Strong, nutty, toasty', bestFor: 'Finishing Asian dishes, dressings, marinades', pros: 'A few drops add big flavour', cons: 'Burns and turns bitter at high heat; use as a seasoning, not a frying oil', satFatPct: 14 },
  { name: 'Vegetable oil (soybean or blend)', smokeF: 450, flavour: 'Neutral', bestFor: 'Frying and general cooking', pros: 'Cheap and heat-stable', cons: 'High in omega-6 fats; heavily processed', satFatPct: 15 },
  { name: 'Coconut oil', smokeF: 350, flavour: 'Coconut (virgin) or neutral (refined)', bestFor: 'Curries, some baking', pros: 'Solid at room temperature, useful in vegan baking', cons: 'About 80% saturated fat, which raises LDL cholesterol; use sparingly', satFatPct: 82 },
  { name: 'Butter', smokeF: 325, flavour: 'Rich, creamy', bestFor: 'Low-to-medium heat, baking, basting, finishing sauces', pros: 'Unbeatable flavour', cons: 'About 63% saturated fat; milk solids burn above medium heat', satFatPct: 63 },
  { name: 'Ghee (clarified butter)', smokeF: 470, flavour: 'Nutty, buttery', bestFor: 'Indian cooking, searing, tadka', pros: 'Butter flavour with a high smoke point, because the milk solids are removed', cons: 'Just as high in saturated fat as butter', satFatPct: 62 },
  { name: 'Lard or bacon fat', smokeF: 370, flavour: 'Savoury, porky', bestFor: 'Frying, flaky pastry', pros: 'Great flavour and texture', cons: 'About 40% saturated fat; not for vegetarians or halal and kosher diets', satFatPct: 40 },
  { name: 'Flaxseed oil', smokeF: 225, flavour: 'Nutty, grassy', bestFor: 'Drizzling cold, smoothies; never heat it', pros: 'The richest plant source of omega-3 (ALA)', cons: 'Goes rancid quickly; keep it in the fridge', satFatPct: 9 },
]

export interface Tool {
  name: string
  use: string
  settings: string
}

export const tools: Tool[] = [
  { name: 'Chef’s knife', use: 'Almost all chopping, slicing and dicing', settings: 'Hone it weekly and sharpen it a few times a year. Hand-wash only.' },
  { name: 'Paring knife', use: 'Peeling, trimming, small detailed cuts', settings: 'Use in your hand or on the board for small jobs.' },
  { name: 'Serrated bread knife', use: 'Bread, ripe tomatoes, cakes', settings: 'Saw gently; let the teeth do the work.' },
  { name: 'Cast iron skillet', use: 'Searing steak, smash burgers, cornbread, crispy potatoes', settings: 'Preheat 5 minutes on medium-high. Do not soak; dry it on the stove and wipe with a little oil.' },
  { name: 'Stainless steel skillet', use: 'Browning meat and making pan sauces from the brown bits (fond)', settings: 'Preheat until a drop of water skates around like a bead, then add oil, then food.' },
  { name: 'Non-stick skillet', use: 'Eggs, pancakes, delicate fish', settings: 'Low to medium heat only, never empty on high. Use wooden or silicone tools.' },
  { name: 'Dutch oven', use: 'Braises, soups, chili, stews, bread', settings: 'Goes from stovetop to oven. Great for 300–350°F slow cooking with the lid on.' },
  { name: 'Sheet pan', use: 'Roasting vegetables and sheet-pan dinners', settings: 'Rimmed and heavy; line with parchment. Leave space between pieces.' },
  { name: 'Instant-read thermometer', use: 'Checking meat, fish, bread and oil temperature', settings: 'Insert into the thickest part, not touching bone. Takes 2–3 seconds.' },
  { name: 'Microplane', use: 'Zesting citrus; grating garlic, ginger, parmesan and nutmeg', settings: 'Grate in one direction and tap it clean.' },
  { name: 'Kitchen scale', use: 'Accurate amounts, especially for baking', settings: 'Press tare to zero it with the bowl on top.' },
  { name: 'Oven (bake)', use: 'Even heat from the bottom element', settings: 'Preheat 15–20 minutes. Middle rack for most things.' },
  { name: 'Oven (convection)', use: 'A fan circulates the air, so food cooks and browns faster', settings: 'Lower the temperature by 25°F (15°C), or keep it and check about 25% sooner.' },
  { name: 'Broiler', use: 'Intense heat from the top for melting, charring and crisping', settings: 'Top rack, door watched. Things go from golden to burnt in under a minute.' },
  { name: 'Air fryer', use: 'A small convection oven for crispy food with little oil', settings: 'Usually 375–400°F (190–200°C). Do not overcrowd, and shake halfway.' },
  { name: 'Stovetop: low (1–3)', use: 'Melting butter, keeping warm, gentle simmering, cooking rice', settings: 'A few lazy bubbles at most.' },
  { name: 'Stovetop: medium (4–6)', use: 'Softening onions, scrambled eggs, pancakes, most sautéing', settings: 'A steady, gentle sizzle.' },
  { name: 'Stovetop: medium-high (7–8)', use: 'Browning meat, searing, stir-fries', settings: 'Oil shimmers; food sizzles loudly.' },
  { name: 'Stovetop: high (9–10)', use: 'Boiling water, wok cooking, a quick hard sear', settings: 'Watch closely; oil can smoke.' },
]

export const conversions: [string, string][] = [
  ['3 tsp', '1 tbsp'],
  ['16 tbsp', '1 cup'],
  ['1 cup', '250 ml in Canada (240 ml in US recipes)'],
  ['1 lb', '454 g'],
  ['1 oz', '28 g'],
  ['1 kg', '2.2 lb'],
  ['350°F', '175°C'],
  ['400°F', '200°C'],
  ['425°F', '220°C'],
  ['1 stick butter (US)', '½ cup, 113 g'],
]

export const safety: [string, string][] = [
  ['The danger zone', 'Bacteria grow fastest between 40°F and 140°F (4–60°C). Keep cold food cold and hot food hot.'],
  ['The 2-hour rule', 'Refrigerate cooked food within 2 hours (1 hour on a hot day above 90°F / 32°C).'],
  ['Fridge and freezer', 'Fridge at or below 40°F (4°C), freezer at 0°F (−18°C).'],
  ['Thawing', 'In the fridge (best), in cold water changed every 30 minutes, or in the microwave if cooking right away. Never on the counter.'],
  ['Leftovers', 'Eat within 3–4 days. Reheat once, to 165°F (74°C).'],
  ['Raw chicken', 'Never rinse it, because water splashes bacteria around the sink. Pat it dry instead.'],
  ['Cutting boards', 'Use one board for raw meat and another for produce, or cut produce first.'],
  ['Hand-washing', '20 seconds with soap, after raw meat, eggs, and before eating.'],
  ['Cooked rice', 'Cool and refrigerate within an hour or two. Bacteria in rice make toxins that reheating does not destroy.'],
]
