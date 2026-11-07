import type { Recipe } from '../data/types'
import type { Macros } from './nutrition'

export type Sex = 'male' | 'female' | 'unspecified'
export type Activity = 'sedentary' | 'light' | 'moderate' | 'very' | 'athlete'
export type Goal = 'lose' | 'maintain' | 'recomp' | 'gain'
export type Diet = 'omnivore' | 'pescatarian' | 'vegetarian' | 'vegan'
export type FishFreq = 'rarely' | 'sometimes' | 'often'

export interface Profile {
  age: number
  sex: Sex
  heightCm: number
  weightKg: number
  activity: Activity
  goal: Goal
  diet: Diet
  halal: boolean
  noAlcohol: boolean
  allergies: string[]
  conditions: string[]
  couldBecomePregnant: boolean
  fish: FishFreq
  imperial: boolean
}

export const defaultProfile: Profile = {
  age: 24, sex: 'unspecified', heightCm: 175, weightKg: 72, activity: 'light', goal: 'maintain', diet: 'omnivore',
  halal: false, noAlcohol: false, allergies: [], conditions: [], couldBecomePregnant: false, fish: 'rarely', imperial: false,
}

export const ACTIVITY: Record<Activity, [label: string, factor: number, hint: string]> = {
  sedentary: ['Mostly sitting', 1.2, 'Desk job, little exercise'],
  light: ['Lightly active', 1.375, 'Walking daily or exercise 1–3 days a week'],
  moderate: ['Active', 1.55, 'Exercise 3–5 days a week'],
  very: ['Very active', 1.725, 'Hard training 6–7 days, or a physical job'],
  athlete: ['Athlete', 1.9, 'Twice-a-day training or heavy labour'],
}

export const GOALS: Record<Goal, [label: string, hint: string]> = {
  lose: ['Lose fat', 'A moderate deficit with high protein to keep muscle'],
  maintain: ['Maintain and eat well', 'Balanced eating at your current weight'],
  recomp: ['Build muscle, stay lean', 'Maintenance calories, high protein, lift weights'],
  gain: ['Build muscle and size', 'A small surplus with high protein'],
}

export const ALLERGENS = ['gluten', 'dairy', 'egg', 'soy', 'peanuts', 'tree nuts', 'fish', 'shellfish', 'sesame'] as const

export const CONDITIONS: Record<string, [label: string, hint: string]> = {
  hypertension: ['High blood pressure', 'Lowers your sodium target and flags salty recipes'],
  diabetes: ['Type 2 diabetes or prediabetes', 'Moderates carbs, raises fibre, flags carb-heavy meals'],
  cholesterol: ['High LDL cholesterol', 'Lowers saturated fat and flags rich recipes'],
  celiac: ['Celiac disease', 'Flags every recipe containing gluten'],
  lactose: ['Lactose intolerance', 'Flags recipes with milk, cream and soft dairy'],
  kidney: ['Chronic kidney disease', 'Turns off high-protein targets; needs a dietitian’s plan'],
  pregnant: ['Pregnant or breastfeeding', 'Flags runny eggs and rare meat, and adjusts supplements'],
  anemia: ['Iron-deficiency anemia', 'Highlights iron-rich foods and supplement notes'],
}

export interface Targets {
  bmr: number
  tdee: number
  kcal: number
  protein: number
  carbs: number
  fat: number
  satFat: number
  fiber: number
  sodium: number
  waterL: number
  notes: string[]
}

/** How many recipe servings make one main meal for you (about 30% of your daily calories). */
export function portionFor(perServingKcal: number, t: Targets) {
  const meal = t.kcal * 0.3
  const raw = meal / Math.max(perServingKcal, 1)
  const x = Math.min(3, Math.max(0.5, Math.round(raw * 4) / 4))
  return { meal: Math.round(meal), x }
}

const has = (p: Profile, c: string) => p.conditions.includes(c)

export function bmi(p: Profile) {
  return p.weightKg / (p.heightCm / 100) ** 2
}

/** Height-based numbers: the weight range a BMI of 18.5–24.9 maps to at this height, and where you sit. */
export function bodyFor(p: Profile) {
  const m2 = (p.heightCm / 100) ** 2
  const b = p.weightKg / m2
  const lo = 18.5 * m2
  const hi = 24.9 * m2
  const band = b < 18.5 ? 'under' : b < 25 ? 'in' : b < 30 ? 'over' : 'well-over'
  return { bmi: b, lo, hi, mid: 22 * m2, band, refWeight: b > 30 ? 27 * m2 : b < 18.5 ? lo : p.weightKg } as const
}

