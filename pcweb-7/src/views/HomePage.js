import { useEffect, useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

export default function HomePage() {
  const [stats, setStats] = useState([]);
  const navigate = useNavigate();

  async function getDetails() {
    const query = await getDocs(collection(db, "stats"));
    const mystats = query.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });
    setStats(mystats);
  }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">Health with me (lite)</Navbar.Brand>
          <Nav>
            <Nav.Link href="/scan">Scan</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/history">View History</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/stat/:id">edit stats</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
      </Container>
    </>
  );
}
