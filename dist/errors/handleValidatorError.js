"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidatorError = (error) => {
    const errors = Object.values(error.errors).map((element) => {
        return {
            path: element === null || element === void 0 ? void 0 : element.path,
            message: element === null || element === void 0 ? void 0 : element.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode: statusCode,
        message: 'Validation Error',
        errorMessages: errors,
    };
};
exports.default = handleValidatorError;
