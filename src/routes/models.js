const express = require("express");
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

const router = express.Router();

// it will be run the URL basedon path and the method
router
  .route("/")
  .get(validateGetCarModels, getCarModels)
  .post(validateCreateCarModel, createCarModel);

router
  .route("/:id")
  .get(validateGetCarModelById, getCarModelById)
  .put(validateUpdateCarModel, updateCarModel)
  .delete(validateDeleteCarModelById, deleteCarModelById);

module.exports = router;
