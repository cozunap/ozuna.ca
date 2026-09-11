import sharp from 'sharp';
import fs from 'fs';

const inputPath = 'public/assets/images/portfolio-header-bg.jpg';
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
    fs.unlinkSync(inputPath);
  })
  .catch(err => {
    console.error("Error converting image:", err);
  });
