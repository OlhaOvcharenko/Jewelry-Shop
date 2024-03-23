import { Container, Row, Col} from "react-bootstrap";
import Button from "../../common/Button/Button";
import BagItem from "../BagItem/BagItem";
import PageContainer from "../../common/PageContainer/PageContainer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllBagProducts } from "../../../redux/bagRedux";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromBag } from "../../../redux/bagRedux";
import { Link } from "react-router-dom";
import styles from '../BagList/BagList.module.scss'
const BagList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useHistory
  const [bagProducts, setBagItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); // State to hold the total amount

  const storedBagItems = useSelector(state => getAllBagProducts(state));

  useEffect(() => {
    setBagItems(storedBagItems);

    // Calculate total amount
    const amount = storedBagItems.reduce((total, item) => total + item.subTotal, 0);
    setTotalAmount(amount);
  }, [storedBagItems]);

  const handleRemoveItem = (id) => {
    dispatch(removeFromBag({ id }));
  };

  const handleOrderSubmit = () => {
    navigate('/order', { state: { totalAmount } });
  };


  return (
    <PageContainer>
      <h4 className={styles.bagTitle}> Bag </h4>
      <div >
        <ul className={styles.list}>
          <li>Product</li>
          <li>Comment</li>
          <li>Quantity</li>
          <li>Remove</li>
          <li>Subtotal</li>
        </ul>
      </div>
      {bagProducts.length === 0 ? (
        <div className="text-center">
          Your bag is still empty.<Link to="/">Shop now</Link>.
        </div>
      ) : (
        bagProducts.map((product) => (
          <BagItem key={product.id} bagProduct={product} onRemove={handleRemoveItem} />
        ))
      )}
    

    {bagProducts.length > 0 && (
      <>
        <Row className="mt-4">
          <Col className="text-end">
            <p className={styles.amount}>Total: {totalAmount} zl</p>
          </Col>
        </Row>
        
        <Row>
          <Col className="text-end mt-3">
            <Button className={styles.btn} onClick={handleOrderSubmit}>Submit</Button> 
          </Col>
        </Row>
      </>
    )}
  </PageContainer>
  );
};

export default BagList;