import { Carousel } from 'react-bootstrap';
import { getPromoProducts } from '../../../redux/productsRedux';
import { useSelector } from 'react-redux';
import { IMAGES_URL } from '../../../config';
import styles from '../Promo/Promo.module.scss'
import Button from '../../common/Button/Button';
import { Link } from 'react-router-dom';


const Promo = () => {
  const promoProducts = useSelector(state =>  getPromoProducts(state));
  return (
    <section className='Promo'>
      <Carousel data-bs-theme="dark">
        {promoProducts.map(product => (
          <Carousel.Item key={product.id}>
            <img
              className='d-block w-100'
              src={`${IMAGES_URL}/${product.photo}`} 
              alt={product.name} 
              style={{ height: '900px', objectFit: 'cover' }} 
            />
            
            <Carousel.Caption>
              <div className={styles.promoBox}>
                <h1 className={styles.promoTitle} >{product.description}</h1> 
                <p className={styles.promoText}>{product.collection}</p> 
                <Button>
                  <Link to='/products' className={styles.textBtn}><span>Shop now</span></Link>
                </Button>
              </div>
            </Carousel.Caption>

          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default Promo;