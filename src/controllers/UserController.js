import * as UserService from '../repositories/UserRepository.js';

function getLogin(req, res) {
    res.render('login');
}

function getRegistration(req, res) {
    res.render('registration');
}

async function postLogin(req, res, next) {
    UserService.authenticateUser(req, res, next)
}

async function postRegistration(req, res) {
    const {username, password1, password2} = req.body;

    if (password1 !== password2) {
        return res.redirect("/registration");
    }

    const result = await UserService.createUser(username, password1);
    if (result.success) {
        res.redirect("/login");
    } else {
        res.redirect(`/registration`);
    }
}

function logout(req, res) {
    req.logOut(function (err) {
        if (err) {
            console.log(err);
        }
        res.redirect('/login')
    })
}


export {getLogin, getRegistration, postLogin, postRegistration, logout};
