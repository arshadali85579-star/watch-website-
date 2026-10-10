export interface Timepiece {
  id: string;
  number: string;
  name: string;
  brand: string;
  collection: string;
  price: string;
  status: 'AVAILABLE' | 'RESERVED' | 'LAST ONE';
  image: string;
  details: {
    reference: string;
    case: string;
    movement: string;
    powerReserve: string;
    waterResistance: string;
    crystal: string;
    strap: string;
  };
}

export interface SpecificationItem {
  label: string;
  value: string;
  unit?: string;
  sublabel?: string;
}

export interface ArchitectureLayer {
  index: string;
  title: string;
  detail: string;
  highlight: string;
}
