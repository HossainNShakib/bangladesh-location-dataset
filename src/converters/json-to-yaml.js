// JSON to YAML Converter

import fs from 'fs';
import path from 'path';

const basePath = path.join(process.cwd(), 'data');
const jsonDir = path.join(basePath, 'json');
const yamlDir = path.join(basePath, 'yaml');

function toYaml(data, indent = 0) {
  if (Array.isArray(data)) {
    if (data.length === 0) return '[]';
    return '\n' + data.map(item => toYaml(item, indent + 2)).join('\n');
  }
  if (typeof data === 'object' && data !== null) {
    const entries = Object.entries(data);
    if (entries.length === 0) return '{}';
    return entries.map(([k, v]) => `${' '.repeat(indent)}${k}: ${toYaml(v, indent + 2)}`).join('\n');
  }
  if (typeof data === 'string') return `"${data}"`;
  return String(data);
}

const conversions = [
  { json: 'divisions.json', yaml: 'divisions.yaml', key: 'divisions' },
  { json: 'districts.json', yaml: 'districts.yaml', key: 'districts' },
  { json: 'subdistricts.json', yaml: 'subdistricts.yaml', key: 'subdistricts' },
  { json: 'localareas.json', yaml: 'localareas.yaml', key: 'localareas' },
  { json: 'nested.json', yaml: 'nested.yaml', key: null }
];

conversions.forEach(({ json, yaml, key }) => {
  const data = JSON.parse(fs.readFileSync(path.join(jsonDir, json), 'utf8'));
  const content = key ? `${key}: ${toYaml(data[key])}` : toYaml(data);
  fs.writeFileSync(path.join(yamlDir, yaml), content);
  console.log(`Converted ${json} -> ${yaml}`);
});