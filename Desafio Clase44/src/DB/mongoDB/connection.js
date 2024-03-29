const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true); //para evitar error de deprecado
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports= {connectDB};


