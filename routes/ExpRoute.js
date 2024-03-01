const express = require("express");
const {
    getExps, 
    getExpById,
    createExp,
    updateExp,
    deleteExp
} = require("../controllers/ExpController.js");


const router = express.Router();

router.get('/exps', getExps);
router.get('/exps/:id', getExpById);
router.post('/exps', createExp);
router.patch('/exps/:id', updateExp);
router.delete('/exps/:id', deleteExp);

module.exports = router;