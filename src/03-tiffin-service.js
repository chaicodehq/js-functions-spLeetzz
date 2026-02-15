/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  if (
    typeof name === "string" &&
    name.length > 0 &&
    typeof mealType === "string" &&
    ["veg", "nonveg", "jain"].includes(mealType.toLowerCase()) &&
    typeof days === "number" &&
    Number.isInteger(days) &&
    days > 0
  ) {
    let dailyRate;
    if (mealType.toLowerCase() === "veg") dailyRate = 80;
    else if (mealType.toLowerCase() === "nonveg") dailyRate = 120;
    else if (mealType.toLowerCase() === "jain") dailyRate = 90;

    return {
      name,
      mealType: mealType.toLowerCase(),
      days,
      dailyRate,
      totalCost: dailyRate * days,
    };
  } else return null;
}

export function combinePlans(...plans) {
  let arr = [];

  if (plans.length == 0) return null;

  for (const plan of plans) {
    arr.push(createTiffinPlan(plan));
  }
  let totalCustomers = plans.length;
  let totalRevenue = arr.reduce((acc, curr) => acc + curr.totalCost, 0);
  let mealBreakdown = {
    veg: arr.reduce(
      (acc, curr) => (curr.mealType === "veg" ? acc + 1 : acc),
      0,
    ),
    nonveg: arr.reduce(
      (acc, curr) => (curr.mealType === "nonveg" ? acc + 1 : acc),
      0,
    ),
    jain: arr.reduce(
      (acc, curr) => (curr.mealType === "jain" ? acc + 1 : acc),
      0,
    ),
  };

  return { totalCustomers, totalRevenue, mealBreakdown };
}

export function applyAddons(plan, ...addons) {
  if (!plan) return null;
  let dailyRate =
    plan.dailyRate + addons.reduce((acc, curr) => acc + (curr.price ?? 0), 0);
  let final = {
    name: plan.name,
    mealType: plan.mealType,
    days: plan.days,
    dailyRate,
    totalCost: plan.days * dailyRate,
  };
  if (addons.length > 0) final["addonNames"] = addons.map((e) => e.name);
  return final;
}
