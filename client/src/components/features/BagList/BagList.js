import { Container, Row, Col } from "react-bootstrap";
import BagItem from "../BagItem/BagItem";
import PageContainer from "../../common/PageContainer/PageContainer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllBagProducts } from "../../../redux/bagRedux";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromBag } from "../../../redux/bagRedux";

const BagList = () => {
  const dispatch = useDispatch();
  const [bagProducts, setBagItems] = useState([]);

  const storedBagItems = useSelector(state => getAllBagProducts(state));

  useEffect(() => {
    setBagItems(storedBagItems);
  }, [storedBagItems]);

  const handleRemoveItem = (id) => {
    dispatch(removeFromBag({ id }));
  };

  return (
    <Container>
      <PageContainer>
        {bagProducts.map((product) => (
          <BagItem key={product.id} bagProduct={product} onRemove={handleRemoveItem} />
        ))}
      </PageContainer>
      <Row>
        <Col className="text-end mt-3">
          <Link to="/order" className="btn btn-secondary">Submit</Link> 
        </Col>
      </Row>
    </Container>
  );
};

export default BagList;