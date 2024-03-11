import { Carousel } from 'react-bootstrap';
import { getPromoProducts } from '../../../redux/productsRedux';
import { useSelector } from 'react-redux';
import styles from "../Promo/Promo.module.scss"

const Promo = () => {
  const promoProducts = useSelector((state) => getPromoProducts(state));

  return (
    <Carousel data-bs-theme="dark">
    <Carousel.Item>
    <img
        className="d-block w-100"
        src="holder.js/800x400?text=First slide&bg=f5f5f5"
        alt="First slide"
    />
    <Carousel.Caption>
        <h5>First slide label</h5>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
    </Carousel.Item>
    </Carousel>
  )
};

export default Promo;