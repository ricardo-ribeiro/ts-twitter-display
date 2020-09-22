import server from "./Server";
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    console.log("Starting Worker");
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log("Worker", worker.id, " has exited!");
    cluster.fork();
  });
} else {
  server.start();
}
