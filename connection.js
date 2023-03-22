const {Sequelize} = require('sequelize');
const dotenv = require('dotenv')
dotenv.config();

const connection = new Sequelize(
    process.env.database_name,process.env.database_username,process.env.database_password,{
    'host':process.env.database_host,
    'dialect':'mysql',
    'logging':false
})

module.exports = {connection}