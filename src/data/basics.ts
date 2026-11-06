export interface BasicSection {
  id: string
  title: string
  intro: string
  points: { head: string; body: string }[]
}

export const basics: BasicSection[] = [
  {
    id: 'gear',
    title: 'The only gear you need',
    intro: 'Skip the gadget aisle. These six things cover every recipe in this app.',
    points: [
      { head: '8-inch chef’s knife', body: 'One decent knife beats a block of bad ones. A sharp knife is safer, because it goes where you aim instead of slipping.' },
      { head: 'Big cutting board', body: 'Bigger than you think. Put a damp paper towel underneath so it does not slide.' },
      { head: 'Large skillet', body: 'A 10 to 12 inch non-stick for eggs, plus stainless or cast iron later for searing.' },
      { head: 'Medium pot with a lid', body: 'Rice, pasta, soups and chili.' },
      { head: 'Sheet pan', body: 'A heavy rimmed one. Thin pans warp in a hot oven.' },
      { head: 'Instant-read thermometer', body: 'The cheapest way to stop worrying about undercooked chicken. Probably the most useful $20 you will spend on cooking.' },
    ],
  },
  {
    id: 'pantry',
    title: 'Stock the pantry once',
    intro: 'Buy these on your first shop. After that, a weeknight dinner only needs a few fresh things.',
    points: [
      { head: 'Fats', body: 'Olive oil for flavour, a neutral oil (canola) for high heat, butter in the fridge.' },
      { head: 'Salt and pepper', body: 'Kosher salt (Diamond Crystal or Windsor coarse) and a pepper grinder.' },
      { head: 'Aromatics', body: 'Onions and garlic. They keep for weeks somewhere cool and dark.' },
      { head: 'Cans and jars', body: 'Crushed tomatoes, tomato paste, beans, soy sauce, Dijon mustard, honey, rice vinegar.' },
      { head: 'Dry goods', body: 'Rice, pasta, cornstarch.' },
      { head: 'Five spices', body: 'Cumin, smoked paprika, chili powder, dried oregano, red pepper flakes, plus garlic powder.' },
    ],
  },
  {
    id: 'knife',
    title: 'Holding a knife',
    intro: 'Two habits that protect your fingers.',
    points: [
      { head: 'Pinch grip', body: 'Pinch the blade just in front of the handle between thumb and the side of your index finger. Wrap the other fingers around the handle. You get much more control.' },
      { head: 'The claw', body: 'On the hand holding the food, curl your fingertips under so your knuckles face the blade. The flat of the knife can rest against your knuckles as a guide.' },
      { head: 'Make it flat', body: 'Round things roll. Cut a thin slice off one side of an onion, potato or pepper so it sits flat before cutting the rest.' },
    ],
  },
  {
    id: 'heat',
    title: 'Reading heat',
    intro: 'Recipes say low, medium and high, but every stove is different. Learn the signs instead.',
    points: [
      { head: 'Low', body: 'Butter melts without sizzling. For gentle eggs and simmering.' },
      { head: 'Medium', body: 'A steady, cheerful sizzle when food goes in. For onions and most everyday cooking.' },
      { head: 'High', body: 'Oil shimmers and moves like water, and food hisses loudly. For searing and stir-frying.' },
      { head: 'Too hot', body: 'Oil smokes. Take the pan off the heat for 30 seconds, then carry on.' },
    ],
  },
  {
    id: 'season',
    title: 'Seasoning like you mean it',
    intro: 'Under-salting is the most common reason home cooking tastes flat.',
    points: [
      { head: 'Salt early and often', body: 'A little salt at each stage builds flavour better than a lot at the end.' },
      { head: 'Taste as you go', body: 'Keep a cup of clean spoons nearby. Taste, adjust, taste again.' },
      { head: 'Acid wakes things up', body: 'If something tastes heavy or dull and salt does not fix it, add a squeeze of lemon or a splash of vinegar.' },
    ],
  },
  {
    id: 'safety',
    title: 'Food safety, without the panic',
    intro: 'A few rules cover almost everything.',
    points: [
      { head: 'Raw meat stays separate', body: 'Use a separate board, or cut vegetables first and meat last. Wash hands and boards with hot soapy water after.' },
      { head: 'Temperatures', body: 'Chicken 165°F (74°C). Ground beef 160°F (71°C). The thermometer settles every argument.' },
      { head: 'The 2-hour rule', body: 'Get cooked food into the fridge within 2 hours. Most leftovers keep 3 to 4 days.' },
      { head: 'Do not rinse raw chicken', body: 'It just splashes bacteria around the sink. Pat it dry with paper towels instead.' },
    ],
  },
]
