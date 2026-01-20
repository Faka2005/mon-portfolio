import React from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import DownloadButton from "./BouttonDownload";

const About: React.FC = () => {
  return (
    <section id="about" className="bg-dark text-light py-5">
      <Container>

        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold text-center">À propos de moi</h2>
          </Col>
        </Row>

        <Row className="align-items-center gy-4">

          {/* Texte */}
          <Col md={7}>
            <p className="fs-5">
              Étudiant en informatique et électronique, orienté
              <strong> développement web</strong> et
              <strong> systèmes embarqués / IoT</strong>.
            </p>

            <p>
              Je conçois des applications web modernes ainsi que des projets
              électroniques intégrant microcontrôleurs, communication sans fil
              et supervision domotique.
            </p>

            <p>
              Mon objectif est de développer des solutions complètes,
              du matériel jusqu’à l’interface utilisateur.
            </p>
          </Col>

          {/* Compétences */}
          <Col md={5}>
            <h5>Compétences clés</h5>

            <div className="d-flex flex-wrap gap-2">
              <Badge bg="primary">React</Badge>
              <Badge bg="primary">TypeScript</Badge>
              <Badge bg="secondary">Node.js</Badge>
              <Badge bg="secondary">Express</Badge>
              <Badge bg="success">Arduino</Badge>
              <Badge bg="success">ESP32</Badge>
              <Badge bg="warning" text="dark">FreeRTOS</Badge>
              <Badge bg="info">Zigbee</Badge>
              <Badge bg="info">LoRa</Badge>
              <Badge bg="dark">Home Assistant</Badge>
            </div>
          </Col>

        </Row>

        {/* Objectif */}
        <Row className="mt-4">
          <Col>
            <p className="text-muted text-center">
              À la recherche d’un <strong>stage / alternance / opportunité</strong>
              en développement web ou IoT.
            </p>
          </Col>
          <DownloadButton
          filePath="/CV_YMAMOU_YASSAR.pdf"
          fileName="CV_YMAMOU_YASSAR.pdf"
          />
        </Row>

      </Container>
    </section>
  );
};

export default About;
