const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getCarModels = async (name, year) => {
  // Define query here
  let query = {
    include: {
      manufactures: true,
      transmissions: true,
    },
  };

  // It will generate the query
  let orQuery = [];
  if (name) {
    orQuery.push ({
      name: { contains: name, mode: "insensitive" },
    });
  }

  if (year) {
    orQuery.push({
      year: { equals: year },
    });
  }

  if (orQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: orQuery,
    };
  }

  // Find by query
  const searchedCarModels = await prisma.models.findMany(query);

  // Convert BigInt fields to string for safe serialization
  const serializedCarModels = JSONBigInt.stringify(searchedCarModels);
  return JSONBigInt.parse(serializedCarModels);
};

exports.getCarModelById = async (id) => {
  // Find car model by id
  const carModel = await prisma.models.findFirst({
    where: {
      id: BigInt(id),
    },
    include: {
      manufactures: true,
      transmissions: true,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarModels = JSONBigInt.stringify(carModel);
  return JSONBigInt.parse(serializedCarModels);
};

exports.createCarModel = async (data) => {
  const newCarModel = await prisma.models.create({
    data,
    include: {
      manufactures: true,
      transmissions: true,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarModels = JSONBigInt.stringify(newCarModel);
  return JSONBigInt.parse(serializedCarModels);
};

exports.updateCarModel = async (id, data) => {
  const updatedCarModel = await prisma.models.update({
    where: { id },
    include: {
      manufactures: true,
      transmissions: true,
    },
    data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarModels = JSONBigInt.stringify(updatedCarModel);
  return JSONBigInt.parse(serializedCarModels);
}

exports.deleteCarModelById = async (id) => {
  const deletedCarModel = await prisma.models.delete({
    where: { id },
    include: {
      manufactures: true,
      transmissions: true,
    },
  });

  // Convert BigInt fields to string for safe serializatotion
  const serializedCarModels = JSONBigInt.stringify(deletedCarModel);
  return JSONBigInt.parse(serializedCarModels);
}