"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [typing, setIsTyping] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsTyping(true);
    setMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      setTypingEffect(data.reply);
    } catch (error) {
      console.error("Error:", error);
      setReply("An error occurred while fetching the response.");
      setIsTyping(false);
    }
  }

  function setTypingEffect(text: string) {
    let i = 0;
    setReply("");

    const interval = setInterval(() => {
      setReply((prev) => prev + text[i]);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
        setReply(text);
      }
    }, 50); 
  }

  return (
    <div>
      <div className="p-5">
        {typing ? (
          <p>Typing...</p>
        ) : (
          <p>{reply}</p>
        )}
      </div>
      <form
        className="fixed bottom-3 w-full flex justify-center"
        onSubmit={handleSubmit}
      >
        <Input
          className="w-full max-w-4xl m-auto"
          type="text"
          placeholder="Message LoveTrain"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
};

export default ChatBox;