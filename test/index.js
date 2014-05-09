'use strict';

var Lab = require('lab')
  , describe = Lab.experiment
  , it = Lab.test
  , expect = require('expect.js')
  , beforeEach = Lab.beforeEach
  , after = Lab.after
  , mongoose = require('mongoose');

var connectDb = function (mongoose, config) {
  return function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(process.env.MONGODB_URL, done);
  };
};

describe('wercker mongodb test', function () {
  beforeEach(connectDb());

  it('connects to db and inserts a document and finds it', function (done) {
    mongoose.connection.db.collection('testcollection', { w: 1 }, function (err, collection) {
      collection.insert({ foo: 'bar' }, function () {
        collection.find({ foo: 'bar'}, function (doc) {
          expect(doc).to.be.ok();
          done();
        });
      });
    });
  });

});