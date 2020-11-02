/**
 * Modulo registra los endpoints de todos los recursos de la API
 * Cada recurso es manejado en su propio fichero,
 * Las validaciones de seguridad y tipos de dato de entrada se
 * realizan en este módulo.
 *
 */
const Router = require('koa-router');

const router = new Router();

require('./users').register(router);

module.exports = router.routes();
