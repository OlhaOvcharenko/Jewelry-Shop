import { Carousel } from 'react-bootstrap';
import { getPromoProducts } from '../../../redux/productsRedux';
import { useSelector } from 'react-redux';
import { IMAGES_URL } from '../../../config';



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
              <h1>{product.description}</h1> 
              <p>{product.collection}</p> 
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default Promo;