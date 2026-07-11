# GrowEasy AI CSV Importer

An AI-powered CSV Importer that allows users to upload CRM data, preview the records, analyze the data using Google Gemini AI, and confirm the import.

---

## Features

- Upload CSV files
- Drag & Drop file upload
- CSV Preview
- AI-powered data analysis using Google Gemini
- Import confirmation
- Statistics Dashboard
- Responsive UI
- Error handling and validation

---

## Tech Stack

### Frontend
- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Axios
- React Dropzone
- Lucide React

### Backend
- Node.js
- Express.js
- TypeScript
- Multer
- csv-parser
- Google Gemini API
- Zod
- Morgan

---

## Project Structure

```

groweasy-ai-importer/
│
├── frontend/
│ ├── src/
│ │ ├── app/
│ │ ├── components/
│ │ ├── services/
│ │ └── types/
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── services/
│ │ └── server.ts
│
└── README.md
