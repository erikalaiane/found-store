export function artDataUri(emoji: string, tone: string) {
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">',
    "<defs>",
    '<radialGradient id="g" cx="50%" cy="45%" r="55%">',
    `<stop offset="0" stop-color="${tone}" stop-opacity="0.65"/>`,
    `<stop offset="1" stop-color="${tone}" stop-opacity="0"/>`,
    "</radialGradient>",
    "</defs>",
    '<circle cx="200" cy="200" r="190" fill="url(#g)"/>',
    '<ellipse cx="200" cy="335" rx="95" ry="12" fill="#000" opacity="0.12"/>',
    `<text x="200" y="255" font-size="190" text-anchor="middle" font-family="Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, sans-serif">${emoji}</text>`,
    "</svg>",
  ].join("");

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}