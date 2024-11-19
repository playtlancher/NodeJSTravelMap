const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../config/db').users;

async function authenticateUser(username, password, done) {
    const user = await User.findOne({where: { username }});
    if (user == null) {
        return done(null, false, {message: 'User not found'});
    }
    try {
        if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Incorrect password'});
        }
    } catch (err) {
        return done(err);
    }
}

module.exports = function initialize(passport) {
    passport.use(new LocalStrategy(
        { usernameField: 'username', passwordField: 'password' },
        authenticateUser
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({ where: { id } });
            if (!user) {
                return done(new Error('User not found'));
            }
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};