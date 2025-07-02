import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";
import orderController from "../controllers/order.controller";
import mediaController from "../controllers/media.controller";
import mediaMiddleware from "../middlewares/media.middleware";

const router = express.Router();

router.post(
  "/orders",
  [authMiddleware, aclMiddleware([ROLES.MEMBER])],
  orderController.create
  /**
    #swagger.tags = ['Order']
    #swagger.security = [{
      "bearerAuth": {}
    }]
    #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/OrderRequest"
    }
  }
  */
);
router.get(
  "/orders",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  orderController.findAllByAdmin
  /**
    #swagger.tags = ['Order']
    #swagger.security = [{
      "bearerAuth": {}
    }]
  */
);
router.get(
  "/orders/:orderId",
  [authMiddleware, aclMiddleware([ROLES.MEMBER, ROLES.ADMIN])],
  orderController.findOne
  /**
    #swagger.tags = ['Order']
    #swagger.security = [{
      "bearerAuth": {}
    }]
  */
);
router.delete(
  "/orders/:orderId",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  orderController.remove
  /**
    #swagger.tags = ['Order']
    #swagger.security = [{
      "bearerAuth": {}
    }]
  */
);

router.put(
  "/orders/:orderId/completed",
  [authMiddleware, aclMiddleware([ROLES.MEMBER])],
  orderController.complete
  /**
    #swagger.tags = ['Order']
    #swagger.security = [{
      "bearerAuth": {}
    }]
  */
);
router.put(
  "/orders/:orderId/pending",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  orderController.pending
  /**
    #swagger.tags = ['Order']
    #swagger.security = [{
      "bearerAuth": {}
    }]
  */
);
router.put(
  "/orders/:orderId/cancelled",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  orderController.cencelled
  /**
    #swagger.tags = ['Order']
    #swagger.security = [{
      "bearerAuth": {}
    }]
  */
);

export default router;
