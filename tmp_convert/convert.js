const fs = require('fs');
const { promisify } = require('util');
const convert = require('heic-convert');

(async () => {
  try {
    const inputBuffer = await promisify(fs.readFile)('C:\\Users\\Alivia\\Downloads\\Bathroom with door open.HEIC');
    const outputBuffer = await convert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 1
    });
    await promisify(fs.writeFile)('C:\\Users\\Alivia\\Projects\\rhipros-site\\public\\images\\projects\\bethlehem-bathroom-refresh\\after\\bathroom-door-open.jpg', outputBuffer);
    console.log('Conversion successful!');
  } catch (err) {
    console.error('Error during conversion:', err);
  }
})();
