module.exports = {
  transform: {
    'readme.md': 'laat-readme-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: [
    '**/readme.md',
    '**/__tests__/**/*.js?(x)',
    '**/?(*.)(spec|test).js?(x)',
  ],
  moduleFileExtensions: [
    'md',
    'js',
  ],
};
