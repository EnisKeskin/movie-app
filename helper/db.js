const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://theme:QQdFVckbccRnS6o7@cluster0-cv9fc.gcp.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true });
    
    mongoose.connection.on('open', () => {
        console.log('MongDB: Connected');
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongDB: Error '+err);
    });
} 