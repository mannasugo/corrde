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
    return {
      tag: `span`, flags: {id: `corrde-root`}, tagChild: [{
        tag: `section`, flags: {class: `_miY`}, tagChild: [{
          tag: `main`, flags: {class: `_xC2`}, tagChild: [{
            tag: `article`, flags: {class: `_XQ2`}, tagChild: [{
              tag: `div`, flags: {class: `_xCQ`}, tagChild: [{
                tag: `div`, flags: {style: `padding: 30px 15px; font-size: 15px;`}, tagChild: [{
                  tag: `div`, flags: {class: `_Ctx`}, closure: `corrde.`
                }, {
                  tag: `p`, flags: {class: ``}, closure: `Corrde is both a job hailing and job 
                   outsourcing web service for informal and casual tasks. Corrde acts as a 'cord' 
                   between the client (job-source) and the service-provider (job-hailer).`
                }, {
                  tag: `div`, flags: {style: `padding: 40px 0 0`}, tagChild: [{
                    tag: `p`, closure: `Are You a Client looking for a Quick Fix or interested in a quick and casual job?`
                  }, {
                    tag: `div`, flags: {class: `_sxC`}, tagChild: [{
                      tag: `button`, flags: {class: `_bsZ`}, closure: `Sign Up`
                    }]
                  }]
                }/*, {
                  tag: `div`, flags: {style: `padding: 40px 0 0`}, tagChild: [{
                    tag: `p`, closure: `Are You looking for a Quick Fix Job ?`
                  }, {
                    tag: `div`, flags: {class: `_sxC`}, tagChild: [{
                      tag: `button`, flags: {class: `_bsZ`}, closure: `Sign Up as a Service-Provider`
                    }]
                  }]
                }*/]
              }]
            }, {
              tag: `div`, flags: {class: `_xCQ_`}, tagChild: [{
                tag: `div`, flags: {style: `text-align: center`}, tagChild: [{
                  tag: `form`, flags: {class: `_UGA`, autocomplete: `off`}, tagChild: [{
                    tag: `div`, flags: {class: `_txU`}, closure: `Account login`}, {
                    tag: `div`, flags: {class: `_gBC _gBA`}, tagChild: [{
                  tag: `div`, flags: {class: `_UFA`}, tagChild: [{
                    tag: `input`, flags: {class: `_RRD`, placeholder: `email`, type: `text`}
                  }]
                }, {
                  tag: `div`, flags: {class: `_UFA`}, tagChild: [{
                    tag: `input`, flags: {class: `_RRD`, placeholder: `password`, type: `password`}
                  }]
                }]
              }, {
                tag: `div`, flags: {class: `_FFe`}, tagChild: [{
                  tag: `button`, flags: {class: `RRc RRe GHc _bsZ`}, closure: `Sign in`
                }]
              }, {
                tag: `p`, flags: {class: `_GXe`}, tagChild: [{
                  tag: `a`, flags: {class: `_THa`, href: `javascript:;`}, closure: `Forgot Password?`
                }]
              }]
            }, {
              tag: `div`, flags: {class: `_Ctx`}, closure: ``
            }/*, {
                  tag: `form`, flags: {class: `_UGA`, autocomplete: `off`}, tagChild: [{
                    tag: `div`, flags: {class: `_txU`}, closure: `log in as client`}, {
                    tag: `div`, flags: {class: `_gBC _gBA`}, tagChild: [{
                  tag: `div`, flags: {class: `_UFA`}, tagChild: [{
                    tag: `input`, flags: {class: `_RRD`, placeholder: `email`, type: `text`}
                  }]
                }, {
                  tag: `div`, flags: {class: `_UFA`}, tagChild: [{
                    tag: `input`, flags: {class: `_RRD`, placeholder: `password`, type: `password`}
                  }]
                }]
              }, {
                tag: `div`, flags: {class: `_FFe`}, tagChild: [{
                  tag: `button`, flags: {class: `RRc RRe GHc _bsZ`}, closure: `Sign in`
                }]
              }, {
                tag: `p`, flags: {class: `_GXe`}, tagChild: [{
                  tag: `a`, flags: {class: `_THa`, href: `javascript:;`}, closure: `Sign up as client`
                }]
              }]
            }*/]
              }]
            }]
          }]
        }, {
          tag: `footer`, flags: {class: `_CuH`}, tagChild: [{
            tag: `div`, flags: {style: `padding: 38px 0;`, class: `_gxM _XQ2`}, tagChild: [{
              tag: `div`, flags: {class: `_geQ`}, tagChild: [{
                tag: `a`, flags: {href: config.cd.platform, class: `_uHB`}, closure: `About`
              }]
          }, {
              tag: `div`, flags: {class: `_geQ`}, tagChild: [{
                tag: `a`, flags: {href: config.cd.us, class: `_uHB`}, closure: `Team`
              }]
          }, {
              tag: `div`, flags: {class: `_geQ`}, tagChild: [{
                tag: `a`, flags: {href: config.cd.jobs, class: `_uHB`}, closure: `Jobs`
              }]
          }, {
              tag: `div`, flags: {class: `_geQ`}, tagChild: [{
                tag: `a`, flags: {href: config.to.support, class: `_uHB`}, closure: `Support`
              }]
          }, {
              tag: `div`, flags: {class: `_geQ`}, tagChild: [{
                tag: `a`, flags: {href: config.to.dev, class: `_uHB`}, closure: `Developers`
              }]
            }, {tag: `span`, flags: {class: `_szU`}, closure: `2019 CORRDE.`}]
          }]
        }]
      }, {
        tag: `script`, flags: {src: `/` + config.cd.utilJS}
      }, {
        tag: `script`, flags: {src:  config.cd.unauJS}
      }]
    };
  },

  modal (mapping) {
    return [{
      tag: `div`, flags: {class: `_UQe`, id: `modal`}, tagChild: [{
        tag: `div`, flags: {class: `_HUa`}
      }, {
        tag: `div`, flags: {class: `_UfX`, flag: `smallScreen`}, tagChild: [{
          tag: `div`, flags: {class: `_oPQ`}, tagChild:  mapping.appendModel
        }]
      }]
    }];
  },

  setup () {
    return [{
      tag: `div`, flags: {class: `_Ysz`}, tagChild: [{
        tag: `div`, flags: {class: `_uCX`}, tagChild: [{
          tag: `div`, flags: {class: `_txU`}, closure: `register account`}, {
            tag: `div`, flags: {class: `_gBC _gBA`}, tagChild: [{
              tag: `div`, flags: {class: `_UFA`}, tagChild: [{
                tag: `input`, flags: {class: `_RRD`, placeholder: `name`, type: `text`}
              }]
            }, {
              tag: `div`, flags: {class: `_UFA`}, tagChild: [{
                tag: `input`, flags: {class: `_RRD`, placeholder: `email`, type: `email`}
              }]
            }, {
              tag: `div`, flags: {class: `_UFA`}, tagChild: [{
                tag: `input`, flags: {class: `_RRD`, placeholder: `password`, type: `password`}
              }]
            }]
          }, {
            tag: `div`, flags: {class: `_FFe`}, tagChild: [{
              tag: `button`, flags: {class: `_bsZ`}, closure: `Proceed`
            }]
          }]
        }]
    }];
  },

  mode () {
    return [{
      tag: `div`, flags: {class: `_Ysz`}, tagChild: [{
        tag: `div`, flags: {class: `_uCX`}, tagChild: [{
          tag: `div`, flags: {class: `_txU`}, closure: `choose mode to proceed`}, {
            tag: `div`, flags: {class: `_FFe`}, tagChild: [{
              tag: `button`, flags: {class: `_bsZ`}, closure: `Client Mode`
            }]
          }, {
            tag: `div`, flags: {class: `_FFe`}, tagChild: [{
              tag: `button`, flags: {class: `_bsZ`}, closure: `Freelance Mode`
            }]
          }]
        }]
    }];
  }
}