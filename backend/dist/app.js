"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const upload_routes_1 = __importDefault(require("./routes/upload.routes"));
const import_routes_1 = __importDefault(require("./routes/import.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/api", upload_routes_1.default);
app.use("/api", import_routes_1.default);
app.get("/", (_req, res) => {
    res.json({
        message: "GrowEasy Backend Running 🚀",
    });
});
exports.default = app;
