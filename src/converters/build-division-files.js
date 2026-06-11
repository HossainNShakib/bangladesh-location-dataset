import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const divisionsSlug = {
  1: 'barishal',
  2: 'chittagong',
  3: 'dhaka',
  4: 'khulna',
  5: 'mymensingh',
  6: 'rajshahi',
  7: 'rangpur',
  8: 'sylhet'
};

function readJson(filename) {
  const filePath = path.join(__dirname, '../../data/json', filename);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return null;
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

console.log('Building division-wise files...\n');

const divisionsData = readJson('divisions.json');
const districtsData = readJson('districts.json');
const subdistrictsData = readJson('subdistricts.json');
const localareasData = readJson('localareas.json');

const basePath = path.join(__dirname, '../../data/divisions');

Object.entries(divisionsSlug).forEach(([id, slug]) => {
  const divisionPath = path.join(basePath, slug);
  ensureDir(divisionPath);

  const divisionId = parseInt(id);
  const division = divisionsData?.divisions?.find(d => d.id === divisionId);

  const filteredDistricts = (districtsData?.districts || []).filter(d => d.division_id === divisionId);
  const districtIds = filteredDistricts.map(d => d.id);

  const filteredSubdistricts = (subdistrictsData?.subdistricts || []).filter(s => districtIds.includes(s.district_id));
  const subdistrictIds = filteredSubdistricts.map(s => s.id);

  const filteredLocalareas = (localareasData?.localareas || []).filter(l => subdistrictIds.includes(l.subdistrict_id));

  writeJson(path.join(divisionPath, 'districts.json'), { districts: filteredDistricts });
  writeJson(path.join(divisionPath, 'subdistricts.json'), { subdistricts: filteredSubdistricts });
  writeJson(path.join(divisionPath, 'localareas.json'), { localareas: filteredLocalareas });

  writeJson(path.join(divisionPath, 'nested.json'), {
    division: division || null,
    districts: filteredDistricts,
    subdistricts: filteredSubdistricts,
    localareas: filteredLocalareas
  });

  console.log(`✓ ${slug}/ - districts: ${filteredDistricts.length}, subdistricts: ${filteredSubdistricts.length}, localareas: ${filteredLocalareas.length}`);
});

console.log('\nDivision-wise files built successfully!');