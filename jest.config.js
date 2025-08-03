module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@testing-library|@expo|expo(nent)?|expo-modules-core|native-base|react-native-svg)',
  ],
  moduleNameMapper: {
    '^@react-native-async-storage/async-storage$': '<rootDir>/__mocks__/@react-native-async-storage/async-storage.ts',
    '^expo$': '<rootDir>/__mocks__/expo.ts',
    '^expo-linear-gradient$': '<rootDir>/__mocks__/expo-linear-gradient.ts',
    '^@expo/vector-icons$': '<rootDir>/__mocks__/@expo/vector-icons.ts' 
  },
};
