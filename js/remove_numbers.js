const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Regex to remove sequence numbers
const regex = /<div class="(problem|layer|step)-number[^"]*">[^<]+<\/div>/g;
content = content.replace(regex, '');

fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully removed sequence numbers from index.html without corrupting encoding.');
