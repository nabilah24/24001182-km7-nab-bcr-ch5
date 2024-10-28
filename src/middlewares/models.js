const { z } = require("zod");
const { BadRequestError } = require("../utils/request");
const { getManufactureById } = require("../services/manufactures");

exports.validateGetCarModels = (req, res, next) => {
  // Validate the query
  const validateQuery = z.object({
    name: z.string().optional().nullable(),
    year: z.string().optional().nullable(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  // Convert year to number if it's provided
  if (resultValidateQuery.data.year) {
    req.query.year = Number(resultValidateQuery.data.year);
  }

  next();
};

exports.validateGetCarModelById = (req, res, next) => {
  // Make a validation schema
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateCreateCarModel = (req, res, next) => {
  // Convert to integer
  if (req.body.year) {
    req.body.year = parseInt(req.body.year);
  }

  if (req.body.rentPerDay) {
    req.body.rentPerDay = parseInt(req.body.rentPerDay);
  }

  // Validation body schema
  const validateBody = z.object({
    name: z.string(),
    manufactureId: z.string(),
    transmissionId: z.string(),
    year: z.number().int().positive(),
    rentPerDay: z.number().int().positive()
  });

  // validate
  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateUpdateCarModel = (req, res, next) => {
  // zod validation
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  // Validation body schema
  const validateBody = z.object({
    // Validation body schema
    name: z.string(),
    manufactureId: z.string(),
    transmissionId: z.string(),
    year: z.number().int().positive(),
    rentPerDay: z.number().int().positive()
  });

  // Convert to integer
  if (req.body.year) {
    req.body.year = parseInt(req.body.year);
  }

  if (req.body.rentPerDay) {
    req.body.rentPerDay = parseInt(req.body.rentPerDay);
  }

  // validate
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};

exports.validateDeleteCarModelById = (req, res, next) => {
  // Make a validation schema 
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  next();
};