# Proyecto-hospital-eps

## Despliegue en AWS

| Integrante | URL del sitio | Bucket publico | Bucket privado |
|---|---|---|---|
| Sebastian Perez | http://cuc-bp-eq34-perez-sitio-2026.s3-website-us-east-1.amazonaws.com | cuc-bp-eq34-perez-sitio-2026 | cuc-bp-eq34-perez-privado-2026 |

El sitio dejó de estar en Netlify y pasó a Amazon S3 para empezar a migrar el proyecto a infraestructura real de AWS, por fases. El bucket público aloja el sitio web, que debe ser visible para cualquiera. El bucket privado guarda archivos internos y niega el acceso público, y lo usamos para comprobar que S3 bloquea lo que no se concede de forma explícita.