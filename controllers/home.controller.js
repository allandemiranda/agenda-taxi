const express = require('express');

const Url = require('models/url.model');

const router = express.Router();

router.get('/:teste', async (req, res) => {
  const { teste } = req.params;
  try {
    console.log(teste);
    if (!teste) {
      return res.status(400).send({ error: 'Teste não encontrado' });
    } else {
      return res.status(200).send({ error: 'Teste ' + teste + ' encontrado' });
    }
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao pesquisar url' });
  }
});

module.exports = (app) => app.use('/', router);
