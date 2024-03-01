const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Set up Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public'); // Specify the destination folder for storing images
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, uuidv4() + uniqueSuffix + fileExtension); // Generate a unique filename
    }
});

// Initialize multer instance
const upload = multer({ storage: storage });

module.exports = upload;
