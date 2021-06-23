import csv from "csvtojson";
import { convertDistance, getDistance } from "geolib";

/**
 * @description Read file from resources dir and format data into JSON format
 * @param fileName
 * @returns {Object<T>}
 */
export const getDataFromFileAsJson = async <T>(fileName: string): Promise<T[]> => {
  return csv().fromFile(`./resources/${fileName}.csv`);
};

/**
 * @description Build a key - value map where the key is the source aiport and the value
 * is an array of available destinations
 * @param routes Array of objects
 * @returns {Object}
 */
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

/**
 * @description Build a key - value map where the key is the iata code and the value
 * is an object holding aiport's information
 * @param airports Array of objects
 * @returns {Object}
 */
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

/**
 * @description For each possible route, determine which one has the shortest geographical
 * distance between origin and destination
 * @param routes Array of strings e.g. ["ABC,DCA"] holding paths as comma separated strings
 * @param airportsMap Map of aiports
 * @returns {Object} holding distance and shortest route
 */
export const determineShortestRoute = (
  routes: string[],
  airportsMap: IAirportMap
): { route: string, distance: number } => {
  const result = { route: "", distance: Number.MAX_SAFE_INTEGER };

  for (let route of routes) {
    const stops = route.split(",");
    const distance = calculateRoutesDistance(stops, airportsMap);

    if (distance < result.distance) {
      result.route = route;
      result.distance = distance;
    }
  }

  return result;
};

export const calculateRoutesDistance = (
  stops: string[],
  airportsMap: IAirportMap
) => {
  let distance = 0;
  let prevCoordinates = {};

  for (let stop of stops) {
    const { lat, long } = airportsMap[stop];

    if (Object.keys(prevCoordinates).length !== 0) {
      const [lat2, long2] = Object.values(prevCoordinates);

      distance += getGreatCircleDistance(
        { latitude: lat, longitude: long },
        { latitude: lat2, longitude: long2 }
      );
    }

    prevCoordinates = { lat: lat, long: long }
  }

  return distance;
};

export const getGreatCircleDistance = (
  originCoord: ICoordinates,
  desntCoord: ICoordinates,
  unit: string = "km"
) => {
  const rawDistance = getDistance(originCoord, desntCoord);
  return convertDistance(rawDistance, unit);
};
