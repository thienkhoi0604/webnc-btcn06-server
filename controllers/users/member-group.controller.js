const db = require("../../models");
const MemberGroup = db.memberGroups;
const Account = db.accounts;
const GroupUser = db.groupUsers;
const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail.js");
const { CLIENT_URL } = process.env;

const memberGroupCtrl = {
  getGroupOfUser: async (req, res) => {
    try {
      const email = req.params.email;

      const result = await MemberGroup.findAll({
        include: {
          model: Account,
          as: "account",
          where: { email: email },
        },
      });
      res.json(result);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getMemberInGroup: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await MemberGroup.findAll({
        where: {
          id_group: id,
        },
        include: {
          model: Account,
          as: "account",
        },
      });
      res.json(result);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  sendInvitation: async (req, res) => {
    try {
      const { id_group, email } = req.body;

      const user = await Account.findOne({
        where: { email: email },
        attributes: ["id"],
      });
      if (!user) {
        return res.json({
          msg: "Member is not exist",
        });
      }

      const member = await MemberGroup.findOne({
        where: { id_group: id_group, member: user.dataValues.id },
      });
      if (member) {
        return res.json({ msg: "Member is exist in this group!" });
      }

      const newMember = {
        id_group,
        member: user.dataValues.id,
        role: "member",
      };

      const activation_token = createActivationToken(newMember);

      const url = `${CLIENT_URL}/group/invitation/${activation_token}`;
      sendMail(email, url, "Accept the invitation");

      res.json({
        msg: "Send invitation success",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addMember: async (req, res) => {
    try {
      const { activation_token } = req.body;

      const member = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const user = await Account.findOne({
        where: { id: member.member },
        attributes: ["id"],
      });
      if (!user) {
        return res.json({
          msg: "Member is not exist",
        });
      }

      const memberFind = await MemberGroup.findOne({
        where: { id_group: member.id_group, member: member.member },
      });
      if (memberFind) {
        return res.json({ msg: "Member is exist in this group!" });
      }

      const newMember = {
        id_group: member.id_group,
        member: member.member,
        role: member.role,
      };

      MemberGroup.create(newMember);
      res.json({
        msg: "Member is added in your group",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteMemberInGroup: async (req, res) => {
    try {
      const member = await MemberGroup.findOne({
        where: { member: req.body.idUser, id_group: req.body.idGroup },
      });
      member.destroy().then(function () {
        res.status(200).json({
          msg: "User deleted.",
        });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteAllMemberInGroup: async (req, res) => {
    try {
      const idGroup = req.body.idGroup;
      const members = await MemberGroup.destroy({
        where: { id_group: idGroup },
        force: true,
      });
      const group = await GroupUser.destroy({
        where: { id: idGroup },
        force: true,
      });

      res.status(200).json({
        msg: "Group deleted.",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

module.exports = memberGroupCtrl;
