module.exports =  {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/shared/either.ts',
    '!<rootDir>/src/main/{configs,adapters}/**/*.ts',
    '!<rootDir>/src/main/main.ts',
    '!<rootDir>/src/validators/**/*.ts'
  ],
  preset: '@shelf/jest-mongodb',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
