import React, { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function UpdatePage() {
  const params = useParams();
  const id = params.id;
  const [time, setTime] = useState("");
  const [iron, setIron] = useState("");
  const [protein, setProtein] = useState("");
  const [water, setWater] = useState("");
  const [lactate, setLactate] = useState("")
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  async function updatePage(id) {
    await updateDoc(doc(db, "stats"), { iron, protein, water, lactate, time });
    navigate("/")
  }

  async function getDetails(id) {
    const postDocument = await getDoc(doc(db, "stats"), { iron, protein, water, lactate, time });
    const post = postDocument.data();
    setTime(post.time)
    setIron(post.iron)
    setWater(post.water)
    setLactate(post.lactate)
    setProtein(post.protein)
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getDetails(id);
  }, [id, loading, navigate, user]);

  return (
    <div>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/"></Navbar.Brand>
          <Nav>
            <Nav.Link href="/scan"></Nav.Link>
            <Nav.Link onClick={(e) => signOut(auth)}>🚪</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>edit details</h1>
        <Form>
        <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Iron(mmol/L)</Form.Label>
            <Form.Control
              type="number"
              placeholder="7.22"
              value={iron}
              onChange={(text) => setIron(text.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Protein(mmol/L)</Form.Label>
            <Form.Control
              type="number"
              placeholder="5.33"
              value={protein}
              onChange={(text) => setProtein(text.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Water(%)</Form.Label>
            <Form.Control
              type="number"
              placeholder="68.22"
              value={water}
              onChange={(text) => setWater(text.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Blood lactate(mmol/L)</Form.Label>
            <Form.Control
              type="number"
              placeholder="1.69"
              value={lactate}
              onChange={(text) => setLactate(text.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={(e) => updatePage()}>
            Send details
          </Button>
        </Form>
      </Container>
    </div>
  );
}