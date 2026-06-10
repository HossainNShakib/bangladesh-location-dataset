// Type Definitions for Bangladesh Location Dataset

export interface Division {
  id: number;
  name_en: string;
  name_bn: string;
}

export interface District {
  id: number;
  division_id: number;
  name_en: string;
  name_bn: string;
}

export interface Subdistrict {
  id: number;
  district_id: number;
  type: 'upazila' | 'thana';
  name_en: string;
  name_bn: string;
}

export interface LocalArea {
  id: number;
  subdistrict_id: number;
  type: 'union' | 'ward';
  name_en: string;
  name_bn: string;
}

export interface NestedDivision extends Division {
  districts: (District & {
    subdistricts: (Subdistrict & {
      localareas: LocalArea[];
    })[];
  })[];
}