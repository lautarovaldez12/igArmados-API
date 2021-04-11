var express = require('express');
const { getGuarantees, getOneGuarantee } = require('../controllers/guaranteeController');
var router = express.Router();


router.get('/all',getGuarantees);
router.get('/:id', getOneGuarantee);
router.post('/create',);
router.put('/edit/:id', );


module.exports = router;