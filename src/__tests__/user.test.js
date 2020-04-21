const request = require('supertest');
const faker = require('faker');
const app = require('../app');
const assert = require('assert');
const enpoints = require('../config/enpoints');
const endpoint = enpoints.user;
let dataFaker = {}

describe('Test the user path', () => {

    test('It should response the router /user the POST method', async (done) => {

        dataFaker = { 
            first_name: faker.name.firstName(), 
            last_name: faker.name.lastName(), 
            rg: "45987.632-5", 
            cpf:"589.652.324-52", 
            email: faker.internet.email(), 
            login: "clauid.ferraz", 
            password: faker.internet.password() 
        }

        request(app)
            .post(endpoint)            
            .type('form')
            .set('Accept', 'application/json')
            // .set('ticket-sso', server.TICKET_SSO)
            .send(dataFaker)            
            .expect(422)
            .expect('Content-Type', /json/)            
            .end(function(err, res) {
                if (err) return done(err);  
                assert(res.body.typeError[0].msg, 'Invalid value');
                assert(res.body.typeError[0].param, 'rg');
                done();
            });
    });
    
    test('It should response the router /user the POST method', async (done) => {
        const  firstName = faker.name.firstName();
        const  lastName = faker.name.lastName();

        dataFaker = { 
            first_name: firstName, 
            last_name: lastName, 
            rg: "45.987.632-5", 
            cpf:"589.652.324-52", 
            email: faker.internet.email(), 
            login: `${firstName.toLocaleLowerCase()}.${lastName.toLocaleLowerCase()}`, 
            password: faker.internet.password() 
        }

        request(app)
            .post(endpoint)            
            .type('form')
            .set('Accept', 'application/json')
            // .set('ticket-sso', server.TICKET_SSO)
            .send(dataFaker)            
            .expect(200)
            .expect('Content-Type', /json/)            
            .end(function(err, res) {
                if (err) return done(err);  
                // console.log(res.body)
                dataFaker.id = res.body.id;
                // assert(res.body.id, 1);
                done();
            });
    });

    test('It should response the router /user the GET method', async (done) => {

        request(app)
            .get(endpoint + '/')
            .set('Accept', 'application/json')
            // .set('ticket-sso', server.TICKET_SSO)
            .expect(200)
            .expect('Content-Type', /json/)            
            .end(function(err, res) {
                if (err) return done(err);  
                assert(res.body.rows[0].first_name, 'Claudio');
                assert(res.body.rows[0].last_name, 'Ferraz');
                assert(res.body.rows[0].login, 'clauid.ferraz');
                done();
            });
    });

    test('It should response the router /user/:id the GET method', async (done) => {

        request(app)
            .get(`${endpoint}/${dataFaker.id}/`)
            .set('Accept', 'application/json')
            // .set('ticket-sso', server.TICKET_SSO)
            .expect(200)
            .expect('Content-Type', /json/)            
            .end(function(err, res) {
                if (err) return done(err);  
                assert(res.body.first_name, dataFaker.first_name);
                assert(res.body.last_name, dataFaker.last_name);
                assert(res.body.login, dataFaker.login);
                assert(res.body.email, dataFaker.email);
                assert(res.body.password, dataFaker.password);
                done();
            });
    });

    test('It should response the router /user/:id the PUT method', async (done) => {

        const value = {
            first_name: dataFaker.first_name, 
            last_name: dataFaker.last_name, 
            rg: dataFaker.rg, 
            cpf: dataFaker.cpf, 
            email: faker.internet.email(), 
            login: dataFaker.login, 
            password: faker.internet.password()
        }

        request(app)
            .put(endpoint + '/1/')            
            .type('form')
            .set('Accept', 'application/json')
            // .set('ticket-sso', server.TICKET_SSO)
            .send(value)            
            .expect(200)
            .expect('Content-Type', /json/)            
            .end(function(err, res) {
                if (err) return done(err); 
                assert(res.body.email, value.email);
                assert(res.body.password, value.password);
                done();
            });
    });

    test('It should response the router /user/:id the PATCH method', async (done) => {

        const values = { 
            id: dataFaker.id,
            email: faker.internet.email(), 
        }

        request(app)
            .patch(`${endpoint}/${dataFaker.id}/`)            
            .type('form')
            .set('Accept', 'application/json')
            // .set('ticket-sso', server.TICKET_SSO)
            .send(values)            
            .expect(200)
            .expect('Content-Type', /json/)            
            .end(function(err, res) {
                if (err) return done(err);  
                assert(res.body.email, values.email);
                done();
            });
    })
});