# MEExplorer

MEExplorer is a visual analytics framework for exploring machine learning model outputs and sequence-related visualizations.

## Requirements

- Node.js 18 or later
- npm

## Install

From the project root, install dependencies:

```bash
npm install
```

## Run locally

Start the server with:

```bash
node index.js
```

The app listens on `http://localhost:5010`.

## Project layout

- `index.js`: Express server entry point
- `html/home.pug`: main page template
- `public/`: browser-side JavaScript, styles, and data files
- `public/dat/`: CSV files used by the visualizations
- `python_files/`: supporting data directories grouped by model and projection type

## Notes

- Static files are served from `public/`.
- The root route `/` renders the `home` Pug view from `html/home.pug`.
- There is currently no `npm start` script in `package.json`, so use `node index.js` unless you add one.