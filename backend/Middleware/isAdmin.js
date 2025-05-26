const isAdmin = (req, res, next) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ msg: 'User not authenticated' });
  }

  if (user.role && user.role.toLowerCase() === 'admin') {
    return next();
  }

  return res.status(403).json({ msg: 'Access denied. Admins only.' });
};

export default isAdmin;
