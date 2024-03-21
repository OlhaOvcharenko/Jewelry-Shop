import { Card } from "react-bootstrap";
import { IMAGES_URL } from "../../../config";
import { Image } from "react-bootstrap";
import { Row, Col, ButtonGroup, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { removeProductFromBagRequest } from "../../../redux/bagRedux";
import { useState } from "react";
import { useEffect } from "react";

const BagItem = ({bagItem}) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [quantity, setQuantity] = useState(bagItem.quantity);

  const handleRemoveItemfromBag = () => {
    dispatch(removeProductFromBagRequest(bagItem));
  }

  useEffect(() => {
    const storedComment = localStorage.getItem(`${bagItem.id}_comment`);
    setComment(storedComment || bagItem.comment || '');

    const storedQuantity = localStorage.getItem(`${bagItem.id}_quantity`);
    setQuantity(storedQuantity ? parseInt(storedQuantity) : (bagItem.quantity || 1));
  }, [bagItem]);

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(quantity + change, 1);
    setQuantity(newQuantity);
    localStorage.setItem(`${bagItem.id}_quantity`, newQuantity.toString());
    console.log(localStorage.bagitem)
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
            <Image src={`${IMAGES_URL}/${bagItem.product.photo}`} alt={bagItem.product.name} rounded style={{ width: '150px' }} />
          </Col>

          <Col lg={4}>
            <div>
              <h5>{bagItem.product.name}</h5>
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

          <Col onClick={handleRemoveItemfromBag}><FontAwesomeIcon icon={faTrash} /></Col>

          <Col lg={3}>
            <p className="mb-0">Subtotal: {bagItem.subTotal} zl</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default BagItem;