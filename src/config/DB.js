import dotenv from 'dotenv';
import Sequelize from "sequelize";
import User from "../models/User.js";
import Route from "../models/Route.js";
import Comment from "../models/Comment.js";
import Waypoint from "../models/Waypoint.js";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: "postgres",
    host: process.env.DB_HOST
})

const users = User(sequelize);
const routes = Route(sequelize);
const comments = Comment(sequelize);
const waypoints = Waypoint(sequelize);
comments.belongsTo(users, { foreignKey: 'user_id', as: 'user' });


export {
    sequelize,
    users,
    routes,
    comments,
    waypoints,
};