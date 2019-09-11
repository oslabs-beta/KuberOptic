module.exports = {
  verbose: true,
  // setupFiles: ['./setupTests.js'], // for enzyme
  // moduleFileExtensions: ['ts','tsx','js','json','jsx','node'], //ts in front
  moduleDirectories: ['node_modules'],
  modulePaths: ['<rootDir>'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ],
  // snapshotSerializers: ['enzyme-to-json/serializer'], // for enzyme set up
}
