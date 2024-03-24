import { Card } from "react-bootstrap";
import { IMAGES_URL } from "../../../config";
import { Image } from "react-bootstrap";
import { Row, Col, Form } from "react-bootstrap";
import ButtonsGroup from "../../common/ButtonsGroup/ButtonsGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBag } from "../../../redux/bagRedux";
import styles from '../BagItem/BagItem.module.scss';

const BagItem = ({ bagProduct, onRemove }) => {
  const dispatch = useDispatch();
  const [productState, setProductState] = useState(bagProduct);
  const handleRemoveProductFromBag = () => {
    onRemove(productState.id); 
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(productState.quantity + change, 1);
    const newSubTotal = newQuantity * productState.price;
    const newProductState = { ...productState, quantity: newQuantity, subTotal: newSubTotal };
    setProductState(newProductState);
    dispatch(updateBag(newProductState)); 
  };

  const handleCommentChange = (event) => {
    const newComment = event.target.value;
    const newProductState = { ...productState, comment: newComment };
    setProductState(newProductState);
    dispatch(updateBag(newProductState)); 
  };

  return (
    <Card className="mb-3" style={{ border: 'none' }}>
      <Card.Body>
        <Row className="align-items-center">
          <Col lg={2}>
            <Image src={`${IMAGES_URL}/${productState.photo}`} alt={productState.name} rounded style={{ width: '150px' }} />
          </Col>

          <Col lg={3}>
            <div>
              <h5>{productState.name}</h5>
            </div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" placeholder="Add your comment here" rows={2} value={productState.comment || '' } onChange={handleCommentChange} />
            </Form.Group>
          </Col>

          <Col>  
            <ButtonsGroup quantity={productState.quantity} handleDecrement={() => handleQuantityChange(-1)} handleIncrement={() => handleQuantityChange(1)} /> 
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