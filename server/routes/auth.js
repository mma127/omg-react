import express from 'express';
import passport from "passport";
import { APP_DOMAIN } from '../utils/secrets';
import { ensureAuthenticated } from '../utils/passport';
import { keysToCamel } from '../utils/parsing';

const router = express.Router();

// const REDIRECT_URL = IS_PRODUCTION ? '/' : 'https://localhost:3000/';
const REDIRECT_URL = APP_DOMAIN;

router.get('/user', ensureAuthenticated, (req, res) => {
    // Return the authenticated user, if available, else null
    res.send(JSON.stringify(keysToCamel(req.user)));
});

// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steamcommunity.com.  After authenticating, Steam will redirect the
//   user back to this application at /auth/steam/return
router.get("/steam", passport.authenticate("steam"), (req, res) => {
    // The request will be redirected to Steam for authentication, so
    // this function will not be called.
    res.redirect(REDIRECT_URL);
});

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
    "/steam/return",
    function(req, res, next){
        req.url = req.originalUrl;
        next();
    },
    passport.authenticate("steam", { failureRedirect: '/failed_login', session: true }),
    (req, res) => {
        res.redirect(REDIRECT_URL);
    }
);

// GET /auth/logout
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(REDIRECT_URL);
});

export default router;