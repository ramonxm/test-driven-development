import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('api/products');
        setProducts(response?.data?.products);
      } catch {
        setError(true);
      }
    })();
  }, []);

  return { products, error };
};

export { useFetchProducts };
