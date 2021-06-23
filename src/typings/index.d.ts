interface IAirport {
  airport_id: string,
  name: string,
  city: string,
  country: string,
  iata: string;
  icao: string;
  latitude: string;
  longitude: string;
  altitude: string;
  timezone: string;
  dst: string;
  tz_database_time_zone: string;
  type: string;
  source: string;
};
interface IRoute {
  airline: string;
  airline_id: string;
  source_airport: string;
  source_airport_id: string;
  destination_apirport: string;
  destination_airport_id: string;
  codeshare: string;
  stops: string;
  equipment: string;
}

interface IRouteGraph {
  [key: string]: {[key: string]: number};
}
interface IRouteMap {
  [key: string]: string[];
}

interface IAirportMap {
  [key: string]: {
    iata: string;
    icao: string;
    name: string;
    city: string;
    long: string;
    lat: string;
    country: string;
  }
}

interface ICoordinates {
  latitude: string;
  longitude: string;
}

interface IRouteDistanceFn {
  route: string;
  distance: number;
  message: string;
}