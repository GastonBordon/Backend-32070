const express = require("express");
const mainRouter = require("./routes/main.js");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/statics", express.static(__dirname + "/public"));

app.use("/api", mainRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.send({ err });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
