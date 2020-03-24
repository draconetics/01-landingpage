const Email = require('../../../src/models/email')

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../../src/server");

//Assertion Style
chai.should();

chai.use(chaiHttp);


describe('Emails', function () {
  describe('#GET', function () {
    beforeEach(function (done) {
      this.email = {
        name: 'john',
        email: 'john@doe.com',
      }
      Email.create(this.email, function (err, small) {
        if (err) done(err);
        done();
      });
      // Email.create(this.email)
      //   .then(()=>done())
      //   .catch(err=> done(err))
    })

    afterEach( function (done) {
      Email.deleteMany({}, function (err, small) {
        if (err) done(err);
        done();
      });
      // Email.deleteMany({})
      //   .then(()=>done())
      //   .catch(err=> done(err))
    })

    it('should GET all the emails from the database.', function(done) {
        //expect(await Email.countDocuments()).to.equal(1)
        
        chai.request(server)
                .get("/emails/")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(1);
                done();
                });
    })
  })
})