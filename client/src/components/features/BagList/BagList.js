
import { Container, Row, Col } from "react-bootstrap";
import BagItem from "../BagItem/BagItem";
import { Link } from "react-router-dom";
import PageContainer from "../../common/PageContainer/PageContainer";
import { useState } from "react";
import { useEffect } from "react";

const BagList = () => {
  const [bagProducts, setBagItems] = useState([]);

  useEffect(() => {
    const storedBagItems = JSON.parse(localStorage.getItem('bagItems')) || [];
    setBagItems(storedBagItems);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedBagProducts = bagProducts.filter(product => product.productId !== id);
    setBagItems(updatedBagProducts);
    localStorage.setItem('bagItems', JSON.stringify(updatedBagProducts));
  };

  return (
    <Container>
      <PageContainer>
        {bagProducts.map((item) => (
          <BagItem key={item.id} bagItem={item} onRemove={handleRemoveItem} />
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