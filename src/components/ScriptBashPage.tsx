import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ScriptPage: React.FC = () => {
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    // Récupérer le script depuis le dossier public
    fetch("/scrpt.sh")
      .then((res) => res.text())
      .then((text) => setCode(text))
      .catch((err) => console.error("Erreur chargement script :", err));
  }, []);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#1e1e1e", minHeight: "100vh" }}>
      <h2 style={{ color: "#fff", marginBottom: "1rem" }}>Contenu du script.sh</h2>
      <SyntaxHighlighter language="bash" style={oneDark}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default ScriptPage;
