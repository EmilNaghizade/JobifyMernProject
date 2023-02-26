import mongoose from "mongoose";
mongoose.set('strictQuery', false);

const connectDB = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

export default connectDB;