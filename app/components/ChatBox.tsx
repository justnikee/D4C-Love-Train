"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChatMessage from "./ChatMessage";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [typing, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const chatBox = useRef<HTMLDivElement | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!message.trim()) return; // Prevent empty messages

    setIsTyping(true);

    setMessages((prev) => [...prev, { role: "user", content: message }]);
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

        setMessages((prev) => [...prev, { role: "assistant", content: text }]);
        setReply(""); // Clear the reply state
      }
    }, 50);
  }

  useEffect(() => {
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  }, [messages, typing]);

  return (
    <div className="flex h-screen justify-center">
      <div className="flex flex-col justify-center items-center w-full max-w-7xl">
        <div ref={chatBox} className="flex-1 w-2/3 overflow-y-auto p-5">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg.content} role={msg.role} />
          ))}
          {typing && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-200 p-3 rounded-lg">
                <p className="text-gray-500">Typing...</p>
              </div>
            </div>
          )}
        </div>

        {/* Input form */}
        <form className="w-full flex justify-center p-3" onSubmit={handleSubmit}>
          <div className="flex flex-col bg-gray-800 rounded-xl p-2 w-1/2">
            <Input
              className="w-full remove-focus shadow-none"
              type="text"
              placeholder="Message LoveTrain"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" className="m-2">
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;