import "regenerator-runtime/runtime";
import express from 'express';
import pool from '../utils/pool';
import { ensureAuthenticated } from '../utils/passport';

const router = express.Router();

/* GET users listing. */
router.get('/', ensureAuthenticated, async function (req, res, next) {
  let [player] = await pool.query('SELECT * FROM players');
  console.log('Promise query results: ', player);

  res.json([
    {
      id: 1,
      username: "asdf"
    }, {
      id: 2,
      username: 'rtyert'
    }
  ])
});

export default router;
