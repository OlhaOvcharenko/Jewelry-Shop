import { Row, Col} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getSpringCollectionProducts } from '../../../redux/productsRedux';
import { IMAGES_URL } from '../../../config';
import styles from '../SpringCollection/SpringCollection.module.scss';
import { Link } from 'react-router-dom';

const SpringCollection = () => {
    const collectionProducts = useSelector(state => getSpringCollectionProducts(state));
    

    // Ensure galleryImages is properly initialized
    const galleryImages = collectionProducts.map(product => {
        // Ensure product.gallery is not empty and contains images
        if (product.gallery) {
            return product.gallery.split(',').map(image => image.trim());
        } else {
            return []; // Return empty array if gallery is empty
        }
    });
   
    return (  
      <div className={styles.collectionBox}>
        <div className={styles.textBox} >
          <h2>New Spring Collection</h2>
          <h2 className={styles.boxName}>Something Special for you</h2>
        </div>
        
        <div className={styles.smallProduct}>
          <img src={`${IMAGES_URL}/${galleryImages[1][1]}`} alt='gallery-img' />
        </div>
        
        <Row className="gx-0 mt-5">

          {collectionProducts.map(product => (
            <Col key={product.id} lg={6}sm={12} className="p-0">
                <div className={styles.imageContainer}>
                  <img
                    src={`${IMAGES_URL}/${product.photo}`}
                    alt={product.name}
                    className="img-fluid d-block w-100"
                    style={{ maxHeight: '40rem', objectFit: 'cover' }}
                  />
                  <div className={styles.overlay}>

                  <Link to={`/products/${product.id}`} className={styles.link}>
                    Discover now
                  </Link>

                  </div>
               </div>
            </Col>
            ))}
        </Row>
      </div>
    );
};

export default SpringCollection;