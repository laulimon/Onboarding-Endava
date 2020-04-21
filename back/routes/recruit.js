const express = require('express');
const router = express.Router();
const { Recruit, Discipline, User, TaskRecruit } = require('../models');
const Sequelize = require("sequelize")
const Promise = require("bluebird");
module.exports = router;

router.get('/', function (req, res, next) {
    const Op = Sequelize.Op
    if (req.query.s) {
        Recruit.findAll({
            include: [
                { model: Discipline }
            ],
        })
            .then(reclutas => reclutas.filter(recluta => {
                let fullName = `${recluta.name} ${recluta.lastName}`
                let fullNameMin = fullName.toLowerCase()
                let query = req.query.s
                let queryMin = query.toLowerCase()
                return fullNameMin.includes(queryMin)
            }))
            .then(recruits => res.status(200).json(recruits))
    } else {
        Recruit.findAll({
            include: [
                { model: Discipline }
            ],
        })
            .then((recruit) => res.status(200).json(recruit))
    }
});

router.get("/:id", (req, res, next) => {
    Recruit.findByPk(req.params.id)
        .then(recruit => {
            if (recruit) {
                res.status(200).json(recruit)
            } else {
                res.sendStatus(404)
            }

        })
        .catch(err => res.sendStatus(500))

});

router.post('/', function (req, res, next) {
    Recruit.create({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        DNI: req.body.DNI,
        entryDate: req.body.entryDate
    })
        .then(nuevoRecruit => {
            return Promise.all([
                nuevoRecruit.setDiscipline(req.body.disciplineId),
                nuevoRecruit.setUser(req.body.userId)
            ])
        })
        .then((nuevoRecruit) => res.status(201).json(nuevoRecruit))
        .catch(function (err) {
            console.log(err);
        })
});

router.delete("/delete/:id", (req, res, next) => {
    let recruitId = req.params.id
    TaskRecruit.destroy({
        where: {
            recruitId
        }
    })
        .then(() => {
            return Recruit.destroy({
                where: {
                    id: recruitId
                }
            })
        })
        .then(() => {
            Recruit.findAll({
                include: [
                    { model: Discipline }
                ],
            })
                .then(allRecruit => {
                    res.status(200).send(allRecruit)
                })
        })
})

router.put("/edit/:id", (req, res, next) => {
    Recruit.findByPk(req.params.id)
        .then(recruit => {
            if (recruit) {
                recruit.update(req.body)
                    // aca hay que desglosar el req.body para que complete solo los datos que estan defined
                    .then(recruitU => res.status(200).json(recruitU))
            } else {
                res.sendStatus(404)
            }

        })
        .catch(err => res.sendStatus(500))
})