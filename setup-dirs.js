const fs = require('fs');
const path = require('path');

const baseDir = 'g:\\bld\\bangladesh-location-dataset';

// Create all directories
const dirs = [
  baseDir,
  path.join(baseDir, 'data'),
  path.join(baseDir, 'data', 'json'),
  path.join(baseDir, 'data', 'csv'),
  path.join(baseDir, 'data', 'sql'),
  path.join(baseDir, 'data', 'javascript'),
  path.join(baseDir, 'src'),
  path.join(baseDir, 'src', 'validators'),
  path.join(baseDir, 'src', 'converters'),
  path.join(baseDir, 'src', 'utils'),
  path.join(baseDir, 'docs'),
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created: ${dir}`);
  }
});

console.log('All directories created successfully!');
