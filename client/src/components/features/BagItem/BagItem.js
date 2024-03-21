import { Card } from "react-bootstrap";
import { IMAGES_URL } from "../../../config";
import { Image } from "react-bootstrap";
import { Row, Col, ButtonGroup, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { removeFromBag } from "../../../redux/bagRedux";
import { useState } from "react";


const BagItem = ({ bagItem, onRemove }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [quantity, setQuantity] = useState(bagItem.quantity);
  const [subtotal, setSubtotal] = useState(bagItem.subtotal);
  

  const handleRemoveProductFromBag = () => {
    onRemove(bagItem.productId); 
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(quantity + change, 1);
    setQuantity(newQuantity);
    localStorage.setItem(`${bagItem.id}_quantity`, newQuantity.toString());
  };

  const handleCommentChange = (event) => {
    const newComment = event.target.value;
    setComment(newComment);
    localStorage.setItem(`${bagItem.id}_comment`, newComment);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className="align-items-center">
          <Col lg={2}>
            <Image src={`${IMAGES_URL}/${bagItem.photo}`} alt={bagItem.name} rounded style={{ width: '150px' }} />
          </Col>

          <Col lg={4}>
            <div>
              <h5>{bagItem.name}</h5>
            </div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" placeholder="Add your comment here" rows={2} value={comment} onChange={handleCommentChange} />
            </Form.Group>
          </Col>

          <Col lg={2}>
            <ButtonGroup size="lg" aria-label="Quantity">
              <Button variant="secondary" onClick={() => handleQuantityChange(-1)}>-</Button>
              <Button variant="secondary">{quantity}</Button>
              <Button variant="secondary" onClick={() => handleQuantityChange(1)}>+</Button>
            </ButtonGroup>
          </Col>

          <Col onClick={handleRemoveProductFromBag}><FontAwesomeIcon icon={faTrash} /></Col>

          <Col lg={3}>
            <p className="mb-0">Subtotal: {subtotal} zl</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BagItem;