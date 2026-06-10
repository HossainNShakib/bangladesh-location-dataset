# Quick Start Guide - Bangladesh Location Dataset

## ⚡ 30-Second Setup

### For JavaScript Projects

1. Copy `data/javascript/` to your project
2. Import:
```javascript
import { divisions, districts, subdistricts, localareas } from './data/javascript/index.js';

// Use immediately
console.log(divisions);
```

### For Database Projects

1. Copy `data/sql/` files
2. Load schema:
```sql
SOURCE data/sql/schema.sql;
SOURCE data/sql/seed.sql;
```

### For Data Analysis

1. Copy `data/csv/` files
2. Load in Python:
```python
import pandas as pd
df = pd.read_csv('districts.csv')
```

## 🎯 Common Tasks

### Get all districts in a division
```javascript
const divisionId = 1;
const dists = districts.filter(d => d.division_id === divisionId);
```

### Get full address hierarchy
```javascript
const localArea = localareas.find(l => l.id === 1010101);
const subDistrict = subdistricts.find(s => s.id === localArea.subdistrict_id);
const district = districts.find(d => d.id === subDistrict.district_id);
const division = divisions.find(d => d.id === district.division_id);

console.log(`${localArea.name_en}, ${subDistrict.name_en}, ${district.name_en}, ${division.name_en}`);
```

### Populate dropdown
```javascript
const select = document.getElementById('division');
divisions.forEach(div => {
  const option = document.createElement('option');
  option.value = div.id;
  option.textContent = div.name_en;
  select.appendChild(option);
});
```

### Validate address
```javascript
function isValidAddress(divisionId, districtId, subDistrictId, localAreaId) {
  return divisions.some(d => d.id === divisionId) &&
         districts.some(d => d.id === districtId && d.division_id === divisionId) &&
         subdistricts.some(s => s.id === subDistrictId && s.district_id === districtId) &&
         localareas.some(l => l.id === localAreaId && l.subdistrict_id === subDistrictId);
}

const valid = isValidAddress(1, 101, 10101, 1010101);
```

## 📁 Files You Need

### For Frontend
- `data/javascript/index.js` (All data in one file)
- `data/json/nested.json` (For hierarchical rendering)

### For Backend/API
- `data/json/divisions.json`
- `data/json/districts.json`
- `data/json/subdistricts.json`
- `data/json/localareas.json`

### For Database
- `data/sql/schema.sql`
- `data/sql/seed.sql`

### For Spreadsheets
- `data/csv/` (All CSV files)

## 🔗 File Relationships

```
Division (id=1)
    ↓
Districts with division_id=1
    ↓
SubDistricts with matching district_id
    ↓
LocalAreas with matching subdistrict_id
```

## 🆔 ID Pattern Quick Reference

| What | ID Length | Example |
|------|-----------|---------|
| Division | 1 digit | `1` |
| District | 3 digits | `101` |
| SubDistrict | 5 digits | `10101` |
| LocalArea | 7 digits | `1010101` |

**Tip**: Length tells you the level! Remove last 2 digits to get parent ID.

## 💾 Sample Data Included

✅ Division: Barishal (1)
✅ Districts: 4 (Barishal, Patuakhali, Bhola, Jhalokati)
✅ SubDistricts: 12
✅ LocalAreas: 6

## 🚀 Next: Full Documentation

- Read `README.md` for complete overview
- Check `usage.md` for detailed examples
- See `examples.md` for code samples
- Review `id-format.md` for ID reference
- Study `structure.md` for data model

## 📖 Quick Links

- Main README: `README.md`
- Usage Guide: `usage.md`
- Code Examples: `examples.md`
- ID Format: `id-format.md`
- Data Structure: `structure.md`
- Validation: Run `npm run validate`

## 🆘 Help

**Question**: How do I import this?
**Answer**: Choose your format:
- JavaScript: Import from `data/javascript/index.js`
- Database: Use `data/sql/schema.sql` + `seed.sql`
- Spreadsheet: Use `data/csv/` files

**Question**: What's included?
**Answer**: Barishal Division (sample data). Full Bangladesh dataset coming soon.

**Question**: Can I use this in production?
**Answer**: Yes! The data is validated and clean. Use freely for any project.

---

**Need More Help?** Check `PROJECT_SUMMARY.md` for complete project details.
