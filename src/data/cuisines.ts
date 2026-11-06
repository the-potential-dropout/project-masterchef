import { mc, tf, match, num, order, type Branch, type Lesson, type Question } from './courseTypes'
import type { Recipe } from './types'
import { recipeDrill } from '../lib/generate'

interface CuisineSpec {
  /** 'world' cuisines vs 'day' branches (breakfast, soups, drinks...) */
  group?: 'world' | 'day' | 'diet'
  id: string
  title: string
  glyph: string
  blurb: string
  pantry: [string, string][]
  pantryQs: Question[]
  technique: [string, string][]
  techniqueQs: Question[]
}

export const cuisineSpecs: CuisineSpec[] = [
  {
    id: 'italian', title: 'Italian', glyph: '🍝', blurb: 'Few ingredients, treated with respect.',
    pantry: [
      ['The core', 'Good olive oil, garlic, canned San Marzano-style tomatoes, dried pasta, parmesan and pecorino, basil, oregano, chili flakes.'],
      ['Regional', 'Butter and rice in the north (risotto), olive oil and tomatoes in the south.'],
      ['Cheese', 'Parmigiano-Reggiano is nutty and aged; pecorino romano is sheep’s milk, saltier and sharper.'],
    ],
    pantryQs: [
      mc('Pecorino romano is made from…', 'Sheep’s milk', ['Cow’s milk', 'Goat’s milk', 'Buffalo milk']),
      mc('Which rice is used for risotto?', 'Arborio', ['Basmati', 'Jasmine', 'Wild rice']),
      tf('Traditional carbonara contains cream.', false, 'Roman carbonara is eggs, cheese, cured pork and pepper. The creaminess comes from the emulsion.'),
      mc('What is soffritto?', 'Onion, carrot and celery cooked slowly in olive oil', ['A tomato sauce', 'A type of pasta', 'Fried bread']),
      match('Match the dish to its region', [['Risotto', 'North'], ['Carbonara', 'Rome'], ['Pizza margherita', 'Naples'], ['Pesto', 'Genoa']]),
    ],
    technique: [
      ['Pasta water', 'Starchy water turns fat and cheese into a glossy sauce. Always save a mug.'],
      ['Al dente', 'Cook pasta until it still has a slight bite, then finish it in the sauce.'],
      ['Mantecatura', 'Beating cold butter and cheese into risotto off the heat to make it creamy.'],
    ],
    techniqueQs: [
      mc('Why finish pasta in the pan with the sauce?', 'It absorbs flavour and the starch binds the sauce', ['It cools down', 'To save a pot', 'So it gets soft']),
      mc('What does al dente mean?', 'Tender with a slight bite in the centre', ['Very soft', 'Crunchy and raw', 'Cooked twice']),
      tf('You should rinse cooked pasta before adding sauce.', false, 'Rinsing washes off the starch that helps the sauce cling.'),
      mc('Why add broth to risotto a ladle at a time?', 'Stirring with a little liquid releases starch for creaminess', ['To keep it cold', 'It is faster', 'To use less broth']),
    ],
  },
  {
    id: 'chinese', title: 'Chinese', glyph: '🥢', blurb: 'Eight great regional cuisines, from mild Cantonese to fiery Sichuan.',
    pantry: [
      ['The core', 'Light and dark soy sauce, Shaoxing wine, rice vinegar, black vinegar, sesame oil, oyster sauce, cornstarch, ginger, garlic, green onions.'],
      ['Sichuan', 'Doubanjiang (chili bean paste), dried chilies and Sichuan peppercorns, which make your mouth tingle (ma la: numbing and spicy).'],
      ['Light vs dark soy', 'Light soy is for saltiness; dark soy is thicker and sweeter, mostly for colour.'],
    ],
    pantryQs: [
      mc('What do Sichuan peppercorns do?', 'Create a tingling, numbing feeling', ['Make food sweet', 'Add sourness', 'Thicken sauces']),
      mc('Dark soy sauce is mainly used for…', 'Colour and gentle sweetness', ['Saltiness', 'Frying', 'Dessert']),
      mc('What is doubanjiang?', 'Fermented chili bean paste', ['A noodle', 'A soy sauce', 'A cooking wine']),
      mc('Shaoxing is a type of…', 'Rice wine for cooking', ['Vinegar', 'Chili oil', 'Tea']),
      match('Match the Sichuan flavour words', [['Ma', 'Numbing'], ['La', 'Spicy hot'], ['Suan', 'Sour'], ['Tian', 'Sweet']]),
    ],
    technique: [
      ['Wok hei', 'The smoky “breath of the wok” from very high heat and fast tossing.'],
      ['Velveting', 'Coating meat in cornstarch (and often egg white or soy) so it stays silky and juicy.'],
      ['Prep everything first', 'Stir-frying takes minutes, so every ingredient must be cut and ready before you start.'],
    ],
    techniqueQs: [
      mc('What is velveting?', 'Coating meat in cornstarch so it stays juicy', ['Slow-braising pork', 'Deep-frying tofu', 'Steaming fish']),
      tf('In a stir-fry, you should crowd the wok so everything cooks together.', false, 'Crowding drops the heat and steams the food. Cook in batches.'),
      mc('Why use high heat in a wok?', 'Fast searing and smoky flavour (wok hei)', ['To boil sauce', 'To keep food raw', 'To save gas']),
      mc('When does cornstarch slurry go into a stir-fry sauce?', 'At the end, to thicken it', ['First, in cold oil', 'Never', 'In the marinade only']),
    ],
  },
  {
    id: 'mexican', title: 'Mexican', glyph: '🌮', blurb: 'Corn, chilies, lime and slow-built sauces.',
    pantry: [
      ['The core', 'Corn tortillas, dried and fresh chilies, lime, white onion, cilantro, Mexican oregano, cumin, beans, rice.'],
      ['Chilies', 'Jalapeño and serrano are fresh and grassy. Dried chilies like ancho, guajillo and chipotle (smoked jalapeño) bring depth.'],
      ['Nixtamal', 'Corn soaked in an alkaline solution, which makes masa for tortillas more nutritious and flavourful.'],
    ],
    pantryQs: [
      mc('A chipotle is a…', 'Smoked, dried jalapeño', ['Fresh poblano', 'Bell pepper', 'Type of tomato']),
      mc('Which onion is most traditional in Mexican salsas?', 'White onion', ['Red onion', 'Shallot', 'Leek']),
      mc('Pico de gallo is…', 'A fresh, uncooked salsa', ['A cooked mole', 'A cheese', 'A bean dish']),
      tf('Most of a chili’s heat is in the ribs and seeds.', true, 'Remove them for a milder result.'),
      mc('What is masa made from?', 'Nixtamalized corn', ['Wheat flour', 'Rice', 'Potatoes']),
    ],
    technique: [
      ['Toast and rehydrate chilies', 'Toast dried chilies briefly in a dry pan, then soak in hot water and blend.'],
      ['Fry the sauce', 'Blended sauces are often fried in hot oil to deepen and thicken them.'],
      ['Warm tortillas', 'Heat on a dry pan or comal and wrap in a towel to keep them soft.'],
    ],
    techniqueQs: [
      mc('How do you keep corn tortillas soft?', 'Heat in a dry pan and wrap in a towel', ['Microwave them uncovered', 'Boil them', 'Serve them cold']),
      mc('Why toast rice before simmering it for arroz rojo?', 'Nutty flavour and separate grains', ['To cook it faster', 'To make it sticky', 'To remove gluten']),
      tf('Toasting dried chilies until black adds great flavour.', false, 'Burnt chilies turn bitter. Toast just until fragrant.'),
    ],
  },
  {
    id: 'indian', title: 'Indian', glyph: '🍛', blurb: 'Layered spices, legumes and slow-browned onions.',
    pantry: [
      ['Whole spices', 'Cumin seeds, mustard seeds, cardamom, cloves, cinnamon, bay leaves.'],
      ['Ground spices', 'Turmeric, coriander, cumin, chili powder, garam masala (a warm finishing blend).'],
      ['Staples', 'Ginger, garlic, onions, tomatoes, ghee, lentils (dal), chickpeas, basmati rice, yogurt.'],
    ],
    pantryQs: [
      mc('Garam masala is usually added…', 'Near the end, as a warm finishing blend', ['First, in cold oil', 'Only to desserts', 'Raw on top only']),
      mc('Which spice gives dal its yellow colour?', 'Turmeric', ['Paprika', 'Cumin', 'Black pepper']),
      mc('What is dal?', 'Lentils or split legumes, cooked', ['Flatbread', 'Rice', 'A yogurt drink']),
      mc('What is ghee?', 'Clarified butter', ['Coconut oil', 'Yogurt', 'Chickpea flour']),
      match('Match the spice to its form', [['Mustard seeds', 'Whole, popped in oil'], ['Turmeric', 'Ground, earthy and yellow'], ['Garam masala', 'Finishing blend'], ['Kasuri methi', 'Dried fenugreek leaves']]),
    ],
    technique: [
      ['The order', 'Whole spices in hot oil, then onions until golden, then ginger and garlic, then ground spices, then tomatoes.'],
      ['Tadka (tempering)', 'Spices sizzled in ghee or oil and poured over a dish at the end.'],
      ['Bhuna', 'Frying the onion-tomato masala until the oil separates at the edges, so it tastes cooked, not raw.'],
    ],
    techniqueQs: [
      order3(),
      mc('What is a tadka?', 'Spices sizzled in hot fat and poured over the dish', ['A type of bread', 'A marinade', 'A rice dish']),
      mc('The oil separating from the masala tells you…', 'The base is properly cooked down', ['It burned', 'You added too much oil', 'It is time to add water']),
      tf('Pale, barely-cooked onions make a deeper curry than golden ones.', false, 'Well-browned onions build the depth of the sauce.'),
    ],
  },
  {
    id: 'japanese', title: 'Japanese', glyph: '🍱', blurb: 'Umami, seasonality and clean flavours.',
    pantry: [
      ['The core', 'Soy sauce, mirin (sweet rice wine), sake, rice vinegar, miso, dashi, short-grain rice.'],
      ['Dashi', 'A quick stock of kombu (kelp) and katsuobushi (bonito flakes). The base of miso soup and many sauces.'],
      ['Miso', 'Fermented soybean paste. White miso is mild and sweet; red is aged longer and stronger.'],
    ],
    pantryQs: [
      mc('Dashi is made from…', 'Kombu and bonito flakes', ['Chicken bones', 'Soy sauce and sugar', 'Rice and water']),
      mc('Mirin is…', 'A sweet rice wine for cooking', ['A vinegar', 'A seaweed', 'A noodle']),
      mc('Which miso is mildest?', 'White (shiro) miso', ['Red (aka) miso', 'Hatcho miso', 'They taste the same']),
      tf('You should boil miso soup hard after adding the miso.', false, 'Boiling dulls miso’s aroma. Dissolve it off the boil.'),
      mc('Teriyaki sauce is traditionally…', 'Soy sauce, mirin, sake and sugar', ['Ketchup and vinegar', 'Peanut butter and lime', 'Miso and cream']),
    ],
    technique: [
      ['Umami', 'The savoury fifth taste, from glutamates (kombu, miso, soy) and inosinates (bonito).'],
      ['Washing rice', 'Rinse short-grain rice until the water runs nearly clear for fluffy, glossy grains.'],
      ['Glazing', 'Reducing a sweet-salty sauce until it coats food like syrup.'],
    ],
    techniqueQs: [
      mc('What is umami?', 'The savoury fifth taste', ['Sourness', 'Spiciness', 'A cooking method']),
      mc('Why remove kombu before the water boils?', 'Boiling makes dashi slimy and bitter', ['To save it', 'It dissolves', 'It is not edible']),
      mc('A teriyaki glaze is ready when…', 'It coats a spoon like syrup', ['It is watery', 'It smokes', 'It turns black']),
    ],
  },
  {
    id: 'levantine', title: 'Arabic and Levantine', glyph: '🧆', blurb: 'Lemon, olive oil, herbs, tahini and warm spices.',
    pantry: [
      ['The core', 'Tahini (sesame paste), chickpeas, olive oil, lemon, garlic, parsley, mint, bulgur, yogurt, pita.'],
      ['Spices', 'Cumin, coriander, allspice, cinnamon, sumac (tart, red), za’atar (thyme, sumac and sesame), seven spices (baharat).'],
      ['Mezze', 'A spread of small dishes like hummus, tabbouleh, baba ghanoush and falafel, meant for sharing.'],
    ],
    pantryQs: [
      mc('Tahini is made from…', 'Sesame seeds', ['Chickpeas', 'Peanuts', 'Olives']),
      mc('Real Lebanese tabbouleh is mostly…', 'Parsley', ['Bulgur', 'Tomato', 'Lettuce']),
      mc('Sumac tastes…', 'Tart and lemony', ['Sweet', 'Very spicy', 'Bitter']),
      mc('What is za’atar?', 'A blend of thyme, sumac and sesame', ['A bread', 'A yogurt sauce', 'A type of olive']),
      tf('Mezze are small dishes meant to be shared.', true),
    ],
    technique: [
      ['Silky hummus', 'Overcook the chickpeas, blend tahini with lemon and ice water first, then the chickpeas.'],
      ['Spice marinades', 'Yogurt and lemon tenderise; warm spices and garlic flavour. Overnight is best.'],
      ['Toum', 'A fluffy garlic sauce emulsified from garlic, lemon and oil.'],
    ],
    techniqueQs: [
      mc('Why add ice water to hummus?', 'It makes it lighter and silkier', ['To keep it fresh', 'To thin the garlic', 'It replaces tahini']),
      mc('Why add baking soda when cooking chickpeas for hummus?', 'It softens them so they blend smooth', ['For flavour', 'To make them crunchy', 'To keep them green']),
      mc('Toum is…', 'An emulsified garlic sauce', ['A flatbread', 'A spice blend', 'Grilled cheese']),
    ],
  },
  {
    id: 'west-african', title: 'West African', glyph: '🍲', blurb: 'Bold peppers, peanuts and one-pot comfort.',
    pantry: [
      ['The core', 'Scotch bonnet peppers, tomatoes, red bell peppers, onions, palm oil, peanuts, ginger, thyme, curry powder, bouillon.'],
      ['Ata base', 'A blended mix of peppers, tomatoes and onion, fried down as the base for stews and jollof.'],
      ['Staples', 'Rice, yams, plantains, cassava (gari and fufu), black-eyed peas.'],
    ],
    pantryQs: [
      mc('Which pepper brings the heat in jollof?', 'Scotch bonnet', ['Bell pepper', 'Poblano', 'Banana pepper']),
      mc('Maafe gets its creamy body from…', 'Peanut butter', ['Cream', 'Coconut milk', 'Cheese']),
      mc('Suya’s spice rub (yaji) is built on…', 'Ground peanuts and chili', ['Cinnamon and sugar', 'Parmesan', 'Dried herbs only']),
      tf('Jollof rice is claimed with pride by both Nigeria and Ghana.', true, 'The friendly “jollof wars” are legendary.'),
      mc('Fufu is made from…', 'Pounded cassava, yam or plantain', ['Rice flour', 'Wheat', 'Lentils']),
    ],
    technique: [
      ['Fry the base down', 'The pepper-tomato base is fried until reduced and the oil rises to the top, which removes the raw taste.'],
      ['Steam, don’t stir', 'Jollof is covered tightly and steamed on low; stirring makes it mushy.'],
      ['Against the grain', 'Suya beef is sliced thinly across the grain so it is tender after quick grilling.'],
    ],
    techniqueQs: [
      mc('How do you know the jollof base is cooked enough?', 'It has reduced and the oil rises to the top', ['It is still bright and watery', 'It smells raw', 'It is boiling hard']),
      mc('Why cover jollof with foil and a lid?', 'To trap steam so the rice cooks evenly', ['To keep it cold', 'To stop smoke', 'To speed up boiling']),
      tf('You should stir jollof constantly as it cooks.', false, 'Stirring breaks the grains and makes it mushy.'),
    ],
  },
  {
    id: 'american', title: 'American', glyph: '🍔', blurb: 'Diner classics, comfort food and the grill.',
    pantry: [
      ['The core', 'Ground beef, cheddar, butter, buttermilk, all-purpose flour, ketchup, mustard, pickles, brown sugar, paprika.'],
      ['Regional', 'Texas brisket, Carolina pulled pork, Kansas City ribs, Southern fried chicken, New England chowder.'],
      ['Comfort food', 'Mac and cheese, pancakes, burgers, biscuits: rich, simple and built on technique.'],
    ],
    pantryQs: [
      mc('Buttermilk in pancakes reacts with…', 'Baking soda, to make bubbles', ['Salt', 'Butter', 'Sugar']),
      mc('Best beef for juicy burgers?', '80/20 ground beef', ['Extra-lean ground beef', 'Stewing beef', 'Steak tips']),
      match('Match the BBQ style to its place', [['Brisket', 'Texas'], ['Pulled pork', 'Carolinas'], ['Burnt ends', 'Kansas City'], ['Dry-rub ribs', 'Memphis']]),
      tf('Pre-shredded cheese melts as smoothly as a block you grate yourself.', false, 'Anti-caking starch makes it grainy.'),
    ],
    technique: [
      ['Roux and béchamel', 'Butter cooked with flour, then milk whisked in, makes a sauce that thickens mac and cheese and gravy.'],
      ['Smash and sear', 'Pressing beef thin onto a very hot pan maximises browned crust.'],
      ['Gentle batter', 'Mix pancake batter just until combined. Lumps are fine.'],
    ],
    techniqueQs: [
      mc('What is a roux?', 'Equal parts butter and flour cooked together', ['A marinade', 'A spice rub', 'A pan of hot oil']),
      mc('When should you smash a smash burger?', 'Once, in the first 30 seconds', ['Several times while it cooks', 'After flipping', 'Never']),
      mc('Why not overmix pancake batter?', 'It develops gluten and makes them tough', ['It gets too thin', 'It turns grey', 'It loses sugar']),
      mc('When do you flip a pancake?', 'When bubbles pop on top and the edges look dry', ['After 10 seconds', 'When it smokes', 'Only once it is golden on top']),
    ],
  },
  {
    id: 'brazilian', title: 'Brazilian churrasco', glyph: '🔥', blurb: 'Fire, coarse salt and great beef.',
    pantry: [
      ['The core', 'Coarse salt (sal grosso), picanha and other cuts, garlic, onions, tomatoes, parsley, vinegar, cassava flour, black beans, rice.'],
      ['Churrasco', 'Southern Brazilian barbecue: big cuts on skewers over charcoal, carved at the table.'],
      ['Sides', 'Vinagrete (fresh salsa), farofa (toasted cassava flour), rice and beans, pão de queijo (cheese bread).'],
    ],
    pantryQs: [
      mc('Picanha is…', 'The top sirloin cap with its fat cap', ['A pork sausage', 'Chicken hearts', 'A beef rib']),
      mc('Traditional churrasco seasoning is mostly…', 'Coarse salt', ['BBQ sauce', 'Soy sauce', 'Garlic powder']),
      mc('Farofa is made with…', 'Toasted cassava flour', ['Cornmeal', 'Breadcrumbs', 'Rice flour']),
      mc('Vinagrete is…', 'A fresh tomato, onion and pepper salsa with vinegar', ['A salad dressing', 'A wine', 'A dessert']),
      tf('Pão de queijo is made with tapioca (cassava) starch, so it is naturally gluten-free.', true),
    ],
    technique: [
      ['Fat cap', 'Leave the fat on picanha, score it, and render it so it crisps and bastes the meat.'],
      ['Coarse salt', 'Big crystals season the surface without making the meat too salty.'],
      ['Rest and slice', 'Rest the meat, then slice thinly against the grain.'],
    ],
    techniqueQs: [
      mc('What do you do with the fat cap on picanha?', 'Keep it, score it and render it crisp', ['Trim it all off', 'Boil it', 'Eat it raw']),
      mc('Medium-rare beef is pulled from the heat at about…', '125–130°F (52–54°C)', ['165°F (74°C)', '100°F (38°C)', '200°F (93°C)']),
      tf('Slicing against the grain makes grilled beef more tender.', true),
    ],
  },
  {
    id: 'thai', title: 'Thai', glyph: '🌶️', blurb: 'Hot, sour, salty and sweet in balance.',
    pantry: [
      ['The core', 'Fish sauce, palm sugar, limes, Thai chilies, garlic, shallots, lemongrass, galangal, makrut lime leaves, Thai basil, coconut milk, jasmine rice.'],
      ['Curry pastes', 'Green (fresh green chilies), red (dried red chilies), yellow (turmeric, milder), massaman (warm spices, peanuts).'],
      ['Herbs', 'Holy basil (peppery, for kra pao), Thai basil (anise-like), cilantro including the roots.'],
    ],
    pantryQs: [
      mc('Thai cooking balances which four flavours?', 'Hot, sour, salty, sweet', ['Bitter, smoky, sweet, fatty', 'Only spicy', 'Sweet and sour only']),
      mc('Galangal is related to…', 'Ginger', ['Garlic', 'Onion', 'Lime']),
      mc('Green curry gets its colour from…', 'Fresh green chilies and herbs', ['Spinach', 'Matcha', 'Food colouring']),
      mc('Which basil is used for pad kra pao?', 'Holy basil', ['Italian basil', 'Mint', 'Parsley']),
      match('Match the ingredient to its role', [['Fish sauce', 'Salty'], ['Lime', 'Sour'], ['Palm sugar', 'Sweet'], ['Bird’s eye chili', 'Hot']]),
    ],
    technique: [
      ['Cracking coconut cream', 'Simmer thick coconut cream until the oil separates, then fry curry paste in it.'],
      ['Bruising aromatics', 'Smash lemongrass and tear lime leaves to release their oils into soups.'],
      ['Season at the end', 'Taste and adjust fish sauce, lime and sugar off the heat.'],
    ],
    techniqueQs: [
      mc('What is “cracking” coconut cream?', 'Simmering it until the oil separates', ['Freezing it', 'Whipping it', 'Mixing it with water']),
      mc('Why add lime juice to tom yum off the heat?', 'Boiling makes it bitter', ['It evaporates', 'It curdles the shrimp', 'Tradition only']),
      tf('Lemongrass and galangal in tom yum are meant to be eaten.', false, 'They flavour the broth; eat around them.'),
    ],
  },
  {
    id: 'korean', title: 'Korean', glyph: '🥬', blurb: 'Fermented depth, sesame, and lots of banchan.',
    pantry: [
      ['The core', 'Gochujang (chili paste), gochugaru (chili flakes), doenjang (soybean paste), soy sauce, sesame oil, sesame seeds, garlic, green onions, kimchi, short-grain rice.'],
      ['Kimchi', 'Fermented napa cabbage with chili, garlic and often fish sauce. Older, sour kimchi is best for cooking.'],
      ['Banchan', 'Small shared side dishes served with every meal.'],
    ],
    pantryQs: [
      mc('Gochujang is…', 'Fermented red chili paste', ['Chili flakes', 'Soy sauce', 'Rice vinegar']),
      mc('Gochugaru is…', 'Korean chili flakes', ['A paste', 'A noodle', 'A pickle']),
      mc('For kimchi fried rice, which kimchi is best?', 'Older, more sour kimchi', ['Fresh, unfermented kimchi', 'Any pickled cucumber', 'Sauerkraut']),
      mc('What are banchan?', 'Small side dishes served with the meal', ['Desserts', 'Drinks', 'Noodles']),
      tf('Many kimchis contain fish sauce or salted shrimp.', true, 'Check the label if you are vegetarian or allergic.'),
    ],
    technique: [
      ['Fruit marinades', 'Grated Asian pear contains enzymes that tenderise beef for bulgogi.'],
      ['Salting vegetables', 'Salt cucumbers or cabbage to draw out water before seasoning.'],
      ['Day-old rice', 'Cold rice fries into separate grains; fresh rice turns mushy.'],
    ],
    techniqueQs: [
      mc('Why is Asian pear used in bulgogi marinade?', 'Its enzymes tenderise the meat and add sweetness', ['For colour', 'To make it sour', 'To thicken it']),
      mc('Why salt cucumbers before dressing them?', 'To pull out water so they stay crunchy', ['To make them soft', 'To kill bacteria', 'To peel them']),
      mc('Best rice for fried rice?', 'Cold, day-old rice', ['Freshly cooked hot rice', 'Uncooked rice', 'Sticky rice']),
    ],
  },
  // ───────────── through the day ─────────────
  {
    group: 'day', id: 'breakfast', title: 'Breakfast', glyph: '🍳', blurb: 'Fast, filling mornings, from make-ahead oats to brunch for friends.',
    pantry: [
      ['The core', 'Eggs, oats, milk or yogurt, bread, fruit, maple syrup, butter, cinnamon and vanilla.'],
      ['Protein in the morning', 'Eggs, Greek yogurt and nut butters keep you full until lunch far better than a pastry.'],
      ['Make ahead', 'Overnight oats, boiled eggs and chopped fruit turn a rushed morning into a 2-minute breakfast.'],
    ],
    pantryQs: [
      mc('Which breakfast keeps you fullest?', 'Greek yogurt with oats and fruit', ['A croissant', 'Orange juice alone', 'A sugary cereal']),
      mc('Best bread for French toast?', 'Thick, day-old brioche or challah', ['Fresh thin sandwich bread', 'Crackers', 'Pita']),
      mc('How long do overnight oats keep in the fridge?', 'About 4 days', ['2 hours', '2 weeks', 'They must be eaten immediately']),
      tf('Shakshuka eggs are poached right in the tomato sauce.', true),
    ],
    technique: [
      ['Egg timing', 'Into boiling water: 6–7 minutes for jammy, 10–12 for hard. Then straight into ice water.'],
      ['Medium heat', 'French toast and pancakes need medium heat so the inside cooks before the outside burns.'],
      ['Cover to set', 'A lid traps steam, which sets the tops of eggs in shakshuka or frittata.'],
    ],
    techniqueQs: [
      num('Minutes in boiling water for a jammy egg (from the fridge)?', 6.5, 'min', 0.5),
      mc('Why plunge boiled eggs into ice water?', 'It stops the cooking and makes them easier to peel', ['To make them shiny', 'To add salt', 'To kill bacteria']),
      mc('French toast is burnt outside and soggy inside. What went wrong?', 'The heat was too high', ['Too much cinnamon', 'Not enough syrup', 'The bread was stale']),
    ],
  },
  {
    group: 'day', id: 'soups', title: 'Soups, bisques and chowders', glyph: '🥣', blurb: 'Brothy, puréed and creamy: the three soup families.',
    pantry: [
      ['Brothy soups', 'Clear broth with pieces in it, like chicken noodle or minestrone.'],
      ['Puréed soups', 'Cooked vegetables blended smooth, like butternut squash or tomato soup.'],
      ['Bisques', 'Smooth, rich French soups traditionally made from shellfish shells, thickened with rice or roux and finished with cream.'],
      ['Chowders', 'Chunky, creamy soups thickened with potatoes and often a little flour, like clam or corn chowder.'],
    ],
    pantryQs: [
      match('Match the soup to its family', [['Chicken noodle', 'Brothy'], ['Butternut squash', 'Puréed'], ['Lobster bisque', 'Bisque'], ['Clam chowder', 'Chowder']]),
      mc('A bisque gets its deep flavour from…', 'Shellfish shells simmered into stock', ['Lots of cheese', 'Bacon', 'Curry paste']),
      mc('What thickens a chowder?', 'Potatoes and a little flour', ['Gelatin', 'Eggs', 'Nothing, it is thin']),
      tf('French onion soup needs 45–60 minutes to properly caramelise the onions.', true, 'Rushing on high heat burns them instead.'),
    ],
    technique: [
      ['Start with aromatics', 'Almost every soup begins with onion (plus carrot and celery) softened in fat.'],
      ['Simmer, don’t boil', 'Gentle bubbles keep meat tender and broth clear.'],
      ['Blend safely', 'Fill a blender only halfway with hot soup, vent the lid and cover with a towel. Or use a stick blender in the pot.'],
      ['Cream and seafood go in last', 'Boiling cream can split, and clams and shrimp turn rubbery.'],
    ],
    techniqueQs: [
      mc('How full should a blender be with hot soup?', 'About half full, lid vented', ['Completely full', 'Three-quarters, lid sealed tight', 'It does not matter']),
      mc('When do clams go into a chowder?', 'At the end, just to heat through', ['At the start', 'Halfway through a hard boil', 'Never, only their juice']),
      mc('Why leave part of a corn chowder unblended?', 'For both creaminess and texture', ['To save time', 'Blending ruins corn', 'Tradition only']),
      tf('Noodles keep perfectly in leftover soup for days.', false, 'They soak up broth and turn mushy. Cook them separately for meal prep.'),
    ],
  },
  {
    group: 'day', id: 'snacks', title: 'Snacks and starters', glyph: '🥨', blurb: 'Cheap, quick bites for movie nights and guests.',
    pantry: [
      ['Smart snacks', 'Pair fibre or protein with something tasty: chickpeas, edamame, popcorn, nuts, hummus with veg.'],
      ['Starters for guests', 'Bruschetta, hummus and a bowl of good olives make you look like a host who has it together.'],
    ],
    pantryQs: [
      mc('Which snack is a whole grain?', 'Popcorn', ['Potato chips', 'Pretzels made with white flour', 'Gummy candy']),
      mc('Edamame are…', 'Young soybeans', ['Green peas', 'Lima beans', 'Japanese pickles']),
      mc('Best snack for protein?', 'Edamame', ['Rice cakes', 'Apple', 'Popcorn']),
    ],
    technique: [
      ['Dry for crunch', 'Pat chickpeas and vegetables dry before roasting; water makes them steam instead of crisp.'],
      ['The 3-kernel test', 'Heat oil with 3 popcorn kernels. When they pop, the oil is ready.'],
      ['Garlic toast', 'Rub a cut garlic clove on hot toast; the rough surface grates it like sandpaper.'],
    ],
    techniqueQs: [
      mc('Why dry chickpeas before roasting?', 'Water makes them steam instead of crisp', ['To remove salt', 'To make them sweeter', 'So they cook faster']),
      mc('Your popcorn oil is ready when…', 'The 3 test kernels pop', ['It starts smoking', 'It has been on for 10 minutes', 'You hear sizzling']),
      tf('Bruschetta should be topped hours ahead so the flavours blend.', false, 'Top at the last minute so the toast stays crisp.'),
    ],
  },
  {
    group: 'day', id: 'desserts', title: 'Desserts and baking', glyph: '🍪', blurb: 'Baking is chemistry. These recipes make it fun.',
    pantry: [
      ['The core', 'Flour, sugar, brown sugar, butter, eggs, baking soda, baking powder, vanilla, salt, chocolate.'],
      ['Baking soda vs powder', 'Baking soda needs an acid (brown sugar, buttermilk, bananas) to react. Baking powder already contains its acid.'],
      ['Measure carefully', 'Spoon flour into the cup and level it, or better, weigh it. Scooped flour can be 25% too much.'],
    ],
    pantryQs: [
      mc('Baking soda needs what to react?', 'An acid, like buttermilk or brown sugar', ['Only heat', 'Salt', 'Cold water']),
      mc('Best way to measure flour?', 'Weigh it, or spoon it into the cup and level', ['Scoop and pack it', 'Eyeball it', 'Use a mug']),
      mc('Why are brown bananas best for banana bread?', 'They are sweeter and more flavourful', ['They are cheaper', 'They have less water', 'They bake faster']),
      tf('In baking, small measuring mistakes matter more than in a stew.', true),
    ],
    technique: [
      ['Creaming', 'Beating soft butter with sugar traps air for lighter cookies and cakes.'],
      ['Muffin method', 'Mix wet and dry separately, then combine gently. Overmixing makes it tough.'],
      ['Cold butter for crumble', 'Rub cold butter into flour so it stays in little pieces that bake crisp.'],
      ['Gelatin', 'Sprinkle gelatin over cold liquid to bloom, then dissolve it in warm (never boiling) liquid.'],
    ],
    techniqueQs: [
      mc('Cookies spread into thin puddles. Likely cause?', 'The butter was too warm or melted', ['Too much flour', 'The oven was too hot', 'Too few chocolate chips']),
      mc('When should you take cookies out?', 'Edges golden, centres still look a bit underdone', ['When they look fully done in the oven', 'After 30 minutes', 'When they are dark brown']),
      mc('What does “blooming” gelatin mean?', 'Letting it soak in cold liquid before dissolving', ['Boiling it', 'Freezing it', 'Mixing it with sugar']),
      mc('How do you know banana bread is done?', 'A toothpick in the centre comes out clean', ['The top is brown', 'The kitchen smells good', 'After exactly 40 minutes']),
    ],
  },
  {
    group: 'day', id: 'smoothies', title: 'Smoothies and juices', glyph: '🥤', blurb: 'Blender drinks, fresh juices and fruit waters.',
    pantry: [
      ['Freezer stash', 'Frozen berries, mango and banana chunks make thick, cold smoothies without ice.'],
      ['Liquids', 'Milk or plant milk, Greek yogurt, water and fresh citrus juice.'],
      ['Whole fruit beats juice', 'Blending keeps the fibre; juice removes most of it, so it is less filling and the sugar hits faster.'],
    ],
    pantryQs: [
      mc('Why use frozen fruit in smoothies?', 'Thick and cold without watering it down', ['It is more nutritious than fresh', 'Fresh fruit will not blend', 'It is sweeter']),
      mc('Which keeps more fibre?', 'A smoothie (whole fruit blended)', ['Strained juice', 'Soda', 'They are the same']),
      mc('Agua fresca comes from…', 'Mexico', ['Japan', 'Italy', 'Korea']),
    ],
    technique: [
      ['Blender order', 'Liquid first, then soft ingredients and greens, then frozen fruit and ice.'],
      ['Simple syrup', 'Sugar dissolved in equal water. It mixes into cold drinks; plain sugar sinks.'],
      ['Blend and strain', 'No juicer? Blend with a little water and strain through a fine sieve or nut milk bag.'],
    ],
    techniqueQs: [
      order('Load a blender in the right order', ['Milk or other liquid', 'Yogurt and soft fruit', 'Spinach', 'Frozen fruit and ice']),
      mc('Why make simple syrup for lemonade?', 'Sugar does not dissolve well in cold water', ['It is healthier', 'It keeps lemons fresh', 'It adds colour']),
      mc('How do you get green smoothies without leafy bits?', 'Blend the greens with the liquid first', ['Add greens last', 'Chop them by hand', 'Use ice only']),
    ],
  },
  {
    group: 'day', id: 'drinks', title: 'Coffee, tea and cocoa', glyph: '☕', blurb: 'Café drinks at home for a fraction of the price.',
    pantry: [
      ['Coffee', 'Grind size matters: coarse for cold brew and French press, medium for drip, fine for espresso.'],
      ['Tea', 'Black tea is strong and takes milk well. Steeping too long makes it bitter.'],
      ['Chai spices', 'Cardamom, cinnamon, cloves, ginger and black pepper.'],
    ],
    pantryQs: [
      mc('Which grind for cold brew?', 'Coarse, like breadcrumbs', ['Very fine, like powder', 'Whole beans', 'Medium-fine']),
      mc('Masala chai spices include…', 'Cardamom, cinnamon, cloves and ginger', ['Cumin and turmeric', 'Oregano and basil', 'Paprika and garlic']),
      tf('Cold brew is less acidic and bitter than hot coffee.', true),
    ],
    technique: [
      ['Cold extraction', 'Coffee steeped 12–18 hours in cold water, then diluted 1:1.'],
      ['Simmer spices, steep tea', 'Whole spices need a simmer; tea needs only 2–4 minutes before it turns bitter.'],
      ['Milk boils over', 'Milk foams up suddenly when it boils. Stay at the stove.'],
    ],
    techniqueQs: [
      num('Hours to steep cold brew, at least?', 12, 'hours', 0),
      mc('Your chai tastes bitter. Why?', 'The tea steeped too long', ['Too much milk', 'Not enough cinnamon', 'The water was cold']),
      mc('How do you avoid lumpy hot chocolate?', 'Whisk cocoa and sugar into a paste with a little milk first', ['Add cocoa to boiling milk', 'Use cold milk only', 'Do not stir']),
    ],
  },
  {
    group: 'day', id: 'cocktails', title: 'Cocktails and mocktails', glyph: '🍸', blurb: 'Four classics, with alcohol-free versions. For adults of legal drinking age (18 in Quebec).',
    pantry: [
      ['A starter bar', 'One white spirit (tequila, rum or vodka), one brown (rye or bourbon), triple sec, bitters, limes, lemons, simple syrup, soda water, lots of ice.'],
      ['Measure', 'A jigger keeps drinks balanced and consistent. 1 oz is about 30 ml.'],
      ['Drink responsibly', 'A standard drink in Canada has about 13.45 g of alcohol, about 1.5 oz (43 ml) of 40% spirit. Plan a ride home and alternate with water.'],
    ],
    pantryQs: [
      mc('The Caesar was invented in…', 'Calgary, Canada', ['Rome, Italy', 'New York, USA', 'Mexico City']),
      mc('A margarita is a classic “sour”. Its three parts are…', 'Spirit, citrus, sweet', ['Spirit, cream, egg', 'Wine, soda, fruit', 'Beer, tomato, spice']),
      mc('About how much is 1 oz?', '30 ml', ['5 ml', '100 ml', '250 ml']),
      tf('Most of the alcohol in a cocktail “cooks off” in the ice.', false, 'Ice only adds water; the alcohol is all still there.'),
    ],
    technique: [
      ['Shake vs stir', 'Shake drinks with citrus, juice or dairy. Stir drinks that are only spirits (like an old fashioned) to keep them clear and silky.'],
      ['Muddle gently', 'Press mint lightly to release oils. Shredding it makes it bitter.'],
      ['Dilution is an ingredient', 'Shaking or stirring with ice adds about 20–25% water, which softens the drink.'],
    ],
    techniqueQs: [
      mc('Shake or stir an old fashioned?', 'Stir', ['Shake hard', 'Blend', 'Neither, just pour']),
      mc('Shake or stir a margarita?', 'Shake, because it has citrus', ['Stir, because it has tequila', 'Blend only', 'Neither']),
      mc('How do you muddle mint?', 'Press gently a few times', ['Pound it into paste', 'Chop it finely first', 'Boil it']),
      match('Match the drink to its spirit', [['Margarita', 'Tequila'], ['Mojito', 'White rum'], ['Caesar', 'Vodka'], ['Old fashioned', 'Rye or bourbon']]),
    ],
  },
  // ───────────── new world branches ─────────────
  {
    id: 'french', title: 'French', glyph: '🥖', blurb: 'Butter, wine, herbs and the techniques every chef learns first.',
    pantry: [
      ['The core', 'Butter, shallots, garlic, Dijon mustard, dry white and red wine, fresh thyme and parsley, crème fraîche, gruyère, good bread.'],
      ['Herbes de Provence', 'A dried blend from the south (thyme, rosemary, savory, marjoram, sometimes lavender) for stews and roasts.'],
      ['Regions', 'Butter and cream in the north (Normandy, Burgundy); olive oil, tomatoes and herbs in Provence.'],
    ],
    pantryQs: [
      mc('Which onion is classic in French sauces?', 'Shallot', ['Red onion', 'Green onion', 'Leek only']),
      mc('Ratatouille comes from…', 'Provence', ['Normandy', 'Brittany', 'Alsace']),
      mc('Gruyère is a…', 'Nutty, melting Swiss-French cheese', ['Soft blue cheese', 'Goat cheese', 'Cream cheese']),
      mc('Quiche lorraine traditionally contains…', 'Bacon, eggs and cream', ['Spinach and feta', 'Tomato and basil', 'Salmon and dill']),
    ],
    technique: [
      ['Mise en place', 'French for “everything in its place”: prep all ingredients before you turn on the heat.'],
      ['Braising', 'Sear, deglaze with wine, then cook slowly covered in the oven, as in bœuf bourguignon.'],
      ['Blind baking', 'Pre-bake a pastry crust with weights so it stays crisp under a wet filling.'],
      ['Mother sauces', 'Béchamel (milk), velouté (stock), espagnole (brown stock), hollandaise (butter and egg) and tomato.'],
    ],
    techniqueQs: [
      mc('What does mise en place mean?', 'Everything prepped and in its place before cooking', ['A type of sauce', 'Plating food nicely', 'Cooking in the oven']),
      mc('Why blind-bake a quiche crust?', 'So the bottom stays crisp under the custard', ['To make it sweeter', 'To save time', 'So it rises']),
      mc('Which is a French mother sauce?', 'Béchamel', ['Pesto', 'Salsa verde', 'Teriyaki']),
      tf('Mussels that stay open when tapped before cooking should be thrown away.', true, 'They are dead and unsafe to eat.'),
    ],
  },
  {
    id: 'greek', title: 'Greek', glyph: '🫒', blurb: 'Olive oil, lemon, oregano, feta and sunshine.',
    pantry: [
      ['The core', 'Extra-virgin olive oil, lemons, dried oregano, feta, Greek yogurt, garlic, dill, kalamata olives, phyllo, orzo, beans.'],
      ['Ladera', 'Vegetables and beans slowly cooked in lots of olive oil and tomato, like gigantes plaki. Many are naturally vegan.'],
      ['Meze', 'Small plates to share: tzatziki, spanakopita, olives, grilled octopus, dolmades.'],
    ],
    pantryQs: [
      mc('A true horiatiki (village salad) has no…', 'Lettuce', ['Tomatoes', 'Feta', 'Olive oil']),
      mc('Tzatziki is made with…', 'Yogurt, cucumber, garlic and herbs', ['Tahini and chickpeas', 'Avocado and lime', 'Cream cheese and chives']),
      mc('Phyllo is…', 'Paper-thin pastry sheets', ['A cheese', 'A type of olive', 'A spice blend']),
      mc('Avgolemono means…', 'Egg-lemon', ['Lamb stew', 'Bean soup', 'Spinach pie']),
    ],
    technique: [
      ['Tempering', 'Slowly whisk hot broth into eggs so they thicken a soup instead of scrambling.'],
      ['Squeeze the water out', 'Grated cucumber for tzatziki and cooked spinach for spanakopita must be squeezed dry.'],
      ['Phyllo care', 'Keep sheets under a damp towel and brush every layer with oil or butter.'],
    ],
    techniqueQs: [
      mc('Why temper eggs for avgolemono?', 'So they thicken the soup without scrambling', ['To cook them faster', 'To make them fluffy', 'To remove the yolk']),
      mc('How do you stop phyllo from cracking?', 'Keep it covered with a damp towel', ['Freeze it', 'Microwave it', 'Wet each sheet with water']),
      mc('Why squeeze the cucumber for tzatziki?', 'To keep it thick, not watery', ['To remove bitterness only', 'To make it greener', 'Tradition only']),
    ],
  },
  {
    id: 'vietnamese', title: 'Vietnamese', glyph: '🍜', blurb: 'Fresh herbs, bright broths and the perfect sweet-sour-salty sauce.',
    pantry: [
      ['The core', 'Fish sauce, rice noodles and vermicelli, rice paper, limes, sugar, lemongrass, garlic, shallots, chilies, hoisin.'],
      ['Herbs, herbs, herbs', 'Mint, Thai basil, cilantro and perilla are served by the handful, not as garnish.'],
      ['Nước chấm', 'Fish sauce, lime, sugar, water, garlic and chili: the dipping sauce for nearly everything.'],
    ],
    pantryQs: [
      mc('Nước chấm balances…', 'Salty, sour, sweet and spicy', ['Only salty', 'Creamy and smoky', 'Bitter and sweet']),
      mc('Bánh mì bread shows which influence?', 'French', ['Japanese', 'Indian', 'American']),
      mc('Pho broth gets its aroma from…', 'Charred onion and ginger plus star anise and cinnamon', ['Curry paste', 'Tomato paste', 'Soy sauce alone']),
      tf('In Vietnamese food, fresh herbs are often eaten by the handful.', true),
    ],
    technique: [
      ['Char the aromatics', 'Blacken onion and ginger before simmering for a sweet, smoky broth.'],
      ['Quick pickles', 'Carrot and daikon in vinegar, sugar and salt for 20 minutes: đồ chua.'],
      ['Rice paper', 'Dip for about 5 seconds; it keeps softening as you fill it.'],
    ],
    techniqueQs: [
      mc('How long do you dip rice paper?', 'About 5 seconds', ['1 minute', 'Until fully floppy', 'You do not dip it']),
      mc('What are đồ chua?', 'Quick pickled carrot and daikon', ['Fried shallots', 'Rice noodles', 'Fish sauce']),
      mc('Why char onion and ginger for pho?', 'For a deeper, sweeter, smoky broth', ['To peel them easily', 'To kill bacteria', 'To make it spicy']),
    ],
  },
  {
    group: 'day', id: 'salads', title: 'Salads', glyph: '🥗', blurb: 'From side salads to salads that are dinner.',
    pantry: [
      ['A great salad formula', 'Greens or crunchy veg + protein + something creamy + something crunchy + a bright dressing.'],
      ['Dressings', 'Vinaigrette is 3 parts oil to 1 part acid with mustard to bind; creamy dressings use mayo, yogurt or tahini.'],
      ['Sturdy vs tender', 'Kale, cabbage, chickpeas and cucumbers last for days; tender lettuces should be dressed right before eating.'],
    ],
    pantryQs: [
      mc('Classic vinaigrette ratio?', '3 parts oil to 1 part acid', ['1 to 1', '1 part oil to 3 acid', 'All vinegar']),
      mc('What holds a vinaigrette together?', 'Mustard (an emulsifier)', ['Sugar', 'Water', 'Pepper']),
      mc('Which salad keeps best for lunches all week?', 'Chickpea salad', ['Dressed butter lettuce', 'Caesar with croutons', 'Caprese']),
      tf('Wet lettuce waters down the dressing and makes salads soggy.', true),
    ],
    technique: [
      ['Dry your greens', 'Use a salad spinner or towel; dressing will not cling to wet leaves.'],
      ['Massage kale', 'Rub kale with salt and acid for a minute to soften it.'],
      ['Season tomatoes last', 'Salt draws out their juice, so add it right before serving.'],
    ],
    techniqueQs: [
      mc('How do you soften raw kale?', 'Massage it with a little salt and acid', ['Freeze it', 'Boil it 10 minutes', 'Soak it in water']),
      mc('When should you dress a tender green salad?', 'Right before serving', ['The night before', 'An hour before', 'It does not matter']),
      mc('A Cobb salad is a good dinner because…', 'It has plenty of protein and healthy fat', ['It is low in everything', 'It has no vegetables', 'It is mostly bread']),
    ],
  },
  {
    group: 'diet', id: 'plants', title: 'Plant-based', glyph: '🌿', blurb: 'Vegan and vegetarian cooking that actually fills you up.',
    pantry: [
      ['Plant proteins', 'Lentils, chickpeas, beans, tofu, tempeh, edamame, quinoa, nuts, seeds and nutritional yeast.'],
      ['Umami without meat', 'Soy sauce, miso, mushrooms, tomato paste, nutritional yeast and roasted vegetables build savoury depth.'],
      ['Nutrients to watch', 'Vegans need B12 from fortified foods or a supplement. Pair plant iron with vitamin C. Get omega-3 from flax, chia, walnuts or algae oil.'],
    ],
    pantryQs: [
      mc('Which vitamin must vegans get from fortified foods or supplements?', 'B12', ['Vitamin C', 'Vitamin A', 'Vitamin K']),
      mc('What does nutritional yeast add?', 'A savoury, cheesy flavour plus B vitamins and protein', ['Sweetness', 'It makes bread rise', 'Sourness']),
      mc('Pairing lentils with tomatoes or lemon helps you absorb more…', 'Iron', ['Calcium', 'Fat', 'Sodium']),
      mc('Which is a complete plant protein?', 'Tofu', ['Rice', 'Carrots', 'Apples']),
    ],
    technique: [
      ['Press tofu', 'Wrap and weigh down firm tofu for 15 minutes so it browns instead of steaming.'],
      ['Flax egg', '1 tbsp ground flax + 3 tbsp water, rested 5 minutes, binds like one egg in burgers and baking.'],
      ['Dry beans for patties', 'Bake rinsed beans 15 minutes to dry them so burgers hold together.'],
    ],
    techniqueQs: [
      mc('What replaces one egg in vegan baking or burgers?', '1 tbsp ground flax + 3 tbsp water', ['A cup of milk', '1 tbsp sugar', '2 tbsp oil']),
      mc('Why press tofu before frying?', 'Removing water helps it brown and crisp', ['To make it softer', 'To add protein', 'To cook it']),
      tf('Lentils can replace ground meat in shepherd’s pie or ragù.', true),
    ],
  },
  {
    group: 'diet', id: 'seafood', title: 'Seafood', glyph: '🐟', blurb: 'Pescatarian cooking: fish and shellfish made easy.',
    pantry: [
      ['Easy fish to start', 'Salmon (forgiving and rich), cod or haddock (mild, flaky), shrimp (fast), canned tuna and sardines (cheap and handy).'],
      ['Health', 'Canada’s Food Guide encourages fish regularly; fatty fish like salmon, trout and sardines are rich in omega-3s.'],
      ['Mercury', 'Limit high-mercury fish like fresh or frozen tuna steaks, shark, swordfish and marlin, especially when pregnant.'],
    ],
    pantryQs: [
      mc('Which fish is richest in omega-3s?', 'Salmon', ['Cod', 'Tilapia', 'Haddock']),
      mc('Which fish should you limit because of mercury?', 'Swordfish', ['Salmon', 'Sardines', 'Trout']),
      mc('Fresh fish should smell…', 'Like clean sea water, not fishy', ['Strongly fishy', 'Like ammonia', 'Sweet']),
    ],
    technique: [
      ['Pat it dry', 'Dry fish browns and does not stick.'],
      ['Leave it alone', 'Fish releases from the pan once a crust forms; flip once.'],
      ['Doneness', 'Fish is done when it turns opaque and flakes easily. Shrimp curl into a C; an O means overcooked.'],
    ],
    techniqueQs: [
      mc('When is white fish done?', 'Opaque and flakes easily with a fork', ['When it is still translucent', 'After exactly 20 minutes', 'When it curls']),
      mc('Fish is sticking to the pan. What should you do?', 'Wait until it releases on its own', ['Scrape it hard', 'Add water', 'Flip it immediately']),
      num('Official safe internal temperature for fish, in °F?', 145, '°F'),
    ],
  },
]


