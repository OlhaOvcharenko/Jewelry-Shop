import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBagShopping, faSearch, faCrown, faSignIn, faSignOut} from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllBagProducts } from '../../../redux/bagRedux';
import styles from '../NavBar/NavBar.module.scss';
import { getUser, getUserById } from '../../../redux/usersRedux';

const NavBar = () => {

  const bagItems = useSelector(state => getAllBagProducts(state));
  const user = useSelector(state => getUser(state));
  console.log(user,'user')
  const [numberOfBagItems, setNumberOfBagItems] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  
  useEffect(() => {
    setNumberOfBagItems(bagItems.length);
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); 
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); 
  }, [bagItems]);

  return (
    <Navbar bg="light" data-bs-theme="light" className="pb-0" fixed="top" expand="md">
      <div className={styles.customNavbar}>

        <Row className="align-items-center"> 
          
          <Col className="mx-5" >
            <Nav className={styles.link}>
              <div className={styles.mediaBox}>

                {user && user.user !== null ? (
                  <>
                    <Nav.Link href="/user" className="px-3">
                      <span className={styles.icon}><FontAwesomeIcon icon={faUser} /></span>
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link href="/login" className="px-3">
                      <span className={styles.icon}><FontAwesomeIcon icon={faSignIn} /></span>
                    </Nav.Link>
                  </>
                )}

                <Nav.Link as={Link} to="/bag" className="px-3">
                  <span className={styles.icon}><FontAwesomeIcon icon={faBagShopping} /></span>
                  {numberOfBagItems > 0 && <span className={styles.badge}>{numberOfBagItems}</span>}
                </Nav.Link>
                <Nav.Link href="/search" className="px-3">
                  <span className={styles.icon}><FontAwesomeIcon icon={faSearch} /></span>
                </Nav.Link>
              </div>
            </Nav>
          </Col>

          <Col className="d-flex justify-content-end">
            <Navbar.Brand href="/">
              <span className={styles.brand}>
                {isMobileView ? 'RJ' : 'RoyalJewels'}
                <FontAwesomeIcon icon={faCrown} className="px-2" />
              </span>
            </Navbar.Brand>
          </Col>

          <Col className="d-flex justify-content-end">
            <Navbar.Toggle aria-controls="mobile-menu" />
            <Navbar.Collapse id="mobile-menu">
              <Nav className="mx-5">
                <Nav.Link href="/"><span className={styles.link}>Home</span></Nav.Link>

                <div className={styles.dropdown}>
                  <Nav.Link href="/products"><span className={styles.link}>Catalogue</span></Nav.Link>
                    <div className={styles.dropdownContent}>
                      <div  className={styles.block}>
                        <h5 className={styles.blockTitle}>Categories</h5>
                        <a href="#" >Rings</a>
                        <a href="#">Bracelets</a>
                        <a href="#" >Pendants</a>
                        <a href="#">Earrings</a>
                      </div>
                      <div className={styles.block}>
                        <h5 className={styles.blockTitle}>Collections</h5>
                        <a href="#" >Top Seller</a>
                        <a href="#">New collection</a>
                        <a href="#" >Spring</a>
                      </div>
                    </div>
                </div>
                <Nav.Link href="/about"><span className={styles.link}>About</span></Nav.Link>
             </Nav>
           </Navbar.Collapse>
         </Col>
        </Row>
      </div>
    </Navbar>
  );
};

export default NavBar;