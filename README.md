# Bangladesh Location Dataset

A clean, reusable, developer-friendly dataset containing Bangladesh's administrative divisions with support for multiple formats.

## Overview

This dataset provides a structured hierarchy of Bangladesh's administrative divisions:
- **Division** (বিভাগ) - 1 level
- **District** (জেলা) - 64 districts  
- **SubDistrict** (উপজেলা/থানা) - Subdivisions within districts
- **LocalArea** (ইউনিয়ন/ওয়ার্ড) - Smallest administrative units

## Who Can Use This?

- E-commerce platforms (shipping, address forms)
- SaaS applications (user registration, location-based services)
- CRM systems (customer management)
- ERP systems (logistics, inventory)
- Courier services (delivery zones)
- Form builders (location dropdown fields)
- General software projects (location selection)

## Data Formats

### JSON
- `divisions.json` - All divisions
- `districts.json` - All districts  
- `subdistricts.json` - All subdistricts (upazila/thana)
- `localareas.json` - All local areas (union/ward)
- `nested.json` - Full hierarchical structure

### CSV
- `divisions.csv` - Flat format for spreadsheets
- `districts.csv`
- `subdistricts.csv`
- `localareas.csv`

### SQL
- `schema.sql` - PostgreSQL/MySQL table definitions with foreign keys
- `seed.sql` - Data insert statements
- `mysql.sql` - MySQL-specific setup

### JavaScript
- CommonJS and ES Module exports
- Ready to import in Node.js, browser bundlers

## ID Format

IDs follow a hierarchical pattern for easy navigation:

- **Division ID**: Single digit (1, 2, 3...)
- **District ID**: DivisionID + 2 digits (101, 102...)
- **SubDistrict ID**: DistrictID + 2 digits (10101, 10102...)
- **LocalArea ID**: SubDistrictID + 2 digits (1010101, 1010102...)

Example: Kashipur Union
- Kashipur ID: 1010101
- Parent SubDistrict: 10101 (Barishal Sadar)
- Parent District: 101 (Barishal)
- Parent Division: 1 (Barishal)

## Data Hierarchy

```
Division
├── District
│   ├── SubDistrict (type: upazila or thana)
│   │   └── LocalArea (type: union or ward)
```

### SubDistrict Types
- `upazila` - Modern administrative subdivision
- `thana` - Police station area (older administrative term)

### LocalArea Types
- `union` - Union level (rural areas)
- `ward` - Ward level (urban areas)

## Usage Examples

### JSON Usage

```javascript
import { divisions, districts, subdistricts, localareas, nested } from './data/javascript/index.js';

// Find a division
const barishal = divisions.find(d => d.id === 1);

// Find districts in Barishal
const barishalDistricts = districts.filter(d => d.division_id === 1);

// Get hierarchical structure
const fullData = nested;
const barishalFull = fullData.find(d => d.id === 1);
```

### CSV Usage

Import CSV files directly into:
- Excel / Google Sheets
- Database import tools
- Data analysis tools (Pandas, R)
- Custom scripts

### SQL Usage

```sql
-- Create tables
SOURCE schema.sql;

-- Load sample data
SOURCE seed.sql;

-- Query example
SELECT d.name_en, dist.name_en, sub.name_en, loc.name_en
FROM divisions d
JOIN districts dist ON d.id = dist.division_id
JOIN subdistricts sub ON dist.id = sub.district_id
JOIN localareas loc ON sub.id = loc.subdistrict_id
WHERE d.id = 1 AND dist.id = 101;
```

### JavaScript Usage

```javascript
// CommonJS
const { divisions, districts } = require('./data/javascript/index.js');

// ES Modules
import { divisions, districts } from './data/javascript/index.js';

// React / Vue
import { nested as locations } from './data/javascript/index.js';

const divisionOptions = divisions.map(d => ({
  value: d.id,
  label: d.name_en
}));
```

## Directory Structure

