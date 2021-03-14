require('dotenv').config();
const Motorista = require('../../src/models/motorista.model');

describe('Model Motorista', () => {
  const body = {
    nome: 'Teste',
    email: 'teste@email.com',
    marketing: true,
  };

  beforeAll(async () => {
    await Motorista.deleteMany({});
  });

  afterAll(async () => {
    await Motorista.deleteMany({});
  });

  it('should create a motorista', async () => {
    const motorista = await Motorista.create({ ...body });
    const newmotorista = await Motorista.findOne(motorista);
    expect(newmotorista.nome).toBe(body.nome);
    expect(newmotorista.email).toBe(body.email);
    expect(newmotorista.marketing).toBe(body.marketing);
    expect(newmotorista.deleted).toBe(false);
  });

  it('should edit a motorista', async () => {
    let motorista = await Motorista.findOne({ ...body });
    const newBody = {
      nome: 'Teste Teste',
      email: 'teste.teste@email.com',
      marketing: false,
    };
    motorista.nome = newBody.nome;
    motorista.email = newBody.email;
    motorista.marketing = newBody.marketing;
    await motorista.save();
    expect(motorista.nome).toBe(newBody.nome);
    expect(motorista.email).toBe(newBody.email);
    expect(motorista.marketing).toBe(newBody.marketing);
    expect(motorista.deleted).toBe(false);
    motorista.nome = body.nome;
    motorista.email = body.email;
    motorista.marketing = body.marketing;
    await motorista.save();
    expect(motorista.nome).toBe(body.nome);
    expect(motorista.email).toBe(body.email);
    expect(motorista.marketing).toBe(body.marketing);
    expect(motorista.deleted).toBe(false);
  });

  it('should delet a motorista', async () => {
    let motorista = await Motorista.findOne({ ...body });
    await motorista.delete();
    motorista = await Motorista.findOne({ ...body });
    expect(motorista).toBeNull();
    motorista = await Motorista.findOneDeleted({ ...body });
    expect(motorista.nome).toBe(body.nome);
    expect(motorista.email).toBe(body.email);
    expect(motorista.marketing).toBe(body.marketing);
    expect(motorista.deleted).toBe(true);
  });
});
