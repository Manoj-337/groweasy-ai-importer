export interface UploadResponse {
    success: boolean;
    totalRows: number;
    headers: string[];
    data: Record<string, string>[];
  }