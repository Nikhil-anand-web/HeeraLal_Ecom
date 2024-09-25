const fs = require('fs');
const path = require('path');


export default function savePdfFile(byteArray, absolutePath) {
   
    if (!path.isAbsolute(absolutePath)) {
        throw new Error('Please provide an absolute path.');
    }


    const buffer = Buffer.from(byteArray);

  
    fs.writeFile(absolutePath, buffer, (err) => {
        if (err) {
            console.error('Error saving PDF file:', err);
        } else {
            console.log(`PDF file has been saved at: ${absolutePath}`);
        }
    });
}
