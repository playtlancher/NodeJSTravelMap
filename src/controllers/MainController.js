import * as db from "../config/DB.js";

const routes = db.routes;

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function isNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/routes');
    }
    return next();
}

async function getMainPage(req, res) {
    const route = await routes.findAll();
    const username = req.user.username;
    const user = await db.users.findOne({where: {username}});
    res.render('routes', {routes: route});
}

export {getMainPage, isNotAuthenticated, isAuthenticated}