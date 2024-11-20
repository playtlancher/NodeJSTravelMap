import Router from 'express';
import * as UserController from "../controllers/UserController.js";
import * as MainController from "../controllers/MainController.js";
import * as RouteController from "../controllers/RouteController.js";

const router = new Router();

router.get('/login', MainController.isNotAuthenticated, UserController.getLogin);
router.post('/login', MainController.isNotAuthenticated, UserController.postLogin);
router.get('/registration', MainController.isNotAuthenticated, UserController.getRegistration);
router.post('/registration', MainController.isNotAuthenticated, UserController.postRegistration);
router.get('/logout', MainController.isAuthenticated, UserController.logout);
router.get('/routes', MainController.isAuthenticated, MainController.getMainPage);
router.get('/routes/:id', MainController.isAuthenticated, RouteController.getRoute);
router.post('/routes/:id/comment', MainController.isAuthenticated, RouteController.postComment);
router.get('/add-route', MainController.isAuthenticated, RouteController.getAddRoute);
router.post('/add-route', MainController.isAuthenticated, RouteController.postRoute);

export default router;