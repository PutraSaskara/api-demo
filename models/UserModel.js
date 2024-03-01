const { Sequelize } = require("sequelize");
const db = require ("../config/Database.js");

const { DataTypes } = Sequelize;

const User = db.define('blogs', {
    source: {
        type: DataTypes.STRING,
        allowNull: true
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING, 
        allowNull: true 
    },
    imageUrl: {
        type: DataTypes.STRING, // Define as STRING to store the URL
        allowNull: false // Depending on your requirements, imageUrl might be optional
    },
    content: {
        type: DataTypes.STRING, 
        allowNull: true 
    },
    keywords: {
        type: DataTypes.STRING, 
        allowNull: true 
    }
}, {
    freezeTableName: true
});

module.exports = User;

(async () => {
    await db.sync();
})();
