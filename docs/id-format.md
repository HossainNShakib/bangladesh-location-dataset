# ID Format Specification

## Structure

IDs are numeric codes with hierarchical structure:

| Level | Digits | Example | Description |
|-------|--------|---------|-------------|
| Division | 1 | `1` | Barishal Division |
| District | 3 | `101` | Barishal District |
| SubDistrict | 5 | `10101` | Barishal Sadar Upazila |
| LocalArea | 7 | `1010101` | Raypasha-Karapur Union |

## ID Components

- **Position 1**: Division code (1-8)
- **Position 2-3**: District code within division (01-99)
- **Position 4-5**: SubDistrict code within district (01-99)
- **Position 6-7**: LocalArea code within SubDistrict (01-99)

## ID Pattern

```
Division (N) + District (nn) + SubDistrict (NN) + LocalArea (nn)
     1              01            10              1              = 1010101
```

## Validation Rules

- Must be positive integers
- Division: 1 digit (1-8)
- District: 3 digits (NNN, starts with division ID)
- SubDistrict: 5 digits (NNNNN, starts with district ID)
- LocalArea: 7 digits (NNNNNNN, starts with subdistrict ID)

## Examples

| Level | ID | Name |
|-------|-----|------|
| Division | `1` | Barishal |
| District | `101` | Barishal |
| District | `102` | Patuakhali |
| SubDistrict | `10101` | Barishal Sadar |
| SubDistrict | `10301` | Bhola Sadar |
| LocalArea | `1010101` | Raypasha-Karapur |
| LocalArea | `1010102` | Kashipur |

## ID Immutability

Released IDs must never change. Once a location is published with an ID, that ID remains permanent.