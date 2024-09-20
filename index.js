const express = require('express');
const bodyParser = require('body-parser');

const projectRoutes = require('./routes/projectRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/projects',projectsRoutes);

const PORT =  3000;

app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log('Servidor corriendo en el puerto '+ PORT);
});

module.exports = app;