import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';
import Matches from '../database/models/matches.model';
import User from '../database/models/user.model';

import { matchesMock } from './mocks/matches.mock';
import { app } from '../app';
import Example from '../database/models/ExampleModel';
import * as jwt from 'jsonwebtoken';

import { Response } from 'superagent';
import { build } from 'joi';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /matches', function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Testa findAll "/matches"', async function () {
    const buildStub = Matches.bulkBuild(matchesMock); // para criar um objeto com base em uma classe, usa-se o método build
    //                                                  para criar um array de objetos com base em uma classe, usa-se o método bulkBuild
    
    const stub = sinon.stub(Matches, 'findAll').resolves(buildStub); // stub == dublê de teste

    const res = await chai.request(app).get('/matches').send();
    
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(buildStub.map((match) => match.toJSON()));
    stub.restore();
  });
  it('Testa findAll "/matches?inProgress=true"', async function () {
    const buildStub = Matches.bulkBuild(matchesMock);
    const inProgressMatches = buildStub.filter((match) => match.toJSON().inProgress === true);
    const stub = sinon.stub(Matches, 'findAll').resolves(inProgressMatches);

    const res = await chai.request(app).get('/matches?inProgress=true').send(); // query localizada no URL do thunderclient

    
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(inProgressMatches.map((match) => match.toJSON()));
    stub.restore();
  });
  // it('Testa patch "/matches/48/finish"', async function () {
//     const buildStubLogin = User.build({
//       id: 1,
//       username: 'admin',
//       email: 'admin@admin.com',
//       password: '$2b$10$0xq5K8DgZ5UkQz3h9Bj4xu3qY4ZyJ3t7V2ZzXZuYf1wQ7Qj7JXG9u',
//       role: 'admin',
//     });
//     const buildStubLoginJSON = buildStubLogin.toJSON();
//     const stubLogin = sinon.stub(User, 'findByPk').resolves(buildStubLogin);


//     console.log(buildStubLoginJSON);
    
    

// const token = jwt.sign(
//   { id: buildStubLoginJSON.id, username: buildStubLoginJSON.username },
//   process.env.JWT_SECRET as string || 'jwt_secret',
//   {
//     expiresIn: '7d',
//     algorithm: 'HS256',
//   }
// );

//     const buildStub = Matches.bulkBuild(matchesMock);
//     const match = buildStub[47];

//     const stub = sinon.stub(Matches, 'findByPk').resolves(match);

//     const res = await chai.request(app)
//       .patch('/matches/48/finish')
//       .set('Authorization', `Bearer ${token}`)
//       .send();

//     expect(res.status).to.equal(200);
//     expect(res.body).to.deep.equal({ message: 'Finished' });

//     stub.restore();
//   });
});
