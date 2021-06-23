import { Request, Response } from "express";

import { getRouteAndDistance } from "../modules/journeys.module";

type Params = {};
type Body = {};
type Query = {
  from: string;
  to: string;
};

type Req = Request<Params, {}, Body, Query>;

export const journeyPath = async (req: Req, res: Response) => {
  try {
    if (req.query?.from && req.query?.to) {
      const { from, to } = req.query;
      const result: IRouteDistanceFn = await getRouteAndDistance(from, to);
  
      res.status(200).json({
        success: true,
        data: result
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Please provide an origin and destination"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
