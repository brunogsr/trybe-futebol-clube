import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { App } from '../../../app';
import Team from '../../../database/models/team.model';

import { allTeamsMocha } from '../../mocha/teams.mocha';

chai.use(chaiHttp);

const { app } = new App(); // "new" <<<< constroi um objeto com base numa classe
// objeto é a instancia da classe
describe('Testa a rota GET /teams', function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Testa rota post "/teams"', async function () {
    const buildStub = Team.bulkBuild(allTeamsMocha); // para criar um objeto com base em uma classe, usa-se o método build
    //                                                  para criar um array de objetos com base em uma classe, usa-se o método bulkBuild
    
    const stub = sinon.stub(Team, 'findAll').resolves(buildStub);

    const res = await chai.request(app).post('/teams').send();
    
    expect(res.status).to.equal(201);
    expect(res.body).to.deep.equal(buildStub);
    stub.restore();
  });  
});
