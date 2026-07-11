import express from "express";
import cors from "cors";
import morgan from "morgan";

import uploadRoutes from "./routes/upload.routes";
import importRoutes from "./routes/import.routes";

import { Request, Response } from "express";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", uploadRoutes);
app.use("/api", importRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "GrowEasy Backend Running 🚀",
  });
});

export default app;