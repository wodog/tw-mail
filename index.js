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

/**
 * 构造函数
 * @param {Object} config 必须的配置对象
 */
let mail = module.exports = function(mail_opts) {

  mail.user = mail_opts.auth.user;
  mail.transport = nodemailer.createTransport(mail_opts);

  return mail;
};

/**
 * 发送验证码邮件
 * @param {String} email 接受人的邮件地址
 * @param {String} token 验证码字符串
 * @param {String} username 接受人的用户名
 * @param {String} webname 网站名字
 */
mail.sendValidateMail = function(options, callback) {

  try {
    _validateParams(options);
  } catch (err) {
    callback(err);
  }

  let from = util.format('%s <%s>', options.webname, mail.user);
  let to = options.email;
  let subject = options.webname + '验证码';
  let html = '<p>您好: ' + options.username + '</p>' +
    '<p>我们收到您在' + options.webname + '的验证码请求, 以下是您的验证码: </p>' +
    '<p>' + options.token + '</p>' +
    '<p>若您没有在' + options.webname + '请求过, 说明有人滥用了您的电子邮箱, 请删除此邮件, 我们对给您造成的打扰感到抱歉</p>' +
    '<p>' + options.webname + '谨上</p>';

  mail.transport.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  }, function(err, data) {
    if (err) {
      debug(err);
      return callback(err);
    }
    debug(data);
    callback(null, data);
  });

};

/**
 * 发送激活通知邮件
 * @param {String} email 接受人的邮件地址
 * @param {String} token 重置用的token字符串
 * @param {String} username 接受人的用户名
 * @param {String} webname 网站名字
 * @param {String} url 链接地址
 */
mail.sendActiveMail = function(options, callback) {

  try {
    _validateParams(options);
  } catch (err) {
    callback(err);
  }

  let from = util.format('%s <%s>', options.webname, mail.user);
  let to = options.email;
  let subject = options.webname + '账号激活';
  let html = '<p>您好: ' + options.username + '</p>' +
    '<p>我们收到您在' + options.webname + '的注册信息, 请点击下面的链接来激活账户: </p>' +
    '<a href="' + options.url + '/active_account?key=' + options.token + '&name=' + options.username + '">激活链接</a>' +
    '<p>若您没有在' + options.webname + '填写过注册信息, 说明有人滥用了您的电子邮箱, 请删除此邮件, 我们对给您造成的打扰感到抱歉</p>' +
    '<p>' + options.webname + '谨上</p>';

  mail.transport.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  }, function(err, data) {
    if (err) {
      debug(err);
      return callback(err);
    }
    debug(data);
    callback(null, data);
  });

};

/**
 * 发送密码重置通知邮件
 * @param {String} email 接收人的邮件地址
 * @param {String} token 重置用的token字符串
 * @param {String} username 接收人的用户名
 * @param {String} webname 网站名字
 * @param {String} url 链接地址
 */
mail.sendResetPassMail = function(options, callback) {

  try {
    _validateParams(options);
  } catch (err) {
    callback(err);
  }

  let from = util.format('%s <%s>', options.webname, mail.user);
  let to = options.email;
  let subject = options.webname + '密码重置';
  let html = '<p>您好：' + options.username + '</p>' +
    '<p>我们收到您在' + options.webname + '重置密码的请求，请在24小时内单击下面的链接来重置密码：</p>' +
    '<a href="' + options.url + '/reset_pass?key=' + options.token + '&name=' + options.username + '">重置密码链接</a>' +
    '<p>若您没有在' + options.webname + '填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>' +
    '<p>' + options.webname + ' 谨上。</p>';

  mail.transport.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  }, function(err, data) {
    if (err) {
      debug(err);
      return callback(err);
    }
    debug(data);
    callback(null, data);
  });

};


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

  if (!options.webname) {
    let err = new Error('property webname is required');
    debug(err);
    throw err;
  }

}