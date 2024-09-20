const request = require('supertest');
const chai = require('chai');
const sinon = require('sinon')

const app = require('../index');
const projectController = require('../controllers/proyectoController');

const expect = chai.expect;
describe('GET /projects',() => {
    it('1. Debe devolver una lista de proyectos', async () => {
    
        const projects = [
                {
                "id": "5f0dba4a-e8d3-4a63-9cf1-741c53f6be72",
                "name": "Nuevo Sistema de Gestión",
                "description": "Implementar un sistema de recursos.",
                "startDate": "2024-09-01",
                "endDate": "2025-02-01",
                "status": "en progreso",
                "teamMembers": ["Carlos Pérez", "Ana Gómez", "Luis Martínez"],
                "budget": 50000
                },
                {
                "id": "djusnna-45wf-lops-3ehj-owm9iwm3wl5z",
                "name": "Sistema de prestacion de libros ",
                "description": "Implementar gestion de renta de libros.",
                "startDate": "2024-10-21",
                "endDate": "2025-08-05",
                "status": "por empezar",
                "teamMembers": ["Pablo Perez", "Luis Gómez", "Patricia Martínez"],
                "budget": 60000
                }
        ];
        
        const res = await request(app).get('/projects');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(2);
        expect(res.body).to.deep.equal(projects);


    });


});



describe('GET /projects/:id',() => {
    it('2. Verificar que devuelve el proyecto correcto por ID', async () => {
    
        const projects = [
                {
                "id": "5f0dba4a-e8d3-4a63-9cf1-741c53f6be72",
                "name": "Nuevo Sistema de Gestión",
                "description": "Implementar un sistema de recursos.",
                "startDate": "2024-09-01",
                "endDate": "2025-02-01",
                "status": "en progreso",
                "teamMembers": ["Carlos Pérez", "Ana Gómez", "Luis Martínez"],
                "budget": 50000
                },
                {
                "id": "djusnna-45wf-lops-3ehj-owm9iwm3wl5z",
                "name": "Sistema de prestacion de libros ",
                "description": "Implementar gestion de renta de libros.",
                "startDate": "2024-10-21",
                "endDate": "2025-08-05",
                "status": "por empezar",
                "teamMembers": ["Pablo Perez", "Luis Gómez", "Patricia Martínez"],
                "budget": 60000
                }
        ];
        const xd = await request(app).get('/projects/:id');
        expect(xd.status).to.equal(200);
        expect(xd.body).to.be.an('object');
        expect(xd.body.length).to.equal(2);
        expect(xd.body).to.deep.equal(projects);
    });
 

    
});



describe('POST /projects',() => {
    it('3. Verificar que se puede crear un proyecto con las nuevas propiedades y que las validaciones funcionen', async () => {
    
        const projects = [
                {
                "id": "5f0dba4a-e8d3-4a63-9cf1-741c53f6be72",
                "name": "Nuevo Sistema de Gestión",
                "description": "Implementar un sistema de recursos.",
                "startDate": "2024-09-01",
                "endDate": "2025-02-01",
                "status": "en progreso",
                "teamMembers": ["Carlos Pérez", "Ana Gómez", "Luis Martínez"],
                "budget": 50000
                },
                {
                "id": "djusnna-45wf-lops-3ehj-owm9iwm3wl5z",
                "name": "Sistema de prestacion de libros ",
                "description": "Implementar gestion de renta de libros.",
                "startDate": "2024-10-21",
                "endDate": "2025-08-05",
                "status": "por empezar",
                "teamMembers": ["Pablo Perez", "Luis Gómez", "Patricia Martínez"],
                "budget": 60000
                }
        ];
        
        const noc = await request(app).post('/projects');
        expect(noc.status).to.equal(200);
        expect(noc.body).to.be.an('array');
        expect(noc.body.length).to.equal(2);
        expect(noc.body).to.deep.equal(projects);
        expect(noc.body).to.include.keys('id','name','description','startDate','endDate','status','teamMembers','budget');

    });

});


describe('PUT /projects/:id',() => {
    it('4. Verificar que se puede actulizar correctamente', async () => {
    
        const projects = [
                {
                "id": "5f0dba4a-e8d3-4a63-9cf1-741c53f6be72",
                "name": "Nuevo Sistema de Gestión",
                "description": "Implementar un sistema de recursos.",
                "startDate": "2024-09-01",
                "endDate": "2025-02-01",
                "status": "en progreso",
                "teamMembers": ["Carlos Pérez", "Ana Gómez", "Luis Martínez"],
                "budget": 50000
                },
                {
                "id": "djusnna-45wf-lops-3ehj-owm9iwm3wl5z",
                "name": "Sistema de prestacion de libros ",
                "description": "Implementar gestion de renta de libros.",
                "startDate": "2024-10-21",
                "endDate": "2025-08-05",
                "status": "por empezar",
                "teamMembers": ["Pablo Perez", "Luis Gómez", "Patricia Martínez"],
                "budget": 60000
                }
        ];
        const papu = await request(app).put('/projects/:id');
        expect(papu.status).to.equal(200);
        expect(papu.body).to.be.an('array');
        expect(papu.body.length).to.equal(2);
        expect(papu.body).to.deep.equal(projects);
    });

});

describe('DELETE /projects/:id',() => {
    it('5. Verificar que se puede eliminar un proyecto', async () => {
    
        const projects = [
                {
                "id": "5f0dba4a-e8d3-4a63-9cf1-741c53f6be72",
                "name": "Nuevo Sistema de Gestión",
                "description": "Implementar un sistema de recursos.",
                "startDate": "2024-09-01",
                "endDate": "2025-02-01",
                "status": "en progreso",
                "teamMembers": ["Carlos Pérez", "Ana Gómez", "Luis Martínez"],
                "budget": 50000
                },
                {
                "id": "djusnna-45wf-lops-3ehj-owm9iwm3wl5z",
                "name": "Sistema de prestacion de libros ",
                "description": "Implementar gestion de renta de libros.",
                "startDate": "2024-10-21",
                "endDate": "2025-08-05",
                "status": "por empezar",
                "teamMembers": ["Pablo Perez", "Luis Gómez", "Patricia Martínez"],
                "budget": 60000
                }
        ];
        const gg = await request(app).delete('/projects/:id');
        expect(gg.status).to.equal(200);
        expect(gg.body).to.be.an('array');
        expect(gg.body.length).to.equal(2);
        expect(gg.body).to.deep.equal(projects);
    });

});





