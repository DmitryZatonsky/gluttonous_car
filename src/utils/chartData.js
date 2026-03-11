export function groupByCategory(expenses) {
  return expenses.reduce((acc, item) => {
    const existing = acc.find((c) => c.name === item.category);
    if (existing) {
      existing.value += item.amount;
    } else {
      acc.push({ name: item.category, value: item.amount });
    }
    return acc;
  }, []);
}