import { Request, Response } from "express";

import { getCalculatedPath } from "../modules/journeys.module";

type Params = {};
type Body = {};
type Query = {};

type Req = Request<Params, {}, Body, Query>;

export const journeyPath = async (req: Req, res: Response) => {
  try {
    const path = getCalculatedPath();

    res.status(200).json({
      success: true,
      data: path
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};