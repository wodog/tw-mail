# tw-mail
[![Build Status](https://travis-ci.org/wodog/tw-mail.svg?branch=master)](https://travis-ci.org/wodog/tw-mail) [![Version npm](https://img.shields.io/npm/v/tw-mail.svg)](https://www.npmjs.com/package/tw-mail)

  trend wood mail module.

## install

```bash
npm install tw-mail
```

## set up
  first, you should create `config.js`.

  and then, add some config in it, just like below:

```js
module.exports = {
  /**
   * mail options
   */
  mail_opts: {
    host: 'smtp.163.com',
    port: 25,
    auth: {
      user: 'qqq536505032@163.com',
      pass: 'qjkujfvdzbyhphzg'
    }
  }
};
```

## usage

```js
var config = require('config');
var tw-mail = require('tw-mail')(config.mail_opts);

var options = {
  email: '536505032@qq.com',  // 发送邮箱地址
  token: '123456',    // token
  username: 'wodog99',   // 用户名
  webname: '测试网站',    // 网站名
  url: 'http://test.com'   // 链接地址
}

// 发送密码重置邮件
tw_mail.sendResetPassMail(options, callback);

// 发送验证发邮件
tw_mail.sendValidateMail(options, callback);

// 发送激活邮件
tw_mail.sendActiveMail(options, callback);
```

## response

```js
{
  accepted: [ '1668665916@qq.com' ],
  rejected: [],
  response: '250 Ok: queued as ',
  envelope: { from: '536505032@qq.com', to: [ '1668665916@qq.com' ] },
  messageId: '1451383934958-3e89c2f9-74052b8a-495ae996@qq.com'
}
```

## test

```sh
npm install
npm test
```

## screenshots
- active

  ![active](https://raw.githubusercontent.com/wodog/tw-mail/master/screenshots/active.png)

- validate

  ![validate](https://raw.githubusercontent.com/wodog/tw-mail/master/screenshots/validate.png)

- passreset

  ![passreset](https://raw.githubusercontent.com/wodog/tw-mail/master/screenshots/passreset.png)
