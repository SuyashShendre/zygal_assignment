import express from "express";
// import mongoose from "mongoose";
import cors from "cors";
import router from "./common.route.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// mongoose
//   .connect("", {})
//   .then(() => {
//     console.log("db connected");
//   })
//   .catch((error) => console.error(error.message));

app.use("/", router);

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
