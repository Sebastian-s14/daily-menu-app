import { render } from '@testing-library/react'
import { Demo } from './Demo'

describe('Pruebas en Demo', () => {
  test('Debe de retornar un elemento', () => {
    const { container } = render(<Demo />)
    expect(container).toMatchSnapshot()
  })
  test('Debe retonar el texto DemoApp', () => {
    const { getByText } = render(<Demo />)
    expect(getByText('Demo Component')).toBeTruthy()
  })
})
