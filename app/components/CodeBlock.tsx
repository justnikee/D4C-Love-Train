"use client";

import { useEffect, useState } from "react";
import Prism from "prismjs"; 
import "prismjs/themes/prism-tomorrow.css";

export default function CodeBlock({ code, language }: { code: string; language: string }) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll(); 
  }, [code]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); 
  };

  return (
    <div className="bg-[#1E1E1E] rounded-lg overflow-hidden">
      <div className="flex justify-between items-center bg-[#2D2D2D] px-4 py-2">
        <span className="text-sm text-gray-300">{language}</span>
        <button
          className="text-sm text-gray-300 hover:text-white"
          onClick={handleCopy}
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}