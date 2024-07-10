import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Image from "./models/Image.js";

const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/cnps_db")
  .then(() => console.log("DB connected..."))
  .catch((error) => console.log(error));

app.post("/upload-image", async (req, res) => {
  const { base64 } = req.body;
  try {
    const newImg = new Image({ image: base64 });
    await newImg.save();
    console.log(newImg);
    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.log(error);
  }
});
app.get("/get-images", async (req, res) => {
  try {
    const data = await Image.find({});
    return res.send({ status: "ok", data: data });
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, () => {
  console.log(`Server runing on prt ${port}...`);
});
