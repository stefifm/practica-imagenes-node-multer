const express = require('express');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');



// init
const app = express();


// Settings
app.set('port', 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// middlewares
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb (null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    }
});

app.use(multer({
    storage, 
    dest: path.join(__dirname, 'public/uploads'),
    limits: {fileSize: 1000000},
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb("Error: El archivo debe ser una imagen");
        }
    }
}).single('image'));

// Routes
app.use(require('./routes/index.routes.js'));


// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Start Server

app.listen(app.get('port'), () => {
    console.log(`Server on ${app.get('port')}`);
});