import { Container, Row, Col, Card, Button } from "react-bootstrap";
const Projects: React.FC = () => {
  return (
    <section id="projects" className="bg-black text-light py-5">
      <Container>
        <h2 className="text-center mb-5">Mes Projets</h2>

        <Row className="g-4">
          {/* --- Projet 1 --- */}
          <Col md={4} sm={6} xs={12}>
            <Card bg="dark" text="light" className="shadow-lg h-100">
              <Card.Img variant="top" src="/images/project1.png" />
              <Card.Body>
                <Card.Title>Lumnie Learning</Card.Title>
                <Card.Text>
                  Plateforme SaaS d’apprentissage en ligne (en développement).
                </Card.Text>
                <Button
                  href="https://lumnie-learning.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                >
                  Voir le site
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* --- Projet 2 --- */}
          <Col md={4} sm={6} xs={12}>
            <Card bg="dark" text="light" className="shadow-lg h-100">
              <Card.Img variant="top" src="/images/project2.png" />
              <Card.Body>
                <Card.Title>Campus Center</Card.Title>
                <Card.Text>
                  Application web pour connecter les étudiants (en développement).
                </Card.Text>
                <Button
                  href="https://campus-centre.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                >
                  Voir le site
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* --- Projet 3 --- */}
          <Col md={4} sm={6} xs={12}>
            <Card bg="dark" text="light" className="shadow-lg h-100">
              <Card.Img variant="top" src="/images/project3.png" />
              <Card.Body>
                <Card.Title>Password Manager</Card.Title>
                <Card.Text>
                  Gestionnaire sécurisé de mots de passe développé en autonomie.
                </Card.Text>
                <Button
                  href="https://password-manager.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                >
                  Voir le site
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* --- Projet Script Bash --- */}
          <Col md={4} sm={6} xs={12}>
            <Card bg="dark" text="light" className="shadow-lg h-100">
              <Card.Img variant="top" src="/images/project3.png" />
              <Card.Body>
                <Card.Title>Script Bash</Card.Title>
                <Card.Text>
                  Script Bash permettant d’installer automatiquement des outils sur Linux.
                </Card.Text>
                <Button
                  href="/script"
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                >
                  Voir le site
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Projects;
