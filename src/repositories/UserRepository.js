import * as db from "../config/DB.js";
import bcrypt from "bcrypt";
import passport from "passport";
import initialize from '../config/passport-config.js'

const users = db.users;

initialize(passport)

async function createUser(username, password) {
    try {
        if (!password) throw new Error("Password is required");

        const dbUser = await users.findOne({ where: { username } });
        if (dbUser) {
            return { success: false, message: "User already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await users.create({
            username: username,
            password: hashedPassword,
        });

        return { success: true, message: "User created successfully" };
    } catch (err) {
        console.error(err);
        return { success: false, message: "Error creating user" };
    }
}

async function authenticateUser(req, res, next) {
    return await passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    })(req, res, next);
}


export { createUser, authenticateUser };
