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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = payload;
    //   // creating instance of User for method
    //   const user = new User()
    //   // check user exists
    //   const isUserExist = await user.isUserExist(id)
    const isUserExist = yield user_model_1.User.isUserExist(id);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // Match password
    if (isUserExist.password) {
        // // Importing User model for method
        // const isPasswordMatch = await user.isPasswordMatch(
        // Importing User model for statics
        const isPasswordMatch = yield user_model_1.User.isPasswordMatch(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
        if (!isPasswordMatch) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid password');
        }
    }
    //Create access token & refresh token
    const { id: userId, role, needsPasswordChange } = isUserExist;
    // console.log(role)
    const accessToken = jwtHelper_1.jwtHelpers.createToken({
        userId,
        role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expiration_in);
    const refreshAccessToken = jwtHelper_1.jwtHelpers.createToken({
        userId,
        role,
    }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expiration_in);
    return {
        accessToken,
        refreshAccessToken,
        needsPasswordChange,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // varified access token
    let varifiedToken = null;
    try {
        varifiedToken = jwtHelper_1.jwtHelpers.verify(token, config_1.default.jwt.refresh_secret);
        // console.log(varifiedToken)
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid refresh token');
    }
    const { userId } = varifiedToken;
    // Check user exists with static parameters
    const isUserExist = yield user_model_1.User.isUserExist(userId);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const { id, role } = isUserExist;
    // Create new access token
    const newAccessToken = jwtHelper_1.jwtHelpers.createToken({ id, role }, config_1.default.jwt.secret, config_1.default.jwt.expiration_in);
    return { accessToken: newAccessToken };
});
const passwordChange = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    console.log(user === null || user === void 0 ? void 0 : user.userId);
    // user isExist
    // const isUserExist = await User.isUserExist(user?.userId)
    const isUserExist = yield user_model_1.User.findOne({ id: user === null || user === void 0 ? void 0 : user.userId }).select('+password');
    console.log(isUserExist);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // Match old password
    if (isUserExist.password) {
        const isPasswordMatch = yield user_model_1.User.isPasswordMatch(oldPassword, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
        if (!isPasswordMatch) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid old password');
        }
    }
    // // Update password
    // const newHashPassword = await bcrypt.hash(
    //   newPassword,
    //   Number(config.bcrypt_salt_rounds),
    // )
    // const query = { id: user?.userId }
    // const updateData = {
    //   password: newHashPassword,
    //   needsPasswordChange: false,
    //   passwordChangeAt: new Date(),
    // }
    // await User.findOneAndUpdate(query, updateData)
    // Alternate way
    isUserExist.needsPasswordChange = false;
    isUserExist.password = newPassword;
    yield isUserExist.save();
});
exports.AuthService = {
    loginUser,
    refreshToken,
    passwordChange,
};
