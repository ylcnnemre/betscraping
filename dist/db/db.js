"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = () => {
    mongoose_1.default.connect("mongodb://localhost:27017/betdb");
    const db = mongoose_1.default.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", function () {
        console.log("db connection is success");
    });
};
exports.dbConnection = dbConnection;
