// Data Validation Script for Bangladesh Location Dataset

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataJsonDir = path.join(__dirname, '../../data/json');

try {
  const divisionsJson = JSON.parse(fs.readFileSync(path.join(dataJsonDir, 'divisions.json'), 'utf8')).divisions || [];
  const districtsJson = JSON.parse(fs.readFileSync(path.join(dataJsonDir, 'districts.json'), 'utf8')).districts || [];
  const subdistrictsJson = JSON.parse(fs.readFileSync(path.join(dataJsonDir, 'subdistricts.json'), 'utf8')).subdistricts || [];
  const localareasJson = JSON.parse(fs.readFileSync(path.join(dataJsonDir, 'localareas.json'), 'utf8')).localareas || [];

  const errors = [];
  const warnings = [];

  // Create sets for ID lookups
  const divisionIds = new Set(divisionsJson.map(d => d.id));
  const districtIds = new Set(districtsJson.map(d => d.id));
  const subdistrictIds = new Set(subdistrictsJson.map(s => s.id));
  const localareaIds = new Set(localareasJson.map(l => l.id));

  // Validate Divisions
  divisionsJson.forEach(div => {
    if (!div.id) errors.push(`Division missing ID: ${JSON.stringify(div)}`);
    if (!div.name_en || div.name_en.trim() === '') errors.push(`Division ${div.id} missing English name`);
    if (!div.name_bn || div.name_bn.trim() === '') errors.push(`Division ${div.id} missing Bengali name`);
  });

  // Validate Districts
  districtsJson.forEach(dist => {
    if (!dist.id) errors.push(`District missing ID: ${JSON.stringify(dist)}`);
    if (!dist.division_id) errors.push(`District ${dist.id} missing division_id`);
    if (!divisionIds.has(dist.division_id)) {
      errors.push(`District ${dist.id} references non-existent division ${dist.division_id}`);
    }
    if (!dist.name_en || dist.name_en.trim() === '') errors.push(`District ${dist.id} missing English name`);
    if (!dist.name_bn || dist.name_bn.trim() === '') errors.push(`District ${dist.id} missing Bengali name`);
  });

  // Validate SubDistricts
  subdistrictsJson.forEach(sub => {
    if (!sub.id) errors.push(`SubDistrict missing ID: ${JSON.stringify(sub)}`);
    if (!sub.district_id) errors.push(`SubDistrict ${sub.id} missing district_id`);
    if (!districtIds.has(sub.district_id)) {
      errors.push(`SubDistrict ${sub.id} references non-existent district ${sub.district_id}`);
    }
    if (!['upazila', 'thana'].includes(sub.type)) {
      errors.push(`SubDistrict ${sub.id} has invalid type: ${sub.type} (must be 'upazila' or 'thana')`);
    }
    if (!sub.name_en || sub.name_en.trim() === '') errors.push(`SubDistrict ${sub.id} missing English name`);
    if (!sub.name_bn || sub.name_bn.trim() === '') errors.push(`SubDistrict ${sub.id} missing Bengali name`);
  });

  // Validate LocalAreas
  localareasJson.forEach(loc => {
    if (!loc.id) errors.push(`LocalArea missing ID: ${JSON.stringify(loc)}`);
    if (!loc.subdistrict_id) errors.push(`LocalArea ${loc.id} missing subdistrict_id`);
    if (!subdistrictIds.has(loc.subdistrict_id)) {
      errors.push(`LocalArea ${loc.id} references non-existent subdistrict ${loc.subdistrict_id}`);
    }
    if (!['union', 'ward'].includes(loc.type)) {
      errors.push(`LocalArea ${loc.id} has invalid type: ${loc.type} (must be 'union' or 'ward')`);
    }
    if (!loc.name_en || loc.name_en.trim() === '') errors.push(`LocalArea ${loc.id} missing English name`);
    if (!loc.name_bn || loc.name_bn.trim() === '') errors.push(`LocalArea ${loc.id} missing Bengali name`);
  });

  // Check for duplicate IDs
  const allIds = [...divisionsJson.map(d => d.id), ...districtsJson.map(d => d.id), 
                   ...subdistrictsJson.map(s => s.id), ...localareasJson.map(l => l.id)];
  const duplicates = allIds.filter((id, idx) => allIds.indexOf(id) !== idx);
  if (duplicates.length > 0) {
    errors.push(`Duplicate IDs found: ${[...new Set(duplicates)].join(', ')}`);
  }

  // Summary
  console.log('\n📊 Bangladesh Location Dataset - Validation Report');
  console.log('='.repeat(50));
  console.log(`Total Divisions: ${divisionsJson.length}`);
  console.log(`Total Districts: ${districtsJson.length}`);
  console.log(`Total SubDistricts: ${subdistrictsJson.length}`);
  console.log(`Total LocalAreas: ${localareasJson.length}`);

  if (errors.length === 0 && warnings.length === 0) {
    console.log('\n✅ All validation checks passed!\n');
    process.exit(0);
  } else {
    if (errors.length > 0) {
      console.log(`\n❌ Errors (${errors.length}):`);
      errors.forEach((err, idx) => console.log(`   ${idx + 1}. ${err}`));
    }
    if (warnings.length > 0) {
      console.log(`\n⚠️  Warnings (${warnings.length}):`);
      warnings.forEach((warn, idx) => console.log(`   ${idx + 1}. ${warn}`));
    }
    console.log('');
    process.exit(errors.length > 0 ? 1 : 0);
  }
} catch (error) {
  console.error('❌ Validation error:', error.message);
  process.exit(1);
}
