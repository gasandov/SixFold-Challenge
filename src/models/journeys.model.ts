import csv from "csvtojson";
import { convertDistance, getDistance } from "geolib";

/**
 * @description Read file from resources dir and format data into JSON format
 * @param fileName
 * @returns {object} JSON
 */
export const getDataFromFileAsJson = async <T>(fileName: string): Promise<T[]> => {
  return csv().fromFile(`./resources/${fileName}.csv`);
};

/**
 * @description Build a grahp where nodes are the origins and children are the destinations
 * @param routes Array of objects
 * @returns {Object} { MYA: { MIM: 113, SYD: 234 } }
 */
export const getRoutesGraph = (routes: IRoute[], airportsMap: IAirportMap): IRouteGraph => {
  const routesGraph: IRouteGraph = {}
  const weights: {[key: string]: number} = {};

  for (let route of routes) {
    const { source_airport: source, destination_apirport: destination } = route;

    if (airportsMap[source] && airportsMap[destination]) {
      const { lat: lat2, long: long2 } = airportsMap[destination];
      const { lat, long } = airportsMap[source];

      const fromToKey = `${source}/${destination}`;
      const toFromKey = `${destination}/${source}`;

      const weight = weights[fromToKey] || weights[toFromKey] || getGreatCircleDistance(
        { latitude: lat, longitude: long },
        { latitude: lat2, longitude: long2 }
      );
       
      weights[fromToKey] = weight;

      if (routesGraph[source]) {
        routesGraph[source][destination] = weight;
      } else {
        routesGraph[source] = { [destination]: weight }
      }
    }

    if (!airportsMap[source]) {
      routesGraph[source] = {};
    }

    if (!airportsMap[destination]) {
      routesGraph[source] = {};
    }
  }

  return routesGraph;
};

/**
 * @description Build a key - value map where the key is the iata code and the value
 * is an object holding aiport's information
 * @param airports Array of objects
 * @returns {Object} { "ABC": { iata, name, city ...} }
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

/**
 * @description get shortest distance between nodes by using Dijkstra’s Algorithm
 * @param graph { "ABC": { "GHI": 200, "BJF": 100 } }
 * @param origin "ABC"
 * @param destn "GHI"
 * @returns {object} { route: ["ABC", "GHI"], distance: 200 }
 */
export const getShortestRoute = (
  graph: IRouteGraph,
  origin: string,
  destn: string
): { route: string[], distance: number } => {
  let distances: {[key: string]: number} = {};
  distances[destn] = Infinity;
  distances = Object.assign(distances, graph[origin]);

  const parents: {[key: string]: (string | null)} = { [origin]: null };
  
  for (let child in graph[origin]) {
    parents[child] = origin;
  }

  const visited = new Set<string>();
  let node = shortestDistanceNode(distances, visited)

  while (node) {
    let distance = distances[node];
    let children = graph[node];

    for (let child in children) {
      if (child === origin) {
        continue;
      } else {
        let newDistance = distance + children[child];

        if (!distances[child] || distances[child] > newDistance) {
          distances[child] = newDistance;
          parents[child] = node;
        }
      }
    }

    visited.add(node);
    node = shortestDistanceNode(distances, visited);
  }

  const shortestPath = [destn];
  let parent = parents[destn];

  while (parent) {
    shortestPath.push(parent);
    parent = parents[parent];
  }

  shortestPath.reverse();

  return {
    route: shortestPath,
    distance: distances[destn]
  };
};

/**
 * @description get the nearest node based on shortest distance
 * @param distances { { "ABC": 100, "FGH": 250 } }
 * @param visited {Set} holding visted nodes
 * @returns {string | null} "ABC | null"
 */
export const shortestDistanceNode = (
  distances: {[key: string]: number},
  visited: Set<string>
): (string | null) => {
  let shortest = null;

  for (let node in distances) {
    let currentShortest = shortest === null || distances[node] < distances[shortest];

    if (currentShortest && !visited.has(node)) {
      shortest = node;
    }
  }

  return shortest;
};

/**
 * @description Calculate the geographical distance between coordinates by
 * using great circle distance formula (npm package)
 * @param originCoord { latitude: string, longitude: string }
 * @param desntCoord { latitude: string, longitude: string }
 * @param unit "km" | TBD
 * @returns {number} 100.103
 */
export const getGreatCircleDistance = (
  originCoord: ICoordinates,
  desntCoord: ICoordinates,
  unit: string = "km"
): number => {
  const rawDistance = getDistance(originCoord, desntCoord);
  return convertDistance(rawDistance, unit);
};
