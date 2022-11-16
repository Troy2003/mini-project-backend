import { MONGO_URL } from "../config";
import mongoose from "mongoose";

const connectToDatabase = () => {
    main().catch(err => console.log(err));

    async function main() {
        await mongoose.connect(MONGO_URL);
    }
}

export default connectToDatabase;