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
exports.FacultyService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const faculty_model_1 = require("./faculty.model");
const faculty_constants_1 = require("./faculty.constants");
const getAllFaculty = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: faculty_constants_1.facultySearchableFields.map(field => ({
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
    const result = yield faculty_model_1.Faculty.find(whereCondition)
        .populate('AcademicDepartment')
        .populate('AcademicFaculty')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield faculty_model_1.Faculty.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.findById(id)
        .populate('AcademicDepartment')
        .populate('AcademicFaculty');
    return result;
});
const getUpdateFaculty = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // const isExist = await Admin.findOne({ _id: id })
    const isExist = yield faculty_model_1.Faculty.findOne({ id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Student not found !');
    }
    const { name } = payload, facultyData = __rest(payload, ["name"]);
    const updatedFacultyData = Object.assign({}, facultyData);
    // Dynamically update name
    if (name && Object.keys(name).length > 0) {
        Object.entries(name).forEach(([key, value]) => {
            const nameKey = `name.${key}`;
            updatedFacultyData[nameKey] = value;
        });
    }
    const result = yield faculty_model_1.Faculty.findOneAndUpdate(
    // { _id: id },
    { id }, updatedFacultyData, {
        new: true,
    });
    return result;
});
const getDeleteFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    let result = null;
    try {
        session.startTransaction();
        const deleteFaculty = yield faculty_model_1.Faculty.findOneAndDelete({ id }, {
            session,
        });
        if (!deleteFaculty) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Faculty not found !');
        }
        const deleteUser = yield user_model_1.User.findOneAndDelete({ id }, {
            session,
        });
        if (!deleteUser) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found !');
        }
        result = deleteFaculty;
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
exports.FacultyService = {
    getAllFaculty,
    getSingleFaculty,
    getUpdateFaculty,
    getDeleteFaculty,
};
