const express = require("express");
const {
    getBlogs, 
    getBlogById,
    updateBlog,
    deleteBlog,
    createBlogWithImage
} = require ("../controllers/UserController.js");
const upload = require ('../middleware/uploadMiddleware.js'); // Import the multer middleware

const router = express.Router();

router.get('/blogs', getBlogs);
router.get('/blogs/:id', getBlogById);
router.post('/blogs-img', upload.single('imageUrl'), createBlogWithImage); // Apply the middleware here
router.patch('/blogs/:id', upload.single('imageUrl'), updateBlog);
router.delete('/blogs/:id', deleteBlog);

module.exports = router;
