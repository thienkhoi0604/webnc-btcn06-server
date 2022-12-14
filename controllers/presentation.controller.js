const db = require("../models");
const Presentation = db.presentations;
const Op = db.Sequelize.Op;

const presentationCtrl = {
  findAll: (req, res) => {
    Presentation.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while retrieving presentations.",
        });
      });
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

  create: (req, res) => {
    if (!req.body.name_pre) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    // Create a Tutorial
    const presentation = {
      name_pre: req.body.name_pre,
      owner_pre: req.body.owner,
      modified: req.body.modified ? req.body.modified : "modifying",
      created: "modifying",
    };

    // Save Tutorial in the database
    Presentation.create(presentation)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while creating the Presentation.",
        });
      });
  },
};

module.exports = presentationCtrl;
