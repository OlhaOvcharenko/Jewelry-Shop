import { IMAGES_URL } from "../../../config";
import { Row, Col, Form, Image, Card} from "react-bootstrap";
import ButtonsGroup from "../../common/ButtonsGroup/ButtonsGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { updateBagItemRequest } from "../../../redux/bagRedux";
import styles from '../BagItem/BagItem.module.scss';
import { useState } from "react";
import { useEffect } from "react";

const BagItem = ({ bagProduct, onRemove }) => {
  const dispatch = useDispatch();
  const [productState, setProductState] = useState(bagProduct);
  
  const handleDecrement = () => {
    const newQuantity = Math.max(productState.quantity - 1, 1);
    updateQuantity(newQuantity);
  };

  const handleIncrement = () => {
    const newQuantity = productState.quantity + 1;
    updateQuantity(newQuantity);
  };

  const updateQuantity = (newQuantity) => {
    const newSubtotal = newQuantity * productState.product.price;
    const newProductState = { ...productState, quantity: newQuantity, subTotal: newSubtotal };
    setProductState(newProductState);
    dispatch(updateBagItemRequest(newProductState)); 
  };

  const handleRemoveProductFromBag = () => {
    onRemove(productState.id);
  };

  const handleCommentChange = (event) => {
    const newComment = event.target.value;
    const newProductState = { ...productState, comment: newComment };
    setProductState(newProductState);
    dispatch(updateBagItemRequest(newProductState));
  };

  return (
    <Card className="mb-3" style={{ border: 'none' }}>
      <Card.Body>
        <Row className="align-items-center">
          <Col lg={2}>
            <Image src={`${IMAGES_URL}/${productState.product.photo}`} alt={productState.product.name} rounded style={{ width: '150px' }} />
          </Col>

          <Col lg={3}>
            <div>
              <h5>{productState.product.name}</h5>
              <p className="px-2 text-muted">Size: {productState.size}</p>
            </div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" placeholder="Add your comment here" rows={2} value={productState.comment || '' } onChange={handleCommentChange} />
            </Form.Group>
          </Col>

          <Col>  
            <ButtonsGroup quantity={productState.quantity} handleDecrement={handleDecrement} handleIncrement={handleIncrement} /> 
          </Col>

          <Col onClick={handleRemoveProductFromBag} lg={2} >
            <span className={styles.icon}><FontAwesomeIcon icon={faTrashCan} /></span>
          </Col>

          <Col lg={2}>
            <p className={styles.subtotal}><b>Subtotal:</b> {productState.subTotal} zl</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BagItem;