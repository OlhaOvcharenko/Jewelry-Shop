import { Card } from "react-bootstrap";
import { IMAGES_URL } from "../../../config";
import { Image } from "react-bootstrap";
import { Row, Col} from "react-bootstrap";


const OrderItems = ({item}) => {
  return(
    <Card className="mb-1" style={{border:'none'}}>
      <Card.Body>
        <Row className="align-items-center">
          <Col lg={2}>
            <Image src={`${IMAGES_URL}/${item.photo}`} alt={item.name} rounded style={{ width: '50px' }} />
          </Col>
          <Col >
            <div>
              <h5>{item.name}</h5>
            </div>
          <Col className="mx-2" >
            <p>{item.comment}</p>
          </Col>
          </Col>
          <Col>
            <p>Quantity: {item.quantity}</p>
            <p className="mb-0">Amount: {item.subTotal} zl</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

  
export default OrderItems;