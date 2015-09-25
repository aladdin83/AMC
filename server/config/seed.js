/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var sqldb = require('../sqldb');
var seeds = require('./seeds/patients');
var User = sqldb.User;
var Bill = sqldb.Bill;


User.sync()
  .then(function() {
    return User.destroy({ where: {} });
  })
  .then(function() {
    User.bulkCreate([{
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    }])
    .then(function() {
      console.log('finished populating users');
    });
  });
