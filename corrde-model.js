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

class Util {

  timeFormat (time) {

    let then = new Date(parseInt(time)), lapse = (new Date - then)/1000, lapseString;

    if (lapse < 86400*5) {

      if (lapse >= 0) lapseString = Math.floor(lapse) + ` second`;

      if (lapse >= 60) lapseString = Math.floor(lapse/60) + ` minute`;

      if (lapse >= 3600) lapseString = Math.floor(lapse/3600) + ` hour`;

      if (lapse >= 86400) lapseString = Math.floor(lapse/86400) + ` day`;

      if (parseInt(lapseString) >= 2) lapseString = `${lapseString}s`;

      lapseString += ` ago`;
    } else {

      let listMonths = [
        `January`,
        `February`,
        `March`,
        `April`,
        `May`,
        `June`,
        `July`,
        `August`,
        `September`,
        `October`,
        `November`,
        `December`];

      lapseString = then.getDate() + ` ` + listMonths[then.getMonth()] + ` ` + then.getFullYear();
    }
    
    return lapseString;
  }

  ticker (time) {

    let then = new Date(parseInt(time)), lapse = (then - new Date)/1000, lapseString;console.log(time)

    if (lapse < 86400*5) {

      if (lapse >= 0) lapseString = Math.floor(lapse) + ` second`;

      if (lapse >= 60) lapseString = Math.floor(lapse/60) + ` minute`;

      if (lapse >= 3600) lapseString = Math.floor(lapse/3600) + ` hour`;

      if (lapse >= 86400) lapseString = Math.floor(lapse/86400) + ` day`;

      if (parseInt(lapseString) >= 2) lapseString = `${lapseString}s`;

      //lapseString += ` ago`;
    } else {

      let listMonths = [
        `January`,
        `February`,
        `March`,
        `April`,
        `May`,
        `June`,
        `July`,
        `August`,
        `September`,
        `October`,
        `November`,
        `December`];

      lapseString = then.getDate() + ` ` + listMonths[then.getMonth()] + ` ` + then.getFullYear();
    }
    
    return lapseString;
  }
}

