import { useParams } from "react-router-dom";
import { getProductById } from "../../../redux/productsRedux";
import { Card, Button, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { IMAGES_URL } from "../../../config";
import { Row, Col} from "react-bootstrap";
import  {ButtonGroup} from "react-bootstrap";
import { Tab } from "react-bootstrap";
import { addProductsRequest } from "../../../redux/bagRedux";


const SingleProduct = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();

  const productData = useSelector(state => getProductById(state, id));
  const categoryToUpperCase = productData.category.toUpperCase();
  
  const handleAddProductToBag = (product) => {
    const { id, quantity } = product; 
    dispatch(addProductsRequest({ productId: id, quantity: quantity }));
  };


  return(

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <Card style={{ width: '75rem', border: 'none' }}>
      <Row>

        <Col>
          <Card.Img src={`${IMAGES_URL}/${productData.photo}`} />
        </Col>

        <Col>
          <Card.Body className="py-5">
            <p>{categoryToUpperCase}</p>
            <h2>{productData.name}</h2>
            <p>{productData.price}zl</p>
             
            <p>Quantity</p>
            <ButtonGroup size="lg" aria-label="Quantity" >
                <Button variant="secondary">-</Button>
                <Button variant="secondary">{productData.quantity}</Button> 
                <Button variant="secondary">+</Button>
           </ButtonGroup>

          </Card.Body>

          <Button variant="dark" size="lg" className="px-5 my-5 mx-3" onClick={() => handleAddProductToBag(productData)} > Add to bag</Button>

        </Col>

      </Row>

        <Tab.Container id="item-tabs" defaultActiveKey="description" >
          <Nav justify variant="tabs" className="my-4">
            <Nav.Item eventKey="description">
                <Nav.Link eventKey="description">Description</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="reviews">Reviews</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="description" className="py-5">
              <p>{productData.description}</p>
            </Tab.Pane>
            <Tab.Pane eventKey="reviews">
              <p>Reviews content goes here...</p>
            </Tab.Pane>
          </Tab.Content>
      </Tab.Container>

    </Card>
 
  </div>


  );
}

export default SingleProduct;