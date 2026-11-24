require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {
  validarCedula,
  validarNombreCompleto,
  validarFechaCitaNoPasada,
  existeCitaDuplicada,
} = require('./reglas-eps');

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || '*';

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

const citas = [];

// Función centralizada de respuesta HTTP (DRY)
function enviarRespuesta(res, status, ok, mensaje, datos = null) {
  return res.status(status).json({ ok, mensaje, datos });
}

app.get('/citas/resumen', (req, res) => {
  return enviarRespuesta(res, 200, true, 'Resumen de citas', {
    total: citas.length,
    citas,
  });
});

app.post('/citas', (req, res) => {
  const { documento, nombre, fecha, hora, especialidad } = req.body;

  if (!validarCedula(documento)) {
    return enviarRespuesta(res, 400, false, 'Documento inválido');
  }
  if (!validarNombreCompleto(nombre)) {
    return enviarRespuesta(res, 400, false, 'Nombre inválido');
  }
  if (!validarFechaCitaNoPasada(fecha)) {
    return enviarRespuesta(res, 400, false, 'Fecha inválida o en el pasado');
  }
  if (existeCitaDuplicada(citas, fecha, hora)) {
    return enviarRespuesta(res, 400, false, 'Ya existe una cita en ese horario');
  }

  const nuevaCita = { documento, nombre, fecha, hora, especialidad };
  citas.push(nuevaCita);
  return enviarRespuesta(res, 201, true, 'Cita registrada', nuevaCita);
});

app.listen(PORT, () => {
  console.log(`Servidor EPS Vida Sana corriendo en puerto ${PORT}`);
});
