import Calculadora from './calculadora';

describe('Calculadora - tests que fallan', () => {
  const calc = new Calculadora();

  test('suma 2 + 2 = 5 (fallo)', () => {
    expect(calc.suma(2, 2)).toBe(5);
  });
  test('resta 10 - 5 = 10 (fallo)', () => {
    expect(calc.resta(10, 5)).toBe(10);
  });
  test('multiplicacion 2 * 2 = 5 (fallo)', () => {
    expect(calc.multiplicacion(2, 2)).toBe(5);
  });
  test('division 8 / 2 = 1 (fallo)', () => {
    expect(calc.division(8, 2)).toBe(1);
  });
  test('suma 0 + 0 = 1 (fallo)', () => {
    expect(calc.suma(0, 0)).toBe(1);
  });
  test('resta 1 - 1 = 2 (fallo)', () => {
    expect(calc.resta(1, 1)).toBe(2);
  });
  test('multiplicacion 3 * 3 = 10 (fallo)', () => {
    expect(calc.multiplicacion(3, 3)).toBe(10);
  });
  test('division 6 / 3 = 1 (fallo)', () => {
    expect(calc.division(6, 3)).toBe(1);
  });
  test('suma 7 + 3 = 20 (fallo)', () => {
    expect(calc.suma(7, 3)).toBe(20);
  });
  test('resta 8 - 4 = 0 (fallo)', () => {
    expect(calc.resta(8, 4)).toBe(0);
  });
  test('multiplicacion 5 * 5 = 100 (fallo)', () => {
    expect(calc.multiplicacion(5, 5)).toBe(100);
  });
  test('division 12 / 4 = 2 (fallo)', () => {
    expect(calc.division(12, 4)).toBe(2);
  });
  test('suma 1 + 1 = 3 (fallo)', () => {
    expect(calc.suma(1, 1)).toBe(3);
  });
  test('resta 3 - 2 = 5 (fallo)', () => {
    expect(calc.resta(3, 2)).toBe(5);
  });
  test('multiplicacion 4 * 2 = 9 (fallo)', () => {
    expect(calc.multiplicacion(4, 2)).toBe(9);
  });
  test('division 15 / 5 = 1 (fallo)', () => {
    expect(calc.division(15, 5)).toBe(1);
  });
  test('suma 6 + 6 = 13 (fallo)', () => {
    expect(calc.suma(6, 6)).toBe(13);
  });
  test('resta 9 - 3 = 9 (fallo)', () => {
    expect(calc.resta(9, 3)).toBe(9);
  });
  test('multiplicacion 2 * 5 = 20 (fallo)', () => {
    expect(calc.multiplicacion(2, 5)).toBe(20);
  });
  test('division 20 / 4 = 10 (fallo)', () => {
    expect(calc.division(20, 4)).toBe(10);
  });
});
