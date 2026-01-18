import { useParams, Link } from "react-router-dom";
import { Container, Button, Badge } from "react-bootstrap";

const projectsData = {
  "lumnie-learning": {
    title: "Lumnie Learning",
    description: "Lumnie Learning est une plateforme SaaS qui permet aux utilisateurs d’apprendre en ligne grâce à des parcours interactifs. Actuellement en développement, elle vise à offrir une expérience intuitive et personnalisée.",
    img: "/images/project1.png",
    technologies: ["js", "ts"],
    demo: "https://lumnie-learnig.vercel.app/",
    code: "https://github.com/Faka2005/learning",
  },

  "campus-center": {
    title: "Campus Center",
    description: "Application web pour connecter les étudiants et faciliter l’échange d’informations et de ressources. Conçue pour améliorer la collaboration et la vie étudiante.",
    img: "/images/project2.png",
    technologies: ["react", "node", "express", "mongo"],
    demo: "https://campus-centre.vercel.app",
    code: "https://github.com/Faka2005/campus-centre",
  },

  "password-manager": {
    title: "Password Manager",
    description: "Gestionnaire sécurisé de mots de passe permettant de stocker et organiser vos identifiants en toute sécurité. Fonctionnalités en constante amélioration pour garantir la confidentialité.",
    img: "/images/Safekey_entrer.png",
    technologies: ["react", "mongo","express","node"],
    demo: "https://safekey-nine.vercel.app/",
    code: "https://github.com/Faka2005/password-manager",
  },

  "pixhub": {
    title: "Pixhub",
    description: "Gestionnaire de galerie photo moderne, permettant d’organiser, visualiser et partager facilement vos images.",
    img: "/images/project4.png",
    technologies: ["react", "mongo","express","node"],
    demo: "https://pixhub-wine.vercel.app",
    code: "https://github.com/Faka2005/pixhub",
  },
    "serveur-go": {
    title: "Serveur de transfére de fichier",
    description: "Gestionnaire de galerie photo moderne, permettant d’organiser, visualiser et partager facilement vos images.",
    img: "/images/project4.png",
    technologies: ["react", "mongo","express","node"],
    demo: "https://pixhub-wine.vercel.app",
    code: "https://github.com/Faka2005/pixhub",
  },
    "e-commerce": {
    title: "Serveur E-commerce",
    description: "Gestionnaire de galerie photo moderne, permettant d’organiser, visualiser et partager facilement vos images.",
    img: "/images/project4.png",
    technologies: ["react", "mongo","express","node"],
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
   <section className="bg-black text-light py-5 min-vh-100">
  <Container>
    <Link to="/#projects" className="btn btn-outline-light mb-4">
      ← Retour à l'acceuil
    </Link>

    <div className="project-card mx-auto">
      <h1 className="fw-bold mb-3 text-center"><strong>{project.title}</strong></h1>

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
