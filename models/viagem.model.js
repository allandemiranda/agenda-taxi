const mongoose = require('dataBase');
const Schema = mongoose.Schema;
const mongoose_autopopulate = require('mongoose-autopopulate');

const ViagemSchema = new Schema({
  origem: {
    type: String,
    required: true
  },
  destino: {
    type: String,
    required: true
  },
  passageiro: {
    type: Schema.Types.ObjectId,
    ref: 'Passageiro',
    required: true,
    autopopulate: true
  },
  motorista: {
    type: Schema.Types.ObjectId,
    ref: 'Motorista',
    autopopulate: true
  },
  valor: {
    type: Number
  }
});

ViagemSchema.plugin(mongoose_autopopulate);

const Viagem = mongoose.model('Viagem', ViagemSchema);

module.exports = Viagem;
