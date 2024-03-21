import { Form, Row, Col } from "react-bootstrap";
import OrderItems from "../OrderItems/OrderItems";
import PageContainer from "../../common/PageContainer/PageContainer";


const OrderForm = () => {
  return(
  <PageContainer>
    <Row>
      <Col md={6}>
        <OrderItems />
      </Col>
      <Col md={6}>
      <Form>
        <Form.Group className="mb-3" >
          <Form.Control placeholder="First name" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control placeholder="Last name" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control placeholder="Email name" />
        </Form.Group>
        </Form>
      </Col>
    </Row>
   </PageContainer>
  )
}

export default OrderForm;