import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Container,
  Stack,
} from "react-bootstrap";
import { create as ipfsHttpClient } from "ipfs-http-client";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

function renderSoldItems(items) {
  return (
    <>
      <h2>Hello</h2>
      {/* <Row xs={1} md={2} lg={4} className="g-4 py-3">
        {items.map((item, idx) => (
          <Col key={idx} className="overflow-hidden">
            <Card>
              <Card.Img variant="top" src={item.image} />
              <Card.Footer>
                For {ethers.utils.formatEther(item.totalPrice)} ETH - Recieved {ethers.utils.formatEther(item.price)} ETH
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row> */}
    </>
  );
}

export default function MyListedItems({
  marketplace,
  nft,
  account,
  dIDcontract,
  signer,
}) {
  ///////////// newer logic
  // new logic
  const [stakeError, setStakeError] = useState("");
  const [stakeSuccess, setStakeSuccess] = useState("");
  const [transactionData, settransactionData] = useState("");
  const [regNo, setRegno] = useState(null);
  const [Name, setNamee] = useState("");
  const [department, setDepartment] = useState("");
  const [walet, setWallet] = useState("");
  const [docName, setDocName] = useState("");
  const [docLink, setDocLink] = useState("");

  const stakeCACHandler = async () => {
    setStakeError("");
    setStakeSuccess("");
    try {
      const stakeContractWSigner = dIDcontract.connect(signer);
      const resp = await stakeContractWSigner.approve(walet);
      console.log(resp);
      settransactionData(resp.hash);
      setStakeSuccess(`Student successfully Approved here`);
    } catch (e) {
      console.log("Error: " + e);
      setStakeError(e.message);
    }
  };

  const revokeCACHandler = async () => {
    setStakeError("");
    setStakeSuccess("");
    try {
      const revokeContractWSigner = dIDcontract.connect(signer);
      const resp = await revokeContractWSigner.revokeApprove(walet);
      console.log(resp);
      // console.log(signer);
      settransactionData(resp.hash);
      setStakeSuccess(`Student approval successfully revoked here`);
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
      const resp = await profileContractWSigner.mint(Name, regNo, department);
      console.log(resp);
      settransactionData(resp.hash);
      setStakeSuccess(`Student successfully created at here`);
    } catch (e) {
      console.log("Error: " + e);
      setStakeError(e.message);
    }
  };

  const docCACHandler = async () => {
    setStakeError("");
    setStakeSuccess("");
    try {
      const docContractWSigner = dIDcontract.connect(signer);
      const resp = await docContractWSigner.createProfile(
        walet,
        docName,
        docLink
      );
      console.log(resp);
      settransactionData(resp.hash);
      setStakeSuccess(`Student Document successfully created here`);
    } catch (e) {
      console.log("Error: " + e);
      setStakeError(e.message);
    }
  };

  //////////// old logic
  const [loading, setLoading] = useState(false);
  const [listedItems, setListedItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
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
  };
  const loadListedItems = async () => {
    // Load all sold items that the user listed
    const itemCount = await marketplace.itemCount();
    let listedItems = [];
    let soldItems = [];
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await marketplace.items(indx);
      if (i.seller.toLowerCase() === account) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId);
        // define listed item object
        let item = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };
        listedItems.push(item);
        // Add listed item to sold items array if sold
        if (i.sold) soldItems.push(item);
      }
    }
    setLoading(false);
    setListedItems(listedItems);
    setSoldItems(soldItems);
  };
  useEffect(() => {
    loadListedItems();
  }, []);
  if (loading)
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Loading...</h2>
      </main>
    );
  return (
    <div className="flex justify-center">
      {/* {listedItems.length > 0 ? (
        <div className="px-5 py-3 container">
          <h2>Listed</h2>
          <Row xs={1} md={2} lg={4} className="g-4 py-3">
            {listedItems.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Footer>
                    {ethers.utils.formatEther(item.totalPrice)} ETH
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          {soldItems.length > 0 && renderSoldItems(soldItems)}
        </div>
      ) : ( */}
      <Container className="mt-4">
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
                    onChange={(e) => setWallet(e.target.value)}
                    size="lg"
                    required
                    type="text"
                    placeholder="input student address "
                  />
                  <div className="d-grid px-0">
                    <Button
                      onClick={stakeCACHandler}
                      variant="success"
                      size="lg"
                    >
                      Approve Student
                    </Button>

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
                  </div>

                  <Form.Control
                    onChange={(e) => setWallet(e.target.value)}
                    size="lg"
                    required
                    type="text"
                    placeholder="input student address "
                  />
                  <div className="d-grid px-0">
                    <Button
                      onClick={revokeCACHandler}
                      variant="success"
                      size="lg"
                    >
                      Revoke Student Approval
                    </Button>
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
              <div className="content mx-auto mt-5">
                <Row className="g-4">
                  <Form.Control
                    onChange={(e) => setNamee(e.target.value)}
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
                      onClick={profileCACHandler}
                      variant="success"
                      size="lg"
                    >
                      Create Student
                    </Button>
                  </div>
                </Row>
              </div>
            </main>
          </div>
          <div className="row mt-5">
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
                    <Button onClick={docCACHandler} variant="success" size="lg">
                      ADD DOCUMENT
                    </Button>
                  </div>
                </Row>
              </div>
            </main>
          </div>
        </Stack>
      </Container>
    </div>
  );
}
