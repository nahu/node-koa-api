const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { createNamespace } = require('cls-hooked');
const cls = require('continuation-local-storage');

const { Op } = Sequelize;

const basename = path.basename(module.filename);
let config = require('../config');

const session = createNamespace('my session');
const namespace = cls.createNamespace('transaction-namespace');

Sequelize.useCLS(session);

const env = process.env.NODE_ENV || config.get('server:env') || 'development';
config = config.get(env);
const db = {};

let sequelize;
if (config.use_env_variable) {
  // From the environment, extract the key with the name provided in the config as use_env_variable
  // and use that to establish a connection to our database.
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    operatorsAliases: { $ne: Op.ne },
  });
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
    {
      operatorsAliases: { $ne: Op.ne },
    }
  );
}

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.config = {
  username: config.username,
  password: config.password,
  database: config.database,
  host: config.host,
};
db.namespace = namespace;

module.exports = db;
