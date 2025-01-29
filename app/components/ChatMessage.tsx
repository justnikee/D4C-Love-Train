// components/ChatMessage.js
import CodeBlock from './CodeBlock';

const ChatMessage = ({ message }) => {
  const regex = /```([\s\S]*?)```/g;
  let match;
  const codeBlocks = [];

  while ((match = regex.exec(message)) !== null) {
    codeBlocks.push(match[1]); 
  }

  return (
    <div className="message">
      <p>{message.replace(regex, '')}</p>
      {codeBlocks.map((code, idx) => (
        <CodeBlock key={idx} code={code} />
      ))}
    </div>
  );
};

export default ChatMessage;
