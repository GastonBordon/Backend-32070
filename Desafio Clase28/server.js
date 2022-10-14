require("dotenv").config();

const config = require('./config.js')

const {initSocket, httpServer} = require('./sockets/socket.config')
initSocket()

const PORT = config.PORT;


httpServer.listen(PORT, () => {
  console.info(`Server up and running on port ${PORT}`);
});
