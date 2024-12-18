export class Helpers {

  static nameValidate(name: string): boolean {
    const re = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;
    return re.test(name) && name.length <= 50 && name.length >= 2;
}

  static emailValidate(email: string): boolean {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
  }

  static passwordValidate(pass: string): boolean {
    // Expresión regular para validar la pass
    const regex = /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[A-Z]).{8,}$/;
  
    // Verifica si la pass cumple con la expresión regular
    return regex.test(pass);
  }

  static stringToNumberArray = (chain: string): number[] => {
    const longitud = chain.length;
    const arrayNumber: number[] = [];
    for (let i = 0; i < longitud; i++) {
      arrayNumber.push(parseInt(chain[i]));
    }
    return arrayNumber;
  };

  static dniValidate(chain: string): boolean {
    // Convertir la cadena a un array de números
    const cad = Helpers.stringToNumberArray(chain);
    const longitud = cad.length;

    // Validar longitud (la cédula ecuatoriana debe tener exactamente 10 dígitos)
    if (longitud !== 10) return false;

    // Validar código de provincia (los dos primeros dígitos deben estar entre 1 y 24, o ser 30)
    const provincia = parseInt(chain.substring(0, 2), 10);
    if ((provincia < 1 || provincia > 24) && provincia !== 30) return false;

    // Validar el tercer dígito (debe ser menor a 6 para cédulas)
    if (cad[2] >= 6) return false;

    // Calcular el dígito verificador
    let total = 0;
    const longcheck = longitud - 1; // Excluir el último dígito (dígito verificador)
    for (let i = 0; i < longcheck; i++) {
        if (i % 2 === 0) {
            let aux = cad[i] * 2;
            if (aux > 9) aux -= 9;
            total += aux;
        } else {
            total += cad[i];
        }
    }

    // Calcular el dígito verificador esperado
    const digitoVerificador = total % 10 ? 10 - (total % 10) : 0;

    // Verificar que el último dígito coincida con el dígito verificador
    return cad[longitud - 1] === digitoVerificador;
}

  static phoneValidate(phone: string): boolean {
    // Comprueba si la longitud de la cadena es 10
    if (phone.length !== 10) {
      return false;
    }

    // Comprueba si todos los caracteres son numéricos
    for (let i = 0; i < phone.length; i++) {
      if (isNaN(Number(phone[i]))) {
        return false;
      }
    }

    // Si pasa ambas validaciones, devuelve true
    return true;
  }
}