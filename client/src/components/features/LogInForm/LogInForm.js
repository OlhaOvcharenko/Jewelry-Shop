import { Col, Container } from "react-bootstrap";
import styles from "../LogInForm/LogInForm.module.scss"
import { Form, Alert, Spinner} from "react-bootstrap";
import Button from "../../common/Button/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { loginRequest } from "../../../redux/usersRedux";
import { useDispatch } from "react-redux";


const LogInForm = () => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null)


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginRequest({ email, password }));
  };


  return (
    <div>
      <div className={styles.accountHeader}>
        <h1 className={styles.accountTitle}>ACCOUNT</h1>
        <Link to="/"  className={styles.headerLink}><b>Home</b></Link> /
        <Link to="/account" className={styles.headerLink}><b>Account</b></Link>
      </div>
      <Container>
        <div className={styles.loginBox}>
          {(status === "success" || status === "serverError" || status === "clientError" || status === "loginError" || status === "loading") ? (
            <>
              {status === "success" && (
                <Alert variant="success" className="text-center">
                  <Alert.Heading>Success!</Alert.Heading>
                  <p>Your account has been created.</p>
                  <Link to="/" className={styles.headerLink}><b>Continue shopping</b></Link> 
                </Alert>
              )}
              {status === "serverError" && (
                <Alert variant="danger">
                  <Alert.Heading>Something went wrong...</Alert.Heading>
                  <p>Unexpected error, try again!</p>
                  <Link to="/login" className={styles.headerLink}><b>Back to login</b></Link>
                </Alert>
              )}
              {status === "clientError" && (
                <Alert variant="danger">
                  <Alert.Heading>Not enough data</Alert.Heading>
                  <p>You have to fill all the fields</p>
                  <Link to="/register" className={styles.headerLink}><b>Back to registration</b></Link>
                </Alert>
              )}
              {status === "loginError" && (
                <Alert variant="warning">
                  <Alert.Heading>Login already in use</Alert.Heading>
                  <p>You have to use another login</p>
                  <Link to="/register" className={styles.headerLink}><b>Back to registration</b></Link>
                </Alert>
              )}
              {status === "loading" && (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </>
          ) : (
            <Col lg={6}>
              <Form className={styles.border} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted">Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-muted">Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button className={styles.btn} type="submit">
                  Login
                </Button>
              </Form>
              <Link to="/register" className={styles.link}><b>Create account</b></Link> /
              <Link to="/products" className={styles.link}><b>Return to store</b></Link>
            </Col>
          )}
        </div>
      </Container>
    </div>
  )
};
  
export default LogInForm;