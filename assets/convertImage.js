const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = "../assets/images/gallery/portraits";
const outputDir = '../assets/images/gallery-webp/portraits';

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Could not list the directory.', err);
        process.exit(1);
    }

    files.forEach((file, index) => {
        const inputFilePath = path.join(inputDir, file);
        const outputFilePath = path.join(outputDir, file.replace(path.extname(file), '.webp'));

        sharp(inputFilePath)
            .toFormat('webp')
            .toFile(outputFilePath, (err, info) => {
                if (err) {
                    console.error('Error processing file:', file, err);
                } else {
                    console.log('Converted:', file, '->', outputFilePath);
                }
            });
    });
});
