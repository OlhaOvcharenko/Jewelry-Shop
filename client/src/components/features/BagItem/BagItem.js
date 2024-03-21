import { Card } from "react-bootstrap";
import { IMAGES_URL } from "../../../config";
import { Image } from "react-bootstrap";
import { Row, Col, ButtonGroup, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { removeProductFromBagRequest } from "../../../redux/bagRedux";

const BagItem = ({bagItem}) => {
  const dispatch = useDispatch();
  
  const handleRemoveItemfromBag = () => {
    dispatch(removeProductFromBagRequest(bagItem));
  }


  return(
    <Card className="mb-3">
      <Card.Body>
        <Row className="align-items-center">

          <Col lg={2}>
            <Image src={`${IMAGES_URL}/${bagItem.product.photo}`} alt={bagItem.product.name} rounded style={{ width: '150px' }} />
          </Col>

          <Col lg={4}>
            <div>
              <h5>{bagItem.product.name}</h5>
            </div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
              <Form.Control as="textarea" placeholder="Add your comment here" rows={2} />
            </Form.Group>
          </Col>

          <Col lg={2}> 
          <ButtonGroup size="lg" aria-label="Quantity" >
                <Button variant="secondary">-</Button>
                <Button variant="secondary">{bagItem.quantity}</Button> 
                <Button variant="secondary">+</Button>
           </ButtonGroup>
          </Col>

         <Col onClick={handleRemoveItemfromBag}><FontAwesomeIcon icon={faTrash} /></Col>

          <Col lg={3}>
            <p className="mb-0">Subtotal: {bagItem.subTotal} zl</p>
          </Col>

        </Row>
      </Card.Body>
    </Card>
  )
}
  
export default BagItem;