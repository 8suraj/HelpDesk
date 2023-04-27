const { setComments, getTicket } = require("../models/ticket.model");
const {getUser} = require("../models/user.model")
const { UserData } = require("../utils/utils");
function socketHandler(io) {
  io.on("connection", async(socket) => {
    const header = socket.handshake.headers.authorization;
    const  userData = await UserData(header);
    //users joining their specific rooms
    socket.join(userData.id);
    socket.on("comment",async(data)=>{
      const Data = data;
      setComments(Data);
      const ticket =await getTicket(Data.ticketId)
      //ticket is assigned and comment is made by raiser
      if (ticket.assignedTo&&!Data.isResolver){
        const user = await getUser(ticket.ticketRaiserId)

        io.to(ticket.assignedTo.toString()).emit("notification",{...Data,username:user.username,action:"commented"})

      }
      //comment is made by resolver
      if(Data.isResolver){
        const user = await getUser(ticket.assignedTo)
        io.to(ticket.ticketRaiserId.toString()).emit("notification",{...Data,username:user.username,action:"commented"})

      }
      
    })
    socket.on("status-update",async(data)=>{
      const Data = data;
      setComments(Data);
      const ticket =await getTicket(Data.ticketId)
      //ticket is assigned and comment is made by raiser
      if (ticket.assignedTo&&!Data.isResolver){
        const user = await getUser(ticket.ticketRaiserId)

        io.to(ticket.assignedTo.toString()).emit("status",{...Data,username:user.username,action:"status changed"})

      }
      //comment is made by resolver
      if(Data.isResolver){
        const user = await getUser(ticket.assignedTo)
        io.to(ticket.ticketRaiserId.toString()).emit("notification",{...Data,username:user.username,action:"status changed"})

      }
      
    })

    
      
  });


}
module.exports = {
  socketHandler,
};
