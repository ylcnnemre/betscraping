"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const teamSchema = new mongoose_1.default.Schema({
    teamNames: {
        type: String
    },
    leauge: {
        type: String
    },
    date: {
        type: String
    },
    guess: {
        type: String
    },
    oddValue: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
});
const matchModel = mongoose_1.default.model("betmatch", teamSchema);
exports.matchModel = matchModel;
