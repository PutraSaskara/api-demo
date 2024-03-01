const { Sequelize } = require("sequelize");
const db = require ("../config/Database.js");

const {DataTypes} = Sequelize;

const User = db.define('exp',{
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    year: DataTypes.STRING
},{
    freezeTableName:true
});

module.exports = User;

(async()=>{
    await db.sync();
})();