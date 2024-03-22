import { Form, Row, Col, Button, Card, Alert} from "react-bootstrap";
import { Link } from "react-router-dom";
import OrderItems from "../OrderItems/OrderItems";
import PageContainer from "../../common/PageContainer/PageContainer";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createOrderRequest } from "../../../redux/orderRedux";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getAllBagProducts } from "../../../redux/bagRedux";
import { getRequest } from "../../../redux/orderRedux";
import { useForm }from 'react-hook-form'


const OrderForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const finalAmount = location.state.totalAmount;
  
  const orderItems = useSelector(state => getAllBagProducts(state));
  const request = useSelector(getRequest);
  console.log(request);

  const { register, handleSubmit: validate, formState: { errors } } = useForm();
  
  const [clientName, setClientName] = useState('');
  const [clientSurname, setClientSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const onSubmit = async (data) => {
    if (orderItems.length > 0) {
      
      const newOrder = {
        clientName: data.clientName,
        clientSurname: data.clientSurname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        finalAmount,
        productIds: orderItems.map((item) => item.id),
      };

      try {
        await dispatch(createOrderRequest(newOrder)); 
        
      } catch (error) {
        console.error('Error submitting order:', error);
      }
    } else {
      console.error('No order items found.');
    }
  };

  return (
    <PageContainer>
       {request['app/order/CREATE_ORDER']?.success && (
         <Alert variant="success">
          <p>Order has been registered successfully!</p>
          <Link to='/'>Continue shopping</Link>
         </Alert>
      )}
      {request['app/order/CREATE_ORDER']?.error && (
        <Alert variant="warning">There was an error processing your order. Please check your data and try again.</Alert>
      )}
      {!request['app/order/CREATE_ORDER']?.success && !request['app/order/CREATE_ORDER']?.error && (
        <>
      <h1 className="text-center mb-4">Order</h1>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={validate(onSubmit)}>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      {...register("clientName", { required: true, minLength: 4, maxLength: 20 })}
                      type="text" placeholder="Name" value={clientName} onChange={e => setClientName(e.target.value)} 
                    />
                    {errors.clientName && <small className="d-block form-text text-danger mt-2">This field is required (min 4 characters , max 20).</small>}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridSurname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                      {...register("clientSurname", { required: true, minLength: 4, maxLength: 20 })}
                      type="text" placeholder="Surname" value={clientSurname} onChange={e => setClientSurname(e.target.value)} 
                    />
                    {errors.clientSurname && <small className="d-block form-text text-danger mt-2">This field is required (min 4 characters , max 20)</small>}
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      {...register("email", { required: true, minLength: 10, maxLength: 20 })}
                      type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} 
                    />
                    {errors.email && <small className="d-block form-text text-danger mt-2">This field is required (min 10 characters, max 20)</small>}
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridNumber">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                      {...register("phone", { required: true , minLength: 9, maxLength: 20})}
                      type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} 
                    />
                    {errors.phone && <small className="d-block form-text text-danger mt-2">mThis field is required (min 9 characters , max 20)</small>}
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    {...register("address", { required: true, minLength: 5, maxLength: 30 })}
                    type="text"  placeholder="Country, city, postal code, street, apartment" value={address} onChange={e => setAddress(e.target.value)} 
                  />
                  {errors.address && <small className="d-block form-text text-danger mt-2">This field is required (min 5 characters , max 30)</small>}
                </Form.Group>

                <Button className="btn btn-secondary px-5 my-4 mx-3" size="lg" type="submit">Create</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} xs={12}>
          {orderItems.map(orderItem => (
            <OrderItems key={orderItem.id} item={orderItem} />
          ))}
           <Row className="mt-4">
            <Col className="text-start">
              <h4>Total Amount: {finalAmount} zl</h4>
            </Col>
          </Row>
        </Col>
      </Row>
      </>
      )}
    </PageContainer>
   
  );
}

export default OrderForm;