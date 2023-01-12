module.exports = (sequelize, Sequelize) => {
  const GroupUser = sequelize.define(
    "group_users",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return GroupUser;
};
