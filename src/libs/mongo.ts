import mongoose from "mongoose";

const connectMongoDB= async () => {
    try{
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined");
        }
        await mongoose.connect(mongoUri);
    }catch(err){
        console.log(err);
    }
}
export default connectMongoDB;