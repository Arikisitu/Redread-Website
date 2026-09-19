# RedRead Website

RedRead landing page with direct APK download, app branding, animation, and an optional screenshot gallery.

## Download

Direct APK:

`https://github.com/Arikisitu/Redread/releases/download/v1.0.0/app-release.apk`

## Screenshots

The gallery is optional and uses files in:

`screenshots/`

You can use any image filename.

The current package includes six screenshots in order:
1. Home
2. Catalog
3. Library
4. Reader
5. Details
6. Website preview

### Add / remove screenshots

1. Add or remove `.png`, `.jpg`, `.jpeg`, `.webp`, or `.gif` files in `screenshots/`.
2. Double-click `UPDATE_SCREENSHOTS.bat`.
3. Refresh `index.html`.

The script generates both `screenshots.json` and the local gallery manifest.

The website order follows the filename order. Numeric prefixes such as `01-`, `02-`, `03-` make ordering easy.

When no screenshots exist, the entire Screenshots section is hidden.

## Edit screenshots.json

You can also edit `screenshots.json` directly:

```json
[
  {
    "src": "screenshots/my-image.png",
    "title": "MY IMAGE",
    "caption": "My RedRead screenshot"
  }
]
```

## Logo and favicon

The supplied RedRead app icon is used as the website logo, loader logo, hero branding, footer logo, browser favicon, Apple touch icon, and web app icon.

## Local preview

Double-clicking `index.html` works with the included local gallery manifest.

## Hosting

The site is static and can be deployed on GitHub Pages, Netlify, Vercel, or similar static hosting.


## Screenshot layout

The desktop gallery is limited to **9 images maximum**, arranged as:

```text
[ 1 ] [ 2 ] [ 3 ]
[ 4 ] [ 5 ] [ 6 ]
[ 7 ] [ 8 ] [ 9 ]
```

If more than 9 images are listed, only the first 9 are displayed.


## Screenshot layout

Desktop maximum: **6 images total**, arranged **3 across × 2 down**. If more than 6 are listed, only the first 6 are shown.
