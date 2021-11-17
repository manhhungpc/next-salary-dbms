import dotenv from "dotenv";
dotenv.config();

export const apiURL = process.env.ENV === "production" ? "*" : "http://localhost:8000";
