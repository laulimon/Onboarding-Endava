const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../models/index');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (inputEmail, password, done) {
        User.findOne({
            where: {
                email: inputEmail
            }
        })
            .then(user => {
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect username.'
                    });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                return done(null, user);
            })
            .catch(done);
    }
));



passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findByPk(id)
        .then(user => done(null, user))
});

module.exports = passport