```
bangladesh-location-dataset/
├── README.md                        # This file
├── LICENSE                          # MIT License
├── package.json                     # NPM package info
├── data/
│   ├── json/                        # Source of truth (recommended for imports)
│   │   ├── divisions.json          # Division list
│   │   ├── districts.json          # District list
│   │   ├── subdistricts.json       # SubDistrict list
│   │   ├── localareas.json         # LocalArea list
│   │   └── nested.json             # Full hierarchy
│   ├── divisions/                   # Division-wise mirror (recommended for browsing)
│   │   ├── barishal/               # Barishal Division data
│   │   │   ├── districts.json
│   │   │   ├── subdistricts.json
│   │   │   ├── localareas.json
│   │   │   └── nested.json
│   │   ├── chattogram/
│   │   ├── dhaka/
│   │   ├── khulna/
│   │   ├── mymensingh/
│   │   ├── rajshahi/
│   │   ├── rangpur/
│   │   └── sylhet/
│   ├── csv/
│   │   ├── divisions.csv           # CSV format
│   │   ├── districts.csv
│   │   ├── subdistricts.csv
│   │   └── localareas.csv
│   ├── sql/
│   │   ├── schema.sql              # Table definitions
│   │   ├── seed.sql                # Data inserts
│   │   └── mysql.sql               # MySQL variant
│   └── javascript/
│       ├── divisions.js
│       ├── districts.js
│       ├── subdistricts.js
│       ├── localareas.js
│       └── index.js                # Main export
├── src/
│   ├── validators/
│   │   └── validate-data.js        # Data integrity checks
│   ├── converters/
│   │   ├── build-nested.js         # Build nested structure
│   │   ├── build-division-files.js # Build division-wise files
│   │   ├── json-to-csv.js          # JSON → CSV
│   │   ├── json-to-sql.js          # JSON → SQL
│   │   └── ...
│   └── utils/
│       └── id-helper.js            # ID utilities
└── docs/
    ├── structure.md                # Data structure docs
    ├── id-format.md               # ID format guide
    ├── usage.md                   # Detailed usage guide
    └── examples.md                # Code examples
```

### Data Storage Strategy

**Flat Files** (`data/json/`) - Recommended for direct imports
- JSON source of truth
- Best for: applications needing full dataset, direct imports

**Division Folders** (`data/divisions/{slug}/`) - Recommended for browsing/editing
- Derived from flat files
- Best for: viewing one division, editing division data, partial data loading

Use `npm run build:divisions` to regenerate division files from flat JSON.

## Installation

### NPM
```bash
npm install bangladesh-location-dataset
```

### Manual
Download the repository and use the files directly in your project.

## Data Validation

Run validation to ensure data integrity:
```bash
npm run validate
```

Checks performed:
- Unique IDs across all levels
- Parent IDs exist in parent collections
- Type values are valid (upazila, thana, union, ward)
- No empty name_bn or name_en fields
- Hierarchy relationships are correct

## Build All Formats

Generate all output formats from source JSON:
```bash
npm run build
```

This generates:
- CSV files from JSON
- SQL files from JSON
- Nested hierarchy structure

## Contributing

Contributions welcome! Please ensure:
- IDs follow the hierarchical pattern
- Both Bengali (`name_bn`) and English (`name_en`) names are provided
- Valid type values are used
- Data passes validation
- Changes are in a feature branch with clear commit messages

## License

MIT - See LICENSE file for details

## Coverage Status

### Completed Divisions

| Division | Districts | Subdistricts | LocalAreas |
|----------|----------|--------------|------------|
| **Barishal** (1) | 6 | 42 | 345 |
| Chattogram (2) | - | - | - |
| Dhaka (3) | - | - | - |
| Khulna (4) | - | - | - |
| Mymensingh (5) | - | - | - |
| Rajshahi (6) | - | - | - |
| Rangpur (7) | - | - | - |
| Sylhet (8) | - | - | - |

### Barishal Division Details

- **6 Districts**: Barishal, Patuakhali, Bhola, Pirojpur, Barguna, Jhalokathi
- **42 Subdistricts**: All type `upazila`
- **345 LocalAreas**: All type `union`

### In Progress

Remaining 7 divisions (Chattogram, Dhaka, Khulna, Mymensingh, Rajshahi, Rangpur, Sylhet) contain structure only. Full data coming soon.

## Support

For issues, questions, or contributions:
- Open an issue on the repository
- Check existing documentation
- Review code examples in `/docs`

---

**Last Updated**: 2026-06-11
**Status**: Barishal Division complete (345 localareas)
**Format Version**: 1.0
