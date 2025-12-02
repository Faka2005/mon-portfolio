import { useParams, Link } from "react-router-dom";
import { Container, Button, Badge } from "react-bootstrap";

const projectsData = {
  "lumnie-learning": {
    title: "Lumnie Learning",
    description: "Plateforme SaaS d’apprentissage en ligne.",
    img: "/images/project1.png",
    technologies: ["React", "TypeScript", "Bootstrap"],
    demo: "https://lumnie-learning.vercel.app",
    code: "https://github.com/Faka2005/lumnie-learning",
  },

  "campus-center": {
    title: "Campus Center",
    description: "Application web permettant aux étudiants de communiquer.",
    img: "/images/project2.png",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    demo: "https://campus-centre.vercel.app",
    code: "https://github.com/Faka2005/campus-centre",
  },

  "password-manager": {
    title: "Password Manager",
    description: "Gestionnaire sécurisé de mots de passe.",
    img: "/images/project3.png",
    technologies: ["React", "CryptoJS", "MongoDB"],
    demo: "https://password-manager.vercel.app",
    code: "https://github.com/Faka2005/password-manager",
  },

  "pixhub": {
    title: "Pixhub",
    description: "Galerie photo.",
    img: "/images/project4.png",
    technologies: ["React", "LocalStorage"],
    demo: "https://pixhub-wine.vercel.app",
    code: "https://github.com/Faka2005/pixhub",
  },
};

const ProjectDetails = () => {
  const { name } = useParams();
  const project = projectsData[name as keyof typeof projectsData];

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
    <section className="bg-black text-light py-5">
      <Container>
        <Link to="/" className="btn btn-outline-light mb-4">
          ← Retour aux projets
        </Link>

        <h1 className="fw-bold mb-3">{project.title}</h1>

        <img src={project.img} alt={project.title} className="img-fluid rounded shadow-lg mb-4" />

        <p className="fs-5">{project.description}</p>

        <h4 className="mt-4">Technologies utilisées :</h4>
        <div className="d-flex flex-wrap gap-2 mt-2">
          {project.technologies.map((tech, i) => (
            <Badge bg="secondary" key={i} className="px-3 py-2">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button href={project.demo} target="_blank" variant="primary">
            Voir le projet
          </Button>
          <Button href={project.code} target="_blank" variant="outline-light">
            Voir le code
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default ProjectDetails;
