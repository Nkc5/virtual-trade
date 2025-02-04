import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL);

const ChatBox = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });
    }, []);

    const sendMessage = () => {
        socket.emit('chatMessage', message);
        setMessage('');
    };

    return (
        <div className="chat-box">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatBox;