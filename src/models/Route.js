import {Sequelize} from "sequelize";

export default function Route(sequelize){
    return sequelize.define("Route", {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: Sequelize.STRING(30)
        },
        description:{
            type: Sequelize.STRING(100)
        }
    },
        {
            timestamps: false,
            tableName: "routes",
        })

}