const passport = require('passport');
const MyStrategy = require('../utils/myStrategy');
const accountService = require('../services/accountService');
const authService = require('../services/authService');

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    try {
        const fetchedAccount = await accountService.getAccountByUsername(
            username,
        );

        if (!fetchedAccount || !fetchedAccount.enabled) {
            return done(null, false);
        }

        done(null, fetchedAccount);
    } catch (error) {
        done(error);
    }
});

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(
        new MyStrategy(
            async (loginKey, password, done) => {
                try {
                    const rs = await authService.login(loginKey, password);

                    if (rs) {
                        done(null, rs);
                    } else {
                        done(null, false);
                    }
                } catch (error) {
                    done(error);
                }
            },
            {
                loginKey: 'loginKey',
                password: 'password',
            },
        ),
    );
};
