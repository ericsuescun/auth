const express = require('express');
const app = express();
var User = require('./models/user');	//Importo el modelo creado para User
var routes = require('./routes');	//Importo el enrutador

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded());
app.use('/', routes);	//Agrego a la ruta / (sin prefijo) lo que tengo en routes.js

app.listen(3000, console.log('Listening on port 3000!'));