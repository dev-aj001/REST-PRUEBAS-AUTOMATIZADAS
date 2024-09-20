const express = require('express');
const bodyParser = require('body-parser');

const taskRoutes = require('./routes/projectRouter');

const app = express();

app.use(bodyParser.json());
app.use('/projects',taskRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => { 
    console.log('Server listening on port ' + PORT);
});


module.exports = app;