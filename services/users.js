const log4js = require('koa-log4');
const delegate = require('../delegates/user');

const modelName = 'user';
const modelNameRoute = 'users';

const logger = log4js.getLogger(`${modelNameRoute} - service`);

const getAll = async (ctx) => {
  ctx.response.body = await delegate.getAll();
};

const get = async (ctx) => {
  logger.info(`Will get ${modelName} ${ctx.params.id}`);
  const responsePayload = await delegate.get(ctx.params.id);
  ctx.response.body = responsePayload;
};

const post = async (ctx) => {
  const model = ctx.request.body;
  logger.info(`Will insert ${modelName} ${JSON.stringify(model)}`);
  ctx.response.body = await delegate.save(model);
};

const put = async (ctx) => {
  const model = ctx.request.body;
  logger.info(
    `Will update ${modelName} ID: ${ctx.params.id}. Payload: ${model}`
  );
  ctx.response.body = await delegate.update(ctx.params.id, model);
};

const remove = async (ctx) => {
  logger.info(`Will remove ${modelName} ${ctx.params.id}`);
  ctx.response.body = await delegate.remove(ctx.params.id);
};

exports.register = (router) => {
  router.get(`/${modelNameRoute}`, getAll);
  router.get(`/${modelNameRoute}/:id`, get);
  router.post(`/${modelNameRoute}`, post);
  router.put(`/${modelNameRoute}/:id`, put);
  router.delete(`/${modelNameRoute}/:id`, remove);
};
