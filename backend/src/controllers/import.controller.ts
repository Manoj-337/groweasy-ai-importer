import { Request, Response } from "express";
import { extractCRMData } from "../services/ai.service";
import { createBatches } from "../utils/batch.util";

export const importCSV = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { records } = req.body;

    if (!records || !Array.isArray(records)) {
      res.status(400).json({
        success: false,
        message: "Records are required",
      });
      return;
    }

    const batches = createBatches(records, 25);

    let importedRecords: any[] = [];

    for (const batch of batches) {
      const result = await extractCRMData(batch);
      importedRecords.push(...result);
    }

    res.status(200).json({
      success: true,
      totalImported: importedRecords.length,
      totalSkipped: records.length - importedRecords.length,
      records: importedRecords,
    });
  } catch (error:any) {
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