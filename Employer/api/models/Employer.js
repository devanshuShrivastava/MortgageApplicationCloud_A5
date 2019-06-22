/**
 * Employer.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    empID: { type: 'number', columnName: 'employeeID',required:true},
    password: { type: 'string', columnName: 'password'},
    fullName:{type:'string', columnName:'fullName'},
    designation:{type:'string', columnName:'designation'},
    salary:{type:'string', columnName:'salary'},
    tenure:{type:'number', columnName:'tenure'},
    email:{type:'string', columnName:'email'}
  },
};

