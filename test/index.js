'use strict';

var Lab = require('lab')
  , describe = Lab.experiment
  , it = Lab.test
  , expect = require('expect.js')
  , beforeEach = Lab.beforeEach
  , mongoose = require('mongoose');

describe('wercker mongodb test', function () {
  beforeEach(function (done) {
    if (mongoose.connection && mongoose.connection.db) return done();
    mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/test', done);
  });

  it('connects to db and inserts a document and finds it', function (done) {
    var Cat = mongoose.model('Cat', { name: String });

    var kitty = new Cat({ name: 'Zildjian' });
    kitty.save(function (err, kiddy) {
      if (err) throw err;
      expect(kiddy).to.have.property('name');
      mongoose.disconnect(done);
    });
  });

});