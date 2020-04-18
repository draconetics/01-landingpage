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
      name: 'john doe',
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
          .then((response) => {
            response.should.have.status(422);
            response.body.should.be.a('object');
            response.body.should.have.property('statusCode')
            response.body.should.have.property('status')
            response.body.should.have.property('message')

            expect(response.body.status).to.equal('CLIENT_ERROR')
            done();
          })
          .catch((err) => done(err));
    });

    it('should FAIL because no exist NAME property', (done) => 
    {
        chai.request(server).post('/emails')
          .send({ email: 'sample@gmail.com' })
          .then((response) => {
            response.should.have.status(422);
            response.body.should.be.a('object');
            response.body.should.have.property('statusCode')
            response.body.should.have.property('status')
            response.body.should.have.property('message')

            expect(response.body.status).to.equal('CLIENT_ERROR')
            done();
          })
          .catch((err) => done(err));
    });

    it('should FAIL because email is not unique', (done) => 
    {
        chai.request(server).post('/emails')
          .send(jhonEmailObj)
          .then((response) => {
            response.should.have.status(500);
            response.body.should.be.a('object');
            response.body.should.have.property('statusCode')
            response.body.should.have.property('status')
            response.body.should.have.property('message')

            expect(response.body.status).to.equal('SERVER_ERROR')
            expect(response.body.message[0]).to.equal('Error while saving new Email')
            
            
            done();
          })
          .catch((err) => done(err));
    });

      
      
  })
})