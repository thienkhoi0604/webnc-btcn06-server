module.exports = (sequelize, Sequelize) => {
  const Slide = sequelize.define(
    "slides",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      id_presentation: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      slide_type: {
        type: Sequelize.STRING,
      },
      question: {
        type: Sequelize.STRING,
      },
      longer_description: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      result_layout: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return Slide;
};
