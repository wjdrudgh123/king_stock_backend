import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.routes = routes;
  res.locals.adminLogin = false;
  next();
};

export const chkAdmin = (req, res, next) => {
  const {
    body: { password },
  } = req;
  const password2 = process.env.ADMIN_PS;

  if (password === password2) {
    res.locals.adminLogin = true;
    next();
  } else {
    res.redirect(routes.admin);
  }
};
