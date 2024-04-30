"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = void 0;
class Helpers {
    static nameValidate(name) {
        const re = /^[a-zA-Z]{2,15}$/;
        return re.test(name);
    }
    static emailValidate(email) {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(email);
    }
    static passwordValidate(pass) {
        // Expresión regular para validar la pass
        const regex = /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[A-Z]).{8,}$/;
        // Verifica si la pass cumple con la expresión regular
        return regex.test(pass);
    }
    static dniValidate(chain) {
        const cad = Helpers.stringToNumberArray(chain);
        const longitud = cad.length;
        if (longitud !== 10)
            return false;
        let total = 0;
        const longcheck = longitud - 1;
        for (let i = 0; i < longcheck; i++) {
            if (i % 2 === 0) {
                let aux = cad[i] * 2;
                if (aux > 9)
                    aux -= 9;
                total += aux;
            }
            else {
                total += cad[i];
            }
        }
        total = total % 10 ? 10 - (total % 10) : 0;
        return cad[longitud - 1] === total;
    }
    static phoneValidate(phone) {
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
exports.Helpers = Helpers;
Helpers.stringToNumberArray = (chain) => {
    const longitud = chain.length;
    if (longitud !== 10) {
        throw new Error("Se debe introducir una cadena de texto de 10 caracteres numéricos para la conversión hacia un arreglo de tipo number");
    }
    const arrayNumber = [];
    for (let i = 0; i < longitud; i++) {
        arrayNumber.push(parseInt(chain[i]));
    }
    return arrayNumber;
};
