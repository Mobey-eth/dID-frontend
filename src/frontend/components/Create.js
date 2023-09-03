import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  Row,
  Form,
  Button,
  Col,
  Container,
  Image,
  Stack,
} from "react-bootstrap";
import img from "./green.jpg";
import { create as ipfsHttpClient } from "ipfs-http-client";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const Create = ({ marketplace, nft, dIDcontract, signer, account }) => {
  // new logic
  const [stakeError, setStakeError] = useState("");
  const [stakeSuccess, setStakeSuccess] = useState("");
  const [transactionData, settransactionData] = useState("");
  const [regNo, setRegno] = useState(null);
  const [Name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [walet, setWallet] = useState("");
  const [docName, setDocName] = useState("");
  const [docLink, setDocLink] = useState("");
  const [studentData, setStudentData] = useState("");
  const [isStudent, setIsStudent] = useState("");

  const stakeCACHandler = async () => {
    setStakeError("");
    setStakeSuccess("");
    try {
      const stakeContractWSigner = dIDcontract.connect(signer);
      const resp = await stakeContractWSigner.mint(Name, regNo, department);
      console.log(resp);
      settransactionData(resp.hash);
      setStakeSuccess(`Student successfully created here`);
    } catch (e) {
      console.log("Error: " + e);
      setStakeError(e.message);
    }
  };

  const profileCACHandler = async () => {
    setStakeError("");
    setStakeSuccess("");
    try {
      const profileContractWSigner = dIDcontract.connect(signer);
      const resp = await profileContractWSigner.createProfile(
        walet,
        docName,
        docLink
      );
      const reciept = await resp.wait();
      settransactionData(reciept.transactionHash);
      setStakeSuccess(`Student Document successfully created here`);
    } catch (e) {
      console.log("Error: " + e);
      setStakeError(e.message);
    }
  };

  const getStudentData = async () => {
    try {
      const getStudentWSigner = dIDcontract.connect(signer);
      const hasStudent = await getStudentWSigner.hasStudent(account);
      const getStudent = await getStudentWSigner.getStudent(account);

      setStudentData(getStudent);
      setIsStudent(hasStudent);
      //console.log(getStudent);
      // console.log(account);
      // console.log(hasStudent);
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  const logStudentInfo = () => {
    if (isStudent) {
      console.log(studentData.name);
      console.log(studentData.regNo.toString());
      console.log(studentData.department);
    }
  };

  useEffect(() => {
    getStudentData();
    //logStudentInfo();
  }, [studentData, account]);

  return (
    <div className="">
      <Row className="m-2">
        <Col xs={6} md={4}>
          <Image
            src="./green.jpg"
            rounded
            style={{ width: "100%", height: "100%" }}
          />
        </Col>
        <Col className="mt-4">
          <Container>
            <Stack gap={3}>
              {/* changes here */}
              {isStudent ? ( // Conditionally render the student info if isStudent is true
                <div>
                  <h3>Student Information</h3>
                  <p>
                    <strong>Name:</strong> {studentData.name}
                  </p>
                  <p>
                    <strong>Registration Number:</strong>{" "}
                    {studentData.regNo.toString()}
                  </p>
                  <p>
                    <strong>Department:</strong> {studentData.department}
                  </p>
                </div>
              ) : (
                <div className="row">
                  <main
                    role="main"
                    className="col-lg-12 mx-auto"
                    style={{ maxWidth: "1000px" }}
                  >
                    <div className="content mx-auto">
                      <Row className="g-4">
                        <Form.Control
                          onChange={(e) => setName(e.target.value)}
                          size="lg"
                          required
                          type="text"
                          placeholder="Name"
                        />
                        <Form.Control
                          onChange={(e) => setDepartment(e.target.value)}
                          size="lg"
                          required
                          type="text"
                          placeholder="Department"
                        />
                        <Form.Control
                          onChange={(e) => setRegno(e.target.value)}
                          size="lg"
                          required
                          type="number"
                          placeholder="Registration Number"
                        />
                        <div className="d-grid px-0">
                          <Button
                            onClick={stakeCACHandler}
                            size="lg"
                            variant="outline-success"
                          >
                            Create Student ID
                          </Button>
                        </div>
                      </Row>
                    </div>
                  </main>
                </div>
              )}

              <div className="row">
                <main
                  role="main"
                  className="col-lg-12 mx-auto"
                  style={{ maxWidth: "1000px" }}
                >
                  <div className="content mx-auto">
                    <Row className="g-4">
                      <Form.Control
                        onChange={(e) => setWallet(e.target.value)}
                        size="lg"
                        required
                        type="text"
                        placeholder="Wallet Address"
                      />
                      <Form.Control
                        onChange={(e) => setDocName(e.target.value)}
                        size="lg"
                        required
                        type="text"
                        placeholder="Document Name"
                      />
                      <Form.Control
                        onChange={(e) => setDocLink(e.target.value)}
                        size="lg"
                        required
                        type="text"
                        placeholder="Document Link"
                      />
                      <div className="d-grid px-0">
                        <Button
                          onClick={profileCACHandler}
                          variant="success"
                          size="lg"
                        >
                          ADD DOCUMENT
                        </Button>
                      </div>
                      <div className="mt-5">
                        {stakeError && (
                          <div className="withdraw-error">{stakeError}</div>
                        )}
                        {stakeSuccess && (
                          <div className="withdraw-success">
                            <a
                              href={`https://mumbai.polygonscan.com/tx/${transactionData}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {stakeSuccess}
                            </a>
                          </div>
                        )}{" "}
                      </div>
                    </Row>
                  </div>
                </main>
              </div>
            </Stack>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default Create;
