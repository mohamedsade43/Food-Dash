const admin = (req, res, next) => {
  console.log("Admin Middleware req.user:", req.user); // Debugging log

  if (req.user && req.user) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { admin };
