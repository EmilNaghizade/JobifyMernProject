import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// Security
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

import cookieParser from "cookie-parser";

import "express-async-errors";

// Express server
import express from "express";
const app = express();

// Cors
import cors from "cors";
app.use(cors());

// Morgan
import morgan from "morgan";
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Dotenv
import dotenv from "dotenv";
dotenv.config();

// Database
import connectDB from "./db/connect.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

// Middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use(cookieParser());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", authenticateUser, jobRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONG0_URL);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
