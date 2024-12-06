import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const ChatHeader = styled.div`
  padding: 1rem;
  background: #000;
  color: white;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
`;

const MessagesContainer = styled.div`
  height: 300px;
  overflow-y: auto;
  padding: 1rem;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const MessageInput = styled.div`
  padding: 1rem;
  border-top: 1px solid #ddd;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  gap: 0.5rem;

  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    padding: 0.5rem 1rem;
    background: #000;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const Message = styled.div`
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  background: ${(props) => (props.isUser ? "#e3f2fd" : "#f5f5f5")};
  text-align: ${(props) => (props.isUser ? "right" : "left")};
`;

function ChatBox({ socket, driverInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (msg) => {
        setMessages((prev) => [...prev, { text: msg, isUser: false }]);
      });
    }
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      socket.emit("message", message);
      setMessages((prev) => [...prev, { text: message, isUser: true }]);
      setMessage("");
    }
  };

  return (
    <ChatContainer>
      <ChatHeader onClick={() => setIsOpen(!isOpen)}>
        Chat with {driverInfo.name}
      </ChatHeader>
      <MessagesContainer isOpen={isOpen}>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.isUser}>
            {msg.text}
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <MessageInput isOpen={isOpen}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </MessageInput>
    </ChatContainer>
  );
}

export default ChatBox;
