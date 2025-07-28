import express from "express";
import apiRouter from "./src/api/index.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Project management tool backend running!");
});

app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`);
});
