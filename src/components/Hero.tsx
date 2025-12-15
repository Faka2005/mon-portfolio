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
  Salut, je suis <span className="text-primary">YMAMOU Yassar</span>
</h1>

<p className="lead">
  Étudiant passionné par l’informatique, je développe depuis plus de 3 ans des
  applications web et mobiles. J’aime concevoir des solutions modernes,
  performantes et bien structurées, en travaillant notamment avec React,
  Node.js et MongoDB. Je m’intéresse également aux systèmes embarqués
  (Arduino, MyRIO). Mon objectif est de devenir développeur full-stack et de
  créer des applications utiles à fort impact.
</p>

        {/* 🚀 BARRE DÉFILANTE PREMIUM */}
            <Logo/>
        <Button variant="primary" href="#projects" className="mt-4">
          Voir mes projets
        </Button>
      </Container>
    </section>
  );
};

export default Hero;
