import { useEffect, useState } from "react";
import { Container, Nav, Navbar, Button, Row, Col, Card, } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

export default function HistoryPage() {
  const [stats, setStats] = useState([]);

  async function getDetails() {
    const query = await getDocs(collection(db, "stats"));
    const mystats = query.docs.map((doc) => {
      console.log("doc", doc.data());
      return { id: doc.id, ...doc.data() };
    });
    setStats(mystats);
  }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <Container>
      <Row>
        {stats.map((item, index) => (
          <Col key={index} sm={12} md={6} lg={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Text>Time - {item["time"]}</Card.Text>
                <Card.Text>Iron = {item["iron"]}</Card.Text>
                <Card.Text>Lactate = {item["lactate"]}</Card.Text>
                <Card.Text>Water(%) = {item["water"]}</Card.Text>
                <Card.Text>Protein = {item["protein"]}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
