import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getSpringCollectionProducts } from '../../../redux/productsRedux';
import { IMAGES_URL } from '../../../config';
import styles from '../SpringCollection/SpringCollection.module.scss';


const SpringCollection = () => {
    const collectionProducts = useSelector(state => getSpringCollectionProducts(state));

    return (  
      <div className="position-relative">
        <div className={styles.textBox} >
          <h1>New Spring Collection</h1>
          <h1>Something special</h1>
        </div>
        <Row className="gx-0 mt-5">
          {collectionProducts.map(product => (
            <Col key={product.id} sm={6} className="p-0">
                <img
                  src={`${IMAGES_URL}/${product.photo}`}
                  alt={product.name}
                  className="img-fluid d-block w-100"
                  style={{ maxHeight: '40rem', objectFit: 'cover' }}
                />
            </Col>
            ))}
        </Row>
      </div>
    );
};

export default SpringCollection;