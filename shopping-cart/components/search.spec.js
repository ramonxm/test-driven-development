import { render, screen } from '@testing-library/react'
import Search from './search'

describe('Search', () => {
  it('should render', () => {
    render(<Search />)
    expect(screen.getByTestId('search')).toBeInTheDocument()
  })
})