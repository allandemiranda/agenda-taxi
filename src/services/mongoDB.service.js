const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_HOST, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection
  .once('open', function () {
    process.env.TEST
      ? null
      : console.log('MongoDB database connection established successfully');
  })
  .on('error', function (error) {
    process.env.TEST ? null : console.log('Mongo Error is: ', error);
  });

module.exports = mongoose;
