import React, { useEffect, useState } from "react";
import { Card, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../firebase";
import { signOut } from "firebase/auth";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

export default function StatPage() {
  const [time,setTime] = useState("");
  const [iron, setIron] = useState("");
  const [protein, setProtein] = useState("");
  const [water, setWater] = useState("");
  const [lactate, setLactate] = useState("")
  const params = useParams();
  const id = params.id;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();


  async function deleteDetails(id) {
    await deleteDoc(doc(db, "stats", id));
    navigate("/");
  }

  async function getDetails(id) {
    const postDocument = await getDoc(doc(db, "stats"), { iron, protein, water, lactate, time })
    const post = postDocument.data();
    setTime(post.time)
    setIron(post.iron)
    setLactate(post.lactate)
    setWater(post.water)
    setProtein(post.protein)
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getDetails(id);
  }, [id, navigate, user, loading]);

  return (
    <>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">Health with me (lite)</Navbar.Brand>
          <Nav>
            <Nav.Link href="/scan">Scan</Nav.Link>
            <Nav.Link onClick={(e) => signOut(auth)}>🚪</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Row style={{ marginTop: "2rem" }}>
          <Col md="6">
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Link href={`/update/${id}`}>Edit</Card.Link>
                <Card.Link
                  onClick={() => deleteDetails(id)}
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}