import { useSelector } from "react-redux";
import { Row, Col, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IMAGES_URL } from "../../../config";
import PageContainer from "../../common/PageContainer/PageContainer";
import { getAllProducts } from "../../../redux/productsRedux";
import CardProduct from "../CardProduct/CardProduct";

const Catalogue = () => {

  const allProducts = useSelector(state=>getAllProducts(state));
  console.log(allProducts);

  return (
    <Container>
      <PageContainer>
        <h1 className="text-center">CATALOGUE</h1>
        <Row xs={1} md={2} lg={3} className="g-4 py-3">
          {allProducts.map(product => (
          <CardProduct key={product.id} product={product}/>  
        ))}
        </Row>
      </PageContainer>
    </Container>
  )
};

export default Catalogue;