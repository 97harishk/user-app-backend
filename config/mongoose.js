const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connection to mongodb'));

db.once('open', function(){
	console.log('Successfully connected to database');
});

module.exports = db;