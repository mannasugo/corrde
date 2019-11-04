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
}

module.exports = {

  log: (time) => new Util().timeFormat(time),

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
              tag: `div`, flags: {class: `_yCR`}, tagChild: [{
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
              tag: `button`, flags: {class: `_bsZ`}, closure: `Client Mode`
            }]
          }, {
            tag: `div`, flags: {class: `_FFe`}, tagChild: [{
              tag: `button`, flags: {class: `_bsZ`}, closure: `Freelance Mode`
            }]
          }]
        }]
    }];
  },

  controls () {
    return {
      tag: `div`, flags: {style: `bottom: 10px`, class: `_gHm _aGX _-gs`}, tagChild: [{
        tag: `div`, flags: {class: `_xGy`}, tagChild: [{
          tag: `div`, flags: {style: `border-radius: 100px`, class: `_gxM _gMX _uxq`}, tagChild: [{
            tag: `div`, flags: {class: `_geQ _gMX`}, tagChild: [{
              tag: `a`, flags: {href: `#`, class: `-_tX StatsPlaneColor`}, closure: `Stats`
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
              tag: `a`, flags: {href: `#`, class: `-_tX MailColor`}, closure: `Mail`
            }]
          }, {
            tag: `div`, flags: {class: `_geQ _gMX`}, tagChild: [{
              tag: `a`, flags: {href: `#`, class: `-_tX MugColor`}, closure: `Mug`
            }]
          }]
        }]
      }]
    };
  },

  uModel (mapping) {
    return {
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
                  tag: `div`, flags: {class: `_-Xg`}, tagChild: [{
                    tag: `a`, flags: {class: `_tXa`, href: `/`}, closure: `corrde`
                  }]
                }, {
                  tag: `div`, flags: {class: `_QZg`}, tagChild: [{
                    tag: `div`, flags: {class: `_gM_a _agM`}, tagChild: [{
                      tag: `a`, flags: {for: ``, class: `_TX_a _atX`, href: `#`}, closure: `switch to freelance`}]
                  }]
                }]
              }]
            }]
          }]
        }]
      }, {
        tag: `aside`, tagChild: this.JS(mapping)
      }]
    };
  },

  pModel (mapping) {
    return {
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
                  tag: `div`, flags: {class: `_-Xg`}, tagChild: [{
                    tag: `a`, flags: {class: `_tXa`, href: `/`}, closure: `corrde`
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
    };
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
        tag: `div`, flags: {style: `margin: 0 0 15px`, class: `_uxq`}, tagChild: [{
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
                  tag: `a`, flags: {href: `#`, class: `-_tX StatsCircleColor`}, closure: `StatsCircle`
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
        tag: `div`, flags: {style: `margin: 0 0 15px`, class: `_uxq`}, tagChild: [{
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
            tag: `div`, flags: {style: `padding: 10px 0`}, tagChild: [{
              tag: `span`, closure: sale.blab
            }]
          }]
        }, {
          tag: `div`, flags: {style: `border-top: 1px solid #efefef;`, class: `_gBC`}, tagChild: [{
            tag: `div`, flags: {style: `padding: 10px 0`, class: `_gxM`}, tagChild: [{
              tag: `div`, flags: {class: `eYG uxq`}, tagChild: [{
                tag: `div`, flags: {class: `geQ gMX`}, tagChild: [{
                  tag: `a`, flags: {href: `#`, class: `-_tX StatsCircleColor`}, closure: `StatsCircle`
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
  }
}