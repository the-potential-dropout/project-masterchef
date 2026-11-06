import type { Aisle } from './types'

/**
 * Ingredient catalog: what you actually buy, what it costs, and what's in it.
 *
 * Prices are rough Montreal supermarket estimates in CAD (late 2026, regular prices
 * at Maxi / IGA / Metro). They are meant to be edited in the app to match your store.
 *
 * Nutrition is per 100 g (or 100 ml for thin liquids), from typical USDA / Canadian
 * Nutrient File values: [kcal, protein g, carbs g, fat g, sat fat g, fibre g, sodium mg].
 */
export type Base = 'g' | 'ml' | 'each'
export type Nutr = [kcal: number, protein: number, carbs: number, fat: number, satFat: number, fiber: number, sodium: number]

export interface CatalogItem {
  id: string
  name: string
  aisle: Aisle
  pantry?: boolean
  /** default price in CAD for one pack */
  price: number
  /** human description of one pack */
  pack: string
  /** how much one pack holds, in `base` units */
  amount: number
  base: Base
  /** g per ml, for converting spoons and cups to weight */
  d?: number
  /** grams per piece, for counted items */
  e?: number
  /** custom units, in base units, e.g. { head: 10 } for garlic counted in cloves */
  per?: Record<string, number>
  n: Nutr
  match: RegExp
}

type Opts = Pick<CatalogItem, 'd' | 'e' | 'per'>
const c = (
  id: string, name: string, aisle: Aisle, pantry: boolean, price: number, pack: string, amount: number, base: Base,
  opts: Opts, n: Nutr, match: RegExp,
): CatalogItem => ({ id, name, aisle, pantry: pantry || undefined, price, pack, amount, base, ...opts, n, match })

const SPICE: Nutr = [300, 12, 55, 10, 1.5, 30, 60]
const spice = (id: string, name: string, match: RegExp, n: Nutr = SPICE, price = 3.99) =>
  c(id, name, 'Spices', true, price, 'jar, about 60 g', 60, 'g', { d: 0.45, e: 0.2 }, n, match)

