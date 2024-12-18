import { Helpers } from "../../patients/domain/helpers/helpers"; 

describe('Helpers', () => {
  // Validación de nombres
  it('nameValidate: debe retornar true para un nombre válido', () => {
    expect(Helpers.nameValidate('John Doe')).toBe(true);
  });

  it('nameValidate: debe retornar false para un nombre con caracteres no válidos', () => {
    expect(Helpers.nameValidate('John123')).toBe(false);
  });

  // Validación de correos electrónicos
  it('emailValidate: debe retornar true para un correo válido', () => {
    expect(Helpers.emailValidate('test@example.com')).toBe(true);
  });

  it('emailValidate: debe retornar false para un correo sin "@"', () => {
    expect(Helpers.emailValidate('testexample.com')).toBe(false);
  });

  // Validación de contraseñas
  it('passwordValidate: debe retornar true para una contraseña válida', () => {
    expect(Helpers.passwordValidate('Passw0rd!')).toBe(true);
  });

  it('passwordValidate: debe retornar false para una contraseña sin caracteres especiales', () => {
    expect(Helpers.passwordValidate('Password1')).toBe(false);
  });

  // Validación de cédulas ecuatorianas
  it('dniValidate: debe retornar true para una cédula válida', () => {
    expect(Helpers.dniValidate('1150579124')).toBe(true);
  });

  it('dniValidate: debe retornar false para una cédula con longitud incorrecta', () => {
    expect(Helpers.dniValidate('171717')).toBe(false);
  });

  it('dniValidate: debe retornar false para una cédula con dígito verificador incorrecto', () => {
    expect(Helpers.dniValidate('1717171718')).toBe(false);
  });

  // Validación de teléfonos
  it('phoneValidate: debe retornar true para un número de teléfono válido', () => {
    expect(Helpers.phoneValidate('0987654321')).toBe(true);
  });

  it('phoneValidate: debe retornar false para un número de teléfono con caracteres no numéricos', () => {
    expect(Helpers.phoneValidate('09876abc21')).toBe(false);
  });
});
