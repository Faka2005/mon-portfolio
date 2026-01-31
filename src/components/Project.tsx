// src/components/ProjectDetails.tsx
import { useParams, Link } from "react-router-dom";
import { Container, Badge, Button } from "react-bootstrap";
import CodeSnippet from "./CodeSnippet";

// Données
import { projectsWeb } from "../data/ProjectDataWeb";
import { projectsIoT } from "../data/ProjetDataIoT";

type ProjectCategory = "web" | "iot" | "server";

interface ProjectData {
  title: string;
  description: string;
  img?: string | null;
  technologies: string[];
  demo?: string | null;
  code?: string | null;
  objective?: string;
  diagram?: string | null;
  diagramDesc?: string;
  keyPoints?: string[];
  codeSnippets?: Record<string, string>;
}

const ProjectDetails = () => {
  const { category, name } = useParams<{ category: ProjectCategory; name: string }>();

  // Sélection du bon projet selon la catégorie
  let project: ProjectData | undefined;
  if (category === "web") project = projectsWeb[name as keyof typeof projectsWeb];
  else if (category === "iot") project = projectsIoT[name as keyof typeof projectsIoT];

  if (!project) {
    return (
      <Container className="text-light py-5">
        <h1>Projet introuvable</h1>
        <Link to="/" className="btn btn-light mt-3">Retour</Link>
      </Container>
    );
  }

  return (
    <section className="bg-dark text-light py-5 min-vh-100">
      <Container>
        <Link to="/#projects" className="btn btn-outline-light mb-4">← Retour à l'accueil</Link>

        {/* Titre et description */}
        <h1 className="fw-bold mb-3">{project.title}</h1>
        <p className="text-muted fs-5">{project.description}</p>

        {/* Image */}
        {project.img && <img src={project.img} alt={project.title} className="img-fluid rounded mb-4" />}

        {/* Objectif */}
        {project.objective && (
          <>
            <h4>Objectif</h4>
            <p>{project.objective}</p>
          </>
        )}

        {/* Technologies */}
        {project.technologies?.length > 0 && (
          <>
            <h4>Technologies utilisées</h4>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <Badge key={i} bg="secondary">{tech.toUpperCase()}</Badge>
              ))}
            </div>
          </>
        )}

        {/* Diagramme */}
        {project.diagram && (
          <>
            <h4>Diagramme / Schéma</h4>
            <div className="text-center mb-4">
              <img src={project.diagram} alt={project.diagramDesc} className="img-fluid rounded border" />
              {project.diagramDesc && <p className="text-muted mt-2">{project.diagramDesc}</p>}
            </div>
          </>
        )}



        {/* Code Snippets */}
        {project.codeSnippets && (
          <>
            <h4>Extraits de code</h4>
            {Object.entries(project.codeSnippets).map(([label, code], i) => (
              <div key={i} className="mb-4">
                <h5>{label.charAt(0).toUpperCase() + label.slice(1)}</h5>
                <CodeSnippet code={code} language={category === "web" ? "tsx" : "c"} />
              </div>
            ))}
          </>
        )}

        {/* Liens */}
        <div className="d-flex gap-3 mt-4">
          {project.demo && <Button href={project.demo} target="_blank" variant="primary">Voir le projet</Button>}
          {project.code && (
            <Button href={project.code} target="_blank" variant="outline-light">
              Voir le code
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
};

export default ProjectDetails;
