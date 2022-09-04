import { getSaludo } from './getSaludo'

describe('Prueba en getSaludo', () => {
  test('getSaludo debe retornar Hola Sebastian', () => {
    const name = 'Sebastian'
    const message = getSaludo(name)
    expect(message).toBe(`Hola ${name}`)
  })
})
