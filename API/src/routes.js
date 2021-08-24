const express = require('express');

const router = express.Router();

router.get('/movies', (req, res) => {
  req.getConnection((err, connection) => {
    if (err) return res.status(500).send(err);

    connection.query('SELECT id,title,description,year FROM movies', (err, rows) => {
      if (err) return res.status(500).send(err);

      res.json(rows);
    });
  });
});

router.get('/movies/:id', (req, res) => {
  req.getConnection((err, connection) => {
    if (err) return res.status(500).send(err);

    connection.query('SELECT id,title,description,year FROM movies WHERE id = ?', [req.params.id], (err, rows) => {
      if (err) return res.status(500).send(err);

      res.json(rows[0]);
    });
  });
});

router.put('/movies/:id', (req, res) => {
  const { title, description } = req.body;
  if (!(title && description)) {
    return res.status(400).send('fields cannot be empty');
  }
  req.getConnection((err, connection) => {
    if (err) return res.send(err);
    connection.query('UPDATE movies set ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
      if (err) return res.status(500).send(err);

      res.send('data updated');
    });
  });
});

router.post('/movies', (req, res) => {
  const { title, description } = req.body;
  if (!(title && description)) {
    return res.status(400).send('fields cannot be empty');
  }
  req.getConnection((err, connection) => {
    if (err) return res.status(500).send(err);
    connection.query('INSERT INTO movies set ?', [req.body], (err, rows) => {
      if (err) return res.status(500).send(err);

      res.send('movie added to the list');
    });
  });
});

router.delete('/movies/:id', (req, res) => {
  req.getConnection((err, connection) => {
    if (err) return res.send(err);
    connection.query('DELETE FROM movies WHERE id = ?', [req.params.id], (err, rows) => {
      if (err) return res.status(500).send(err);

      res.send('movie has been removed');
    });
  });
});

module.exports = router;
