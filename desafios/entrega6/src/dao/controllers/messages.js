import Chat from '../models/messages.js';

// Controlador para cargar la página de chat
const getChatPage = async (req, res) => {
  const { chatId } = req.params;

  try {
    const chats = await Chat.find();

    res.render('chat', { chats });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Controlador para enviar un mensaje en el chat
const sendMessage = async (req, res) => {
  const { chatId, sender, content } = req.body;

  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: 'Chat no encontrado' });
    }

    const newMessage = { sender, content };
    chat.messages.push(newMessage);

    await chat.save();

    res.redirect(`/chat/${chatId}`);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export { getChatPage, sendMessage };
