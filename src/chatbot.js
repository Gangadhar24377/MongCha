import React, { useState, useEffect } from 'react';
import './chatbot.css'; // Import your CSS file for styling

const Chatbot = () => {
  const [messages, setMessages] = useState([]); // Array to store chat messages
  const [userInput, setUserInput] = useState(''); // State for user input

  // Sample data for responses (replace with your actual logic)
  const responses = {
    "hello": "Hi there! How can I help you today?",
    "how are you": "I'm doing well, thanks for asking. How can I assist you?",
    "default": "Sorry, I didn't quite understand that. Could you rephrase?"
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const sendMessage = () => {
    if (userInput.trim() !== '') { // Check for empty input
      setMessages([...messages, { isUser: true, text: userInput }]);
      setUserInput(''); // Clear user input after sending

      // Simulate response (replace with actual NLP integration)
      const response = responses[userInput.toLowerCase()] || responses.default;
      setTimeout(() => {
        setMessages([...messages, { isUser: false, text: response }]);
      }, 1000); // Simulate a delay for a more natural response
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-history">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.isUser ? 'user' : ''}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
