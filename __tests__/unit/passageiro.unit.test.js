require('dotenv').config();
const Passageiro = require('../../src/models/passageiro.model');

describe('Model Passageiro', () => {
  const body = {
    nome: 'Teste',
    email: 'teste@email.com',
    marketing: true,
  };

  beforeAll(async () => {
    await Passageiro.deleteMany({});
  });

  afterAll(async () => {
    await Passageiro.deleteMany({});
  });

  it('should create a passenger', async () => {
    const passageiro = await Passageiro.create({ ...body });
    const newPassageiro = await Passageiro.findOne(passageiro);
    expect(newPassageiro.nome).toBe(body.nome);
    expect(newPassageiro.email).toBe(body.email);
    expect(newPassageiro.marketing).toBe(body.marketing);
    expect(newPassageiro.deleted).toBe(false);
  });

  it('should edit a passenger', async () => {
    let passageiro = await Passageiro.findOne({ ...body });
    const newBody = {
      nome: 'Teste Teste',
      email: 'teste.teste@email.com',
      marketing: false,
    };
    passageiro.nome = newBody.nome;
    passageiro.email = newBody.email;
    passageiro.marketing = newBody.marketing;
    await passageiro.save();
    expect(passageiro.nome).toBe(newBody.nome);
    expect(passageiro.email).toBe(newBody.email);
    expect(passageiro.marketing).toBe(newBody.marketing);
    expect(passageiro.deleted).toBe(false);
    passageiro.nome = body.nome;
    passageiro.email = body.email;
    passageiro.marketing = body.marketing;
    await passageiro.save();
    expect(passageiro.nome).toBe(body.nome);
    expect(passageiro.email).toBe(body.email);
    expect(passageiro.marketing).toBe(body.marketing);
    expect(passageiro.deleted).toBe(false);
  });

  it('should delet a passenger', async () => {
    let passageiro = await Passageiro.findOne({ ...body });
    await passageiro.delete();
    passageiro = await Passageiro.findOne({ ...body });
    expect(passageiro).toBeNull();
    passageiro = await Passageiro.findOneDeleted({ ...body });
    expect(passageiro.nome).toBe(body.nome);
    expect(passageiro.email).toBe(body.email);
    expect(passageiro.marketing).toBe(body.marketing);
    expect(passageiro.deleted).toBe(true);
  });
});
