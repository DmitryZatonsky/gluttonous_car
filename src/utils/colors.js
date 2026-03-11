const ACCENT_COLOR = "#d9008d";

export function prepareChartData(categories) {
  if (!categories.length) return { data: [], colors: [] };

  const sorted = [...categories].sort((a, b) => b.value - a.value);
  const colors = [];
  const remainingCount = sorted.length - 1;
  let hueStep = remainingCount > 0 ? 360 / remainingCount : 0;
  let hueCounter = 0;

  sorted.forEach((cat, idx) => {
    if (idx === 0) {
      colors.push(ACCENT_COLOR); // акцент для категории с наибольшим значением
    } else {
      const color = `hsl(${hueCounter}, 70%, 60%)`;
      colors.push(color);
      hueCounter += hueStep;
    }
  });

  return { data: sorted, colors };
}