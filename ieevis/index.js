// const express = require('express');
// const app = express();
// const path = require('path');
// const pug = require('pug');


// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());
// app.use(express.static('/home/vikash05/Desktop/ieevis/html/'));


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'html', 'home.pug'));
// });
// app.set('view engine', 'pug');

// // app.use('/', routes);

// app.listen(5002, () => {
//   console.log('Server is running on port 5002');
// });


const express = require('express');
const app = express();
const path = require('path');
const pug = require('pug');
// const vega= require('vega-lite-api');


// Set the directory where the views (Pug templates) are stored
app.set('views', path.join(__dirname, 'html'));

// Set Pug as the view engine for the application
app.set('view engine', 'pug');

// Middleware for serving static files from 'public' directory
app.use(express.static(__dirname + '/public/'))
app.use(express.static(__dirname + '/public/new_motif_data/'))

app.use(express.static(__dirname + '/node_modules/'))
console.log(__dirname);

// app.use(express.static("/home/vikash05/Desktop/ieevis/public/"));

// Middleware for parsing JSON bodies
app.use(express.json());

// This line seems to be attempting to serve static files from a specific directory outside the project
// It's unusual to directly serve Pug files as static since they should be rendered
// Consider reviewing this if you intended to serve other static files from this directory
// app.use(express.static('/home/vikash05/Desktop/ieevis/html/'));

// Adjusted route to use res.render() for rendering the Pug template
app.get('/', (req, res) => {
  // Assuming 'home' is the name of your Pug template (without the .pug extension)
  res.render('home');
});

// Uncomment and define your routes as needed
// app.use('/', routes);

app.listen(5010, () => {
  console.log('Server is running on port 5010');
});
