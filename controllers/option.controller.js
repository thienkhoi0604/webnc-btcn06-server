const db = require("../models");
const Option = db.options;
const Op = db.Sequelize.Op;

const optionCtrl = {
  findAll: (req, res) => {
    Option.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving options.",
        });
      });
  },
  findOneBySlide: (req, res) => {
    const idSlide = req.params.idSlide;
    var condition = idSlide
      ? { id_slide: { [Op.like]: `%${idSlide}%` } }
      : null;

    Option.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving options.",
        });
      });
  },
};

module.exports = optionCtrl;
