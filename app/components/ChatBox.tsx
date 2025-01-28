"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [typing, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]); // Store chat messages

  const chatBox = useRef<HTMLDivElement | null>(null); // Properly typed useRef

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsTyping(true);

    // Add the user's message to the chat
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setMessage(""); // Clear the input field

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
      setTypingEffect(data.reply); // Simulate typing effect for the bot's reply
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
      }
    }, 50); // Adjust typing speed (50ms per character)
  }

  useEffect(() => {
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      {/* Chat messages container */}
      <div ref={chatBox} className="flex-1 overflow-y-auto p-5">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-3 rounded-lg max-w-[80%] ${
              msg.role === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-black mr-auto"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {typing && <p className="text-gray-500">Typing...</p>}
      </div>

      {/* Input form */}
      <form
        className="fixed bottom-0 w-full flex justify-center p-3 border-t"
        onSubmit={handleSubmit}
      >
        <Input
          className="w-full max-w-4xl m-2"
          type="text"
          placeholder="Message LoveTrain"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" className="m-2">
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatBox;