const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const Passageiro = require('../models/passageiro.model');
const Motorista = require('../models/motorista.model');

router.post('/marketing', async (req, res) => {
  try {
    if (!process.env.EMAIL_MARKEING) {
      throw 'EMAIL_MARKEING Null';
    }
    const passageiros = await Passageiro.find({ marketing: true });
    const motoristas = await Motorista.find({ marketing: true });

    // const usuarios = [...passageiros, ...motoristas];

    // let testAccount = await nodemailer.createTestAccount();
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.ethereal.email',
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: testAccount.user,
    //     pass: testAccount.pass,
    //   },
    // });

    // let email = {
    //   from: process.env.EMAIL_MARKEING,
    //   to: '',
    //   subject: 'Email Marketing',
    //   text: 'Parabém, agora somos famosos usuários no aplicativo !',
    // };

    // let infos = [];

    // for (let i = 0; i < usuarios.length; ++i) {
    //   email.to = usuarios[i].email;
    //   let info = await transporter.sendMail(email);
    //   infos.push(info.messageId);
    // }

    return res.status(201).send({
      msg: 'Email enviado aos passageiros e aos motoristas !',
      passageiros,
      motoristas,
      // info: infos,
    });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = app => app.use('/v2/', router);
