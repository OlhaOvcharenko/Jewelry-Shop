import { Container, Row, Col, Button } from "react-bootstrap";
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
    <Container>
      <PageContainer>
        {bagProducts.length === 0 ? (
          <div className="text-center">
            Your bag is still empty.<Link to="/">Shop now</Link>.
          </div>
        ) : (
          bagProducts.map((product) => (
            <BagItem key={product.id} bagProduct={product} onRemove={handleRemoveItem} />
          ))
        )}
      </PageContainer>

      {bagProducts.length > 0 && (
        <>
          <Row className="mt-4">
            <Col className="text-end">
              <h4>Total Amount: {totalAmount} zl</h4>
            </Col>
          </Row>
          
          <Row>
            <Col className="text-end mt-3">
              <Button onClick={handleOrderSubmit} className="btn btn-secondary px-5 my-4 mx-3" size="lg">Submit</Button> 
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default BagList;