const Project = require('../models/project');

// Lista inicial de tareas (simulando una base de datos en memoria)
let projects = [
   new Project(1, 'Proyecto 1', 'Description 01', "2024-09-01", "2025-02-01", 'En progreso', ["Carlos Pérez", "Ana Gómez", "Luis Martínez"], 50000),
   new Project(2, 'Proyecto 2', 'Description 02', "2024-09-01", "2025-02-01", 'En progreso', ["Carlos Pérez", "Sofia H", "Luis Martínez"], 50000),
   new Project(3, 'Proyecto 3', 'Description 03', "2024-09-01", "2025-02-01", 'En progreso', ["Carlos Pérez", "Liliana M", "Luis Martínez"], 50000),
   new Project(4, 'Proyecto 4', 'Description 04', "2024-09-01", "2025-02-01", 'En progreso', ["Carlos Pérez", "Rodolfo F", "Luis Martínez"], 50000),
   new Project(5, 'Proyecto 5', 'Description 05', "2024-09-01", "2025-02-01", 'En progreso', ["Carlos Pérez", "Talia L", "Luis Martínez"], 50000),
];

// Función para obtener todas las tareas
// Retorna la lista completa de tareas
function getAllProjects() {
    return projects;
}

// Función para obtener una tarea específica por ID
// Parámetros:
//   id (Number): ID de la tarea a buscar
// Retorna la tarea correspondiente o null si no se encuentra
function getProject(id) {
    return projects.find(t => t.id == id) || null;
}

// Función para obtner un ID unico y nuevo dentro del arreglo de projects
// Retorna un numero correspondiente al id mas grande actual más 1
function newID() {
    const maxID = projects.length > 0 ? Math.max(...projects.map(t => t.id)) : 0;
    return maxID + 1;
}

// Función para crear una nueva tarea
// Parámetros:
//   title (String): Título de la tarea
//   description (String): Descripción de la tarea
// Retorna la tarea recién creada
function createProject(name, description, startDate, endDate, status, teamMembers, budget){
    // Crear una nueva instancia de Project con un ID único
    // const newProject = new Project(projects.length + 1, title, description);

    const newProject = new Project(newID(), name, description, startDate, endDate, status, teamMembers, budget);

    // Añadir la nueva tarea a la lista de tareas
    projects.push(newProject);
    // Retornar la tarea creada
    return newProject;
}

// Función para eliminar una tarea por ID
// Parámetros:
//   id (Number): ID de la tarea a eliminar
// Retorna la tarea eliminada o null si no se encuentra
function deleteProject(id){
    // Encontrar el índice de la tarea a eliminar
    const index = projects.findIndex(t => t.id == id);

    // Si la tarea se encuentra, eliminarla
    if(index !== -1){
        // Eliminar la tarea del array y retornar la tarea eliminada
        const [deletedProject] = projects.splice(index, 1);
        return deletedProject;
    }
    // Retornar null si la tarea no se encuentra
    return null;
}

// Función para actualizar una tarea existente
// Parámetros:
//   id (Number): ID de la tarea a actualizar
//   title (String): Nuevo título de la tarea
//   description (String): Nueva descripción de la tarea
//   completed (Boolean): Nuevo estado de completado de la tarea
// Retorna la tarea actualizada o null si no se encuentra
function updateProject(id, name, description, startDate, endDate, status, teamMembers, budget){
    // Encontrar la tarea por ID
    const project = projects.find(t => t.id == id);

    if(project){
        // Actualizar los campos de la tarea
        project.name = name || project.name;
        project.description = description || project.description;
        project.startDate = startDate || project.startDate;
        project.endDate = endDate || project.endDate;
        project.teamMembers = teamMembers || project.teamMembers;
        project.status = status || project.status; 
        project.budget = budget || project.budget;

        // Retornar la tarea actualizada
        return project;
    }
    // Retornar null si la tarea no se encuentra
    return null;
}

// Exportar las funciones del controlador para su uso en otras partes de la aplicación
module.exports = {
    getAllProjects,
    createProject,
    deleteProject,
    getProject,
    updateProject,
};
