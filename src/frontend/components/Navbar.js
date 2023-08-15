import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

const Navigation = ({ web3Handler, account }) => {
  return (
    <Navbar expand="lg" bg="success" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img src="https://upload.wikimedia.org/wikipedia/en/1/16/FUTO_logo.png" width="40" height="40" className="" alt="" />
          &nbsp; DECENTRALIZED ID
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/create">
              Create{" "}
            </Nav.Link>
            <Nav.Link as={Link} to="/my-listed-items">
              Admin
            </Nav.Link>
            <Nav.Link as={Link} to="/my-purchases">
              My Documents
            </Nav.Link>
          </Nav>
          <Nav>
            {account ? (
              <Nav.Link
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
                className="button nav-button btn-sm mx-4"
              >
                <Button variant="outline-light">
                  {account.slice(0, 5) + "..." + account.slice(38, 42)}
                </Button>
              </Nav.Link>
            ) : (
              <Button onClick={web3Handler} variant="outline-light">
                Connect Wallet
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
