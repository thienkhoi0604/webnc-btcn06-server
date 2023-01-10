const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.presentations = require("./presentations/presentations.model.js")(
  sequelize,
  Sequelize
);
db.slides = require("./presentations/slides.model.js")(sequelize, Sequelize);
db.options = require("./presentations/options.model.js")(sequelize, Sequelize);
db.accounts = require("./users/accounts.model.js")(sequelize, Sequelize);

module.exports = db;
