const express = require('express');
const { TaskRecruit, Recruit, Discipline, User, Task } = require('../models');
const Sequelize = require("sequelize")
const Promise = require("bluebird");
const nodemailer = require("nodemailer");
require('dotenv').config();
const hbs = require('nodemailer-express-handlebars');

//-------------------------> config email 
const sendMail = function (objMail) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "endavaOnBoard@gmail.com",
            pass: "onboard123"
        }
    });

    const followUpMail = {
        from: "endavaOnBoard@gmail.com",
        to: `${objMail.email}`,
        subject: "This is your weekly report from ON BOARD",
        text: `Dear ${objMail.name} ${objMail.lastName},

        This is the summary of all the tasks in which you are assigned as owner:

         - Amount of pending tasks: ${objMail.pendingTask}.
         - Amount of ongoing tasks: ${objMail.onGoingTask}.
         - Amount of blocked out tasks: ${objMail.blockedOutTask}.
         - Amount of finished tasks: ${objMail.finishedTask}.

         --------------------------------------------------------

        The status of your unfinished tasks is the following:

         - Amount of tasks near to due date: ${objMail.nearDueDateTask}.
         - Amount of expired tasks: ${objMail.expiredTask}.

        Please check the status of all your tasks in the ON BOARD APP.

        `
    };
    transporter.sendMail(followUpMail, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Se ha enviando el mail");
        }
    });
}
//------------------------->




const weeklyEmail = () => {
    setInterval(() => {
        User.findAll()
            .then(res => {
                res.map(user => {
                    TaskRecruit.findAll({
                        include: [
                            { model: Recruit },
                            { model: Task },
                        ],
                        where: {
                            userId: user.id
                        }
                    })
                        .then(allTasks => {
                            let pending = 0
                            let onGoing = 0
                            let finished = 0
                            let blockedOut = 0
                            let expired = 0
                            let nearDueDate = 0

                            allTasks.map(task => {
                                let today = new Date()
                                let due = new Date(task.dueDate)

                                switch (task.state) {
                                    case "finished":
                                        finished++
                                        break
                                    case "pending":
                                        pending++
                                        break
                                    case "blocked out":
                                        blockedOut++
                                        break
                                    case "started":
                                        onGoing++
                                        break
                                    default:

                                }
                                if (due > today && task.state != "finished") {
                                    var diffTime = Math.abs(due - today);
                                    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                    (diffDays <= 3) ? nearDueDate++ : null
                                } else if (task.state != "finished") {
                                    expired++
                                }
                            })
                            return ({ pending, finished, blockedOut, onGoing, expired, nearDueDate })
                        })
                        .then((input) => {
                            let objMail = {
                                name: user.name,
                                lastName: user.lastName,
                                email: user.email,
                                pendingTask: input.pending,
                                onGoingTask: input.onGoing,
                                finishedTask: input.finished,
                                blockedOutTask: input.blockedOut,
                                expiredTask: input.expired,
                                nearDueDateTask: input.nearDueDate
                            }
                            sendMail(objMail)

                        })
                })
            })
    }, 2592000000)
}
// weeklyEmail()     activar una vez que estes creados los usuarios e ingresantes con sus respectivas tareas.











const prueba = "aqui"
module.exports = prueba






