import styles from "../RegistrationForm/RegistrationForm.module.scss"
import { Container, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "../../common/Button/Button";

const RegistrationForm = () => (
  <div>
    <div className={styles.accountHeader}>
      <h1 className={styles.accountTitle}>Creat Your Account</h1>
      <Link to="/"  className={styles.headerLink}><b>Home</b></Link> / 
      <Link to="/products" className={styles.headerLink}><b>Catalogue</b></Link>
    </div>
    <Container>
      <div className={styles.loginBox}>
        
        <Col lg={6} >
          <Form className={styles.border}>

            <Row className="mb-3" >
              <Form.Group as={Col} lg={6} xs={12} >
                <Form.Label className="text-muted">Name</Form.Label>
                <Form.Control type="text"placeholder="Name" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSurname">
                <Form.Label className="text-muted">Surname</Form.Label>
                <Form.Control type="text" placeholder="Surname" />
              </Form.Group>
            </Row>

            <Row className="mb-3" >
              <Form.Group as={Col} lg={6} xs={12} >
                <Form.Label className="text-muted">Email</Form.Label>
                <Form.Control type="text"placeholder="Email" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSurname">
                <Form.Label className="text-muted">Mobile Phone</Form.Label>
                <Form.Control type="text" placeholder="Mobile Phone" />
              </Form.Group>
            </Row>

            
            <Row className="mb-3" >
              <Form.Group as={Col} lg={6} xs={12} >
                <Form.Label className="text-muted">Country</Form.Label>
                <Form.Control type="text"placeholder="Country" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSurname">
                <Form.Label className="text-muted">City</Form.Label>
                <Form.Control type="text" placeholder="City" />
              </Form.Group>
            </Row>


            <Form.Group className="mb-3">
              <Form.Label  className="text-muted">Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label  className="text-muted">Repeat Password</Form.Label>
              <Form.Control type="password" placeholder="Repeat your password" />
            </Form.Group>
            <Button className={styles.btn}>
              Submit
            </Button>
          </Form>
          <Link to="/register" className={styles.link}><b>Log in</b></Link> /
          <Link to="/products" className={styles.link}><b>Return to store</b></Link>
        </Col>
      </div>
    </Container>
  </div>
);
  
export default RegistrationForm;