const chai = require('chai');
const chaiHttp = require('chai-http');

// const { expect } = chai;

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

const server = require('../server');
// const isEmpty = require('../utils/validator/isEmpty');
// const should = chai.should();

describe('Testing Post', () => {
  it('1. adding like', done => {
    chai
      .request(server)
      .post('/api/posts/like/5cf6278d53b1230002654927')
      .send({
        usrId: '5cebd2ba8300632c80e16c82'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(200);
        done();
      });
  });

  it('1. adding unlike', done => {
    chai
      .request(server)
      .post('/api/posts/unlike/5cf6278d53b1230002654927')
      .send({
        usrId: '5cebd2ba8300632c80e16c82'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(200);
        done();
      });
  });
});
