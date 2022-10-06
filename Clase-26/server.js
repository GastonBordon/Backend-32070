require("dotenv").config();
const app = require("./app");
const io = require("./sockets/socket.config");

const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.info(`Server up and running on port ${PORT}`);
});
