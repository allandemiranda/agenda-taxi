const mongoose = require('dataBase');
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

const Motorista = mongoose.model('Motorista', MotoristaSchema);

module.exports = Motorista;
