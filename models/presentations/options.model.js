module.exports = (sequelize, Sequelize) => {
  const Option = sequelize.define(
    "options",
    {
      id_option: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      id_slide: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      value_option: {
        type: Sequelize.STRING,
      },
      vote: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );

  return Option;
};
