const {  Router } = require('express');
const router = Router();
const path = require('path');


router.get('/', (req, res) => {
    res.render('index');
});


router.post('/upload', (req, res) => {
    console.log(req.file);
    res.send('Se subio la imagen')
});


module.exports = router;