export function targets(p: Profile): Targets {
  const notes: string[] = []
  const sexAdj = p.sex === 'male' ? 5 : p.sex === 'female' ? -161 : -78
  const bmr = 10 * p.weightKg + 6.25 * p.heightCm - 5 * p.age + sexAdj
  const tdee = bmr * ACTIVITY[p.activity][1]
  let goal = p.goal
  if (has(p, 'pregnant') && (goal === 'lose' || goal === 'gain')) {
    goal = 'maintain'
    notes.push('During pregnancy or breastfeeding, the app does not set a weight-change target. Your care provider will guide calorie needs (they rise by roughly 350–450 kcal a day later in pregnancy).')
  }
  const body = bodyFor(p)
  if (goal === 'lose' && body.band === 'under') {
    goal = 'maintain'
    notes.push(`At your height (${Math.round(p.heightCm)} cm), ${Math.round(p.weightKg)} kg is under the usual healthy range of ${Math.round(body.lo)}–${Math.round(body.hi)} kg, so the app will not set a weight-loss target. Talk to a doctor if you are losing weight without trying.`)
  } else if (goal === 'lose' && body.bmi < 20) {
    notes.push(`You are already near the low end of the healthy range for your height (${Math.round(body.lo)}–${Math.round(body.hi)} kg). "Build muscle, stay lean" may suit you better than a deficit.`)
  } else if (goal === 'gain' && body.bmi >= 27) {
    notes.push(`For your height you are above the usual range (${Math.round(body.lo)}–${Math.round(body.hi)} kg). If the aim is muscle, "Build muscle, stay lean" builds it without adding much fat.`)
  } else if (goal === 'maintain' && body.band === 'under') {
    notes.push(`For your height, a healthy range is about ${Math.round(body.lo)}–${Math.round(body.hi)} kg. Consider "Build muscle and size" to move toward it gently.`)
  }
  let kcal = tdee
  if (goal === 'lose') kcal = tdee - Math.min(500, tdee * 0.2)
  if (goal === 'gain') kcal = tdee + Math.min(300, tdee * 0.1)
  const floor = p.sex === 'male' ? 1500 : p.sex === 'female' ? 1200 : 1350
  if (kcal < floor) {
    kcal = floor
    notes.push(`Your calorie target is held at a ${floor} kcal minimum. Going lower is not something to do without medical supervision.`)
  }
  kcal = Math.round(kcal / 10) * 10

  // protein: g per kg, using a capped reference weight for higher BMIs
  // protein is set from a height-based reference weight when weight is outside the healthy range for your height
  const refWeight = body.refWeight
  if (body.band === 'well-over') notes.push(`Protein is based on a reference weight for your height (${Math.round(refWeight)} kg), not your total weight, so the target stays realistic.`)
  const active = ['moderate', 'very', 'athlete'].includes(p.activity)
  let gPerKg = { lose: 1.8, maintain: active ? 1.4 : 1.2, recomp: 2.0, gain: 1.8 }[goal]
  if (has(p, 'kidney')) {
    gPerKg = 0.8
    notes.push('With kidney disease, protein, sodium, potassium and phosphorus needs are individual. The app uses a conservative 0.8 g/kg protein; follow your renal dietitian’s numbers over these.')
  }
  const protein = Math.round(refWeight * gPerKg)

  const fatPct = has(p, 'diabetes') ? 0.35 : 0.3
  const fat = Math.round((kcal * fatPct) / 9)
  let carbs = Math.round((kcal - protein * 4 - fat * 9) / 4)
  if (has(p, 'diabetes')) notes.push('Spread carbs evenly across meals, choose high-fibre carbs, and pair them with protein. Your diabetes care team can personalise carb amounts.')
  carbs = Math.max(carbs, 100)

  const satFat = Math.round((kcal * (has(p, 'cholesterol') ? 0.06 : 0.1)) / 9)
  if (has(p, 'cholesterol')) notes.push('For lowering LDL, saturated fat is capped at about 6% of calories. Oats, beans, lentils and nuts help too.')
  const fiber = Math.round((kcal / 1000) * 14)
  const sodium = has(p, 'hypertension') ? 2000 : 2300
  if (has(p, 'hypertension')) notes.push('Sodium is capped at 2,000 mg a day, as Hypertension Canada recommends. Cooking at home is the best way to hit it.')
  if (has(p, 'celiac')) notes.push('Celiac needs strict gluten avoidance, including soy sauce (use tamari), most gochujang and doubanjiang, and cross-contact from shared toasters and boards.')
  // fat floor: at least ~0.6 g per kg of height-based reference weight for hormones and vitamin absorption
  const fatFloor = Math.round(0.6 * refWeight)
  const fatFinal = Math.max(fat, fatFloor)
  carbs = Math.max(100, Math.round((kcal - protein * 4 - fatFinal * 9) / 4))
  const waterL = p.sex === 'male' ? 3.7 : p.sex === 'female' ? 2.7 : 3.2
  return { bmr: Math.round(bmr), tdee: Math.round(tdee), kcal, protein, carbs, fat: fatFinal, satFat, fiber, sodium, waterL, notes }
}

