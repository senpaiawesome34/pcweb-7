import React, { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { ref, uploadBytes } from "firebase/storage"

export default function ScanPage(){
  const [user, loading] = useAuthState(auth);
  const [time, setTime] = useState("");
  const [iron, setIron] = useState("");
  const [protein, setProtein] = useState("");
  const [water, setWater] = useState("");
  const [lactate, setLactate] = useState("")
  const navigate = useNavigate();

  async function addDetails() {
    await addDoc(collection(db, "stats"), { iron, protein, water, lactate, time });
    navigate("/");
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/scan");
  }, [navigate, user, loading]);

  return (
    <>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">Health with me (lite)</Navbar.Brand>
          <Nav>
            <Nav.Link href="/scan">Scan</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={(e) => signOut(auth)}>🚪</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/history">View History</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Scan</h1>
        <Form>
        <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="text"
              placeholder="8/8/2024 12.11pm"
              value={time}
              onChange={(text) => setTime(text.target.value)}
            />
          </Form.Group>

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

            
          <Button variant="primary" onClick={async (e) => addDetails()
          }>
            Send details
          </Button>
        </Form>
      </Container>
    </>
  );
}