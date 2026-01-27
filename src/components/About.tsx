
import '../css/about.css';
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DownloadButton from "./BouttonDownload";

const skills = 
  [
    { name: "React", icon: "/logos/react.png" },
    { name: "TypeScript", icon: "/logos/ts.png" },
    { name: "JavaScript", icon: "/logos/js.png" },
    { name: "HTML", icon: "/logos/html.png" },
    { name: "CSS", icon: "/logos/css.png" },
    {name:'Php',icon:"/logos/php.png"},

    { name: "Node.js", icon: "/logos/node.png" },
    { name: "Express", icon: "/logos/express.png" },
    { name: "Sql", icon: "/logos/sql.png" },
    { name: "MongoDB", icon: "/logos/mongo.png" },
    { name: "PostgreSQL", icon: "/logos/postgresql.png" },
    {name:'Bash',icon:"/logos/bash.png"},
        {name:'Kotlin',icon:"/logos/kotlin.png"},
    {name:'Go',icon:"/logos/go.png"},
        {name:'C',icon:"/logos/c.png"},

    { name: "Arduino", icon: "/logos/arduino.jpeg" },
    { name: "ESP32", icon: "/logos/esp32.png" },
    
    { name: "Zigbee", icon: "/logos/zigbee.png" },
    { name: "LoRa", icon: "/logos/lora.png" },
    { name: "Home Assistant", icon: "/logos/home-assistant.png" },
  ];
const About: React.FC = () => {
  return (
    <section id="about" className="bg-dark text-light py-5">
      <Container>

<Row className="align-items-start">

{/* Partie gauche : À propos */}
<Col md={6}>
  <h2 className="fw-bold mb-4">À propos de moi</h2>

  <p className="fs-5">
    Étudiant en <strong>informatique et électronique</strong>, orienté
    <strong> développement web</strong> et
    <strong> systèmes embarqués / IoT</strong>.
  </p>

  <p>
    Je développe des applications web modernes ainsi que des projets
    électroniques intégrant microcontrôleurs, communications sans fil
    et supervision domotique.
  </p>

  <p>
    Mon objectif est de concevoir des solutions complètes, du matériel
    jusqu’à l’interface utilisateur.
  </p>

  <h2 className="fw-bold mb-4">Forces</h2>
  <ul className="fs-5">
    <li><strong>Polyvalence :</strong> Capacité à travailler à la fois sur le développement logiciel et les projets électroniques.</li>
    <li><strong>Apprentissage rapide :</strong> Toujours à jour avec les nouvelles technologies et frameworks.</li>
    <li><strong>Résolution de problèmes :</strong> Aptitude à analyser et trouver des solutions efficaces dans des projets complexes.</li>
    <li><strong>Collaboration :</strong> Bon esprit d’équipe et communication claire avec les collègues et mentors.</li>
    <li><strong>Curiosité technique :</strong> Passion pour l’IoT, les systèmes embarqués et les technologies web modernes.</li>
  </ul>
</Col>


  {/* Partie droite : Compétences */}
  <Col md={6}>
    <h4 className="fw-bold mb-3 text-center">Compétences</h4>

    <Row>
      {skills.map((skill) => (
        <Col
          key={skill.name}
          xs={4}   // 3 par ligne sur mobile
          sm={4}
          md={4}   // 3 par ligne sur desktop
          className="mb-3 text-center"
        >
          <div className="skill-card">
            <img src={skill.icon} alt={skill.name} />
            <span>{skill.name}</span>
          </div>
        </Col>
      ))}
    </Row>
  </Col>
</Row>



        {/* Objectif + CV */}
        <Row className="text-center">
          <Col>
            <p color='black' className="text-muted mb-3">
              À la recherche d’un <strong>stage </strong> en
              développement web .
            </p>

            <DownloadButton 
              color='blue'
              filePath="/CV_YMAMOU_YASSAR.pdf"
              fileName="CV_YMAMOU_YASSAR.pdf"
            />
          </Col>
        </Row>

      </Container>
    </section>
  );
};

export default About;

