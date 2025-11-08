// const jwt = require('jsonwebtoken');

// const adminLogin = (req, res) => {
//   const { username, password } = req.body;

//   // Load from .env
//   const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
//   const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

//   if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
//     // Generate JWT Token
//     const token = jwt.sign(
//       { username: ADMIN_USERNAME },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     res.status(200).json({
//       message: 'Admin login successful',
//       token
//     });
//   } else {
//     res.status(401).json({ message: 'Invalid username or password' });
//   }
// };

// module.exports = { adminLogin };



const jwt = require('jsonwebtoken');

const adminLogin = (req, res) => {
  const { username, password } = req.body;

  const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { username: ADMIN_USERNAME },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Admin login successful',
      token
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
};

module.exports = { adminLogin };
