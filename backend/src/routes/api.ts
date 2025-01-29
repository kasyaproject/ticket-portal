import express from "express";

import dummyController from "../controllers/apiController";

const router = express.Router();

router.get("/dummy", dummyController.dummy);

export default router;
