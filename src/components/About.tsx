import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DownloadButton from "./BouttonDownload";
import "../css/about.css";

const skills = [
  { name: "React", icon: "/logos/react.png" },
  { name: "TypeScript", icon: "/logos/ts.png" },
  { name: "JavaScript", icon: "/logos/js.png" },
  { name: "HTML", icon: "/logos/html.png" },
  { name: "CSS", icon: "/logos/css.png" },
  { name: "PHP", icon: "/logos/php.png" },

  { name: "Node.js", icon: "/logos/node.png" },
  { name: "Express", icon: "/logos/express.png" },
  { name: "SQL", icon: "/logos/sql.png" },
  { name: "MongoDB", icon: "/logos/mongo.png" },
  { name: "PostgreSQL", icon: "/logos/postgresql.png" },
  { name: "Bash", icon: "/logos/bash.png" },
  { name: "Kotlin", icon: "/logos/kotlin.png" },
  { name: "Go", icon: "/logos/go.png" },
  { name: "C", icon: "/logos/c.png" },

  { name: "Arduino", icon: "/logos/arduino.jpeg" },
  { name: "ESP32", icon: "/logos/esp32.png" },
  { name: "Zigbee", icon: "/logos/zigbee.png" },
  { name: "LoRa", icon: "/logos/lora.png" },
  { name: "Home Assistant", icon: "/logos/home-assistant.png" },
];

export default function About() {
  return (
    <section id="about" className="about-section">
      <Container>
        <Row className="align-items-start gy-5">

          {/* TEXTE */}
          <Col md={6}>
            <h2 className="section-title mb-4">
              À propos de moi
            </h2>

            <p className="about-text">
              Étudiant en informatique et électronique, je suis passionné par la
              création de <span className="neon-text">solutions complètes</span>,
              mêlant <span className="neon-text">développement web</span> et{" "}
              <span className="neon-text">systèmes embarqués / IoT</span>.
              J’aime comprendre un projet dans sa globalité, du{" "}
              <strong>capteur</strong> jusqu’à l’
              <strong>interface utilisateur</strong>.
            </p>

            <p className="about-text">
              J’ai développé des applications web en{" "}
              <strong>React et Node.js</strong>, ainsi que des systèmes connectés
              basés sur <strong>Arduino, ESP32</strong> et des technologies de{" "}
              <strong>communication sans fil</strong>.
            </p>

            <p className="about-text mb-4">
              Je recherche actuellement un <strong>stage</strong> afin de
              renforcer mes compétences, tout en restant ouvert à des{" "}
              <strong>missions techniques</strong> ou projets innovants.
            </p>

            {/* BOUTON CV */}
            <DownloadButton
              color="blue"
              filePath="/CV_YMAMOU_YASSAR.pdf"
              fileName="CV_YMAMOU_YASSAR.pdf"
              name="Télecharger mon CV"
            />
          </Col>

          {/* SKILLS */}
          <Col md={6}>
            <h3 className="skills-title mb-4 text-center">
              Compétences techniques
            </h3>

            <Row>
              {skills.map((skill) => (
                <Col
                  key={skill.name}
                  xs={4}
                  sm={4}
                  md={4}
                  className="mb-4 text-center"
                >
                  <div className="skill-card">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="skill-icon"
                    />
                    <span>{skill.name}</span>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>

        </Row>
      </Container>
    </section>
  );
}
