import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      message: { value: string };
    };

    const data = {
      name: target.name.value,
      email: target.email.value,
      message: target.message.value,
    };

    try {
      const res = await fetch("https://email-portfolio-stb8.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        target.name.value = "";
        target.email.value = "";
        target.message.value = "";
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-5 bg-dark text-light">
      <Container style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4 fw-bold">Me Contacter</h2>
        {status === "success" && <Alert variant="success">Message envoyé !</Alert>}
        {status === "error" && <Alert variant="danger">Erreur lors de l'envoi</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" name="name" placeholder="Votre nom" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" placeholder="Votre email" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={4} name="message" required />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Envoyer
          </Button>
        </Form>
      </Container>
    </section>
  );
}
