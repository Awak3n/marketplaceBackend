import server from "../src/app.js";
import chai from "chai";
import chaiHttp from "chai-http";
import database from '../src/database/database.js';

let should = chai.should();

chai.use(chaiHttp);

describe('Controller: Marketplace', () => {    
    beforeEach((done) => {
        database.marketplace.stores = [];
        done();
    });

    describe('/GET All', () => {
        it('should return all informations', (done) => {
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
                .get('/marketplace')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name').eq('marketplace');
                    res.body.should.have.property('ppp_fee').eq(1);
                    res.body.should.have.property('stores');
                    res.body.stores.should.be.a('array');
                    res.body.stores.length.should.be.eq(1);
                    res.body.stores[0].should.be.a('object');;
                    res.body.stores[0].should.have.property('id');
                    res.body.stores[0].should.have.property('products');
                    res.body.stores[0].should.have.property('purchases');
                    res.body.stores[0].products.length.should.be.eq(1);
                    res.body.stores[0].purchases.length.should.be.eq(1);
                done();
          });
        });
    });
})