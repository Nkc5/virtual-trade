// controllers/chatController.js
exports.sendMessage = async (req, res) => {
    const { message } = req.body;
    io.emit('message', message); // Broadcast the message to all users
    res.json({ message: 'Message sent successfully' });
};