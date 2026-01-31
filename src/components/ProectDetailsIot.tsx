// ProjectDetailsIoT.tsx
import { useParams, Link } from "react-router-dom";
import { Container, Badge, Card, Button } from "react-bootstrap";
import { projectsIoT } from "../data/ProjetDataIoT";
import CodeSnippet from "../components/CodeSnippet";

const ProjectDetailsIoT = () => {
  const { name } = useParams();
  const project = projectsIoT[name as keyof typeof projectsIoT];

  if (!project)
    return (
      <Container className="text-light py-5">
        <h1>Projet introuvable</h1>
        <Link to="/#projects" className="btn btn-light mt-3">
          Retour
        </Link>
      </Container>
    );

  return (
    <section className="bg-dark text-light py-5 min-vh-100">
      <Container>
        <Link to="/#projects" className="btn btn-outline-light mb-4">
          ← Retour aux projets
        </Link>

        {/* ===== Titre et description ===== */}
        <h1 className="fw-bold mb-3">{project.title}</h1>
        <p className="fs-5 text-muted">{project.description}</p>

        {/* ===== Image ===== */}
        <div className="text-center mb-4">
          <Card className="mb-4 shadow">
            <Card.Body>
              <h4>Schéma / diagramme</h4>
              <div className="text-center my-3">
          <img
            src={project.img}
            alt={project.title}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px" }}
          />
              </div>
              {project.imageDesc && (
                <p className="text-muted">{project.imageDesc}</p>
              )}
            </Card.Body>
          </Card>
        </div>

        {/* ===== Technologies ===== */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, i) => (
            <Badge key={i} bg="secondary">
              {tech.toUpperCase()}
            </Badge>
          ))}
        </div>

        {/* ===== Objectif ===== */}
        {project.objective && (
          <Card className="mb-4 shadow">
            <Card.Body>
              <h4>Objectif du projet</h4>
              <p>{project.objective}</p>
            </Card.Body>
          </Card>
        )}

 

        {/* ===== Points clés ===== */}
        {project.keyPoints && project.keyPoints.length > 0 && (
          <Card className="mb-4 shadow">
            <Card.Body>
              <h4>Points clés</h4>
              <ul>
                {project.keyPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        )}

        {/* ===== Bouts de code ===== */}
        {project.code && (
          <Card className="mb-4 shadow">
            <Card.Body>
              <h4>Code source</h4>
              <Button
                href={project.code}
                target="_blank"
                variant="outline-light"
                size="sm"
                className="mb-3"
              >
                Voir le code complet
              </Button>

{/* ===== Bouts de code ===== */}
{project.codeSnippets && (
  <Card className="mb-4 shadow">
    <Card.Body>
      <h4>Extraits de code</h4>

      {Object.entries(project.codeSnippets).map(([label, snippet], i) => (
        <div key={i} className="mb-3">
          <h5 className="text-info">{label}</h5>
          <CodeSnippet code={snippet} />
        </div>
      ))}
    </Card.Body>
  </Card>
)}

            </Card.Body>
          </Card>
        )}

        {/* ===== Bouton Demo ===== */}
        {project.demo && (
          <div className="d-flex justify-content-center mt-3">
            <Button
              href={project.demo}
              target="_blank"
              variant="primary"
              size="lg"
            >
              Voir le projet
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default ProjectDetailsIoT;
