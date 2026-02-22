const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('User');

const register = async (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  try {
    const user = new User({ name, email });
    user.setPassword(password);

    await user.save();

    const token = user.generateJwt();
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

const login = (req, res) => {
  if (!req.body?.email || !req.body?.password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ message: 'Login error', error: err.message });

    if (!user) {
      return res.status(401).json(info || { message: 'Login failed' });
    }

    const token = user.generateJwt();
    return res.status(200).json({ token });
  })(req, res);
};

module.exports = {
  register,
  login
};