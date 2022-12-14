const db = require("../models");
const Slide = db.slides;
const Option = db.options;
const Op = db.Sequelize.Op;

const slideCtrl = {
  findAll: (req, res) => {
    Slide.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  },

  findOneByPresentation: (req, res) => {
    const idPresentation = req.params.idPresentation;
    var condition = idPresentation
      ? { id_presentation: { [Op.like]: `%${idPresentation}%` } }
      : null;

    Slide.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving slides.",
        });
      });
  },

  create: (req, res) => {
    // Create a Tutorial
    const slide = {
      id_presentation: req.body.id_presentation,
      slide_type: "Multiple Choice",
      longer_description: null,
      image: null,
      result_layout: "bars",
    };

    // Save Tutorial in the database
    Slide.create(slide)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Slide.",
        });
      });
  },

  delete: async (req, res, next) => {
    const id = req.params.id;

    Option.destroy({
      where: { id_slide: Number(id) },
    }).then((nums) => {
      console.log("delete options");
    });

    Slide.destroy({
      where: { id: Number(id) },
    })
      .then((num) => {
        if (num) {
          res.send({
            message: "Slide was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id,
        });
      });
  },
};

module.exports = slideCtrl;
