import csv from "csvtojson";
import { convertDistance, getDistance } from "geolib";

export const getDataFromFileAsJson = async <T>(fileName: string): Promise<T[]> => {
  return csv().fromFile(`./resources/${fileName}.csv`);
};

export const getRoutesMap = (routes: IRoute[]): IRouteMap => {
  const routesMap: IRouteMap = {}

  for (let route of routes) {
    const { source_airport: source, destination_apirport: destination } = route;

    if (routesMap[source]) {
      routesMap[source].push(destination);
    } else {
      routesMap[source] = [destination];
    }
  }

  return routesMap;
};

export const getAirportsMap = (airports: IAirport[]): IAirportMap => {
  const airportsMap: IAirportMap = {};

  for (let airport of airports) {
    const {
      iata,
      icao,
      name,
      city,
      country,
      latitude: lat,
      longitude: long
    } = airport;

    airportsMap[iata] = {
      iata,
      icao,
      name,
      city,
      country,
      lat,
      long
    };
  }

  return airportsMap;
};

export const determinePossibleRoutes = (
  origin: string,
  destn: string,
  routesMap: IRouteMap
): string[] => {
  let path = "";
  const routes: string[] = [];

  const traverseRoutes = (routesMap: IRouteMap) => {
    if (routesMap[origin]) {
      const destinations = routesMap[origin];

      if (destinations.includes(destn)) {
        path += `${origin},${destn}`; 
        routes.push(path);
        return;
      } else {
        // start looking for different paths
      }

    } else {
      return;
    }
  };

  traverseRoutes(routesMap);

  return routes;
};

export const determineShortestRoute = (
  routes: string[],
  airportsMap: IAirportMap
): { route: string, distance: number } => {
  const result = { route: "", distance: Number.MAX_SAFE_INTEGER };

  for (let route of routes) {
    const stops = route.split(",");
    let coordinates = {};
    let distance = 0;

    for (let stop of stops) {
      const { lat, long } = airportsMap[stop];

      if (Object.keys(coordinates).length !== 0) {
        const [lat2, long2] = Object.values(coordinates);
      
        const rawDistance = getDistance(
          { latitude: lat, longitude: long },
          { latitude: lat2, longitude: long2 }
        );

        distance += convertDistance(rawDistance, "km");
      }
      
      coordinates = { lat: lat, long: long }
    }

    if (distance < result.distance) {
      result.route = route;
      result.distance = distance;
    }
  }

  return result;
};
