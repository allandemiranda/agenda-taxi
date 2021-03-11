const mongoose = require('../services/mongoDB.service');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const MotoristaSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  marketing: {
    type: Boolean,
    default: true,
    require: true,
  },
});

MotoristaSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Motorista = mongoose.model('Motorista', MotoristaSchema);

module.exports = Motorista;
