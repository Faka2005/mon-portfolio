import { useState ,useEffect} from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import CodeSnippet from "../CodeSnippet";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
const ProjectChronometre = () => {
    const [code, setCode] = useState<string>("");
  
  useEffect(() => {
    fetch("/code_project/chrono-afficheurs.c")
      .then((res) => res.text())
      .then((text) => setCode(text))
      .catch((err) => console.error("Erreur chargement code :", err));
  }, []);

  const multiplexageCode = `
if (millis() - dernierTemps >= intervalleMultiplexage) {
  dernierTemps = millis();

  chiffreUnites = compteur % 10;
  chiffreDizaines = compteur / 10;

  if (afficherUnites) {
    Choisir_Transistors(chiffreUnites, AFF1_U);
  } else {
    Choisir_Transistors(chiffreDizaines, AFF2_D);
  }
  afficherUnites = !afficherUnites;
}
`;

  const boutonCode = `
bool Pressed_Start() {
  return digitalRead(BTN_start) == HIGH;
}

bool Pressed_Reset() {
  return digitalRead(BTN_restart) == HIGH;
}
`;

  const affichageCode = `
void Choisir_Transistors(int chiffre, int afficheur) {
  digitalWrite(AFF1_U, LOW);
  digitalWrite(AFF2_D, LOW);

  afficherChiffre(chiffre);
  digitalWrite(afficheur, HIGH);
}
`;

  return (
    <section className="bg-dark text-light py-5 min-vh-100">
      <Container>

        <Link to="/#projects" className="btn btn-outline-light mb-4">
          ← Retour aux projets
        </Link>

        {/* ===== Titre ===== */}
        <Row className="mb-4">
          <Col>
            <h1 className="fw-bold">
              Chronomètre Arduino – Multiplexage d’afficheurs 7 segments
            </h1>
            <p className="text-muted fs-5">
              Projet électronique embarqué utilisant Arduino Uno, multiplexage,
              transistors et boutons de commande.
            </p>

            <div className="d-flex flex-wrap gap-2">
              <Badge bg="success">Arduino Uno</Badge>
              <Badge bg="warning" text="dark">Électronique</Badge>
              <Badge bg="info">Multiplexage</Badge>
              <Badge bg="secondary">Afficheurs 7 segments</Badge>
            </div>
          </Col>
        </Row>

        {/* ===== Objectif ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Objectif du projet</h4>
            <p>
              Concevoir un chronomètre capable d’afficher des valeurs de 0 à 99
              sur deux afficheurs 7 segments en utilisant une technique de
              multiplexage afin de réduire le nombre de broches utilisées.
            </p>
          </Card.Body>
        </Card>

        {/* ===== Schéma ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Schéma électronique</h4>

            <div className="text-center my-4">
              <img
                src="/images/chronomètre.png"
                alt="Schéma chronomètre Arduino multiplexé"
                className="img-fluid rounded border"
                style={{ maxHeight: "450px" }}
              />
            </div>

            <p className="text-muted">
              Le schéma montre l’Arduino Uno connecté aux afficheurs 7 segments
              via des transistors permettant la commutation rapide des dizaines
              et des unités, ainsi que les boutons de contrôle.
            </p>
          </Card.Body>
        </Card>

        {/* ===== Multiplexage ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Multiplexage des afficheurs</h4>
            <CodeSnippet code={multiplexageCode} />
            <p>
              Le multiplexage permet d’alterner rapidement l’affichage entre les
              unités et les dizaines toutes les quelques millisecondes,
              donnant l’illusion d’un affichage simultané.
            </p>
          </Card.Body>
        </Card>

        {/* ===== Boutons ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Gestion des boutons</h4>
            <CodeSnippet code={boutonCode} />
            <p>
              Les boutons permettent de démarrer, arrêter ou réinitialiser le
              chronomètre. La logique est volontairement simple et robuste.
            </p>
          </Card.Body>
        </Card>

        {/* ===== Affichage ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Pilotage des afficheurs</h4>
            <CodeSnippet code={affichageCode} />
            <p>
              Les transistors permettent d’activer un seul afficheur à la fois
              tout en partageant les lignes des segments.
            </p>
          </Card.Body>
        </Card>

        {/* ===== Conclusion ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Ce que démontre ce projet</h4>
            <ul>
              <li>Compréhension du multiplexage matériel</li>
              <li>Gestion du temps sans interruption bloquante</li>
              <li>Interaction logiciel / électronique</li>
              <li>Lecture et commande de composants physiques</li>
            </ul>
          </Card.Body>
        </Card>

        {/* ===== Code complet ===== */}
        <Card className="shadow">
          <Card.Body>
            <h4> Code complet</h4>
                         <pre className="bg-black text-light p-3 rounded small overflow-auto" style={{ maxHeight: "500px" }}>
                      <SyntaxHighlighter language="c" style={oneDark}>
        {code}
      </SyntaxHighlighter>
              </pre>
          </Card.Body>
        </Card>

      </Container>
    </section>
  );
};

export default ProjectChronometre;
