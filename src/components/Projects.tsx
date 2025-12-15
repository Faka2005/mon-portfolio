import { Container, Row, Col, Card, Button } from "react-bootstrap";

const projectsData = [
  {
    title: "Lumnie Learning",
    desc: "Plateforme SaaS d’apprentissage en ligne (en développement).",
    img: "/images/project1.png",
    demo: "https://lumnie-learnig.vercel.app/",
    code: "https://github.com/Faka2005/lumnie-learning",
    slug: "lumnie-learning",
  },
  {
    title: "Campus Center",
    desc: "Application web pour connecter les étudiants (en développement).",
    img: "/images/project2.png",
    demo: "https://campus-centre.vercel.app",
    code: "https://github.com/Faka2005/campus-centre",
    slug: "campus-center",
  },
  {
    title: "Password Manager",
    desc: "Gestionnaire sécurisé de mots de passe (à améliorer).",
    img: "/images/project3.png",
    demo: "https://password-manager.vercel.app",
    code: "https://github.com/Faka2005/password-manager",
    slug: "password-manager",
  },
  {
    title: "Pixhub",
    desc: "Gestionnaire de galerie",
    img: "/images/project4.png",
    demo: "https://pixhub-wine.vercel.app",
    code: "https://github.com/Faka2005/pixhub",
    slug: "pixhub",
  },

];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="bg-black text-light py-5">
      <Container>
        <h2 className="text-center mb-5 fw-bold">Mes Projets</h2>

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

                    <Button href={`/project/${p.slug}`} variant="outline-light">
                      Voir la description
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <style>{`
        .project-card {
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.15);
        }

        .project-img-wrapper {
          height: 220px;
          overflow: hidden;
        }

        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .project-card:hover .project-img {
          transform: scale(1.06);
        }

        .buttons-wrapper {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
      `}</style>
    </section>
  );
};

export default Projects;
