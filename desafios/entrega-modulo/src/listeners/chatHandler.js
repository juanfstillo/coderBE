import MessagesManager from "../dao/mongo/manager/messages.js";

const messagesService = new MessagesManager();

const registerChatHandler = (io,socket) =>{

    const saveMessage = async(message) =>{
        await messagesService.createMessages(message);
        const messageLogs = await messagesService.getMessages();
        io.emit('chat:messageLogs',messageLogs);
    }

    const newParticipant = (user) =>{
        socket.broadcast.emit('chat:newConnection')
    }

    socket.on('chat:message',saveMessage);
    socket.on('chat:newParticipant',newParticipant);
}

export default registerChatHandler;