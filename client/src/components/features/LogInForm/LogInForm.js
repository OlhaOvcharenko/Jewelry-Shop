import { Col, Container } from "react-bootstrap";
import styles from "../LogInForm/LogInForm.module.scss"
import { Form, Row} from "react-bootstrap";
import Button from "../../common/Button/Button";
import { Link } from "react-router-dom";

const LogInForm = () => (
    <div>
      <div className={styles.accountHeader}>
        <h1 className={styles.accountTitle}>ACCOUNT</h1>
        <p>Home / Account</p>
      </div>
      <Container>
        <div className={styles.loginBox}>
          
          <Col lg={6} >
            <Form className={styles.border}>
              <Form.Group className="mb-3">
                <Form.Label  className="text-muted">Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label  className="text-muted">Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button className={styles.btn}>
                Login
              </Button>
            </Form>
            <Link to="/register" className={styles.link}>Create account</Link>
            <Link to="/" className={styles.link}>Return to store</Link>
          </Col>
        </div>
      </Container>
    </div>
);
  
export default LogInForm;