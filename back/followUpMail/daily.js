const express = require('express');
const { TaskRecruit, Recruit, Discipline, User, Task } = require('../models');
const Sequelize = require("sequelize")
const Promise = require("bluebird");
const nodemailer = require("nodemailer");
require('dotenv').config();
const hbs = require('nodemailer-express-handlebars');

//-------------------------> config email 
const sendMail = function (obj, num) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "endavaOnBoard@gmail.com",
            pass: "onboard123"
        }
    });

    let followUpMail = {}

    if (num > 0) {
        followUpMail = {
            from: "endavaOnBoard@gmail.com",
            to: `${obj.email}`,
            subject: `You have a task that expires in ${num} days.`,
            text: `Dear ${obj.name} ${obj.lastName},

        The next task expires in ${num} days:

        - New hire: ${obj.newHire}.
        - Task description: ${obj.taskName}.
        - Status: ${obj.status}.
        - Due Date: ${obj.dueDate}.

        Please check the status of all your tasks in the ON BOARD APP.
        `

        };
    } else {
        followUpMail = {
            from: "endavaOnBoard@gmail.com",
            to: `${obj.email}`,
            subject: `You have an overdue task `,
            text: `Dear ${obj.name} ${obj.lastName},
    
            The next task is overdue:
    
            - New hire: ${obj.newHire}.
            - Task description: ${obj.taskName}.
            - Status: ${obj.status}.
            - Due Date: ${obj.dueDate}.
    
            Please check the status of all your tasks in the ON BOARD APP.
    
            `
        };
    }


    transporter.sendMail(followUpMail, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Se ha enviando el mail");
        }
    });
}
//------------------------->




const dailyEmail = () => {
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
                            allTasks.map(task => {
                                let today = new Date();
                                let due = new Date(task.dueDate);
                                let objMail = {
                                    name: user.name,
                                    lastName: user.lastName,
                                    email: user.email,
                                    newHire: `${task.recruit.name} ${task.recruit.lastName}`,
                                    taskName: task.task.description,
                                    dueDate: task.dueDate.split("-").reverse().join("/"),
                                    status: task.state
                                }

                                if (task.state != "finished") {
                                    if (due > today) {
                                        var diffTime = Math.abs(due - today);
                                        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                        (diffDays <= 3) ? sendMail(objMail, diffDays) : null;
                                    } else {
                                        sendMail(objMail, 0)
                                    }
                                }
                            })
                        })

                })
            })
    }, 86400000)
}
// dailyEmail() activar una vez que estes creados los usuarios e ingresantes con sus respectivas tareas.













const prueba = "aqui"
module.exports = prueba




