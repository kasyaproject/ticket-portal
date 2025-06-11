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
  /*
  #swagger.tags = ['Tickets']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/TicketRequest"
    }
  }
  */
);
router.get(
  "/tickets",
  ticketController.findAll
  /*
  #swagger.tags = ['Tickets']
  */
);
router.get(
  "/tickets/:id",
  ticketController.findOne
  /*
  #swagger.tags = ['Tickets']
  */
);
router.put(
  "/tickets/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  ticketController.update
  /*
  #swagger.tags = ['Tickets']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/TicketRequest"
    }
  }
  */
);
router.delete(
  "/tickets/:id",
  ticketController.remove
  /*
  #swagger.tags = ['Tickets']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);
router.get(
  "/tickets/:eventId/events",
  ticketController.findByEvent
  /*
  #swagger.tags = ['Tickets']
  */
);

export default router;
