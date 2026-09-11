import sharp from 'sharp';
import fs from 'fs';

const inputPath = '/Users/cozuna/.gemini/antigravity/brain/c85f6247-3f42-4c9d-9ffd-2a4ea248fc9f/real_design_workspace_1789155297804.jpg';
const outputPath = 'public/assets/images/portfolio-header-bg.webp';

sharp(inputPath)
  .resize(1920, 1080, {
    fit: 'cover',
    position: 'center'
  })
  .webp({ quality: 85 })
  .toFile(outputPath)
  .then(() => {
    console.log("Image successfully converted to 1920x1080 webp");
  })
  .catch(err => {
    console.error("Error converting image:", err);
  });
