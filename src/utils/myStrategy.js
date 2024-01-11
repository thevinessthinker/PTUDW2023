const { Strategy } = require('passport-strategy');
const passport = require('passport');

class MyStrategy extends Strategy {
    constructor(verify, options) {
        super();
        this.name = 'myStrategy';
        this.verify = verify;
        this.loginKeyField =
            options && options.loginKey ? options.loginKey : 'loginKey';
        this.passwordField =
            options && options.password ? options.password : 'password';

        passport.strategies[this.name] = this;
    }

    authenticate(req, options) {
        const loginKey = req.body[this.loginKeyField];
        const password = req.body[this.passwordField];
        this.verify(loginKey, password, (err, user) => {
            if (err) {
                return this.fail(err);
            }
            if (!user) {
                return this.fail('Invalid credentials');
            }

            this.success(user);
        });
    }
}

module.exports = MyStrategy;
