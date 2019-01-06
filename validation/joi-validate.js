const isEmpty = require('./is-empty');

const simplifyErrorMessage = (joiError) => {
  const { details } = joiError;
  const errors = details.reduce((simpleError, err) => ({
    ...simpleError,
    [err.path.join('_')]: err.message,
  }), {});

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = (joiSchema, data) => {
  const { error } = joiSchema.validate(data, { abortEarly: false });

  if (error) {
    return simplifyErrorMessage(error);
  }
  return {
    errors: {},
    isValid: true,
  };
};
