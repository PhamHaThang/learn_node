require("dotenv").config();

const mongoose = require("mongoose");
module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(process.env.MONGO_URL);
    console.log(">>>Connect Database Success");
  } catch (error) {
    console.error(">>>Error Connect Database");
  }
};
