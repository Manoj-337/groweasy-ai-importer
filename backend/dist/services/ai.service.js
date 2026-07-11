"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCRMData = extractCRMData;
const genai_1 = require("@google/genai");
const prompt_service_1 = require("./prompt.service");
const ai = new genai_1.GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});
async function extractCRMData(records) {
    const prompt = (0, prompt_service_1.buildPrompt)(records);
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        },
    });
    const text = response.text ?? "";
    console.log("\n========== GEMINI RAW RESPONSE ==========");
    console.log(text);
    console.log("=========================================\n");
    // Remove markdown fences if Gemini still returns them
    const cleanText = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
    try {
        const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("No JSON found in Gemini response.");
        }
        const parsed = JSON.parse(jsonMatch[0]);
        if (!parsed.records || !Array.isArray(parsed.records)) {
            throw new Error("Gemini response missing 'records' array.");
        }
        return parsed.records;
    }
    catch (error) {
        console.error("\n========== JSON PARSE ERROR ==========");
        console.error(cleanText);
        console.error("======================================\n");
        throw new Error("Invalid JSON returned from Gemini");
    }
}
