import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavbarComponent from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ScriptPage from "./components/ScriptBashPage"; // page pour le script Bash
import Contact from "./components/Contact";
import ProjectDétails from "./components/ProjectDetail";
import AdminMessages from "./components/AdminMessage";
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
              <Contact/>
            </>
          }
        />
        {/* Page spécifique pour le Script Bash */}
        <Route path="/script" element={<ScriptPage />} />
        <Route path="/project" element={<Projects/>}/>
        <Route path="/admin/message" element={<AdminMessages/>}/>
        <Route path="/project/:name" element={<ProjectDétails/>}/>
      </Routes>
      {/* <Contact/> */}
    </Router>
  );
};

export default App;
