const express = require('express');
const nodemailer = require('nodemailer');
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

    const emailMotorista = {
      from: process.env.EMAIL_FINANCEIRO,
      to: viagem.motorista.email,
      subject: 'Pagamento recebido',
      text:
        'Pagamento de R$' +
        viagem.valor +
        'para a viagem do passageiro ' +
        viagem.passageiro.nome +
        ' recebido!',
    };

    const emailPassageiro = {
      from: process.env.EMAIL_FINANCEIRO,
      to: viagem.passageiro.email,
      subject: 'Pagamento recebido',
      text:
        'Pagamento para a viagem de ' +
        viagem.origem +
        ' a ' +
        viagem.destino +
        ' recebido!',
    };

    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    let infoMotorista = await transporter.sendMail(emailMotorista);
    let infoPassageiro = await transporter.sendMail(emailPassageiro);

    return res.status(201).send({
      msg:
        'Email enviado ao passageiro ' +
        viagem.passageiro.nome +
        ' e ao motorista ' +
        viagem.motorista.nome +
        ' sobre a confirmação do pagamento !',
      info: [infoPassageiro.messageId, infoMotorista.messageId],
      passageiro: viagem.passageiro,
      motorista: viagem.motorista,
    });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = app => app.use('/v2/', router);
