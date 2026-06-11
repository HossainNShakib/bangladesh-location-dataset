# Dataset Structure

## Directory Overview

```
bangladesh-location-dataset/
├── data/
│   ├── json/           # Source of truth JSON files (recommended for imports)
│   ├── divisions/      # Division-wise mirror for browsing/editing
│   ├── csv/             # CSV exports
│   ├── sql/             # Database schemas and seeds
│   └── javascript/     # JS/ES module exports
├── src/
│   ├── validators/      # Data validation scripts
│   ├── converters/     # Format conversion tools
│   └── utils/          # Helper utilities
└── docs/                # Documentation
```

## Data Hierarchy

1. **Divisions** - Top level (8 divisions)
2. **Districts** - Belong to divisions (64 districts)
3. **Subdistricts** - Belong to districts (~500 upazilas/thanas)
4. **Local Areas** - Belong to subdistricts (~5000 unions/wards)

## Coverage Status

| Division | Districts | Subdistricts | LocalAreas | Status |
|----------|-----------|--------------|-------------|--------|
| Barishal (1) | 6 | 42 | 345 | ✅ Complete |
| Chattogram (2) | - | - | - | In Progress |
| Dhaka (3) | - | - | - | In Progress |
| Khulna (4) | - | - | - | In Progress |
| Mymensingh (5) | - | - | - | In Progress |
| Rajshahi (6) | - | - | - | In Progress |
| Rangpur (7) | - | - | - | In Progress |
| Sylhet (8) | - | - | - | In Progress |

**Total**: 6 districts, 42 subdistricts, 345 localareas (Barishal Division only)

## Data Storage Strategy

### Flat Files (Recommended for Direct Imports)

Location: `data/json/`

These are the **source of truth** files. Use these for:
- Direct imports in code
- Loading all data at once
- Building applications that need full dataset

Files:
- `divisions.json` - All divisions
- `districts.json` - All districts
- `subdistricts.json` - All subdistricts
- `localareas.json` - All local areas
- `nested.json` - Full hierarchical structure

### Division Folders (Recommended for Browsing/Editing)

Location: `data/divisions/{division-slug}/`

Use these for:
- Browsing one division at a time
- Editing division-specific data
- Loading partial data on demand

Structure:
```
data/divisions/
├── barishal/
│   ├── districts.json
│   ├── subdistricts.json
│   ├── localareas.json
│   └── nested.json
├── chattogram/
├── dhaka/
├── khulna/
├── mymensingh/
├── rajshahi/
├── rangpur/
└── sylhet/
```

## Building Division Files

Run the build script to regenerate division-wise files from flat JSON:

```bash
npm run build:divisions
```

This script:
1. Reads flat JSON files from `data/json/`
2. Splits data by `division_id`
3. Writes division-wise files into `data/divisions/{slug}/`
4. Builds `nested.json` per division

## Data Flow

```
data/json/ (source of truth)
    ↓
npm run build:divisions
    ↓
data/divisions/ (derived, browsable)
```

The flat JSON files are the authoritative source. Division folders are a convenient mirror for division-specific work.