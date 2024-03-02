const express = require("express");
const {
    getBlogs, 
    getBlogById,
    updateBlog,
    deleteBlog,
    createBlogWithImage
} = require ("../controllers/UserController.js");
const upload = require('../middleware/uploadMiddleware.js'); // Updated multer middleware for Cloudinary

const router = express.Router();

router.get('/blogs', getBlogs);
router.get('/blogs/:id', getBlogById);
router.post('/blogs-img', upload.single('imageUrl'), createBlogWithImage); // Use the updated multer middleware here
router.patch('/blogs/:id', upload.single('imageUrl'), updateBlog);
router.delete('/blogs/:id', deleteBlog);

module.exports = router;
