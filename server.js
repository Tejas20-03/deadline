import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-route.js";
import taskRouter from "./routes/task-route.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/user", router);
app.use("/api/task", taskRouter);

const port = process.env.PORT;

const URL = process.env.MONGODB_URL;

mongoose
  .connect(URL)
  .then(() => {
    app.listen(port);
  })
  .then(() => {
    console.log(`Connected to MongoDb and Listening to Port ${port}`);
  })
  .catch((err) => {
    console.log(err);
  });