// ── recipe screening ──

const RX = {
  gluten: /flour(?!.*cassava)|pasta|spaghetti|linguine|macaroni|bread|bun|pita|baguette|bulgur|soy sauce|oyster sauce|doubanjiang|shaoxing|gochujang|tortilla chips/,
  dairy: /butter(?!milk)|buttermilk|milk(?!.*coconut)|cream(?!.*coconut)|cheese|parmesan|pecorino|cheddar|yogurt|feta|queso|ghee/,
  egg: /\beggs?\b|egg yolk|mayonnaise/,
  soy: /soy sauce|tofu|miso|doubanjiang|fermented black|gochujang/,
  peanuts: /peanut/,
  'tree nuts': /almond|cashew|walnut|pecan|pistachio|hazelnut/,
  fish: /fish sauce|bonito|dashi|anchov|salmon|cod/,
  shellfish: /shrimp|oyster sauce/,
  sesame: /sesame|tahini/,
  pork: /pork|guanciale|pancetta|bacon|ham\b|lard/,
  beef: /beef|steak|picanha|ribeye|sirloin|flank/,
  poultry: /chicken|turkey/,
  alcohol: /wine(?! vinegar)|sake|shaoxing|mirin|tequila|\brum\b|vodka|whisk|bourbon|\brye\b|triple sec|cointreau|bitters/,
  honey: /honey/,
}

const RUNNY_EGG = new Set(['eggs', 'carbonara', 'oyakodon', 'kra-pao', 'kimchi-fried-rice'])
const RARE_MEAT = new Set(['picanha'])

export function contains(r: Recipe) {
  const text = r.ingredients.map((i) => i.item.toLowerCase()).join(' | ')
  const out = new Set<string>()
  for (const [k, rx] of Object.entries(RX)) if (rx.test(text)) out.add(k)
  for (const t of r.tags ?? []) if (t !== 'vegan') out.add(t)
  return out
}

export interface Flag {
  level: 'avoid' | 'caution' | 'info'
  text: string
}

export function screenRecipe(r: Recipe, per: Macros, p: Profile, t: Targets): Flag[] {
  const c = contains(r)
  const flags: Flag[] = []
  for (const a of p.allergies) if (c.has(a)) flags.push({ level: 'avoid', text: `Contains ${a}` })
  if (has(p, 'celiac') && c.has('gluten') && !p.allergies.includes('gluten')) flags.push({ level: 'avoid', text: 'Contains gluten (celiac)' })
  const meat = c.has('pork') || c.has('beef') || c.has('poultry')
  const sea = c.has('fish') || c.has('shellfish')
  if (p.diet === 'vegan' && (meat || sea || c.has('dairy') || c.has('egg') || c.has('honey'))) flags.push({ level: 'avoid', text: 'Not vegan as written' })
  else if (p.diet === 'vegetarian' && (meat || sea)) flags.push({ level: 'avoid', text: 'Contains meat or fish' })
  else if (p.diet === 'pescatarian' && meat) flags.push({ level: 'avoid', text: 'Contains meat' })
  if (p.halal && c.has('pork')) flags.push({ level: 'avoid', text: 'Contains pork' })
  if ((p.halal || p.noAlcohol) && c.has('alcohol')) flags.push({ level: r.cuisine === 'cocktails' ? 'avoid' : 'caution', text: r.cuisine === 'cocktails' ? 'Contains alcohol (try the mocktail version)' : 'Uses wine, sake or mirin' })
  if (has(p, 'lactose') && c.has('dairy') && !p.allergies.includes('dairy')) flags.push({ level: 'caution', text: 'Contains dairy (aged cheese and butter are low in lactose)' })
  if (has(p, 'pregnant')) {
    if (RUNNY_EGG.has(r.id)) flags.push({ level: 'caution', text: 'Cook eggs until fully set while pregnant' })
    if (RARE_MEAT.has(r.id)) flags.push({ level: 'caution', text: 'Cook to 145°F+ while pregnant' })
    if (c.has('alcohol')) flags.push({ level: 'caution', text: 'Contains alcohol, which does not fully cook off' })
  }
  if (per.sodium > t.sodium * 0.4) flags.push({ level: has(p, 'hypertension') ? 'caution' : 'info', text: `High sodium: ${Math.round(per.sodium).toLocaleString()} mg a serving` })
  if (per.satFat > t.satFat * 0.45) flags.push({ level: has(p, 'cholesterol') ? 'caution' : 'info', text: `Rich in saturated fat: ${Math.round(per.satFat)} g a serving` })
  if (has(p, 'diabetes') && per.carbs > 75) flags.push({ level: 'caution', text: `Carb-heavy (${Math.round(per.carbs)} g): try a smaller portion with extra veg or protein` })
  return flags
}

