import { fireEvent, render, screen } from '@testing-library/react'
import { App } from './App'

describe('Pruebas en App', () => {
  test('Debe de retornar un elemento', () => {
    const { container } = render(<App />)
    expect(container).toMatchSnapshot()
  })
  test('Debe retonar el texto Hello Vite + React!', () => {
    render(<App />)
    expect(screen.getByText('Hello Vite + React!')).toBeTruthy()
  })
  test('Debe retonar valor inicial 0', () => {
    render(<App />)
    // screen.getByRole('button', { name: 'Incrementar' })
    expect(screen.getByRole('button', { name: 'Incrementar' })).toBeTruthy()
  })
  test('Debe aumentar en una unidad al hacer clic en el bonton', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Incrementar' }))
    expect(screen.getByText('count is: 1')).toBeTruthy()
  })
})
