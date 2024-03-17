import { useSelector } from "react-redux";
import { getTopProducts } from "../../../redux/productsRedux";
import { Row, Col, Card, Container } from "react-bootstrap";
import { IMAGES_URL } from "../../../config";
import styles from '../TopProducts/TopProducts.module.scss'
import { Link } from "react-router-dom";

const TopProducts = () => {

  const topProducts = useSelector(state =>  getTopProducts(state));

  return (
    <section className="Top-Products">
      <div className={styles.sectionName}>
        <h1 className={styles.title}>Top Selling Products</h1>
        <h3 className={styles.subtitle}>Shop fine jewelry for every day.</h3>
      </div>
    
        <Row xs={1} md={2} lg={4} className="g-4 py-3">
          {topProducts.map(product => (
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
        <p className='text-center'> And many more modern styles <b>Shop All Products</b></p>
    </section>
  );

};
  
export default TopProducts;