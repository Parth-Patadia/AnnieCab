const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phno: {
    type: String,
  },
  password: {
    type: String,
  },
  createAt: {
    type: String,
  },
  LoginStatus: {
    type: String,
  },
  lastLoggedin: {
    type: String,
  },
  profile: {
    type: String,
  },
  address: {
    type: String,
  },
  otp: {
    type: String,
  },
  otp_expires: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  try {
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(this.password, saltRound);
    this.password = hashPassword;
  } catch (error) {
    next(error);
  }
});

//exports.user = mongoose.model("user", userSchema);

const UserModel = mongoose.model("user", userSchema);

// Instead of logging immediately, export a function to log the database name
exports.logModelDatabase = () => {
  if (mongoose.connection.db) {
    console.log(`User model associated with database: ${mongoose.connection.db.databaseName}`);
  } else {
    console.log("Database connection not ye established");
  }
};

exports.user = UserModel;
