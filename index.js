const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.json')
// const config = process.env
const port = process.env.PORT || 5005;
const app = express();
// ========== middleware parser(3rd/built-in) ==========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config routes
app.use('/api/users', require('./routes/users'));

// mongoose.connect(config.MONGO_URI_LOCAL, {useNewUrlParser: true, useCreateIndex: true}, (err)=>{
mongoose.connect(config.MONGO_URI, {useNewUrlParser: true, useCreateIndex: true}, (err)=>{
	if(err) { 
		console.log('Some problem with the connection ' +err);
	} else {
		console.log('The Mongoose connection is ready');
	}
})
app.listen(port, function () {
	console.log('App listening on port ' + port);
});
