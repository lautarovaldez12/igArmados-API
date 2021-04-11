var express = require('express');
const { getCategories, getOneCategory } = require('../controllers/categoryController');
var router = express.Router();


router.get('/all',getCategories);
router.get('/:id', getOneCategory);
router.post('/create',);
router.put('/edit/:id', );


module.exports = router;