const express = require('express');
const router = express.Router();
const Viagem = require('../models/viagem.model');

router.post('/financeiro/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const viagem = await Viagem.findById(id);
    if (!viagem) {
      return res.status(400).send({ error: 'Viagem não existe' });
    }
    if (!viagem.motorista) {
      return res.status(400).send({ error: 'Viagem sem motorista' });
    }

    /**
     * Criar modulo para enviar email ao motoristas e ao passageiro que houve o pagamento !
     */

    return res.status(201).send({
      msg:
        'Email enviado ao passageiro ' +
        viagem.passageiro.nome +
        ' e ao motorista ' +
        viagem.motorista.nome +
        ' sobre a confirmação do pagamento !',
    });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = app => app.use('/v1/', router);
