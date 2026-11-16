import { describe, it, expect } from 'vitest';
import { 
    validarCedula, 
    validarNombreCompleto, 
    validarFechaCitaNoPasada, 
    verificarCitaDuplicada 
} from './reglas-eps';

describe('Reglas de Negocio - EPS Vida Sana', () => {
    
    it('valida correctamente un número de documento válido', () => {
        expect(validarCedula('10452345')).toBe(true);
    });

    it('rechaza un documento que contenga letras (caso límite)', () => {
        expect(validarCedula('1045A234')).toBe(false);
    });

    it('aprueba un nombre de usuario formado solo por letras y espacios', () => {
        expect(validarNombreCompleto('Naim Pacheco')).toBe(true);
    });

    it('rechaza una fecha de cita en el pasado', () => {
        expect(validarFechaCitaNoPasada('01/01/2020')).toBe(false);
    });

    it('detecta correctamente si ya existe una cita duplicada en el mismo horario', () => {
        const citasActuales = [{ fecha: '24/11/2026', hora: '08:00' }];
        const esDuplicada = verificarCitaDuplicada(citasActuales, '24/11/2026', '08:00');
        expect(esDuplicada).toBe(true);
    });

});