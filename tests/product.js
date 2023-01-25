import server from "../src/app.js";
import chai from "chai";
import chaiHttp from "chai-http";
import database from '../src/database/database.js';

let should = chai.should();

chai.use(chaiHttp);

describe('Controller: Product', () => {    
    const defaultProduct = {
        "store_id": "1",
        "name": "Cellphone",
        "price": "50"
    }

    const newProduct = {
        "name": "iPhone",
        "price": "100"
    }

    beforeEach((done) => {
        database.marketplace.stores = [];
        done();
    });

    describe('/GET All', () => {
        it('should return all products informations', (done) => {
            database.marketplace.stores.push({
                id: "1",
                name: "Magazine Luiza",
                fee: 11.1,
                products: [{
                    id: "1",
                    store_id: "1",
                    name: "Cellphone",
                    price: 50
                }],
                purchases: []
            });
            
            chai.request(server)
                .get('/product')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eq(1);
                done();
          });
        });
    });

    describe('/GET By ID', () => {
        it('should return information of a product by ID', (done) => {
            database.marketplace.stores.push({
                id: "1",
                name: "Magazine Luiza",
                fee: 11.1,
                products: [{
                    id: "1",
                    store_id: "1",
                    name: "Cellphone",
                    price: 50
                }],
                purchases: []
            });
            
            chai.request(server)
                .get('/product/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').eq('1');
                    res.body.should.have.property('store_id').eq('1');
                    res.body.should.have.property('name').eq('Cellphone');
                    res.body.should.have.property('price').eq(50);
                done();
          });
        });
    });

    describe('/GET By Name', () => {
        it('should return information of a product by name', (done) => {
            database.marketplace.stores.push({
                id: "1",
                name: "Magazine Luiza",
                fee: 11.1,
                products: [{
                    id: "1",
                    store_id: "1",
                    name: "Cellphone",
                    price: 50
                }],
                purchases: []
            });
            
            chai.request(server)
                .get('/product/name/Cellphone')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eq(1);
                done();
          });
        });
    });

    describe('/GET By Price', () => {
        it('should return information of a product by price', (done) => {
            database.marketplace.stores.push({
                id: "1",
                name: "Magazine Luiza",
                fee: 11.1,
                products: [{
                    id: "1",
                    store_id: "1",
                    name: "Cellphone",
                    price: 50
                }],
                purchases: []
            });
            
            chai.request(server)
                .get('/product/price/50')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eq(1);
                done();
          });
        });
    });

    describe('/POST Cellphone', () => {
        it('should return Cellphone information', (done) => {
            database.marketplace.stores.push({
                id: "1",
                name: "Magazine Luiza",
                fee: 11.1,
                products: [],
                purchases: []
            });

            chai.request(server)
                .post('/product')
                .send(defaultProduct)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('store_id').eq('1');
                    res.body.should.have.property('name').eq('Cellphone');
                    res.body.should.have.property('price').eq(50);
                done();
          });
        });
    });

    describe('/PUT Update Cellphone to iPhone', () => {
        it('should return 200', (done) => {
            database.marketplace.stores.push({
                id: "1",
                name: "Magazine Luiza",
                fee: 11.1,
                products: [{
                    id: "1",
                    store_id: "1",
                    name: "Cellphone",
                    price: 50
                }],
                purchases: []
            });

            chai.request(server)
                .put('/product/1')
                .send(newProduct)
                .end((err, res) => {
                    res.should.have.status(200);
                done();
          });
        });
    });

    describe('/DELETE By ID', () => {
        it('should return 204', (done) => {
            database.marketplace.stores.push({
                id: "1",
                name: "Magazine Luiza",
                fee: 11.1,
                products: [{
                    id: "1",
                    store_id: "1",
                    name: "Cellphone",
                    price: 50
                }],
                purchases: []
            });

            chai.request(server)
                .delete('/product/1')
                .end((err, res) => {
                    res.should.have.status(204);
                done();
          });
        });
    });

    describe('/DELETE By name and price', () => {
        it('should return 204', (done) => {
            database.marketplace.stores.push({
                id: "1",
                name: "Magazine Luiza",
                fee: 11.1,
                products: [{
                    id: "1",
                    store_id: "1",
                    name: "Cellphone",
                    price: 50
                }],
                purchases: []
            });

            chai.request(server)
                .delete('/product/Cellphone/50')
                .end((err, res) => {
                    res.should.have.status(204);
                done();
          });
        });
    });

})