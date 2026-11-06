import { mc, tf, match, type Branch, type Lesson, type Question } from './courseTypes'
import type { Recipe } from './types'
import { recipeDrill } from '../lib/generate'

interface CuisineSpec {
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
]

function order3(): Question {
  return {
    t: 'order',
    q: 'Indian curry base: put the steps in order',
    items: ['Whole spices in hot oil', 'Onions until golden', 'Ginger and garlic', 'Ground spices', 'Tomatoes until the oil separates'],
  }
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
        { id: `${c.id}-dishes`, title: 'Signature dishes', glyph: '🍽️', blurb: `Learn, memorise and cook ${dishes.length} classics.`, lessons: dishLessons },
      ],
    }
  })
}
