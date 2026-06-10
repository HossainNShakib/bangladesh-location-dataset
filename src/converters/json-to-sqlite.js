// JSON to SQLite Converter

import fs from 'fs';
import path from 'path';

const basePath = path.join(process.cwd(), 'data');
const jsonDir = path.join(basePath, 'json');
const sqliteDir = path.join(basePath, 'sqlite');

const tables = [
  { key: 'divisions', table: 'divisions', fields: ['id', 'name_en', 'name_bn'] },
  { key: 'districts', table: 'districts', fields: ['id', 'division_id', 'name_en', 'name_bn'] },
  { key: 'subdistricts', table: 'subdistricts', fields: ['id', 'district_id', 'type', 'name_en', 'name_bn'] },
  { key: 'localareas', table: 'localareas', fields: ['id', 'subdistrict_id', 'type', 'name_en', 'name_bn'] }
];

function toSqlValue(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
  return val;
}

const statements = ['-- SQLite Seed Data'];

tables.forEach(({ key, table, fields }) => {
  const data = JSON.parse(fs.readFileSync(path.join(jsonDir, `${key}.json`), 'utf8'));
  const items = data[key];

  if (items.length > 0) {
    const values = items.map(item => `(${fields.map(f => toSqlValue(item[f])).join(', ')})`).join(',\n');
    statements.push(`INSERT INTO ${table} (${fields.join(', ')}) VALUES\n${values};`);
  }
});

fs.writeFileSync(path.join(sqliteDir, 'seed.sql'), statements.join('\n\n'));
console.log('SQLite seed file generated');