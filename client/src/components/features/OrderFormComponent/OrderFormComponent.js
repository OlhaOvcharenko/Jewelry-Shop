import React from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import Button from "../../common/Button/Button";
import styles from '../OrderFormComponent/OrderFormComponent.module.scss';

const OrderFormComponent = ({ onSubmit, register, errors, clientName, setClientName, clientSurname, setClientSurname, email, setEmail, phone, setPhone, address, setAddress }) => {
  
  const handleSubmit = (event) => {
    event.preventDefault(); 
    onSubmit({ clientName, clientSurname, email, phone, address }); 
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3" >
        <Form.Group as={Col} lg={6} xs={12} >
          <Form.Label>Name</Form.Label>
          <Form.Control
            {...register("clientName", { required: true, minLength: 4, maxLength: 20 })}
            type="text" size="lg" placeholder="Name" value={clientName} onChange={e => setClientName(e.target.value)}
          />
          {errors.clientName && <small className="d-block form-text text-danger mt-2">This field is required (min 4 characters , max 20).</small>}
        </Form.Group>

        <Form.Group as={Col} controlId="formGridSurname">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            {...register("clientSurname", { required: true, minLength: 4, maxLength: 20 })}
            type="text" size="lg" placeholder="Surname" value={clientSurname} onChange={e => setClientSurname(e.target.value)}
          />
          {errors.clientSurname && <small className="d-block form-text text-danger mt-2">This field is required (min 4 characters , max 20)</small>}
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail" xs={12} >
          <Form.Label>Email</Form.Label>
          <Form.Control
            {...register("email", { required: true, minLength: 10, maxLength: 20 })}
            type="email" size="lg" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
          />
          {errors.email && <small className="d-block form-text text-danger mt-2">This field is required (min 10 characters, max 20)</small>}
        </Form.Group>
        <Form.Group as={Col} controlId="formGridNumber">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            {...register("phone", { required: true , minLength: 9, maxLength: 20})}
            type="text" size="lg" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)}
          />
          {errors.phone && <small className="d-block form-text text-danger mt-2">This field is required (min 9 characters , max 20)</small>}
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          {...register("address", { required: true, minLength: 5, maxLength: 30 })}
          type="text"  size="lg" placeholder="Country, city, postal code, street, apartment" value={address} onChange={e => setAddress(e.target.value)}
        />
        {errors.address && <small className="d-block form-text text-danger mt-2">This field is required (min 5 characters , max 30)</small>}
      </Form.Group>
      <div className="text-center"><Button className={styles.btn}>Create</Button></div>
    </Form>
  
  );
};

export default OrderFormComponent;