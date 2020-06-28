const mongoose = require("mongoose");
const creds = require("./credentials");
module.exports = () => {
  mongoose.connect(
    creds.dbUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      dbName: "restrictor",
    },
    (err) => {
      if (err) {
        console.log("Database error has occured!", err);
        return;
      }
      console.log("Database connected successfully");
    }
  );
};
