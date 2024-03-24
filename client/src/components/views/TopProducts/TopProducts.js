import { useSelector } from "react-redux";
import { getTopProducts } from "../../../redux/productsRedux";
import { Row, Col, Card} from "react-bootstrap";
import { IMAGES_URL } from "../../../config";
import styles from './TopProducts.module.scss'
import { Link } from "react-router-dom";
import CardProduct from "../../features/CardProduct/CardProduct";

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
          <CardProduct  key={product.id} product={product}/>
          ))}
        </Row>
        <p className='text-center'> And many more modern styles <b>Shop All Products</b></p>
    </section>
  );

};
  
export default TopProducts;