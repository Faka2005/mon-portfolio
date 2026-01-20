import React from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProjectXbee: React.FC = () => {
  return (
    <Container className="text-light py-5">
      
      {/* Retour */}
      <Link to="/#projects" className="btn btn-outline-light mb-4">
        ← Retour aux projets
      </Link>

      {/* Titre */}
      <h1 className="fw-bold mb-3">
        Carte de communication XBee
      </h1>

      <p className="text-muted">
        Projet IoT / électronique – communication sans fil
      </p>

      {/* Technologies */}
      <div className="mb-4">
        <Badge bg="secondary" className="me-2">XBee</Badge>
        <Badge bg="secondary" className="me-2">ESP-32</Badge>
        <Badge bg="secondary" className="me-2">UART</Badge>
        <Badge bg="secondary" className="me-2">RF</Badge>
        <Badge bg="secondary">Électronique</Badge>
      </div>

      <Row className="gy-5">

        {/* Description */}
        <Col md={6}>
          <h3>Objectif du projet</h3>
          <p>
            Concevoir une carte électronique permettant la communication
            sans fil entre deux systèmes embarqués à l’aide de modules XBee.
          </p>

          <p>
            Le projet met l’accent sur la transmission de données,
            la configuration des modules radio et la fiabilité de la communication.
          </p>

          <h3 className="mt-4">Fonctionnement</h3>
          <ul>
            <li>Communication série UART entre Arduino et XBee</li>
            <li>Transmission de données point à point</li>
            <li>Tests de portée et de stabilité</li>
            <li>Analyse du signal reçu</li>
          </ul>
        </Col>

        {/* Schéma */}
        <Col md={6}>
          <h3>Schéma de principe</h3>

          {/* IMAGE DU SCHÉMA */}
          <div className="bg-dark p-3 rounded border text-center">
            <img
              src="/images/lora.png"
              alt="Schéma communication XBee"
              className="img-fluid rounded"
            />
          </div>

          <p className="text-muted mt-2">
            Schéma de communication entre deux modules XBee via UART
          </p>
        </Col>

        {/* Détails techniques */}
        <Col md={12}>
          <h3>Détails techniques</h3>
          <ul>
            <li>Configuration des modules XBee (baudrate, mode transparent)</li>
            <li>Connexion RX / TX avec microcontrôleur</li>
            <li>Gestion des messages envoyés / reçus</li>
            <li>Tests en environnement réel</li>
          </ul>
        </Col>

        {/* Limites */}
        <Col md={12}>
          <h3>Limites & améliorations possibles</h3>
          <ul>
            <li>Ajout d’un protocole de communication structuré</li>
            <li>Gestion des erreurs et accusés de réception</li>
            <li>Intégration avec une plateforme domotique</li>
          </ul>
        </Col>

        {/* Code */}
        <Col md={12}>
          <h3>Code source</h3>
          <p className="text-muted">
            Le code source original n’a pas été conservé.  
            Le projet était principalement orienté sur la conception matérielle
            et la communication radio.
          </p>
        </Col>

      </Row>
    </Container>
  );
};

export default ProjectXbee;
