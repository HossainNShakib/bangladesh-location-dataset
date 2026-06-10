// JSON to SQL Converter

import fs from 'fs';
import path from 'path';

export function jsonToSql(data, tableName) {
  const columns = Object.keys(data[0] || {});
  const values = data.map(item => {
    return `(${columns.map(col => {
      const val = item[col];
      if (val === null || val === undefined) return 'NULL';
      if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
      return val;
    }).join(', ')})`;
  }).join(',\n');

  return `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES\n${values};`;
}

export function convertAll() {
  const jsonDir = path.join(process.cwd(), 'data', 'json');
  const sqlFile = path.join(process.cwd(), 'data', 'sql', 'seed.sql');

  const conversions = [
    { key: 'divisions', table: 'divisions' },
    { key: 'districts', table: 'districts' },
    { key: 'subdistricts', table: 'subdistricts' },
    { key: 'localareas', table: 'localareas' }
  ];

  const statements = ['-- Bangladesh Location Dataset - Generated Seed Data'];
  
  conversions.forEach(({ key, table }) => {
    const data = JSON.parse(fs.readFileSync(path.join(jsonDir, `${key}.json`), 'utf8'));
    if (data[key].length > 0) {
      statements.push(jsonToSql(data[key], table));
    }
  });

  fs.writeFileSync(sqlFile, statements.join('\n\n'));
  console.log('SQL seed file generated');
}