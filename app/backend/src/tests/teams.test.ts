import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';
import Team from '../database/models/team.model';

import { allTeamsMocha } from './mocks/teams.mock';
import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /teams', function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Testa findAll "/teams"', async function () {
    const buildStub = Team.bulkBuild(allTeamsMocha); // para criar um objeto com base em uma classe, usa-se o método build
    //                                                  para criar um array de objetos com base em uma classe, usa-se o método bulkBuild
    
    const stub = sinon.stub(Team, 'findAll').resolves(buildStub);

    const res = await chai.request(app).get('/teams').send();
    
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(buildStub.map((team) => team.toJSON()));
    stub.restore();
  });
  it('Testa findById "/teams/:id"', async function () {
    const buildStub = Team.build(allTeamsMocha[0]);
    const stub = sinon.stub(Team, 'findByPk').resolves(buildStub);

    const res = await chai.request(app).get('/teams/1').send();
    
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(buildStub.toJSON());
    stub.restore();
  });
  it('Testa findById "/teams/:id" com id inexistente', async function () {
    const stub = sinon.stub(Team, 'findByPk').resolves(null);

    const res = await chai.request(app).get('/teams/1').send();
    
    expect(res.status).to.equal(404);
    expect(res.body).to.deep.equal({ message: 'Time não encontrado' });
    stub.restore();
  });
});
