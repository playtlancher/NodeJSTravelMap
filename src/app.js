import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import router from './routes/UserRoute.js';
import * as UserRepository from './repositories/UserRepository.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());

// Першим має бути session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,  // Ваш секретний ключ
    resave: false,
    saveUninitialized: false,
}));

// Потім ініціалізація passport
app.use(passport.initialize());
app.use(passport.session());

// Маршрути
app.use("/", router);
app.use(express.static('src/public'));

// Встановлення виду шаблонів
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`Server runs on http://localhost:${port}`);
});


