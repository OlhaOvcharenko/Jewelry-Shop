import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';
import { useEffect } from 'react';
import { fetchDataProducts } from './redux/productsRedux';
import { useDispatch } from 'react-redux';

const App = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataProducts());
  }, [dispatch]);

  return ( 
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes> 
    </main>
  );
};

export default App;

