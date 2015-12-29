# tw-mail

  trend wood mail module.

### install

```bash
npm install tw-mail
```

### set up

  first, you should create `config.js` in your current work directory.

  and then, add some config in it, just like below:

```js
module.exports = {
  name: '小窝狗测试',
  host: 'localhost',

  /**
   * mail options
   */
  mail_opts: {
    host: 'smtp.qq.com',
    port: '587',
    auth: {
      user: 'your username',
      pass: 'your password'
    }
  }
};
```

### usage

```js
var tw-mail = require('tw-mail');

var options = {
  email: 'xxx@qq.com',  // the email address where you want to send
  token: 'xxxxxx',    // the token string what you want to send
  username: 'xxx'   // the username who you want to send
}

// send resetpass mail
tw_mail.sendResetPassMail(options, callback);

// send validate mail
tw_mail.sendValidateMail(options, callback);

// send active mail
tw_mail.sendActiveMail(options, callback);
```

### test

```bash
sudo npm install -g mocha
mocha -t 5000 ./node_modules/tw-mail/test
```

### screenshots

- active

  ![active](https://raw.githubusercontent.com/wodog/tw-mail/master/screenshots/active.png)

- validate

  ![validate](https://raw.githubusercontent.com/wodog/tw-mail/master/screenshots/validate.png)

- passreset

  ![passreset](https://raw.githubusercontent.com/wodog/tw-mail/master/screenshots/passreset.png)
