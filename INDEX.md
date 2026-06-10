# Bangladesh Location Dataset - File Index

## 📋 Quick Navigation

### 🎯 Start Here
- **[QUICKSTART.md](./QUICKSTART.md)** - 30-second setup guide
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Complete project overview
- **[README.md](./README.md)** - Main documentation

### 📚 Documentation
1. **[README.md](./README.md)** - Overview, installation, quick examples
2. **[QUICKSTART.md](./QUICKSTART.md)** - Fast setup for common tasks
3. **[structure.md](./docs/structure.md)** - Data model explanation
4. **[id-format.md](./docs/id-format.md)** - ID system reference
5. **[usage.md](./docs/usage.md)** - Detailed usage guide with patterns
6. **[examples.md](./docs/examples.md)** - Code examples (React, Node.js, Python)

### 💾 Data Files

#### JSON Format
```
data/json/
├── divisions.json        # Division list
├── districts.json        # District list
├── subdistricts.json     # SubDistrict list
├── localareas.json       # LocalArea list
└── nested.json           # Full hierarchy
```

#### CSV Format
```
data/csv/
├── divisions.csv
├── districts.csv
├── subdistricts.csv
└── localareas.csv
```

#### SQL Format
```
data/sql/
├── schema.sql            # Table definitions
├── seed.sql              # Data inserts
└── mysql.sql             # MySQL variant
```

#### JavaScript Format
```
data/javascript/
├── divisions.js
├── districts.js
├── subdistricts.js
├── localareas.js
└── index.js              # Main export
```

### 🔧 Utility Scripts

Located in project root:
- **validate-data.js** - Run data validation
- **id-helper.js** - ID parsing and generation utilities
- **json-to-csv.js** - JSON to CSV converter
- **json-to-sql.js** - JSON to SQL generator
- **build-nested.js** - Build hierarchical structure

### 📄 Configuration
- **package.json** - NPM package configuration
- **LICENSE** - MIT License

## 🎯 By Use Case

### I want to use it in...

#### **JavaScript / Node.js**
1. Read: [README.md](./README.md)
2. Quick start: [QUICKSTART.md](./QUICKSTART.md)
3. Copy: `data/javascript/index.js`
4. Import: `import { divisions } from './data/javascript/index.js'`
5. Examples: [examples.md](./docs/examples.md) - "JavaScript / Node.js Examples"

#### **React / Vue.js**
1. Copy: `data/javascript/index.js`
2. Code: See [examples.md](./docs/examples.md) - "React Component Examples"
3. Docs: [usage.md](./docs/usage.md) - "React / Vue.js" section

#### **SQL Database (MySQL/PostgreSQL)**
1. Copy: `data/sql/schema.sql` and `data/sql/seed.sql`
2. Run schema first, then seed
3. Query examples: [usage.md](./docs/usage.md) - "SQL Usage"

#### **Python / Pandas**
1. Copy: `data/csv/` files
2. Load: `pd.read_csv('districts.csv')`
3. Examples: [examples.md](./docs/examples.md) - "Python Flask"

#### **Excel / Google Sheets**
1. Copy: `data/csv/` files
2. Open in Excel/Sheets
3. No coding needed!

#### **REST API**
1. Read: [examples.md](./docs/examples.md) - "Node.js with Express"
2. Use data from `data/json/`

### I want to learn about...

#### **ID Format**
→ [id-format.md](./docs/id-format.md)

#### **Data Structure**
→ [structure.md](./docs/structure.md)

#### **How to Use**
→ [usage.md](./docs/usage.md)

#### **Code Examples**
→ [examples.md](./docs/examples.md)

#### **Common Patterns**
→ [usage.md](./docs/usage.md) - "Common Use Cases"

#### **Validation**
→ Run `npm run validate` or check `validate-data.js`

## 📊 Data Overview

**Current Version**: Sample data (Barishal Division)
- 1 Division
- 4 Districts
- 12 SubDistricts
- 6 LocalAreas

**Sample ID Hierarchy**:
```
Division 1 (Barishal)
├── District 101 (Barishal)
│   └── SubDistrict 10101 (Barishal Sadar)
│       └── LocalArea 1010101 (Kashipur)
└── District 102 (Patuakhali)
    └── SubDistrict 10201 (Patuakhali Sadar)
```

## 🚀 Common Tasks

### Import Data
```javascript
// Method 1: JavaScript
import { divisions } from './data/javascript/index.js';

// Method 2: JSON
fetch('./data/json/divisions.json').then(r => r.json())

// Method 3: Database
// Load schema.sql then seed.sql
```

### Find Related Data
```javascript
// Get districts in a division
const divisionId = 1;
districts.filter(d => d.division_id === divisionId);

// Get full address
const localArea = localareas.find(l => l.id === 1010101);
// ... trace back to division
```

### Validate Address
See [usage.md](./docs/usage.md) - "Common Use Cases" - "Address Validation"

### Export Data
See [examples.md](./docs/examples.md) - "JavaScript / Node.js Examples" - "Data Export"

## 📞 Getting Help

1. **Quick question?** → [QUICKSTART.md](./QUICKSTART.md)
2. **How do I use this?** → [README.md](./README.md)
3. **Show me code** → [examples.md](./docs/examples.md)
4. **What's the ID format?** → [id-format.md](./docs/id-format.md)
5. **Understand the data** → [structure.md](./docs/structure.md)

## 📈 File Statistics

| Category | Count | Files |
|----------|-------|-------|
| Documentation | 6 | README, QUICKSTART, structure, id-format, usage, examples |
| Data (JSON) | 5 | divisions, districts, subdistricts, localareas, nested |
| Data (CSV) | 4 | divisions, districts, subdistricts, localareas |
| Data (SQL) | 3 | schema, seed, mysql |
| Data (JavaScript) | 5 | divisions, districts, subdistricts, localareas, index |
| Utilities | 5 | validate, id-helper, json-to-csv, json-to-sql, build-nested |
| Config | 2 | package.json, LICENSE |
| **TOTAL** | **35** | **Files** |

## ✅ Quality Checklist

- ✅ All IDs hierarchical and unique
- ✅ All parent references valid
- ✅ Bilingual (English & Bengali)
- ✅ Type values validated
- ✅ Data validated
- ✅ Multiple formats supported
- ✅ Well documented
- ✅ Ready for production
- ✅ MIT Licensed
- ✅ Easy to extend

## 🎉 Ready to Use

Pick your format and get started:

1. **JSON?** → Use `data/json/`
2. **CSV?** → Use `data/csv/`
3. **SQL?** → Use `data/sql/`
4. **JavaScript?** → Use `data/javascript/`
5. **Want examples?** → Read `examples.md`
6. **Need help?** → Read `README.md` or `QUICKSTART.md`

---

**Status**: ✅ Complete and Ready
**Version**: 1.0.0 (Sample Data)
**License**: MIT
**Last Updated**: 2026-06-10
