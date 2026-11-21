// Constantes del sistema de salud (Evita números mágicos)
const EDAD_MINIMA_PERMITIDA = 0;
const MAX_CITAS_POR_HORARIO = 1;

function validarCedula(documento) {
  if (!documento) return false;
  return /^\d+$/.test(documento.toString().trim());
}

function validarNombreCompleto(nombre) {
  if (!nombre) return false;
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre.trim());
}

function validarFechaCitaNoPasada(fechaStr) {
  try {
    const [dia, mes, anio] = fechaStr.split('/').map(Number);
    if (!dia || !mes || !anio) return false;
    const fechaIngresada = new Date(anio, mes - 1, dia);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return fechaIngresada >= hoy;
  } catch {
    return false;
  }
}

function existeCitaDuplicada(citas, fecha, hora) {
  const coincidencias = citas.filter(
    (c) => c.fecha === fecha && c.hora === hora
  );
  return coincidencias.length >= MAX_CITAS_POR_HORARIO;
}

module.exports = {
  EDAD_MINIMA_PERMITIDA,
  MAX_CITAS_POR_HORARIO,
  validarCedula,
  validarNombreCompleto,
  validarFechaCitaNoPasada,
  existeCitaDuplicada,
};
