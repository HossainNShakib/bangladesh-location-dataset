# Code Examples

## Adding a Division

```javascript
// In data/json/divisions.json
{
  "divisions": [
    { "id": 10, "name_en": "Dhaka", "name_bn": "ঢাকা" }
  ]
}
```

## Adding a District

```javascript
// In data/json/districts.json
{
  "districts": [
    { "id": 101, "division_id": 10, "name_en": "Dhaka", "name_bn": "ঢাকা" }
  ]
}
```

## SQL Import

```bash
mysql -u root -p your_database < data/sql/schema.sql
mysql -u root -p your_database -e "source data/sql/seed.sql"
```