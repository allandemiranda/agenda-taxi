const mongoose = require('dataBase');
const Schema = mongoose.Schema;

const PassageiroSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  marketing: {
    type: Boolean,
    default: true,
    require: true
  }
});

const Passageiro = mongoose.model('Passageiro', PassageiroSchema);

module.exports = Passageiro;
