export function generateColors(categories, mainColor = "#d9008d") {
  if (!categories.length) return [];

  const colors = [mainColor]; // по дизайну основной цвет первой категории

  const remainingCount = categories.length - 1;

  for (let i = 0; i < remainingCount; i++) {
    const hue = (i * 360) / remainingCount;
    const color = `hsl(${hue}, 70%, 60%)`;
    colors.push(color);
  }

  return colors;
}