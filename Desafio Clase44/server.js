const config = require('./config.js')
require("dotenv").config();

const cluster = require('cluster')
const numCPUs = require('os').cpus().length;

const {initSocket, httpServer} = require('./src/sockets/socket.config')
initSocket()

const PORT = config.PORT;

if((config.MODE).toUpperCase() === 'CLUSTER' && cluster.isPrimary){

console.log(`Primary process is running, id of process: ${process.pid}`)

for (let i = 1; i< numCPUs; i++){
cluster.fork()
}

cluster.on('exit', (worker,code,signal)=>{
  console.log(`worker ${worker.process.pid} is offline`)
})

}else{

httpServer.listen(process.env.PORT || PORT, () => {
  console.info(`Server up and running on port ${PORT} - PID ${process.pid}`);

});
}
