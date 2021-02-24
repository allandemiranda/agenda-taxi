const express = require('express');
const router = express.Router();
const Passageiro = require('../models/passageiro.model');
const Motorista = require('../models/motorista.model');

router.post('/marketing', async (req, res) => {
  try {
    const passageiros = await Passageiro.find({ marketing: true });
    const motoristas = await Motorista.find({ marketing: true });

    /**
     * Criar modulo para enviar email de mkt aos motoristas e ao passageiros !
     */

    return res.status(201).send({
      msg: 'Email enviado aos passageiros e aos motoristas !',
      passageiros,
      motoristas,
    });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = app => app.use('/v1/', router);
