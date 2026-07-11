"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importCSV = void 0;
const ai_service_1 = require("../services/ai.service");
const batch_util_1 = require("../utils/batch.util");
const importCSV = async (req, res) => {
    try {
        const { records } = req.body;
        if (!records || !Array.isArray(records)) {
            res.status(400).json({
                success: false,
                message: "Records are required",
            });
            return;
        }
        const batches = (0, batch_util_1.createBatches)(records, 25);
        let importedRecords = [];
        for (const batch of batches) {
            const result = await (0, ai_service_1.extractCRMData)(batch);
            importedRecords.push(...result);
        }
        res.status(200).json({
            success: true,
            totalImported: importedRecords.length,
            totalSkipped: records.length - importedRecords.length,
            records: importedRecords,
        });
    }
    catch (error) {
        console.error("========== IMPORT ERROR ==========");
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
            stack: process.env.NODE_ENV === "development"
                ? error.stack
                : undefined,
        });
    }
};
exports.importCSV = importCSV;
