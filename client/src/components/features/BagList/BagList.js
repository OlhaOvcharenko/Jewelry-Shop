import { useDispatch, useSelector } from "react-redux";
import { getAllBagProducts, submitBagRequest } from "../../../redux/bagRedux";
import { Container, Row, Col } from "react-bootstrap";
import BagItem from "../BagItem/BagItem";
import { Link } from "react-router-dom";
import PageContainer from "../../common/PageContainer/PageContainer";

const BagList = () => {
  const dispatch = useDispatch();

  const bagItems = useSelector(state => getAllBagProducts(state));

  const handleSubmit = () => {
    const updatedBagItems = bagItems.map(item => ({
      bagItemId: item.id,
      productId: item.productId,
      quantity: item.quantity,
      comment: item.comment
    }));
  
    dispatch(submitBagRequest(updatedBagItems));
  }

  return (
    <Container>
      <PageContainer>
        {bagItems.map((item) => (
          <BagItem key={item.id} bagItem={item} />
        ))}
      </PageContainer>
      <Row>
        <Col className="text-end mt-3">
          <Link to="/order" className="btn btn-secondary" onClick={handleSubmit}>Create my order</Link> 
        </Col>
      </Row>
    </Container>
  );
}
export default BagList;