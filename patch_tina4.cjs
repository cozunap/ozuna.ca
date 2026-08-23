const fs = require('fs');

let config = fs.readFileSync('tina/config.ts', 'utf8');

// The bad block was added inside the work collection because of `    ],`
// Let's replace the whole `custom-pages` object if it's there
let badStart = config.indexOf('{name: "custom-pages",');
if (badStart === -1) badStart = config.indexOf('{name:"custom-pages",');
if (badStart === -1) badStart = config.indexOf('name: "custom-pages",');

// It's probably easier to just overwrite the whole file or use regex.
// Wait! Let's just output the exact correct config since it's 300 lines long!
