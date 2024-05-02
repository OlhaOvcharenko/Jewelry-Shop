import styles from "../RegistrationForm/RegistrationForm.module.scss"
import { Container, Col, Form, Row, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "../../common/Button/Button";
import { useState } from "react";
import { API_URL } from "../../../config";

const RegistrationForm = () => {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const [status, setStatus] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    const registrationData = {
      name, surname, email, phone, city, country, password, passwordRepeat: repeatedPassword
    }
  
    console.log(registrationData, 'registrationData');
  
    const options = {
      method: "POST",
      body: JSON.stringify(registrationData), 
      headers: {
        "Content-Type": "application/json" 
      }
    };
    setStatus("loading");
    
    return fetch(`${API_URL}/auth/register`, options)
      .then((res) => {
        if (res.status === 201) {
          setStatus("success");
        } else if (res.status === 400) {
          setStatus("clientError");
        } else if (res.status === 409) {
          setStatus("loginError");
        } else {
          setStatus("serverError");
        }
      })
      .catch((err) => {
        setStatus("serverError");
      });
  };
    

  return (
    <div>
      <div className={styles.accountHeader}>
        <h1 className={styles.accountTitle}>Creat Your Account</h1>
        <Link to="/"  className={styles.headerLink}><b>Home</b></Link> / 
        <Link to="/products" className={styles.headerLink}><b>Catalogue</b></Link>
      </div>

      <Container>
        <div className={styles.loginBox}>
          {(status === "success" || status === "serverError" || status === "clientError" || status === "loginError" || status === "loading") ? (
            <>
              {status === "success" && (
                <Alert variant="success" className="text-center">
                  <Alert.Heading>Success!</Alert.Heading>
                  <p>Your account has been created.</p>
                  <Link to="/" className={styles.headerLink}><b>Home</b></Link> /
                  <Link to="/login" className={styles.headerLink}><b>Log in</b></Link>
                </Alert>
              )}
              {status === "serverError" && (
                <Alert variant="danger">
                  <Alert.Heading>Something went wrong...</Alert.Heading>
                  <p>Unexpected error, try again!</p>
                  <Link to="/register" className={styles.headerLink}><b>Back to registration</b></Link>
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
            <Row>
            <Col lg={6}>
              <Form className={styles.border} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} lg={6} xs={12}>
                    <Form.Label className="text-muted">Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label className="text-muted">Surname</Form.Label>
                    <Form.Control type="text" placeholder="Surname" value={surname} onChange={e => setSurname(e.target.value)} />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} lg={6} xs={12}>
                    <Form.Label className="text-muted">Email</Form.Label>
                    <Form.Control type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label className="text-muted">Phone</Form.Label>
                    <Form.Control type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} lg={6} xs={12}>
                    <Form.Label className="text-muted">Country</Form.Label>
                    <Form.Control type="text" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label className="text-muted">City</Form.Label>
                    <Form.Control type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label className="text-muted">Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label className="text-muted">Repeat Password</Form.Label>
                    <Form.Control type="password" placeholder="Repeat your password" value={repeatedPassword} onChange={e => setRepeatedPassword(e.target.value)} />
                  </Form.Group>
                </Row>
                <Button className={styles.btn} type="submit">Submit</Button>
              </Form>
              <Link to="/register" className={styles.link}><b>Log in</b></Link> /
              <Link to="/products" className={styles.link}><b>Return to store</b></Link>
            </Col>
          </Row>
        )}
      </div>
    </Container>
  </div>
);
};

export default RegistrationForm;