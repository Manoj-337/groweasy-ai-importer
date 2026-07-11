import { Request, Response } from "express";
import { parseCSV } from "../services/csv.service";

export const uploadCSV = (req: Request, res: Response): void => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "CSV file is required.",
      });
      return;
    }

    const records = parseCSV(req.file.buffer);

    res.status(200).json({
      success: true,
      totalRows: records.length,
      headers:
       records.length>0
       ? Object.keys(records[0] as Record<string,string>) : [],
      data: records,
    });
  } catch (error) {
    console.error("CSV Parsing Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to parse CSV.",
    });
  }
};