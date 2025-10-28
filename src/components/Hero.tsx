import React from "react";
import { Container, Button } from "react-bootstrap";

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
        <img
          src="/images/profil.jpg"
          alt="Profil"
          className="rounded-circle mb-3 border border-light"
          width="150"
        />
        <h1 className="fw-bold">
          Salut, je suis <span className="text-primary">YMAMOU Yassar</span>
        </h1>
        <p className="lead">Passionné du monde de la programmation</p>
        <Button variant="primary" href="#projects">
          Voir mes projets
        </Button>
      </Container>
    </section>
  );
};

export default Hero;
