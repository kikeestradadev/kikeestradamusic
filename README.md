# Kike Estrada Music

Landing page oficial del artista **Kike Estrada**, orientada a contratación para eventos.

## Stack

- Pug + Sass + JavaScript Vanilla
- Compilación con [Prepros](https://prepros.io)
- Arquitectura BEM por módulo

## Módulos

| Módulo | Archivos |
| --- | --- |
| Menú | `main-menu.pug` / `_main-menu.scss` / `mainMenu.js` |
| Hero | `hero.pug` / `_hero.scss` |
| Sobre Kike | `about.pug` / `_about.scss` |
| Eventos | `events.pug` / `_events.scss` |
| Videos destacados | `featured-videos.pug` / `_featured-videos.scss` / `featuredVideos.js` |
| Reseñas | `reviews.pug` / `_reviews.scss` |
| Trayectoria | `trajectory.pug` / `_trajectory.scss` |
| Galería | `gallery.pug` / `_gallery.scss` / `gallery.js` |
| Contacto | `contact.pug` / `_contact.scss` |
| Footer | `site-footer.pug` / `_site-footer.scss` |

El contenido editable vive en `src/pug/data/*-data.pug`.

## Idiomas

- Español: `public/index.html` (`locale = 'es'`)
- English: `public/en.html` (`locale = 'en'`)

El copy vive en `src/pug/data/*-data.pug` con claves `es` / `en`. El toggle de idioma (`lang-toggle`) usa banderas de España y EE. UU. en el menú y el footer.

## Desarrollo

1. Abre el proyecto en Prepros.
2. Edita fuentes en `src/`.
3. Prepros emite HTML, CSS y JS en `public/`.
4. Tras cambios publicados de CSS/JS: `npm run build` (sube `assetVersion`).

## CDNs

- Swiper 11 (`swiper-bundle` CSS/JS)
- Google Fonts: Cormorant Garamond + Outfit
- Miniaturas y embeds de YouTube en `featured-videos`
