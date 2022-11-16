import dotenv from "dotenv";

dotenv.config();

export const { PORT, DEBUG_MODE, MONGO_URL, JWT_SECRET, FORGOT_SECRET } = process.env;
