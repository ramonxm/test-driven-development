import axios from "axios";
import { useEffect, useState } from "react";

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get('/api/products')
      .then((res) => setProducts(res.data.products))
      .catch((error) => setError(true));
  }, []);

  return { products, error };
}

export { useFetchProducts };
