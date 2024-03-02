const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'demo', // Specify the folder where you want to store the images
    allowed_formats: ['jpg', 'png', 'jpeg'], // Add allowed image formats if necessary
    // Other Cloudinary configuration parameters if needed
  },
  // After file upload, log the Cloudinary public ID (name)
  filename: function (req, file, cb) {
    cb(undefined, file.originalname); // Keep original filename
  },
  onFileUploadComplete: function (file) {
    console.log('Cloudinary public ID:', file.public_id);
  }
});

// Initialize multer instance with Cloudinary storage   
const upload = multer({ storage: storage });

module.exports = upload;
