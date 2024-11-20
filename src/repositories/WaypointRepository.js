import * as db from '../config/DB.js';

const waypoints = db.waypoints;

async function createWaypoint(latitude, longitude, routeId) {
    return await waypoints.create({
        latitude: latitude,
        longitude: longitude,
        route_id: routeId
    })
}
async function findByRouteId(id) {
    return await waypoints.findAll({where: {route_id: id}});
}


export {createWaypoint, findByRouteId};