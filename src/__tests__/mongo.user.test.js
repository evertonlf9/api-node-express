const request = require('supertest');
const faker = require('faker');
const app = require('../app');
const assert = require('assert');
const endpoints = require('../config/enpoints');

describe('Test the user path', () => {

    test('It should response the router /nosql/user the GET method', async (done) => {

        request(app)
            .get(endpoints.nosql.user)     
            .set('Accept', 'application/json')
            // .set('ticket-sso', server.TICKET_SSO)           
            .expect(200)
            .expect('Content-Type', /json/)            
            .end(function(err, res) {
                if (err) return done(err);  
                // console.log(res.body);
                // assert(res.body.errors[0].msg, 'Invalid value');
                done();
            });
    });

    test('It should response the router /nosql/user/:id the GET method', async (done) => {

        request(app)
            .get(endpoints.nosql.user + '/5e98fe500eceb275cfa77de1')     
            .set('Accept', 'application/json')
            // .set('ticket-sso', server.TICKET_SSO)           
            .expect(200)
            .expect('Content-Type', /json/)            
            .end(function(err, res) {
                if (err) return done(err);  
                // console.log(res.body);
                // assert(res.body.errors[0].msg, 'Invalid value');
                done();
            });
    });

    test('It should response the router /nosql/user the POST method', async (done) => {
        const data = {username: `${faker.name.firstName()}.${faker.name.lastName()}`, email: faker.internet.email()}

        request(app)
            .post(endpoints.nosql.user)  
            .type('form')   
            .set('Accept', 'application/json')
            .send(data)
            // .set('ticket-sso', server.TICKET_SSO)           
            .expect(200)
            .expect('Content-Type', /json/)            
            .end(function(err, res) {
                if (err) return done(err);  
                assert(res.body.success, true);
                assert(res.body.response.username, data.username);
                assert(res.body.response.email, data.email);
                done();
            });
    });

    test('It should response the router /nosql/user/:id the PUT method', async (done) => {
        const data = {username: `${faker.name.firstName()}.${faker.name.lastName()}`, email: faker.internet.email()}
       
        request(app)
            .put(endpoints.nosql.user + '/5e9b3e8f368b7f1d5499b588')  
            .type('form')   
            .set('Accept', 'application/json')
            .send(data)
            // .set('ticket-sso', server.TICKET_SSO)           
            .expect(200)
            .expect('Content-Type', /json/)            
            .end(function(err, res) {
                if (err) return done(err); 
                assert(res.body.success, true);
                assert(res.body.response.username, data.username);
                assert(res.body.response.email, data.email);
                done();
            });
    });

});