import fs from 'fs';

let content = fs.readFileSync('src/pages/about.astro', 'utf-8');

// Remove What I Bring and its block
const whatIBringRegex = /<h3[^>]*>What I Bring:<\/h3>\s*\{aboutData\.whatIBring && aboutData\.whatIBring\.length > 0 && \(\s*<ul[^>]*>\s*\{aboutData\.whatIBring\.map\(item => \(\s*<li[^>]*>\{item\}<\/li>\s*\)\)\}\s*<\/ul>\s*\)\}/;
content = content.replace(whatIBringRegex, '');

// Remove My Approach heading
const myApproachRegex = /<h3[^>]*>My Approach:<\/h3>/;
content = content.replace(myApproachRegex, '');

fs.writeFileSync('src/pages/about.astro', content);
