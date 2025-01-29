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
    console.log("message:" , message)


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
    <div className="flex h-screen justify-center">
      <div className="flex flex-col justify-center items-center w-full max-w-7xl">
      <div ref={chatBox} className="flex-1 w-2/3 overflow-y-auto p-5">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 py-3 px-4 rounded-xl w-fit ${
              msg.role === "user"
                ? "bg-[#18181B] text-[#E1E4E8] ml-auto"
                : "bg-transparent text-[#E1E4E8] mr-auto"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {typing && <p className="text-gray-500">Typing...</p>}
      </div>

      {/* Input form */}
      <form
        className="w-full flex justify-center p-3"
        onSubmit={handleSubmit}
      >
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