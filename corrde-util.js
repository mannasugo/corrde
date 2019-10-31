const fs = require(`fs`),
  crypto = require(`crypto`),
  mysql = require(`mysql`),
  cookie = require(`cookie`),
  
  config = require(`./corrde-config`),
  model = require(`./corrde-model`)

class Auxll {

  constructor () {}

  modelStyler (file, callback) {
    fs.readFile(file, {encoding: `utf8`}, (err, SString) => {
      for (let trim in config.rexp.cssSlim) {
        SString = SString.replace(config.rexp.cssSlim[trim], trim);
      }
      return callback(SString);
    });
  }
}

class Sql extends Auxll {
  
  constructor () {
    super();
    this.iniSql = mysql.createConnection({
      host: config.sqlPass.h,
      user: config.sqlPass.u,
      password: config.sqlPass.p});
    this.uniSql = mysql.createConnection({
      host: config.sqlPass.h,
      user: config.sqlPass.u,
      password: config.sqlPass.p,
      database: config.sqlPass.d});
    this.multiSql = mysql.createConnection({
      host: config.sqlPass.h,
      user: config.sqlPass.u,
      password: config.sqlPass.p,
      database: config.sqlPass.d,
      multipleStatements: true});
  }

  ini () {
    this.iniSql.query(config.sql.db, () => {
      this.multiSql.query(
        `${config.sql.u};`);
      this.multiSql.end();
    });
    this.iniSql.end();
  }

  fValue (allVars, call) {
    this.uniSql.query({
      sql: config.sql.fv,
      values: [allVars.table, allVars.field, allVars.fieldValue]
    }, (A, B, C) => call(A, B, C));
    this.uniSql.end();
  }

  to (allVars, call) {
    this.uniSql.query({
      sql: config.sql.to,
      values: allVars}, (A, B, C) => call(A, B, C));
    this.uniSql.end();
  }
}

class UAPublic extends Auxll {

  constructor (level, req, res) {
    super();
    this.levelState = level;
    this.app = {fro: req, to: res};
  }

  handleUACalls () {

    if (this.levelState === ``) this.rootCall();
  }

  rootCall () {

    this.modelStyler(config.cd.css, CSSString => {

      let modelMapping = {
        title: `Corrde`,
        css: CSSString,
        appendModel: ``
      };

      modelMapping[`appendModel`] = [model.rootModel()];

      this.app.to.writeHead(200, config.reqMime.htm);
      this.app.to.end(model.call(modelMapping));
      });
  }

  u () {}

  p () {
    
  }
}

class ViaAJX {

  constructor (q, req, res) {
    this.q = q;
    this.app = {fro: req, to: res};
  }

  AJXCalls () {
    if (this.q.setup) {
      this.setup(JSON.parse(this.q.setup));
    }

    if (this.q.ini) this.ini(JSON.parse(this.q.ini));

    if (this.q.urlCall) this.urlCall(JSON.parse(this.q.urlCall));

    if (this.q.passValid) this.passValid(JSON.parse(this.q.passValid));
  }

  setup (q) {
    let modelMapping = {
      appendModel: model.setup()};

    this.app.to.writeHead(200, config.reqMime.json);
    this.app.to.end(JSON.stringify(model.modal(modelMapping)));
  }

  ini (q) {
    new Sql().fValue({
      table: `u`, 
      field: `mail`, fieldValue: q[1]}, (A, B, C) => {console.log(A)

        if (B.length === 0) {

          let localSt_ = new Date().valueOf();

          let localSt_Sum = crypto.createHash(`md5`).update(`${localSt_}`, `utf8`).digest(`hex`);

          let mailPass = crypto.createHash(`md5`).update(q[2], `utf8`);

          new Sql().to([`u`, {
            alt: q[0],
            mail: q[1],
            mug: `null`,
            pass: mailPass.digest(`hex`),
            St_: localSt_,
            sum: localSt_Sum}], (A, B, C) => {
              this.iniCookie(`u`, localSt_Sum);

              let modelMapping = {
                appendModel: model.mode()};

              this.app.to.writeHead(200, config.reqMime.json);
              this.app.to.end(JSON.stringify(model.modal(modelMapping)));
            });
        }});
  }

  iniCookie (field, value) {
    this.app.to.setHeader(`Set-Cookie`, cookie.serialize(field, value, {
      httpOnly: true,
      path: `/`,
      secure: true}));
  }

  urlCall (q) {
    let cJar = cookie.parse(this.app.fro.headers.cookie);

    if (!cJar.u) return;

    this.app.to.writeHead(200, config.reqMime.json);
    this.app.to.end(JSON.stringify({
      url: q.url}));
  }

  passValid (q) {
    new Sql().fValue({
      table: `u`,
      field: `mail`,
      fieldValue: q[0]}, (A, B, C) => {
        if (B.length === 1) {
          let hexPass = crypto.createHash(`md5`).update(q[1], `utf8`);
          if (B[0].pass === hexPass.digest(`hex`)) {
            this.iniCookie(`u`, B[0].sum);

            this.app.to.writeHead(200, config.reqMime.json);
            this.app.to.end(JSON.stringify({url: config.cd.u}));
          }
        }
      });
  }
}

module.exports = {

  mysql () {
    new Sql().ini();
  },

  UAPublic (level, req, res) {
    new UAPublic(level, req, res).handleUACalls();
  },

  viaAJX (q, to, fro) {
    new ViaAJX(q, to, fro).AJXCalls();
  }
}