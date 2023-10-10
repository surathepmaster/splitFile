// main.js

const splitFile = require('./splitFile');

const inputFilePath = 'large_file.txt';
const outputDirectory = 'split_parts';
const splitSize = 1024 * 1024; // 1 MB

splitFile(inputFilePath, outputDirectory, splitSize);
