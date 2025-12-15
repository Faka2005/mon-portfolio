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
          <span className="text-primary">YMAMOU Yassar</span>
        </h1>

        <p className="lead">
          Développeur web passionné, avec plus de 4 ans d’expérience dans la conception d’applications web et mobiles. J’accorde une importance particulière à la structure du code, aux performances et à l’expérience utilisateur, en utilisant principalement React, Node.js et MongoDB.
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
