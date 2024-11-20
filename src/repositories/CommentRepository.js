import * as db from '../config/DB.js';
import User from "../models/User.js";

const comments = db.comments;
const user = db.users;


async function getAllByRouteId(id) {
    return await comments.findAll({
        where: {route_id: id},
        include: [
            {
                model: user,
                as: 'user',
                attributes: ['username'],
            },
        ],
    });
}

async function createComment(content, userId, routeId) {
    return await comments.create({content: content, user_id: userId, route_id: routeId});
}

export {getAllByRouteId, createComment};