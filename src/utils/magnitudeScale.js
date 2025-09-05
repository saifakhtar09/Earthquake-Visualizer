// src/utils/magnitudeScale.js
export const magnitudeRanges = [
  { label: "Minor (0-2.5)", min: 0, max: 2.5, color: "#22C55E" },   // green
  { label: "Light (2.5-4.5)", min: 2.5, max: 4.5, color: "#EAB308" }, // yellow
  { label: "Moderate (4.5-6.0)", min: 4.5, max: 6.0, color: "#F97316" }, // orange
  { label: "Strong (6.0+)", min: 6.0, max: 10, color: "#EF4444" },   // red
];

/**
 * Get color based on magnitude
 */
export function getMagnitudeColor(mag) {
  if (mag == null) return "#9CA3AF"; // gray fallback
  const range = magnitudeRanges.find(r => mag >= r.min && mag < r.max);
  return range ? range.color : "#9CA3AF";
}

/**
 * Get label based on magnitude
 */
export function getMagnitudeLabel(mag) {
  const range = magnitudeRanges.find(r => mag >= r.min && mag < r.max);
  return range ? range.label : "Unknown";
}
