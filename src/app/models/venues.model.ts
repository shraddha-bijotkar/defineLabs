export interface Venue {
    id: string;
    name: string;
    contact: Contact;
    location: Location;
    categories: Category[];
    verified: boolean;
    stats: Stats;
    url: string;
    header: string;
    venueRatingBlacklisted: boolean;
    explanation: string;
    beenHere: BeenHere;
    createdAt: number;
    hereNow: HereNow;
    venueChains: any[];
    isSaved?: string;
  }
  export interface HereNow {
    count: number;
    summary: string;
    groups: Group[];
  }
  export interface Group {
    type: string;
    name: string;
    count: number;
    items: any[];
  }
  export interface BeenHere {
    lastCheckinExpiredAt: number;
  }
  export interface Stats {
    tipCount: number;
    usersCount: number;
    checkinsCount: number;
  }
  export interface Category {
    id: string;
    name: string;
    pluralName: string;
    shortName: string;
    icon: Icon;
    categoryCode: number;
    mapIcon: string;
    primary: boolean;
  }
  export interface Icon {
    prefix: string;
    suffix: string;
  }
  export interface Location {
    address: string;
    lat: number;
    lng: number;
    labeledLatLngs: LabeledLatLng[];
    distance: number;
    postalCode: string;
    cc: string;
    city: string;
    state: string;
    country: string;
    formattedAddress: string[];
  }
  export interface LabeledLatLng {
    label: string;
    lat: number;
    lng: number;
  }
  export interface Contact {
    phone: string;
    formattedPhone: string;
    twitter: string;
  }