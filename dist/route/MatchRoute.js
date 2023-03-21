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
exports.matchRouter = void 0;
const express_1 = __importDefault(require("express"));
const matchModel_1 = require("../model/matchModel");
const MatchService_1 = require("../service/MatchService");
exports.matchRouter = express_1.default.Router();
exports.matchRouter.get("/", (req, res) => {
    matchModel_1.matchModel.find().select("-_id").then(val => {
        res.status(200).send(val);
    }).catch(err => {
        res.status(500).send("internal server error");
    });
});
exports.matchRouter.get("/updateMatch", (req, res) => {
    (0, MatchService_1.getBetValue)().then((val) => __awaiter(void 0, void 0, void 0, function* () {
        if (val) {
            yield matchModel_1.matchModel.deleteMany({});
            yield matchModel_1.matchModel.insertMany(val);
            res.send(val);
        }
    })).catch(err => {
        res.send(err);
    });
});
