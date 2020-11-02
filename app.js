require('app-module-path').addPath(`${__dirname}`);
require('dotenv').config();

const Koa = require('koa');

const app = new Koa();

// middlewares
const mount = require('koa-mount');
const compress = require('koa-compress');
const koaBody = require('koa-body');

const log4js = require('koa-log4');
const cors = require('koa2-cors');
const config = require('./config');
const services = require('./services');

const logger = log4js.getLogger('app');
app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }));

// logger
app.use(async (ctx, next) => {
  const start = new Date();

  await next();
  const ms = new Date() - start;
  logger.info(`⏱- ${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    logger.error('------ Error ocurred ------');
    logger.error(e);
    ctx.response.body = 'Some error ocurred';
    ctx.status = 500;
  }
});

app.use(
  cors({
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  })
);

app.use(
  koaBody({
    multipart: true,
  })
);

app.use(compress());

app.use(mount(config.get('server:apiVersion'), services));

module.exports = app;