function order3(): Question {
  return {
    t: 'order',
    q: 'Indian curry base: put the steps in order',
    items: ['Whole spices in hot oil', 'Onions until golden', 'Ginger and garlic', 'Ground spices', 'Tomatoes until the oil separates'],
  }
}

function chunk<T>(a: T[], n: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < a.length; i += n) out.push(a.slice(i, i + n))
  return out
}

export function buildCuisineBranches(recipes: Recipe[]): Branch[] {
  return cuisineSpecs.map((c) => {
    const dishes = recipes.filter((r) => r.cuisine === c.id)
    const dishLessons: Lesson[] = dishes.map((r) => ({
      id: `${c.id}-${r.id}`,
      title: r.title,
      recipeId: r.id,
      teach: [
        [r.title, r.short],
        ['What it teaches', `${r.skill}. ${r.why}`],
        ['Key ingredients', r.ingredients.filter((i) => !/water|salt|pepper$/.test(i.item)).slice(0, 7).map((i) => i.item).join(', ') + '.'],
      ],
      qs: () => recipeDrill(r, recipes),
    }))
    return {
      group: c.group ?? 'world',
      id: c.id,
      title: c.title,
      glyph: c.glyph,
      blurb: c.blurb,
      units: [
        {
          id: `${c.id}-basics`, title: 'Pantry and techniques', glyph: c.glyph, blurb: c.blurb,
          lessons: [
            { id: `${c.id}-pantry`, title: 'Pantry and flavours', teach: c.pantry, qs: c.pantryQs },
            { id: `${c.id}-technique`, title: 'Key techniques', teach: c.technique, qs: c.techniqueQs },
          ],
        },
        ...chunk(dishLessons, 4).map((lessons, k, all) => ({
          id: `${c.id}-dishes${k ? `-${k + 1}` : ''}`,
          title: all.length > 1 ? `Signature dishes ${['I', 'II', 'III', 'IV'][k]}` : 'Signature dishes',
          glyph: '🍽️',
          blurb: `Learn, memorise and cook ${lessons.length} classics.`,
          lessons,
        })),
      ],
    }
  })
}
