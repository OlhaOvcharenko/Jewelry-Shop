import { Col, Container } from "react-bootstrap";
import styles from "../LogInForm/LogInForm.module.scss"
import { Form, Alert} from "react-bootstrap";
import Button from "../../common/Button/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getRequests, loginRequest } from "../../../redux/usersRedux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import BreadCrambSection from "../../common/Breadcramb/Breadcramb";

const LogInForm = () => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const requests = useSelector(getRequests);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginRequest({ email, password }));
  };


  return (
    <div>
      <BreadCrambSection title='ACCOUNT' link='Home'/>
      <Container>
        <div className={styles.loginBox}>
          {(requests && requests['app/user/LOGIN_REQUEST']?.success) ? (
            <Alert variant="success" className="text-center">
              <Alert.Heading>Success!</Alert.Heading>
              <p>You have been logged in!</p>
              <Link to="/" className={styles.headerLink}><b>Continue shopping</b></Link> /
              <Link to="/user" className={styles.headerLink}><b>Open my account</b></Link> 
            </Alert>
          ) : (
            <>
              {(requests && requests['app/user/LOGIN_REQUEST']?.error) && (
                <Alert variant="danger">
                  <Alert.Heading>Something went wrong...</Alert.Heading>
                  <p>Unexpected error, try again!</p>
                  <Link to="/login" className={styles.headerLink}><b>Back to login</b></Link>
                </Alert>
              )}
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
            </>
          )}
        </div>
      </Container>
    </div>
  )
};
  
export default LogInForm;