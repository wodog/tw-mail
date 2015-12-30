# tw-mail

  trend wood mail module.

### install

```bash
npm install tw-mail
```

### set up

  first, you should create `config.js`.

  and then, add some config in it, just like below:

```js
module.exports = {
  name: '小窝狗测试',  //required
  host: 'localhost',  //required

  /**
   * mail options
   */
  mail_opts: {  //required
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
var config = require('config');
var tw-mail = require('tw-mail')(config);

var options = {
  email: '536505032@qq.com',  // the email address where you want to send
  token: '123456',    // the token string what you want to send
  username: 'wodog99'   // the username who you want to send
}

// send resetpass mail
tw_mail.sendResetPassMail(options, callback);

// send validate mail
tw_mail.sendValidateMail(options, callback);

// send active mail
tw_mail.sendActiveMail(options, callback);
```

### response

```js
{
  accepted: [ '1668665916@qq.com' ],
  rejected: [],
  response: '250 Ok: queued as ',
  envelope: { from: '536505032@qq.com', to: [ '1668665916@qq.com' ] },
  messageId: '1451383934958-3e89c2f9-74052b8a-495ae996@qq.com'
}
```

### test

```sh
npm install
npm test
```

### screenshots

- active

  ![active](https://raw.githubusercontent.com/wodog/tw-mail/master/screenshots/active.png)

- validate

  ![validate](https://raw.githubusercontent.com/wodog/tw-mail/master/screenshots/validate.png)

- passreset

  ![passreset](https://raw.githubusercontent.com/wodog/tw-mail/master/screenshots/passreset.png)
