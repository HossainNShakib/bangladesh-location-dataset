# Dataset Structure

## Directory Overview

```
bangladesh-location-dataset/
├── data/
│   ├── json/           # Source of truth JSON files
│   ├── csv/            # CSV exports
│   ├── sql/            # Database schemas and seeds
│   └── javascript/     # JS/ES module exports
├── src/
│   ├── validators/     # Data validation scripts
│   ├── converters/     # Format conversion tools
│   └── utils/          # Helper utilities
└── docs/               # Documentation
```

## Data Hierarchy

1. **Divisions** - Top level (8 divisions)
2. **Districts** - Belong to divisions (64 districts)
3. **Subdistricts** - Belong to districts (~500 upazilas/thanas)
4. **Local Areas** - Belong to subdistricts (~5000 unions/wards)