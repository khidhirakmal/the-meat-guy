import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(connectionURL, configOptions);
    console.log(`MongoDB, ${process.env.MONGO_USER} connected successfully`);
  } catch (err) {
    console.error("Error Connecting", err);
  }
};

export default connectToDB;
