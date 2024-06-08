
import Button from "../../common/Button/Button";
import BagItem from "../BagItem/BagItem";
import PageContainer from "../../common/PageContainer/PageContainer";
import { Row, Col, Spinner} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllBagProducts, removeFromBagRequest, loadBagItemsRequest } from "../../../redux/bagRedux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from '../BagList/BagList.module.scss';


const BagList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const bagItems = useSelector(state => getAllBagProducts(state));
  const [totalAmount, setTotalAmount] = useState(0); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([dispatch(loadBagItemsRequest())])
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error('Error loading data:', error);
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    const amount = bagItems.reduce((total, item) => total + item.subTotal, 0);
    setTotalAmount(amount);
  }, [bagItems]);

  const handleRemoveItem = (id) => {
    dispatch(removeFromBagRequest(id));
  };

  const handleOrderSubmit = () => {
    navigate('/order', { state: { totalAmount } });
    window.location.reload();
  };


  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spinner animation="grow" variant="secondary" style={{ width: '100px', height: '100px' }} />
          <h2>Loading ...</h2>
        </div>
      ) : (
        <PageContainer>
          <h4 className={styles.bagTitle}> Bag </h4>

          {bagItems.length === 0 ? (
            <div className="text-center">
              <p className={styles.amount}>Your bag is still empty. <Link to="/">Shop now</Link>.</p>
            </div>
          ) : (
            <>
              <div>
                <ul className={styles.list}>
                  <li>Product</li>
                  <li>Comment</li>
                  <li>Quantity</li>
                  <li>Remove</li>
                  <li>Subtotal</li>
                </ul>
              </div>
              {bagItems.map((product) => (
                <BagItem key={product.id} bagProduct={product} onRemove={handleRemoveItem} />
              ))}
            </>
          )}

          {bagItems.length > 0 && (
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
      )}
    </>
  );
};
export default BagList;