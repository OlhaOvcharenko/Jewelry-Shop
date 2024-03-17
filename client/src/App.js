import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';
import { useEffect } from 'react';
import { loadProductsRequest } from './redux/productsRedux';
import { useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import  { Container } from 'react-bootstrap';
import Footer from './components/views/Footer/Footer';
import Header from './components/views/Header/Header';

import SingleProduct from './components/features/SingleProduct/SingleProduct';

const App = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(loadProductsRequest())
      .then(() => {
        setTimeout(() => {
          setLoading(false); 
        }, 1000); 
      })
  }, [dispatch]);

  return (
    <div>
    {loading ? (
      <Button variant="tuned-light" disabled>
        <Spinner animation="border" variant="primary" size="lg" />
        Loading ...
      </Button>
    ) : (
      <div>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<SingleProduct />} /> 
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    )}
    </div>
  );
};


export default App;

