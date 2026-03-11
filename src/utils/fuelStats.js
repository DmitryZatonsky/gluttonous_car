export function calcFuelStats(expenses) {
  let count = 0;
  let firstMileage = 0;
  let lastMileage = 0;
  let fuelCost = 0;
  let fuelLiters = 0;

  for (const e of expenses) {
    if (e.category !== "Топливо") continue;

    if (count === 0) lastMileage = e.mileage;
    if (count === 2) firstMileage = e.mileage;

    if (count < 2) {
      fuelCost += e.amount;
      fuelLiters += e.liters;
    }

    count++;
    if (count === 3) break;
  }

  const distance = lastMileage - firstMileage;

  if (count < 2 || distance <= 0) {
    return { costPerKm: 0, litersPer100: 0 };
  }

  return {
    costPerKm: fuelCost / distance,
    litersPer100: (fuelLiters / distance) * 100,
  };
}