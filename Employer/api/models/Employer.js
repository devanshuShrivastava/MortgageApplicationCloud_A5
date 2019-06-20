/**
 * Employer.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    empID: { type: 'number', columnName: 'employeeID',required:true},
    fullName:{type:'string', columnName:'fullName'},
    designation:{type:'string', columnName:'designation'},
    salary:{type:'string', columnName:'salary'},
    salary:{type:'number', columnName:'tenure'}
  },
};

