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

module.exports = (joiSchema, data) => {
  const { error, value } = joiSchema.validate(data, { abortEarly: false });

  if (error) {
    return simplifyErrorMessage(error);
  } else {
    return {
      errors: {},
      isValid: true
    };
  }
};
