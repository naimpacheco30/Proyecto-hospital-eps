# ADR-001: Diseño del almacenamiento del proyecto en Amazon S3
Fecha: 2026-10-20
Autor: Sebastian Perez
Estado: Aceptada

## Contexto
El proyecto integrador requiere un sistema de almacenamiento persistente, seguro y durable en la nube utilizando Amazon S3. Actualmente el sitio web está desplegado, pero carece de mecanismos de recuperación ante borrados accidentales, segmentación adecuada de datos sensibles de usuarios y políticas de optimización de costos para el versionado, lo que genera riesgos operativos y un crecimiento descontrolado del almacenamiento.

## Decision
Se adoptó una arquitectura basada en dos buckets diferenciados: un bucket público optimizado para el alojamiento del sitio web estático con versionado activo, y un bucket privado estructurado mediante prefijos lógicos (uploads/, documentos/, respaldos/) para aislar la información sensible. Asimismo, se implementó una política de ciclo de vida automatizada para la transición de objetos a clases de menor costo y la purga de versiones no vigentes.

## Alternativas consideradas
1. Usar un único bucket S3 para absolutamente todo (tanto el sitio web como los datos privados): Se descartó porque mezcla la exposición pública con datos sensibles de usuarios, complicando la seguridad mediante políticas de acceso.
2. Mantener el versionado apagado en todos los buckets para ahorrar costos: Se descartó porque elimina por completo la tolerancia a fallos ante errores humanos de borrado de archivos estáticos críticos del sitio web.
3. Alojar el sitio estático únicamente en Netlify y usar S3 solo para backend: Se descartó para cumplir obligatoriamente con los lineamientos de infraestructura evaluados en AWS S3 del curso.

## Consecuencias
### Positivas
- Recuperación inmediata ante eliminaciones accidentales gracias al versionado y los delete markers.
- Estructura limpia y segura mediante prefijos en el bucket privado.
- Reducción de costos a largo plazo mediante la automatización del ciclo de vida.
### Costos o desventajas que aceptamos
- El versionado incrementa el volumen total de almacenamiento consumido hasta que la regla de ciclo de vida elimine las versiones obsoletas.
### Que habria que revisar mas adelante
- Ajustar los plazos de transición a Glacier y la retención de versiones basándose en las métricas reales de uso del sistema en producción.
```[cite: 7]
