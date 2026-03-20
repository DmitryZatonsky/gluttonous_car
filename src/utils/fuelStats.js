export function calcFuelStats(expenses, limit = 7) {
  const fuels = expenses
    .filter((e) => e.category === "Топливо")
    .sort((a, b) => a.mileage - b.mileage);

  if (fuels.length < 2)
    return {
      gasCostPerKm: 0,
      petrolCostPerKm: 0,
      gasLitersPer100: 0,
      petrolLitersPer100: 0,
      distance: 0,
    };

  const limited = fuels.slice(-limit);

  const usable = limited.slice(0, -1);

  const firstMileage = limited[0].mileage;
  const lastMileage = limited[limited.length - 1].mileage;
  const distance = lastMileage - firstMileage;

  const stats = {
    gas: { money: 0, liters: 0 },
    petrol: { money: 0, liters: 0 },
  };

  usable.forEach((e) => {
    if (e.fuelType === "Газ") {
      stats.gas.money += e.amount;
      stats.gas.liters += e.liters;
    }

    if (e.fuelType === "Бензин") {
      stats.petrol.money += e.amount;
      stats.petrol.liters += e.liters;
    }
  });

  return {
    gasCostPerKm: stats.gas.money / distance,
    petrolCostPerKm: stats.petrol.money / distance,
    gasLitersPer100: (stats.gas.liters / distance) * 100,
    petrolLitersPer100: (stats.petrol.liters / distance) * 100,
    distance,
  };
}
