module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/label-has-associated-control": [
      2, {
        labelComponents: ['label'],
      },
    ],
  },
  "env": {
    "browser": true,
    "node": true,
    "jest": true,
    "mocha": true
  }
};
