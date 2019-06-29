/**
 * Logger.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: { type: 'string', columnName: '_id' ,     autoIncrement: true },
    log: { type: 'string', columnName: '_logs' },
    time: { type: 'string', columnName: '_timestamp' },
    server: { type: 'string', columnName: '_service' },
    owner:{
      model:'employer'
  }
  },

};

