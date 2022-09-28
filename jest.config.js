module.exports = {
    testRegex: 'resources/js/test/.*.spec.js$',
    moduleFileExtensions: [
      'js',
      'json',
      'vue',
      'ts'
    ],
    'transform': {
      '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
      '.*\\.(vue)$': '@vue/vue3-jest'
    },
    transformIgnorePatterns: ['/node_modules/']
  }