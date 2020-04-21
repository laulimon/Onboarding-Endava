const Sequelize = require('sequelize')
const sequelize = require('../db/db');

class Task extends Sequelize.Model { }

Task.init({
    description: {
        type: Sequelize.TEXT,
        allowNull: false

    }
}, {
    sequelize,
    modelName: 'task'
});

module.exports = Task;