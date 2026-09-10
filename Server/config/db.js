import mongoose from "mongoose"

const connectDb = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        throw new Error("MONGO_URI is missing from .env");
    }

    await mongoose.connect(mongoUri);
    console.log("Db connected");
}

export default connectDb;