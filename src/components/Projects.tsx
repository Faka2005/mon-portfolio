import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../css/projets.css";
import { projectsData } from "../data/ProjectDataWeb";
import { projectsIoTData } from "../data/ProjetDataIoT";

const Projects: React.FC = () => {
  return (
    <section id="projects" className="projects-section">
      <Container>
        {/* --- Titre Général --- */}
        <h1 className="section-title text-center mb-5">Mes Projets</h1>

        {/* --- PROJETS WEB --- */}
        <h2 className="subsection-title mb-4">Projets Web</h2>
        <Row className="g-4">
          {projectsData.map((p, index) => (
            <Col md={4} sm={6} xs={12} key={index}>
              <Card className="project-card">
                <div className="project-img-wrapper">
                  <Card.Img src={p.img} className="project-img" />
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold neon-text">{p.title}</Card.Title>
                  <Card.Text className="project-desc">{p.desc}</Card.Text>
                  <div className="buttons-wrapper">
                    {p.demo && <Button href={p.demo} target="_blank" variant="primary">
                      Voir le projet
                    </Button>}
                    {p.code && <Button href={p.code} target="_blank" variant="outline-light">
                      Voir le code
                    </Button>}
                    <Button href={`/project/web/${p.slug}`} variant="outline-light">
                      Description
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* --- PROJETS IOT --- */}
        <h2 className="subsection-title mt-5 mb-4">Projets IoT & Électronique</h2>
        <Row className="g-4">
          {projectsIoTData.map((p, index) => (
            <Col md={4} sm={6} xs={12} key={index}>
              <Card className="project-card">
                <div className="project-img-wrapper">
                  <Card.Img src={p.img} className="project-img" />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold neon-text">{p.title}</Card.Title>
                  <Card.Text className="project-desc">{p.desc}</Card.Text>
                  <div className="buttons-wrapper mt-3">
                    <Button href={`/project/iot/${p.slug}`} variant="outline-light">
                      Description
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>



  
      </Container>
    </section>
  );
};

export default Projects;
