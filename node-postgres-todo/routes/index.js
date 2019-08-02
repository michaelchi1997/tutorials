var express = require('express');
var router = express.Router();
const pg = require('pg');
const path = require('path');

const fs = require('fs');

const databaseConfig = JSON.parse(fs.readFileSync('./models/config.json')).development;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

router.post('/api/v1/todos', (req, res, next) => {

  const results = [];
  // Grab data from http request
  const data = {text: req.body.text, complete: false};
  // Get a Postgres client from the connection pool
  pg.connect(databaseConfig, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO items(text, complete) values($1, $2)',
    [data.text, data.complete]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

router.get('/api/v1/todos', (req, res, next) => {
  const query = "SELECT * FROM items ORDER BY id ASC;";
  pg.connect(databaseConfig, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    client.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({success: false, data: err});
      } else {
        done();
        return res.json(results.rows);
      }
    });
  });
});

router.put('/api/v1/todos/:id', (req, res, next) => {

  const data = {text: req.body.text, complete: req.body.complete};
  const id = req.params.id;
  const query = {
    text: "UPDATE items SET text=$1, complete = $2 WHERE id = $3",
    values: [data.text, data.complete, id]
  };

  pg.connect(databaseConfig, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    client.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({success: false, data: err});
      } else {
        done();
        return res.json(results.rows);
      }
    });
  });
});

router.delete('/api/v1/todos/:id', (req, res, next) => {
  const id = req.params.id;
  const query = {
    text: "DELETE FROM items WHERE id = $1",
    values: [id]
  };

  pg.connect(databaseConfig, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    client.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({success: false, data: err});
      } else {
        done();
        return res.json(results.rows);
      }
    });
  });
});

module.exports = router;
