var express = require('express');
const { getComponents, getOneComponent } = require('../controllers/componentController')
var router = express.Router();


router.get('/all',getComponents);
router.get('/:id', getOneComponent);
router.post('/create',);
router.put('/edit/:id', );


module.exports = router;