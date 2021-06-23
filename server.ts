import express, { Express } from "express";

import { router as JourneyRoute } from "./src/routes/journeys.route";

export const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use("/journeys", JourneyRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
