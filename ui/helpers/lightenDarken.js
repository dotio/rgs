export const lightenDarkenColor = (color, amt) => {
  const num = parseInt(color.replace('#', ''), 16)
  const r = (num >> 16) + amt
  const b = ((num >> 8) & 0x00FF) + amt
  const g = (num & 0x0000FF) + amt
  const newColor = g | (b << 8) | (r << 16)
  return `#${newColor.toString(16)}`
}