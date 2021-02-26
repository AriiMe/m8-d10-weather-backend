const Sequelize = require('sequelize')
const User = require('../routes/users/schema')

const sequelize = new Sequelize(

    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: process.env.PGHOST,
        dialect: "postgres",
        pool: {
            min: 0,
            max: 10,
            idle: 20000,
            evict: 15000,
            acquire: 30000
        },
    }

);
const models = {
    User: User,
    sequelize: sequelize
}
module.exports = models;