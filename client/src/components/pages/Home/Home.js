import { Container } from "react-bootstrap";
import Promo from "../../features/Promo/Promo";
import TopProducts from "../../features/TopProducts/TopProducts";


const Home = () => {
  return (
    <div>
      <Promo />
      <Container>
        <TopProducts />
      </Container>
    </div>
  )
};
  
export default Home;