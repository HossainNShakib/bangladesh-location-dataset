// Build Nested JSON Structure

import fs from 'fs';
import path from 'path';

export function buildNested() {
  const jsonDir = path.join(process.cwd(), 'data', 'json');
  
  const divisions = JSON.parse(fs.readFileSync(path.join(jsonDir, 'divisions.json'), 'utf8')).divisions;
  const districts = JSON.parse(fs.readFileSync(path.join(jsonDir, 'districts.json'), 'utf8')).districts;
  const subdistricts = JSON.parse(fs.readFileSync(path.join(jsonDir, 'subdistricts.json'), 'utf8')).subdistricts;
  const localareas = JSON.parse(fs.readFileSync(path.join(jsonDir, 'localareas.json'), 'utf8')).localareas;

  const nested = divisions.map(div => ({
    ...div,
    districts: districts
      .filter(d => d.division_id === div.id)
      .map(dist => ({
        ...dist,
        subdistricts: subdistricts
          .filter(s => s.district_id === dist.id)
          .map(sub => ({
            ...sub,
            localareas: localareas.filter(l => l.subdistrict_id === sub.id)
          }))
      }))
  }));

  fs.writeFileSync(path.join(jsonDir, 'nested.json'), JSON.stringify(nested, null, 2));
  console.log('Nested JSON built');
}