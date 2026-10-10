import { Timepiece, ArchitectureLayer } from '../types';

export const FEATURED_TIMEPIECES: Timepiece[] = [
  {
    id: 'marchand-abysse',
    number: '01',
    name: 'Abysse Date',
    brand: 'MARCHAND',
    collection: 'The Sea Collection',
    price: '€15,900',
    status: 'AVAILABLE',
    image: '/watch-01.jpg',
    details: {
      reference: 'MA-1266',
      case: '316L Oystergrade Steel, 41mm',
      movement: 'Calibre V-240 Automatic',
      powerReserve: '72 Hours',
      waterResistance: '300m / 1,000ft',
      crystal: 'Domed Sapphire with AR Coating',
      strap: 'Brushed Steel Oyster Link with Glidelock'
    }
  },
  {
    id: 'aubert-promenade',
    number: '02',
    name: 'Promenade',
    brand: 'AUBERT & FILS',
    collection: 'Geneva Haute Collection',
    price: '€129,000',
    status: 'RESERVED',
    image: '/watch-02.jpg',
    details: {
      reference: 'AF-0571',
      case: '18K Rose Gold, 40mm',
      movement: 'In-House Calibre 324 SC',
      powerReserve: '45 Hours',
      waterResistance: '120m / 400ft',
      crystal: 'Sapphire Crystal Exhibition Caseback',
      strap: 'Integrated 18K Rose Gold Bracelet'
    }
  },
  {
    id: 'delacourt-octave',
    number: '03',
    name: 'Octave',
    brand: 'DELACOURT GENÈVE',
    collection: 'Geometric Horology',
    price: '€28,900',
    status: 'AVAILABLE',
    image: '/watch-03.jpg',
    details: {
      reference: 'DC-1551.00.0132',
      case: 'Brushed & Beveled Steel, 39mm',
      movement: 'Ultra-Thin Automatic Calibre 2121',
      powerReserve: '40 Hours',
      waterResistance: '50m / 165ft',
      crystal: 'Anti-reflective Scratchproof Sapphire',
      strap: 'Tapered Monobloc Steel'
    }
  },
  {
    id: 'verreaux-lunaris',
    number: '04',
    name: 'Lunaris Chronographe',
    brand: 'VERREAUX',
    collection: 'Aeronautical Instruments',
    price: '€7,250',
    status: 'AVAILABLE',
    image: '/watch-04.jpg',
    details: {
      reference: 'VX-310.42.50.01',
      case: 'Satin-Finished Stainless Steel, 42mm',
      movement: 'Manual-Wind Co-Axial Master Chronometer',
      powerReserve: '50 Hours',
      waterResistance: '50m / 165ft',
      crystal: 'Hesalite with Anti-Shatter Ring',
      strap: 'Speedway Brushed Steel'
    }
  },
  {
    id: 'belmont-carre',
    number: '05',
    name: 'Carré Belmont',
    brand: 'BELMONT',
    collection: 'Art Deco Collection',
    price: '€8,400',
    status: 'AVAILABLE',
    image: '/watch-05.jpg',
    details: {
      reference: 'BL-0029',
      case: 'Silver-Plated Square Steel, 35mm',
      movement: 'Manufacture Calibre 1847 MC',
      powerReserve: '42 Hours',
      waterResistance: '100m / 330ft',
      crystal: 'Faceted Sapphire Cabochon',
      strap: 'QuickSwitch Interchangeable Steel'
    }
  },
  {
    id: 'havre-gulfline',
    number: '06',
    name: 'Gulfline 58',
    brand: 'HAVRE',
    collection: 'Heritage Diver',
    price: '€3,950',
    status: 'AVAILABLE',
    image: '/watch-06.jpg',
    details: {
      reference: 'HV-7930-0001',
      case: 'Vintage-Inspired Steel, 39mm',
      movement: 'Manufacture MT5402 (COSC Certified)',
      powerReserve: '70 Hours',
      waterResistance: '200m / 660ft',
      crystal: 'High-Dome Sapphire',
      strap: 'Rivet Steel Bracelet'
    }
  }
];

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    index: '01',
    title: 'Sapphire Crystal',
    detail: 'Double Anti-Reflective Coating',
    highlight: 'Scratch-resistant synthetic corundum with 9 Mohs hardness rating'
  },
  {
    index: '02',
    title: 'Ceramic Bezel',
    detail: '60-Click Unidirectional Ring',
    highlight: 'Laser-ablated numerals filled with platinum deposition'
  },
  {
    index: '03',
    title: 'Lacquered Dial',
    detail: 'Seven Coats, Hand-Polished Finish',
    highlight: 'Deep sunray galvanic blue with hand-applied luminescent indices'
  },
  {
    index: '04',
    title: 'Calibre V-240 Movement',
    detail: '22K Gold Skeletonised Rotor',
    highlight: '105 components hand-finished with Côtes de Genève stripes'
  }
];
