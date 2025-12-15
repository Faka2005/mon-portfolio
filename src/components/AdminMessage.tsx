import { useEffect, useState } from "react";
import { Container, Table, Badge } from "react-bootstrap";

type Message = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch("https://email-portfolio-stb8.onrender.com/contact/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(console.error);
  }, []);

  return (
    <section className="py-5 bg-light" style={{ minHeight: "100vh" }}>
      <Container>
        <h2 className="mb-4 text-center">Messages reçus</h2>

        <div style={{ maxHeight: "70vh", overflowY: "auto", border: "1px solid #ddd", borderRadius: "8px" }}>
          <Table striped bordered hover responsive className="mb-0">
            <thead className="table-dark position-sticky top-0">
              <tr>
                <th style={{ width: "15%" }}>Nom</th>
                <th style={{ width: "20%" }}>Email</th>
                <th>Message</th>
                <th style={{ width: "20%" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-muted py-3">
                    Aucun message reçu
                  </td>
                </tr>
              ) : (
                messages.map((m) => (
                  <tr key={m._id}>
                    <td>{m.name}</td>
                    <td>
                      <Badge bg="info" text="dark" style={{ fontSize: "0.9em" }}>
                        {m.email}
                      </Badge>
                    </td>
                    <td style={{ whiteSpace: "pre-wrap" }}>{m.message}</td>
                    <td>{new Date(m.createdAt).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </section>
  );
}
