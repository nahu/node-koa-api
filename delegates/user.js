const Boom = require('boom');
const log4js = require('koa-log4');
const {
  sequelize: {
    models: { user: Model },
  },
} = require('../models');

const { validateEmail } = require('./util');

const logger = log4js.getLogger('user - delegate');

const modelName = 'user';
const modelNamePlural = 'users';

const getAll = async () => {
  try {
    return await Model.findAndCountAll();
  } catch (error) {
    logger.error(`${error}`);
    throw Boom.badRequest(`Error / getAll / ${modelNamePlural}`);
  }
};

const get = async (id) => {
  if (!id) {
    throw Boom.badRequest('ID cannot be null');
  }
  try {
    return await Model.findByPk(Number(id));
  } catch (error) {
    throw Boom.badRequest(`Error / get / ${modelName}`);
  }
};

const update = async (id, model, t) => {
  if (!model) {
    throw Boom.badRequest(`${modelName} cannot be null`);
  }
  const persisted = await Model.findByPk(id);

  if (!persisted) {
    throw Boom.badRequest(`${modelName} with ID ${id} doesn't exists`);
  }

  const newModel = { ...model };

  try {
    Object.keys(newModel).forEach((key) => {
      persisted[key] = newModel[key];
    });

    if (t) await persisted.save({ transaction: t });
    else await persisted.save();

    return persisted;
  } catch (error) {
    logger.error(`💥- ${error}`);
    throw Boom.badRequest(`Error / update / ${modelName}`);
  }
};

const save = async (model) => {
  if (!model) {
    throw Boom.badRequest(`${modelName} cannot be null`);
  }

  if (!validateEmail(model.email)) {
    throw Boom.badData(`Invalid email ${model.email}`);
  }

  try {
    const newModel = await Model.create(model);
    await newModel.save();
    return newModel;
  } catch (error) {
    logger.error(`${error}`);
    throw Boom.badRequest(`Error / save / ${modelName}`);
  }
};

const remove = async (id) => {
  const persisted = await Model.findByPk(id);
  return persisted.destroy();
};

module.exports = {
  getAll,
  get,
  save,
  update,
  remove,
};
