# Kike Estrada Music

Landing page de una sola página para el artista musical **Kike Estrada**.

## Stack

- Pug + Sass + JavaScript Vanilla
- Compilación con [Prepros](https://prepros.io)
- Arquitectura BEM por módulo

## Módulos

| Módulo | Archivos |
| --- | --- |
| Menú | `main-menu.pug` / `_main-menu.scss` / `mainMenu.js` |
| Hero | `hero.pug` / `_hero.scss` |
| Sobre mí | `about.pug` / `_about.scss` |
| Proyectos | `projects.pug` / `_projects.scss` |
| Discografía | `discography.pug` / `_discography.scss` |
| Música | `music.pug` / `_music.scss` |
| Galería | `gallery.pug` / `_gallery.scss` |
| Footer | `site-footer.pug` / `_site-footer.scss` |

El contenido editable vive en `src/pug/data/*-data.pug`.

## Idiomas

- Español: `public/index.html` (`locale = 'es'`)
- English: `public/en.html` (`locale = 'en'`)

El copy vive en `src/pug/data/*-data.pug` con claves `es` / `en`. El selector ES | EN aparece en el menú y el footer.

## Desarrollo

1. Abre el proyecto en Prepros.
2. Edita fuentes en `src/`.
3. Prepros emite HTML, CSS y JS en `public/`.
4. Tras cambios publicados de CSS/JS: `npm run build` (sube `assetVersion`).

## CDNs

- Swiper 11 (`swiper-bundle` CSS/JS)
- Google Fonts: Cormorant Garamond + Outfit
- Embeds de Spotify y YouTube en el módulo `music`
