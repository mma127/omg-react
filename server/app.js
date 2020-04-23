import express from 'express';
import session from 'express-session';
import passport from "passport";
import { Strategy } from "passport-steam";
import cors from 'cors';
import path from 'path';
import mysql from 'mysql2';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import apiRouter from './routes/api';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import "core-js/stable";
import "regenerator-runtime/runtime";
import models from './models/';

import logger, { stream } from './utils/logger';
import { APP_DOMAIN, ENVIRONMENT, IS_PRODUCTION, SESSION_SECRET, STEAM_API_KEY } from './utils/secrets';

logger.log("debug", "Secrets for " + APP_DOMAIN);
logger.log("debug", SESSION_SECRET + " " + ENVIRONMENT + " " + STEAM_API_KEY);

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Steam profile is serialized
//   and deserialized.
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(
    new Strategy(
        {
            returnURL: APP_DOMAIN + "/api/auth/steam/return",
            realm: APP_DOMAIN,
            apiKey: STEAM_API_KEY
        },
        function (identifier, profile, done) {
            // On successful authentication from the OpenID source, 
            // attempt to find the corresponding Player record using the openId token.
            // If not found, create a new Player.
            // Always check to update the player name and avatar
            models.Player.findOrCreate(
                {
                    where: {
                        openId: profile.id
                    },
                    defaults: {
                        displayName: profile.displayName,
                        avatar: profile._json.avatarmedium
                    }
                })
                .then(([player, created]) => {
                    if (created) {
                        console.log('Created new Player')
                        console.log(player.get({ plain: true }));
                    } else {
                        // Check if name/avatar have changed
                        if (profile.displayName !== player.displayName) {
                            player.displayName = profile.displayName;
                        }
                        if (profile._json.avatarmedium !== player.avatar) {
                            player.avatar = profile._json.avatarmedium;
                        }
                        player.lastActive = new Date(); // TODO not enough if the user is logged in for a long time
                        player.save();
                    }

                    // TODO update player with new name/avatar if changed
                    return done(undefined, player);
                });
        }
    ));

const app = express();

const sess = {
    secret: SESSION_SECRET,
    name: "omgSteamID",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: true,
        httpOnly: true
    }
};
if (IS_PRODUCTION) {
    app.set("trust proxy", 1); // Trust first proxy
    sess.cookie.secure = true;
}
app.use(session(sess));

session.Session.prototype.login = function (user, cb) {
    const req = this.req;
    req.session.regenerate(function (err) {
        if (err) {
            cb(err);
        }
    })
    req.session.userInfo = user;
    cb();
}

const corsOptions = {
    origin: APP_DOMAIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: 'include',
    exposedHeaders: ['x-auth-token']
};
app.use(cors());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('combined', { stream })); // TODO is this necessary still?
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, '../client/build')));

/* Catch all route */
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

export default app;