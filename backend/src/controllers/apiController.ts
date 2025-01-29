import { Request, Response } from "express";

export default {
  dummy(req: Request, res: Response) {
    // dummy controller
    res
      .status(200)
      .json({ message: "Welcome, to Ticket Portal API!", data: "OK" });
  },
};
