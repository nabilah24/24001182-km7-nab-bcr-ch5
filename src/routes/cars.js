const express = require("express");
const {
  validateGerCars,
  validateGerCarById,
  validateCreateCar,
  validateUpdateCar,
  validateDeleteCarById,
} = require("../middlewares/cars");
const {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCarById,
} = require("../controllers/cars");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(validateGerCars, getCars)
  .post(validateCreateCar, createCar);

router 
  .route("/:id")
  .get(validateGerCarById, getCarById)
  .put(validateUpdateCar, updateCar)
  .delete(validateDeleteCarById, deleteCarById);

module.exports = router;