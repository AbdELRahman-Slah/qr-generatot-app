const qrService = require("../services/qr.service");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.emit("newUUID", qrService.getCurrent());

    const handler = (uuid) => {
      socket.emit("newUUID", uuid);
    };

    qrService.on("update", handler);

    socket.on("disconnect", () => {
      qrService.off("update", handler);
      console.log("Client disconnected:", socket.id);
    });
  });
};
