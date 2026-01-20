import { useState,useEffect } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CodeSnippet from "../CodeSnippet";
const ProjectXbeeLCD = () => {
    const [code, setCode] = useState<string>("");
  
  useEffect(() => {
    fetch("/code_project/LCD.c")
      .then((res) => res.text())
      .then((text) => setCode(text))
      .catch((err) => console.error("Erreur chargement code :", err));
  }, []);

  const uartCode = `
if (UART1_Data_Ready()) {
  uart_rd = UART1_Read();
  Lcd_Cmd(_LCD_CLEAR);
  Lcd_Out(1,1,"Donnees recues:");
  UART1_Write(uart_rd);
  Lcd_Chr(2,1,uart_rd);
}
`;

  const boutonCode = `
if (PORTD.F0 == 1) {
  Delay_ms(20);
  if (PORTD.F0 == 1) {
    press_time = 0;

    while (PORTD.F0 == 1) {
      Delay_ms(100);
      press_time += 100;

      if (press_time >= HOLD_TIME) {
        UART1_Write_Text(messages[message_index-1]);
        UART1_Write(10);
        UART1_Write(13);
        break;
      }
    }
  }
}
`;

  const lcdInitCode = `
Lcd_Init();
Lcd_Cmd(_LCD_CLEAR);
Lcd_Cmd(_LCD_CURSOR_OFF);
Lcd_Out(1,1," AFFICHAGE DE ");
Lcd_Out(2,1," DONNEES XBEE ");
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
              Communication XBee avec affichage LCD
            </h1>
            <p className="text-muted fs-5">
              Projet de communication série UART entre un microcontrôleur PIC
              et un module XBee avec affichage des données sur écran LCD.
            </p>

            <div className="d-flex flex-wrap gap-2">
              <Badge bg="info">XBee</Badge>
              <Badge bg="success">UART</Badge>
              <Badge bg="secondary">PIC</Badge>
              <Badge bg="warning" text="dark">LCD 16x2</Badge>
              <Badge bg="dark">MikroC</Badge>
            </div>
          </Col>
        </Row>

        {/* ===== Objectif ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Objectif du projet</h4>
            <p>
              Mettre en place une communication sans fil via XBee afin
              de transmettre des données UART depuis un microcontrôleur,
              les afficher sur un écran LCD et permettre l’envoi de messages
              prédéfinis à l’aide d’un bouton.
            </p>
          </Card.Body>
        </Card>

        {/* ===== Schéma ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Schéma de principe</h4>

            <div className="text-center my-4">
              <img
                src="/images/xbee_lcd.png"
                alt="Schéma XBee LCD PIC"
                className="img-fluid rounded border"
                style={{ maxHeight: "420px" }}
              />
            </div>

            <p className="text-muted">
              Le module XBee communique avec le PIC via UART.
              Les données reçues sont affichées sur un écran LCD 16x2.
              Un bouton permet de faire défiler et envoyer des messages prédéfinis.
            </p>
          </Card.Body>
        </Card>

        {/* ===== UART ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Réception des données UART</h4>
            <CodeSnippet code={uartCode} />
            <p>
              Les données reçues via le module XBee sont lues sur l’UART,
              renvoyées vers l’émetteur et affichées en temps réel sur le LCD.
            </p>
          </Card.Body>
        </Card>

        {/* ===== Bouton ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Gestion du bouton (pression courte / longue)</h4>
            <CodeSnippet code={boutonCode} />
            <p>
              Une pression courte permet de parcourir les messages,
              tandis qu’une pression longue (&gt; 2 secondes) déclenche
              l’envoi du message sélectionné via XBee.
            </p>
          </Card.Body>
        </Card>

        {/* ===== LCD ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Initialisation et affichage LCD</h4>
            <CodeSnippet code={lcdInitCode} />
            <p>
              L’écran LCD est utilisé comme interface utilisateur
              pour afficher l’état du système et les données reçues.
            </p>
          </Card.Body>
        </Card>

        {/* ===== Conclusion ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Ce que démontre ce projet</h4>
            <ul>
              <li>Communication série UART</li>
              <li>Utilisation de modules XBee</li>
              <li>Gestion d’entrées utilisateur</li>
              <li>Affichage temps réel sur LCD</li>
              <li>Programmation embarquée en C (MikroC)</li>
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

export default ProjectXbeeLCD;
