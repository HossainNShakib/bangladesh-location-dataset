// ID Helper Utilities

export const LEVELS = {
  DIVISION: { length: 2, offset: 0 },
  DISTRICT: { length: 3, offset: 2 },
  SUBDISTRICT: { length: 5, offset: 5 },
  LOCALAREA: { length: 7, offset: 10 }
};

export function validateId(id) {
  if (typeof id !== 'number') return false;
  return /^\d{2,11}$/.test(String(id));
}

export function getIdParts(id) {
  const str = String(id);
  return {
    division: parseInt(str.slice(0, 2)),
    district: parseInt(str.slice(0, 3)),
    subdistrict: parseInt(str.slice(0, 5)),
    localarea: parseInt(str.slice(0, 7))
  };
}

export function isValidStructure(divId, distId, subId, localId) {
  return (
    String(divId).length === 2 &&
    String(distId).length === 3 &&
    String(subId).length === 5 &&
    String(localId).length === 7
  );
}