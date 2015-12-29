/**
 * mail module.
 *
 * Trend Wood
 * All Rights Reserved
 */

'use strict';

const nodemailer = require('nodemailer');
const util = require('util');
const debug = require('debug')('tw-mail');
const config = require('../../config');
const transport = nodemailer.createTransport(config.mail_opts);
const SITE_ROOT_URL = 'http://' + config.host;


/**
 * 发送验证码邮件
 * @param {String} email 接受人的邮件地址
 * @param {String} token 验证码字符串
 * @param {String} username 接受人的用户名
 */
exports.sendValidateMail = function(options, callback) {

  if (!options) {
    callback(new Error('options can\'t be null'));
  }

  let from = util.format('%s <%s>', config.name, config.mail_opts.auth.user);
  let to = options.email;
  let subject = config.name + '验证码';
  let html = '<p>您好: ' + options.username + '</p>' +
    '<p>我们收到您在' + config.name + '的验证码请求, 以下是您的验证码: </p>' +
    '<p>' + options.token + '</p>' +
    '<p>若您没有在' + config.name + '请求过, 说明有人滥用了您的电子邮箱, 请删除此邮件, 我们对给您造成的打扰感到抱歉</p>' +
    '<p>' + config.name + '谨上</p>';

  transport.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  }, function(err, data) {
    if (err) {
      debug('sendValidateMail failed');
      debug(err);
      return callback(err);
    }
    debug('sendValidateMail successed');
    debug(data);
    callback(null, data);
  });

};

/**
 * 发送激活通知邮件
 * @param {String} email 接受人的邮件地址
 * @param {String} token 重置用的token字符串
 * @param {String} username 接受人的用户名
 */
exports.sendActiveMail = function(options, callback) {

  if (!options) {
    callback(new Error('options can\'t be null'));
  }

  let from = util.format('%s <%s>', config.name, config.mail_opts.auth.user);
  let to = options.email;
  let subject = config.name + '账号激活';
  let html = '<p>您好: ' + options.username + '</p>' +
    '<p>我们收到您在' + config.name + '的注册信息, 请点击下面的链接来激活账户: </p>' +
    '<a href="' + SITE_ROOT_URL + '/active_account?key=' + options.token + '&name=' + options.username + '">激活链接</a>' +
    '<p>若您没有在' + config.name + '填写过注册信息, 说明有人滥用了您的电子邮箱, 请删除此邮件, 我们对给您造成的打扰感到抱歉</p>' +
    '<p>' + config.name + '谨上</p>';

  transport.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  }, function(err, data) {
    if (err) {
      debug('sendActiveMail failed');
      debug(err);
      return callback(err);
    }
    debug('sendActiveMail successed');
    debug(data);
    callback(null, data);
  });

};

/**
 * 发送密码重置通知邮件
 * @param {String} email 接收人的邮件地址
 * @param {String} token 重置用的token字符串
 * @param {String} username 接收人的用户名
 */
exports.sendResetPassMail = function(options, callback) {

  if (!options) {
    callback(new Error('options can\'t be null'));
  }

  let from = util.format('%s <%s>', config.name, config.mail_opts.auth.user);
  let to = options.email;
  let subject = config.name + '密码重置';
  let html = '<p>您好：' + options.username + '</p>' +
    '<p>我们收到您在' + config.name + '重置密码的请求，请在24小时内单击下面的链接来重置密码：</p>' +
    '<a href="' + SITE_ROOT_URL + '/reset_pass?key=' + options.token + '&name=' + options.username + '">重置密码链接</a>' +
    '<p>若您没有在' + config.name + '填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>' +
    '<p>' + config.name + ' 谨上。</p>';

  transport.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  }, function(err, data) {
    if (err) {
      debug('sendResetPassMail failed');
      debug(err);
      return callback(err);
    }
    debug('sendResetPassMail successed');
    debug(data);
    callback(null, data);
  });

};