import { parse } from "csv-parse/sync";

export const parseCSV = (buffer: Buffer) => {
  const csv = buffer.toString("utf-8");

  const records = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return records;
};