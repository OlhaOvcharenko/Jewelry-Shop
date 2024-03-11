import { Carousel } from 'react-bootstrap';
import { getPromoProducts } from '../../../redux/productsRedux';
import { useSelector } from 'react-redux';
import { IMAGES_URL } from '../../../config';
import { useMemo } from 'react';


const Promo = () => {
  const promoProducts = useSelector(state =>  getPromoProducts(state));

  console.log(promoProducts, 'Promo products')

  return (
    <Carousel data-bs-theme="light">
    {promoProducts.map(product => (
      <Carousel.Item key={product.id}>
        <img
          className='d-block w-100 similar-size-image'
          src={`${IMAGES_URL}/${product.photo}`} 
          alt={product.name} 
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