import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeSnippetProps {
  code: string;
  language?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language = "c",
}) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      customStyle={{
        borderRadius: "8px",
        fontSize: "0.85rem",
        padding: "1rem",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeSnippet;
