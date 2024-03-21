import { Card } from "react-bootstrap";
import { IMAGES_URL } from "../../../config";
import { Image } from "react-bootstrap";
import { Row, Col} from "react-bootstrap";
import {  getAllBagProducts } from "../../../redux/bagRedux";
import { useSelector } from "react-redux";


const OrderItems = () => {

  const orderItems = useSelector(state => getAllBagProducts(state))
  return(
    <>
      {orderItems.map((orderedItem) => ( // Iterate through orderItems and use bagItem inside the map function
        <Card key={orderedItem.id} className="mb-1">
          <Card.Body>
            <Row className="align-items-start">
              <Col lg={2}>
                <Image src={`${IMAGES_URL}/${orderedItem.product.photo}`} alt={orderedItem.product.name} rounded style={{ width: '70px' }} />
              </Col>
              <Col >
                <div>
                  <h5>{orderedItem.product.name}</h5>
                </div>
              <Col className="mx-2" >
                <p>{orderedItem.comment}</p>
              </Col>
              </Col>
              <Col>
                <p>Quantity: {orderedItem.quantity}</p>
                <p className="mb-0">Amount: {orderedItem.subTotal} zl</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

  
export default OrderItems;