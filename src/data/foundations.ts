import { mc, tf, order, match, num, type Unit } from './courseTypes'
import { cookTimeQs, donenessQs, oilQs, toolQs, sample } from '../lib/generate'
import { conversions, safety } from './reference'

export const foundations: Unit[] = [
  {
    id: 'f-tools', title: 'Kitchen kit', glyph: '🔪', blurb: 'What each tool is for, and the settings that matter.',
    lessons: [
      {
        id: 'f-tools-1', title: 'Knives and boards',
        teach: [
          ['Three knives cover everything', 'A chef’s knife for almost all cutting, a paring knife for small jobs, and a serrated knife for bread and tomatoes.'],
          ['Sharp is safer', 'A dull knife needs more force and slips. A sharp knife goes where you aim it.'],
          ['Boards', 'Put a damp paper towel under the board so it does not slide. Keep a separate board for raw meat, or cut produce first.'],
        ],
        qs: [
          mc('Which knife do you use for most chopping?', 'Chef’s knife', ['Paring knife', 'Bread knife', 'Butter knife']),
          mc('Best knife for slicing a ripe tomato cleanly?', 'Serrated knife', ['Paring knife held in the air', 'A cleaver', 'Kitchen scissors'], 'The teeth grip the slippery skin.'),
          tf('A dull knife is safer because it is less sharp.', false, 'Dull knives slip because you press harder. Sharp knives are safer.'),
          mc('How do you stop a cutting board sliding?', 'Put a damp towel underneath', ['Hold it with your other hand', 'Oil the bottom', 'Cut faster'], undefined),
          mc('How do you clean a good knife?', 'Hand-wash and dry it right away', ['Dishwasher', 'Soak it overnight', 'Wipe it on a towel only']),
          tf('It is fine to cut raw chicken and then salad on the same board without washing it.', false, 'Raw meat juices spread bacteria. Wash with hot soapy water between, or use two boards.'),
        ],
      },
      {
        id: 'f-tools-2', title: 'Pans, pots and settings',
        teach: [
          ['Non-stick', 'For eggs, pancakes and delicate fish. Low to medium heat only, never empty on high, and no metal tools.'],
          ['Cast iron and stainless', 'For searing and browning. Preheat them properly before adding food.'],
          ['Dutch oven', 'A heavy lidded pot that goes from stove to oven, for soups, stews and braises.'],
        ],
        qs: [
          mc('Best pan for scrambled eggs?', 'Non-stick skillet', ['Cast iron on high', 'Stockpot', 'Sheet pan']),
          mc('Best pan for a crusty seared steak?', 'Cast iron skillet', ['Non-stick skillet', 'Saucepan', 'Glass baking dish']),
          tf('You should preheat an empty non-stick pan on high.', false, 'High heat damages non-stick coatings. Low to medium only.'),
          mc('A drop of water dances like a bead in a stainless pan. What does that tell you?', 'It is hot enough to add oil and food', ['It is too cold', 'It needs washing', 'It is dangerously hot']),
          mc('Pot for a 3-hour beef stew in the oven?', 'Dutch oven', ['Non-stick skillet', 'Wok', 'Sheet pan']),
          mc('How do you clean cast iron?', 'Rinse, dry on the stove, wipe with a little oil', ['Soak overnight', 'Dishwasher', 'Scrub with bleach']),
        ],
      },
      { id: 'f-tools-3', title: 'Tools and settings quiz', teach: [['Quick drill', 'Mixed questions on tools, ovens, air fryers and stovetop settings. They change every time you play.']], qs: () => toolQs(7) },
    ],
  },
  {
    id: 'f-knife', title: 'Knife skills', glyph: '🧅', blurb: 'Grips, cuts and how to dice an onion.',
    lessons: [
      {
        id: 'f-knife-1', title: 'Grips and the claw',
        teach: [
          ['Pinch grip', 'Pinch the blade just in front of the handle with your thumb and index finger, and wrap your other fingers around the handle.'],
          ['The claw', 'Curl the fingertips of your other hand under, so your knuckles guide the side of the blade.'],
          ['Make it stable', 'Cut a flat side onto round things (onions, potatoes) so they do not roll.'],
        ],
        qs: [
          mc('Where do you hold a chef’s knife for the most control?', 'Pinch the blade just in front of the handle', ['At the very end of the handle', 'With your index finger on the spine only', 'Any way that is comfortable']),
          mc('What is the claw grip for?', 'Keeping your fingertips away from the blade', ['Holding the knife', 'Sharpening', 'Carrying the board']),
          tf('Before cutting a round vegetable, slice off one side so it sits flat.', true),
          mc('A falling knife. What do you do?', 'Step back and let it fall', ['Catch it', 'Kick it away', 'Grab the handle']),
        ],
      },
      {
        id: 'f-knife-2', title: 'Cuts you will use',
        teach: [
          ['Dice', 'Even cubes. Small dice is about ¼ inch; medium about ½ inch.'],
          ['Mince', 'Chopped as finely as possible, used for garlic and ginger.'],
          ['Julienne and chiffonade', 'Julienne is matchsticks. Chiffonade is leafy herbs rolled tight and sliced into ribbons.'],
          ['Against the grain', 'Meat has lines of muscle fibres. Slice across them so each bite is short and tender.'],
        ],
        qs: [
          match('Match the cut to its description', [['Mince', 'As fine as possible'], ['Julienne', 'Thin matchsticks'], ['Chiffonade', 'Rolled herb ribbons'], ['Dice', 'Even cubes']]),
          mc('Why cut ingredients the same size?', 'So they cook evenly', ['It looks fancier', 'It is faster', 'It uses less oil']),
          order('Dice an onion: put the steps in order', ['Cut in half through the root', 'Peel off the skin', 'Lay flat and slice lengthwise, keeping the root on', 'Slice across to make dice']),
          mc('You slice a steak and it is chewy. What went wrong?', 'You cut with the grain instead of across it', ['It was too hot', 'The knife was too sharp', 'You salted it']),
          tf('Leaving the root end on an onion while slicing holds the layers together.', true),
        ],
      },
    ],
  },
  {
    id: 'f-heat', title: 'Heat and methods', glyph: '🔥', blurb: 'Stove settings, browning, and which method to use.',
    lessons: [
      {
        id: 'f-heat-1', title: 'Reading your stove',
        teach: [
          ['Low', 'Melting, gentle simmering, rice. A few lazy bubbles.'],
          ['Medium', 'Softening onions, eggs, pancakes. A steady sizzle.'],
          ['Medium-high and high', 'Searing, stir-frying, boiling water. Oil shimmers and food hisses.'],
          ['Simmer vs boil', 'A simmer has small bubbles breaking gently. A boil is big, rolling and constant.'],
        ],
        qs: [
          mc('Which setting for softening onions without browning?', 'Medium', ['High', 'Off', 'Broil']),
          mc('Which setting for cooking rice once it boils?', 'Lowest heat, covered', ['High, uncovered', 'Medium-high', 'Turn it off immediately']),
          mc('Oil is smoking. What do you do?', 'Lift the pan off the heat for a moment', ['Add water', 'Turn the heat up', 'Keep cooking']),
          tf('A stew should boil hard so it cooks faster.', false, 'Hard boiling toughens meat. Stews like a gentle simmer.'),
          mc('What does a gentle simmer look like?', 'Small bubbles breaking now and then', ['Big rolling bubbles', 'No movement at all', 'Spitting oil']),
        ],
      },
      {
        id: 'f-heat-2', title: 'Cooking methods',
        teach: [
          ['Dry heat', 'Searing, roasting, grilling, stir-frying. Creates browning (the Maillard reaction) and big flavour.'],
          ['Wet heat', 'Boiling, simmering, poaching, steaming, braising. Gentle and good for tough cuts and delicate foods.'],
          ['Braising', 'Sear first, then cook slowly, partly covered in liquid. Turns tough cuts tender.'],
          ['Resting', 'Meat keeps cooking 5–10°F after it leaves the heat (carry-over). Resting also keeps juices in.'],
        ],
        qs: [
          match('Match the method to its best food', [['Braise', 'Beef chuck'], ['Poach', 'Eggs or chicken breast'], ['Stir-fry', 'Thin strips and vegetables'], ['Roast', 'Whole chicken']]),
          mc('What creates the brown, savoury crust on seared meat?', 'The Maillard reaction', ['Boiling', 'Salt crystals', 'Fat melting']),
          mc('Why rest meat after cooking?', 'Juices settle back in, and it finishes cooking', ['To cool it for safety', 'To make it easier to salt', 'Tradition only']),
          tf('Wet food browns better than dry food.', false, 'Water has to steam off first. Pat food dry for better browning.'),
          mc('What is blanching?', 'A short boil, then ice water to stop cooking', ['Frying in butter', 'Cooking in the oven', 'Soaking in salt water']),
          mc('A steak comes off the heat at 130°F. Roughly where will it end up after resting?', '135–140°F', ['130°F exactly', '115°F', '160°F']),
        ],
      },
    ],
  },
  {
    id: 'f-oils', title: 'Oils and fats', glyph: '🫒', blurb: 'Smoke points, flavours, and health pros and cons.',
    lessons: [
      {
        id: 'f-oils-1', title: 'Smoke points',
        teach: [
          ['Smoke point', 'The temperature where a fat starts to smoke and break down, tasting bitter and producing irritating fumes.'],
          ['High heat', 'Refined oils like avocado, peanut and canola handle searing and frying.'],
          ['Low to medium heat', 'Butter, extra-virgin olive oil and toasted sesame oil have more flavour but lower smoke points.'],
          ['Finishing oils', 'Toasted sesame and flaxseed oil are for drizzling, not frying.'],
        ],
        qs: [
          mc('Which is the best choice for deep-frying?', 'Peanut or canola oil', ['Butter', 'Toasted sesame oil', 'Flaxseed oil']),
          mc('Why does butter burn at medium-high heat?', 'Its milk solids burn', ['It contains water', 'It is too salty', 'It is mostly protein']),
          mc('What is ghee?', 'Butter with the milk solids removed', ['A type of olive oil', 'Coconut fat', 'Margarine']),
          tf('Toasted sesame oil is good for frying at high heat.', false, 'Use it as a finishing flavour; it burns at high heat.'),
          tf('Extra-virgin olive oil is fine for everyday sautéing at medium heat.', true, 'Its smoke point is around 375–405°F, above normal sautéing temperatures.'),
        ],
      },
      {
        id: 'f-oils-2', title: 'Fats and your health',
        teach: [
          ['Unsaturated fats', 'Olive, canola, avocado and nut oils are mostly unsaturated, linked with better heart health.'],
          ['Saturated fats', 'Butter, ghee, coconut oil and lard are high in saturated fat. Health Canada advises replacing them with unsaturated fats where you can.'],
          ['Omega-3', 'Found in fatty fish, flax, chia, walnuts and some in canola oil.'],
          ['All fats', 'About 9 calories per gram, more than double protein or carbs. A little goes a long way.'],
        ],
        qs: [
          mc('Which fat is about 80% saturated?', 'Coconut oil', ['Olive oil', 'Canola oil', 'Avocado oil']),
          mc('How many calories per gram of fat?', '9', ['4', '7', '2']),
          mc('Which is a good plant source of omega-3?', 'Flaxseed', ['Coconut oil', 'Butter', 'White rice']),
          tf('"Light" olive oil has fewer calories than regular olive oil.', false, '"Light" refers to flavour and colour, not calories.'),
          mc('Which oil is lowest in saturated fat?', 'Canola oil', ['Butter', 'Coconut oil', 'Lard']),
        ],
      },
      { id: 'f-oils-3', title: 'Oil drill', teach: [['Mixed practice', 'Questions built from the oil cheat sheet. New questions each time.']], qs: () => oilQs(7) },
    ],
  },
  {
    id: 'f-measure', title: 'Measuring and amounts', glyph: '⚖️', blurb: 'Conversions, portions, and ratios worth memorising.',
    lessons: [
      {
        id: 'f-measure-1', title: 'Conversions',
        teach: conversions.slice(0, 6).map(([a, b]) => [a, `= ${b}`] as [string, string]),
        qs: () => [
          num('How many teaspoons in a tablespoon?', 3, 'tsp'),
          num('How many tablespoons in a cup?', 16, 'tbsp'),
          num('How many grams in a pound? (nearest 10)', 454, 'g', 10),
          num('350°F is how many °C? (within 5)', 175, '°C', 5),
          num('425°F is how many °C? (within 5)', 220, '°C', 5),
          mc('A Canadian metric cup holds…', '250 ml', ['100 ml', '500 ml', '1 L']),
          ...sample([
            mc('A recipe says 1 oz. About how many grams?', '28 g', ['10 g', '100 g', '50 g']),
            mc('Most accurate way to measure flour?', 'A kitchen scale', ['Scooping with the cup', 'Packing it into the cup', 'Eyeballing it']),
          ], 2),
        ],
      },
      {
        id: 'f-measure-2', title: 'Portions and ratios',
        teach: [
          ['Pasta', 'About 100 g (3½ oz) dry per person for a main course.'],
          ['Rice', '1 cup dry makes about 3 cups cooked, enough for 3–4 people as a side.'],
          ['Protein', 'About 120–170 g (4–6 oz) raw meat or fish per person.'],
          ['Vinaigrette', '3 parts oil to 1 part acid, plus salt and a little mustard.'],
        ],
        qs: [
          mc('Dry pasta per person for a main?', 'About 100 g', ['About 25 g', 'About 300 g', 'Half a box']),
          mc('Classic vinaigrette ratio, oil to vinegar?', '3 to 1', ['1 to 1', '1 to 3', '10 to 1']),
          mc('1 cup of dry rice makes about…', '3 cups cooked', ['1 cup cooked', '6 cups cooked', '10 cups cooked']),
          mc('Raw meat or fish per person, roughly?', '120–170 g (4–6 oz)', ['50 g', '500 g', '1 kg']),
          num('White rice: cups of water for 1 cup of rinsed rice?', 1.5, 'cups', 0.25),
        ],
      },
      { id: 'f-measure-3', title: 'Times and ratios drill', teach: [['Mixed practice', 'Cooking times and water ratios for grains, pasta, legumes, eggs and vegetables.']], qs: () => cookTimeQs(6) },
    ],
  },
  {
    id: 'f-meat', title: 'Meat, fish and doneness', glyph: '🌡️', blurb: 'Temperatures, times and tools for every protein.',
    lessons: [
      {
        id: 'f-meat-1', title: 'The temperatures to know',
        teach: [
          ['Poultry: 165°F (74°C)', 'Chicken and turkey, whole or ground.'],
          ['Ground beef and pork: 160°F (71°C)', 'Grinding spreads surface bacteria through the meat.'],
          ['Whole cuts of beef, pork, lamb, fish: 145°F (63°C)', 'Health Canada and USDA guidance, with a 3-minute rest for meats.'],
          ['Use a thermometer', 'Thickest part, not touching bone. Colour and juices are not reliable.'],
        ],
        qs: [
          num('Safe internal temperature for chicken, in °F?', 165, '°F'),
          num('Safe internal temperature for ground beef, in °F?', 160, '°F'),
          mc('Official minimum for a pork chop?', '145°F (63°C) with a 3-minute rest', ['165°F (74°C)', '120°F (49°C)', '180°F (82°C)']),
          tf('You can tell chicken is done by the colour of the juices.', false, 'Only a thermometer is reliable.'),
          mc('Where do you put the thermometer?', 'The thickest part, not touching bone', ['Right next to the bone', 'Just under the skin', 'In the pan juices']),
          mc('Why cook ground beef further than a steak?', 'Grinding mixes surface bacteria inside', ['It is fattier', 'It is cheaper', 'It is always older']),
        ],
      },
      {
        id: 'f-meat-2', title: 'Cuts and methods',
        teach: [
          ['Tender cuts, fast and hot', 'Steaks, chops, chicken breast, fish: sear, grill or roast quickly.'],
          ['Tough cuts, low and slow', 'Chuck, short ribs, pork shoulder: braise or slow-roast until about 200°F inside, when collagen melts.'],
          ['Fish', 'Done when it flakes easily. Salmon is often served at 125–130°F by cooks, but 145°F is the official guidance.'],
        ],
        qs: [
          mc('Best way to cook beef chuck?', 'Braise it low and slow for hours', ['Sear it 2 minutes per side', 'Microwave it', 'Serve it rare']),
          mc('Pork shoulder for pulled pork is ready around…', '195–205°F, when it shreds easily', ['145°F', '120°F', '165°F exactly']),
          mc('Shrimp curled into a tight O shape means…', 'Overcooked', ['Perfectly cooked', 'Raw', 'Frozen']),
          mc('Best cooking for a thin, tender steak?', 'Very hot pan, a few minutes per side', ['Simmer 2 hours', 'Low oven overnight', 'Boil it']),
          tf('Tough cuts get more tender the longer you braise them, up to a point.', true, 'Collagen slowly melts into gelatin around 160–205°F.'),
        ],
      },
      { id: 'f-meat-3', title: 'Doneness drill', teach: [['Mixed practice', 'Temperatures, times and tools for meat, fish and eggs, from the cheat sheet.']], qs: () => donenessQs(6) },
    ],
  },
  {
    id: 'f-safety', title: 'Food safety', glyph: '🧼', blurb: 'The few rules that prevent nearly all food poisoning.',
    lessons: [
      {
        id: 'f-safety-1', title: 'Keep it safe',
        teach: safety.slice(0, 5),
        qs: [
          mc('The danger zone where bacteria grow fastest?', '40–140°F (4–60°C)', ['0–32°F (−18–0°C)', '140–212°F (60–100°C)', 'Above 212°F (100°C)']),
          mc('Cooked food should go in the fridge within…', '2 hours', ['8 hours', 'The next morning', '24 hours']),
          mc('Safest way to thaw frozen chicken?', 'In the fridge', ['On the counter', 'In hot water', 'In the sun']),
          mc('Leftovers are good in the fridge for about…', '3–4 days', ['2 weeks', '1 day', '1 month']),
          num('Reheat leftovers to what temperature, in °F?', 165, '°F'),
          tf('You should rinse raw chicken before cooking it.', false, 'Rinsing splashes bacteria around. Pat it dry instead.'),
        ],
      },
      {
        id: 'f-safety-2', title: 'Clean habits',
        teach: safety.slice(5),
        qs: [
          mc('How long should you wash your hands?', '20 seconds with soap', ['3 seconds with water', '1 minute with hot water only', 'Hand sanitizer is always enough']),
          mc('Why cool cooked rice quickly?', 'Its bacteria can make toxins that reheating does not destroy', ['It gets crunchy', 'It loses vitamins', 'It turns yellow']),
          mc('Fridge temperature should be at or below…', '40°F (4°C)', ['50°F (10°C)', '32°F (0°C) only', '60°F (15°C)']),
          tf('It is fine to use the plate that held raw burgers for the cooked ones.', false, 'Use a clean plate for cooked food.'),
        ],
      },
    ],
  },
  {
    id: 'f-flavour', title: 'Seasoning and flavour', glyph: '🧂', blurb: 'Salt, acid, fat, heat and umami.',
    lessons: [
      {
        id: 'f-flavour-1', title: 'The four levers',
        teach: [
          ['Salt', 'Makes everything taste more like itself. Add a little at each stage.'],
          ['Acid', 'Lemon, lime, vinegar. Brightens heavy or dull food.'],
          ['Fat', 'Carries flavour and adds richness.'],
          ['Heat', 'Chili heat and also the heat of cooking, which builds flavour through browning.'],
        ],
        qs: [
          mc('Your soup tastes flat. First thing to try?', 'Add salt, a pinch at a time', ['Add water', 'Add sugar', 'Boil it longer']),
          mc('Your stew tastes heavy and dull even with enough salt. Add…', 'A squeeze of lemon or a splash of vinegar', ['More oil', 'More flour', 'Ice']),
          mc('When should you add salt?', 'A little at each stage, tasting as you go', ['Only at the very end', 'Never', 'All at the start']),
          tf('Tasting while you cook is one of the biggest upgrades you can make.', true),
          mc('A dish is too spicy. What helps?', 'Dairy, sugar or more of the other ingredients', ['More chili', 'Water only', 'More salt']),
        ],
      },
      {
        id: 'f-flavour-2', title: 'Umami, spices and herbs',
        teach: [
          ['Umami', 'Savoury depth from soy sauce, parmesan, tomato paste, miso, mushrooms and fish sauce.'],
          ['Bloom spices', 'Cook ground spices in hot oil for 30–60 seconds to wake them up.'],
          ['Herbs', 'Hardy herbs (rosemary, thyme, bay) go in early. Soft herbs (basil, cilantro, parsley) go in at the end.'],
          ['Deglaze', 'Splash liquid into a hot pan and scrape up the brown bits (fond). That is free flavour.'],
        ],
        qs: [
          mc('Which of these adds umami?', 'Parmesan', ['Lemon juice', 'Sugar', 'Cucumber']),
          mc('When do you add fresh basil?', 'At the end', ['At the start of a long simmer', 'In the oil first', 'Never cook with it']),
          mc('What is deglazing?', 'Adding liquid to a hot pan to lift the brown bits', ['Washing the pan', 'Adding sugar', 'Removing fat']),
          match('Match the flavour booster to its type', [['Lime juice', 'Acid'], ['Miso', 'Umami'], ['Olive oil', 'Fat'], ['Chili flakes', 'Heat']]),
          tf('Blooming means toasting spices in hot oil before adding liquid.', true),
        ],
      },
    ],
  },
  {
    id: 'f-nutrition', title: 'Eating well', glyph: '🥦', blurb: 'Macros, the balanced plate, and reading labels.',
    lessons: [
      {
        id: 'f-nutrition-1', title: 'Macros in plain words',
        teach: [
          ['Protein', '4 calories per gram. Builds and repairs muscle and keeps you full. Meat, fish, eggs, dairy, tofu, beans, lentils.'],
          ['Carbohydrates', '4 calories per gram. Your main fuel. Choose whole grains, fruit, vegetables and legumes most often.'],
          ['Fat', '9 calories per gram. Essential, but dense. Favour olive oil, nuts, seeds, fish.'],
          ['Fibre', 'Helps digestion, fullness and cholesterol. Most adults need 25–38 g a day and many get half that.'],
        ],
        qs: [
          match('Match each to its calories per gram', [['Protein', '4 kcal/g, builds muscle'], ['Carbs', '4 kcal/g, main fuel'], ['Fat', '9 kcal/g'], ['Alcohol', '7 kcal/g']]),
          mc('Which is highest in fibre?', 'Lentils', ['White rice', 'Chicken breast', 'Butter']),
          mc('Which is a complete plant protein?', 'Tofu', ['Rice', 'Apples', 'Olive oil']),
          mc('Roughly how much fibre do adults need a day?', '25–38 g', ['5 g', '100 g', 'None']),
          tf('Fat makes you fat, so you should avoid it completely.', false, 'Healthy fats are essential; it is total calories over time that matter for weight.'),
        ],
      },
      {
        id: 'f-nutrition-2', title: 'The balanced plate',
        teach: [
          ['Canada’s Food Guide plate', 'Half vegetables and fruit, a quarter protein, a quarter whole grains, and water to drink.'],
          ['Sodium', 'Keep it under about 2,300 mg a day. Sauces, broth, cheese and processed meats add up fast.'],
          ['Cook at home', 'Home cooking lets you control salt, sugar and fat. You are already doing the most important thing.'],
        ],
        qs: [
          mc('On the balanced plate, how much is vegetables and fruit?', 'Half', ['A quarter', 'None', 'Three quarters']),
          num('Daily sodium limit for most adults, in mg?', 2300, 'mg', 100),
          mc('Which adds the most sodium?', '2 tbsp soy sauce', ['A cup of broccoli', 'An apple', 'A cup of rice cooked without salt']),
          mc('Best drink to have with most meals?', 'Water', ['Soda', 'Energy drink', 'Juice every time']),
          tf('A quarter of the plate should be protein foods.', true),
        ],
      },
    ],
  },
]
