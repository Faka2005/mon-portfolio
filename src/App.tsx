import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavbarComponent from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ScriptPage from "./components/ScriptBashPage"; // page pour le script Bash

const App: React.FC = () => {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        {/* Page d'accueil avec Hero + Projects */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Projects />
            </>
          }
        />
        {/* Page spécifique pour le Script Bash */}
        <Route path="/script" element={<ScriptPage />} />
      </Routes>
      {/* <Contact/> */}
    </Router>
  );
};

export default App;
