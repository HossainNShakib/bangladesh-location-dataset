// JSON to XML Converter

import fs from 'fs';
import path from 'path';

const basePath = path.join(process.cwd(), 'data');
const jsonDir = path.join(basePath, 'json');
const xmlDir = path.join(basePath, 'xml');

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function itemToXml(item, indent = '  ') {
  return Object.entries(item).map(([k, v]) => {
    return `${indent}<${k}>${escapeXml(v)}</${k}>`;
  }).join('\n');
}

function arrayToXml(arr, tagName, indent = '  ') {
  if (arr.length === 0) return `${indent}<${tagName}/>`;
  return arr.map(item => `${indent}<${tagName}>\n${itemToXml(item, indent + '  ')}\n${indent}</${tagName}>`).join('\n');
}

const conversions = [
  { json: 'divisions.json', xml: 'divisions.xml', key: 'divisions', itemTag: 'division' },
  { json: 'districts.json', xml: 'districts.xml', key: 'districts', itemTag: 'district' },
  { json: 'subdistricts.json', xml: 'subdistricts.xml', key: 'subdistricts', itemTag: 'subdistrict' },
  { json: 'localareas.json', xml: 'localareas.xml', key: 'localareas', itemTag: 'localarea' },
  { json: 'nested.json', xml: 'nested.xml', key: null, itemTag: null }
];

conversions.forEach(({ json, xml, key, itemTag }) => {
  const data = JSON.parse(fs.readFileSync(path.join(jsonDir, json), 'utf8'));
  let content;

  if (key) {
    const items = data[key];
    content = `<?xml version="1.0" encoding="UTF-8"?>\n<data>\n  <${key}>\n${arrayToXml(items, itemTag, '    ')}\n  </${key}>\n</data>`;
  } else {
    content = `<?xml version="1.0" encoding="UTF-8"?>\n<data>\n</data>`;
  }

  fs.writeFileSync(path.join(xmlDir, xml), content);
  console.log(`Converted ${json} -> ${xml}`);
});