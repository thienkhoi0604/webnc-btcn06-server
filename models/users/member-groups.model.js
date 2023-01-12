module.exports = (sequelize, Sequelize) => {
  const MemberGroup = sequelize.define(
    "member_groups",
    {
      id_group: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      member: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      role: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return MemberGroup;
};
