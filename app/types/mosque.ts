export interface Mosque {
  id: string;
  name: string;
  address: string;
  rating?: number;
  user_ratings_total?: number;
  location: {
    lat: number;
    lng: number;
  };
  opening_hours?: {
    open_now: boolean;
  };
}