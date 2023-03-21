"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const MatchRoute_1 = require("./route/MatchRoute");
const db_1 = require("./db/db");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use("/match", MatchRoute_1.matchRouter);
app.use("/test", (req, res) => {
    res.send("running");
});
app.listen(process.env.PORT || 8000, () => {
    (0, db_1.dbConnection)();
    console.log("server is running");
});
