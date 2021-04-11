var express = require('express');
const { getMarks, getOneMark } = require('../controllers/markComponent');
var router = express.Router();


router.get('/all',getMarks);
router.get('/:id', getOneMark);
router.post('/create',);
router.put('/edit/:id', );


module.exports = router;