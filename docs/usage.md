# Usage Guide

## Installation

```bash
npm install
```

## Validating Data

```bash
node src/validators/validate-data.js
```

## Converting Formats

### JSON to CSV
```bash
node src/converters/json-to-csv.js
```

### JSON to SQL
```bash
node src/converters/json-to-sql.js
```

### Build Nested JSON
```bash
node src/converters/build-nested.js
```

## Using in Code

```javascript
import { divisions, districts } from './data/javascript/index.js';
```