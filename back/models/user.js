const Sequelize = require('sequelize')
const sequelize = require('../db/db');

const crypto = require('crypto');
class User extends Sequelize.Model { }

User.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }

    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }

    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }

    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    salt: {
        type: Sequelize.STRING
    },
    fullName: {
        type: Sequelize.VIRTUAL,
        get() {
            return `${this.name} ${this.lastName}`
        }
    }
}, {
    sequelize,
    modelName: 'user'
});


User.beforeCreate((user) => {
    user.salt = crypto.randomBytes(20).toString('hex');
    user.password = crypto.createHmac('sha1', user.salt).update(user.password).digest('hex')
})


User.prototype.validPassword = function (password) {
    const newPassword = crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    return newPassword === this.password;
}

module.exports = User;