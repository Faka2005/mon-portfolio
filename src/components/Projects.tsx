import { Container, Row, Col, Card, Button } from "react-bootstrap";
import '../css/projets.css';
import { projectsData } from "../data/ProjectDataWeb";
import { projectsIoTData } from "../data/ProjetDataIoT";
const Projects: React.FC = () => {
  return (<>
    <h1>Mes projets </h1>
    <section id="projects" className="bg-black text-light py-5">
      <Container>
        <h2 className="text-center mb-5 fw-bold">Projets Web</h2>

        <Row className="g-4">
          {projectsData.map((p, index) => (
            <Col md={4} sm={6} xs={12} key={index}>
              <Card className="project-card bg-dark text-light shadow-lg h-100">
                <div className="project-img-wrapper">
                  <Card.Img src={p.img} className="project-img" />
                </div>

                <Card.Body>
                  <Card.Title className="fw-bold">{p.title}</Card.Title>
                  <Card.Text>{p.desc}</Card.Text>

                  <div className="buttons-wrapper">
                    <Button href={p.demo} target="_blank" variant="primary">
                      Voir le projet
                    </Button>

                    <Button href={p.code} target="_blank" variant="outline-light">
                      Voir le code
                    </Button>

                    <Button href={`/project/web/${p.slug}`} variant="outline-light">
                      Voir la description
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

    
    </section>
    <section id="projects-iot" className="bg-black text-light py-5">
      <Container>
        <h2 className="text-center mb-5 fw-bold">Projets IoT & Électronique</h2>

        <Row className="g-4">
          {projectsIoTData.map((p, index) => (
            <Col md={4} sm={6} xs={12} key={index}>
              <Card className="project-card bg-dark text-light shadow-lg h-100">
                
                <div className="project-img-wrapper">
                  <Card.Img src={p.img} className="project-img" />
                </div>

                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">{p.title}</Card.Title>
                  <Card.Text className="flex-grow-1">
                    {p.desc}
                  </Card.Text>

                  <div className="buttons-wrapper mt-3">
                    <Button
                      href={`project/iot/${p.slug}`}
                      variant="outline-light"
                    >
                      Voir la description
                    </Button>
                  </div>
                </Card.Body>

              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
    </>
  );
};

export default Projects;
