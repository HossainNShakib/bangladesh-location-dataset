// JSON to TypeScript Converter

import fs from 'fs';
import path from 'path';

const basePath = path.join(process.cwd(), 'data');
const jsonDir = path.join(basePath, 'json');
const tsDir = path.join(basePath, 'typescript');

const conversions = [
  {
    json: 'divisions.json',
    ts: 'divisions.ts',
    type: 'Division',
    fields: ['id', 'name_en', 'name_bn']
  },
  {
    json: 'districts.json',
    ts: 'districts.ts',
    type: 'District',
    fields: ['id', 'division_id', 'name_en', 'name_bn']
  },
  {
    json: 'subdistricts.json',
    ts: 'subdistricts.ts',
    type: 'Subdistrict',
    fields: ['id', 'district_id', 'type', 'name_en', 'name_bn']
  },
  {
    json: 'localareas.json',
    ts: 'localareas.ts',
    type: 'LocalArea',
    fields: ['id', 'subdistrict_id', 'type', 'name_en', 'name_bn']
  }
];

conversions.forEach(({ json, ts, type, fields }) => {
  const data = JSON.parse(fs.readFileSync(path.join(jsonDir, json), 'utf8'));
  const key = Object.keys(data)[0];
  const items = data[key];

  const content = `// Auto-generated from ${json}
import type { ${type} } from './types.js';

export const ${key}: ${type}[] = ${JSON.stringify(items, null, 2)};
`;
  fs.writeFileSync(path.join(tsDir, ts), content);
  console.log(`Converted ${json} -> ${ts}`);
});