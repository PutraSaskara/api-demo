const { Sequelize } = require("sequelize");
const mysql2 = require('mysql2');

const db = new Sequelize('personal_menwishfew','personal_menwishfew','5975180a8f3e376dc2b84e81ac96001327162fc9',{
    host: '3dg.h.filess.io',
    dialect: 'mysql',
    dialectModule: mysql2,
    port: '3307'
});

module.exports = db;