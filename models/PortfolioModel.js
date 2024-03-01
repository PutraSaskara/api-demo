const { Sequelize } = require("sequelize");
const db = require ("../config/Database.js");

const { DataTypes } = Sequelize;

const Portfolio = db.define('portfolio', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    domain: {
        type: DataTypes.STRING,
        allowNull: true
    },
    github: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING, 
        allowNull: true 
    },
    imageUrl: {
        type: DataTypes.STRING, // Define as STRING to store the URL
        allowNull: false // Depending on your requirements, imageUrl might be optional
    },
    keywords: {
        type: DataTypes.STRING, 
        allowNull: true 
    }
}, {
    freezeTableName: true
});

module.exports = Portfolio;

(async () => {
    await db.sync();
})();
