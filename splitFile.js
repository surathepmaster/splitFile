// splitFile.js

const fs = require('fs').promises;

async function splitFile(inputFilePath, outputDirectory, splitSize) {
  try {
    // Open the source file for reading
    const sourceFile = await fs.open(inputFilePath, 'r');
    
    // Create the output directory if it doesn't exist
    try {
      await fs.mkdir(outputDirectory);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }
    
    let partNumber = 1;
    let bytesRead;
    
    while (true) {
      // Read a chunk of data from the source file
      const buffer = Buffer.alloc(splitSize);
      bytesRead = await sourceFile.read(buffer, 0, splitSize);
      
      // If we've reached the end of the file, break the loop
      if (bytesRead === null || bytesRead === 0) {
        break;
      }
      
      // Create a new split part file
      const splitPartPath = `${outputDirectory}/part_${partNumber}.txt`;
      const splitPartFile = await fs.open(splitPartPath, 'w');
      
      // Write the chunk of data to the split part file
      await splitPartFile.write(buffer.slice(0, bytesRead));
      
      // Close the split part file
      await splitPartFile.close();
      
      partNumber++;
    }
    
    // Close the source file
    await sourceFile.close();
    
    console.log(`File split into ${partNumber - 1} parts.`);
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = splitFile;
