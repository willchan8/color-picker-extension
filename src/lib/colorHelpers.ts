// Import the color-name library
import colorName from 'color-name';

// Function to convert hexadecimal color code to color name
export function hexToColorName(hex: string): string {
  // Convert hex to RGB
  const rgb: [number, number, number] = hexToRGB(hex);

  // Find the closest color name based on RGB values
  const closestColor: string | null = findClosestColorName(rgb);

  return closestColor ? closestColor : 'Unknown';
}

// Function to convert hex color to RGB
export function hexToRGB(hex: string): [number, number, number] {
  // Remove the # symbol if present
  hex = hex.replace(/^#/, '');

  // Parse the hex string into RGB values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
}

export function hexToRGBString(hex: string): string {
  const rgb = hexToRGB(hex);
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

// Function to find the closest color name based on RGB values
export function findClosestColorName(rgb: [number, number, number]): string | null {
  let minDistance = Infinity;
  let closestColorName: string | null = null;

  // Iterate over each color name and find the closest match
  Object.entries(colorName).forEach(([name, value]) => {
    const distance = calculateDistance(rgb, value);
    if (distance < minDistance) {
      minDistance = distance;
      closestColorName = name;
    }
  });

  return closestColorName;
}

// Function to calculate the Euclidean distance between two colors
export function calculateDistance(color1: [number, number, number], color2: [number, number, number]): number {
  const [r1, g1, b1] = color1;
  const [r2, g2, b2] = color2;

  return Math.sqrt((r2 - r1) ** 2 + (g2 - g1) ** 2 + (b2 - b1) ** 2);
}
