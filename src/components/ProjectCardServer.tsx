// src/components/ProjectCardServer.tsx
import { Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  img?: string;
  technologies: string[];
  demo?: string;
  code?: string;
}

const ProjectCardServer: React.FC<ProjectCardProps> = ({
  slug,
  title,
  description,
  img,
  technologies,
  demo,
  code,
}) => {
  return (
    <Card className="bg-black text-light border-0 h-100 shadow-lg project-card">
      {img && (
        <Card.Img
          variant="top"
          src={img}
          alt={title}
          className="rounded-top project-image"
        />
      )}
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center fw-bold mb-3">{title}</Card.Title>
        <Card.Text className="text-center text-muted mb-4">{description}</Card.Text>

        {/* Technologies */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          {technologies.map((tech, i) => (
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

        {/* Boutons */}
        <div className="d-flex justify-content-center gap-2 mt-auto flex-wrap">
          {demo && (
            <Button href={demo} target="_blank" variant="primary" size="sm">
              Voir le projet
            </Button>
          )}
          {code && (
            <Button href={code} target="_blank" variant="outline-light" size="sm">
              Voir le code
            </Button>
          )}
          <Link to={`/projects/server/${slug}`} className="btn btn-outline-info btn-sm">
            Détails
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProjectCardServer;
