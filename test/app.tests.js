//sanity tests

// these tests are basically sanity tests written in order to check at least the basic requests 
// are going in or out
// more advanced tests should be written

const chai = require('chai');
const chaiHttp = require('chai-http');
const  server = require('../app');
const  should = chai.should();

chai.use(chaiHttp);

describe('API tests for creating a story', () =>{
    it('should create one document using POST', (done) => {
        let doc = {
            "title": "test",
            "story": "svovnnodnvdovnvodnvdovnd",
            "username": "test",
            "role": "Author",
            "story_state": "Draft"
        }
        chai.request('http://localhost:3000')
        .post('/story/addstory')
        .send(doc)
        .end((req, res) => {
            res.should.have.status(200);
            done();
        })
    })
});

describe('API tests to get certain values ', () =>{
    it('should list all the Authored stories with GET', (done) => {
        chai.request('http://localhost:3000')
        .get('/story/findAuthoredstory')
        .end((req, res) => {
            res.should.have.status(200);
            done();
        })
    })
});

describe('API test to find out authored draft copies', () => {
    it('should list all the stories with GET', (done) => {
        chai.request('http://localhost:3000')
            .get('/story/finddrafttories/madguy02')
            .end((req, res) => {
                res.should.have.status(200);
                done();
            })
    })
})