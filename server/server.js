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

// {*splat} matchs all paths, so if none of the api routes were matched then we can return 404 not found
app.get("/{*splat}", (req, res) => {
    res.status(404).message({ message: "page not found, is the url correct?" });
});

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`);
});
