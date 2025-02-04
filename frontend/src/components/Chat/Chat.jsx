// src/components/Chat/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io(import.meta.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'); // Replace with your backend URL or use environment variable

const Chat = ({ userId, receiverId, boothId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null); // Ref for scrolling to bottom

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/chat', {
          params: { receiverId, boothId }, // Include boothId if it exists
        });
        setMessages(response.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError(err.message || "Failed to fetch messages.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    socket.on('chatMessage', (message) => { // Listen for 'chatMessage' event
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('chatMessage'); // Clean up listener
    };
  }, [receiverId, boothId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (newMessage.trim() === '') return; // Don't send empty messages

    try {
      const messageData = {
        senderId: userId,
        receiverId,
        message: newMessage.trim(), // Trim whitespace
        boothId, // Include boothId if it exists
      };

      socket.emit('sendMessage', messageData); // Emit 'sendMessage' event
      setMessages((prevMessages) => [...prevMessages, messageData]); // Update state immediately
      setNewMessage(''); // Clear input
    } catch (err) {
      console.error("Error sending message:", err);
      setError(err.message || "Failed to send message.");
    }
  };

    if (loading) {
        return <div>Loading chat messages...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

  return (
    <div className="chat-container"> {/* Add a CSS class for styling */}
      <div className="message-list">
        {messages.map((message) => (
          <div key={message._id} className={`message ${message.senderId._id === userId ? 'sent' : 'received'}`}>
            <span className="message-sender">{message.senderId.firstName}: </span>
            <span className="message-text">{message.message}</span>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Empty div for scrolling */}
      </div>
      <div className="message-input">
        <input type="text" value={newMessage} onChange={handleInputChange} placeholder="Type your message..." />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;