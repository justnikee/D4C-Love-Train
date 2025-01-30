// components/ChatMessage.tsx
import CodeBlock from "./CodeBlock";

const ChatMessage = ({ message, role }: { message: string; role: string }) => {
  // Regex to match code blocks with optional language specification
  const regex = /```(\w*)\n([\s\S]*?)```/g;
  let match;
  const codeBlocks = [];

  // Extract all code blocks from the message
  while ((match = regex.exec(message)) !== null) {
    const language = match[1] || "plaintext"; 
    const code = match[2].trim(); 
    codeBlocks.push({ language, code });
  }

  // Remove code blocks from the message to display the remaining text
  const textWithoutCodeBlocks = message.replace(regex, "").trim();

  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          role === "user" ? "bg-[#18181A] text-white rounded-xl px-6" : "bg-transparent text-slate-400"
        }`}
      >
        {/* Display the message text without code blocks */}
        {textWithoutCodeBlocks && <p>{textWithoutCodeBlocks}</p>}

        {/* Display each code block */}
        {codeBlocks.map((block, idx) => (
          <CodeBlock key={idx} code={block.code} language={block.language} />
        ))}
      </div>
    </div>
  );
};

export default ChatMessage;