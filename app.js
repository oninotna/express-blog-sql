const express = require("express");
const postsRouter = require("./routers/posts.js");
const errorHandler = require("./middlewares/errorHandler.js");
const notFound = require("./middlewares/notFound.js");
const app = express();
const port = 3000;
const cors = require("cors");

const clientAddress = {
  origin: "http://localhost:5173"
}

app.use(express.static("public"));
app.use(express.json());

app.use(cors(clientAddress));

app.get("/", (req, res) => {
  res.send("Server del mio blog");
});

app.use("/posts", postsRouter);

app.use(errorHandler);
app.use(notFound);

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("app listening on port" + " " + port);
  }
});
