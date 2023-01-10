module.exports = (sequelize, Sequelize) => {
  const Presentation = sequelize.define(
    "presentations",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name_pre: {
        type: Sequelize.STRING,
      },
      owner_pre: {
        type: Sequelize.STRING,
      },
      modified: {
        type: Sequelize.STRING,
      },
      created: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return Presentation;
};
