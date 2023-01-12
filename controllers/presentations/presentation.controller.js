const db = require("../../models");
const Presentation = db.presentations;
const Account = db.accounts;
const Op = db.Sequelize.Op;

const presentationCtrl = {
  findAll: async (req, res) => {
    try {
      const email = req.query.email;
      const user = await Account.findOne({
        where: { email: email },
      });

      if (!user) {
        return res.status(400).json({ msg: "Email doesn't exists" });
      }

      const presentations = await Presentation.findAll({
        where: { owner_pre: user.dataValues.id },
      });
      if (presentations) {
        presentations.fullname = user.dataValues.fullname;
      }

      res.status(200).json(presentations);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  findOne: (req, res) => {
    const id = req.params.id;

    Presentation.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Presentation with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Presentation with id=" + id,
        });
      });
  },

  create: async (req, res) => {
    try {
      const { email, name_pre } = req.body;
      if (!name_pre) {
        return res.status(400).send({
          msg: "Content can not be empty!",
        });
      }

      const user = await Account.findOne({
        where: { email: email },
      });
      if (!user) {
        return res.status(400).send({
          msg: "Email doesn't exists!",
        });
      }

      const newPresentation = {
        name_pre: name_pre,
        owner_pre: user.dataValues.id,
        modified: "modifying",
        created: "modifying",
      };
      await Presentation.create(newPresentation);
      res.json({ msg: "Presentation has been created!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = presentationCtrl;
