import { Container } from "react-bootstrap";
import Promo from "../../views/Promo/Promo";
import TopProducts from "../../views/TopProducts/TopProducts";
import SpringCollection from "../../views/SpringCollection/SpringCollection";


const Home = () => {
  return (
    <div>
      <Promo />
      <Container>
        <TopProducts />
      </Container>
      <SpringCollection />
    </div>
  )
};
  
export default Home;