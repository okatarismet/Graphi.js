// import { restricted } from '../middlewares/checkAuth.js';
import ipfilter from 'express-ipfilter';
const IpFilter = ipfilter.IpFilter;
//clickfunnel whitelist
const clickfunnel_whitelist = ['127.0.0.1'];

export const applyMiddleware = ( middleware, router) => {
  for (const f of middleware) {
    f(router);
  }
};

export const applyRoutes = (routes, router) => {
  for (const route of routes) {
    const { method, path, ROLES, TIER, handler } = route;
   
      (router)[method.toLowerCase()](path, (req,res,next) => restricted( req, res, next, ROLES, TIER), handler);
    
  }
};

export const setRoutes = (routes, app) => {
  Object.keys(routes).forEach(route => {
    app.all(`/${route}(/?*)`, routes[route])
  })
}