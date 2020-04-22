import "regenerator-runtime/runtime";
import express from 'express';
import sequelize from '../utils/sequelize';
import models from '../models';
import { ensureAuthenticated } from '../utils/passport';

const router = express.Router();

/* GET users listing. */
router.get('/', ensureAuthenticated, async function (req, res, next) {
  const players = await models.Player.findAll();
  console.log('Promise query results: ', players);

  res.json([
    {
      id: 1,
      username: "asdf"
    }, {
      id: 2,
      username: 'rtyert'
    }
  ]);
});

export default router;
