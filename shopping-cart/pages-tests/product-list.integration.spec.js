import { render, screen, waitFor } from '@testing-library/react';
import ProductList from '../pages';

const renderProductList = () => render(<ProductList />);

describe('ProductCard', () => {
  it('should render', () => {
    renderProductList();
    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });

  fit('should render the ProductCard component 10 times', async () => {
    renderProductList();

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(10);
    });
  });
  it.todo('should render the no products message');
  it.todo('should render the Search component');
  it.todo('should filter the products list when a search is performed');
  it.todo('should display error message when promise is rejected');
  it.todo('should display the total quantity of products');
  it.todo('should display product (singular) when there is only 1 product');
});
