import { Card } from "react-bootstrap";
import { IMAGES_URL } from "../../../config";
import { Image } from "react-bootstrap";
import { Row, Col, ButtonGroup, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBag } from "../../../redux/bagRedux";

const BagItem = ({ bagProduct, onRemove }) => {
  const dispatch = useDispatch();
  const [productState, setProductState] = useState(bagProduct);
  console.log(productState.price, 'productSate')
  const handleRemoveProductFromBag = () => {
    onRemove(productState.id); 
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(productState.quantity + change, 1);
    const newSubTotal = newQuantity * productState.price;
    console.log(newSubTotal, 'subTotal')
    const newProductState = { ...productState, quantity: newQuantity, subTotal: newSubTotal };
    setProductState(newProductState);
    dispatch(updateBag(newProductState)); // Dispatch the action to update bag
  };

  const handleCommentChange = (event) => {
    const newComment = event.target.value;
    const newProductState = { ...productState, comment: newComment };
    setProductState(newProductState);
    dispatch(updateBag(newProductState)); // Dispatch the action to update bag
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className="align-items-center">
          <Col lg={2}>
            <Image src={`${IMAGES_URL}/${productState.photo}`} alt={productState.name} rounded style={{ width: '150px' }} />
          </Col>

          <Col lg={4}>
            <div>
              <h5>{productState.name}</h5>
            </div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" placeholder="Add your comment here" rows={2} value={productState.comment || '' } onChange={handleCommentChange} />
            </Form.Group>
          </Col>

          <Col lg={2}>
            <ButtonGroup size="lg" aria-label="Quantity">
              <Button variant="secondary" onClick={() => handleQuantityChange(-1)}>-</Button>
              <Button variant="secondary">{productState.quantity}</Button>
              <Button variant="secondary" onClick={() => handleQuantityChange(1)}>+</Button>
            </ButtonGroup>
          </Col>

          <Col onClick={handleRemoveProductFromBag}><FontAwesomeIcon icon={faTrash} /></Col>

          <Col lg={3}>
            <p className="mb-0">Subtotal: {productState.subTotal} zl</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BagItem;