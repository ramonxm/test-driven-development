import { renderHook, act } from '@testing-library/react-hooks';
import { render, screen } from '@testing-library/react';
import { useCartStore } from '../store/cart';
import { makeServer } from '../miragejs/server';
import userEvent from '@testing-library/user-event';
import Cart from './cart';

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
    })
    render(<Cart />);
    expect(screen.getByTestId('cart')).not.toHaveClass('hidden');
  });

  it('should call store toggle() twice', () => {
    render(<Cart />);
    const button = screen.getByTestId('close-button');
    
    act(() => {
      userEvent.click(button);
      userEvent.click(button);
    })

    expect(spy).toHaveBeenCalledTimes(0);
  });
});
