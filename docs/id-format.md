# ID Format Specification

## Structure

IDs are numeric codes with hierarchical structure:

| Level | Digits | Example | Description |
|-------|--------|---------|-------------|
| Division | 2 | `10` | Dhaka |
| District | 3 | `104` | Dhaka District |
| Subdistrict | 5 | `1041` | Dhamrai |
| Local Area | 7 | `104101` | Ward 1 |

## ID Components

- **Position 1-2**: Division code
- **Position 3**: District code within division
- **Position 4-5**: Subdistrict code within district
- **Position 6-7**: Local area code within subdistrict

## Validation Rules

- Must be positive integers
- Division: 2 digits
- District: 3 digits
- Subdistrict: 5 digits
- Local Area: 7 digits