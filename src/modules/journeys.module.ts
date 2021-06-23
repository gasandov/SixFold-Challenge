import {
  getAirportsMap,
  getRoutesGraph,
  getShortestRoute,
  getDataFromFileAsJson,
} from "../models/journeys.model";

export const getRouteAndDistance = async (origin: string, destn: string): Promise<IRouteDistanceFn> => {
  // TODO (is necessary?): Check if from and to are valid input airpot codes

  const airports: IAirport[] = await getDataFromFileAsJson("airports");
  const airportsMap: IAirportMap = getAirportsMap(airports);

  const routes: IRoute[] = await getDataFromFileAsJson("routes");
  const routesGraph: IRouteGraph = getRoutesGraph(routes, airportsMap);

  const { route, distance } = getShortestRoute(routesGraph, origin, destn);

  if (route.length === 1) {
    return {
      route: "",
      distance: 0,
      message: `Route was not found for provided inputs`
    };
  }

  return {
    route: route.join(" -> "),
    distance: +(distance.toFixed(2)),
    message: "Shortest route was found"
  };
};
