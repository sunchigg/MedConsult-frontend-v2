import React from "react";

const MessageRoom = (props) => {
  const { messages } = props;

  return (
    <div>
      <h1>MessageRoom</h1>
      {messages && messages.length > 0 ? (
        <ul>
          {messages.map((msg) => (
            <li key={msg.id}>{msg.text}</li>
          ))}
        </ul>
      ) : (
        <p>No messages yet</p>
      )}
    </div>
  );
};

export default MessageRoom;
