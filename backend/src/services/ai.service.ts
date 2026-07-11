import { GoogleGenAI } from "@google/genai";
import { buildPrompt } from "./prompt.service";
import { CRMRecord } from "../types/crm.types";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function extractCRMData(
  records: Record<string, unknown>[]
): Promise<CRMRecord[]> {
  const prompt = buildPrompt(records);

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
  } catch (error) {
    console.error("\n========== JSON PARSE ERROR ==========");
    console.error(cleanText);
    console.error("======================================\n");

    throw new Error("Invalid JSON returned from Gemini");
  }
}