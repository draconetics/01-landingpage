const Email = require('../../../src/models/email')

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../../src/server");

//Assertion Style
//chai.should();
chai.use(chaiHttp);


describe('Emails', function () {
  describe('#POST', function () {

    const jhonEmailObj = 
    {
      name: 'john',
      email: 'john@doe.com',
    }
    
    before(function (done) 
    {
      Email.create(jhonEmailObj, function (err, small) {
        if (err) done(err);
        done();
      });
    })

    after( function (done) 
    {
        Email.deleteMany({}, function (err, small) {
          if (err) done(err);
          done();
        });
        
    })

    it('should create new Email object', (done) => 
    {
        chai.request(server).post('/emails')
          .send({ name: 'firstname lastname', email: "name01@gmail.com" })
          .then((res) => {
            const body = res.body;
            expect(body).to.be.an('object');
            expect(body).to.contain.property('_id');
            expect(body).to.contain.property('name');
            expect(body).to.contain.property('email');
            done();
          })
          .catch((err) => done(err));
    });
    
    it('should FAIL because no exist EMAIL property', (done) => 
    {
      chai.request(server).post('/emails')
          .send({ name: 'name02' })
          .then((res) => {
            const body = res.body;
            expect(body.status)
              .to.equal('EMAIL_FIELD_REQUIRED')
            done();
          })
          .catch((err) => done(err));
    });

    it('should FAIL because no exist NAME property', (done) => 
    {
        chai.request(server).post('/emails')
          .send({ email: 'sample@gmail.com' })
          .then((res) => {
            const body = res.body;
            expect(body).to.be.an('object');
            expect(body.status).to.equal('NAME_FIELD_REQUIRED')
            done();
          })
          .catch((err) => done(err));
    });

    it('should FAIL because email is not unique', (done) => 
    {
        chai.request(server).post('/emails')
          .send(jhonEmailObj)
          .then((res) => {
            const body = res.body;
            expect(body).to.be.an('object');
            expect(body).to.contain.property('code');
            expect(body).to.contain.property('errmsg');
            expect(body.code).to.equal(11000);
            expect(body.errmsg).to.match(/E11000\sduplicate\skey\serror\scollection/);
            done();
          })
          .catch((err) => done(err));
    });

      
      
  })
})