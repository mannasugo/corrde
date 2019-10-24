const fs = require(`fs`),
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
}

module.exports = {

  UAPublic (level, req, res) {
    new UAPublic(level, req, res).handleUACalls();
  }
}