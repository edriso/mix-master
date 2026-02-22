# JavaScript Object Methods - A Practical Guide

## The Problem

Imagine you have a pie recipe object from an API that looks like this:

```js
const pie = {
  name: "Apple Pie",
  category: "Dessert",
  servings: 8,
  strIngredient1: "Flour",
  strIngredient2: "Butter",
  strIngredient3: "Sugar",
  strIngredient4: "Apples",
  strIngredient5: null,
  strIngredient6: null,
  strIngredient7: null,
  step1: "Mix dry ingredients",
  step2: "Add butter",
  step3: "Fill with apples",
  step4: null,
  step5: null,
};
```

How do you pull out just the ingredients that aren't `null`? How do you grab just the steps? That's where object methods come in.

---

## 1. `Object.keys()` - Get All Property Names

Returns an **array of strings** — every key in the object.

```js
Object.keys(pie);
// ["name", "category", "servings", "strIngredient1", "strIngredient2", ...]
```

### Real use: Extract valid ingredients (what your project does)

```js
const ingredients = Object.keys(pie)
  .filter((key) => key.startsWith("strIngredient") && pie[key] !== null)
  .map((key) => pie[key]);

// ["Flour", "Butter", "Sugar", "Apples"]
```

**Breaking it down:**

| Step                  | What happens                                                              |
| --------------------- | ------------------------------------------------------------------------- |
| `Object.keys(pie)`    | Gets ALL keys: `["name", "category", "strIngredient1", ...]`             |
| `.filter(...)` part 1 | `key.startsWith("strIngredient")` keeps only ingredient keys              |
| `.filter(...)` part 2 | `pie[key] !== null` drops the empty ones                                  |
| `.map(key => pie[key])` | Swaps each key for its actual value: `"strIngredient1"` becomes `"Flour"` |

### More examples

```js
// Count how many properties an object has
Object.keys(pie).length; // 15

// Check if a key exists
Object.keys(pie).includes("name"); // true

// Get only the "step" keys
const stepKeys = Object.keys(pie).filter((key) => key.startsWith("step"));
// ["step1", "step2", "step3", "step4", "step5"]
```

---

## 2. `Object.values()` - Get All Values

Returns an **array of values** — ignores the keys entirely.

```js
Object.values(pie);
// ["Apple Pie", "Dessert", 8, "Flour", "Butter", "Sugar", "Apples", null, null, ...]
```

### Use case: Get all non-null values

```js
const allFilledValues = Object.values(pie).filter((val) => val !== null);
// ["Apple Pie", "Dessert", 8, "Flour", "Butter", "Sugar", "Apples", "Mix dry ingredients", "Add butter", "Fill with apples"]
```

### Use case: Check if any value matches something

```js
Object.values(pie).includes("Butter"); // true
Object.values(pie).includes("Chocolate"); // false
```

---

## 3. `Object.entries()` - Get Key-Value Pairs

Returns an **array of `[key, value]` pairs**. The most powerful of the three.

```js
Object.entries(pie);
// [["name", "Apple Pie"], ["category", "Dessert"], ["servings", 8], ...]
```

### Use case: Build a clean ingredients list with numbers

```js
const numberedIngredients = Object.entries(pie)
  .filter(([key, value]) => key.startsWith("strIngredient") && value !== null)
  .map(([key, value], index) => `${index + 1}. ${value}`);

// ["1. Flour", "2. Butter", "3. Sugar", "4. Apples"]
```

### Use case: Convert object to a different shape

```js
// Turn pie info into an array of { label, value } for rendering
const displayData = Object.entries(pie)
  .filter(([key]) => ["name", "category", "servings"].includes(key))
  .map(([key, value]) => ({ label: key, value }));

// [
//   { label: "name", value: "Apple Pie" },
//   { label: "category", value: "Dessert" },
//   { label: "servings", value: 8 }
// ]
```

### Use case: Create a new filtered object

```js
// Keep only non-null properties
const cleanPie = Object.fromEntries(
  Object.entries(pie).filter(([key, value]) => value !== null)
);
// { name: "Apple Pie", category: "Dessert", servings: 8, strIngredient1: "Flour", ... }
// All null properties are gone
```

---

## 4. `Object.fromEntries()` - Turn Pairs Back Into an Object

The reverse of `Object.entries()`. Takes `[key, value]` pairs and builds an object.

```js
const pairs = [
  ["crust", "Flaky"],
  ["filling", "Apple"],
  ["topping", "Crumble"],
];

Object.fromEntries(pairs);
// { crust: "Flaky", filling: "Apple", topping: "Crumble" }
```

### Use case: Rename keys

```js
const renamed = Object.fromEntries(
  Object.entries(pie)
    .filter(([key]) => ["name", "category", "servings"].includes(key))
    .map(([key, value]) => {
      if (key === "name") return ["pieName", value];
      return [key, value];
    })
);
// { pieName: "Apple Pie", category: "Dessert", servings: 8 }
```

---

## 5. `Object.assign()` - Merge Objects

Copies properties from one or more objects into a target.

```js
const base = { crust: "Shortcrust", filling: "Apple" };
const extras = { topping: "Crumble", servings: 6 };

const fullRecipe = Object.assign({}, base, extras);
// { crust: "Shortcrust", filling: "Apple", topping: "Crumble", servings: 6 }
```

