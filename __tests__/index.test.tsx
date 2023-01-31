import { render, screen } from '@testing-library/react'
import Imprint from '../pages/imprint'

describe('Imprint', () => {
    render(<Imprint />)

  it('renders a headline', () => {
    expect(document.querySelector('h1')).toBeTruthy()
  })

  it('renders not a paragraph', () => {
    expect(document.querySelector('p')).toBeFalsy()
  })
})