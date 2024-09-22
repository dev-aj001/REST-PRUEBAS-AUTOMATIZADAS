const request = require('supertest');
const chai = require('chai');
const sinon = require('sinon');

const app = require('../index');

const expect = chai.expect;
describe('GET /projects',() => {
    it('1. Debe devolver una lista de proyectos', async () => {
        
        const res = await request(app).get('/projects');
        // Se espera que se devuelva en codigo 200
        expect(res.status).to.equal(200);
        // Se espera una lista de proyect
        expect(res.body).to.be.an('array');

    });

});

describe('GET /projects/:id',() => {
    it('2. Verificar que devuelve el proyecto correcto por ID', async () => {

        const res = await request(app).get('/projects/1');

        // Se espera que se devuelva el codigo 200
        expect(res.status).to.equal(200);
        // Se espera que sea un objeto
        expect(res.body).to.be.an('object');
        // Se espera que devuelva el proyecto correcto por ID
        expect(res.body.id).to.be.equal(1);
    });
    
});

describe('POST /projects',() => {
    it('3. Verificar que se puede crear un proyecto con las nuevas propiedades y que las validaciones funcionen', async () => {

        // Proyecto a crear, no tiene id por que este se genera automaticamente
        const data = {
            name: 'name',
            description: 'description',
            startDate: "2024-09-01",
            endDate: "2025-02-01",
            status: 'en progreso',
            teamMembers: ['Sofia M', 'Miguel F', 'Roberto G'],
            budget: 50000,
        };

        // Se envia el request POST con el proyecto nuevo
        const res = await request(app).post('/projects').send(data);

        // Se espera el codigo 200
        expect(res.status).to.equal(200);
        // Se espera que la respuesta tenga estos atributos
        expect(res.body).to.include.keys('id', 'name', 'description', 'startDate', 'endDate', 'status', 'teamMembers', 'budget');
        // Se espera que la respuesta tenga los mismos valores que el proyecto enviado
        expect(res.body.name).to.equal(data.name);
        expect(res.body.description).to.equal(data.description);
        expect(res.body.startDate).to.equal(data.startDate);
        expect(res.body.endDate).to.equal(data.endDate);
        expect(res.body.status).to.equal(data.status);
        expect(res.body.teamMembers).to.deep.equal(data.teamMembers);
        expect(res.body.budget).to.equal(data.budget);

    });

});

describe('PUT /projects/:id',() => {
    it('4. Verificar que se puede actulizar correctamente', async () => {
    
        // Proyecto actualizando todos los atributos
        const data = {
            name: 'proyecto modificado',
            description: 'description modificada',
            startDate: "2024-09-02",
            endDate: "2025-02-02",
            status: 'pendiente',
            teamMembers: ['Sofia O', 'Miguel K', 'Roberto P'],
            budget: 55000,
        };

        // Se envia un request PUT con el proyecto actualizado
        const res = await request(app).put('/projects/1').send(data);

        // console.log(res.body);
        expect(res.status).to.equal(200);
        // Se espera que la respuesta tenga el mismo ID
        expect(res.body.id).to.be.equal(1);

        // Se espera que la respuesta tenga los mismos valores que el proyecto actualizado
        expect(res.body.name).to.equal(data.name);
        expect(res.body.description).to.equal(data.description);
        expect(res.body.startDate).to.equal(data.startDate);
        expect(res.body.endDate).to.equal(data.endDate);
        expect(res.body.status).to.equal(data.status);
        expect(res.body.teamMembers).to.deep.equal(data.teamMembers);
        expect(res.body.budget).to.equal(data.budget);
    });

});

describe('DELETE /projects/:id',() => {
    it('5. Verificar que se puede eliminar un proyecto', async () => {

        // Se envia un request para elminiar el proyecto con id = 1
        const res = await request(app).delete('/projects/1');
        expect(res.status).to.equal(200);

        // Espera que el proyecto eliminado tenga el mismo ID
        expect(res.body.id).to.equal(1);

        // Se envia un nuevo request para verificar que el proyecto eliminado ya no se encuentre
        const res2 = await request(app).delete('/projects/1');
        // Es correcto si se recibe el codigo 404
        expect(res2.status).to.equal(404);
    });

});
