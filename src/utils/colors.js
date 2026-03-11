// colors.js
const ACCENT_COLOR = "#d9008d";

export function generateColors(categories) {
  if (!categories.length) return [];

  const maxIndex = categories.reduce(
    (maxIdx, cat, idx, arr) => (cat.value > arr[maxIdx].value ? idx : maxIdx),
    0
  );

  const colors = [];
  const remainingCount = categories.length - 1;
  let hueStep = remainingCount > 0 ? 360 / remainingCount : 0;
  let hueCounter = 0;

  categories.forEach((cat, idx) => {
    if (idx === maxIndex) {
      colors.push(ACCENT_COLOR); // акцент внутри colors.js
    } else {
      const color = `hsl(${hueCounter}, 70%, 60%)`;
      colors.push(color);
      hueCounter += hueStep;
    }
  });

  return colors;
}