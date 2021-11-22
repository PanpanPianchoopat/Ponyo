import express, { json } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import RestaurantRoutes from "./routes/restaurantRoutes.js";
import ReviewRoutes from "./routes/reviewRoutes.js";

const app = express();
app.use(cors());

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

app.use("/user", userRoutes);
app.use("/restaurant", RestaurantRoutes);
app.use("/review", ReviewRoutes);

app.get("/", (req, res) => {
  res.send("Hello to Ponyo API");
});

// const CONNECTION_URL =
//   "mongodb+srv://admin:admin@ponyo.ih38y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const CONNECTION_URL =
  "mongodb+srv://admin:admin@ponyo.u3d9v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 8080;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect`));
