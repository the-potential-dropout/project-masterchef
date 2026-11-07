# 🍳 Project Masterchef

> *A cooking app for people whose signature dish is "cereal, but I put the milk in first."*

Hi. I'm 24, I have a fully functional kitchen, and until now its main job was storing takeout menus and one sad lemon. This app is my rehabilitation program.

**The goal:** go from "is the smoke alarm part of the recipe?" to hosting friends for a dinner they actually enjoy, *on purpose*.

**The non-goal:** Gordon Ramsay yelling at me. I do that to myself already.

---

## How it works

Six starter dishes, then the whole world. Each one secretly teaches a technique, the way a good teacher hides vegetables in a smoothie.

| # | Dish | What it's secretly teaching | Chance of fire |
|---|------|-----------------------------|----------------|
| 1 | Soft scrambled eggs | Heat control | Low (it's eggs, calm down) |
| 2 | Sheet-pan chicken thighs | Roasting, and owning a thermometer like an adult | Low |
| 3 | Big-pot chili | Building flavour + feeding yourself for a week | Medium (garlic burns, garlic always burns) |
| 4 | Stir-fry with rice | Knife skills, high heat, rice without a rice cooker 😱 | Medium-high |
| 5 | Garlic tomato pasta | Pasta water, the most powerful liquid known to science | Low |
| ★ | Roast chicken + salad | **Hosting.** Actual humans. In my home. Eating my food. | Emotional |

**The rule:** cook every dish twice. The first time you're following instructions. The second time you're *cooking*. Two dots fill in on the path. Very satisfying. Very dopamine.

## Features

### 🦉 Learn (Duolingo, but the owl is a chicken thigh)
- **Kitchen Foundations course:** knives, pans and stove settings, oils and fats (smoke points, health pros and cons), measuring, meat temperatures and times, food safety, seasoning, nutrition basics. 
- **14 world cuisine branches:** Italian, French, Greek, Chinese, Japanese, Korean, Thai, Vietnamese, Indian, Arabic/Levantine, West African, Mexican, American and Brazilian churrasco. Each one teaches the pantry, the key techniques and a stack of signature dishes (Italian alone has ten, because nonna said so).
- **Eat-your-way branches:** plant-based classics and seafood classics, for vegans, vegetarians, pescatarians and people who just discovered tofu can be crispy.
- **194 lessons** of multiple choice, put-the-steps-in-order, matching and "type the temperature" questions. Recipe-memory lessons are generated fresh from the recipe data every time, so you can't just memorise that the answer is B.
- Get it wrong and it comes back at the end, like an ex who "just wants to talk."
- XP, a daily goal and a streak, so you feel guilty in a healthy, motivating way.
- **Cheat sheets** for temperatures, cooking times, oils, tools, conversions and food safety.

### 🍳 Cook
- **The Path:** the six starter dishes in order, with progress dots so you can watch yourself become a functional adult in real time.
- **124 recipes**, each with what it teaches, troubleshooting ("if it goes wrong", because it will) and variations.
- **Cook mode:** one step at a time, in letters big enough to read while holding raw chicken. Keeps your screen awake, and runs **stacking timers** so the rice keeps counting while you chop.
- **Cook log:** rate each attempt and leave notes for future you ("NEEDED SALT. ALWAYS NEEDS SALT.").

### 💸 Budget
- Every ingredient has an estimated Montreal grocery price (CAD), **editable** for when Maxi betrays you.
- Every recipe shows its **cost per serving**.
- The grocery list merges the same product across recipes, works out how many packs to buy, adds up the trip and compares it to your **weekly budget**. Pantry staples stay out of the total unless you say you're out.

### 🥦 Health
- A profile (age, sex, height, weight, activity, goal, diet, allergies, conditions) sets daily **calorie, protein, carb, fat, fibre, saturated fat and sodium targets** (Mifflin-St Jeor, plus sensible goal-based macros).
- Every recipe gets **macros per serving** and **warnings**: allergens, vegan/vegetarian/halal conflicts, high sodium for blood pressure, saturated fat for cholesterol, carb-heavy meals for diabetes, runny eggs during pregnancy, and more.
- **Built for your height:** your height sets your resting burn, the healthy weight range for your frame, a sanity check on your goal (no weight-loss plan if you're already slim for your height), your protein reference weight, and a **"your portion"** line on every meal ("about 1.25 servings") so a 6′4″ person and a 5′2″ person don't eat the same plate.
- **Day builder:** stack meals and snacks, see how the day adds up, and get suggestions for filling protein or fibre gaps.
- **Supplements and vitamins** tailored to your profile (vitamin D in Canadian winters, B12 for vegans, folic acid, omega-3 and so on), each with "food first", amounts and cautions.
- General info, not medical advice. Your doctor outranks this app. So does your pharmacist. Honestly, so does your mom.

### 🍹 Through the day
- **Breakfast**, **salads** (real ones, not sad desk lettuce), **soups, bisques and chowders**, **snacks**, **desserts and baking**, **smoothies and juices**, **coffee, tea and cocoa**, and **cocktails** (with mocktail versions), each with its own Learn branch.

### 🗂️ Recipe folders
- 124 recipes is a lot of scrolling, so they live in **folders**: World cuisines → region → country, By meal (drinks split into smoothies, café and cocktails), and By diet and goal (vegan, vegetarian, pescatarian, gluten-free, high protein, under $2.50 a serving, 30 minutes or less).
- Or search everything at once, like a raccoon going through a fridge.

### 🎨 Pretty things
- **Real dish photos** from Wikimedia Commons, credited on a Credits page (thank you, photographers).
- **Yolky**, an original egg in a chef's hat who bobs, blinks, cheers when you're right and wobbles sadly when you're not. He is doing his best. So are you.
- Food confetti when you finish a lesson or a dish, steam rising off hot soups, a countdown ring on cook-mode timers.
- Charts: where each recipe's calories come from, today's macro split against your target, and where your grocery money goes.

### 📱 And
- Installable on your phone, works offline, dark mode for midnight pasta.

Your progress is saved on your device. No account, no sign-up, no "enter your email to unlock the rest of this recipe," no 2,000-word story about someone's grandmother's farmhouse before the ingredient list.

## Running it

```bash
npm install
npm run dev      # cook locally
npm run build    # plate it for production
npm run check    # make sure every ingredient has a price and every quiz question makes sense
```

It deploys to GitHub Pages automatically on every push to `main` (see `.github/workflows/deploy.yml`). The first time, go to **Settings → Pages** and set the source to **GitHub Actions**.

## Built with

React, TypeScript, Vite, and the confidence of someone who has successfully boiled water at least four times.

## Roadmap

- [ ] Finish Kitchen Foundations
- [ ] Cook all six dishes twice
- [ ] Clear at least three world branches (the jollof one counts double)
- [ ] Host a dinner party
- [ ] Nobody gets food poisoning
- [ ] Someone asks for the recipe 🥹
- [ ] Become a Masterchef (stretch goal) (very stretch) (yoga-level stretch)

## License

MIT. Steal these recipes. Feed your friends. That's the whole point.
