import { Router } from "express";

import { journeyPath } from "../controllers/journeys.controller";

export const router: Router = Router();

router
  .route("/")
  .get(journeyPath);
