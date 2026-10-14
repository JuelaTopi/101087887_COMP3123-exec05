const express = require('express');
const user = require('../user.json');
const router = express.Router();

router.get('/profile', (req, res) => {
  res.json(user);
});

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};

  if (username !== user.username) {
    return res.json({
      status: false,
      message: 'User Name is invalid'
    });
  }

  if (password !== user.password) {
    return res.json({
      status: false,
      message: 'Password is invalid'
    });
  }

  return res.json({
    status: true,
    message: 'User Is valid'
  });
});

router.get('/logout/:username', (req, res) => {
  const username = req.params.username.replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };

    return entities[character];
  });

  res.send(`<b>${username} successfully logged out.</b>`);
});

module.exports = router;