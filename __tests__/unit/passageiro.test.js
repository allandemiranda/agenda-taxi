require('dotenv').config();
const Passageiro = require('../../src/models/passageiro.model');

describe('insert', () => {
  beforeAll(async () => {});

  afterAll(async () => {
    await Passageiro.deleteMany({});
  });

  it('shoudl allan', async () => {
    const body = {
      nome: 'Teste',
      email: 'teste@email.com',
      marketing: true,
    };
    const passageiro = await Passageiro.create({ ...body });
    const passageiros = await Passageiro.find(passageiro);
    expect(passageiros).toHaveLength(1);
    expect(passageiros[0].nome).toBe(body.nome);
    expect(passageiros[0].email).toBe(body.email);
    expect(passageiros[0].marketing).toBe(body.marketing);
    expect(passageiros[0].deleted).toBe(false);
  });
});
