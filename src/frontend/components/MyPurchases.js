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
  const [walet, setWallet] = useState("");
  const [documentLinks, setDocumentLinks] = useState([]);

  const viewCAC = async () => {
    try {
      const stakeContractWSigner = dIDcontract.connect(signer);
      const documentCount = await stakeContractWSigner.studentProfileCount(
        account
      );
      const documentLinks = await stakeContractWSigner.listProfiles(account);
      setDocumentLinks(documentLinks);
      console.log(`This is docList : ${documentLinks}`);
      console.log(`This is my docCount ${documentCount}`);
    } catch (e) {
      console.log("Error fetching documents: " + e);
    }
  };

  useEffect(() => {
    viewCAC();
  }, []); // Fetch documents when the component mounts

  // Helper function to get title and description based on index
  const getDocumentInfo = (index) => {
    switch (index) {
      case 0:
        return { title: "Bio Data", description: "Student Bio Data." };
      case 1:
        return {
          title: "Admission Confirmation",
          description: "Some quick example text to build on the card title.",
        };
      case 2:
        return {
          title: "School Fees Receipt",
          description: "Another example description here.",
        };
      default:
        return { title: "Document", description: "Document description." };
    }
  };

  return (
    <div className="flex justify-center">
      <Container className="mt-4">
        <Row>
          {documentLinks.length > 0 ? (
            documentLinks.map((link, index) => {
              const { title, description } = getDocumentInfo(index);
              return (
                <Col key={index}>
                  <Card style={{ width: "20rem" }} border="success">
                    <Card.Img variant="top" src={link} />
                    <Card.Body>
                      <Card.Title>{title}</Card.Title>
                      <Card.Text>{description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <Col>
              <Card style={{ width: "20rem" }} border="info">
                <Card.Body>
                  <Card.Title>No Documents Uploaded Yet</Card.Title>
                  <Card.Text>
                    Upload your documents to view them here.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
        <div className="mt-5">
          <div className="d-grid px-0">
            <Button onClick={viewCAC} variant="success" size="lg">
              Refresh Documents
            </Button>
          </div>
        </div>
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
