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
exports.AdminService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const admin_constants_1 = require("./admin.constants");
const admin_model_1 = require("./admin.model");
const getAllAdmins = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: admin_constants_1.adminSearchableFields.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    // const sortConditions: { [key: string]: string } = {}
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield admin_model_1.Admin.find(whereCondition)
        .populate('managementDepartment')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield admin_model_1.Admin.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findById(id).populate('managementDepartment');
    return result;
});
const getUpdateAdmin = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // const isExist = await Admin.findOne({ _id: id })
    const isExist = yield admin_model_1.Admin.findOne({ id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin not found !');
    }
    const { name } = payload, studentData = __rest(payload, ["name"]);
    const updatedStudentData = Object.assign({}, studentData);
    // Dynamically update name
    if (name && Object.keys(name).length > 0) {
        Object.entries(name).forEach(([key, value]) => {
            const nameKey = `name.${key}`;
            updatedStudentData[nameKey] = value;
        });
    }
    const result = yield admin_model_1.Admin.findOneAndUpdate(
    // { _id: id },
    { id }, updatedStudentData, {
        new: true,
    });
    return result;
});
const getDeleteAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    let result = null;
    try {
        session.startTransaction();
        const deleteAdmin = yield admin_model_1.Admin.findOneAndDelete({ id }, {
            session,
        });
        if (!deleteAdmin) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin not found !');
        }
        const deleteUser = yield user_model_1.User.findOneAndDelete({ id }, {
            session,
        });
        if (!deleteUser) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found !');
        }
        result = deleteAdmin;
        yield session.commitTransaction();
        session.endSession();
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
    return result;
});
exports.AdminService = {
    getAllAdmins,
    getSingleAdmin,
    getUpdateAdmin,
    getDeleteAdmin,
};
