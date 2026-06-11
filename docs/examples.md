# Code Examples

## Adding a Division

```javascript
// In data/json/divisions.json
{
  "divisions": [
    { "id": 1, "name_en": "Barishal", "name_bn": "বরিশাল" }
  ]
}
```

## Adding a District

```javascript
// In data/json/districts.json
{
  "districts": [
    { "id": 101, "division_id": 1, "name_en": "Barishal", "name_bn": "বরিশাল" }
  ]
}
```

## Adding a SubDistrict

```javascript
// In data/json/subdistricts.json
{
  "subdistricts": [
    { "id": 10101, "district_id": 101, "type": "upazila", "name_en": "Barishal Sadar", "name_bn": "বরিশাল সদর" }
  ]
}
```

## Adding a LocalArea

```javascript
// In data/json/localareas.json
{
  "localareas": [
    { "id": 1010101, "subdistrict_id": 10101, "type": "union", "name_en": "Raypasha-Karapur", "name_bn": "রায়পাশা-কড়াপুর" }
  ]
}
```

## SQL Import

```bash
mysql -u root -p your_database < data/sql/schema.sql
mysql -u root -p your_database -e "source data/sql/seed.sql"
```

## ID Hierarchy Example

Barishal Division (ID: 1)
└── Barishal District (ID: 101)
    └── Barishal Sadar Upazila (ID: 10101)
        └── Raypasha-Karapur Union (ID: 1010101)
        └── Kashipur Union (ID: 1010102)
        └── Charbaria Union (ID: 1010103)