import {
  getRoutesMap,
  getAirportsMap,
  getDataFromFileAsJson,
  determineShortestRoute,
  determinePossibleRoutes
} from "../models/journeys.model";

export const getRouteAndDistance = async (origin: string, destn: string) => {
  // TODO: Check if from and to are valid input airpot codes (is necessary?)

  const routes: IRoute[] = await getDataFromFileAsJson("routes");
  const routesMap: IRouteMap = getRoutesMap(routes);

  const determinedRoutes: string[] = determinePossibleRoutes(origin, destn, routesMap);

  if (determinedRoutes.length === 0) {
    return {
      route: "",
      distance: 0,
      message: `Route was not found for provided inputs`
    };
  }
  
  const airports: IAirport[] = await getDataFromFileAsJson("airports");
  const airportsMap: IAirportMap = getAirportsMap(airports);

  const { route, distance } = determineShortestRoute(determinedRoutes, airportsMap);

  return {
    route,
    distance,
    message: "Shortest route was found"
  };
};
