const express = require("express");
const { authorization } = require("../middlewares/auth");
const {
  validateGetCarModels,
  validateGetCarModelById,
  validateCreateCarModel,
  validateUpdateCarModel,
  validateDeleteCarModelById,
} = require("../middlewares/models");
const {
  getCarModels,
  getCarModelById,
  createCarModel,
  updateCarModel,
  deleteCarModelById,
} = require("../controllers/models");
const { adminRole, userRole } = require("../constants/auth");

const router = express.Router();

// it will be run the URL basedon path and the method
router
  .route("/")
  .get(authorization(adminRole, userRole), validateGetCarModels, getCarModels)
  .post(authorization(adminRole), validateCreateCarModel, createCarModel);

router
  .route("/:id")
  .get(authorization(adminRole, userRole), validateGetCarModelById, getCarModelById)
  .put(authorization(adminRole), validateUpdateCarModel, updateCarModel)
  .delete(authorization(adminRole), validateDeleteCarModelById, deleteCarModelById);

module.exports = router;
