import * as RouteRepository from '../repositories/RouteRepository.js'
import * as CommentRepository from '../repositories/CommentRepository.js'
import * as UserRepository from '../repositories/UserRepository.js'
import * as config from "../config/config.js";
import * as WaypointRepository from "../repositories/WaypointRepository.js";



async function getRoute(req, res) {
    const id = req.params.id;
    const username = req.user.username;
    const user = await UserRepository.findByUsername(username);
    const route = await RouteRepository.getRouteById(id);
    const comments = await CommentRepository.getAllByRouteId(id);
    const waypoints = await WaypointRepository.findByRouteId(id);
    return res.render('route', {route: route, route_id: id, comments: comments, user: user, waypoints: waypoints});
}

async function getAddRoute(req, res) {
    const username = req.user.username;
    const user = await UserRepository.findByUsername(username);
    return res.render('addRoute', {user: user});
}

async function postRoute(req, res) {
    const {name, description, waypoints} = req.body;
    const waypointsJson = JSON.parse(waypoints);
    if (name && description && waypoints) {
        const route = await RouteRepository.createRoute(name, description, waypoints);
        waypointsJson.forEach(waypoint => {
            WaypointRepository.createWaypoint(waypoint["latitude"], waypoint["longitude"], route.id);
        })
        return res.redirect(config.defaultPage);
    }
}

async function postComment(req, res) {
    const username = req.user.username;
    const user = await UserRepository.findByUsername(username);
    await CommentRepository.createComment(req.body.content, user.id, req.params.id);
    return res.redirect('/routes/' + req.params.id);
}

export {getRoute, getAddRoute, postRoute, postComment};