const express = require('express');
const {hasPermission} = require('./middleware');

const app = express();
app.use(express.json());

app.get('/api/:asset', hasPermission('destroy'), (req, res) => {
  res.send('Got Permission');
});

app.put('/api/:asset', hasPermission('consume'), (req, res) => {
  res.send('Got Permission');
});

app.delete('/api/:asset', hasPermission('destroy'), (req, res) => {
  res.send('Got Permission');
});

app.listen(8080, () => {
  console.log('listening on port 8080');
});
