# Sistema de Gestión de Citas - EPS Vida Sana

Sistema integral y modular para la administración, registro, agendamiento y control de citas médicas multidisciplinares para usuarios de la EPS Vida Sana[cite: 1, 2].

---

## 🌐 Enlaces del Proyecto

* **Repositorio en GitHub:** [https://github.com/naimpacheco30/Proyecto-hospital-eps](https://github.com/naimpacheco30/Proyecto-hospital-eps)
* **Despliegue en Producción (Netlify):** [https://hospital-eps.netlify.app/](https://hospital-eps.netlify.app/)
## 👥 Integrantes del Equipo

Integrantes: Sebastian Perez, Naim Pacheco y Samuel Dominguez

## 📋 Funcionalidades Principales

1. **Autenticación y Registro Seguro de Usuarios:** Control de acceso y creación de cuentas con validación numérica para documentos y contraseñas[cite: 1, 2].
2. **Agendamiento Multidisciplinar:** Programación de citas para 5 especialidades médicas (Médico general, Psicología, Odontología, Toma de muestras y Especialistas)[cite: 1, 2].
3. **Manejo Dinámico de Formularios:** Adaptación de campos según el tipo de atención (selección de tipo de sesión para psicología, detalles de muestras o procedimientos odontológicos)[cite: 1, 2].
4. **Validaciones de Seguridad:** Prevención de citas en horarios o fechas pasadas y bloqueo de citas duplicadas en el mismo rango horario[cite: 1, 2].
5. **Gestión Integral de Agenda:** Módulos interactivos para consultar el historial de citas activas, reprogramar fechas/horas y cancelar citas agendadas[cite: 1, 2].
6. **Persistencia de Datos:** Almacenamiento estructurado en JSON para entorno de escritorio y almacenamiento local para la plataforma web[cite: 2].
   git clone [https://github.com/naimpacheco30/Proyecto-hospital-eps.git](https://github.com/naimpacheco30/Proyecto-hospital-eps.git)
   ## Despliegue en AWS
| Integrante | URL del sitio | Bucket público | Bucket privado |
| Naim Pacheco | http://cuc-bp-eq34-pacheco-sitio-2026.s3-website-us-east-1.amazonaws.com | cuc-bp-eq34-pacheco-sitio-2026 | cuc-bp-eq34-pacheco-privado-2026 |
Migramos el proyecto de Netlify a Amazon S3 para empezar a usar servicios de nube reales y tener mayor control de la infraestructura. Para lograr esto creamos dos buckets con propósitos distintos: el bucket público (al que le quitamos el bloqueo y le pusimos una política especial de lectura) es el que se encarga de mostrar la página web y permitir que cualquiera la visite en internet sin problemas; mientras que el bucket privado mantiene activado el bloqueo total para asegurarnos de que nadie por fuera pueda ver los archivos internos, protegiendo así los datos sensibles de la aplicación.

## 📐 Registro de Decisiones de Arquitectura (ADR) - AWS S3

1. **Versionado de Objetos en Bucket Público (`cuc-bp-eq34-pacheco-sitio-2026`)**:
   - *Decisión*: Habilitar el versionado en el bucket de producción.
   - *Justificación*: Permite proteger el sitio web frente a eliminaciones accidentales o sobreescrituras erróneas de archivos estáticos (como el `index.html`), facilitando la recuperación rápida mediante la eliminación de marcadores de eliminación.

2. **Políticas de Ciclo de Vida y Optimización de Costos (`retencion-sitio`)**:
   - *Decisión*: Automatizar la transición de versiones actuales a *Standard-IA* a los 30 días y la purga permanente de versiones no vigentes a los 180 días.
   - *Justificación*: Optimiza los costos de almacenamiento en la nube a largo plazo al evitar la acumulación indefinida de respaldos y archivos históricos obsoletos.
