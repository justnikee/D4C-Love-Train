// components/CodeBlock.js
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import hljs from 'highlight.js';



const CodeBlock = ({ code }) => {
  const language = hljs.highlightAuto(code).language;

  return (
    <div className="my-4 p-4 bg-gray-800 rounded-lg overflow-x-auto">
      <SyntaxHighlighter language={language} style={dracula}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
