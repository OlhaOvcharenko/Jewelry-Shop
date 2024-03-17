import { Navbar, Row, Col} from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import styles from "../NavBar/NavBar.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faBagShopping, faCrown } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <Navbar bg="light" data-bs-theme="light" className="pb-0" fixed="top">

      <div className={styles.customNavbar}>

        <Row className="align-items-center" >

           <Col  className="mx-5">
            <Nav className={styles.link} >
              <Nav.Link href="#user" className="px-3" >
                <FontAwesomeIcon icon={faUser} />
              </Nav.Link>
              <Nav.Link href="#cart" className="px-3" >
                <FontAwesomeIcon icon={faBagShopping} />
              </Nav.Link>
              <Nav.Link href="#search" className="px-3" >
                <FontAwesomeIcon icon={faSearch} />
              </Nav.Link>
            </Nav>
          </Col>

          <Col className="d-flex justify-content-end">
            <Navbar.Brand href="#home">
              <span className={styles.brand}>RoyalJewels
              <FontAwesomeIcon icon={faCrown} className="px-2" />
              </span>
            </Navbar.Brand>
          </Col>
           
           <Col className="d-flex justify-content-end">
            <Nav className="mx-5">
              <Nav.Link href="#home"className="px-3" ><span className={styles.link}>Home</span></Nav.Link>
              <Nav.Link href="#features" className="px-3" ><span className={styles.link}>Catalogue</span></Nav.Link>
              <Nav.Link href="#pricing" className="px-3" ><span className={styles.link}>Pages</span></Nav.Link>
            </Nav>
          </Col>
        </Row>

     </div>
    </Navbar>
  )
};
    
  export default NavBar;