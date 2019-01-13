module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
    "react/jsx-filename-extension": [
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "no-unused-expressions": 0
  },
  "env": {
    "browser": true,
    "node": true,
    "jest": true,
    "mocha": true
  }
};
