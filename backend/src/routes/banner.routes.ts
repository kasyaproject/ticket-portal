import express from "express";

import bannerController from "../controllers/banner.controller";
import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";

const router = express.Router();

router.post(
  "/banners",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  bannerController.create
  /*
  #swagger.tags = ['Banners']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/BannerRequest"
    }
  }
  */
);
router.get(
  "/banners",
  bannerController.findAll
  /*
  #swagger.tags = ['Banners']
  */
);
router.get(
  "/banners/:id",
  bannerController.findOne
  /*
  #swagger.tags = ['Banners']
  */
);
router.put(
  "/banners/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  bannerController.update
  /*
  #swagger.tags = ['Banners']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/BannerRequest"
    }
  }
  */
);
router.delete(
  "/banners/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  bannerController.remove
  /*
  #swagger.tags = ['Banners']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

export default router;
