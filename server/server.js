import express from "express";
import apiRouter from "#api/index";
import errorHandler from "#middlewares/error.middleware";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

// middleware for parsing json
app.use(express.json());

// mount API router
app.use("/api", apiRouter);

// *splat matchs all paths, so if none of the api routes were matched then we can return 404 not found
app.all("/{*splat}", function (req, res) {
    res.status(404).send("Not found");
});

// mount the error handler at last, this allows errorHandler to catch all error from everything defined before it
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`);
});
