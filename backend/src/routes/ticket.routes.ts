import express from "express";

import ticketController from "../controllers/ticket.controller";
import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";

const router = express.Router();

router.post(
  "/tickets",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  ticketController.create
);
router.get("/tickets", ticketController.findAll);
router.get(
  "/tickets/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  ticketController.findOne
);
router.put(
  "/tickets/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  ticketController.update
);
router.delete("/tickets/:id", ticketController.remove);
router.get("/tickets/:eventId/events", ticketController.findByEvent);

export default router;
