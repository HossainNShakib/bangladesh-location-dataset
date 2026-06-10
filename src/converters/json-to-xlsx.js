// JSON to XLSX Converter

import fs from 'fs';
import path from 'path';
import { writeFileSync } from 'xlsx';

const basePath = path.join(process.cwd(), 'data');
const jsonDir = path.join(basePath, 'json');
const xlsxDir = path.join(basePath, 'xlsx');

const sheets = [
  { json: 'divisions.json', key: 'divisions', headers: ['id', 'name_en', 'name_bn'] },
  { json: 'districts.json', key: 'districts', headers: ['id', 'division_id', 'name_en', 'name_bn'] },
  { json: 'subdistricts.json', key: 'subdistricts', headers: ['id', 'district_id', 'type', 'name_en', 'name_bn'] },
  { json: 'localareas.json', key: 'localareas', headers: ['id', 'subdistrict_id', 'type', 'name_en', 'name_bn'] }
];

const workbook = { SheetNames: [], Sheets: {} };

sheets.forEach(({ json, key, headers }) => {
  const data = JSON.parse(fs.readFileSync(path.join(jsonDir, json), 'utf8'));
  const items = data[key];

  const sheetData = [headers, ...items.map(item => headers.map(h => item[h]))];
  workbook.SheetNames.push(key.charAt(0).toUpperCase() + key.slice(1));
  workbook.Sheets[key.charAt(0).toUpperCase() + key.slice(1)] = sheetData;
});

const xlsxPath = path.join(xlsxDir, 'bangladesh-location-dataset.xlsx');
writeFileSync(xlsxPath, workbook);
console.log(`Created ${xlsxPath}`);