import Calculadora from './calculadora';

describe('Calculadora - tests exitosos', () => {
  const calc = new Calculadora();

  test('suma 1 + 2 = 3', () => {
    expect(calc.suma(1, 2)).toBe(3);
  });
  test('suma 5 + 7 = 12', () => {
    expect(calc.suma(5, 7)).toBe(12);
  });
  test('suma -1 + 1 = 0', () => {
    expect(calc.suma(-1, 1)).toBe(0);
  });
  test('suma 0 + 0 = 0', () => {
    expect(calc.suma(0, 0)).toBe(0);
  });
  test('resta 5 - 2 = 3', () => {
    expect(calc.resta(5, 2)).toBe(3);
  });
  test('resta 2 - 5 = -3', () => {
    expect(calc.resta(2, 5)).toBe(-3);
  });
  test('resta 0 - 0 = 0', () => {
    expect(calc.resta(0, 0)).toBe(0);
  });
  test('multiplicacion 3 * 4 = 12', () => {
    expect(calc.multiplicacion(3, 4)).toBe(12);
  });
  test('multiplicacion 0 * 5 = 0', () => {
    expect(calc.multiplicacion(0, 5)).toBe(0);
  });
  test('multiplicacion -2 * 3 = -6', () => {
    expect(calc.multiplicacion(-2, 3)).toBe(-6);
  });
  test('division 10 / 2 = 5', () => {
    expect(calc.division(10, 2)).toBe(5);
  });
  test('division 9 / 3 = 3', () => {
    expect(calc.division(9, 3)).toBe(3);
  });
  test('division 5 / 0 lanza error', () => {
    expect(() => calc.division(5, 0)).toThrow('No se puede dividir por cero');
  });
});
