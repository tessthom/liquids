// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// export const authenticateUser = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ msg: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.userId);
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Unauthorized', err });
//   }
// };