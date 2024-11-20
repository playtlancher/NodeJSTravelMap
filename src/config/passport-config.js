import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt';
import * as db from '../config/db.js'

const users = db.users;

async function authenticateUser(username, password, done) {
    const user = await users.findOne({where: {username}});
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

function initialize(passport) {
    passport.use(new LocalStrategy(
        {usernameField: 'username', passwordField: 'password'},
        authenticateUser
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await users.findOne({where: {id}});
            if (!user) {
                return done(new Error('User not found'));
            }
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}
export default initialize;