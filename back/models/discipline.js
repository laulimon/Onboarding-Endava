const Sequelize = require('sequelize')
const sequelize = require('../db/db');

class Discipline extends Sequelize.Model { }

Discipline.init({
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'discipline'
});

module.exports = Discipline;