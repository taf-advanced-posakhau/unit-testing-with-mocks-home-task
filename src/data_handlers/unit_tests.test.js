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


describe('Verification of loadUsers() method', () => {
  it('verification full list of users which loadUsers() method updating', async () => {
    await user_data_handler.loadUsers()    
    expect(user_data_handler.users).to.deep.equal(users)
  })
})

describe('Verification of getNumberOfUsers() method', () => {
  it('verification of number of all users', async () => {
    await user_data_handler.loadUsers() 
    expect(user_data_handler.getNumberOfUsers()).to.deep.equal(users.length)
  })
})

describe('Verification of isMatchingAllSearchParams() method - positive case', () => {
it('verification isMatchingAllSearchParams() method', async () => { 
  let searchParameter = {
    name: 'Leanne Graham',
    username: 'Bret'
  }       
  await user_data_handler.loadUsers()
  expect(user_data_handler.isMatchingAllSearchParams(user_data_handler.users[0], searchParameter), user_data_handler.isMatchingAllSearchParams(users[0], searchParameter))    
})
})

describe('Verification of isMatchingAllSearchParams() method - negative case', () => {
it('verification isMatchingAllSearchParams() method', async () => { 
  let searchParameter = {
    name: 'William Forrester',
    username: 'Lucky'
  }       
  await user_data_handler.loadUsers()
  expect(user_data_handler.isMatchingAllSearchParams(user_data_handler.users[0], searchParameter), user_data_handler.isMatchingAllSearchParams(users[0], searchParameter))    
})
})

describe('Verification of findUsers() method', () => {
it('verification findUsers() method', async () => {      
  await user_data_handler.loadUsers() 
  user_data_handler.findUsers({ email: users[0].email })
  expect(user_data_handler.findUsers({ email: users[0].email })).to.deep.equal(user_data_handler.findUsers({ email: user_data_handler.users[0].email }))     
})
})
 
describe('Verification of getUserEmailsList() method - positive case', () => {
    it('verification of list of all users emails', async () => {

        const formActualEmailsList = async () => {
            return new Promise((resolve, reject)=>{
                let actualEmailsList = []
                for (let i = 0; i < users.length; ++i) {
                    actualEmailsList.push(users[i].email);                    
                }
                resolve(actualEmailsList)
            });
        }

      const actualEmailsListString = (await formActualEmailsList()).join(';')
      expect(user_data_handler.getUserEmailsList()).to.deep.equal(actualEmailsListString)
    })
})

describe('Verification of getUserEmailsList() method - negative case', () => {
  it('verification of list of all users emails', async () => {
      user_data_handler.users = {};
      try {
        user_data_handler.getUserEmailsList();  
        assert.fail('expected exception not thrown');  
      } catch (e) { 
        if (e instanceof AssertionError) {          
          throw e;
        }
        assert.equal(e.message, 'this.users.map is not a function');
      }     
  })
})
 