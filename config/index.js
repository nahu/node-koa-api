const nconf = require('nconf');

nconf
  .argv()
  .env()
  .file({ file: `${__dirname}/config.json` });

nconf.required(['server']);

module.exports = nconf;
