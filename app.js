const {createSecureServer} = require(`http2`);
const fs = require(`fs`);

const {router} = require(`./corrde-control`),
      {RouteTCP} = require(`./corrde-control`);

const Util = require(`./corrde-util`);

Util.Sql.debug;

Util.Sql.ini;

let app = createSecureServer({
  key: fs.readFileSync(`http2/ssl/privkey.pem`),
  cert: fs.readFileSync(`http2/ssl/fullchain.pem`),
  allowHTTP1: true
}, (req, res) => {
  router(req, res);
});

RouteTCP(require(`socket.io`).listen(app));

app.on(`error`, (err) => console.error(err));
app.listen(8124);