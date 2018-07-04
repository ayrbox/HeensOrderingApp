//Simplify joi error message
/*Converts joi error message as follows
/*
{
    fieldName: errorMessage
}*/

const isEmpty = require("./is-empty");

const simplifyErrorMessage = joiError => {
  const { details } = joiError;
  const errors = details.reduce((simpleError, err) => {
    simpleError[err.path.join("_")] = err.message;
    return simpleError;
  }, {});

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = (joiSchema, data, cb) => {
  joiSchema.validate(data, { abortEarly: false }, (error, value) => {
    if (error) {
      cb(simplifyErrorMessage(error));
    } else {
      cb({
        errors: undefined,
        isValid: true
      });
    }
  });
};
