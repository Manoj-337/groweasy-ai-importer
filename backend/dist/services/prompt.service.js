"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPrompt = buildPrompt;
function buildPrompt(records) {
    return `
  You are an AI data extraction engine.
  
  Your task is to convert arbitrary CSV records into GrowEasy CRM records.
  
  The input records may come from:
  - Facebook Lead Ads
  - Google Ads
  - Excel
  - Real Estate CRMs
  - Sales reports
  - Marketing CSVs
  - Manually created spreadsheets
  
  IMPORTANT:
  Do NOT rely on exact column names.
  Infer fields based on meaning.
  
  Map each record into this schema:
  
  {
    "created_at": "",
    "name": "",
    "email": "",
    "country_code": "",
    "mobile_without_country_code": "",
    "company": "",
    "city": "",
    "state": "",
    "country": "",
    "lead_owner": "",
    "crm_status": "",
    "crm_note": "",
    "data_source": "",
    "possession_time": "",
    "description": ""
  }
  
  Rules:
  
  1. Skip records that have neither email nor phone.
  
  2. Allowed crm_status values:
  - GOOD_LEAD_FOLLOW_UP
  - DID_NOT_CONNECT
  - BAD_LEAD
  - SALE_DONE
  
  If unsure, leave it blank.
  
  3. Allowed data_source values:
  - leads_on_demand
  - meridian_tower
  - eden_park
  - varah_swamy
  - sarjapur_plots
  
  Otherwise leave blank.
  
  4. If multiple emails exist:
  Use the first.
  Append remaining emails into crm_note.
  
  5. If multiple phone numbers exist:
  Use the first.
  Append remaining numbers into crm_note.
  
  6. Preserve useful remarks inside crm_note.
  
  7. created_at must be a valid JavaScript date string if possible.
  
  8. Return ONLY valid json.

  9. Do NOT wrap the response inside markdown.
  
  10. Do NOT use json.

  11. Do NOT explain anything.

  12. Do NOT include any text before or after the JSON.

  13. If a field cannot be determined, return an empty string.

  14. Return exactly this structure:
  
  {
  "records": [
    {
      "created_at": "",
      "name": "",
      "email": "",
      "country_code": "",
      "mobile_without_country_code": "",
      "company": "",
      "city": "",
      "state": "",
      "country": "",
      "lead_owner": "",
      "crm_status": "",
      "crm_note": "",
      "data_source": "",
      "possession_time": "",
      "description": ""
    }
  ]
}

Input Records:

${JSON.stringify(records)}
  `;
}
