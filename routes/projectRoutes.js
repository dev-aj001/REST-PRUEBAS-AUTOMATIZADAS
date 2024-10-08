// const express = require('express');
// const projectController = require('../controllers/projectController');
// const { esFechaValida } = require('../controllers/projectController');

// // Crear una instancia del enrutador de Express
// const router = express.Router();

// // Método GET all (obtener todas las tareas)
// // Ruta: GET /projects
// // Obtiene todas las tareas desde el controlador y las devuelve en formato JSON
// router.get('/', function(req, res){
//     // Obtener todas las tareas llamando a la función getAllProjects del controlador
//     const projects = projectController.getAllProjects();
//     // Responder con el código de estado 200 y las tareas en formato JSON
//     if(projects.length > 0){
//         res.status(200).json(projects);
//     }else{
//         res.status(404).json({code: '404', message: 'Projects not found'});
//     }
// });

// // Método GET id (obtener una tarea por ID)
// // Ruta: GET /projects/:id
// // Obtiene una tarea específica por su ID desde el controlador
// router.get('/:id', function(req, res){
//     // Obtener el ID de la tarea desde el parámetro de la URL
//     const id = req.params.id;

//     // Llamar a la función getProject del controlador con el ID obtenido
//     const project = projectController.getProject(id);

//     // Verificar si la tarea fue encontrada
//     if(project){
//         // Responder con el código de estado 200 y la tarea en formato JSON
//         res.status(200).json(project);
//     }else{
//         // Responder con el código de estado 404 y un mensaje de "Tarea no encontrada"
//         res.status(404).json({code: 404, message: 'Project not found'});
//     }
// });

// // Método POST (crear una nueva tarea)
// // Ruta: POST /projects
// // Crea una nueva tarea con los datos proporcionados en el cuerpo de la solicitud
// router.post('/', function(req, res){
//     // Obtener los datos de la nueva tarea del cuerpo de la solicitud
//     const { name, description, startDate, endDate, teamMembers, status, budget } = req.body;


//     const statusFormated = status.toLowerCase(); 
//     // Llamar a la función createProject del controlador para crear la nueva tarea
    
//     // Responder con el código de estado 200 y la nueva tarea en formato JSON

//     let messageObject = {};

//     let count = 0;

//     if( !name ){
//         count++;
//         messageObject['message '+count] = 'name parameter required';
//     }

//     if(!esFechaValida(startDate) || !esFechaValida(endDate)){
//         count++;
//         messageObject['message '+count] = 'invalid date format';
//     }else{
//         const fecha1 = new Date(startDate);
//         const fecha2 = new Date(endDate);

//         if(fecha1>fecha2){
//             count++;
//             messageObject['message '+count] = 'The end date must not be earlier than the start date.';
//         }
//     }
     
//     if(statusFormated !== 'pendiente' && statusFormated !== 'en progreso' && statusFormated !== 'completado'){
//         count++;
//         messageObject['message '+count] = status + ' is not a valid status';
//     }
//     if(budget < 0){
//         count++;
//         messageObject['message '+count] = 'budget value must be positive';
//     }
//     const length = Object.keys(messageObject).length

//     if(length == 0){
//         const project = projectController.createProject(name, description, startDate, endDate, statusFormated, teamMembers, budget);
//         res.status(200).json(project);
//     }
//     else{
//         messageObject.code = 400;
//         res.status(400).json(messageObject);
//     }

// });

// // Método DELETE (eliminar una tarea)
// // Ruta: DELETE /projects/:id
// // Elimina una tarea específica por su ID desde el controlador
// router.delete('/:id', function(req, res){
//     // Obtener el ID de la tarea desde el parámetro de la URL
//     const id = req.params.id;

//     // Llamar a la función deleteProject del controlador con el ID obtenido
//     const project = projectController.deleteProject(id);

//     // Verificar si la tarea fue encontrada y eliminada
//     if(project){
//         // Responder con el código de estado 200 y la tarea eliminada en formato JSON
//         res.status(200).json(project);
//     }else{
//         // Responder con el código de estado 404 y un mensaje de "Tarea no encontrada"
//         res.status(404).json({code: 404, message: 'Project not found' });
//     }
// });

// // Método PUT (actualizar una tarea)
// // Ruta: PUT /projects/:id
// // Actualiza una tarea específica con los datos proporcionados en el cuerpo de la solicitud
// router.put('/:id', function(req, res){
//     // Obtener el ID de la tarea desde el parámetro de la URL
//     const id = req.params.id;
//     // Obtener los datos de la tarea a actualizar del cuerpo de la solicitud
//     const { name, description, startDate, endDate, status, teamMembers, budget } = req.body;

//     const statusFormated = status.toLowerCase();

//     // Llamar a la función updateProject del controlador para actualizar la tarea
//     const project = projectController.updateProject(id, name, description, startDate, endDate, status, teamMembers, budget);

//     let messageObject = {};

//     let count = 0;

//     if( !name ){
//         count++;
//         messageObject['message '+count] = 'name parameter required';
//     }
    
//     if(!esFechaValida(startDate) || !esFechaValida(endDate)){
//         count++;
//         messageObject['message '+count] = 'invalid date format';
//     }else{
//         const fecha1 = new Date(startDate);
//         const fecha2 = new Date(endDate);

//         if(fecha1>fecha2){
//             count++;
//             messageObject['message '+count] = 'The end date must not be earlier than the start date.';
//         }
//     }
     
//     if(statusFormated !== 'pendiente' && statusFormated !== 'en progreso' && statusFormated !== 'completado'){
//         count++;
//         messageObject['message '+count] = status + ' is not a valid status';
//     }
//     if(budget < 0){
//         count++;
//         messageObject['message '+count] = 'budget value must be positive';
//     }



//     const length = Object.keys(messageObject).length

    
//     if(project){
//         if(length == 0){
//             res.status(200).json(project);
//         }
//         else{
//             messageObject.code = 400;
//             res.status(400).json(messageObject);
//         }
//     }else{
//         res.status(400).json({code: 404, message: 'Project not found'});
//     }
// });



// // Exportar el enrutador para su uso en la aplicación principal
// module.exports = router;


const express = require('express');

const projectController 
    = require('../controllers/projectController');

const authenticateToken = 
    require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, projectController.getAllProjects);
router.post('/', authenticateToken, projectController.createProject);

module.exports = router;