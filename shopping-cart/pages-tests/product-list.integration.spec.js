import { render, screen, waitFor } from '@testing-library/react';
import { makeServer } from '../miragejs/server';
import ProductList from '../pages';

const renderProductList = () => render(<ProductList />);

describe('ProductCard', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });
  afterEach(() => {
    server.shutdown();
  });

  it('should render', () => {
    renderProductList();
    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });

  it('should render the ProductCard component 10 times', async () => {
    server.createList('product', 10);
    renderProductList();

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(10);
    });
  });
  it('should render the "no products message"', async () => {
    renderProductList();

    await waitFor(() => {
      expect(screen.getByTestId('no-products')).toBeInTheDocument();     
    })
  });
  it('should display error message when promise is rejected', async () => {
    server.get('products', () => {
      throw new Error('Server is down');
    })
    renderProductList();

    await waitFor(() => {
      expect(screen.getByTestId('server-error')).toBeInTheDocument();
      expect(screen.queryByTestId('no-products')).toBeNull();
      expect(screen.queryAllByTestId('product-card')).toHaveLength(0);

    })
  });
  it('should filter the products list when a search is performed', async () => {
    
  });
  it.todo('should display the total quantity of products');
  it.todo('should display product (singular) when there is only 1 product');
});
