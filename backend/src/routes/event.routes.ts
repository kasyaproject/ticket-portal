import express from "express";

import eventController from "../controllers/event.controller";
import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";

const router = express.Router();

router.post(
  "/events",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  eventController.create
  /*
  #swagger.tags = ['Events']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/EventRequest"
    }
  }
  */
);
router.get(
  "/events",
  eventController.findAll
  /*
  #swagger.tags = ['Events']
  #swagger.parameters['limit'] = {
    in: 'query',
    type: 'number',
    default: 10
  }
  #swagger.parameters['page'] = {
    in: 'query',
    type: 'number',
    default: 1
  }
  #swagger.parameters['category'] = {
    in: 'query',
    type: 'string'
  }
  #swagger.parameters['isOnline'] = {
    in: 'query',
    type: 'boolean'
  }
  #swagger.parameters['isFetured'] = {
    in: 'query',
    type: 'boolean'
  }
  #swagger.parameters['isPublish'] = {
    in: 'query',
    type: 'boolean'
  }
  */
);
router.get(
  "/events/:id",
  eventController.findOne
  /*
  #swagger.tags = ['Events']
  */
);
router.put(
  "/events/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  eventController.update
  /*
  #swagger.tags = ['Events']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/EventRequest"
    }
  }
  */
);
router.delete(
  "/events/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  eventController.remove
  /*
  #swagger.tags = ['Events']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);
router.get(
  "/events/:slug/slug",
  eventController.findOneBySlug
  /*
  #swagger.tags = ['Events']
  */
);

export default router;
