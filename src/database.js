const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nivelacion')
    .then(()=>{
        console.log('DB conectada');
    })
    .catch((err)=>{
        console.log(err);
    })