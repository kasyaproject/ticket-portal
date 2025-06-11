import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import mediaMiddleware from "../middlewares/media.middleware";
import { ROLES } from "../utils/constant";
import mediaController from "../controllers/media.controller";

const router = express.Router();

router.post(
  "/media/upload-single",
  [
    authMiddleware,
    aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
    mediaMiddleware.single("file"),
  ],
  mediaController.single
  /*
      #swagger.tags = ['Media']
      #swagger.security = [{
        "bearerAuth": {}
      }]
      #swagger.requestBody = {
        required: true,
        content: {
          "multipart/form-data": {
            schema:{
              type: "object",
              properties: {
                file:{
                  type: "string",
                  format: "binary"
                }
              }
            }
          }
        }
      }
    */
);

router.post(
  "/media/upload-multiple",
  [
    authMiddleware,
    aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
    mediaMiddleware.multiple("files"),
  ],
  mediaController.multiple
  /*
      #swagger.tags = ['Media']
      #swagger.security = [{
        "bearerAuth": {}
      }]
      #swagger.requestBody = {
        required: true,
        content: {
          "multipart/form-data": {
            schema:{
              type: "object",
              properties: {
                files:{
                  type: "array",
                  items: {
                    type: "string",
                    format: "binary"
                  }
                }
              }
            }
          }
        }
      }
    */
);

router.delete(
  "/media/remove",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  mediaController.remove
  /*
      #swagger.tags = ['Media']
      #swagger.security = [{
        "bearerAuth": {}
      }]
      #swagger.requestBody = {
        required: true,
        schema: {
          $ref: "#/components/schemas/RemoveMediaRequest"
        }       
      }
    */
);

export default router;
