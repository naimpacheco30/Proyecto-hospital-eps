# Sistema de Gestión de Citas - EPS Vida Sana

Sistema para registrar y consultar citas médicas de la EPS Vida Sana. Proyecto de Buenas Prácticas de Desarrollo de Software, Universidad de la Costa (CUC), Equipo 34.

## Integrantes
- Sebastian Perez
- Naim Pacheco
- Samuel Dominguez

## Tecnologías
- Node.js 18 y Express (back-end)
- HTML, CSS y JavaScript (front-end)
- Vitest (pruebas unitarias)
- dotenv (variables de entorno)
- AWS S3 (front-end) y AWS EC2 (back-end)

## Instrucciones de ejecución local
```bash
git clone https://github.com/naimpacheco30/Proyecto-hospital-eps
cd Proyecto-hospital-eps
git checkout feature/logica-negocio-dry
cd logica
npm install
cp env.example.txt .env     # edita los valores si es necesario
node server.js
```
El servidor queda en `http://localhost:3000`. Abre `index.html` en el navegador para usar el front-end.

Variables de entorno (`.env`):
| Variable | Descripción |
|---|---|
| PORT | Puerto del servidor (por defecto 3000) |
| FRONTEND_URL | URL del front-end permitida por CORS |

## Endpoints
| Método | Ruta | Descripción | Respuesta / Código |
|---|---|---|---|
| GET | /citas/resumen | Retorna el listado completo y contador de citas activas | JSON / 200 OK |
| POST | /citas | Registra una nueva cita aplicando validaciones de negocio | JSON / 201 Created o 400 Bad Request |

## Pruebas
Las reglas de negocio se prueban con Vitest (documento válido, documento con letras, nombre válido, fecha no pasada y cita duplicada).
```bash
cd logica
npm test
```
Resultado esperado: 5 pruebas aprobadas. Auditoría de dependencias: `npm audit` (0 vulnerabilidades).

## Despliegue
- **Front-end (AWS S3):** http://cuc-bp-eq34-perez-sitio-2026.s3-website-us-east-1.amazonaws.com
- **Back-end (AWS EC2):** instancia con Node.js, accesible por el puerto 3000. CORS restringido al dominio del front-end mediante `FRONTEND_URL`.
- Los secretos no se suben al repositorio: se usa `env.example.txt` y `.gitignore`.
