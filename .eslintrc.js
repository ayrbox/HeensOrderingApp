module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "no-unused-expressions": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11/label-has-associated-control": 0, 
  },
  "env": {
    "browser": true,
    "node": true,
    "jest": true,
    "mocha": true
  }
};
