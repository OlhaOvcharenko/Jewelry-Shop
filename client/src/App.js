import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';
import { useEffect } from 'react';
import { loadProductsRequest } from './redux/productsRedux';
import { useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import Container from './components/common/Container/Container';

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
    <Container>
    {loading ? (
      <Button variant="tuned-light">
        <Spinner animation="border" variant="primary" size="lg" />
        Loading ...
      </Button>
    ) : (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      )}
    </Container>
  );
};


export default App;

