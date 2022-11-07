const names = [
  "elyse",
  "kristy",
  "lena",
  "lindsay",
  "mark",
  "matthew",
  "molly",
  "patrick",
  "rachel",
];

export const getRandomAvatarThumbnailUrl = (size = "large") => {
  const name = names[Math.floor(Math.random() * names.length)];
  return `https://semantic-ui.com/images/avatar2/${size}/${name}.png`;
};