module.exports = {

  log: (time) => new Util().timeFormat(time),

  tick: sec => new Util().ticker(sec),

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
                tag: `div`, flags: {style: `padding: 30px 15px; font-size: 13px;`}, tagChild: [{
                  tag: `div`, flags: {class: `_gxM _gcQ`}, tagChild: [{
                    tag: `span`, flags: {class: `_Ctx`}, closure: `corrde.`
                  }, {
                    tag: `span`, flags: {class: `_tCc`}, closure: `beta`
                  }]
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
                    tag: `div`, flags: {class: `_txU`}, closure: `Sign In`}, {
                    tag: `div`, flags: {class: `_gBC _gBA`}, tagChild: [{
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
                  tag: `button`, flags: {class: `_bsZ`}, closure: `Sign in`
                }]
              }, {
                tag: `p`, flags: {class: `_GXe`}, tagChild: [{
                  tag: `a`, flags: {class: `_THa`, href: `javascript:;`}, closure: `Forgot Password?`
                }]
              }]
            }, {
              tag: `div`, flags: {class: `_Ctx`}, closure: ``
            }, {
              tag: `div`, flags: {style: `display: none`, class: `_yCR`}, tagChild: [{
                tag: `div`, flags: {style: `margin: auto`, class: `-_-Z _gM_a _agM`}, tagChild: [{
                  tag: `a`, flags: {role: `sale`, href: `#`, class: `_TX_a _atX`}, closure: `Sign Up`
                }]
              }]
            }]
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
                tag: `a`, flags: {href: config.cd.support, class: `_uHB`}, closure: `Support`
              }]
          }, {
              tag: `div`, flags: {class: `_geQ`}, tagChild: [{
                tag: `a`, flags: {href: config.cd.dev, class: `_uHB`}, closure: `Developers`
              }]
            }, {tag: `span`, flags: {class: `_szU`}, closure: `© 2019 CORRDE.`}]
          }]
        }]
      }, {
        tag: `script`, flags: {src: config.cd.utilJS}
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
              tag: `button`, flags: {class: `_bsZ`}, closure: `seller`
            }]
          }, {
            tag: `div`, flags: {class: `_FFe`}, tagChild: [{
              tag: `button`, flags: {class: `_bsZ`}, closure: `market`
            }]
          }]
        }]
    }];
  },

  controls () {
    return {
      tag: `div`, flags: {class: `_gHm _aGX _-gs`}, tagChild: [{
        tag: `div`, flags: {class: `_xGy`}, tagChild: [{
          tag: `div`, flags: {style: `background: #fff;`, class: `_gxM _gMX _uxq _egZ`}, tagChild: [{
            tag: `div`, flags: {class: `_geQ _gMX`}, tagChild: [{
              tag: `a`, flags: {href: `/p/`, class: `-_tX StatsPlaneColor`}, closure: `Stats`
            }]
          },{
            tag: `div`, flags: {class: `_geQ _gMX`}, tagChild: [{
              tag: `a`, flags: {href: `#`, class: `-_tX SearchColor`}, closure: `Search`
            }]
          },{
            tag: `div`, flags: {class: `_geQ _gMX`}, tagChild: [{
              tag: `a`, flags: {href: `#`, class: `-_tX SellColor`}, closure: `Sell`
            }]
          }, {
            tag: `div`, flags: {class: `_geQ _gMX`}, tagChild: [{
              tag: `a`, flags: {role: `isMail`, href: `#`, class: `-_tX MailColor`}, closure: `Mail`
            }]
          }, {
            tag: `div`, flags: {class: `_geQ _gMX`}, tagChild: [{
              tag: `a`, flags: {href: `/mug/`, class: `-_tX MugColor`}, closure: `Mug`
            }]
          }]
        }]
      }]
    };
  },

  uModel (mapping) {
    return [{
      tag: `span`, flags: {id: `corrde-root`}, tagChild: [{
        tag: `section`, flags: {class: `_miY`}, tagChild: [{
          tag: `main`, flags: {class: `_xC2`}, tagChild: [{
            tag: `section`, flags: {style: `padding-top: 60px`}, tagChild: [{
              tag: `div`, flags: {class: `_aGX`}, tagChild: [{
                tag: `div`, tagChild: mapping.appendModel
              }, this.controls()]
            }]
          }]
        }, {
          tag: `nav`, flags: {class: `_uHC`}, tagChild: [{tag: `div`, flags: {class: `_xCt`}}, {
            tag: `div`, flags: {class: ``}, tagChild: [{
              tag: `div`, flags: {class: `_-tY`}, tagChild: [{
                tag: `div`, flags: {class: `_aXz`}, tagChild: [{
                  tag: `div`, flags: {class: `_-Xg _gxM`}, tagChild: [{
                    tag: `a`, flags: {class: `_tXa`, href: `/`}, closure: `corrde`
                  }, {
                    tag: `span`, flags: {class: `_tCc`}, closure: `beta`
                  }]
                }, {
                  tag: `div`, flags: {class: `_QZg`}, tagChild: [{
                    tag: `div`, flags: {class: `_gM_a _agM`}, tagChild: [{
                      tag: `a`, flags: {for: ``, class: `_TX_a _atX`, href: `#`}, closure: `switch to market`}]
                  }]
                }]
              }]
            }]
          }]
        }]
      }, {
        tag: `aside`, tagChild: this.JS(mapping)
      }]
    }, {
        tag: `div`, tagChild: this.modal({
          appendModel: [this.beta()]
        })
      }];
  },

  pModel (mapping) {
    return [{
      tag: `span`, flags: {id: `corrde-root`}, tagChild: [{
        tag: `section`, flags: {class: `_miY`}, tagChild: [{
          tag: `main`, flags: {class: `_xC2`}, tagChild: [{
            tag: `section`, flags: {style: `padding-top: 60px`}, tagChild: [{
              tag: `div`, flags: {class: `_aGX`}, tagChild: [{
                tag: `div`, tagChild: mapping.appendModel
              }, this.controls()]
            }]
          }]
        }, {
          tag: `nav`, flags: {class: `_uHC`}, tagChild: [{tag: `div`, flags: {class: `_xCt`}}, {
            tag: `div`, flags: {class: ``}, tagChild: [{
              tag: `div`, flags: {class: `_-tY`}, tagChild: [{
                tag: `div`, flags: {class: `_aXz`}, tagChild: [{
                  tag: `div`, flags: {class: `_-Xg _gxM`}, tagChild: [{
                    tag: `a`, flags: {class: `_tXa`, href: `/`}, closure: `corrde`
                  }, {
                    tag: `span`, flags: {class: `_tCc`}, closure: `beta`
                  }]
                }, {
                  tag: `div`, flags: {class: `_QZg`}, tagChild: [{
                    tag: `div`, flags: {class: `_gM_a _agM`}, tagChild: [{
                      tag: `a`, flags: {for: ``, class: `_TX_a _atX`, href: `#`}, closure: `switch to seller`}]
                  }]
                }]
              }]
            }]
          }]
        }]
      }, {
        tag: `aside`, tagChild: this.JS(mapping)
      }]
    }, {
        tag: `div`, tagChild: this.modal({
          appendModel: [this.beta()]
        })
      }];
  },

  null (mapping) {
    return {
      tag: `div`, flags: {style: `max-width: 75%`, class: `_qQS _gM_a _agM`}, tagChild: [{
        tag: `a`, flags: {for: ``, class: `_TX_a _atX`, href: `#`}, closure: mapping.raw}]
    };
  },

  JS (mapping) {
    return [{
      tag: `script`, flags: {src: config.cd.utilJS}
    }, {
      tag: `script`, flags: {type: `text/javascript`}, closure: 
        `JSStore.to(${mapping.JSStore})`}, {
        tag: `script`, flags: {src:  config.cd.auJS}
    }]
  },

  fieldSale () {

    let fields = config.fields, fieldsModel = [], index = 0;

    for (let field in fields) {
      fieldsModel[index] = {
        tag: `div`, flags: {class: `_dVP`}, tagChild: [{
          tag: `label`, flags: {class: `_cVP _btX`, role: `radio`}, tagChild: [{
            tag: `input`, flags: {type: `radio`, name: `field`, value: field}
          }, {
            tag: `span`, flags: {class: `_tCw`}, closure: field
          }]
        }]
      }
      ++index;
    };


    return [{
      tag: `div`, flags: {class: `_Ysz`}, tagChild: [{
        tag: `div`, flags: {class: `_uCX`}, tagChild: [{
          tag: `div`, flags: {class: `_tCx`}, closure: `Select task category`}, {
            tag: `div`, tagChild: fieldsModel
          }, {/*
            tag: `div`, flags: {style: `margin: auto`, class: `_gM_a _agM`}, tagChild: [{
              tag: `a`, flags: {href: `#`, class: `_TX_a _atX`}, closure: `Proceed`
            }]
          */}]
        }]
    }];
  },

  /*inifield*/subSale (mapping) {
    let fields = config.fields[mapping.u.field], fieldsModel = [], index = 0;

    for (let field in fields) {
      fieldsModel[index] = {
        tag: `div`, flags: {class: `_dVP`}, tagChild: [{
          tag: `label`, flags: {class: `_cVP _btX`, role: `radio`}, tagChild: [{
            tag: `input`, flags: {type: `radio`, name: `fieldSub`, value: fields[index]}
          }, {
            tag: `span`, flags: {class: `_tCw`}, closure: fields[index]
          }]
        }]
      }
      ++index;
    };


    return [{
      tag: `div`, flags: {class: `_Ysz`}, tagChild: [{
        tag: `div`, flags: {class: `_uCX`}, tagChild: [{
          tag: `div`, flags: {class: `_tCx`}, closure: `Select skill category`}, {
            tag: `div`, tagChild: fieldsModel
          }, {/*
            tag: `div`, flags: {style: `margin: auto`, class: `_gM_a _agM`}, tagChild: [{
              tag: `a`, flags: {href: `#`, class: `_TX_a _atX`}, closure: `Proceed`
            }]
          */}]
        }]
    }];
  },

  sale (mapping) {
    return [{
      tag: `div`, flags: {class: `_Ysz`}, tagChild: [{
        tag: `div`, flags: {class: `_tSx`}, closure: mapping.u.field + ` : ` + mapping.u.fieldSub
      }, {
        tag: `div`, flags: {class: `_uCX`}, tagChild: [{
          tag: `div`, flags: {class: `_tCx`}, closure: `Describe Your Task`}, {
            tag: `div`, flags: {class: `_eYG`}, tagChild: [{
              tag: `textarea`, flags: {class: `-_tyq`, autocomplete: `off`, placeholder: `Type text here`}
            }]
          }, {
            tag: `div`, flags: {class: `_yCR`}, tagChild:[{
              tag: `div`, flags: {class: `_tCx`}, closure: `Application Deadline`, tagChild: [{
                tag: `div`, flags: {class: `gBC gBA`}, tagChild: [{
                  tag: `div`, flags: {class: `_UFA`}, tagChild: [{
                    tag: `input`, flags: {class: `_RRD`, placeholder: `Time in Days`, type: `text`}
                  }]
                }]
              }]
            }]
          }, {
            tag: `div`, flags: {class: `_yCR`}, tagChild:[{
              tag: `div`, flags: {class: `_tCx`}, closure: `Budget`, tagChild: [{
                tag: `div`, flags: {class: `gBC gBA`}, tagChild: [{
                  tag: `div`, flags: {class: `_UFA`}, tagChild: [{
                    tag: `input`, flags: {class: `_RRD`, placeholder: `Budget in Dollars`, type: `text`}
                  }]
                }]
              }]
            }]
          }, {
            tag: `div`, flags: {class: `_yCR`}, tagChild:[{
              tag: `div`, flags: {class: `_tCx`}, closure: `Location`, tagChild: [{
                tag: `div`, flags: {class: `gBC gBA`}, tagChild: [{
                  tag: `div`, flags: {class: `_UFA`}, tagChild: [{
                    tag: `input`, flags: {class: `_RRD`, placeholder: `County`, type: `text`}
                  }]
                }, {
                  tag: `div`, flags: {class: `_UFA`}, tagChild: [{
                    tag: `input`, flags: {class: `_RRD`, placeholder: `Town`, type: `text`}
                  }]
                }]
              }]
            }]
          }, {
            tag: `div`, flags: {class: `_yCR`}, tagChild: [{
              tag: `div`, flags: {style: `margin: auto`, class: `_gM_a _agM`}, tagChild: [{
                tag: `a`, flags: {role: `sale`, href: `#`, class: `_TX_a _atX`}, closure: `Proceed`
              }]
            }]
          }]
        }]
    }];
  },

  sales (mapping) {
    let salesModel = [];

    mapping.s.forEach((sale, index) => {

      let cord = sale.location.split(`-`);

      salesModel[index] = {
        tag: `div`, flags: {style: `margin: 0 0 55px`, class: `_uxq`}, tagChild: [{
          tag: `div`, flags: {style: `background: #e3e3e6`}, tagChild: [{
            tag: `span`, flags: {class: `_tSx _tXv`}, closure: sale.type.split(`:`)[0] + ` : ` + sale.type.split(`:`)[1]
          }]
        }, {
          tag: `div`, flags: {class: `_gBC`}, tagChild: [{
            tag: `div`, flags: {style: `padding: 10px 0`, class: `_gxM`}, tagChild: [{
              tag: `div`, flags: {style: `margin: 0`, class: `_eYG`}, tagChild: [{
                tag: `span`, flags: {style: `color: #999`, class: `_tXv`}, closure: cord[0] + `, ` + cord[1]
              }]
            }, {
              tag: `div`, flags: {class: `_QZg`}, tagChild: [{
                tag: `span`, flags: {style: `font-weight: 600`,}, closure: `$` + sale.pay
              }]
            }]
          }, {
            tag: `div`, flags: {style: `margin: 10px 0`}, tagChild: [{
              tag: `span`, closure: sale.blab
            }]
          }]
        }, {
          tag: `div`, flags: {style: `border-top: 1px solid #efefef;`, class: `_gBC`}, tagChild: [{
            tag: `div`, flags: {style: `padding: 10px 0`, class: `_gxM`}, tagChild: [{
              tag: `div`, flags: {class: `eYG uxq`}, tagChild: [{
                tag: `div`, flags: {class: `geQ gMX`}, tagChild: [{
                  tag: `a`, flags: {role: `stats-` + sale.sum + `-` + sale.uSum, href: `#`, class: `-_tX StatsPlaneColor`}, closure:
                   `StatsCircle`
                }]
              }]
            }, {
              tag: `div`, flags: {class: `_QZg`}, tagChild: [{
                tag: `span`, flags: {class: `_szU`}, closure: this.log(sale.St_)
              }]
            }]
          }]
        }]
      } 
    });

    return salesModel;
  },

  market (mapping) {
    let salesModel = [];

    mapping.s.forEach((sale, index) => {

      let cord = sale.location.split(`-`);

      salesModel[index] = {
        tag: `div`, flags: {style: `margin: 0 0 55px`, class: `_uxq`}, tagChild: [{
          tag: `div`, flags: {style: `background: #e3e3e6`}, tagChild: [{
            tag: `span`, flags: {class: `_tSx _tXv`}, closure: sale.type.split(`:`)[0] + ` : ` + sale.type.split(`:`)[1]
          }]
        }, {
          tag: `div`, flags: {class: `_gBC`}, tagChild: [{
            tag: `div`, flags: {style: `padding: 10px 0`, class: `_gxM`}, tagChild: [{
              tag: `div`, flags: {style: `margin: 0`, class: `_eYG`}, tagChild: [{
                tag: `span`, flags: {style: `color: #999`, class: `_tXv`}, closure: cord[0] + `, ` + cord[1]
              }]
            }]
          }, {
            tag: `div`, flags: {style: `padding: 10px 0`}, tagChild: [{
              tag: `span`, closure: sale.blab
            }]
          }, {
            tag: `div`, flags: {style: `padding: 10px 0`,}, tagChild: [{
              tag: `div`, flags: {class: `_gxM`}, tagChild: [{
                tag: `div`, flags: {style: `padding-right: 25px`,class: `_tXx`}, tagChild: [{
                  tag: `span`, flags: {class: `_tCx`}, closure: `Earn`
                }, {
                  tag: `span`, flags: {class: `_szU`}, closure: sale.pay
                }]
              }, {
                tag: `div`, flags: {class: `_tXx`}, tagChild: [{
                  tag: `span`, flags: {class: `_tCx`}, closure: `Closes in`
                }, {
                  tag: `span`, flags: {class: `_szU`}, closure: 
                  this.tick(parseInt(sale.St_) + (parseInt(sale.St_to) * 86400000))
                }]
              }, {
                tag: `div`, flags: {class: `_ZSg _QZg`}, tagChild: [{
                  tag: `div`, flags: {class: `_gM_a _agM`}, tagChild: [{
                    tag: `a`, flags: {role: `stats-` + sale.sum + `-` + sale.uSum, href: `#`, class: `_TX_a _atX qXS`}, closure:
                     `explore`
                  }]
                }]
              }]
            }]
          }]
        }, {
          tag: `div`, flags: {style: `border-top: 1px solid #efefef;`, class: `_gBC`}, tagChild: [{
            tag: `div`, flags: {style: `padding: 10px 0`, class: `_gxM`}, tagChild: [{
              tag: `div`, flags: {class: `eYG uxq`}, tagChild: [{
                tag: `div`, flags: {class: `geQ gMX`}, tagChild: [{
                  tag: `a`, flags: {role: `stats-` + sale.sum + `-` + sale.uSum, href: `#`, class: `-_tX StatsPlaneColor`}, closure: 
                  `StatsCircle`
                }]
              }]
            }, {
              tag: `div`, flags: {class: `_QZg`}, tagChild: [{
                tag: `span`, flags: {class: `_szU`}, closure: this.log(sale.St_)
              }]
            }]
          }]
        }]
      } 
    });

    return salesModel;
  },

  metric (mapping) {
    return {
      tag: `span`, flags: {id: `corrde-root`}, tagChild: [{
        tag: `section`, flags: {class: `_miY`}, tagChild: [{
          tag: `main`, flags: {class: `_xC2`}, tagChild: [{
            tag: `section`, flags: {style: `padding-top: 60px`}, tagChild: [{
              tag: `div`, flags: {class: `_aGX`}, tagChild: [{
                tag: `div`, tagChild: [{
                  tag: `div`, flags: {style: `border-radius: 100px`, class: `_gxM _gMX _uxq`}, tagChild: [{
                    tag: `div`, flags: {class: `_geQ _gMX`}, tagChild: [{
                      tag: `div`, flags: {class: `_Sq_a`}, tagChild: [{
                        tag: `div`, flags: {class:`_gMX _btx`}, closure: `2`
                      }, {
                        tag: `div`, flags: {class:`_gMX _SYa`}, closure: `Users`
                      }]
                    }]
                  }, {
                    tag: `div`, flags: {class: `_geQ _gMX`}, tagChild: [{
                      tag: `div`, flags: {class: `_Sq_a`}, tagChild: [{
                        tag: `div`, flags: {class:`_gMX _btx`}, closure: `0`
                      }, {
                        tag: `div`, flags: {class:`_gMX _SYa`}, closure: `Orders`
                      }]
                    }]
                  }, {
                    tag: `div`, flags: {class: `_geQ _gMX`}, tagChild: [{
                      tag: `div`, flags: {class: `_Sq_a`}, tagChild: [{
                        tag: `div`, flags: {class:`_gMX _btx`}, closure: `0`
                      }, {
                        tag: `div`, flags: {class:`_gMX _SYa`}, closure: `Complete Orders`
                      }]
                    }]
                  }, {
                    tag: `div`, flags: {class: `_geQ _gMX`}, tagChild: [{
                      tag: `div`, flags: {class: `_Sq_a`}, tagChild: [{
                        tag: `div`, flags: {class:`_gMX _btx`}, closure: `2`
                      }, {
                        tag: `div`, flags: {class:`_gMX _SYa`}, closure: `Today's Orders`
                      }]
                    }]
                  }]
                }]
              }, {}]
            }]
          }]
        }, {
          tag: `nav`, flags: {class: `_uHC`}, tagChild: [{tag: `div`, flags: {class: `_xCt`}}, {
            tag: `div`, flags: {class: ``}, tagChild: [{
              tag: `div`, flags: {class: `_-tY`}, tagChild: [{
                tag: `div`, flags: {class: `_aXz`}, tagChild: [{
                  tag: `div`, flags: {class: `_-Xg`}, tagChild: [{
                    tag: `a`, flags: {class: `_tXa`, href: `/metric`}, closure: `corrde metrics`
                  }]
                }, {
                  tag: `div`, flags: {class: `_QZg`}, tagChild: [{
                    tag: `div`, flags: {class: `_gM_a _agM`}, tagChild: [{
                      tag: `a`, flags: {for: ``, class: `_TX_a _atX`, href: `#`}, closure: `Server Metrics`}]
                  }]
                }]
              }]
            }]
          }]
        }]
      }, {
        tag: `aside`, tagChild: []
      }]
    };
  },

  uStats (mapping) {

    //mapping = mapping.s;

    let activeModel = [];

    mapping.active.forEach((active, index) => {
      activeModel[index] = { tag: 
        `div`, flags: {class: `gxM`}, tagChild: [{ tag: 
          `div`, flags: {class: `_eYG uxq`}, tagChild: [{ tag: 
            `div`, flags: {class: `geQ gMX`}, tagChild: [{ tag: 
              `a`, flags: {style: `text-transform: capitalize`, href: `#`}, closure: 
                active.type.split(`:`)[0] + ` : ` + active.type.split(`:`)[1]
              }]
            }]
          }, { tag: 
            `div`, flags: {class: `_gMX`}, tagChild: [{ tag: 
              `div`, flags: {class: `_eYG uxq`}, tagChild: [{ tag: 
                `div`, flags: {class: `geQ gMX`}, tagChild: [{ tag: 
                  `span`, flags: {}, closure: `Budget`
                  }]
                }]
              }, { tag: 
                `div`, flags: {class: `QZg`}, tagChild: [{ tag: 
                  `span`, flags: {class: `szU`}, closure: active.pay
                  }]
                }]
            }]
      }
    });

    return { tag: 
      `div`, flags: {class: `_uxq`}, tagChild: [{ tag: 
        `div`, flags: {style: `background: #e3e3e6`}, tagChild: [{ tag: 
          `span`, flags: {class: `_tSx _tXv`}, closure: mapping.title
          }]
        }, { tag: 
          `div`, flags: {class: `_Ysz _uCX`}, tagChild: [{ tag: 
            `div`, flags: {class: `gBC`}, tagChild: [{ tag: 
              `div`, flags: {style: `margin: 10px 0`}, tagChild: [{ tag: 
                `span`, closure: mapping.desc
                }]
              }, { tag: 
                `div`, flags: {style: `padding: 10px 0`, class: `_gxM`}, tagChild: [{ tag: 
                  `div`, flags: {style: `margin: 0`, class: `_eYG`}, tagChild: [{ tag: 
                    `span`, flags: {style: `color: #999`, class: `_tXv`}, closure: mapping.geo
                    }]
                  }, { tag: 
                    `div`, flags: {class: `_QZg`}, tagChild: [{ tag: 
                      `span`, flags: {style: `font-weight: 600`,}, closure: mapping.pay
                      }]
                    }]
                }, { tag: 
                  `div`, flags: {class: `_yCR`}, tagChild: [{ tag: 
                    `div`, flags: {style: `margin: auto`, class: `_gM_a _agM`}, tagChild: [{ tag: 
                      `a`, flags: {role: mapping.rl + mapping.sums, href: `#`, class: `_TX_a _atX`}, closure: 
                      mapping.action
                      }]
                    }]
                  }, { tag: 
                    `div`, flags: {class: `_yCR _tXx`}, tagChild:[{ tag: 
                      `div`, flags: {class: `_tCx _uHg`}, closure: `Status`
                      }, { tag: 
                        `div`, flags: {class: `gBC gBA`}, tagChild: [{ tag: 
                          `div`, flags: {class: `_gxM`}, tagChild: [{ tag: 
                            `div`, flags: {class: `_eYG uxq`}, tagChild: [{ tag: 
                              `div`, flags: {class: `geQ gMX`}, tagChild: [{ tag: 
                                `span`, flags: {}, closure: `Due in`
                                }]
                              }]
                            }, { tag: 
                              `div`, flags: {class: `_QZg`}, tagChild: [{ tag: 
                                `span`, flags: {class: `_szU`}, closure: 
                                this.tick(parseInt(mapping.then) + (parseInt(mapping.timer) * 1000))
                                }]
                              }]
                          }, { tag: 
                            `div`, flags: {class: `_gxM`}, tagChild: [{ tag: 
                              `div`, flags: {class: `_eYG uxq`}, tagChild: [{ tag: 
                                `div`, flags: {class: `geQ gMX`}, tagChild: [{ tag: 
                                  `span`, flags: {}, closure: `Applications`
                                  }]
                                }]
                              }, { tag: 
                                `div`, flags: {class: `_QZg`}, tagChild: [{ tag: 
                                  `span`, flags: {class: `_szU`}, closure: mapping.applications
                                  }]
                                }]
                            }, { tag: 
                              `div`, flags: {class: `_gxM`}, tagChild: [{ tag: 
                                `div`, flags: {class: `_eYG uxq`}, tagChild: [{ tag: 
                                  `div`, flags: {class: `geQ gMX`}, tagChild: [{ tag: 
                                    `span`, flags: {}, closure: `Hires`
                                    }]
                                  }]
                                }, { tag: 
                                  `div`, flags: {class: `_QZg`}, tagChild: [{ tag: 
                                    `span`, flags: {class: `_szU`}, closure: mapping[`hires`]
                                    }]
                                  }]
                              }]
                        }]
                    }, { tag: 
                      `div`, flags: {class: `_yCR _tXx`}, tagChild:[{ tag: 
                        `div`, flags: {class: `_tCx _uHg`}, closure: `Seller's History`
                        }, { tag: 
                          `div`, flags: {class: `yCR`}, tagChild:[{ tag: 
                            `div`, flags: {class: `_tCx`}, closure: `Active Jobs`
                            }, { tag: 
                              `div`, flags: {class: `gBC gBA`}, tagChild: activeModel
                              }]
                          }]
                      }]
            }]
      }]
    } 
  },

  pStats (mapping) {

    let /*poolsStack = mapping.poolsStack,*/ pModel = [];

    mapping.pool.forEach((pool, index) => {

      pModel[index] = {
        tag: `div`, flags: {class: `_gMB _gcQ`}, tagChild: [{
          tag: `span`, flags: {class: `_cCq`, style: `width: 30px; height: 30px`}, tagChild: [{
            tag: `img`, flags: {src: ``, alt: ``}
          }]
        }, {
          tag: `div`, flags: {class: `_eYG`}, tagChild: [{
            tag: `div`, flags: {class: `_QxM`}, tagChild: [{
              tag: `span`, flags: {class: `_tXv`}, closure: pool.alt}]
          }/*, {
            tag: `div`, closure: `22`}*/]
        }, {
          tag: `div`, flags: {class: `_QZg`}, tagChild: [{
            tag: `div`, flags: {class: `geQ gMX`}, tagChild: [{
              tag: `a`, flags: {role: `pool-` + pool.jsum + `-` + mapping.u + `-` + pool.sum,
               href: `#`, class: `-_tX ProceedColor`}, closure:
                   `uProceed`
              }]
            }]
        }]
      };
    });

    return {tag: 
      `div`, flags: {class: `_Ysz`}, tagChild: [{tag: 
        `div`, flags: {class: `_tSx`}, tagChild: [{
              tag: `div`, flags: {class: `_ZCg _gxM _gcQ`}, tagChild: [ {
                tag: `div`, flags: {class: `_eYG`}, tagChild: [{
                  tag: `span`, flags: {class: `_tXx`} , closure: `Applications`
                }]
              }, {
                tag: `div`, flags: {class: `_ZSg _QZg`}, tagChild: [{
                  tag: `div`, flags: {class: `gM_a agM`}, tagChild: [{
                    tag: `a`, flags: {role: `close`, href: `#`, class: `-_tX DelColor`}
                  }]
                }]
              }]
            }]
        }, {tag: 
          `div`, flags: {class: `_uCX`}, tagChild: pModel
          }]
      };
  },

  poolStats (pool) {
    return {tag: 
      `div`, flags: {class: `_Ysz`}, tagChild: [{tag: 
        `div`, flags: {class: `_tSx _gxM _geQ`}, tagChild: [{tag: 
          `div`, flags: {class: `geQ gMX`}, tagChild: [{tag: 
            `a`, flags: {role: `close`, href: `#`, class: `-_tX FroColor`}, closure:`fro`
            }]
          }, {
          tag: `div`, flags: {class: `_QZg`}, tagChild: [{
            tag: `div`, flags: {class: `_gM_a _agM`}, tagChild: [{
              tag: `a`, flags: {role: `talkto-` + pool.logSum + `-` + pool.sum + `-` + pool.pro,
               class: `_TX_a _atX`, href: `#`}, closure: `Interview`}]
            }]
        }]
        }, {tag: 
          `div`, flags: {class: `_uCX`}, tagChild: [{
        tag: `div`, flags: {class: `_gMB _gcQ`}, tagChild: [{
          tag: `span`, flags: {class: `_cCq`, style: `width: 60px; height: 60px`}, tagChild: [{
            tag: `img`, flags: {src: ``, alt: ``}
          }]
        }, {
          tag: `div`, flags: {style: `font-weight:600`, class: `_eYG`}, tagChild: [{
            tag: `div`, flags: {class: `_QxM`}, tagChild: [{
              tag: `span`, flags: {class: `_tXv`}, closure: pool.alt}]
          }, {
            tag: `div`, flags: {class: `_gxM _geQ`}, tagChild: [{
              tag: `span`, flags: {class: `_utC`}, closure: pool.freq + ` `
            }, {
              tag: `span`, flags: {class: `-_tX StarMiniColor`}, closure:
                   `uProceed`
              }]
            }]
        }, {
          tag: `div`, flags: {class: `_QZg`}, tagChild: [{
            tag: `div`, flags: {class: `_gM_a _agM`}, tagChild: [{
              tag: `a`, flags: {role: `giveto-` + pool.logSum + `-` + pool.sum + `-` + pool.pro,
               class: `_TX_a _atX`, href: `#`}, closure: `Book`}]
            }]
        }]
      },/* { tag: 
          `div`, flags: {class: `_yCR _tXx`}, tagChild:[{ tag: 
            `div`, flags: {class: `_tCx _uHg`}, closure: `Ratings`
            }, { tag: 
                `div`, flags: {class: `yCR _gxM`}, tagChild:[{ tag: 
                  `div`, flags: {class: `_gxM _eYG`}, tagChild: [{ tag: 
                    //`div`,  tagChild: [{tag: 
                      `span`, flags: {class: `_tCx _tXv`}, closure: `Machinery : Electrical Repair and Maintenance`//}]
                    }] 
                  }, {
                      tag: `div`, flags: {class:`_gxM`}, tagChild: [{tag: 
                        `div`, flags: {class: `_geQ _gxM`}, tagChild: [{
                          tag: `div`, flags: {class: `_utC`}, tagChild: [{
                            tag: `span`, flags: {class: `_utC`}, closure: `0.0 `
                          }]
                        }, {
                          tag: `div`, tagChild: [{
                            tag: `span`, flags: {role: `pool`, class: `-_tX StarMiniColor`}, closure:
                          `uProceed`
                          }]
                        }]
                      }]
                    }]
                }]
            }, { tag: 
          `div`, flags: {class: `_yCR _tXx`}, tagChild:[{ tag: 
            `div`, flags: {class: `_tCx _uHg`}, closure: `Recent Jobs Completed`
            }, { tag: 
                `div`, flags: {class: `yCR gxM`}, tagChild:[{ tag: 
                  `div`, flags: {class: `_gxM _eYG`}, tagChild: [{ tag: 
                    //`div`,  tagChild: [{tag: 
                      `a`, flags: {href: `#`,class: `_tCx _tXv`}, closure: `Machinery : Electrical Repair and Maintenance`//}]
                    }] 
                  }, {
                    tag: `div`, tagChild: [{
                      tag: `span`, flags: {class: `_tCx`}, closure: `Client's Remarks`
                    }, {
                      tag: `div`, tagChild: [{
                        tag: `span`, flags: {style: `font-style: italic`}, closure: 
                        `Can do attitude towards work, looking forward to more work with him.`
                      }]
                    }, {tag: 
                        `div`, flags: {class: `_geQ _gxM`}, tagChild: [{
                          tag: `div`, flags: {class: `_utC`}, tagChild: [{
                            tag: `span`, flags: {class: `_utC`}, closure: `0.0 `
                          }]
                        }, {
                          tag: `div`, tagChild: [{
                            tag: `span`, flags: {role: `pool`, class: `-_tX StarMiniColor`}, closure:
                          `uProceed`
                          }]
                        }]
                      }]
                  }]
                }]
            }*/]
          }]
      };
  },

  bidSuccess () {

    return {
      tag: `div`, flags: {class: `_Ysz`}, tagChild: [{tag: 
        `div`, flags: {class: `_tSx _gxM _geQ`}, tagChild: [{tag: 
          `div`, flags: {class: `geQ gMX`}, tagChild: [{tag: 
            `a`, flags: {role: `fro`, href: `#`, class: `-_tX FroColor`}, closure:`fro`
            }]
          }, {
            tag: `div`, flags: {class: `_QZg`}, tagChild: [{tag: 
              `div`, flags: {class: `geQ gMX`}, tagChild: [{tag: 
                `a`, flags: {role: `close`, href: `#`, class: `-_tX DelColor`}, closure:`Del`
              }]
            }]
          }]
      }, {tag: 
          `div`, flags: {class: `_uCX`}, tagChild: [{
            tag: `div`, flags: {class: `_gMB _gcQ`}, tagChild: [{
              tag: `span`, flags: {}, closure: `Your bid Was Successful.`
            }]
          }]
        }]
      }

  },

  talkto (pool) {

    let lvl, lvlModel = [];

    pool.pool.forEach((text, index) => {

      if (pool.situ.u === text.toward) {
        lvl = {
                  tag: `div`, flags: {class: `_gcQ`}, tagChild: [{
                    tag: `div`, flags: {style: `overflow: unset`, class: `_aCz _eYG _MtX`}, tagChild: [{
                      tag: `span`, flags: {id: text.cord, class: `_aCz _szU`}, closure: this.log(text.log)
                    }] 
                  }, {
                    tag: `div`, flags: {class: `_QZg`}, tagChild: [{
                      tag: `span`, flags: {class: `_tEx`},  closure: text.txt
                    }]
                  }]
                }
      } else {
        lvl = {
          tag: `div`, flags: {class: `_gcQ`}, tagChild: [{
            tag: `div`, flags: {style: `overflow: unset; margin: 0`, class: `_eYG`}, tagChild: [{
              tag: `span`, flags: {id: text.cord, class: `_tWx`}, closure: text.txt
             }]
          }, {
            tag: `div`, flags: {class: `_aGz _QZg`}, tagChild:[{
              tag: `span`, flags: {class: `_aCz _szU`}, closure: this.log(text.log)
            }] }]
          }
      }

      lvlModel[index] = lvl;

    });

    return [{
      tag: `span`, flags: {id: `corrde-root`}, tagChild: [{
        tag: `section`, flags: {class: `_miY`}, tagChild: [{
          tag: `main`, flags: {class: `_xC2`}, tagChild: [{
            tag: `section`, flags: {style: `padding-top: 30px`}, tagChild: [{
              tag: `div`, flags: {class: `_aGX`}, tagChild: [{
                tag: `div`, flags: {style: `padding: 0 0 75px`}, tagChild: lvlModel
              }, {
      tag: `div`, flags: {style: `bottom: 10px`, class: `_gHm _aGX _-gs`}, tagChild: [{
        tag: `div`, flags: {class: `_xGy`}, tagChild: [{
          tag: `div`, flags: {style: `padding: 0 15px`, class: `_gxM _gMX`}, tagChild: [{
            tag: `div`, flags: {class: `_eYG _3qg`}, tagChild: [{
              tag: `textarea`, flags: {id: `txt`, placeholder: `Type text here`, class: `_Wtx`}
            }]
          }, {
          tag: `div`, flags: {class: `_QZg`}, tagChild: [{
            tag: `div`, flags: {class: `geQ gMX`}, tagChild: [{
              tag: `a`, flags: {role: `talk`, href: `#`, class: `-_tX ProceedColor`}, closure:
                   `uProceed`
              }]
            }]
        }]
        }]
      }]
    }]
            }]
          }]
        }, {
          tag: `nav`, flags: {class: `_uHC`}, tagChild: [{
            tag: `div`, flags: {class: `_xCt`}
          }, {
            tag: `div`, flags: {class: ``}, tagChild: [{
              tag: `div`, flags: {class: `_-tY`}, tagChild: [{
                tag: `div`, flags: {style: `padding: 0`,class: `_aXz`}, tagChild: [{tag: 
                  `div`, flags: {style: `background: #fff`,class: `_gBC _gxM _geQ`}, tagChild: [{tag: 
                    `div`, flags: {class: `geQ gMX`}, tagChild: [{tag: 
                      `a`, flags: {role: `fro`, href: `#`, class: `-_tX FroColor`}, closure:`fro`
                    }]
                }, {
        tag: `div`, flags: {style: `padding: 0`,class: `_eYG _gMB _gcQ`}, tagChild: [{
          tag: `span`, flags: {class: `_cCq`, style: `width: 30px; height: 30px`}, tagChild: [{
            tag: `img`, flags: {src: ``, alt: ``}
          }]
        }, {
          tag: `div`, flags: {style: `font-weight:600`, class: `_eYG`}, tagChild: [{
            tag: `div`, flags: {class: `_QxM`}, tagChild: [{
              tag: `span`, flags: {class: `_tXv`}, closure: pool.alt}]
          }, {
            tag: `div`, flags: {class: `_gxM _geQ`}, tagChild: [{
              tag: `span`, flags: {class: `_utC`}, //closure: pool.freq + ` `
            }, {
              tag: `span`, flags: {style: `display: none`, class: `-_tX `}, closure:
                   `uProceed`
              }]
            }]
        }]
        }, {
                  tag: `div`, flags: {class: `_QZg`}, tagChild: [{tag: 
                    `div`, flags: {class: `geQ gMX`}, tagChild: [{tag: 
                      `a`, flags: {role: `close`, href: `#`, class: `-_tX StatsPlaneColor`}, closure:`Del`
                    }]
                  }]
                }]
              }]
            }]
          }]
        }]
      }, {
        tag: `aside`, tagChild: this.JS(pool)
      }]
    }]
    }];
  },

  isMail(pool) {

    let lvlVar, poolModel = [];

    pool.forEach((lvl, index) => {

      if (lvl.ilk === `apply`) lvl[`txt`] = `sent you an application.`;

      poolModel[index] = {tag: 
        `div`, flags: {class: `_yZS _gxM _geQ`}, tagChild: [{
          tag: `div`, flags: {class: `_ZSg _ZCg _eYG _gcQ`}, tagChild: [{
            tag: `span`, flags: {class: `_cCq`, style: `width: 40px; height: 40px`}, tagChild: [{
              tag: `img`, flags: {src: ``, alt: ``}
            }]
          }, {
            tag: `div`, flags: {style: `font-weight:600`, class: `_eYG`}, tagChild: [{
              tag: `div`, flags: {class: `_QxM`}, tagChild: [{
                tag: `span`, flags: {class: `_tXv`}, closure: lvl.alt}]
            }, {
              tag: `div`, flags: {class: `_gxM _geQ`}, tagChild: [{
                tag: `a`, flags: {id: lvl.cord, class: `_vC-`, role: `talkto-` + lvl.jsum + `-` + lvl.src + `-` + lvl.src_to, href: `#`},
                 closure: lvl[`txt`]
              }]
            }]
          }]
        }, {
          tag: `div`, flags: {class: `_QZg`}, tagChild: [{tag: 
            `div`, flags: {class: `geQ gMX`}, tagChild: [{tag: 
              `span`, flags: {class: `_szU`}, closure:this.log(lvl[`log`])
            }]
          }]
        }]
      }
    });

    return {tag: 
      `div`, flags: {class: `_Ysz`}, tagChild: [{tag: 
        `div`, flags: {class: `_tSx _gxM`}, tagChild: [{
          tag: `div`, flags: {style: `font-weight:600`, class: `_eYG`}, tagChild: [{
            tag: `div`, flags: {class: `_QxM`}, tagChild: [{
              tag: `span`, flags: {class: `_tXv`}, closure: `Notifications`}]
          }]
        }, {
                  tag: `div`, flags: {class: `_QZg`}, tagChild: [{tag: 
                    `div`, flags: {class: `geQ gMX`}, tagChild: [{tag: 
                      `a`, flags: {role: `close`, href: `#`, class: `-_tX DelColor`}, closure:`Del`
                    }]
                  }]
                }]
      }, {tag: 
        `div`, flags: {class: `_uCX`}, tagChild: poolModel
      }]
    };

  },

  mug (pool) {
    return {
      tag: `span`, flags: {id: `corrde-root`}, tagChild: [{
        tag: `section`, flags: {class: `_miY`}, tagChild: [{
          tag: `main`, flags: {class: `_xC2`}, tagChild: [{
            tag: `section`, flags: {style: `padding-top: 60px`}, tagChild: [{
              tag: `div`, flags: {class: `_aGX`}, tagChild: [{
                tag: `div`, tagChild: [{
                  tag: `div`, flags: {style: `border-radius: 4px`, class: `_uxq`}, tagChild: [{
        tag: `div`, flags: {style: `padding: 30px 15px`, class: `_gMB _gcQ`}, tagChild: [{
          tag: `span`, flags: {class: `_cCq`, style: `width: 60px; height: 60px`}, tagChild: [{
            tag: `img`, flags: {src: ``, alt: ``}
          }]
        }, {
          tag: `div`, flags: {style: `font-weight:600`, class: `_eYG`}, tagChild: [{
            tag: `div`, flags: {class: `_QxM`}, tagChild: [{
              tag: `span`, flags: {class: `_tXv`}, closure: pool.alt}]
          }, {
            tag: `div`, flags: {class: `_gxM _geQ`}, tagChild: [{
              tag: `span`, flags: {class: `_utC`}, closure: pool.freq + ` `
            }, {
              tag: `span`, flags: {class: `-_tX StarMiniColor`}, closure:
                   `uProceed`
              }]
            }]
        }, {
          tag: `div`, flags: {class: `_QZg`}, tagChild: [{
            tag: `div`, flags: {class: `_gM_a _agM`}, tagChild: [{
              tag: `a`, flags: {/*role: giveto-` `+ pool.logSum + `-` + pool.sum + `-` + pool.pro`*,*/
               class: `_TX_a _atX`, href: `#`}, closure: `edit`}]
            }]
        }]
      }, {
                tag: `div`, flags: {class: `_Ycl`}, tagChild: [{
                  tag: `div`, flags: {class: `_QZg`}, tagChild: [{
                    tag: `a`, flags: {href: `#`, class: `_szU`}, closure: pool.to + ` clients`
                  }]
                }]
                  }, {
                tag: `div`, flags: {class: `_Ycl`}, tagChild: [{
                  tag: `div`, flags: {class: `_QZg`}, tagChild: [{
                    tag: `a`, flags: {href: `#`, class: `_szU`}, closure: pool.from + ` orders`
                  }]
                }]
                  }, {
                  tag: `div`, flags: {style: ``, class: `_gxM _gMX _Ycl`}, tagChild: [{
                    tag: `div`, flags: {class: `_geQ _gMX`}, tagChild: [{
                      tag: `div`, flags: {class: `Sq_a`}, tagChild: [{
                        tag: `div`, flags: {class:`_gMX _btx`}, closure: pool.from_
                      }, {
                        tag: `div`, flags: {class:`_gMX _SYa`}, closure: `earned`
                      }]
                    }]
                  }, {
                    tag: `div`, flags: {class: `_geQ _gMX`}, tagChild: [{
                      tag: `div`, flags: {class: `Sq_a`}, tagChild: [{
                        tag: `div`, flags: {class:`_gMX _btx`}, closure: pool.to_
                      }, {
                        tag: `div`, flags: {class:`_gMX _SYa`}, closure: `spent`
                      }]
                    }]
                  }]
                }]
                }]
              }, this.controls()]
            }]
          }]
        }, {
          tag: `nav`, flags: {class: `_uHC`}, tagChild: [{tag: `div`, flags: {class: `_xCt`}}, {
            tag: `div`, flags: {class: ``}, tagChild: [{
              tag: `div`, flags: {class: `_-tY`}, tagChild: [{
                tag: `div`, flags: {class: `_aXz`}, tagChild: [{
                  tag: `div`, flags: {class: `_-Xg _gxM`}, tagChild: [{
                    tag: `a`, flags: {class: `_tXa`, href: `/`}, closure: `corrde`
                  }, {
                    tag: `span`, flags: {class: `_tCc`}, closure: `beta`
                  }]
                }, {
                  tag: `div`, flags: {class: `_QZg`}, tagChild: [{
                    tag: `div`, flags: {class: `_gM_a _agM`}, tagChild: [{
                      tag: `a`, flags: {for: ``, class: `_TX_a _atX`, href: `#`}, closure: `settings`}]
                  }]
                }]
              }]
            }]
          }]
        }]
      }, {
        tag: `aside`, tagChild: this.JS(pool)
      }]
    };
  },

  beta () {

    return {
      tag: `div`, tagChild: [{
        tag: `div`, flags: {class: `_gcQ _QZg`}, tagChild: [{
          tag: `span`, tagChild: [{tag: 
            `a`, flags: {role: `close`, href: `#`, class: `-_tX DelColor`}, closure:`Del`
          }]
        }]
      }, {
        tag: `div`, flags: {class: `_gcQ`}, tagChild: [{
          tag: `span`, flags: {class: `_-tQ`}, closure: 
          `Corrde is currently on its beta phase development, optimum plus user experience is greatly
          important to us, as such we have dedicated a channel to ask for assistance and express your 
          views and suggestions, particularly on user experience, interaction and integration, 
          this would in turn help us tailor a more fluid platform for you.`
        }]
      }, {
        tag: `div`, flags: {style: `padding: 22px`, class: `_QZg _gcQ`}, tagChild: [{
          tag: `div`, flags: {class: `_gM_a _agM`}, tagChild: [{
            tag: `a`, flags: {role: `quora`, class: `_TX_a _atX`, href: `/quora/`}, closure: `participate`}]
          }]
        }]
    };
  },

  quora (pool) {

    let issueModel = [],  support = {};

    pool.pool.forEach((issue, index) => {

      if (issue.view === `true`) {
        support = {
            tag: `div`, flags: {class: `_CYc`}, tagChild: [{
              tag: `div`, flags: {class: `_ZSg _QZg`}, tagChild: [{
                tag: `div`, flags: {class: `_gM_a _agM`}, tagChild: [{
                  tag: `a`, flags: {href: `#`, class: `_TX_a _atX _qXS`}, closure: issue.ilk
                }]
              }]
            }]
          }
      }

      let plusModel = [];

      issue.pool.forEach((plus, a) => {

        plusModel[a] = {tag: 
          `div`, flags: {class: `_yZS _gxM _geQ`}, tagChild: [{
            tag: `div`, flags: {class: `_ZSg _ZCg _eYG _gcQ`}, tagChild: [{
              tag: `span`, flags: {class: `_cCq`, style: `width: 30px; height: 30px`}, tagChild: [{
                tag: `img`, flags: {src: ``, alt: ``}
              }]
            }, {
              tag: `div`, flags: {style: `font-weight:600`, class: `_eYG`}, tagChild: [{
                tag: `div`, flags: {class: `_QxM`}, tagChild: [{
                  tag: `span`, flags: {class: `_tXv`}, closure: plus.alt}]
              }, {
                tag: `div`, flags: {class: `_gxM _geQ`}, tagChild: [{
                  tag: `a`, flags: {id: `plus.self_cord`, class: `_vC-`, role: `talk`, href: `#`},
                    closure: plus.txt
                }]
              }]
            }]
          }, {
            tag: `div`, flags: {class: `_QZg`}, tagChild: [{tag: 
              `div`, flags: {class: `geQ gMX`}, tagChild: [{tag: 
                `span`, flags: {class: `_szU`}, closure:this.log(plus.log)
              }]
            }]
          }]
        }
      });

      issueModel[index] = {
        tag: `div`, flags: {class: `_uxq _SYz`}, tagChild: [{
          tag: `div`, flags: {class: `_gcQ _gcl`}, tagChild: [{
            tag: `span`, flags: {style: `width: 30px; height: 30px;`, class: `_cCq`}, tagChild: [{
              tag: `img`, flags: {class: ``}
            }]
          }, {
            tag: `div`, flags: {class: `_eYG`}, tagChild: [{
              tag: `div`, flags: {class: `_QxM`}, tagChild: [{
                tag: `span`, flags: {class: `_tXv _tXx`}, closure: issue.alt
              }]
            }]
          }, {
            tag: `div`, flags: {class: `_QZg`}, tagChild: [{
              tag: `span`, flags: {class: `_szU _tXv`}, closure: this.log(issue.log)
            }]
          }]
        }, {
          tag: `div`, flags: {class: `_gBC`}, tagChild: [{
            tag: `div`, flags: {class: `_CYc`}, tagChild: [{
              tag: `div`, flags: {class: `_ZSg _eYG`}, tagChild: [{
                tag: `div`, flags: {class: `_gM_a _agM`}, tagChild: [{
                  tag: `a`, flags: {href: `#`, class: `_TX_a _atX _qXS`}, closure: issue.ilk
                }]
              }]
            }]
          }, {
            tag: `div`, flags: {class: `_CYc`}, tagChild: [{
              tag: `span`, closure: issue.text
            }]
          }, support]
        }, {
            tag: `div`, flags: {style: `border-top: 1px solid #e6e6e6`, class: `_gcl _gBC`}, tagChild: [{
              tag: `div`, flags: {class: `_CYc _gxM _gcQ`}, tagChild: [{
                tag: `a`, flags: {href: `#`, class: `-_tX StatsPlaneColor`}
              }, {
                tag: `div`, flags: {class: `_eYG`}, tagChild: [{
                  tag: `span`, flags: {class: `_tXx`} , closure: issue.stat
                }]
              }, {
                tag: `div`, flags: {class: `_ZSg _QZg`}, tagChild: [{
                  tag: `div`, flags: {class: `_gM_a _agM`}, tagChild: [{
                    tag: `a`, flags: {id: issue.cord + `-` + issue._src, role: `add-on`, href: `#`, class: `_TX_a _atX qXS`}, closure:
                     `comment`
                  }]
                }]
              }]
            }]
          }, {
            tag: `div`, flags: {class: `_gBC`}, tagChild: plusModel
          }]
      }
    });

    return {
      tag: `span`, flags: {id: `corrde-root`}, tagChild: [{
        tag: `section`, flags: {class: `_miY`}, tagChild: [{
          tag: `main`, flags: {class: `_xC2`}, tagChild: [{
            tag: `section`, flags: {style: `padding-top: 60px; font-size: 13px;`}, tagChild: [{
              tag: `div`, flags: {class: `_aGX`}, tagChild: [{
                tag: `div`, tagChild: issueModel
              }, {
                tag: `div`, flags: {class: `_aGX _zY-`}, tagChild: [{
                  tag: `div`, flags: {class: `_aQz _geQ _gMX`}, tagChild: [{
                    tag: `a`, flags: {role: `issues`, href: `#`, class: `_Yax`}, closure: `+`
                  }]
                }]
              }, this.controls()]
            }]
          }]
        }, {
          tag: `nav`, flags: {class: `_uHC`}, tagChild: [{tag: `div`, flags: {class: `_xCt`}}, {
            tag: `div`, flags: {class: ``}, tagChild: [{
              tag: `div`, flags: {class: `_-tY`}, tagChild: [{
                tag: `div`, flags: {class: `_aXz`}, tagChild: [{
                  tag: `div`, flags: {class: `_-Xg _gxM`}, tagChild: [{
                    tag: `a`, flags: {class: `_tXa`, href: `/`}, closure: `corrde`
                  }, {
                    tag: `span`, flags: {class: `_tCc`}, closure: `beta`
                  }]
                }, {
                  tag: `div`, flags: {class: `_QZg`}, tagChild: [{
                    tag: `div`, flags: {class: `_gM_a _agM`}, tagChild: [{
                      tag: `a`, flags: {role: `fieldQuora`, class: `_TX_a _atX`, href: `#`}, closure: `filter by topic`}]
                  }]
                }]
              }]
            }]
          }]
        }]
      }, {
        tag: `aside`, tagChild: this.JS(pool)
      }]
    };
  },

  quoraMenu (e) {

    let menusModel = [];

    config.quora.forEach((menus, index) => {
      menusModel[index] = {
        tag: `li`, flags: {class: `_clz`}, tagChild: [{
          tag: `a`, flags: {href: `#`, e: menus, class: `_qYx`}, closure: menus
        }]
      }
    });

    return {
      tag: `ul`,flags: {class: `_QXs`}, tagChild: menusModel
    }
  },

  issueMail () {

    return {
      tag: `div`, flags: {class: `_Ysz`}, tagChild: [{
        tag: `div`, flags: {class: `_uCX`}, tagChild: [{
          tag: `div`, flags: {class: ``}, tagChild: [{
            tag: `span`, flags: {class: `_tCx`}, closure: 
            `Start thread to address your questions, opinions and suggestions about this topic here.`
          }]
        }, {
        tag: `div`, flags: {class: `_eYG`}, tagChild: [{
          tag: `textarea`, flags: {id: `issue-talk`, class: `-_tyq`, placeholder: `type text here`}
        }]
      }, {
        tag: `div`, flags: {class: `_yCR`}, tagChild: [{
          tag: `div`, flags: {class: `_gM_a _agM`, style: `margin: auto`}, tagChild: [{
            tag: `a`, flags: {href: `#`, role: `issueTalk`, class: `_TX_a _atX`,}, closure: `post`
          }]
        }]
      }]
      }]
    }
  },

  isissue () {

    return {
      tag: `div`, flags: {class: `_Ysz`}, tagChild: [{
        tag: `div`, flags: {class: `_uCX`}, tagChild: [{
          tag: `div`, flags: {class: ``}, tagChild: [{
            tag: `span`, flags: {class: `_tCx`}, closure: 
            `Provide comment.`
          }]
        }, {
        tag: `div`, flags: {class: `_eYG`}, tagChild: [{
          tag: `textarea`, flags: {id: `issue-to-talk`, class: `-_tyq`, placeholder: `type text here`}
        }]
      }, {
        tag: `div`, flags: {class: `_yCR`}, tagChild: [{
          tag: `div`, flags: {class: `_gM_a _agM`, style: `margin: auto`}, tagChild: [{
            tag: `a`, flags: {href: `#`, role: `issue-to`, class: `_TX_a _atX`,}, closure: `post comment`
          }]
        }]
      }]
      }]
    }
  },

  vacant (pool) {

    return {
      tag: `span`, flags: {id: `corrde-root`}, tagChild: [{
        tag: `section`, flags: {class: `_miY`}, tagChild: [{
          tag: `main`, flags: {class: `_xC2`}, tagChild: [{
            tag: `section`, flags: {style: `padding-top: 60px; font-size: 13px;`}, tagChild: [{
              tag: `div`, flags: {style: `max-width: 900px;`, class: `_aGX`}, tagChild: [{
                tag: `div`, tagChild: [{
                  tag: `div`, tagChild: [{
                    tag: `span`, flags: {class: `_txU`} , closure: `Come join the corrde team`
                  }]
                }, {
                  tag: `div`, tagChild: [{
                    tag: `span`, flags: {class: `_YtS`} , closure: 
                    `We are simplifying the market for blue-collar professionals. We need talented people like you
                    to help us support and expand our high performance web service.`
                  }]
                }, {
                  tag: `div`, flags: {class: `_uZM _CYc`}, tagChild: [{
                    tag: `div`, flags: {class: `ZSg _eYG`}, tagChild: [{
                      tag: `div`, flags: {class: `_gM_a _agM`}, tagChild: [{
                        tag: `a`, flags: {href: `#`, class: `_TX_a _atX qXS`}, closure: `engineering`
                      }]
                    }]
                  }]
                }, {
                  tag: `div`, flags: {id: `dept`}, tagChild: [{
                    tag: `div`, flags: {class: `_uZC`}, tagChild: [{
                      tag: `div`, tagChild: [{
                        tag: `div`, tagChild: [{
                          tag: `h3`, tagChild: [{
                            tag: `a`, flags: {class: `_ttx`, href: `#`}, closure: `System Administrator`
                          }]
                        }, {
                          tag: `div`, flags: {class: `_gxM _CYc`}, tagChild: [{
                            tag: `div`, flags: {class: `_axS`}, tagChild: [{
                              tag: `div`, flags: {class: `_gM_a _agM _guZ`}, tagChild: [{
                                tag: `a`, flags: {href: `#`, class: `_TX_a _atX _qXS _utQ`}, closure: `On-site`
                              }]
                            }]
                          }, {
                            tag: `div`, flags: {class: `_axS`}, tagChild: [{
                              tag: `div`, flags: {class: `_gM_a _agM _guZ`}, tagChild: [{
                                tag: `a`, flags: {href: `#`, class: `_TX_a _atX _qXS _utQ`}, closure: `Remote`
                              }]
                            }]
                          }]
                        }]
                      }, {
                        tag: `div`, flags: {id: `-j0`, class: `_Yxc`}, tagChild: [{
                          tag: `a`, flags: {id: `j0`, role: `job-bin`, class: `_ytx`, href: `#`}, closure: 
                            `corrde.com SysAdmins deliver outstanding technical support support to clients around the clock,
                             around the globe. We are interested in talented technicians to improve our solid foundations
                              while keeping support resources supplies ahead of the demand curve.`
                        }, {
                          tag: `h4`, closure: `Qualifications`
                        }, {
                          tag: `ul`, flags: {class: `_SCz`}, tagChild: [{
                            tag: `li`, closure: 
                              `2+ years admin experience in Linux or BSD (both is a plus)`
                          }, {
                            tag: `li`, closure: 
                              `Possesses superior written and verbal communication skills`
                          }, {
                            tag: `li`, closure: 
                              `Pays attention to detail`
                          }, {
                            tag: `li`, closure: 
                              `Can demonstrate understanding of the following concepts: `,
                              tagChild: [{
                                tag: `ul`, flags: {class: `_iSa`}, tagChild: [{
                                  tag: `li`, closure: `- Server/Application Architecture and Hardening`
                                }, {
                                  tag: `li`, closure: `- Storage Solutions (e.g., Ceph)`
                                }, , {
                                  tag: `li`, closure: `- SMTP Daemons`
                                }, {
                                  tag: `li`, closure: `- TCP/IP (IPv6 familiarity)`
                                }, {
                                  tag: `li`, closure: `- Load Balancing`
                                }, {
                                  tag: `li`, closure: `- Virtualization`
                                }]
                              }]
                          }, {
                            tag: `li`, closure: 
                              `Has experience with the following applications: `,
                              tagChild: [{
                                tag: `ul`, flags: {class: `_iSa`}, tagChild: [{
                                  tag: `li`, closure: `- MySQL (more DBs: a plus)`
                                }, {
                                  tag: `li`, closure: `- iptables (FirewallD)`
                                }, , {
                                  tag: `li`, closure: `- Apache, NGINX`
                                }, {
                                  tag: `li`, closure: `- QEMU/KVM`
                                }, {
                                  tag: `li`, closure: `- cPanel`
                                }, {
                                  tag: `li`, closure: `- R1Soft`
                                }]
                              }]
                          }, {
                            tag: `li`, closure: 
                              `Is familiar with:`,
                              tagChild: [{
                                tag: `ul`, flags: {class: `_iSa`}, tagChild: [{
                                  tag: `li`, closure: `- Log Analysis/Troubleshooting`
                                }, {
                                  tag: `li`, closure: `- Linux Core Utilities`
                                }, , {
                                  tag: `li`, closure: `- SMTP Daemons`
                                }, {
                                  tag: `li`, closure: `- Bash`
                                }]
                              }]
                          }, {
                            tag: `li`, closure: 
                              `Desirable traits/exposure (bonus items):`,
                              tagChild: [{
                                tag: `ul`, flags: {class: `_iSa`}, tagChild: [{
                                  tag: `li`, closure: `- Overnight and Weekend Coverage`
                                }, {
                                  tag: `li`, closure: `- Ansible/Chef/Puppet`
                                }, , {
                                  tag: `li`, closure: `- VPN/Tunnel/VLANs`
                                }, {
                                  tag: `li`, closure: `- IPMI KVM`
                                }, {
                                  tag: `li`, closure: `- BGP/Bird`
                                }, {
                                  tag: `li`, closure: `- Python`
                                }, {
                                  tag: `li`, closure: `- ZFS`
                                }]
                              }]
                          }]
                        }, {
                          tag: `div`, flags: {class: `_gxM _CYc _gcQ _geQ _gMX`}, tagChild: [{
                            tag: `div`, flags: {class: `_gcQ`}, tagChild: [{
                              tag: `div`, flags: {class: `_gM_a _agM`}, tagChild: [{
                                tag: `a`, flags: {href: `#`, class: `_TX_a _atX`}, closure: `Apply for Position`
                              }]
                            }]
                          }]
                        }]
                      }, {
                          tag: `div`, flags: {class: `_gxM _CYc`}, tagChild: [{
                            tag: `div`, flags: {class: `ZSg _QZg`}, tagChild: [{
                              tag: `div`, flags: {id: `lever`, class: `_gM_a _agM`}, tagChild: [{
                                tag: `a`, flags: {[`-j0`]: `var`, id: `j0`, role: `job-bin`, href: `#`, class: `_TX_a _atX qXS`}, closure: 
                                `Read More`
                              }]
                            }]
                          //}]
                    }]
                  }   ]
                    }]
                  }]
                }]
              }, `this.controls()`]
            }]
          }]
        }, {
          tag: `nav`, flags: {class: `_uHC`}, tagChild: [{tag: `div`, flags: {class: `_xCt`}}, {
            tag: `div`, flags: {class: ``}, tagChild: [{
              tag: `div`, flags: {class: `_-tY`}, tagChild: [{
                tag: `div`, flags: {class: `_aXz`}, tagChild: [{
                  tag: `div`, flags: {class: `_-Xg _gxM`}, tagChild: [{
                    tag: `a`, flags: {class: `_tXa`, href: `/`}, closure: `corrde`
                  }, {
                    tag: `span`, flags: {class: `_tCc`}, closure: `jobs`
                  }]
                }, {
                  tag: `div`, flags: {class: `_QZg`}, tagChild: [{
                    tag: `div`, flags: {class: `_gM_a _agM`}, tagChild: [{
                      tag: `a`, flags: {role: `fieldQuora`, class: `_TX_a _atX`, href: `#`}, closure: `filter by Department`}]
                  }]
                }]
              }]
            }]
          }]
        }]
      }, {
        tag: `aside`, tagChild: this.JS(pool)
      }]
    };
  },

  about (pool) {

    return {
      tag: `span`, flags: {id: `corrde-root`}, tagChild: [{
        tag: `section`, flags: {class: `_miY`}, tagChild: [{
          tag: `main`, flags: {class: `_xC2`}, tagChild: [{
            tag: `section`, flags: {style: `padding-top: 60px; font-size: 13px;`}, tagChild: [{
              tag: `div`, flags: {style: `max-width: 900px;`, class: `_4Sx _aGX`}, tagChild: [{
                tag: `div`, tagChild: [{
                  tag: `div`, tagChild: [{
                    tag: `span`, flags: {class: `_txU`} , closure: `HOW IT WORKS`
                  }]
                }, {
                  tag: `div`, tagChild: [{
                    tag: `span`, flags: {class: `_YtS _Atx`} , closure: 
                    `growing your client base in an industry you love shouldn't feel difficult, at corrde, we're ready
                     to give you another way to attract and satisfy your clients. our web booking platform service
                      allows you to receive bookings around the clock, with greater exposure and the chance to
                       seize control of your business growth. it's time to learn what we can do for you.`
                  }]
                }, {
                  tag: `div`, flags: {class: ``}, tagChild: [{
                    tag: `div`, flags: {class: `_eYG`}, tagChild: [{
                      tag: `span`, flags: {class: `_ytx _Qtx 3tx`}, closure: `1. Adjust Your Working Page`
                    }]
                  }, {
                    tag: `div`, tagChild: [{
                      tag: `span`, flags: {class: `_YtS _2tx _Atx _0tx`} , closure: 
                      `Once a registered user of corrde, when logged in, you will automatically proceed to a working page 
                      equiped with a double option for a service provider or seller. On the top right corner of the 
                      page/application within the header resides a button for switching to either options, as a 
                      professional please make sure you are adjusted to the market. If the button reads as the 
                      snapshot below, please click on it.
                      `
                    }]
                  }, {
                    tag: `div`, flags: {class: `_eSQ`}, tagChild: [{
                      tag: `img`, flags: {class: `_uXZ _Sz6`, src: `/gp/p/about/pro_640_-_0.png`}
                    }]
                  }]
                }, {
                  tag: `div`, flags: {class: ``}, tagChild: [{
                    tag: `div`, flags: {class: `_eYG`}, tagChild: [{
                      tag: `span`, flags: {class: `_ytx _Qtx 3tx`}, closure: `2. Browse Market, Select Suited Task Available`
                    }]
                  }, {
                    tag: `div`, tagChild: [{
                      tag: `span`, flags: {class: `_YtS _2tx _Atx _0tx`} , closure: 
                      `Below is a job slide posted by a client looking for cleaning help. The tagged sections describe how
                      to navigate a job slide.
                      `
                    }]
                  }, {
                    tag: `div`, flags: {class: `_eSQ`}, tagChild: [{
                      tag: `img`, flags: {class: `_uXZ _Sz6`, src: `/gp/p/about/pro_640_-_1.png`}
                    }]
                  }, {
                    tag: `ul`, flags: {style: `margin: 0 auto 12px`, class: `_SCz`}, tagChild: [{
                      tag: `li`, tagChild: [{
                        tag: `span`, flags: {class: `_tXx`}, closure: `(1) `
                      }, {
                        tag: `span`, closure: `task/job category`
                      }]
                    }, {
                      tag: `li`, tagChild: [{
                        tag: `span`, flags: {class: `_tXx`}, closure: `(2) `
                      }, {
                        tag: `span`, closure: `task/job location`
                      }]
                    }, {
                      tag: `li`, tagChild: [{
                        tag: `span`, flags: {class: `_tXx`}, closure: `(3) `
                      }, {
                        tag: `span`, closure: `task/job description`
                      }]
                    }, {
                      tag: `li`, tagChild: [{
                        tag: `span`, flags: {class: `_tXx`}, closure: `(4) `
                      }, {
                        tag: `span`, closure: `task/job completion deadline and client budget in dollars`
                      }]
                    }, {
                      tag: `li`, tagChild: [{
                        tag: `span`, flags: {class: `_tXx`}, closure: `(5) `
                      }, {
                        tag: `span`, closure: `task/job insight (similar effect to explore button when clicked)`
                      }]
                    }, {
                      tag: `li`, tagChild: [{
                        tag: `span`, flags: {class: `_tXx`}, closure: `(6) `
                      }, {
                        tag: `span`, closure: `time since job was posted`
                      }]
                    }]
                  }]
                }, {
                  tag: `div`, flags: {class: ``}, tagChild: [{
                    tag: `div`, flags: {class: `_eYG`}, tagChild: [{
                      tag: `span`, flags: {class: `_ytx _Qtx 3tx`}, closure: `3. Explore, Apply if Suited for Task`
                    }]
                  }, {
                    tag: `div`, tagChild: [{
                      tag: `span`, flags: {class: `_YtS _2tx _Atx _0tx`} , closure: 
                      `If you need to explore more details about the job, you may click the insight icon or explore
                       button and you'll get below prompt.
                      `
                    }]
                  }, {
                    tag: `div`, flags: {class: `_eSQ`}, tagChild: [{
                      tag: `img`, flags: {class: `_uXZ _Sz6`, src: `/gp/p/about/pro_640_-_2.png`}
                    }]
                  }]
                }, {
                  tag: `div`, flags: {class: ``}, tagChild: [{
                    tag: `div`, flags: {class: `_eYG`}, tagChild: [{
                      tag: `span`, flags: {class: `_ytx _Qtx 3tx`}, closure: `4. Client Booking and Job Assignment`
                    }]
                  }, {
                    tag: `div`, tagChild: [{
                      tag: `span`, flags: {class: `_YtS _2tx _Atx _0tx`} , closure: 
                      `If you are a Successful candidate for the job you will get a booking notification in your mail,
                        prompting a chat thread with the client.
                      `
                    }]
                  }]
                }]
              }, `this.controls()`]
            }]
          }]
        }, {
          tag: `nav`, flags: {class: `_uHC`}, tagChild: [{tag: `div`, flags: {class: `_xCt`}}, {
            tag: `div`, flags: {class: ``}, tagChild: [{
              tag: `div`, flags: {class: `_-tY`}, tagChild: [{
                tag: `div`, flags: {class: `_aXz`}, tagChild: [{
                  tag: `div`, flags: {class: `_-Xg _gxM`}, tagChild: [{
                    tag: `a`, flags: {class: `_tXa`, href: `/`}, closure: `corrde`
                  }, {
                    tag: `span`, flags: {class: `_tCc`}, closure: `about`
                  }]
                }, {
                  tag: `div`, flags: {class: `_QZg`}, tagChild: [{
                    tag: `div`, flags: {class: `_gM_a _agM`}, tagChild: [{
                      tag: `a`, flags: {role: `client`, class: `_TX_a _atX`, href: `#`}, closure: `FOR CUSTOMERS`}]
                  }]
                }]
              }]
            }]
          }]
        }]
      }, {
        tag: `aside`, tagChild: this.JS(pool)
      }]
    };
  }
}
