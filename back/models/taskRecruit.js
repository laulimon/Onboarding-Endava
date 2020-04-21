const Sequelize = require('sequelize')
const sequelize = require('../db/db');

class TaskRecruit extends Sequelize.Model { }

TaskRecruit.init({
    dueDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    finishDate: {
        type: Sequelize.DATEONLY,
    },
    comment: {
        type: Sequelize.TEXT,
    },
    state: {
        type: Sequelize.STRING,
        defaultValue: "pending"
    }
}, {
    sequelize,
    modelName: 'taskRecruit'
});

module.exports = TaskRecruit;