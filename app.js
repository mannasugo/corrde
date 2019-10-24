const {createSecureServer} = require(`http2`);
const fs = require(`fs`);

const {router} = require(`./corrde-control`);
//const {mysql} = require(`./corrde-util`);

//mysql();

let app = createSecureServer({
  key: fs.readFileSync(`http2/ssl/server.key`),
  cert: fs.readFileSync(`http2/ssl/server.crt`),
  allowHTTP1: true
}, (req, res) => {
  router(req, res);
});

app.on(`error`, (err) => console.error(err));
app.listen(8124);