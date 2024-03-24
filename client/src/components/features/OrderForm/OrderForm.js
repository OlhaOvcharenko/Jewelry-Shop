import OrderItems from "../OrderItems/OrderItems";
import PageContainer from "../../common/PageContainer/PageContainer";
import OrderFormComponent from "../OrderFormComponent/OrderFormComponent";
import { Alert, Card, Col, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createOrderRequest } from "../../../redux/orderRedux";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getAllBagProducts } from "../../../redux/bagRedux";
import { getRequest } from "../../../redux/orderRedux";
import { useForm }from 'react-hook-form'
import styles from '../OrderForm/OrderForm.module.scss'

const OrderForm = () => {
  const [clientName, setClientName] = useState('');
  const [clientSurname, setClientSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  
  const dispatch = useDispatch();
  const location = useLocation();
  const finalAmount = location.state.totalAmount;
  
  const orderItems = useSelector(state => getAllBagProducts(state));
  const request = useSelector(getRequest);

  const { register, handleSubmit: validate, formState: { errors } } = useForm();
  
  const handleSubmit = async (data) => {
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
      
      console.log(newOrder);

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
        <Alert variant="info">
          <p>Order has been registered successfully! We will keep you posted. All shipping information and invoice will be sent to your email.</p>
          <Link to='/'>Continue shopping</Link>
        </Alert>
      )}
      {request['app/order/CREATE_ORDER']?.error && (
        <Alert variant="warning">
          <p>There was an error processing your order. Please check your data and try again.</p>
        </Alert>
      )}

      {!request['app/order/CREATE_ORDER']?.success && !request['app/order/CREATE_ORDER']?.error && (
        <>
      <h3 className={styles.orderTitle}>Order</h3>
      <Row>

        <Col md={6}>
           <Card className="px-5 py-5">
            <h5 className="text-center pb-2"><b>Personal information</b></h5>
            <OrderFormComponent
              onSubmit={validate(handleSubmit)}
              register={register}
              errors={errors}
              clientName={clientName}
              setClientName={setClientName}
              clientSurname={clientSurname}
              setClientSurname={setClientSurname}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              address={address}
              setAddress={setAddress}
            />
            <Link to='/bag' className="text-center p-3">Return to my bag</Link>
           </Card>
        </Col>

        <Col md={6} xs={12}>
          <Card className="px-5 py-5">
            <h5 className="text-center pb-2"><b>Your shopping bag</b></h5>
            {orderItems.map(orderItem => (
              <OrderItems key={orderItem.id} item={orderItem} />
            ))}
            <Row className="mt-4 pt-3">
              <Col style={{ padding: '20px' }} className={styles.border}>
                <h4 className={styles.amount}>Total: {finalAmount} zl</h4>
                <h4 className={styles.amount}>Shipping cost: 20 zl</h4>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      </>
      )}
    </PageContainer>
  );
}

export default OrderForm;