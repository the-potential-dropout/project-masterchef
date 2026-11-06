import type { Macros } from '../lib/nutrition'

/** Everyday add-ons for the day builder, per typical portion. */
export interface QuickFood {
  id: string
  name: string
  portion: string
  m: Macros
  tags: string[]
}

const q = (id: string, name: string, portion: string, kcal: number, protein: number, carbs: number, fat: number, satFat: number, fiber: number, sodium: number, tags: string[] = []): QuickFood =>
  ({ id, name, portion, m: { kcal, protein, carbs, fat, satFat, fiber, sodium }, tags })

export const quickFoods: QuickFood[] = [
  q('oats', 'Oatmeal with milk', '½ cup oats + 1 cup milk', 280, 13, 40, 8, 3, 4, 110, ['dairy', 'gluten']),
  q('greek-yogurt', 'Greek yogurt with berries', '¾ cup yogurt + ½ cup berries', 170, 18, 18, 3, 2, 2, 60, ['dairy']),
  q('banana', 'Banana', '1 medium', 105, 1.3, 27, 0.4, 0.1, 3.1, 1, ['vegan']),
  q('apple', 'Apple', '1 medium', 95, 0.5, 25, 0.3, 0, 4.4, 2, ['vegan']),
  q('orange', 'Orange', '1 medium', 62, 1.2, 15, 0.2, 0, 3.1, 0, ['vegan']),
  q('berries', 'Berries', '1 cup', 85, 1, 21, 0.5, 0, 3.6, 1, ['vegan']),
  q('boiled-eggs', 'Hard-boiled eggs', '2 large', 155, 12.6, 1.1, 10.6, 3.3, 0, 124, ['egg']),
  q('pb-toast', 'Peanut butter toast', '1 slice whole wheat + 1 tbsp PB', 175, 7.5, 16, 9.5, 1.8, 3, 160, ['gluten', 'peanuts', 'vegan']),
  q('almonds', 'Almonds', '¼ cup (35 g)', 205, 7.5, 7.7, 17.5, 1.3, 4.4, 0, ['tree nuts', 'vegan']),
  q('hummus-veg', 'Hummus with carrots and cucumber', '¼ cup + 1 cup veg', 160, 5, 18, 8, 1, 6, 280, ['sesame', 'vegan']),
  q('cottage', 'Cottage cheese', '¾ cup', 165, 21, 7, 4.5, 2.5, 0, 600, ['dairy']),
  q('milk', 'Milk, 2%', '1 cup', 125, 8.4, 12, 4.8, 3, 0, 105, ['dairy']),
  q('soy-milk', 'Soy milk, fortified', '1 cup', 105, 7, 9, 4, 0.5, 1, 100, ['soy', 'vegan']),
  q('shake', 'Protein shake (whey) with water', '1 scoop', 120, 24, 3, 1.5, 0.5, 0, 50, ['dairy']),
  q('tuna', 'Canned tuna, light, drained', '1 can (120 g)', 130, 29, 0, 1, 0.3, 0, 300, ['fish']),
  q('salmon', 'Baked salmon', '150 g cooked', 310, 33, 0, 19, 3.5, 0, 90, ['fish']),
  q('chicken', 'Grilled chicken breast', '150 g cooked', 250, 46, 0, 5.5, 1.5, 0, 110, []),
  q('tofu', 'Pan-fried tofu', '150 g', 210, 19, 4, 13, 2, 2, 20, ['soy', 'vegan']),
  q('lentils', 'Cooked lentils', '1 cup', 230, 18, 40, 0.8, 0.1, 15.6, 4, ['vegan']),
  q('black-beans', 'Black beans, canned, rinsed', '1 cup', 230, 15, 40, 0.9, 0.2, 15, 400, ['vegan']),
  q('rice', 'White rice, cooked', '1 cup', 205, 4.3, 45, 0.4, 0.1, 0.6, 2, ['vegan']),
  q('brown-rice', 'Brown rice, cooked', '1 cup', 220, 5, 46, 1.8, 0.4, 3.5, 10, ['vegan']),
  q('quinoa', 'Quinoa, cooked', '1 cup', 222, 8, 39, 3.6, 0.4, 5.2, 13, ['vegan']),
  q('ww-bread', 'Whole wheat bread', '2 slices', 160, 8, 28, 2, 0.5, 4, 290, ['gluten', 'vegan']),
  q('salad', 'Big green salad with vinaigrette', '3 cups + 1 tbsp dressing', 140, 2.5, 8, 11, 1.5, 4, 150, ['vegan']),
  q('veg', 'Steamed broccoli', '1 cup', 55, 3.7, 11, 0.6, 0.1, 5, 64, ['vegan']),
  q('avocado-toast', 'Avocado toast', '1 slice + ½ avocado', 230, 5.5, 22, 15, 2.2, 7.5, 180, ['gluten', 'vegan']),
  q('dark-choc', 'Dark chocolate 70%', '2 squares (20 g)', 120, 1.6, 9, 8.5, 5, 2.2, 4, ['vegan']),
]
