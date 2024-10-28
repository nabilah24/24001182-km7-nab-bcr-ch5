const carRepository = require("../repositories/cars");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getCars = async (plate, avilable, availableAt) => {
  return carRepository.getCars(plate, avilable, availableAt);
};

exports.getCarById = async (id) => {
  const car = await carRepository.getCarById(id);
  if (!car) {
    throw new NotFoundError("Car is Not Found!");
  }

  return car;
};

exports.createCar = async (data, file) => {
  // Upload file to image kit
  if (file?.image) {
    data.image = await imageUpload(file.image);
  }

  // Create the data
  return carRepository.createCar(data);
};

exports.updateCar = async (id, data, file) => {
  // Find car is exist or not (validate the data)
  const existingCar = carRepository.getCarById(id);
    if (!existingCar) {
        throw new NotFoundError("Car is Not Found!");
    }

    // replicated existing data with new data
    data = {
        ...existingCar, // existing Car
        ...data,
    };

    // Upload file to image kit
    if (file?.profile_picture) {
        data.profile_picture = await imageUpload(file.profile_picture);
    }

    // if exist, we will update the Car data
    const updatedCar = carRepository.updateCar(id, data);
    if (!updatedCar) {
        throw new InternalServerError(["Failed to update Car!"]);
    }

    return updatedCar;
};

exports.deleteCarById = async (id) => {
  // find Car is exist or not (validate the data)
  const existingCar = await carRepository.getCarById(id);
  if (!existingCar) {
      throw new NotFoundError("Car is Not Found!");
  }

  // if exist, we will delete the Car data
  const deletedCar = await carRepository.deleteCarById(id);
  if (!deletedCar) {
      throw new InternalServerError(["Failed to delete Car!"]);
  }

  return deletedCar;
};
