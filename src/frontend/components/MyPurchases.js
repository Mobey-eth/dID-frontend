import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  Row,
  Col,
  Card,
  Container,
  Button,
  Image,
  Form,
} from "react-bootstrap";
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

  const viewCAC = async () => {
    // setStakeError("");
    // setStakeSuccess("");
    try {
      const stakeContractWSigner = dIDcontract.connect(signer);
      const resp = await stakeContractWSigner.listProfiles(walet);
      console.log(resp);
      console.log(account);
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
          {/* <div className="mt-5">
            <Form.Control
              onChange={(e) => setWallet(e.target.value)}
              size="lg"
              required
              type="text"
              placeholder="input student address "
            />
            <div className="d-grid px-0">
              <Button onClick={viewCAC} variant="success" size="lg">
                View Information
              </Button>
            </div>
          </div> */}
        </Row>
      </Container>
    </div>
  );
}

/*

confirmation of admission - 
https://gateway.pinata.cloud/ipfs/QmVcD17t1kmhRd2YsXNxX9fXBpEg9m2Us85NcjKXGtSUk4 

student profile - 
https://gateway.pinata.cloud/ipfs/QmQfEHPL85Kp4ExshMUagwxYRdjfKy3sVk3RPyQJEcnrFW 

Dept - receipt = 
https://gateway.pinata.cloud/ipfs/QmQkmHQwGxQ1rsZtQGsie6tpYUi12TWnYKRwoN9ZkH8hAH 

*/
