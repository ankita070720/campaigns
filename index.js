const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("data.json");
const middlewares = jsonServer.default();
const = process.env.PORT || 8080;

server.use(middlewares);
server.use(router);
server.listen(port);