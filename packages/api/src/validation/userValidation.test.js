const { expect } = require('chai');
const {
  validateRegistration,
  validateLogin,
} = require('./userValidation');


describe('#validateRegistration', () => {
  it('should invalidate empty object', () => {
    const { isValid, errors } = validateRegistration({});
    expect(isValid).to.equal(false);
    expect(errors.name).to.exist;
    expect(errors.email).to.exist;
    expect(errors.password).to.exist;
  });

  it('should invalidate empty email and pasword', () => {
    const { isValid, errors } = validateRegistration({
      name: '',
      email: '',
      password: '',
    });

    expect(isValid).to.equal(false);
    expect(errors.name).to.exist;
    expect(errors.email).to.exist;
    expect(errors.password).to.exist;
  });

  it('should invalidate invalid email', () => {
    const { isValid, errors } = validateRegistration({
      name: 'CorrectName',
      email: 'invalidemail',
      password: 'password123',
    });

    expect(isValid).to.equal(false);
    expect(errors.name).to.not.exist;
    expect(errors.email).to.exist;
    expect(errors.password).to.not.exist;
  });

  it('should validate email and password', () => {
    const { isValid, errors } = validateRegistration({
      name: 'UserName',
      email: 'valid@email.com',
      password: 'password123',
    });

    expect(isValid).to.equal(true);
    expect(errors).to.deep.equal({});
  });
});


describe('#validateLogin', () => {
  it('should invalid empty object', () => {
    const { errors, isValid } = validateLogin({});

    expect(isValid).to.equal(false);
    expect(errors.email).to.exist;
    expect(errors.password).to.exist;
  });


  it('should invalidate empty value', () => {
    const { errors, isValid } = validateLogin({
      email: '',
      password: '',
    });

    expect(isValid).to.equal(false);
    expect(errors.email).to.exist;
    expect(errors.password).to.exist;
  });


  it('should invalide wrong email', () => {
    const { errors, isValid } = validateLogin({
      email: 'invalidEmail',
      password: 'password123',
    });

    expect(isValid).to.equal(false);
    expect(errors.email).to.exist;
    expect(errors.password).to.not.exist;
  });

  it('should validate email and password', () => {
    const { errors, isValid } = validateLogin({
      email: 'correct.email@example.com',
      password: 'correctPassword',
    });

    expect(isValid).to.equal(true);
    expect(errors).to.deep.equal({});
  });
});
