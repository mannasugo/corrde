const config = require(`./corrde-config`)

class ModelString {
  
  constructor() {
    this.appendString = ``;
  }
  
  modelStringify (model) {
    if (typeof model !== `object`) return;
    model.forEach(miniModel => {
      let a = miniModel.tag;
      let z = a;
      if (miniModel.tag_) a = miniModel.tag_;
      this.appendString += `<` + a;
      if (miniModel.flags) {
        for (let flag in miniModel.flags) {
          this.appendString += ` ` + flag + `='` + miniModel.flags[flag] + `'`;
        }
      }
      this.appendString += `>`;
      if (miniModel.closure) this.appendString += miniModel.closure;
      if (miniModel.tagChild) this.modelStringify(miniModel.tagChild);
      let queer = [`img`, `input`, `meta`];
      if (queer.indexOf(miniModel.tag) === -1) this.appendString += `</` + z + `>`; 
    });
    return this.appendString;
  }
}

module.exports = {

  modelString (model) {
    return new ModelString().modelStringify(model);
  },

  call (mapping) {
    return this.modelString(this.root(mapping));
  },

  root (mapping) {
    return [{
      tag: `html`, tag_: `!doctype html><html`, flags: {lang: `en`}, tagChild: [{
        tag: `head`, tagChild: [
          {tag: `meta`, flags: {charset: `utf-8`}},
          {tag: `title`, closure: mapping.title}, {tag: `meta`, flags: {
            name: `viewport`, content: `width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no`}
          }, {tag: `style`, flags: {type: `text/css`}, closure: mapping.css}]
      }, {tag: `body`, tagChild: mapping.appendModel}]
    }];
  },
  
  rootModel () {
    return {}
  }
}