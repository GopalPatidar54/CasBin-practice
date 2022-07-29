const {SequelizeAdapter} = require('casbin-sequelize-adapter');
async function sequelizeAdapter() {
  return SequelizeAdapter.newAdapter({
    username: 'username',
    password: 'password',
    database: 'database',
    dialect: 'mysql',
    port: "port",
  });
}

module.exports = {sequelizeAdapter};
