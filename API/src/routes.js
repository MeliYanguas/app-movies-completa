const express = require('express');
const router = express.Router();

router.get('/movies', (req, res) => {
    req.getConnection((err, connection) => {
      if (err) return res.status(500).send(err);
  
      connection.query('SELECT * FROM movies', (err, rows) => {
        if (err) return res.status(500).send(err);

        res.json(rows);
      });
    });
  });

router.get('/movies/:id', (req, res) => {
  req.getConnection((err, connection) => {
    if (err) return res.status(500).send(err);

    connection.query('SELECT * FROM movies WHERE id = ?', [req.params.id], (err, rows) => {
      if (err) return res.status(500).send(err);

      res.json(rows[0]);
    });
  });
});

router.put('/movies/:id', (req, res) => {
  const { title, description } = req.body;
  if (!(title && description)) {
    return res.status(400).send('Verifique los campos');
  }
  req.getConnection((err, connection) => {
    if (err) return res.send(err);
    connection.query('UPDATE movies set ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
      if (err) return res.status(500).send(err);

      res.send('Los datos han sido actualizados');
    });
  });
});

router.post('/movies', (req, res) => {
  const { title, description } = req.body;
  if (!(title && description)) {
    return res.status(400).send('Completar los campos');
  }
  req.getConnection((err, connection) => {
    if (err) return res.status(500).send(err);
    connection.query('INSERT INTO movies set ?', [req.body], (err, rows) => {
      if (err) return res.status(500).send(err);

      res.send('Pelicula agregada a la lista');
    });
  });
});

router.delete('/movies/:id', (req, res) => {
  req.getConnection((err, connection) => {
    if (err) return res.send(err);
    connection.query('DELETE FROM movies WHERE id = ?', [req.params.id], (err, rows) => {
      if (err) return res.status(500).send(err);

      res.send('La pelicula ha sido removida');
    });
  });
});

module.exports = router;