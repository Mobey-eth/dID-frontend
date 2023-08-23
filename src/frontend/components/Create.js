import { useState } from "react";
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

const Create = ({ marketplace, nft, dIDcontract, signer }) => {
  /*
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== "undefined") {
      try {
        const result = await client.add(file);
        console.log(result);
        setImage(`https://ipfs.infura.io/ipfs/${result.path}`);
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
  };
  const createNFT = async () => {
    if (!image || !price || !name || !description) return;
    try {
      const result = await client.add(
        JSON.stringify({ image, price, name, description })
      );
      mintThenList(result);
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  };
  const mintThenList = async (result) => {
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`;
    // mint nft
    await (await nft.mint(uri)).wait();
    // get tokenId of new nft
    const id = await nft.tokenCount();
    // approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait();
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString());
    await (await marketplace.makeItem(nft.address, id, listingPrice)).wait();
  }; */
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

  const stakeCACHandler = async () => {
    setStakeError("");
    setStakeSuccess("");
    try {
      // let name = "Olalomi Suleiman";
      // let regno = "2017100100";
      // let dept = "EEE";

      // tokenAmount = tokenAmount.toString();
      // TO SET APPROVE FIRST
      // const tokenContractWSigner = cTokenContract.connect(signer);
      // const respZero = await tokenContractWSigner.approve(
      //   StakeAddy,
      //   tokenAmount
      // );
      // console.log(respZero);
      // create student

      const stakeContractWSigner = dIDcontract.connect(signer);
      const resp = await stakeContractWSigner.mint(Name, regNo, department);
      console.log(resp);
      settransactionData(resp.hash);
      setStakeSuccess(
        `Student successfully created at\n https://mumbai.polygonscan.com/tx/${transactionData}`
      );
    } catch (e) {
      console.log("Error: " + e);
      setStakeError(e.message);
    }
  };

  const profileCACHandler = async () => {
    setStakeError("");
    setStakeSuccess("");
    try {
      // let name = "Olalomi Suleiman";
      // let regno = "2017100100";
      // let dept = "EEE";

      // tokenAmount = tokenAmount.toString();
      // TO SET APPROVE FIRST
      // const tokenContractWSigner = cTokenContract.connect(signer);
      // const respZero = await tokenContractWSigner.approve(
      //   StakeAddy,
      //   tokenAmount
      // );
      // console.log(respZero);
      // create student

      const profileContractWSigner = dIDcontract.connect(signer);
      const resp = await profileContractWSigner.createProfile(
        walet,
        docName,
        docLink
      );
      console.log(resp);
      settransactionData(resp.hash);
      setStakeSuccess(
        `Student Document successfully created at \n https://mumbai.polygonscan.com/tx/${transactionData}`
      );
    } catch (e) {
      console.log("Error: " + e);
      setStakeError(e.message);
    }
  };
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
                      <div className="mt-5">
                        {stakeError && (
                          <div className="withdraw-error">{stakeError}</div>
                        )}
                        {stakeSuccess && (
                          <div className="withdraw-success">{stakeSuccess}</div>
                        )}{" "}
                      </div>
                    </Row>
                  </div>
                </main>
              </div>
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
                          Create Student Profile
                        </Button>
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
