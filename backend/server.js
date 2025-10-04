const http = require("http");
const app = require("./app");

const server = http.createServer(app);
const io = require("socket.io")(server);

const qrService = require("./services/qr.service");
qrService.start();

require("./sockets/qr.socket")(io);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
