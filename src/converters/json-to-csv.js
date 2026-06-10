// JSON to CSV Converter

import fs from 'fs';
import path from 'path';

export function jsonToCsv(jsonData, csvHeaders) {
  const header = csvHeaders.join(',');
  const rows = jsonData.map(item => 
    csvHeaders.map(h => {
      const val = item[h];
      if (val === null || val === undefined) return '';
      if (typeof val === 'string' && (val.includes(',') || val.includes('"'))) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    }).join(',')
  );
  return [header, ...rows].join('\n');
}

export function convertAll() {
  const basePath = path.join(process.cwd(), 'data');
  const jsonDir = path.join(basePath, 'json');
  const csvDir = path.join(basePath, 'csv');

  const files = [
    { json: 'divisions.json', csv: 'divisions.csv', headers: ['id', 'name_en', 'name_bn'] },
    { json: 'districts.json', csv: 'districts.csv', headers: ['id', 'division_id', 'name_en', 'name_bn'] },
    { json: 'subdistricts.json', csv: 'subdistricts.csv', headers: ['id', 'district_id', 'type', 'name_en', 'name_bn'] },
    { json: 'localareas.json', csv: 'localareas.csv', headers: ['id', 'subdistrict_id', 'type', 'name_en', 'name_bn'] }
  ];

  files.forEach(({ json, csv, headers }) => {
    const data = JSON.parse(fs.readFileSync(path.join(jsonDir, json), 'utf8'));
    const key = Object.keys(data)[0];
    const csvContent = jsonToCsv(data[key], headers);
    fs.writeFileSync(path.join(csvDir, csv), csvContent);
    console.log(`Converted ${json} -> ${csv}`);
  });
}