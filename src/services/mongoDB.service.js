const mongoose = require('mongoose');
if (process.env.TEST) {
  const { MongoMemoryServer } = require('mongodb-memory-server');

  const mongoServer = new MongoMemoryServer();

  mongoose.Promise = Promise;
  mongoServer.getUri().then(mongoUri => {
    const mongooseOpts = {
      // options for mongoose 4.11.3 and above
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      useMongoClient: true, // remove this line if you use mongoose 5 and above
    };

    mongoose.connect(mongoUri, mongooseOpts);

    mongoose.connection.on('error', e => {
      if (e.message.code === 'ETIMEDOUT') {
        console.log(e);
        mongoose.connect(mongoUri, mongooseOpts);
      }
      console.log(e);
    });

    mongoose.connection.once('open', () => {
      console.log(`MongoDB successfully connected to ${mongoUri}`);
    });
  });
} else {
  mongoose.connect(process.env.MONGO_HOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  mongoose.connection
    .once('open', function () {
      console.log(
        `MongoDB successfully connected to ${process.env.MONGO_HOST}`,
      );
    })
    .on('error', function (error) {
      console.log('Mongo Error is: ', error);
    });
}

module.exports = mongoose;
