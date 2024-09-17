const mongoose = require("mongoose");
require('dotenv').config();
const mongooseUri = process.env.MONGOOSE_URI;

const connectDatabase = async() => {
    return mongoose.connect
        (
            mongooseUri, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            }
        ).then(() => {
            console.log("Successfully connected to the database.")
        }).catch((error) => {
            console.log(error.message);
        })
};

module.exports = connectDatabase;