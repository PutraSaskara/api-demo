// filess.io

const { Sequelize } = require("sequelize");
const mysql2 = require('mysql2');

const db = new Sequelize('personal_menwishfew','personal_menwishfew','5975180a8f3e376dc2b84e81ac96001327162fc9',{
    host: '3dg.h.filess.io',
    dialect: 'mysql',
    dialectModule: mysql2,
    port: '3307'
});

module.exports = db;

// freesqldatabas

// const { Sequelize } = require("sequelize");
// const mysql2 = require('mysql2');

// const db = new Sequelize('sql6687828','sql6687828','w8wSEufqNR',{
//     host: 'sql6.freesqldatabase.com',
//     dialect: 'mysql',
//     dialectModule: mysql2,
//     port: '3306'
// });

// module.exports = db;


// local

// const { Sequelize } = require("sequelize");
// const mysql2 = require('mysql2');

// const db = new Sequelize('demo','root','',{
//     host: 'localhost',
//     dialect: 'mysql',
//     dialectModule: mysql2,
//     port: '3306'
// });

// module.exports = db;