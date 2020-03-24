const { isEmpty, validateName, validateEmail } = require('../../../../src/controllers/utils/emailValidator')


describe('Email Object Validation', function () {
  describe('#validateName()', function () {
    
    it('should produce an error object if name is just numbers', function() {
        //expect(await Email.countDocuments()).to.equal(1)
        
        const errorObj = validateName(123);
        //expect(errorObj).to.be.empty;
        expect(errorObj).to.have.property('status');
    })

    it('should produce an error object if name is empty', function() {
      const errorObj = validateName("");
      expect(errorObj).to.have.property('code');
      expect(errorObj).to.have.property('status');
      expect(errorObj).to.have.property('message');
    })
    it('should produce an error object if name has less or equal to 3 characters', function() {
        const errorObj = validateName("oto");
        expect(errorObj).to.have.property('code');
        expect(errorObj).to.have.property('status');
        expect(errorObj).to.have.property('message');
    })
    it('should produce an empty error object if name applies the rules', function() {
      const errorObj = validateName("otto");
      expect(errorObj).to.be.empty;
    })
  })

  describe('#isValidEmail()', function () {
    
    it('should produce an error object if email is empty', function() {
      const errorObj = validateEmail("");
      expect(errorObj).to.have.property('code');
      expect(errorObj).to.have.property('status');
      expect(errorObj).to.have.property('message');
    })
    it('should produce an error object if email is wrong', function() {
        //expect(errorObj).to.be.empty;
        const wrongEmailList = 
        [
          "name",
          "name@",
          "name@gmail",
          "name@.com",
          "name*@gmail.com",
          "name$@gmail.com",
        ]
        const acceptedEmailList = 
        [
          "123@gmail.com",
          "a@g.es",
          "ab@g.es",
          "abc@g.es",
          "n_123@gmail.com",
          "n-123@gmail.com",
          "a.dracon@linux.es",
        ]
        
        let errorObj = {}

        for( let i = 0; i < wrongEmailList.length; i++){
          const wrongEmail = wrongEmailList[i];
          errorObj = validateEmail(wrongEmail);
          expect(errorObj).to.have.property('code');
          expect(errorObj).to.have.property('status');
          expect(errorObj).to.have.property('message');
        }

        for( let j = 0; j < acceptedEmailList.length; j++){
          const correctEmail = acceptedEmailList[j];
          errorObj = validateEmail(correctEmail);
          expect(errorObj).to.be.empty;
        }
      
    });
    
  })

  describe('#isEmpty()', function () {
    
    it('should produce TRUE if object is empty', function() {
        const emailObj = {};
        expect(isEmpty(emailObj)).to.equal(true);
    })
    it('should produce FALSE if object has properties', function() {
        const emailObj = {name:"sample",email:"sample@gmail.com"};
        expect(isEmpty(emailObj)).to.equal(false);
    })
  })

})