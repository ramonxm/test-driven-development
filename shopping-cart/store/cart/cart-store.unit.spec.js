import { renderHook, act } from '@testing-library/react-hooks';
import { useCartStore } from '.';
import { makeServer } from '../../miragejs/server';

describe('Cart Store', () => {
  let server;
  let result;
  let add;
  let toggle

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    result = renderHook(() => useCartStore()).result;
    add = result.current.actions.add;
    toggle = result.current.actions.toggle;
  });
  afterEach(() => {
    server.shutdown();
    act(() => result.current.actions.reset());
  });
  
  it('should return opens equals false on initial state', async () => {
    expect(result.current.state.open).toBe(false);
  });

  it('should return an empty array for products on initial state', () => {
    expect(result.current.state.products).toHaveLength(0);
    expect(Array.isArray(result.current.state.products)).toBe(true);
  });

  it('should add 2 products to the list', () => {
    const products = server.createList('product', 2);

    for (const product of products) {
      act(() => {
        add(product);
      });
    }

    expect(result.current.state.products).toHaveLength(2);
  });

  it('should not add a product to the list if it already exists', () => {
    const product = server.create('product');

    act(() => {
      add(product);
    });

    act(() => {
      add(product);
    });

    expect(result.current.state.products).toHaveLength(1);
  })
  it('should toggle open state', async () => {
    expect(result.current.state.open).toBe(false);
    act(() => toggle());
    expect(result.current.state.open).toBe(true);
    act(() => toggle());
    expect(result.current.state.open).toBe(false);
  });
});
