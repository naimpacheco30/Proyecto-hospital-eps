# Proyecto-hospital-eps
## Despliegue en AWS

| Integrante | URL del sitio | Bucket público | Bucket privado |
|---|---|---|---|
| Dominguez | http://cuc-bp-eq34-dominguez-sitio-2026.s3-website-us-east-1.amazonaws.com | cuc-bp-eq34-dominguez-sitio-2026 | cuc-bp-eq34-dominguez-privado-2026 |

### Descripción del despliegue

El proyecto EPS Vida Sana se trasladó de Netlify a Amazon S3 como parte de la implementación de infraestructura en AWS. Para esto se crearon dos buckets: uno público, que permite alojar y visualizar nuestra página web desde internet, y otro privado, que restringe el acceso a los archivos internos. Con esta configuración aplicamos los principios de seguridad y control de acceso vistos en clase.
