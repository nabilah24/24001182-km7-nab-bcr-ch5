const modelRepository = require("../repositories/models");
const { NotFoundError, InternalServerError } = require("../utils/request");


exports.getCarModels = async (name, year) => {
  return modelRepository.getCarModels(name, year);
};

exports.getCarModelById = async (id) => {
  const carModel = await modelRepository.getCarModelById(id);
  if (!carModel) {
    throw new NotFoundError("Car Model is Not Found!");
  }

  return carModel;
};

exports.createCarModel = async (data) => {
  // Create the data
  return modelRepository.createCarModel(data);
};

exports.updateCarModel = async (id, data) => {
  // Find car model is exist or not (validate the data)
  const existingCarModel = modelRepository.getCarModelById(id);
  if (!existingCarModel) {
    throw new NotFoundError("Car Model is Not Found!");
  }

  // Replicated exisiting data with new data
  data = {
    ...existingCarModel,
    ...data,
  };

  // If exist, we will update the car model data
  const updatedCarModel = modelRepository.updateCarModel(id, data);
  if (!updatedCarModel) {
    throw new InternalServerError(["Failed to update car model!"]);
  }

  return updatedCarModel;
};

exports.deleteCarModelById = async (id) => {
  // Find car model is exist or not (validate the data)
  const existingCarModel = await modelRepository.getCarModelById(id);
  if (!existingCarModel) {
    throw new NotFoundError("Car Model is Not Found!");
  }

  const deletedCarModel = await modelRepository.deleteCarModelById(id);
  if (!deletedCarModel) {
    throw new InternalServerError(["Failed to delete car type!"]);
  }

  return deletedCarModel;
};