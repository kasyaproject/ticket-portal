import express from "express";

import regionController from "../controllers/region.controller";

const router = express.Router();

router.get(
  "/regions",
  regionController.getAllProvinces
  /*
      #swagger.tags = ['Regions']
    */
);
router.get(
  "/regions/:id/province",
  regionController.getProvince
  /*
    #swagger.tags = ['Regions']
  */
);
router.get(
  "/regions/:id/regency",
  regionController.getRegency
  /*
      #swagger.tags = ['Regions']
    */
);
router.get(
  "/regions/:id/district",
  regionController.getDistrict
  /*
      #swagger.tags = ['Regions']
    */
);
router.get(
  "/regions/:id/village",
  regionController.getVillage
  /*
      #swagger.tags = ['Regions']
    */
);
router.get(
  "/regions-search",
  regionController.findByCity
  /*
      #swagger.tags = ['Regions']
    */
);

export default router;
