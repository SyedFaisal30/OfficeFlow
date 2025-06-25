import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("MONGODB NOT CONNECTED ",error);
        process.exit(1);
    }
};

export default dbConnect;