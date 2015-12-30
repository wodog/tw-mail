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

let config;
let transport;
let SITE_ROOT_URL;

/**
 * 构造函数
 * @param {Object} config 必须的配置对象
 */
let mail = module.exports = function (options){
  try{
    _validateConfig(options);
  }catch(err){
    debug(err);
    throw(err);
  }

  transport = nodemailer.createTransport(options.mail_opts);
  config = options;
  SITE_ROOT_URL = 'http://' +options.host;

  return mail;
};

/**
 * 发送验证码邮件
 * @param {String} email 接受人的邮件地址
 * @param {String} token 验证码字符串
 * @param {String} username 接受人的用户名
 */
mail.sendValidateMail = function(options, callback) {

  try {
    _validateParams(options);
  } catch (err) {
    callback(err);
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
mail.sendActiveMail = function(options, callback) {

  try {
    _validateParams(options);
  } catch (err) {
    callback(err);
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
mail.sendResetPassMail = function(options, callback) {

  try {
    _validateParams(options);
  } catch (err) {
    callback(err);
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

function _validateConfig(config) {
  if (!config.host) {
    let err = new Error('property host is required');
    debug(err);
    throw err;
  }

  if (!config.name) {
    let err = new Error('property name is required');
    debug(err);
    throw err;
  }

  if (!config.mail_opts) {
    let err = new Error('property mail_opts is required');
    debug(err);
    throw err;
  }

}

function _validateParams(options) {
  if (!options.email) {
    let err = new Error('property email is required');
    debug(err);
    throw err;
  }

  if (!options.token) {
    let err = new Error('property token is required');
    debug(err);
    throw err;
  }

  if (!options.username) {
    let err = new Error('property username is required');
    debug(err);
    throw err;
  }

}