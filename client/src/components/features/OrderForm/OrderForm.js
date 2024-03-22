import { Form, Row, Col, Button, Card} from "react-bootstrap";
import OrderItems from "../OrderItems/OrderItems";
import PageContainer from "../../common/PageContainer/PageContainer";
import { useLocation } from "react-router-dom";

const OrderForm = () => {
  const location = useLocation();
  const totalAmount = location.state.totalAmount;

  return (
    <PageContainer>
       <h1 className="text-center mb-4">Order</h1>
      <Row>
        <Col md={6} >
        
          <OrderItems />
          
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridSurname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control type="text" placeholder="Surname" />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridNumber">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control type="text" placeholder="Phone" />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress">
                  <Form.Label>Address </Form.Label>
                  <Form.Control placeholder="Country, city, postal code, street, apartment" />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="text-end">
          <h4>Total Amount: {totalAmount} zl</h4>
        </Col>
      </Row>

      <Row>
        <Col className="text-end mt-3">
          <Button className="btn btn-secondary px-5 my-4 mx-3" size="lg">Create</Button>
        </Col>
      </Row>
    </PageContainer>
  )
}


export default OrderForm;