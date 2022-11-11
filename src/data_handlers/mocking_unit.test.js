/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable space-in-parens */
/* eslint-disable func-call-spacing */
/* eslint-disable comma-spacing */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable arrow-spacing */
/* eslint-disable eol-last */
/* eslint-disable prefer-const */
/* eslint-disable padded-blocks */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable space-infix-ops */
/* eslint-disable no-undef */
/* eslint-disable semi-spacing */
/* eslint-disable indent */
/* eslint-disable camelcase */
import { expect } from 'chai'
import UserDataHandler from './user_data_handler'
import users from '../../data/users.json'
 
const user_data_handler = new UserDataHandler()
const assert = require('assert');
const { AssertionError } = require('assert');
const nock = require('nock');
 

const loadUsersMockerAPI = nock('http://localhost:3000')
.get('/users')
.reply(200, { results: 'users loaded successfully' })

describe ('testing error in loadUsers()' , () => {
    it ( `represents the mock data for GET users server request` , async () => {
      loadUsersMockerAPI.get('/users');
      expect(user_data_handler.users).to.deep.equal( [] )
    })    
});

describe('Verification of loadUsers() method - negative case', () => {
 
    before('Set up a fake HTTP Server', () => {
      let scope = nock('http://localhost:3000')
  .get('/users')
  .delay(2000) // delay the response for extra realism
  .reply(504, 'Gateway Timeout');
});
      

  it('verification of error in loadUsers() method', async () => {

    try {
      user_data_handler.loadUsers()     
    } catch (e) { 
      if (e instanceof AssertionError) {          
        throw e;
      }
      assert.equal(e.message, `Failed to load users data: Gateway Timeout`);
    }     
  })
});

describe('Verification of findUsers() method - catching error of "No users loaded', () => {
  it('verification findUsers() method - No users loaded error', async () => {      
    
    try {
      user_data_handler.findUsers({ number: "number" }) ()     
    } catch (e) { 
      if (e instanceof AssertionError) {          
        throw e;
      }
      assert.equal(e.message, `No users loaded!`);
    }     
  })       
})

describe('Verification of findUsers() method - catching error "No matching users found!', () => {
  it('verification findUsers() method - No matching users found error', async () => {  
    user_data_handler.users = users;    
    
    try {
      user_data_handler.findUsers({ email: 'mail@fakemail.to' })
    } catch (e) { 
      if (e instanceof AssertionError) {          
        throw e;
      }
      assert.equal(e.message, `No matching users found!`);
    }     
  })       
})
 






































//     const fakeUsers = [
    //         {
    //             id: 100,
    //             name: "Leanne Graham",
    //             username: "Mock",
    //             email: "Sincere@april.biz",
    //             address: {
    //               street: "Kulas Light",
    //               suite: "Apt. 556",
    //               city: "Gwenborough",
    //               zipcode: "92998-3874",
    //               geo: {
    //                 lat: "-37.3159",
    //                 lng: "81.1496"
    //               }
    //             },
    //             phone: "1-770-736-8031 x56442",
    //             website: "hildegard.org",
    //             company: {
    //               name: "Romaguera-Crona",
    //               catchPhrase: "Multi-layered client-server neural-net",
    //               bs: "harness real-time e-markets"
    //             }
    //           }
    //     ]

    //     const stub = sinon
    //         .stub(user_data_handler, 'user_data_handler.loadUsers')
    //         .resolves (fakeUsers);

    //        await request(serverMocker).get('/users')
    //             .expect(200)
    //             .expect('Content-Type',/json/)
    //             .expect(fakeUsers)

    //         expect(stub.getCall(0).args[0]).to.equal('abc');

    //         stub.restore();
    // })    