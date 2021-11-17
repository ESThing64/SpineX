const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  try {
    res.render('homepage')
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    res.render('dashboard', {
      loggedIn: req.session.logged_in,
    })

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;