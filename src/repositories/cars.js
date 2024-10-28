const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const { get } = require("../routes");

const prisma = new PrismaClient();

exports.getCars = async (plate, available, availableAt) => {
  // Define query here
  let query = {
    include: {
      models: true,
      types: true,
    }
  };

  // It will generate the query
  let orQuery = [];
  if (plate) {
    orQuery.push({
      plate: { contains: plate, mode: "insensitive" },
    });
  }
  if (available) {
    orQuery.push({
      available: { equals: available },
    });
  }
  if (availableAt) {
    orQuery.push({
      availableAt: { gte: availableAt },
    });
  }

  // Find by query
  const searchedCars = await prisma.cars.findMany(query);

  // // Convert BigInt fields to string for safe serialization
    const serializedCars = JSONBigInt.stringify(searchedCars);
    return JSONBigInt.parse(serializedCars);
};

exports.getCarById = async (id) => {
  // Find car by id
  const car = await prisma.cars.findFirst({
    where: {
      id: id,
    },

    include: {
      models: true,
      types: true,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCars = JSONBigInt.stringify(car);
  return JSONBigInt.parse(serializedCars);
};

exports.createCar = async (data) => {
  const newCarModel = await prisma.cars.create({
    data,
    include: {
      models: true,
      types: true,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarModels = JSONBigInt.stringify(newCarModel);
  return JSONBigInt.parse(serializedCarModels);
};

exports.updateCar = async (id, data) => {
  const updatedCar = await prisma.cars.update({
      where: { id },
      include: {
        models: true,
        types: true,
      },
      data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCars = JSONBigInt.stringify(updatedCar);
  return JSONBigInt.parse(serializedCars);
};

exports.deleteCarById = async (id) => {
  const deletedCar = await prisma.cars.delete({
      where: { id },
      include: {
          models: true,
          types: true,
      },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCars = JSONBigInt.stringify(deletedCar);
  return JSONBigInt.parse(serializedCars);
};