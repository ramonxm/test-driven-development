import { renderHook } from '@testing-library/react-hooks';
import { makeServer } from '../miragejs/server';
import { useFetchProducts } from './use-fetch-products';

describe('useFetchProducts', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should return a list of 10 products', async () => {
    server.createList('product', 10);
    const { result, waitForNextUpdate } = renderHook(() => useFetchProducts());

    await waitForNextUpdate();
    const { products, error } = result.current;
    expect(products).toHaveLength(10);
    expect(error).toBe(false);
  });

  it('should return an error when the promise is rejected', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchProducts());
    await waitForNextUpdate();
    const { products } = result.current;
    expect(products).toHaveLength(0);
  });
});
