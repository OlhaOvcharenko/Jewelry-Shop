import { Carousel } from 'react-bootstrap';
import { getPromoProducts } from '../../../redux/productsRedux';
import { useSelector } from 'react-redux';
import { IMAGES_URL } from '../../../config';



const Promo = () => {
  const promoProducts = useSelector(state =>  getPromoProducts(state));

  console.log(promoProducts, 'Promo products')

  return (
    <Carousel data-bs-theme="light">
      {promoProducts.map(product => (
        <Carousel.Item key={product.id}>
          <img
            className='d-block w-100'
            src={`${IMAGES_URL}/${product.photo}`} 
            alt={product.name} 
            style={{ height: '700px', objectFit: 'cover' }} 
          />
          <Carousel.Caption>
            <h5>{product.description}</h5> 
            <p>{product.collection}</p> 
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Promo;