const express = require("express");
const connectDataBase = require("./database");
const userRoutes = require("./routers/userRoutes");
const propertyRoutes = require("./routers/propertiesRoutes");

const app = express();
app.use(express.json());

const databaseConnection = async() => {
    await connectDataBase();
}

const port = 3000;

app.use("", userRoutes);
app.use("", propertyRoutes);

app.listen(port,()=>{
    console.log("Server created at port ",port);
    databaseConnection();
});