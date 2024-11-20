import * as db from '../config/DB.js'

const routes = db.routes

async function getRouteById(id) {
    return routes.findOne({where: {id}})
}

async function createRoute(name, description) {
    return routes.create({
        name: name,
        description: description,
    })
}

export {getRouteById, createRoute}