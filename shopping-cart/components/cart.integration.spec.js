import { renderHook, act } from '@testing-library/react-hooks';
import { render, screen } from '@testing-library/react';
import { useCartStore } from '../store/cart';
import { makeServer } from '../miragejs/server';
import userEvent from '@testing-library/user-event';
import { setAutoFreeze } from 'immer';
import Cart from './cart';


setAutoFreeze(false);

describe('Cart', () => {
  let server;
  let result;
  let spy;
  let add;
  let toggle;
  let reset;

  beforeEach(() => {
    server = makeServer();
    result = renderHook(() => useCartStore()).result.current.actions;
    add = result.add;
    toggle = result.toggle;
    reset = result.reset;
    spy = jest.spyOn(result, 'toggle');
  });

  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });

  it('should add css class "hidden" in the component', () => {
    render(<Cart />);
    expect(screen.getByTestId('cart')).toHaveClass('hidden');
  });

  it('should not add css class "hidden" in the component', () => {
    act(() => {
      toggle();
    });
    render(<Cart />);
    expect(screen.getByTestId('cart')).not.toHaveClass('hidden');
  });

  it('should call store toggle() twice', async () => {
    render(<Cart />);
    const button = screen.getByTestId('close-button');

    act(() => {
      userEvent.click(button);
      userEvent.click(button);
    });

    expect(spy).toHaveBeenCalledTimes(0);
  });
  it('should display 2 products cards', () => {
    const products = server.createList('product', 2);

    act(() => {
      for (const product of products) {
        add(product);
      }
    });
    render(<Cart />);

    expect(screen.getAllByTestId('cart-item')).toHaveLength(2)
  });
});
