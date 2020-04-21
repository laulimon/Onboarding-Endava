const express = require('express');
const { Discipline } = require("../models/index")
const router = express.Router();

router.post("/newDiscipline", function (req, res) {
    Discipline.create(req.body)
        .then(res.send("Se creo la disciplina"))
})

router.get('/', function (req, res, next) {
    Discipline.findAll()
        .then((allDisciplines) => res.status(200).json(allDisciplines))
        .catch((err) => console.log(err))
});


module.exports = router