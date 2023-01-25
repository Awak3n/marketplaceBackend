import server from "../src/app.js";
import chai from "chai";
import chaiHttp from "chai-http";
import database from '../src/database/database.js';

let should = chai.should();

chai.use(chaiHttp);

describe('Controller: Store', () => {    
    const defaultStore = {
        "name": "Americanas",
        "fee": "15"
    }

    const newStore = {
        "name": "Magazine Luiza",
        "fee": "11.2"
    }

    const storeWithoutFee = {
        "name": "Shopee"
    }

    beforeEach((done) => {
        database.marketplace.stores = [];
        done();
    });

    describe('/POST Americanas', () => {
        it('should return Americanas information', (done) => {
            chai.request(server)
                .post('/store')
                .send(defaultStore)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name').eq('Americanas');
                    res.body.should.have.property('fee').eq(15);
                done();
          });
        });
    });

    describe('/POST Shopee', () => {
        it('should return Shopee information', (done) => {
            chai.request(server)
                .post('/store')
                .send(storeWithoutFee)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name').eq('Shopee');
                    res.body.should.have.property('fee').eq(10);
                done();
          });
        });
    });

    describe('/PUT Update Luiza to Magazine Luiza', () => {
        it('should return 200', (done) => {
            database.marketplace.stores.push({
                id: "1",
                name: "Luiza",
                fee: 11.1,
                products: [],
                purchases: []
            });

            chai.request(server)
                .put('/store/1')
                .send(newStore)
                .end((err, res) => {
                    res.should.have.status(200);
                done();
          });
        });
    });

})