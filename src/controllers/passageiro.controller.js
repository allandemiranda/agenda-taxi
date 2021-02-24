const express = require('express');
const router = express.Router();
const Passageiro = require('../models/passageiro.model');
const Viagem = require('../models/viagem.model');

router.get('/passageiros/', async (req, res) => {
  try {
    const passageiros = await Passageiro.find();
    return res.status(200).send({ passageiros });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.get('/passageiro/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const passageiro = await Passageiro.findById(id);
    return res.status(200).send({ passageiro });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.post('/passageiro/', async (req, res) => {
  const { nome, email, marketing } = req.body;
  try {
    if (await Passageiro.findOne({ email })) {
      return res.status(400).send({ error: 'Passageiro existente' });
    }
    const passageiro = await Passageiro.create({ nome, email, marketing });
    return res.status(201).send({ passageiro });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.post('/passageiro/:id/viagem/', async (req, res) => {
  const { id } = req.params;
  const { origem, destino } = req.body;
  try {
    const passageiro = await Passageiro.findById(id);
    if (!passageiro) {
      return res.status(400).send({ error: 'Passageiro não existe' });
    }

    const viagem = await Viagem.create({ origem, destino, passageiro });

    /**
     * Criar modulo para enviar email ao motoristas aqui !
     */

    return res.status(201).send({ msg: 'Email enviado aos motoristas' });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = app => app.use('/v1/', router);
