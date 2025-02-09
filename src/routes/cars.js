const express = require("express");
const { authorization } = require("../middlewares/auth");
const {
  validateGetCars,
  validateGetCarById,
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
const { adminRole, userRole } = require("../constants/auth");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(authorization(adminRole, userRole), validateGetCars, getCars)
  .post(authorization(adminRole), validateCreateCar, createCar);

router 
  .route("/:id")
  .get(authorization(adminRole, userRole), validateGetCarById, getCarById)
  .put(authorization(adminRole), validateUpdateCar, updateCar)
  .delete(authorization(adminRole), validateDeleteCarById, deleteCarById);

module.exports = router;