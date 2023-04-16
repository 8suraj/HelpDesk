const onlineUsers = new Map();

function socketHandler(socket) {
  socket.on("add-user", (userId) => {
    console.log("adduser");
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
}

module.exports = { socketHandler };
