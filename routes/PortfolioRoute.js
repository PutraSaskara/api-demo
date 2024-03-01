const express = require("express");
const {
    getPortfolio,
    createPortoWithImage,
    getPortoById,
    updatePorto,
    deletePorto
} = require ("../controllers/PortfolioController.js")
const upload = require ('../middleware/uploadMiddleware.js'); // Import the multer middleware


const router = express.Router();

router.get('/portfolio', getPortfolio);
router.get('/portfolio/:id', getPortoById);
router.post('/portfolio-img', upload.single('imageUrl'), createPortoWithImage); // Apply the middleware here
router.patch('/portfolio/:id', upload.single('imageUrl'), updatePorto);
router.delete('/portfolio/:id', deletePorto);

module.exports = router;