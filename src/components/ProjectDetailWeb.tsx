import { useParams, Link } from "react-router-dom";
import { Container, Button, Badge, Card } from "react-bootstrap";
import { projectsWeb } from "../data/ProjectDataWeb";

const ProjectDetailsWeb = () => {
  const { name } = useParams();
  const project = projectsWeb[name as keyof typeof projectsWeb];

  if (!project)
    return (
      <Container className="text-light py-5">
        <h1>Projet introuvable</h1>
        <Link to="/#projects" className="btn btn-light mt-3">
          Retour aux projets
        </Link>
      </Container>
    );

  return (
    <section className="bg-black text-light py-5 min-vh-100">
      <Container>
        {/* Retour */}
        <Link to="/#projects" className="btn btn-outline-light mb-4">
          ← Retour aux projets
        </Link>

        {/* Titre */}
        <h1 className="fw-bold mb-3 text-center">{project.title}</h1>

        {/* Image principale */}
        <div className="text-center mb-4">
          <img
            src={project.img}
            alt={project.title}
            className="img-fluid rounded-4 shadow-lg project-image"
            style={{ maxHeight: "400px" }}
          />
        </div>

        {/* Description */}
        <p className="fs-5 text-center text-muted mb-4">{project.description}</p>

        {/* Technologies */}
        <h4 className="text-center">Technologies utilisées</h4>
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-3 mb-5">
          {project.technologies.map((tech, i) => (
            <Badge key={i} className="tech-badge d-flex align-items-center gap-1 px-2 py-1">
              <img src={`/logos/${tech}.png`} alt={tech} className="tech-icon" style={{ height: 20 }} />
              <span>{tech.toUpperCase()}</span>
            </Badge>
          ))}
        </div>

        {/* Objectif */}
        <Card className="mb-4 shadow bg-dark text-light">
          <Card.Body>
            <h4>Objectif du projet</h4>
            <p>{project.objective}</p>
          </Card.Body>
        </Card>

        {/* Diagramme */}
        {project.diagram && (
          <Card className="mb-4 shadow bg-dark text-light">
            <Card.Body>
              <h4>Diagramme / Schéma</h4>
              <div className="text-center my-3">
                <img
                  src={project.diagram}
                  alt={`${project.title} diagram`}
                  className="img-fluid rounded border"
                  style={{ maxHeight: "400px" }}
                />
              </div>
              <p className="text-muted">{project.diagramDesc}</p>
            </Card.Body>
          </Card>
        )}

        {/* Points clés */}
        {project.keyPoints && project.keyPoints.length > 0 && (
          <Card className="mb-4 shadow bg-dark text-light">
            <Card.Body>
              <h4>Ce que ce projet démontre</h4>
              <ul>
                {project.keyPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        )}

        {/* Boutons Demo / Code */}
        <div className="d-flex justify-content-center gap-3 mt-4">
          {project.demo && (
            <Button href={project.demo} target="_blank" variant="primary" size="lg">
              Voir le projet
            </Button>
          )}
          {project.code && (
            <Button href={project.code} target="_blank" variant="outline-light" size="lg">
              Voir le code
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
};

export default ProjectDetailsWeb;
