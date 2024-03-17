import { Navbar, Row, Col} from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import styles from "../NavBar/NavBar.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faBagShopping, faCrown } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container className={styles.customNavbar}>
        <Row className="w-100 align-items-center" >
           <Col>
            <Nav className={styles.link} >
              <Nav.Link href="#user">
                <FontAwesomeIcon icon={faUser} className="mr-4" />
              </Nav.Link>
              <Nav.Link href="#cart">
                <FontAwesomeIcon icon={faBagShopping} className="mr-4" />
              </Nav.Link>
              <Nav.Link href="#search">
                <FontAwesomeIcon icon={faSearch} className="mr-4" />
              </Nav.Link>
            </Nav>
          </Col>

          <Col className="d-flex justify-content-end">
            <Navbar.Brand href="#home">
              <span className={styles.brand}>JEW
              <FontAwesomeIcon icon={faCrown} className="mr-4 px-2" />
              </span>
            </Navbar.Brand>
          </Col>
           
           <Col className="d-flex justify-content-end">
            <Nav className="me-auto">
              <Nav.Link href="#home" ><span className={styles.link}>Home</span></Nav.Link>
              <Nav.Link href="#features"><span className={styles.link}>Catalogue</span></Nav.Link>
              <Nav.Link href="#pricing"><span className={styles.link}>Pages</span></Nav.Link>
            </Nav>
          </Col>

        </Row>
     </Container>
    </Navbar>
  )
};
    
  export default NavBar;