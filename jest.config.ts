export default {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleDirectories: ["node_modules", "src"],
    moduleNameMapper: {
        "^axios$": require.resolve("axios"),
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "@containers(.*)$": "<rootDir>/src/app/containers/$1",
        "@components/(.*)$": "<rootDir>/src/app/components/$1",
        "@constants(.*)$": "<rootDir>/src/constants$1",
        "@scss(.*)$": "<rootDir>/src/scss$1",
        "@reduxSlice(.*)$": "<rootDir>/src/reduxSlice$1",
        "@services(.*)$": "<rootDir>/src/services$1",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
