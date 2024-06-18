module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "no-empty-blocks"
  ],
  globals: {
    "process": false,
  },
  "rules": {
    "indent": [
      "error",
      2,
      {"SwitchCase": 1 },
    ],
    "no-control-regex": 0,
    "comma-dangle": 0,
    "no-console": 0,
    "no-empty": 0,
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "react/jsx-uses-vars": 1,
    "react/jsx-uses-react": 1,
    "no-trailing-spaces": [2]
  },
  "parser": "babel-eslint"
};