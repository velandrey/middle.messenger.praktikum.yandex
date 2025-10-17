import type {Config} from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    moduleFileExtensions: ['ts', 'js'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(pcss)$': 'identity-obj-proxy',
    },
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
};

export default config;
