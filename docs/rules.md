# Bangladesh Location Dataset — Data Entry Rules

## Hierarchy

Division → District → SubDistrict → LocalArea

- SubDistrict types: `upazila`, `thana`
- LocalArea types: `union`, `ward`

## ID Rules

| Level | Pattern | Example |
|-------|---------|---------|
| Division | `N` | `1`, `2`, `3` |
| District | `Nnn` | `101`, `102`, `103` |
| SubDistrict | `NnnNN` | `10101`, `10102` |
| LocalArea | `NnnNNnn` | `1010101`, `1010102` |

IDs must never change after release.

## Naming Rules

- **Bangla**: Use official spelling (e.g., পটুয়াখালী, not পটুয়াখালী)
- **English**: Use common official transliteration (e.g., Barishal, not Barisal)
- One location = one name only

## Required Fields

| Level | Fields |
|-------|--------|
| Division | `id`, `name_bn`, `name_en` |
| District | `id`, `division_id`, `name_bn`, `name_en` |
| SubDistrict | `id`, `district_id`, `type`, `name_bn`, `name_en` |
| LocalArea | `id`, `subdistrict_id`, `type`, `name_bn`, `name_en` |

## Uniqueness Rules

Within the same parent:
- No duplicate IDs
- No duplicate `name_bn`
- No duplicate `name_en`

## Source Rules

Trusted sources only:
- Bangladesh Bureau of Statistics (BBS)
- Local Government Division
- Bangladesh Government sources
- Official district administration sources

## Review Checklist

Before release:
- [ ] Correct hierarchy
- [ ] Correct parent ID references
- [ ] Correct spelling (Bn/En)
- [ ] No duplicate IDs
- [ ] No duplicate names
- [ ] All required fields present
- [ ] Valid type values
- [ ] Run `npm run validate`