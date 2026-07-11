"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCSV = void 0;
const sync_1 = require("csv-parse/sync");
const parseCSV = (buffer) => {
    const csv = buffer.toString("utf-8");
    const records = (0, sync_1.parse)(csv, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    });
    return records;
};
exports.parseCSV = parseCSV;
