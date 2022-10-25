const express = require("express")
const app = express()
require("dotenv").config();


const PORT = process.argv[2] || 8000;

const routerRandoms = require('./routes/api/random.routes')
app.use("/api/randoms", routerRandoms)

app.listen(PORT, () => {
  console.info(`Server up and running on port ${PORT} - PID ${process.pid}`);
});
