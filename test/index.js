'use strict';

const assert = require('assert');
const config = require('../config');
const tw_mail = require('../')(config);

describe('test/index.js', function() {

  let options = {};
  options.email = '536505032@qq.com';
  options.token = '123456';
  options.username = 'wodog99';

  describe('sendActiveMail', function() {
    it('should ok', function(done) {
      console.log(tw_mail.sendActiveMail);
      tw_mail.sendActiveMail(options, function(err, data) {
        assert.ok(data);
        assert.equal(data.response, '250 Ok: queued as ');
        done();
      });
    });
  });

  describe('sendResetPassMail', function() {
    it('should ok', function(done) {
      tw_mail.sendResetPassMail(options, function(err, data) {
        assert.ok(data);
        assert.equal(data.response, '250 Ok: queued as ');
        done();
      });
    });
  });

  describe('sendValidateMail', function() {
    it('should ok', function(done) {
      tw_mail.sendValidateMail(options, function(err, data) {
        assert.ok(data);
        assert.equal(data.response, '250 Ok: queued as ');
        done();
      });
    });
  });

});