/** true when the recipe fits the profile's diet, allergies and celiac status as written */
export function dietOk(r: Recipe, p: Profile) {
  return !screenRecipeQuick(r, p)
}
function screenRecipeQuick(r: Recipe, p: Profile) {
  const c = contains(r)
  if (p.allergies.some((a) => c.has(a))) return true
  if (has(p, 'celiac') && c.has('gluten')) return true
  const meat = c.has('pork') || c.has('beef') || c.has('poultry')
  const sea = c.has('fish') || c.has('shellfish')
  if (p.diet === 'vegan' && (meat || sea || c.has('dairy') || c.has('egg'))) return true
  if (p.diet === 'vegetarian' && (meat || sea)) return true
  if (p.diet === 'pescatarian' && meat) return true
  if (p.halal && c.has('pork')) return true
  return false
}

// ── supplements ──

export interface Supplement {
  name: string
  why: string
  food: string
  amount: string
  caution: string
  strength: 'recommended' | 'consider' | 'optional'
}

export function supplements(p: Profile): Supplement[] {
  const out: Supplement[] = []
  const vegan = p.diet === 'vegan'
  const plantBased = vegan || p.diet === 'vegetarian'
  const female = p.sex === 'female'

  out.push({
    name: 'Vitamin D',
    strength: p.age > 50 ? 'recommended' : 'consider',
    why: p.age > 50
      ? 'Health Canada recommends that adults over 50 take a daily vitamin D supplement. In Canada, the sun is too weak from about October to March for your skin to make much.'
      : 'In Canada the sun is too weak from about October to March for your skin to make much vitamin D, and few foods contain it.',
    food: 'Fortified milk and plant milks, fatty fish (salmon, trout, sardines), egg yolks.',
    amount: p.age > 50 ? 'Health Canada: 400 IU (10 µg) a day as a supplement, on top of food.' : 'The daily need is 600 IU (15 µg) under 70. Many people take 400–1,000 IU in fall and winter.',
    caution: 'Do not exceed 4,000 IU a day without medical advice. A blood test can tell you if you are low.',
  })
  if (plantBased || p.age > 50 || has(p, 'diabetes')) {
    out.push({
      name: 'Vitamin B12',
      strength: vegan ? 'recommended' : 'consider',
      why: vegan
        ? 'B12 is found almost only in animal foods. Vegans need fortified foods or a supplement. This is not optional.'
        : p.age > 50
          ? 'Absorption of B12 from food drops with age; Health Canada advises adults over 50 to get it from fortified foods or a supplement.'
          : plantBased ? 'Vegetarians can fall short, especially with little dairy and eggs.' : 'Metformin, a common diabetes medicine, can lower B12 over time.',
      food: 'Eggs, dairy, meat, fish, fortified plant milks, nutritional yeast.',
      amount: 'The daily need is 2.4 µg. Supplements often contain far more, which is considered safe because the excess is not absorbed.',
      caution: has(p, 'diabetes') ? 'If you take metformin, ask your doctor about checking B12 levels.' : 'Ask about a blood test if you are tired, tingly or numb.',
    })
  }
  if (p.fish === 'rarely' || plantBased) {
    out.push({
      name: 'Omega-3 (EPA and DHA)',
      strength: 'consider',
      why: 'If you rarely eat fatty fish, you get little EPA and DHA, the omega-3 fats linked with heart health.',
      food: 'Two servings a week of salmon, trout, sardines or mackerel. Plant ALA comes from flax, chia, walnuts, canola.',
      amount: 'Food first. If supplementing, labels commonly provide 250–500 mg EPA + DHA a day; algae oil is the vegan option.',
      caution: 'Ask your pharmacist if you take blood thinners.',
    })
  }
  if (has(p, 'anemia') || (female && plantBased) || has(p, 'pregnant')) {
    out.push({
      name: 'Iron',
      strength: has(p, 'anemia') ? 'recommended' : 'consider',
      why: has(p, 'anemia') ? 'Iron-deficiency anemia is usually treated with iron, at a dose your doctor sets.' : 'Menstruation, pregnancy and plant-based diets all raise the risk of low iron.',
      food: 'Red meat, lentils, chickpeas, tofu, spinach, fortified cereal. Eat plant iron with vitamin C (lemon, peppers, tomatoes) to absorb more.',
      amount: 'Only take iron after a blood test, at the dose your doctor recommends.',
      caution: 'Too much iron is harmful, and it is a leading cause of poisoning in young children: keep it locked away. Separate it from tea, coffee and calcium by 2 hours.',
    })
  }
  if (vegan || has(p, 'lactose') || p.allergies.includes('dairy')) {
    out.push({
      name: 'Calcium',
      strength: 'consider',
      why: 'Without dairy, it is easy to fall short of calcium for bones.',
      food: 'Fortified plant milk, calcium-set tofu, canned salmon with bones, almonds, bok choy, kale, white beans. Lactose-free milk and hard cheeses work if you are lactose intolerant.',
      amount: 'Adults need about 1,000 mg a day (1,200 mg for women over 50 and men over 70). Supplement only the gap your food leaves.',
      caution: 'Take no more than 500 mg at once. Very high doses can cause kidney stones.',
    })
  }
  if (p.couldBecomePregnant || has(p, 'pregnant')) {
    out.push({
      name: has(p, 'pregnant') ? 'Prenatal multivitamin' : 'Folic acid (in a multivitamin)',
      strength: 'recommended',
      why: 'Health Canada recommends that anyone who could become pregnant takes a daily multivitamin with 0.4 mg folic acid, to help prevent neural tube defects. Many pregnancies are unplanned, so it is advised before pregnancy too.',
      food: 'Leafy greens, lentils, beans, oranges and fortified grains also provide folate.',
      amount: '0.4 mg (400 µg) folic acid a day in a multivitamin; some people need more, as advised by their doctor.',
      caution: has(p, 'pregnant') ? 'Use a prenatal vitamin your care provider recommends, and avoid high-dose vitamin A.' : 'Check with your doctor if you have a family history of neural tube defects.',
    })
  }
  if (vegan) {
    out.push({
      name: 'Iodine',
      strength: 'consider',
      why: 'Vegans miss the iodine in dairy, eggs and fish. Also, kosher and sea salt are usually not iodized; Canadian table salt is.',
      food: 'Iodized table salt (a little), seaweed in moderation.',
      amount: 'The daily need is 150 µg. Many vegan multivitamins include it.',
      caution: 'Very high-iodine kelp supplements can upset your thyroid.',
    })
  }
  if ((p.goal === 'gain' || p.goal === 'recomp') && !has(p, 'kidney')) {
    out.push({
      name: 'Creatine monohydrate',
      strength: 'optional',
      why: 'One of the most researched sports supplements. It helps strength and muscle gains when combined with lifting.',
      food: 'Small amounts in meat and fish.',
      amount: 'Studies commonly use 3–5 g a day, any time of day.',
      caution: 'Not for anyone with kidney problems. Drink enough water. It can add a little water weight.',
    })
    out.push({
      name: 'Protein powder',
      strength: 'optional',
      why: 'Only a convenience if you cannot reach your protein target with food.',
      food: 'Greek yogurt, eggs, chicken, tofu, lentils, milk.',
      amount: 'One scoop is usually 20–25 g of protein.',
      caution: 'Look for third-party tested products. Whey contains dairy.',
    })
  }
  if (has(p, 'kidney')) {
    for (const s of out) s.caution = `With kidney disease, take supplements only if your nephrologist approves. ${s.caution}`
  }
  return out
}
