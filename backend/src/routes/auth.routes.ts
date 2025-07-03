import express from "express";

import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";

const router = express.Router();

router.post(
  "/auth/register",
  authController.register
  /*
      #swagger.tags = ['Auth']
      #swagger.requestBody = {
        required: true,
        schema: {$ref: '#/components/schemas/RegisterRequest'},
      }
     */
);
router.post(
  "/auth/login",
  authController.login
  /**
     * #swagger.tags = ['Auth']
     #swagger.requestBody ={
      required: true,
      schema: {$ref: "#/components/schemas/LoginRequest"}
     }
     */
);
router.get(
  "/auth/checkMe",
  authMiddleware,
  authController.checkMe
  /**
      #swagger.tags = ['Auth']
      #swagger.security = [{
        "bearerAuth": []
      }]
     */
);
router.post(
  "/auth/activation",
  authController.activation
  /*
      #swagger.tags = ['Auth']
      #swagger.requestBody = {
        required: true,
        schema: {$ref: '#/components/schemas/ActivationRequest'},
      }
     */
);
router.put(
  "/auth/updateProfile",
  [authMiddleware, aclMiddleware([ROLES.MEMBER])],
  authController.updateProfile
  /*
      #swagger.tags = ['Auth']
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.requestBody = {
        required: true,
        schema: {$ref: '#/components/schemas/UpdateProfileRequest'},
      }
     */
);
router.put(
  "/auth/updatePassword",
  [authMiddleware, aclMiddleware([ROLES.MEMBER])],
  authController.updatePassword
  /*
      #swagger.tags = ['Auth']
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.requestBody = {
        required: true,
        schema: {$ref: '#/components/schemas/UpdatePasswordRequest'},
      }
     */
);

export default router;
