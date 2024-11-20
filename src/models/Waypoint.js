import {Sequelize} from "sequelize";

export default function Waypoint(sequelize) {
    return sequelize.define("Waypoint", {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        longitude:{
            type: Sequelize.DECIMAL(14, 10),
        },
        latitude:{
            type: Sequelize.DECIMAL(14, 10),
        },
        route_id:{
            type: Sequelize.INTEGER,
            references: {
                model: "Route",
                key: 'id',
            }
        }
    },
        {
            timestamps: false,
            tableName: 'waypoints',
        })
}