/** Order matters: the first match wins, so specific names come before general ones. */
export const catalog: CatalogItem[] = [
  // ── water: free, never on the list
  c('water', 'Water', 'Pantry', true, 0, 'tap', 1000, 'ml', { e: 30 }, [0, 0, 0, 0, 0, 0, 0], /^(ice |cold )?water\b|^ice\b|^ice cubes/),

  // ── spices and seasonings (before produce so "garlic powder" isn't garlic)
  c('salt', 'Kosher salt', 'Spices', true, 4.49, '1.36 kg box', 1360, 'g', { d: 0.56 }, [0, 0, 0, 0, 0, 0, 38758], /\b(kosher|coarse|flaky|fine) salt\b/),
  spice('celery-salt', 'Celery salt', /celery salt/, [0, 0, 0, 0, 0, 0, 30000]),
  c('pepper', 'Black pepper', 'Spices', true, 4.99, '100 g grinder', 100, 'g', { d: 0.46 }, [251, 10, 64, 3.3, 1.4, 25, 20], /black pepper/),
  spice('garlic-powder', 'Garlic powder', /garlic powder/, [331, 17, 73, 0.7, 0.2, 9, 60]),
  spice('onion-powder', 'Onion powder', /onion powder/, [341, 10, 79, 1, 0.2, 15, 73]),
  spice('smoked-paprika', 'Smoked paprika', /smoked paprika/, [282, 14, 54, 13, 2, 35, 68]),
  spice('paprika', 'Paprika', /paprika/, [282, 14, 54, 13, 2, 35, 68]),
  spice('chili-powder', 'Chili powder', /^chili powder/, [282, 13, 50, 14, 2.5, 35, 1640]),
  spice('cayenne', 'Cayenne', /cayenne/),
  spice('cumin-seeds', 'Cumin seeds', /cumin seeds/, [375, 18, 44, 22, 1.5, 11, 168]),
  spice('cumin', 'Ground cumin', /cumin/, [375, 18, 44, 22, 1.5, 11, 168]),
  spice('coriander', 'Ground coriander', /coriander/, [298, 12, 55, 18, 1, 42, 35]),
  spice('turmeric', 'Ground turmeric', /turmeric/, [312, 10, 67, 3.3, 1.8, 23, 27]),
  spice('garam-masala', 'Garam masala', /garam masala/),
  spice('curry-powder', 'Curry powder', /curry powder/, [325, 14, 56, 14, 2.3, 53, 52]),
  spice('oregano', 'Dried oregano', /oregano/, [265, 9, 69, 4.3, 1.6, 43, 25]),
  spice('thyme-dried', 'Dried thyme', /dried thyme/, [276, 9, 64, 7.4, 2.7, 37, 55]),
  spice('allspice', 'Ground allspice', /allspice/),
  spice('cinnamon', 'Ground cinnamon', /cinnamon/, [247, 4, 81, 1.2, 0.3, 53, 10]),
  spice('ground-ginger', 'Ground ginger', /ground ginger/),
  spice('mustard-powder', 'Mustard powder', /mustard powder/),
  spice('mustard-seeds', 'Mustard seeds', /mustard seeds/, [508, 26, 28, 36, 2, 12, 13]),
  spice('fenugreek', 'Dried fenugreek leaves (kasuri methi)', /fenugreek/),
  spice('sichuan', 'Sichuan peppercorns', /sichuan pepper/, SPICE, 5.99),
  spice('chili-flakes', 'Red pepper flakes', /red pepper flakes/),
  spice('gochugaru', 'Gochugaru (Korean chili flakes)', /gochugaru/, [300, 12, 50, 9, 1.5, 30, 30], 6.99),
  spice('bay', 'Bay leaves', /bay lea/),
  spice('nutmeg', 'Ground nutmeg', /nutmeg/),
  spice('cardamom', 'Green cardamom pods', /cardamom/, SPICE, 6.99),
  spice('whole-cloves', 'Whole cloves', /whole cloves/),
  c('dried-chilies', 'Dried red chilies', 'Spices', true, 2.99, '50 g bag', 50, 'g', { e: 0.5 }, [318, 12, 57, 17, 3, 27, 30], /dried red chil/),

  // ── eggs and dairy
  c('noodles', 'Egg noodles', 'Pantry', false, 2.99, '375 g bag', 375, 'g', { d: 0.25 }, [384, 14, 71, 4.4, 1, 3.3, 21], /noodles/),
  c('egg-yolks', 'Eggs (for yolks)', 'Meat & eggs', false, 4.79, 'dozen large', 12, 'each', { e: 17 }, [322, 16, 3.6, 26.5, 9.6, 0, 48], /egg yolks?/),
  c('eggs', 'Eggs', 'Meat & eggs', false, 4.79, 'dozen large', 12, 'each', { e: 50 }, [143, 12.6, 0.7, 9.5, 3.1, 0, 142], /\beggs?\b/),
  c('butter', 'Butter', 'Dairy', false, 6.49, '454 g block', 454, 'g', { d: 0.96 }, [717, 0.9, 0.1, 81, 51, 0, 576], /^(ghee or |cold )?butter$/),
  c('buttermilk', 'Buttermilk', 'Dairy', false, 2.99, '1 L carton', 1000, 'ml', { d: 1.03 }, [40, 3.3, 4.8, 0.9, 0.5, 0, 105], /buttermilk/),
  c('cream', 'Whipping cream 35%', 'Dairy', false, 4.49, '473 ml carton', 473, 'ml', {}, [340, 2.8, 2.7, 36, 23, 0, 27], /heavy cream/),
  c('milk', 'Milk 2%', 'Dairy', false, 5.49, '2 L carton', 2000, 'ml', { d: 1.03 }, [50, 3.3, 4.8, 2, 1.2, 0, 44], /^(cold )?milk/),
  c('greek-yogurt', 'Plain Greek yogurt 2%', 'Dairy', false, 5.99, '750 g tub', 750, 'g', { d: 1.05 }, [73, 10, 3.9, 1.9, 1.2, 0, 34], /greek yogurt/),
  c('yogurt', 'Plain yogurt', 'Dairy', false, 3.99, '750 g tub', 750, 'g', { d: 1.05 }, [61, 3.5, 4.7, 3.3, 2.1, 0, 46], /yogurt/),
  c('parmesan', 'Parmesan', 'Dairy', false, 9.99, '250 g wedge', 250, 'g', { d: 0.42 }, [392, 36, 3.2, 26, 17, 0, 1530], /parmesan/),
  c('pecorino', 'Pecorino romano', 'Dairy', false, 8.99, '200 g wedge', 200, 'g', { d: 0.42 }, [387, 32, 3.6, 27, 17, 0, 1200], /pecorino/),
  c('cheese-slices', 'Cheese slices', 'Dairy', false, 5.49, '24 slices', 24, 'each', { e: 17, per: { slice: 1 } }, [307, 16, 8, 23, 13, 0, 1300], /american or cheddar/),
  c('cheddar', 'Sharp cheddar', 'Dairy', false, 7.99, '400 g block', 400, 'g', { d: 0.47 }, [403, 23, 3.1, 33, 19, 0, 653], /cheddar/),
  c('feta', 'Queso fresco or feta', 'Dairy', false, 5.99, '200 g pack', 200, 'g', { d: 0.6 }, [264, 14, 4, 21, 15, 0, 917], /queso fresco|feta/),
  c('mayo', 'Mayonnaise', 'Pantry', true, 6.99, '890 ml jar', 890, 'ml', { d: 0.91 }, [680, 1, 0.6, 75, 12, 0, 635], /mayonnaise/),

  // ── meat and seafood
  c('chicken-thigh-bone', 'Chicken thighs, bone-in skin-on', 'Meat & eggs', false, 8.8, '1 kg tray', 1000, 'g', { e: 170 }, [180, 13, 0, 14, 4, 0, 60], /bone-in.*thigh/),
  c('chicken-thigh-skin', 'Chicken thighs, boneless skin-on', 'Meat & eggs', false, 14.99, '1 kg tray', 1000, 'g', { e: 130 }, [221, 15.6, 0, 17, 4.8, 0, 70], /boneless skin-on/),
  c('chicken-thigh', 'Chicken thighs, boneless skinless', 'Meat & eggs', false, 13.99, '1 kg tray', 1000, 'g', { e: 110 }, [121, 19.7, 0, 4.1, 1, 0, 86], /chicken thighs?/),
  c('chicken-breast', 'Chicken breasts, boneless skinless', 'Meat & eggs', false, 15.99, '1 kg tray', 1000, 'g', { e: 200 }, [120, 22.5, 0, 2.6, 0.6, 0, 45], /chicken breast/),
  c('whole-chicken', 'Whole chicken', 'Meat & eggs', false, 6.99, 'per kg', 1000, 'g', { e: 2000 }, [150, 13, 0, 10.5, 3, 0, 49], /whole chicken/),
  c('ground-chicken', 'Ground chicken', 'Meat & eggs', false, 7.99, '450 g pack', 450, 'g', {}, [143, 17.4, 0, 8.1, 2.3, 0, 60], /ground chicken/),
  c('ground-beef-lean', 'Lean ground beef', 'Meat & eggs', false, 7.49, '450 g pack', 450, 'g', {}, [217, 18.6, 0, 15, 6, 0, 66], /lean ground beef/),
  c('ground-beef', 'Ground beef (medium, 80/20)', 'Meat & eggs', false, 6.99, '450 g pack', 450, 'g', {}, [254, 17.2, 0, 20, 7.6, 0, 66], /ground beef/),
  c('ground-pork', 'Ground pork', 'Meat & eggs', false, 5.49, '450 g pack', 450, 'g', {}, [263, 16.9, 0, 21, 7.9, 0, 56], /ground pork/),
  c('guanciale', 'Guanciale or pancetta', 'Meat & eggs', false, 6.99, '150 g pack', 150, 'g', {}, [458, 14.5, 0, 44, 16, 0, 1500], /guanciale|pancetta/),
  c('bacon', 'Bacon', 'Meat & eggs', false, 6.49, '375 g pack', 375, 'g', { per: { slice: 25 } }, [400, 13, 1, 38, 13, 0, 1200], /bacon/),
  c('picanha', 'Picanha (top sirloin cap)', 'Meat & eggs', false, 29.99, 'per kg', 1000, 'g', {}, [240, 18, 0, 18, 7.5, 0, 55], /picanha/),
  c('ribeye', 'Ribeye or sirloin steak', 'Meat & eggs', false, 28, 'per kg', 1000, 'g', {}, [190, 20, 0, 12, 5, 0, 55], /ribeye/),
  c('flank', 'Flank or sirloin steak', 'Meat & eggs', false, 24.99, 'per kg', 1000, 'g', {}, [155, 21, 0, 7.7, 3, 0, 55], /flank|sirloin/),
  c('shrimp', 'Shrimp, raw, peeled (frozen)', 'Frozen', false, 9.99, '340 g bag', 340, 'g', {}, [85, 20, 0, 0.5, 0.1, 0, 400], /shrimp/),
  c('silken-tofu', 'Silken tofu', 'Produce', false, 2.49, '300 g pack', 300, 'g', {}, [55, 4.8, 2.9, 2.7, 0.4, 0.1, 5], /silken tofu/),
  c('tofu', 'Tofu (medium or firm)', 'Produce', false, 3.29, '454 g block', 454, 'g', {}, [76, 8, 1.9, 4.8, 0.7, 0.3, 7], /tofu/),

  // ── produce
  c('green-onion', 'Green onions', 'Produce', false, 1.29, 'bunch of about 7', 7, 'each', { e: 15, d: 0.3 }, [32, 1.8, 7.3, 0.2, 0, 2.6, 16], /green onion|chives/),
  c('red-onion', 'Red onions', 'Produce', false, 3.99, '1.36 kg bag (about 8)', 8, 'each', { e: 170 }, [40, 1.1, 9.3, 0.1, 0, 1.7, 4], /red onion/),
  c('shallot', 'Shallots', 'Produce', false, 0.6, 'each', 1, 'each', { e: 30 }, [72, 2.5, 17, 0.1, 0, 3.2, 12], /shallot/),
  c('onion', 'Yellow or white onions', 'Produce', true, 3.49, '1.36 kg bag (about 8)', 8, 'each', { e: 160 }, [40, 1.1, 9.3, 0.1, 0, 1.7, 4], /onion/),
  c('garlic-head', 'Garlic', 'Produce', true, 0.69, 'head', 1, 'each', { e: 40 }, [149, 6.4, 33, 0.5, 0.1, 2.1, 17], /head of garlic/),
  c('garlic', 'Garlic', 'Produce', true, 0.69, 'head (about 10 cloves)', 10, 'each', { e: 4, per: { head: 10 } }, [149, 6.4, 33, 0.5, 0.1, 2.1, 17], /garlic/),
  c('ginger', 'Fresh ginger', 'Produce', false, 1.1, 'knob, about 100 g', 100, 'g', { d: 0.4, per: { slice: 3 } }, [80, 1.8, 18, 0.8, 0.2, 2, 13], /ginger|galangal/),
  c('cherry-tomatoes', 'Cherry tomatoes', 'Produce', false, 3.99, '1 pint, about 300 g', 300, 'g', { per: { pint: 300 }, d: 0.62 }, [18, 0.9, 3.9, 0.2, 0, 1.2, 5], /cherry tomato/),
  c('tomato-paste', 'Tomato paste', 'Pantry', false, 1.29, '156 ml can', 156, 'g', { d: 1.1 }, [82, 4.3, 19, 0.5, 0.1, 4.1, 59], /tomato paste/),
  c('canned-tomatoes', 'Canned tomatoes', 'Pantry', true, 1.99, '796 ml (28 oz) can', 796, 'g', { per: { can: 796 } }, [32, 1.6, 7.3, 0.3, 0, 1.9, 180], /crushed tomatoes|diced tomatoes|tomato puree/),
  c('tomato', 'Tomatoes', 'Produce', false, 4.39, 'per kg (about 9)', 1000, 'g', { e: 110 }, [18, 0.9, 3.9, 0.2, 0, 1.2, 5], /tomato/),
  c('potatoes-yukon', 'Yukon gold potatoes', 'Produce', false, 4.49, '2.27 kg bag', 2270, 'g', {}, [77, 2, 17, 0.1, 0, 2.2, 6], /yukon|russet/),
  c('potatoes', 'Baby potatoes', 'Produce', false, 3.99, '680 g bag', 680, 'g', {}, [77, 2, 17, 0.1, 0, 2.2, 6], /baby potato/),
  c('sweet-potato', 'Sweet potatoes', 'Produce', false, 3.29, 'per kg', 1000, 'g', { e: 300 }, [86, 1.6, 20, 0.1, 0, 3, 55], /sweet potato/),
  c('broccoli', 'Broccoli', 'Produce', false, 2.99, 'head, about 450 g', 450, 'g', { e: 450, d: 0.38, per: { head: 450 } }, [34, 2.8, 6.6, 0.4, 0, 2.6, 33], /broccoli/),
  c('frozen-veg', 'Frozen peas and carrots', 'Frozen', false, 3.49, '750 g bag', 750, 'g', { d: 0.6 }, [53, 3.1, 10, 0.4, 0, 3.4, 79], /frozen peas/),
  c('carrots', 'Carrots', 'Produce', false, 2.49, '907 g bag', 907, 'g', { e: 60 }, [41, 0.9, 9.6, 0.2, 0, 2.8, 69], /carrot/),
  c('celery', 'Celery', 'Produce', false, 2.99, 'bunch (about 9 stalks)', 9, 'each', { e: 40, per: { stalk: 1 } }, [14, 0.7, 3, 0.2, 0, 1.6, 80], /celery/),
  c('lemongrass', 'Lemongrass', 'Produce', false, 2.49, 'pack of 3 stalks', 3, 'each', { e: 20, per: { stalk: 1 } }, [0, 0, 0, 0, 0, 0, 0], /lemongrass/),
  c('red-pepper', 'Red bell peppers', 'Produce', false, 1.79, 'each', 1, 'each', { e: 160 }, [31, 1, 6, 0.3, 0, 2.1, 4], /red bell pepper/),
  c('green-pepper', 'Green bell peppers', 'Produce', false, 1.29, 'each', 1, 'each', { e: 160 }, [20, 0.9, 4.6, 0.2, 0, 1.7, 3], /green bell pepper/),
  c('chili', 'Fresh chilies', 'Produce', false, 0.25, 'each', 1, 'each', { e: 10 }, [40, 1.9, 9, 0.4, 0, 1.5, 7], /jalape|green chili|bird chil|scotch bonnet/),
  c('chipotle', 'Chipotle peppers in adobo', 'Pantry', false, 2.49, '198 ml can (about 8 peppers)', 8, 'each', { e: 15 }, [100, 1.5, 10, 5, 0.5, 4, 1100], /chipotle/),
  c('zucchini', 'Zucchini', 'Produce', false, 3.99, 'per kg', 1000, 'g', { e: 200 }, [17, 1.2, 3.1, 0.3, 0, 1, 8], /zucchini/),
  c('eggplant', 'Japanese eggplant', 'Produce', false, 1.49, 'each', 1, 'each', { e: 200 }, [25, 1, 6, 0.2, 0, 3, 2], /eggplant/),
  c('mushrooms', 'Mushrooms', 'Produce', false, 2.99, '227 g box', 227, 'g', {}, [22, 3.1, 3.3, 0.3, 0, 1, 5], /mushroom/),
  c('snap-peas', 'Snap peas', 'Produce', false, 3.99, '227 g bag', 227, 'g', { d: 0.4 }, [42, 2.8, 7.6, 0.2, 0, 2.6, 4], /snap peas/),
  c('greens', 'Kale or spinach', 'Produce', false, 3.99, '284 g bag', 284, 'g', { d: 0.13 }, [23, 2.9, 3.6, 0.4, 0.1, 2.2, 79], /kale|spinach/),
  c('salad-greens', 'Mixed salad greens', 'Produce', false, 5.99, '312 g tub', 312, 'g', { per: { 'large tub': 312 } }, [17, 1.4, 3, 0.2, 0, 1.8, 30], /salad greens/),
  c('lettuce', 'Romaine lettuce', 'Produce', false, 2.99, 'head, about 600 g', 600, 'g', { e: 15, d: 0.2 }, [17, 1.2, 3.3, 0.3, 0, 2.1, 8], /lettuce/),
  c('cucumber', 'English cucumbers', 'Produce', false, 1.49, 'each', 1, 'each', { e: 300 }, [15, 0.7, 3.6, 0.1, 0, 0.5, 2], /cucumber/),
  c('avocado', 'Avocados', 'Produce', false, 1.69, 'each', 1, 'each', { e: 150 }, [160, 2, 8.5, 14.7, 2.1, 6.7, 7], /avocado/),
  c('lemon', 'Lemons', 'Produce', false, 0.89, 'each', 1, 'each', { e: 48 }, [22, 0.4, 6.9, 0.2, 0, 0.3, 1], /lemon/),
  c('makrut', 'Makrut lime leaves', 'Produce', false, 2.99, 'pack of about 20', 20, 'each', { e: 0.2 }, [0, 0, 0, 0, 0, 0, 0], /makrut/),
  c('lime', 'Limes', 'Produce', false, 0.59, 'each', 1, 'each', { e: 30 }, [25, 0.4, 8.4, 0.1, 0, 0.4, 2], /lime/),
  c('parsley', 'Flat-leaf parsley', 'Produce', false, 1.79, 'bunch, about 60 g', 60, 'g', { d: 0.25, per: { bunch: 60 } }, [36, 3, 6.3, 0.8, 0.1, 3.3, 56], /parsley/),
  c('cilantro', 'Cilantro', 'Produce', false, 1.49, 'bunch, about 50 g', 50, 'g', { d: 0.27, per: { bunch: 50 } }, [23, 2.1, 3.7, 0.5, 0, 2.8, 46], /cilantro/),
  c('basil', 'Fresh basil', 'Produce', false, 2.99, '21 g pack', 21, 'g', { d: 0.1, e: 0.5, per: { handful: 10 } }, [23, 3.2, 2.7, 0.6, 0, 1.6, 4], /basil/),
  c('mint', 'Fresh mint', 'Produce', false, 1.99, 'bunch, about 40 g', 40, 'g', { e: 0.5, per: { bunch: 40, handful: 10 } }, [70, 3.8, 15, 0.9, 0.2, 8, 31], /mint/),
  c('herbs', 'Fresh thyme or rosemary', 'Produce', false, 2.99, 'bunch', 1, 'each', { e: 5, per: { bunch: 1 } }, [101, 5.6, 24, 1.7, 0.5, 14, 9], /thyme or rosemary/),
  c('asian-pear', 'Asian pear', 'Produce', false, 2.49, 'each', 1, 'each', { e: 250 }, [42, 0.5, 10.7, 0.2, 0, 3.6, 0], /pear/),
  c('berries', 'Berries', 'Produce', false, 4.99, '311 g box', 311, 'g', { d: 0.6 }, [57, 0.7, 14.5, 0.3, 0, 2.4, 1], /berries/),

  // ── grains, pasta, legumes
  c('cooked-rice', 'Rice (cooked from dry)', 'Pantry', true, 6.99, '2 kg bag uncooked (about 5 kg cooked)', 5100, 'g', { d: 0.67 }, [130, 2.7, 28, 0.3, 0.1, 0.4, 1], /^cooked .*rice|^cooked rice/),
  c('arborio', 'Arborio rice', 'Pantry', false, 5.99, '1 kg bag', 1000, 'g', { d: 0.85 }, [360, 6.5, 79, 0.6, 0.2, 1, 1], /arborio/),
  c('parboiled-rice', 'Long-grain parboiled rice', 'Pantry', false, 5.99, '2 kg bag', 2000, 'g', { d: 0.78 }, [374, 7.5, 81, 1, 0.3, 1.7, 5], /parboiled/),
  c('rice', 'Jasmine or long-grain rice', 'Pantry', true, 6.99, '2 kg bag', 2000, 'g', { d: 0.78 }, [365, 7, 80, 0.7, 0.2, 1.3, 5], /rice\b(?! vinegar)/),
  c('pasta', 'Dry pasta', 'Pantry', true, 2.99, '900 g box', 900, 'g', { d: 0.53 }, [371, 13, 75, 1.5, 0.3, 3.2, 6], /spaghetti|linguine|macaroni|small pasta/),
  c('bulgur', 'Fine bulgur', 'Pantry', false, 3.99, '907 g bag', 907, 'g', { d: 0.6 }, [342, 12, 76, 1.3, 0.2, 12.5, 17], /bulgur/),
  c('red-lentils', 'Red lentils', 'Pantry', false, 3.49, '900 g bag', 900, 'g', { d: 0.81 }, [358, 24, 63, 2.2, 0.4, 10.8, 7], /lentils/),
  c('chickpeas', 'Canned chickpeas', 'Pantry', false, 1.49, '540 ml can', 1, 'each', { e: 250, per: { can: 1 } }, [139, 7.1, 22, 2.4, 0.3, 6.4, 240], /chickpeas/),
  c('beans', 'Canned beans', 'Pantry', false, 1.49, '540 ml can', 1, 'each', { e: 250, per: { can: 1 } }, [114, 7.6, 20, 0.4, 0.1, 6.2, 240], /^(?!fermented).*beans/),
  c('flour-cassava', 'Cassava flour (farinha de mandioca)', 'Pantry', false, 4.49, '500 g bag', 500, 'g', { d: 0.6 }, [365, 1.6, 88, 0.3, 0.1, 6.5, 10], /cassava/),
  c('flour', 'All-purpose flour', 'Pantry', true, 4.99, '2.5 kg bag', 2500, 'g', { d: 0.53 }, [364, 10, 76, 1, 0.2, 2.7, 2], /flour/),
  c('cornstarch', 'Cornstarch', 'Pantry', true, 2.79, '454 g box', 454, 'g', { d: 0.53 }, [381, 0.3, 91, 0.1, 0, 0.9, 9], /cornstarch/),
  c('baking-powder', 'Baking powder', 'Pantry', true, 3.99, '225 g can', 225, 'g', { d: 0.9 }, [53, 0, 28, 0, 0, 0.2, 10600], /baking powder/),
  c('baking-soda', 'Baking soda', 'Pantry', true, 1.99, '500 g box', 500, 'g', { d: 0.93 }, [0, 0, 0, 0, 0, 0, 27360], /baking soda/),

  // ── oils, sauces, condiments
  c('olive-oil', 'Olive oil', 'Pantry', true, 13.99, '1 L bottle', 1000, 'ml', { d: 0.91 }, [884, 0, 0, 100, 14, 0, 2], /olive oil/),
  c('sesame-oil', 'Toasted sesame oil', 'Pantry', false, 4.99, '250 ml bottle', 250, 'ml', { d: 0.92 }, [884, 0, 0, 100, 14, 0, 0], /sesame oil/),
  c('neutral-oil', 'Canola oil', 'Pantry', true, 6.49, '1.89 L bottle', 1890, 'ml', { d: 0.92 }, [884, 0, 0, 100, 7.4, 0, 0], /neutral oil/),
  c('brown-sugar', 'Brown sugar', 'Pantry', true, 2.99, '1 kg bag', 1000, 'g', { d: 0.9 }, [380, 0.1, 98, 0, 0, 0, 28], /brown sugar/),
  c('sugar', 'White sugar', 'Pantry', true, 3.49, '2 kg bag', 2000, 'g', { d: 0.85 }, [387, 0, 100, 0, 0, 0, 1], /sugar/),
  c('honey', 'Honey', 'Pantry', true, 6.99, '500 g jar', 500, 'g', { d: 1.42 }, [304, 0.3, 82, 0, 0, 0.2, 4], /honey/),
  c('maple', 'Maple syrup', 'Pantry', false, 9.99, '540 ml can', 540, 'ml', { d: 1.32 }, [260, 0, 67, 0.1, 0, 0, 12], /maple/),
  c('soy-sauce', 'Soy sauce', 'Pantry', true, 4.99, '591 ml bottle', 591, 'ml', {}, [53, 8, 4.9, 0.6, 0.1, 0.8, 6000], /soy sauce/),
  c('fish-sauce', 'Fish sauce', 'Pantry', false, 3.49, '200 ml bottle', 200, 'ml', {}, [35, 5, 3.6, 0, 0, 0, 9000], /fish sauce/),
  c('oyster-sauce', 'Oyster sauce', 'Pantry', false, 3.49, '255 ml bottle', 255, 'ml', {}, [51, 1.4, 11, 0.3, 0, 0.3, 3300], /oyster sauce/),
  c('shaoxing', 'Shaoxing wine', 'Pantry', false, 4.99, '750 ml bottle', 750, 'ml', {}, [100, 1, 4, 0, 0, 0, 1300], /shaoxing/),
  c('sake', 'Sake', 'Pantry', false, 14.99, '720 ml bottle', 720, 'ml', {}, [134, 0.5, 5, 0, 0, 0, 2], /sake/),
  c('mirin', 'Mirin', 'Pantry', false, 3.99, '300 ml bottle', 300, 'ml', {}, [241, 0.2, 43, 0, 0, 0, 10], /mirin/),
  c('white-wine', 'Dry white wine', 'Pantry', false, 13.99, '750 ml bottle', 750, 'ml', {}, [82, 0.1, 2.6, 0, 0, 0, 5], /white wine\b(?! vinegar)/),
  c('rice-vinegar', 'Rice vinegar', 'Pantry', false, 2.99, '355 ml bottle', 355, 'ml', {}, [18, 0, 0, 0, 0, 0, 0], /rice vinegar/),
  c('black-vinegar', 'Chinkiang black vinegar', 'Pantry', false, 3.99, '550 ml bottle', 550, 'ml', {}, [30, 1, 6, 0, 0, 0, 300], /black vinegar/),
  c('wine-vinegar', 'White wine vinegar', 'Pantry', false, 3.49, '500 ml bottle', 500, 'ml', {}, [19, 0, 0.3, 0, 0, 0, 8], /wine vinegar/),
  c('ketchup', 'Ketchup', 'Pantry', true, 4.99, '1 L bottle', 1000, 'ml', { d: 1.15 }, [101, 1, 27, 0.1, 0, 0.3, 900], /ketchup/),
  c('dijon', 'Dijon mustard', 'Pantry', true, 2.99, '250 ml jar', 250, 'ml', {}, [66, 4, 6, 4, 0.2, 3, 1100], /dijon/),
  c('pickles', 'Dill pickles', 'Pantry', false, 3.99, '1 L jar', 1000, 'ml', { d: 0.9 }, [12, 0.3, 2.3, 0.2, 0, 1, 1200], /pickle/),
  c('peanut-butter', 'Natural peanut butter', 'Pantry', false, 6.99, '1 kg jar', 1000, 'g', { d: 1.08 }, [588, 25, 20, 50, 10, 6, 17], /peanut butter/),
  c('peanuts', 'Roasted peanuts', 'Pantry', false, 4.99, '600 g jar', 600, 'g', { d: 0.6 }, [585, 24, 21, 50, 7, 8, 230], /peanuts/),
  c('tahini', 'Tahini', 'Pantry', false, 6.99, '500 g jar', 500, 'g', { d: 1.0 }, [595, 17, 21, 54, 7.5, 9.3, 115], /tahini/),
  c('sesame-seeds', 'Sesame seeds', 'Spices', false, 3.49, '200 g bag', 200, 'g', { d: 0.6 }, [573, 18, 23, 50, 7, 12, 11], /sesame seeds/),
  c('miso', 'Miso paste', 'Pantry', false, 6.99, '500 g tub', 500, 'g', { d: 1.15 }, [198, 12, 26, 6, 1, 5.4, 3728], /miso/),
  c('doubanjiang', 'Doubanjiang (chili bean paste)', 'Pantry', false, 4.99, '500 g jar', 500, 'g', { d: 1.1 }, [180, 8, 20, 8, 1, 5, 6000], /doubanjiang/),
  c('black-beans-fermented', 'Fermented black beans', 'Pantry', false, 2.99, '250 g bag', 250, 'g', { d: 0.6 }, [200, 13, 20, 7, 1, 5, 4000], /fermented black beans/),
  c('gochujang', 'Gochujang', 'Pantry', false, 6.99, '500 g tub', 500, 'g', { d: 1.2 }, [240, 5, 45, 2, 0.3, 4, 2400], /gochujang/),
  c('kimchi', 'Kimchi', 'Produce', false, 7.99, '500 g jar', 500, 'g', { d: 0.65 }, [15, 1.1, 2.4, 0.5, 0, 1.6, 500], /kimchi/),
  c('curry-paste', 'Thai curry paste', 'Pantry', false, 3.49, '114 g jar', 114, 'g', { d: 1.0 }, [110, 2, 12, 5, 1, 4, 2900], /curry paste/),
  c('nam-prik-pao', 'Thai chili paste (nam prik pao)', 'Pantry', false, 4.49, '227 g jar', 227, 'g', { d: 1.1 }, [300, 4, 40, 15, 2, 3, 1500], /nam prik pao/),
  c('coconut-milk', 'Coconut milk', 'Pantry', false, 2.49, '400 ml can', 400, 'ml', { d: 0.98, per: { can: 400 } }, [197, 2, 2.8, 21, 18.9, 0, 13], /coconut milk/),
  c('broth', 'Broth (chicken or vegetable)', 'Pantry', true, 2.99, '900 ml carton', 900, 'ml', {}, [6, 0.6, 0.4, 0.2, 0, 0, 250], /broth/),
  c('dashi', 'Dashi (instant powder)', 'Pantry', false, 4.99, '50 g box (makes about 5 L)', 5000, 'ml', {}, [2, 0.3, 0, 0, 0, 0, 150], /^dashi/),
  c('kombu', 'Kombu', 'Pantry', false, 4.99, '50 g bag (about 5 pieces)', 5, 'each', { e: 10, per: { piece: 1 } }, [0, 0, 0, 0, 0, 0, 0], /kombu/),
  c('bonito', 'Bonito flakes', 'Pantry', false, 5.99, '30 g bag', 30, 'g', { d: 0.04 }, [0, 0, 0, 0, 0, 0, 0], /bonito/),
  c('wakame', 'Dried wakame', 'Pantry', false, 4.99, '50 g bag', 50, 'g', { d: 0.13 }, [200, 15, 40, 3, 0.5, 35, 6000], /wakame/),
  c('nori', 'Roasted seaweed sheets', 'Pantry', false, 2.99, '10 sheets', 10, 'each', { e: 2.5, per: { sheet: 1 } }, [300, 40, 40, 3, 0.5, 30, 500], /seaweed/),

  // ── breakfast, baking, desserts
  c('oats', 'Rolled oats', 'Pantry', true, 4.49, '1 kg bag', 1000, 'g', { d: 0.38 }, [379, 13, 68, 6.5, 1.1, 10, 6], /oats/),
  c('chia', 'Chia seeds', 'Pantry', false, 6.99, '300 g bag', 300, 'g', { d: 0.65 }, [486, 17, 42, 31, 3.3, 34, 16], /chia/),
  c('vanilla', 'Vanilla extract', 'Spices', true, 6.99, '43 ml bottle', 43, 'ml', { d: 0.88 }, [288, 0, 13, 0, 0, 0, 9], /vanilla/),
  c('choc-chips', 'Chocolate chips', 'Pantry', false, 4.49, '300 g bag', 300, 'g', { d: 0.7 }, [480, 4.2, 63, 24, 15, 6, 10], /chocolate chips/),
  c('dark-choc', 'Dark chocolate 70%', 'Pantry', false, 3.49, '100 g bar', 100, 'g', {}, [598, 7.8, 46, 43, 24, 11, 20], /dark chocolate/),
  c('cocoa', 'Cocoa powder', 'Pantry', false, 5.49, '227 g can', 227, 'g', { d: 0.36 }, [228, 20, 58, 14, 8, 37, 21], /cocoa/),
  c('gelatin', 'Powdered gelatin', 'Pantry', false, 3.49, '4 envelopes (28 g)', 28, 'g', { d: 0.63, per: { envelope: 7 } }, [335, 86, 0, 0, 0, 0, 196], /gelatin/),
  c('banana', 'Bananas', 'Produce', false, 0.3, 'each', 1, 'each', { e: 118 }, [89, 1.1, 23, 0.3, 0.1, 2.6, 1], /banana/),
  c('apples', 'Apples', 'Produce', false, 0.75, 'each', 1, 'each', { e: 180 }, [52, 0.3, 14, 0.2, 0, 2.4, 1], /apples?\b/),
  c('mango', 'Frozen mango', 'Frozen', false, 4.99, '600 g bag', 600, 'g', { d: 0.6 }, [60, 0.8, 15, 0.4, 0.1, 1.6, 1], /mango/),
  c('oranges', 'Oranges', 'Produce', false, 0.89, 'each', 1, 'each', { e: 130 }, [47, 0.9, 12, 0.1, 0, 2.4, 0], /orange(s)?\b(?! juice)/),
  c('watermelon', 'Watermelon', 'Produce', false, 1.49, 'per kg', 1000, 'g', { d: 0.65 }, [30, 0.6, 7.6, 0.2, 0, 0.4, 1], /watermelon/),
  c('butternut', 'Butternut squash', 'Produce', false, 2.49, 'per kg', 1000, 'g', { e: 1100 }, [45, 1, 12, 0.1, 0, 2, 4], /butternut/),
  c('gruyere', 'Gruyère', 'Dairy', false, 8.99, '200 g wedge', 200, 'g', { d: 0.42 }, [413, 30, 0.4, 32, 19, 0, 336], /gruy/),
  c('clam-juice', 'Clam juice', 'Pantry', false, 3.99, '240 ml bottle', 240, 'ml', {}, [2, 0.4, 0.1, 0, 0, 0, 400], /clam juice/),
  c('clams', 'Canned baby clams', 'Pantry', false, 3.49, '142 g can', 142, 'g', { per: { can: 142 } }, [148, 25.5, 5.1, 2, 0.2, 0, 112], /clams/),
  c('popcorn', 'Popcorn kernels', 'Pantry', false, 3.49, '900 g bag', 900, 'g', { d: 0.8 }, [375, 11, 74, 4.5, 0.6, 15, 8], /popcorn/),
  c('corn', 'Frozen corn kernels', 'Frozen', false, 2.99, '750 g bag', 750, 'g', { d: 0.6 }, [86, 3.3, 19, 1.4, 0.3, 2, 15], /corn kernels/),
  c('edamame', 'Frozen edamame in pods', 'Frozen', false, 3.99, '500 g bag', 500, 'g', {}, [60, 6, 4.5, 2.5, 0.3, 2.5, 3], /edamame/),
  c('balsamic', 'Balsamic vinegar', 'Pantry', false, 6.99, '500 ml bottle', 500, 'ml', {}, [88, 0.5, 17, 0, 0, 0, 23], /balsamic/),
  c('pumpkin-seeds', 'Pumpkin seeds', 'Pantry', false, 4.99, '200 g bag', 200, 'g', { d: 0.55 }, [559, 30, 11, 49, 8.7, 6, 7], /pumpkin seeds/),

  // ── drinks and bar
  c('tea', 'Black tea', 'Pantry', false, 5.99, '72 bags or 200 g loose', 200, 'g', { d: 0.4, e: 2.5 }, [0, 0, 0, 0, 0, 0, 0], /\btea\b/),
  c('coffee', 'Ground coffee', 'Pantry', false, 12.99, '340 g bag', 340, 'g', { d: 0.36 }, [0, 0, 0, 0, 0, 0, 0], /coffee/),
  c('simple-syrup', 'Simple syrup (homemade)', 'Pantry', true, 0.5, '250 ml, made from sugar', 250, 'ml', { d: 1.3 }, [260, 0, 67, 0, 0, 0, 1], /simple syrup/),
  c('soda', 'Soda water', 'Pantry', false, 1.49, '1 L bottle', 1000, 'ml', {}, [0, 0, 0, 0, 0, 0, 20], /soda water|club soda/),
  c('clamato', 'Clamato juice', 'Pantry', false, 5.49, '1.89 L bottle', 1890, 'ml', {}, [24, 0.4, 6, 0, 0, 0, 320], /clamato/),
  c('worcestershire', 'Worcestershire sauce', 'Pantry', false, 3.99, '284 ml bottle', 284, 'ml', { per: { dash: 0.8 } }, [78, 0, 19, 0, 0, 0, 1000], /worcestershire/),
  c('hot-sauce', 'Hot sauce', 'Pantry', false, 3.99, '148 ml bottle', 148, 'ml', { per: { dash: 0.8 } }, [12, 0.5, 1.8, 0.4, 0, 0.3, 2600], /hot sauce/),
  c('bitters', 'Angostura bitters (SAQ)', 'Pantry', false, 16.95, '200 ml bottle', 200, 'ml', { per: { dash: 0.8 } }, [0, 0, 0, 0, 0, 0, 0], /bitters/),
  c('tequila', 'Tequila blanco (SAQ)', 'Pantry', false, 33.25, '750 ml bottle', 750, 'ml', {}, [231, 0, 0, 0, 0, 0, 0], /tequila/),
  c('triple-sec', 'Triple sec or Cointreau (SAQ)', 'Pantry', false, 24.95, '750 ml bottle', 750, 'ml', {}, [330, 0, 30, 0, 0, 0, 0], /triple sec|cointreau/),
  c('rum', 'White rum (SAQ)', 'Pantry', false, 28.75, '750 ml bottle', 750, 'ml', {}, [231, 0, 0, 0, 0, 0, 0], /\brum\b/),
  c('vodka', 'Vodka (SAQ)', 'Pantry', false, 28.75, '750 ml bottle', 750, 'ml', {}, [231, 0, 0, 0, 0, 0, 0], /vodka/),
  c('whisky', 'Rye or bourbon (SAQ)', 'Pantry', false, 30.95, '750 ml bottle', 750, 'ml', {}, [250, 0, 0, 0, 0, 0, 0], /\brye\b|bourbon|whisk/),

  // ── bakery
  c('bread', 'Sourdough loaf', 'Bakery', false, 4.99, '675 g loaf', 675, 'g', { per: { slice: 40 } }, [274, 10.8, 51, 3, 0.6, 2.4, 580], /good bread|\bbread\b|sourdough/),
  c('baguette', 'Baguette', 'Bakery', false, 3.49, 'each', 1, 'each', { e: 250 }, [274, 11, 52, 2.5, 0.5, 2.3, 590], /baguette/),
  c('pita', 'Pita bread', 'Bakery', false, 2.99, 'pack of 6', 6, 'each', { e: 60 }, [275, 9, 56, 1.2, 0.2, 2.2, 536], /pita/),
  c('buns', 'Burger buns', 'Bakery', false, 3.49, 'pack of 8', 8, 'each', { e: 55 }, [279, 9, 50, 4, 1, 2, 480], /buns/),
  c('tortillas', 'Corn tortillas', 'Bakery', false, 4.49, 'pack of 30', 30, 'each', { e: 24 }, [218, 5.7, 45, 2.9, 0.4, 6.3, 45], /tortillas/),
  c('chips', 'Tortilla chips', 'Pantry', false, 3.99, '300 g bag', 300, 'g', { e: 300 }, [489, 7, 64, 23, 3, 5, 350], /tortilla chips/),
]

export const catalogById = new Map(catalog.map((c) => [c.id, c]))

export function findCatalog(item: string): CatalogItem | undefined {
  const s = item.toLowerCase()
  return catalog.find((c) => c.match.test(s))
}
