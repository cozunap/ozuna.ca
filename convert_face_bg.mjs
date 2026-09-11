import sharp from 'sharp';

const inputPath = '/Users/cozuna/.gemini/antigravity/brain/c85f6247-3f42-4c9d-9ffd-2a4ea248fc9f/.user_uploaded/media_1789155345111.jpg';
const outputPath = 'public/assets/images/portfolio-header-bg.webp';

sharp(inputPath)
  .resize(1920, 1080, {
    fit: 'cover',
    position: sharp.strategy.attention // Focuses the crop on the face
  })
  .webp({ quality: 85 })
  .toFile(outputPath)
  .then(() => {
    console.log("Image successfully converted to 1920x1080 webp with face-centered crop.");
  })
  .catch(err => {
    console.error("Error converting image:", err);
  });
