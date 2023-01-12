const db = require("../../models");
const GroupUser = db.groupUsers;
const Account = db.accounts;
const MemberGroup = db.memberGroups;

const groupUserCtrl = {
  getGroupById: async (req, res) => {
    try {
      const id = req.query.id;
      const result = await GroupUser.findOne({
        where: { id: id },
      });

      res.json(result);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  create: async (req, res) => {
    try {
      const { email, name } = req.body;

      if (!name) {
        return res.status(400).json({ msg: "Please fill in name field." });
      }

      const user = await Account.findOne({ where: { email } });
      if (!user)
        return res.status(400).json({ msg: "This email doesn't exist." });

      const newGroup = {
        name: name,
      };
      const result = await GroupUser.create(newGroup);

      const newMember = {
        id_group: result.dataValues.id,
        member: user.dataValues.id,
        role: "owner",
      };
      await MemberGroup.create(newMember);

      res.json({ msg: "Group has been created!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = groupUserCtrl;
