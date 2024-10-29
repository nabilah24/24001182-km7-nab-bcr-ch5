const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCars = (req, res, next) => {
  // Validate the query
  const validateQuery = z.object({
    plate: z.string().optional().nullable(),
    available: z.string().optional().nullable(),
    availableAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format"
    }).optional().nullable()
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  if (resultValidateQuery.data.available) {
    req.query.available = validateQuery.data.available == "true" ? true : false;
  }

  if (resultValidateQuery.data.availableAt) {
    req.query.availableAt = new Date(validateQuery.data.availableAt)
  }

  next();
};

exports.validateGetCarById = (req, res, next) => {
  // Make a valiadtion schema 
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

exports.validateCreateCar = (req, res, next) => {
  // Validation body schema
  const validateBody = z.object({
    plate: z.string(),
    modelId: z.string().transform((val) => val.trim()).refine((val) => !isNaN(Number(val)), {
      message: "Invalid modelId",
    }),
    typeId: z.string().transform((val) => val.trim()).refine((val) => !isNaN(Number(val)), {
      message: "Invalid typeId",
    }),
    availableAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
    available: z.boolean(),
    description: z.string(),
    options: z.array(z.string()).nonempty(),
    specs: z.array(z.string()).nonempty(),
  });

  // Parse and sanitize data
  if (req.body.available) {
    req.body.available = req.body.available === "true";
  }

  if (req.body.options) {
    req.body.options = Array.isArray(req.body.options) ? req.body.options : [req.body.options];
  }

  if (req.body.specs) {
    req.body.specs = Array.isArray(req.body.specs) ? req.body.specs : [req.body.specs];
  }

  // The file is not required
  const validateFileBody = z.object({
    image: z.object({
      name: z.string(),
      data: z.any(),
    })
      .nullable()
      .optional(),
  })
  .nullable()
  .optional();

  // Validate
  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  // Validate 
  const resultValidateFiles = validateFileBody.safeParse(req.files);
  if (!resultValidateFiles.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateFiles.error.errors);
  }

  next();
};

exports.validateUpdateCar = (req, res, next) => {
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
    plate: z.string(),
    modelId: z.string().transform((val) => val.trim()).refine((val) => !isNaN(Number(val)), {
      message: "Invalid modelId",
    }),
    typeId: z.string().transform((val) => val.trim()).refine((val) => !isNaN(Number(val)), {
      message: "Invalid typeId",
    }),
    availableAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
    available: z.boolean(),
    description: z.string(),
    options: z.array(z.string()).nonempty(),
    specs: z.array(z.string()).nonempty(),
  });

  // Parse and sanitize data
  if (typeof req.body.available === "string") {
    req.body.available = req.body.available === "true"; // Convert string to boolean
  }

  if (req.body.options) {
    req.body.options = Array.isArray(req.body.options) ? req.body.options : [req.body.options];
  }

  if (req.body.specs) {
    req.body.specs = Array.isArray(req.body.specs) ? req.body.specs : [req.body.specs];
  }

  // The file is not required
  const validateFileBody = z.object({
    image: z.object({
      name: z.string(),
      data: z.any(),
    })
      .nullable()
      .optional(),
  })
  .nullable()
  .optional(); 

  // Validate
  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  // Validate 
  const resultValidateFiles = validateFileBody.safeParse(req.files);
  if (!resultValidateFiles.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateFiles.error.errors);
  }

  next();
};

exports.validateDeleteCarById = (req, res, next) => {
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