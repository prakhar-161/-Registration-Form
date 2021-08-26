const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/studentRegistration',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var conn = mongoose.connection;

conn.on('connected',() => {
    console.log('Database Connection Successful');
});

conn.on('disconnected',() => {
    console.log('Database Disconnected Successfully');
});

conn.on('error', console.error.bind(console,'Connection error :'));

module.exports = conn;

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/studentRegistration', {useNewUrlParser: true});
// var conn = mongoose.connection;
// conn.on('connected', function() {
//     console.log('database is connected successfully');
// });
// conn.on('disconnected',function(){
//     console.log('database is disconnected successfully');
// })
// conn.on('error', console.error.bind(console, 'connection error:'));
// module.exports = conn;