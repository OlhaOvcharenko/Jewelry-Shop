import { useSelector } from "react-redux";
import { Row, Col, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IMAGES_URL } from "../../../config";
import PageContainer from "../../common/PageContainer/PageContainer";
import { getAllProducts } from "../../../redux/productsRedux";

const Catalogue = () => {

  const allProducts = useSelector(state=>getAllProducts(state));
  console.log(allProducts);

  return (
    <Container>
      <PageContainer>
        <h1 className="text-center">Catalogue</h1>
        <Row xs={1} md={2} lg={4} className="g-4 py-3">
          {allProducts.map(product => (
          <Col key={product.id}>
            <Card className="m-2">
              <Card.Img variant="top" 
              src={`${IMAGES_URL}/${product.photo}`}
              style={{ height: '300px', objectFit: 'cover' }} 
              />
              <Card.Body>
                <Link to={`/products/${product.id}`}>
                <Card.Title className="d-flex justify-content-center">{product.name}</Card.Title>
                </Link>
                <Card.Text className="d-flex justify-content-center">{product.price}zl</Card.Text>
              </Card.Body>
            </Card>
          </Col>     
        ))}
        </Row>
      </PageContainer>
    </Container>
  )
};

export default Catalogue;