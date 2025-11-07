
export enum Page {
  Home,
  Cuisine,
  Filters,
  Loading,
  Result,
  EndScreen,
}

export interface Filters {
  distance: number; // in miles
  price: number[]; // e.g., [1, 2, 3, 4] for $, $$, $$$
  rating: number; // min rating
  payment: string[];
  dietary: string[];
}

export interface Restaurant {
  name: string;
  rating: number;
  price_level: number;
  address: string;
  cuisine: string[];
  maps_url: string;
  website_url?: string;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}
