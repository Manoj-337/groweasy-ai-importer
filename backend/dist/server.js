"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
// Debug logs (remove after everything works)
console.log("================================");
console.log("Environment Check");
console.log("================================");
console.log("PORT:", process.env.PORT || 5001);
console.log("GEMINI_API_KEY Loaded:", !!process.env.GEMINI_API_KEY);
if (process.env.GEMINI_API_KEY) {
    console.log("API Key Prefix:", process.env.GEMINI_API_KEY.substring(0, 8) + "...");
}
else {
    console.log("❌ GEMINI_API_KEY NOT FOUND");
}
console.log("================================");
const PORT = Number(process.env.PORT) || 5001;
app_1.default.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
