/*******************************************************************************
 * Main page of backend
 ******************************************************************************/
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import RestaurantRoutes from "./routes/restaurantRoutes.js";
import ReviewRoutes from "./routes/reviewRoutes.js";

const app = express();

// Connect/Express middleware
app.use(cors());

// looks at requests where the Content-Type: application/json
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

// object will contain values of any type instead of just strings
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

// a middleware mounted on /user; will be executed for any type of HTTP request to /user
app.use("/user", userRoutes);

// a middleware mounted on /restaurant; will be executed for any type of HTTP request to /restaurant
app.use("/restaurant", RestaurantRoutes);

// a middleware mounted on /review; will be executed for any type of HTTP request to /review
app.use("/review", ReviewRoutes);

app.get("/", (req, res) => {
  res.send("Hello to Ponyo API");
});

// URL to connect database
const CONNECTION_URL =
  "mongodb+srv://ponyo:ponyo@ponyo.romjl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 8080;

// Connect to the database
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect`));
