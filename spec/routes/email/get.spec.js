const Email = require('../../../src/models/email')

var faker = require('faker');


let chai = require("chai");
let chaiHttp = require("chai-http");
const { expect } = chai;
let server = require("../../../src/server");
const cache = require('memory-cache');

//Assertion Style
chai.should();
chai.use(chaiHttp);


describe('Emails', function () {
  describe('#GET results when there are \"0 ELEMENTS\"', function () {

    
    before( function (done) {
        Email.deleteMany({}, function (err, small) {
        if (err) done(err);
        done();
        });
    })
      
    it('should GET 0 email objects from the database.', function(done) {
          chai.request(server)
              .get("/emails/")
              .end((err, response) => {
                  response.should.have.status(200);
                  response.body.should.be.a('object');
                  response.body.should.have.property('next')
                  response.body.should.have.property('previous')
                  response.body.should.have.property('results')
                  
                  expect(response.body.next).to.be.an.instanceof(Object);
                  expect(response.body.next).to.deep.include({page: -1});
                  expect(response.body.next.limit).to.be.greaterThan(0)
                  
            
                  expect(response.body.previous).to.be.an.instanceof(Object);
                  expect(response.body.previous).to.deep.include({page: -1});
                  expect(response.body.previous.limit).to.be.greaterThan(0)

                  expect(response.body.results).to.be.an.instanceof(Array);
                  expect(response.body.results).to.have.lengthOf(0); 
                  
                  done();
              });
      })

      it('should GET an error when we get a page 1000', function(done) {
        cache.clear()
        const page = 1000
        chai.request(server)
            .get("/emails?page="+page)
            .end((err, response) => {
                response.should.have.status(200);
                done();
            });
    })

  })//end describe

  describe('#GET results when there are \"1 ELEMENT\"', function () {
    
      const ONE_EMAIL = {
          name: faker.name.findName(),
          email: faker.internet.email(),
      }
    
      before(function (done) {  
          //console.log("creating again ---------")    
          Email.create(ONE_EMAIL, function (err, small) {
            if (err) done(err);
            done();
          });
      })

      after( function (done) {
          Email.deleteMany({}, function (err, small) {
            if (err) done(err);
            done();
          });
      })

      it('should GET information about only \"1 ELEMENT\".', function(done) {
          
          cache.clear();//deleting the last cache
          chai.request(server)
              .get("/emails/")
              .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('next')
                    response.body.should.have.property('previous')
                    response.body.should.have.property('results')
                    
                    expect(response.body.next).to.be.an.instanceof(Object);
                    expect(response.body.next).to.deep.include({page: -1});
                    expect(response.body.next.limit).to.be.greaterThan(0)
                    
              
                    expect(response.body.previous).to.be.an.instanceof(Object);
                    expect(response.body.previous).to.deep.include({page: -1});
                    expect(response.body.previous.limit).to.be.greaterThan(0)  
                    
                    expect(response.body.results).to.be.an.instanceof(Array);
                    expect(response.body.results).to.have.lengthOf(1); 

                    const oneEmail = response.body.results[0];
                    expect(oneEmail).to.have.property('_id');
                    expect(oneEmail).to.have.property('name');
                    expect(oneEmail).to.have.property('email');
                    expect(oneEmail.name).to.equal(ONE_EMAIL.name);
                    expect(oneEmail.email).to.equal(ONE_EMAIL.email);
                
                    done();
              });
          
      })//end It


    
  })

  describe('#GET results when there are \"30 ELEMENTS\"', function () {

      let LIST = [];

      before(function (done) {  
        //console.log("creating again ---------")    
          for(let i = 0; i < 30; i++){
              let newEmail = {
                name: faker.name.findName(),
                email: faker.internet.email(),
              }
              LIST.push(newEmail)
              Email.create(newEmail, function (err, small) {
                  if (err) done(err);
              });
          }

          done();
      })

      after( function (done) {
          Email.deleteMany({}, function (err, small) {
            if (err) done(err);
            done();
          });
      })

      it('should GET information DEFAULT PAGE VALUE.', function(done) {
            
          cache.clear();//deleting the last cache
          
          chai.request(server)
              .get("/emails/")
              .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('next')
                    response.body.should.have.property('previous')
                    response.body.should.have.property('results')
                    
                    expect(response.body.next).to.be.an.instanceof(Object);
                    expect(response.body.next).to.deep.include({page: 2});
                    expect(response.body.next.limit).to.be.greaterThan(0)
                    
              
                    expect(response.body.previous).to.be.an.instanceof(Object);
                    expect(response.body.previous).to.deep.include({page: -1});
                    expect(response.body.previous.limit).to.be.greaterThan(0)  
                    
                    expect(response.body.results).to.be.an.instanceof(Array);
                    expect(response.body.results).to.have.lengthOf(5);//BY DEFAULT IS LIMIT 5 

                    const oneEmail = response.body.results[0];
                    expect(oneEmail).to.have.property('_id');
                    expect(oneEmail).to.have.property('name');
                    expect(oneEmail).to.have.property('email');
                    expect(oneEmail.name).to.equal(LIST[0].name);
                    expect(oneEmail.email).to.equal(LIST[0].email);
                
                    done();
              });
        
      })//end It

  })
})