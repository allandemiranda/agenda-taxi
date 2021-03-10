const mongoose = require('../services/mongoDB.service');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const PassageiroSchema = new Schema({
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

PassageiroSchema.plugin(mongoose_delete);

const Passageiro = mongoose.model('Passageiro', PassageiroSchema);

module.exports = Passageiro;
