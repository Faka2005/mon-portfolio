import { useParams, Link } from "react-router-dom";
import { Container, Button, Badge } from "react-bootstrap";
import { projectsWeb } from "../data/ProjectDataWeb";

const ProjectDetails = () => {
  const { name } = useParams();
  const project = projectsWeb[name as keyof typeof projectsWeb];

  if (!project)
    return (
      <Container className="text-light py-5">
        <h1>Projet introuvable</h1>
        <Link to="/" className="btn btn-light mt-3">
          Retour
        </Link>
      </Container>
    );

  return (
   <section className="bg-black text-light py-5 min-vh-100">
  <Container>
    <Link to="/#projects" className="btn btn-outline-light mb-4">
      ← Retour à l'acceuil
    </Link>

    <div className="project-card mx-auto">
      <h1 className="fw-bold mb-3 text-center"><strong>{project.title}</strong>{project.title}</h1>

      <img
        src={project.img}
        alt={project.title}
        className="img-fluid rounded-4 shadow-lg mb-4 project-image"
      />

      <p className="fs-5 text-center text-muted">
        {project.description}
      </p>

      <h4 className="mt-4 text-center">Technologies utilisées</h4>

      <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
        {project.technologies.map((tech, i) => (
          <Badge key={i} className="tech-badge">
            <img
              src={`/logos/${tech}.png`}
              alt={tech}
              className="tech-icon"
            />
            <span>{tech.toUpperCase()}</span>
          </Badge>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-3 mt-5">
        <Button href={project.demo} target="_blank" variant="primary" size="lg">
          Voir le projet
        </Button>
        <Button href={project.code} target="_blank" variant="outline-light" size="lg">
          Voir le code
        </Button>
      </div>
    </div>
  </Container>
</section>

  );
};

export default ProjectDetails;
