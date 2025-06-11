import express from "express";

import categoryController from "../controllers/category.controller";
import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";

const router = express.Router();

router.post(
  "/category",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  categoryController.create
  /*
  #swagger.tags = ['Category']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CategoryRequest"
    }
  }
  */
);
router.get(
  "/category",
  categoryController.findAll
  /*
  #swagger.tags = ['Category']
  */
);
router.get(
  "/category/:id",
  categoryController.findOne
  /*
  #swagger.tags = ['Category']
  */
);
router.put(
  "/category/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  categoryController.update
  /*
  #swagger.tags = ['Category']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CategoryRequest"
    }
  }
  */
);
router.delete(
  "/category/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  categoryController.remove
  /*
  #swagger.tags = ['Category']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

export default router;
