const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walk(dirPath, callback);
        } else {
            callback(dirPath);
        }
    });
}

const roundMap = {
    '3xl': 'xl',
    '2xl': 'lg',
    'xl': 'md',
    'lg': 'md',
    'md': 'sm'
};

walk(path.join(__dirname, 'src'), (filePath) => {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Wider layout
    content = content.replace(/max-w-7xl/g, 'max-w-[1400px]');
    
    // 2. Reduce roundness
    content = content.replace(/(?<!-)\brounded-(3xl|2xl|xl|lg|md)\b/g, (match, p1) => `rounded-${roundMap[p1]}`);

    // 3. Smaller Hero Fonts
    content = content.replace(/text-5xl sm:text-7xl md:text-8xl/g, 'text-4xl sm:text-6xl md:text-7xl');
    content = content.replace(/text-xl md:text-2xl/g, 'text-lg md:text-xl');

    // 4. Smaller Section Headings
    content = content.replace(/text-4xl sm:text-5xl/g, 'text-3xl sm:text-4xl');
    content = content.replace(/text-4xl font-extrabold/g, 'text-3xl font-extrabold');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated: ' + filePath);
    }
});
