const modelService = require("../services/models");
const { successResponse } = require("../utils/response");

exports.getCarModels = async (req, res, next) => {
  // Call the usecase or service
  const data = await modelService.getCarModels(
    req.query?.name,
    req.query?.year
  );
  successResponse(res, data);
};

exports.getCarModelById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;

  // Get car model by id
  const data = await modelService.getCarModelById(id);
  successResponse(res, data);
};

exports.createCarModel = async (req, res, next) => {
  // Create the new car model
  const data = await modelService.createCarModel(req.body);
  successResponse(res, data);
};

exports.updateCarModel = async (req, res, next) => {
  // Get id from params
  const { id } = req.params;
  const data = await modelService.updateCarModel(id, req.body);
  successResponse(res, data);
}; 

exports.deleteCarModelById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = await modelService.deleteCarModelById(id);
  successResponse(res, data);
};