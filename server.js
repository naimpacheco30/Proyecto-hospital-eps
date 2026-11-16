const express = require('express');
const cors = require('cors');
const { validarCedula, validarFechaCitaNoPasada, verificarCitaDuplicada } = require('./logica/reglas-eps');

const app = express();
app.use(express.json());
app.use(cors());

// Simulación de base de datos en memoria para el reporte
let citasBD = [
    { id: 1, documento: '1045231234', tipo: 'General', fecha: '2026-11-20', hora: '08:00', sede: 'Prado' }
];

// Ruta para obtener el resumen de citas (Evidencia principal para la IP)
app.get('/citas/resumen', (req, res) => {
    res.json({
        proyecto: "EPS Vida Sana - Sistema de Gestión de Citas",
        equipo: "Equipo 34",
        totalCitas: citasBD.length,
        citas: citasBD
    });
});

// Ruta para agendar citas aplicando validaciones
app.post('/citas', (req, res) => {
    const { documento, tipo, fecha, hora, sede, extra } = req.body;

    if (!documento || !tipo || !fecha || !hora || !sede) {
        return res.status(400).json({ error: 'Faltan campos obligatorios para agendar la cita' });
    }

    if (!validarCedula(documento)) {
        return res.status(400).json({ error: 'El documento de identidad debe contener solo números' });
    }

    if (!validarFechaCitaNoPasada(fecha)) {
        return res.status(400).json({ error: 'No puedes agendar una cita en una fecha pasada' });
    }

    if (verificarCitaDuplicada(citasBD, fecha, hora)) {
        return res.status(400).json({ error: 'Ya existe una cita programada en este mismo horario' });
    }

    const nuevaCita = {
        id: Date.now(),
        documento,
        tipo,
        fecha,
        hora,
        sede,
        extra: extra || 'Sin detalle adicional'
    };

    citasBD.push(nuevaCita);
    res.status(201).json(nuevaCita);
});

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
    console.log(`API de EPS Vida Sana escuchando en el puerto ${PUERTO}`);
});