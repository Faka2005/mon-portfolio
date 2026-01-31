import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import CodeSnippet from "../components/CodeSnippet";
import { useState ,useEffect} from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import DownloadButton from "./BouttonDownload";
const ProjectServerScript = () => {
      const [code, setCode] = useState<string>("");
    
  useEffect(() => {
    fetch("/code_project/script.sh")
      .then((res) => res.text())
      .then((text) => setCode(text))
      .catch((err) => console.error("Erreur chargement code :", err));
  }, []);

  const utilsCode = `
apt_silent_update() {
  sudo apt update -qq > /dev/null 2>&1
}

apt_silent_install() {
  sudo apt install -qq -y "$1" > /dev/null 2>&1
}
`;

  const sambaCode = `
install_samba() {
  apt_silent_install "samba"
  groupadd "$group_name"
  usermod -aG "$group_name" "$user_name"
  smbpasswd -a "$user_name"
}
`;

  const menuCode = `
while true; do
  echo "1) Installer Samba"
  echo "2) Installer WireGuard"
  read choice

  case $choice in
    1) install_samba ;;
    2) install_wireguard ;;
  esac
done
`;

  return (
    <section className="bg-dark text-light py-5 min-vh-100">
      <Container>

        <Link to="/#projects" className="btn btn-outline-light mb-4">
          ← Retour aux projets
        </Link>

        {/* ===== Titre ===== */}
        <Row className="mb-4">
          <Col>
            <h1 className="fw-bold">
              Script d’installation automatisée serveur Ubuntu
            </h1>
            <p className="text-muted fs-5">
              Script Bash interactif permettant l’installation et la
              configuration complète d’un environnement serveur et
              développement.
            </p>

            <div className="d-flex flex-wrap gap-2">
              <Badge bg="success">Bash</Badge>
              <Badge bg="info">Linux</Badge>
              <Badge bg="secondary">DevOps</Badge>
              <Badge bg="warning" text="dark">Automation</Badge>
              <Badge bg="dark">Ubuntu</Badge>
            </div>
          </Col>
        </Row>

        {/* ===== Contexte ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Contexte du projet</h4>
            <p>
              Ce script a été conçu pour automatiser l’installation
              et la configuration d’un serveur Ubuntu ainsi que
              d’un environnement de développement complet.
            </p>
            <p>
              Il est destiné à être utilisé après une installation
              fraîche du système afin de gagner du temps, réduire
              les erreurs humaines et standardiser les setups.
            </p>
          </Card.Body>
        </Card>

        {/* ===== Architecture ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Architecture du script</h4>
            <ul>
              <li>Fonctions utilitaires (apt, entrées utilisateur)</li>
              <li>Fonctions d’installation par service</li>
              <li>Gestion des utilisateurs et groupes</li>
              <li>Menu interactif en boucle</li>
            </ul>
          </Card.Body>
        </Card>

        {/* ===== Fonctions utilitaires ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Fonctions utilitaires</h4>
            <CodeSnippet code={utilsCode} language="bash" />
            <p>
              Ces fonctions permettent d’exécuter les mises à jour
              et installations de paquets de manière silencieuse,
              améliorant la lisibilité et la robustesse du script.
            </p>
          </Card.Body>
        </Card>

        {/* ===== Samba ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Installation et configuration Samba</h4>
            <CodeSnippet code={sambaCode} language="bash" />
            <p>
              Le script automatise la création des groupes, utilisateurs
              Samba, les permissions des dossiers et la configuration
              du partage réseau.
            </p>
          </Card.Body>
        </Card>

        {/* ===== Services réseau ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Services réseau</h4>
            <ul>
              <li><strong>WireGuard</strong> : VPN sécurisé</li>
              <li><strong>Tailscale</strong> : VPN mesh simplifié</li>
              <li><strong>Net-tools</strong> : diagnostic réseau</li>
            </ul>
            <p>
              Chaque service dispose de sa propre fonction,
              facilitant la maintenance et l’extension du script.
            </p>
          </Card.Body>
        </Card>

        {/* ===== Environnement dev ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Environnement de développement</h4>
            <ul>
              <li>Node.js / npm</li>
              <li>Python / pip</li>
              <li>Go</li>
              <li>React / TypeScript / React Native</li>
              <li>Flutter</li>
              <li>Android Studio</li>
              <li>VirtualBox</li>
            </ul>
            <p>
              Le script permet de transformer un serveur ou un poste
              Linux en machine de développement complète.
            </p>
          </Card.Body>
        </Card>

        {/* ===== Menu ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Menu interactif</h4>
            <CodeSnippet code={menuCode} language="bash" />
            <p>
              Le menu principal permet à l’utilisateur de choisir
              dynamiquement les services à installer sans modifier
              le script.
            </p>
          </Card.Body>
        </Card>

        {/* ===== Ce que ça démontre ===== */}
        <Card className="mb-4 shadow">
          <Card.Body>
            <h4> Compétences démontrées</h4>
            <ul>
              <li>Scripting Bash avancé</li>
              <li>Automatisation Linux</li>
              <li>Gestion des utilisateurs et permissions</li>
              <li>Réseaux et VPN</li>
              <li>Organisation modulaire du code</li>
            </ul>
          </Card.Body>
        </Card>

        {/* ===== Code complet ===== */}
        <Card className="shadow">
          <Card.Body>
            <DownloadButton 
  filePath="/code_project/script.sh" 
  fileName="script.sh" 
  name="Télécharger le script"
/>

            <h4> Code complet</h4>

                         <pre className="bg-black text-light p-3 rounded small overflow-auto" style={{ maxHeight: "500px" }}>
                      <SyntaxHighlighter language="bash" style={oneDark}>
        {code}
      </SyntaxHighlighter>
              </pre>
          </Card.Body>
        </Card>

      </Container>
    </section>
  );
};

export default ProjectServerScript;
