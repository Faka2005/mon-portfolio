import React from "react";
import { Container, Button } from "react-bootstrap";
import Logo from "./Logo";
const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
      }}
    >
      <Container>


        <h1 className="fw-bold">
          <span className="text-primary">Dévellopeur YMAMOU Yassar</span>
        </h1>

        <p className="lead">
          Développeur web full-stack passionné, spécialisé en React, Node.js et MongoDB. Depuis 4 ans, je crée des applications web et mobiles performantes et ergonomiques, alliant code propre et expérience utilisateur optimale.
        </p>

        {/* 🚀 BARRE DÉFILANTE PREMIUM */}
        <Logo />
        <Button variant="primary" href="#projects" className="mt-4">
          Voir mes projets
        </Button>
      </Container>
    </section>
  );
};

export default Hero;
