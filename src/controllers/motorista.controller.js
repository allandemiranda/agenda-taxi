const express = require('express');
const router = express.Router();
const Motorista = require('../models/motorista.model');
const Viagem = require('../models/viagem.model');

router.get('/motoristas/', async (req, res) => {
  try {
    const motoristas = await Motorista.find();
    return res.status(200).send({ motoristas });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.get('/motorista/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const motorista = await Motorista.findById(id);
    return res.status(200).send({ motorista });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.post('/motorista/', async (req, res) => {
  const { nome, email, marketing } = req.body;
  try {
    if (await Motorista.findOne({ email })) {
      return res.status(400).send({ error: 'Motorista existente' });
    }
    const motorista = await Motorista.create({ nome, email, marketing });
    return res.status(201).send({ motorista });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.post('/motorista/:idMotorista/viagem/:idViagem', async (req, res) => {
  const { idMotorista, idViagem } = req.params;
  const { valor } = req.body;
  try {
    const motorista = await Motorista.findById(idMotorista);
    if (!motorista) {
      return res.status(400).send({ error: 'Motorista não existe' });
    }
    var viagem = await Viagem.findById(idViagem);
    if (!viagem) {
      return res.status(400).send({ error: 'Viagem não existe' });
    }
    viagem.valor = valor;
    viagem.motorista = motorista;
    viagem = await viagem.save();

    /**
     * Criar modulo para enviar email ao passageiro e ao financeiro aqui !
     */

    return res.status(201).send({
      msg:
        'Email enviado ao passageiro ' +
        viagem.passageiro.nome +
        ' e ao financeiro!',
    });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = app => app.use('/v1/', router);
