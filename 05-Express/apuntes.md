EXPRESS:

Es un framework web para Node.js.

npm install express
en mi App:

```javascript
var express = require('express');
var app = express();

app.get('/', (req, res) => {
// siempre un status de 200, de lo contrario invitamos a res.status();
res.send('Hello');
})

app.listen(3000);
```

Las peticiones van a tener métodos HTTP (get, post, delete, put). Éstos reciben dos párametros, 
el path, y una función (que recibe un request, y un response como params). 
Si utilizamos middlewares (funciones), las peticiones también reciben un tercer parámetro, el cual va en
segunda posición.

Todos los middlewares tienen next() al final.

Si queremos que ese middleware se aplique a todas las rutas, 

```javascript
app.use(express.json());
```
Express Router.

en router.js

```javascript
var express = require('express');
var router = express.router();

// aquí las rutas:

router.get('/', (req, res) => {
    res.send('An empty string ...')
})

module.exports = router;

// en app.js: app.use ('/about', routes);
```

Nos sirve para que las rutas no se pisen, y para tener un mejor ordenamiento y workflow sobre las rutas.   