import PageContainer from "../../common/PageContainer/PageContainer";
import { Form, Col, Row }from 'react-bootstrap';
import Button from "../../common/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getSearchedProducts, loadSearchRequest } from "../../../redux/productsRedux";
import CardProduct from "../../features/CardProduct/CardProduct";


const Search = () => {
  const searchedProducts = useSelector(getSearchedProducts);
  console.log(searchedProducts);

  const dispatch = useDispatch();
  const [searchPhrase, setSearchPhrase] = useState('');
  

  const handleSearch = (e) => {
    e.preventDefault();
   dispatch(loadSearchRequest(searchPhrase))
  }

  return (
    <PageContainer>
      <Form>
        <Row className="justify-content-center text-center">
          <Col lg={6}>
            <Form.Group className="mb-3">
              <h1 className="mb-3">Search</h1>
              <Form.Group className="d-flex">
                <Form.Control size="lg" type="text" placeholder="Search products" className="mx-3"
                value={searchPhrase} onChange={e => setSearchPhrase(e.target.value)}/>
                <Button onClick={handleSearch}>
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </Form.Group>
            </Form.Group>
          </Col>
          
          {searchedProducts.length > 0  && (
          <Row xs={1} md={2} lg={4} className="d-flex justify-content-center text">
            
            {searchedProducts.map(product => (
            <CardProduct key={product.id} product={product}/>  
            ))}
            
          </Row>
          )}
        </Row>
      </Form>

      
    </PageContainer>
  )
};
  
export default Search;