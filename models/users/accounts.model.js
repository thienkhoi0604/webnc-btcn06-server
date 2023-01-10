module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define(
    "accounts",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      fullname: {
        type: Sequelize.STRING,
      },
      telephone: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return Account;
};
