import Sequelize from 'sequelize';

export default function Comment(sequelize) {
    return sequelize.define('Comment', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: Sequelize.TEXT,
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'User',
                key: 'id',
            }
        },
        route_id:{
            type: Sequelize.INTEGER,
            references: {
                model: 'Route',
                key: 'id',
            }
        }
    },{
        timestamps: false,
        tableName: 'comments',
    })
}