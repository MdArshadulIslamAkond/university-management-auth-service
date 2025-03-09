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
exports.StudentService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const student_constants_1 = require("./student.constants");
const student_model_1 = require("./student.model");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const getAllStudent = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        const isNumeric = !isNaN(Number(searchTerm)); // Check if searchTerm is numeric
        andCondition.push({
            $or: student_constants_1.studentSearchableFields.map(field => isNumeric && field === 'year'
                ? { [field]: Number(searchTerm) }
                : field !== 'year'
                    ? { [field]: { $regex: searchTerm, $options: 'i' } }
                    : {}),
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
    const result = yield student_model_1.Student.find(whereCondition)
        .populate('academicFaculty')
        .populate('academicDepartment')
        .populate('academicSemester')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield student_model_1.Student.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findById(id)
        .populate('academicFaculty')
        .populate('academicDepartment')
        .populate('academicSemester');
    return result;
});
const getUpdateStudent = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // const isExist = await Student.findOne({ _id: id })
    const isExist = yield student_model_1.Student.findOne({ id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Student not found !');
    }
    const { name, guardiant, localGuarian } = payload, studentData = __rest(payload, ["name", "guardiant", "localGuarian"]);
    const updatedStudentData = Object.assign({}, studentData);
    // Dynamically update name
    if (name && Object.keys(name).length > 0) {
        Object.entries(name).forEach(([key, value]) => {
            const nameKey = `name.${key}`;
            updatedStudentData[nameKey] = value;
        });
    }
    // Dynamically update guardiant
    if (guardiant && Object.keys(guardiant).length > 0) {
        Object.entries(guardiant).forEach(([key, value]) => {
            const guardiantKey = `guardiant.${key}`;
            updatedStudentData[guardiantKey] = value;
        });
    }
    // Dynamically update localGuarian
    if (localGuarian && Object.keys(localGuarian).length > 0) {
        Object.entries(localGuarian).forEach(([key, value]) => {
            const localGuarianKey = `localGuarian.${key}`;
            updatedStudentData[localGuarianKey] = value;
        });
    }
    const result = yield student_model_1.Student.findOneAndUpdate(
    // { _id: id },
    { id }, updatedStudentData, {
        new: true,
    });
    return result;
});
const getDeleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    let result = null;
    try {
        session.startTransaction();
        const deleteStudent = yield student_model_1.Student.findOneAndDelete({ id }, {
            session,
        });
        if (!deleteStudent) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Student not found !');
        }
        const deleteUser = yield user_model_1.User.findOneAndDelete({ id }, {
            session,
        });
        if (!deleteUser) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found !');
        }
        result = deleteStudent;
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
exports.StudentService = {
    getAllStudent,
    getSingleStudent,
    getUpdateStudent,
    getDeleteStudent,
};
