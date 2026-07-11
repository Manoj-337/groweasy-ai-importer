"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCSV = void 0;
const csv_service_1 = require("../services/csv.service");
const uploadCSV = (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "CSV file is required.",
            });
            return;
        }
        const records = (0, csv_service_1.parseCSV)(req.file.buffer);
        res.status(200).json({
            success: true,
            totalRows: records.length,
            headers: records.length > 0
                ? Object.keys(records[0]) : [],
            data: records,
        });
    }
    catch (error) {
        console.error("CSV Parsing Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to parse CSV.",
        });
    }
};
exports.uploadCSV = uploadCSV;
