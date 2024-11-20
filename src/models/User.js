import {Sequelize} from "sequelize";


export default function User(sequelize) {
    return sequelize.define("User", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING(30)
        },
        password: {
            type: Sequelize.STRING(75)
        }
    },
        {
            timestamps: false,
            tableName: "users",
        });
}
