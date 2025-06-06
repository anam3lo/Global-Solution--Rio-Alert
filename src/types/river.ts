export type AlertLevel = 'green' | 'yellow' | 'red';

export interface Shelter {
  name: string;
  address: string;
  capacity: number;
  distance: number;
  latitude: number;
  longitude: number;
}

export interface RiverData {
  id: string;
  name: string;
  currentLevel: number;
  lastUpdate: string;
  alertLevel: AlertLevel;
  weatherForecast?: string;
  shelters: Shelter[];
  location: {
    latitude: number;
    longitude: number;
  };
  historicalData?: {
    date: string;
    level: number;
  }[];
}

export interface RiverAlert {
  id: string;
  riverId: string;
  level: AlertLevel;
  message: string;
  timestamp: string;
} 