> Modern alternative: **spread operator** does the same thing and is cleaner.

```js
const fullRecipe = { ...base, ...extras };
```

### Use case: Override defaults

```js
const defaults = { size: "medium", crust: "Regular", cheese: true };
const userChoice = { size: "large", crust: "Thin" };

const order = { ...defaults, ...userChoice };
// { size: "large", crust: "Thin", cheese: true }
// userChoice overrides defaults, but "cheese" stays from defaults
```

---

## 6. `Object.freeze()` & `Object.isFrozen()` - Lock an Object

Prevents any changes to the object.

```js
const recipe = { name: "Pecan Pie", temp: 350 };
Object.freeze(recipe);

recipe.name = "Cherry Pie"; // silently fails (throws in strict mode)
recipe.newProp = "test"; // silently fails

console.log(recipe.name); // still "Pecan Pie"
Object.isFrozen(recipe); // true
```

### Use case: Constants that shouldn't change

```js
const PIE_TYPES = Object.freeze({
  FRUIT: "fruit",
  CREAM: "cream",
  SAVORY: "savory",
});
```

---

## 7. Bonus: Handy Checks

### `hasOwnProperty()` / `in` operator

```js
pie.hasOwnProperty("name"); // true
"name" in pie; // true
"flavor" in pie; // false
```

### Quick property count

```js
Object.keys(pie).length; // 15
```

---

## Quick Reference Table

| Method                 | Returns              | Use when you need...                  |
| ---------------------- | -------------------- | ------------------------------------- |
| `Object.keys(obj)`     | `[key, key, ...]`    | Just the property names               |
| `Object.values(obj)`   | `[val, val, ...]`    | Just the values                       |
| `Object.entries(obj)`  | `[[key,val], ...]`   | Both key and value together           |
| `Object.fromEntries()` | `{ key: val, ... }`  | Turn pairs back into an object        |
| `Object.assign()`      | Merged object        | Merge/copy objects (prefer spread)    |
| `Object.freeze()`      | Frozen object        | Make an object immutable              |

---

## Pattern: The Filter-Map Combo (Your Project's Pattern)

This is the pattern from the mixmaster project, generalized:

```js
// From an object with numbered/indexed properties, extract the valid ones
const validItems = Object.keys(someObject)
  .filter((key) => key.startsWith("somePrefix") && someObject[key] !== null)
  .map((key) => someObject[key]);
```

This works great whenever an API gives you data shaped like:
`prop1, prop2, prop3, ... propN` where some are `null`.

You'll see this pattern a lot with older APIs that don't use arrays.

---

## Challenge: Pie Shop Homework

Here's your data. One object, multiple tasks. Try to solve each one before peeking at the answers.

```js
const pieShop = {
  shopName: "Grandma's Pies",
  city: "Austin",
  rating: 4.8,
  pie1_name: "Apple Crumble",
  pie1_price: 12,
  pie1_available: true,
  pie2_name: "Blueberry Classic",
  pie2_price: 14,
  pie2_available: false,
  pie3_name: "Pecan Delight",
  pie3_price: 15,
  pie3_available: true,
  pie4_name: "Cherry Bomb",
  pie4_price: 13,
  pie4_available: true,
  pie5_name: null,
  pie5_price: null,
  pie5_available: null,
  pie6_name: null,
  pie6_price: null,
  pie6_available: null,
};
```

### Task 1: Get all pie names (skip nulls)

Expected output: `["Apple Crumble", "Blueberry Classic", "Pecan Delight", "Cherry Bomb"]`

### Task 2: Get only the available pies as objects

Expected output:

```js
[
  { name: "Apple Crumble", price: 12 },
  { name: "Pecan Delight", price: 15 },
  { name: "Cherry Bomb", price: 13 },
]
```

### Task 3: Get the total price of all available pies

Expected output: `40`

### Task 4: Get just the shop info (no pie data)

Expected output: `{ shopName: "Grandma's Pies", city: "Austin", rating: 4.8 }`

### Task 5: Get the most expensive available pie name

Expected output: `"Pecan Delight"`

---

<details>
<summary><strong>Answers (click to reveal)</strong></summary>

### Answer 1

```js
const pieNames = Object.keys(pieShop)
  .filter((key) => key.endsWith("_name") && pieShop[key] !== null)
  .map((key) => pieShop[key]);
```

### Answer 2

```js
// get pie numbers that exist (not null)
const pieNumbers = Object.keys(pieShop)
  .filter((key) => key.endsWith("_name") && pieShop[key] !== null)
  .map((key) => key.replace("_name", ""));
// ["pie1", "pie2", "pie3", "pie4"]

const availablePies = pieNumbers
  .filter((pie) => pieShop[`${pie}_available`] === true)
  .map((pie) => ({
    name: pieShop[`${pie}_name`],
    price: pieShop[`${pie}_price`],
  }));
```

### Answer 3

```js
const totalPrice = availablePies.reduce((sum, pie) => sum + pie.price, 0);
```

### Answer 4

```js
const shopInfo = Object.fromEntries(
  Object.entries(pieShop).filter(([key]) => !key.startsWith("pie"))
);
```

### Answer 5

```js
const mostExpensive = availablePies.sort((a, b) => b.price - a.price)[0].name;
```

</details>
