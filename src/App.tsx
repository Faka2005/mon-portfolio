import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavbarComponent from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ScriptPage from "./components/ScriptBashPage"; // page pour le script Bash
import Contact from "./components/Contact";
import Project from "./components/Project";
import AdminMessages from "./components/AdminMessage";
import About from "./components/About";
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
              <About/>
              <Projects />
              <Contact/>
            </>
          }
        />
        {/* Page spécifique pour le Script Bash */}
        <Route path="/script" element={<ScriptPage />} />
        <Route path="/project" element={<Projects/>}/>
        <Route path="/admin/message" element={<AdminMessages/>}/>
        <Route path="/project/:categorie/:name" element={<Project/>}/>
     
      </Routes>
      {/* <Contact/> */}
    </Router>
  );
};

export default App;
