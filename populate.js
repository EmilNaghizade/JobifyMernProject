import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import connectDb from "./db/connect.js";
import Job from "./models/Job.js";

const start = async () => {
  try {
    await connectDb(process.env.MONG0_URL);
    await Job.deleteMany();

    const jsonPorducts = JSON.parse(
      await readFile(new URL("./mock-data.json", import.meta.url))
      
    );
    await Job.create(jsonPorducts);
    console.log("Success");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
