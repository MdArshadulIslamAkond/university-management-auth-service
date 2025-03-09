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
exports.AcademicSemesterService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const academicSemester_constant_1 = require("./academicSemester.constant");
const academicSemester_model_1 = require("./academicSemester.model");
const http_status_1 = __importDefault(require("http-status"));
const createSemester = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (academicSemester_constant_1.academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid title and code combination!');
    }
    const result = yield academicSemester_model_1.AcademicSemester.create(payload);
    if (!result) {
        throw new ApiError_1.default(400, 'Could not create academic semester!');
    }
    return result;
});
const getAllSemesters = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andCondition = [];
    if (searchTerm) {
        const isNumeric = !isNaN(Number(searchTerm)); // Check if searchTerm is numeric
        andCondition.push({
            $or: academicSemester_constant_1.academicSemesterSearchableFields.map(field => isNumeric && field === 'year'
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
    // const andCondition = [
    //   {
    //     $or: [
    //       {
    //         // title: { $regex: new RegExp(searchTerm, 'i') },
    //         title: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //       {
    //         // code: { $regex: new RegExp(searchTerm, 'i') },
    //         code: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //       // {
    //       //   // year: { $regex: new RegExp(searchTerm, '') },
    //       //   year: {
    //       //     $regex: parseInt(searchTerm),
    //       //     // $options: 'i',
    //       //   },
    //       // },
    //       ...(isNumeric
    //         ? [
    //             {
    //               year: Number(searchTerm),
    //             },
    //           ]
    //         : []),
    //     ],
    //   },
    // ]
    // ,sortBy, sortOrder
    const sortConditions = {};
    // const sortConditions: { [key: string]: string } = {}
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield academicSemester_model_1.AcademicSemester.find(whereCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield academicSemester_model_1.AcademicSemester.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleSemester = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemester.findById(id);
    return result;
});
const getUpdateSemester = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.title &&
        payload.code &&
        academicSemester_constant_1.academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid title and code combination!');
    }
    const result = yield academicSemester_model_1.AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const getDeleteSemester = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemester.findByIdAndDelete(id);
    return result;
});
exports.AcademicSemesterService = {
    createSemester,
    getAllSemesters,
    getSingleSemester,
    getUpdateSemester,
    getDeleteSemester,
};
