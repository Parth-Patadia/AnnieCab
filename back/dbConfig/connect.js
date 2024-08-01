const mongoose = require("mongoose");
const colors = require("colors");

const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://parth2911:parth2911@ecom-mern.1gl5pdx.mongodb.net/anniecab");
    
    console.log("DB Connected successfully".bgWhite.cyan);
    console.log(`Connected to database: ${mongoose.connection.db.databaseName}`.bgWhite.green);
    console.log(`Connected to host: ${mongoose.connection.host}`.bgWhite.green);

    mongoose.connection.on('error', (err) => {
      console.error("MongoDB connection error:".bgRed.white, err);
    });

  } catch (err) {
    console.error("Error in DB connection:".bgRed.white, err);
    process.exit(1);
  }
};

module.exports = connect;
//mongodb+srv://parth2911:parth2911@ecom-mern.1gl5pdx.mongodb.net/
//mongodb+srv://sparkstoideasdev4:cIUfWwygFLIvNVIZ@cluster0.vvexfby.mongodb.net/annie
//mongodb+srv://parth2911:parth2911@ecom-mern.1gl5pdx.mongodb.net/ecom-mern
