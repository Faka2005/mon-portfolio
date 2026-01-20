import { useState,useEffect} from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import CodeSnippet from "../CodeSnippet";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ProjectZigbee = () => {

  const [code, setCode] = useState<string>("");

useEffect(() => {
  fetch("/code_project/code_sauvegarde_ecran_button.c")
    .then((res) => res.text())
    .then((text) => setCode(text))
    .catch((err) => console.error("Erreur chargement code :", err));
}, []);



    const debounceCode = `
int Bouton_appuyer(int button) {
    if (gpio_get_level(button) == 1) {
        vTaskDelay(pdMS_TO_TICKS(50));
        if (gpio_get_level(button) == 1) {
            while (gpio_get_level(button) == 1) {
                vTaskDelay(pdMS_TO_TICKS(10));
            }
            return 1;
        }
    }
    return 0;
}
`;
const multi = `
xTaskCreate(button_choix_plus_task, "choix+", 4096, NULL, 10, NULL);
xTaskCreate(button_vitesse_plus_task, "vitesse+", 4096, NULL, 10, NULL);
`;


const ecran = `
ior_epaper_draw_filled_rectangle(device, 70, 50, 270, 70, UNCOLORED);
iot_epaper_draw_string(device, 70, 50, Mode[mode_index], &epaper_font_16, COLORED);
`;





  return (
    <section className="bg-dark text-light py-5 min-vh-100">
      <Container className="max-w-5xl">
        <Link to="/#projects" className="btn btn-outline-light mb-4">
      ← Retour à l'acceuil
    </Link>
        {/* ===== Titre ===== */}
        <Row className="mb-5">
          <Col>
            <h1 className="fw-bold">
              Climatisation domotique – Zigbee & Home Assistant
            </h1>
            <p className="text-muted fs-5">
              Projet embarqué combinant ESP32, interface ePaper et intégration domotique via Zigbee.
            </p>

            <div className="d-flex flex-wrap gap-2 mt-3">
              <Badge bg="primary">ESP32</Badge>
              <Badge bg="secondary">FreeRTOS</Badge>
              <Badge bg="info">Zigbee</Badge>
              <Badge bg="success">Home Assistant</Badge>
              <Badge bg="warning" text="dark">ePaper</Badge>
            </div>
          </Col>
        </Row>

        {/* ===== Objectif ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Objectif du projet</h4>
            <p>
              Concevoir un système de climatisation domotique permettant de sélectionner
              un mode de fonctionnement et une vitesse via des boutons physiques,
              avec affichage local sur écran ePaper et supervision à distance
              grâce à Home Assistant via Zigbee.
            </p>
          </Card.Body>
        </Card>

        {/* ===== Architecture technique ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Architecture technique</h4>
            <ul>
              <li>ESP32 exécutant FreeRTOS</li>
              <li>Écran ePaper pour l’interface utilisateur locale</li>
              <li>Boutons physiques (choix du mode et vitesse)</li>
              <li>Communication Zigbee</li>
              <li>Supervision et automatisations via Home Assistant</li>
            </ul>
          </Card.Body>
        </Card>

        {/* ===== Schéma ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Schéma d’architecture</h4>

            <div className="text-center my-4">
              <img
                src="/images/Zigbee.png"
                alt="Schéma architecture climatisation domotique Zigbee"
                className="img-fluid rounded border"
                style={{ maxHeight: "420px" }}
              />
            </div>

            <p className="text-muted">
              Le schéma montre les interactions entre l’ESP32, les entrées physiques,
              l’affichage ePaper et l’intégration domotique via Zigbee vers Home Assistant.
            </p>
          </Card.Body>
        </Card>

        {/* ===== Extrait code – Anti-rebond ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Gestion des boutons (anti-rebond)</h4>

  
                <CodeSnippet  code={debounceCode}  />

            <p>
              Cette fonction implémente un anti-rebond logiciel afin d’éviter les
              déclenchements multiples causés par les oscillations mécaniques des boutons.
            </p>
          </Card.Body>
        </Card>

        {/* ===== Extrait code – FreeRTOS ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Multitâche avec FreeRTOS</h4>

        <CodeSnippet code={multi}/>

            <p>
              Chaque bouton est géré par une tâche indépendante,
              garantissant une excellente réactivité et une séparation claire des responsabilités.
            </p>
          </Card.Body>
        </Card>

        {/* ===== Extrait code – ePaper ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4>Optimisation de l’affichage ePaper</h4>

            <CodeSnippet code={ecran}/>

            <p>
              Seule la zone modifiée de l’écran est rafraîchie, ce qui réduit
              la consommation énergétique et améliore les performances.
            </p>
          </Card.Body>
        </Card>



        {/* ===== Conclusion ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Ce que démontre ce projet</h4>
            <ul>
              <li>Programmation embarquée avec FreeRTOS</li>
              <li>Gestion multitâche temps réel</li>
              <li>Interaction matériel / logiciel</li>
              <li>Intégration domotique via Zigbee</li>
              <li>Vision système complète (IoT)</li>
            </ul>
          </Card.Body>
        </Card>

                {/* ===== Code complet ===== */}
        <Card className="mb-4 shadow">
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

export default ProjectZigbee;
