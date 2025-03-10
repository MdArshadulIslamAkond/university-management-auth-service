"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const auth_services_1 = require("./auth.services");
const config_1 = __importDefault(require("../../../config"));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(req.body)
    const loginData = __rest(req.body, []);
    const result = yield auth_services_1.AuthService.loginUser(loginData);
    const { refreshAccessToken } = result, others = __rest(result
    // set refresh token into cookie
    , ["refreshAccessToken"]);
    // set refresh token into cookie
    const cookieOptions = {
        httpOnly: true,
        secure: config_1.default.env === 'production',
    };
    res.cookie('refreshAccessToken', refreshAccessToken, cookieOptions);
    // send back user data without refresh token
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User logged in successfully',
        data: others,
    });
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(req.body)
    const { refreshAccessToken } = req.cookies;
    const result = yield auth_services_1.AuthService.refreshToken(refreshAccessToken);
    // set refresh token into cookie
    const cookieOptions = {
        httpOnly: true,
        secure: config_1.default.env === 'production',
    };
    res.cookie('refreshAccessToken', refreshAccessToken, cookieOptions);
    // send back user data without refresh token
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User logged in successfully',
        data: result,
    });
}));
const passwordChange = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(req.body)
    const passwordData = __rest(req.body, []);
    const user = req.user;
    yield auth_services_1.AuthService.passwordChange(user, passwordData);
    // send back user data without refresh token
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User password change in successfully',
    });
}));
exports.AuthController = {
    loginUser,
    refreshToken,
    passwordChange,
};
