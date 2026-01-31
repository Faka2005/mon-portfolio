import React from "react";
import { Container, Button } from "react-bootstrap";
import "../css/hero.css";

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-section d-flex align-items-center"
    >
      <Container className="text-center">

        {/* Titre */}
        <h1 className="hero-title mb-3">
          Développeur Web & IoT junior
        </h1>

        {/* Sous-titre */}
        <p className="hero-subtitle mb-2">
          Applications web modernes & systèmes connectés.
        </p>

        {/* Stage / Missions (bien visible) */}
        <p className="hero-highlight mb-4">
          À la recherche d’un stage — ouvert aux missions projets
        </p>

        {/* Stack */}
        <p className="hero-stack mb-4">
          React • TypeScript • Node.js • Arduino • ESP32 • IoT
        </p>

        {/* CTA */}
        <div className="d-flex justify-content-center gap-3">
          <Button href="#projects" className="btn-neon" size="lg">
            Voir mes projets
          </Button>

          <Button
            href="#contact"
            className="btn-outline-neon"
            size="lg"
          >
            Me contacter
          </Button>
        </div>

        {/* Nom discret */}
        <p className="hero-name mt-5">
          YMAMOU Yassar — Informatique & Électronique
        </p>

      </Container>
    </section>
  );
}
