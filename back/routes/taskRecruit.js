const express = require('express');
const router = express.Router();
const { TaskRecruit, Recruit, Discipline, User, Task } = require('../models');
const Sequelize = require("sequelize")
const Promise = require("bluebird");
const nodemailer = require("nodemailer");
require('dotenv').config();
const hbs = require('nodemailer-express-handlebars');
module.exports = router;


//-------------------------> config email task assigned
const sendMail = function (objMail) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "endavaOnBoard@gmail.com",
            pass: "onboard123"
        }
    });

    const taskRecruitAssigned = {
        from: "endavaOnBoard@gmail.com",
        to: `${objMail.taskOwnerEmail}`,
        subject: "There is a new task waiting for you",
        text: `Dear ${objMail.taskOwnerName} ${objMail.taskOwnerLastName},
        You have been designated as the owner of:

           - Task: ${objMail.task}.
           - New hires: ${objMail.recruitName} ${objMail.recruitLastName}.
           - Due date:  ${objMail.dueDate}.

        Please check the status of all your tasks in the ON BOARD APP.
        `

    };
    transporter.sendMail(taskRecruitAssigned, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Se ha enviando el mail");
        }
    });
}
//------------------------->


router.get('/', function (req, res, next) {
    TaskRecruit.findAll()
        .then((tasksRec) => res.status(200).json(tasksRec))
});

router.get("/:recruitId", (req, res, next) => {
    TaskRecruit.findAll({
        where: {
            recruitId: req.params.recruitId,
        }
    })
        .then(tasks => {
            if (tasks) {
                res.status(200).json(tasks)
            } else {
                res.sendStatus(404)
            }

        })
        .catch(err => res.sendStatus(500))

});

router.get("byUser/:recruitId", (req, res, next) => {
    TaskRecruit.findAll({
        where: {
            recruitId: req.params.recruitId,
        }
    })
        .then(tasks => {
            tasks.findAll({
                userId: req.user.id
            })
        })
        .then(tasks => {
            if (tasks) {
                res.status(200).json(tasks)
            } else {
                res.sendStatus(404)
            }

        })
        .catch(err => res.sendStatus(500))

});

router.post('/', function (req, res, next) {
    TaskRecruit.create({
        dueDate: req.body.dueDate
    })
        .then(nuevaTaskRec => {
            return Promise.all([
                nuevaTaskRec.setTask(req.body.taskId),
                nuevaTaskRec.setUser(req.body.responsableId),
                nuevaTaskRec.setRecruit(req.body.recruitId)
            ])
        })
        .then((nuevaTaskRec) => {
            TaskRecruit.findAll({
                include: [
                    { model: Recruit },
                    { model: Task },
                    { model: User }
                ],
                where: { id: nuevaTaskRec[0].id }
            })
                .then(nuevaTaskRec => {
                    let objMail = {
                        taskOwnerName: nuevaTaskRec[0].dataValues.user.dataValues.name,
                        taskOwnerLastName: nuevaTaskRec[0].dataValues.user.dataValues.lastName,
                        taskOwnerEmail: nuevaTaskRec[0].dataValues.user.dataValues.email,
                        task: nuevaTaskRec[0].dataValues.task.dataValues.description,
                        recruitName: nuevaTaskRec[0].dataValues.recruit.dataValues.name,
                        recruitLastName: nuevaTaskRec[0].dataValues.recruit.dataValues.lastName,
                        dueDate: nuevaTaskRec[0].dataValues.dueDate
                    }
                    sendMail(objMail)
                    res.status(201).json(nuevaTaskRec[0])
                }
                )
                .catch(err => console.log(err)
                )
        })
})

router.delete("/:id", (req, res, next) => {
    TaskRecruit.findByPk(req.params.id)
        .then(task => {
            if (task) {
                task.destroy()
                    .then(() => res.sendStatus(204))
            } else {
                res.sendStatus(404)
            }

        })
        .catch(err => res.sendStatus(500))
})

router.delete("byRecruit/:recruitId", (req, res, next) => {
    TaskRecruit.findAll({
        where: {
            recruitId: req.params.recruitId,
        }
    })
        .then(tasks => {
            if (tasks) {
                tasks.destroy()
                    .then(() => res.sendStatus(204))
            } else {
                res.sendStatus(404)
            }

        })
        .catch(err => res.sendStatus(500))
})

router.put("/:id", (req, res, next) => {
    if (req.body.taskState) {
        TaskRecruit.update({ userId: req.body.newUserId }, { where: { userId: req.body.userId } })
            .then(taskU => res.status(200).json(taskU))
            .catch(err => console.log(err))
    } else {
        TaskRecruit.findByPk(req.params.id)
            .then(task => {
                if (task) {
                    task.update({
                        userId: req.body.userId
                    })
                        .then(taskU => res.status(200).json(taskU))
                } else {
                    res.sendStatus(404)
                }
            })
            .catch(err => res.sendStatus(500))
    }






})


