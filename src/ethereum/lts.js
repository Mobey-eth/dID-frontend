import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Row, Col, Card, Container, Button, Image } from "react-bootstrap";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";

export default function MyPurchases({ dIDcontract, signer, account }) {
  // const [stakeError, setStakeError] = useState("");
  // const [stakeSuccess, setStakeSuccess] = useState("");
  // const [transactionData, settransactionData] = useState("");
  // const [docName, setDocName] = useState("");
  // const [docLink, setDocLink] = useState("");
  const [walet, setWallet] = useState("");

  const stakeCACHandler = async () => {
    setStakeError("");
    setStakeSuccess("");
    try {
      const stakeContractWSigner = dIDcontract.connect(signer);
      const resp = await stakeContractWSigner.listProfiles(walet);
      console.log(resp);
    } catch (e) {
      console.log("Error: " + e);
    }
  };
  return (
    <div className="flex justify-center">
      <Container className="mt-4">
        <Row>
          <Col>
            <Card style={{ width: "20rem" }} border="success">
              <Card.Img variant="top" src={image1} />
              <Card.Body>
                <Card.Title>Bio Data</Card.Title>
                <Card.Text>Student Bio Data.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "20rem" }} border="success">
              <Card.Img variant="top" src={image2} />
              <Card.Body>
                <Card.Title>Admission Confirmation</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "20rem" }} border="success">
              <Card.Img variant="top" src={image3} />
              <Card.Body>
                <Card.Title>School Fees Recipt</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
