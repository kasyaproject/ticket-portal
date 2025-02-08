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
);
router.post(
  "/media/upload-multiple",
  [
    authMiddleware,
    aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
    mediaMiddleware.multiple("files"),
  ],
  mediaController.multiple
);
router.delete(
  "/media/remove",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  mediaController.remove
);

export default router;
