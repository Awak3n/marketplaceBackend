import server from "../src/app.js";
import chai from "chai";
import chaiHttp from "chai-http";
import database from '../src/database/database.js';

let should = chai.should();

chai.use(chaiHttp);

describe('Controller: Purchase', () => {    
    beforeEach((done) => {
        database.marketplace.stores = [];
        done();
    });

    describe('/GET All', () => {
        it('should return all purchases information', (done) => {
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
                purchases: [{
                    id: "1",
                    store_id: "1",
                    product_id: "1",
                    product_name: "Cellphone",
                    product_price: 50,
                    purchase_fee: 11.1
                }]
            });
            
            chai.request(server)
                .get('/purchase')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array');
                    res.body.length.should.be.eq(1);
                    res.body[0].should.be.a('object');;
                    res.body[0].should.have.property('id');
                    res.body[0].should.have.property('store_id').eq('1');
                    res.body[0].should.have.property('product_id').eq('1');
                    res.body[0].should.have.property('product_name').eq('Cellphone');
                    res.body[0].should.have.property('product_price').eq(50);
                    res.body[0].should.have.property('purchase_fee').eq(11.1);
                done();
          });
        });
    });

    describe('/POST Purchase', () => {
        it('should return purchase information', (done) => {
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
                .post('/purchase/1')
                .send({})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('store_id').eq('1');
                    res.body.should.have.property('product_id').eq('1');
                    res.body.should.have.property('product_name').eq('Cellphone');
                    res.body.should.have.property('product_price').eq(50);
                    res.body.should.have.property('purchase_fee').eq(11.1);
                done();
          });
        });
    });
})