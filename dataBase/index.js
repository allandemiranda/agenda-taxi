const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_HOST,
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})

mongoose.connection
	.once("open", function() {
		console.log("MongoDB database connection established successfully");
	})
	.on("error", function(error) {
		console.log("Mongo Error is: ", error);
	});

module.exports = mongoose;