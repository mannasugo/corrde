const config = require(`./corrde-config`)

class ModelString {
  
  constructor() {
    this.appendString = ``;
  }

  modelStringify (model) {
    if (typeof model !== `object`) return;

    for (let lev = 0; lev < model.length; lev++) {

      let a = model[lev][0];
      let t2, lv2, z = a;

      if (a === `html`) a = `!doctype html><html`;

      this.appendString += `<` + a;

      for (let lev_ = 0; lev_ < model[lev].length; lev_++) {

        let l2 = model[lev][lev_];

        if (typeof l2 === `string` && l2.split(`@`)[0] === `#`) {
          this.appendString += ` id='` + l2.split(`@`)[1] + `'`;
        }

        else if (typeof l2 === `string` && l2.split(`@`)[0] === `.`) {
          this.appendString += ` class='` + l2.split(`@`)[1] + `'`;
        }

        else if (typeof l2 === `string` && l2.split(`@`)[0] === `&`) {
          let plus = l2.split(`@`)[1].split(`>`);
          this.appendString += ` ` + plus[0] + `='` + plus[1] + `'`;
        }

        if (typeof l2 === `object`) {lv2 = l2;}

        if (typeof l2 === `string` && l2.split(`@`)[0] === `~`) { t2 = l2;}

      }

      this.appendString += `>`;

      if (typeof t2 === `string` && t2.split(`@`)[0] === `~`) {this.appendString += t2.substring(2, t2.length+1);}

      if (typeof lv2 === `object`) {this.modelStringify(lv2);}

      let queer = [`img`, `input`, `meta`];

      if (queer.indexOf(z) === -1) this.appendString += `</` + z + `>`; 
    }
    return this.appendString;
  }
}

class Util {

  secs2UTC (sec) {

    let day = new Date(parseInt(sec)),
      listMonths = config.listReducMonths,

      dayReduc = listMonths[day.getUTCMonth()] + ` ` + day.getUTCDate() + ` ` + day.getUTCFullYear();
    
    return dayReduc;
  }

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

    let then = new Date(parseInt(time)), lapse = (then - new Date)/1000, lapseString;

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

      lapseString = then.getUTCDate() + ` ` + listMonths[then.getUTCMonth()] + ` ` + then.getUTCFullYear();
    }
    
    return lapseString;
  }

  availtimeleft(sec) {

    sec = parseInt(sec);

    let left = false;

    if (sec > new Date().valueOf()) {

      let secs = sec - new Date().valueOf();

      if (secs > 86400000 * 93) left = `over 3 Months`;

      else if (secs >= 86400000 * 30) left = Math.floor(secs / (86400000 * 30)) + ` Month`;

      else if (secs >= 86400000 * 14) left = Math.floor(secs / (86400000 * 7)) + ` Week`;

      else if (secs >= 86400000) left = Math.floor(secs / (86400000)) + ` Day`;

      else if (secs >= 3600000) left = Math.floor(secs / (3600000)) + ` Hour`;

      else if (secs >= 60000) left = Math.floor(secs / (60000)) + ` Minute`;

      else if (secs >= 0) left = Math.floor(secs) + ` Second`;

      if (parseInt(left) >= 2) left = `${left}s`;
    }

    else if (sec < new Date().valueOf()) left = `timeout`;

    return left;
  }
}

module.exports = {

  log: (time) => new Util().timeFormat(time),

  tick: sec => new Util().ticker(sec),

  secs2UTC: sec => new Util().secs2UTC(sec),

  availtimeleft: sec => new Util().availtimeleft(sec),

  modelString (model) {
    return new ModelString().modelStringify(model);
  },

  call (mapping) {
    return this.modelString(this.html(mapping));
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
                        tag: `a`, flags: {href: `#`, class: `_TX_a _atX qXS`}, closure: `System Architecture`
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
                          tag: `h4`, flags: {id: `j0` }, closure: `Qualifications`
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
                                tag: `a`, flags: {href: `#apply`, class: `_TX_a _atX`}, closure: `Apply for Position`
                              }]
                            }]
                          }]
                        }]
                      }, {
                        tag: `div`, flags: {class: `_gxM _CYc`}, tagChild: [{
                          tag: `div`, flags: {class: `ZSg _QZg`}, tagChild: [{
                            tag: `div`, flags: {id: `lever`, class: `_gM_a _agM`}, tagChild: [{
                              tag: `a`, flags: {[`-j0`]: `var`, id: `j0`, role: `job-bin`, href: `#j0`, class: `_TX_a _atX qXS`}, closure: 
                                `Read More`
                            }]
                          }]
                        }]
                      }]
                    }]
                  }]
                }, {
                  tag: `div`, flags: {class: `_uZM _CYc`}, tagChild: [{
                    tag: `div`, flags: {class: `ZSg _eYG`}, tagChild: [{
                      tag: `div`, flags: {class: `_gM_a _agM`}, tagChild: [{
                        tag: `a`, flags: {href: `#`, class: `_TX_a _atX qXS`}, closure: `Communications`
                      }]
                    }]
                  }]
                }, {
                  tag: `div`, flags: {id: `dept`}, tagChild: [{
                    tag: `div`, flags: {class: `_uZC`}, tagChild: [{
                      tag: `div`, tagChild: [{
                        tag: `div`, tagChild: [{
                          tag: `h3`, flags: {id: `j1` }, tagChild: [{
                            tag: `a`, flags: {class: `_ttx`, href: `#`}, closure: `Communications Director`
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
                        tag: `div`, flags: {id: `-j1`, class: `_Yxc`}, tagChild: [{
                          tag: `a`, flags: {id: `j1`, role: `job-bin`, class: `_ytx`, href: `#`}, closure: 
                            `Join our development team as a communications coordinator while helping curate our brand on the social
                            media front. Help elevate our user experience on adding creative flair by collaborating with the front-end team.`
                        }, {
                          tag: `h4`, flags: {for: `j1`}, closure: `Qualifications`
                        }, {
                          tag: `ul`, flags: {class: `_SCz`}, tagChild: [{
                            tag: `li`, closure: 
                              `Capacity to manage a public realtions and communications team.`
                          }, {
                            tag: `li`, closure: 
                              `Possesses superior written and verbal communication skills.`
                          }, {
                            tag: `li`, closure: 
                              `Savvy in digital advertisement and brand management.`
                          }, {
                            tag: `li`, closure: 
                              `High energy and positive attitude with interest in creating new and unique concepts.`
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
                              tag: `a`, flags: {[`-j1`]: `var`, id: `j1`, role: `job-bin`, href: `#j1`, class: `_TX_a _atX qXS`},
                               closure: 
                                `Read More`
                            }]
                          }]
                        }]
                      }]
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

  html (mapping) {
    return [[
      `html`, `&@lang>en`, [[
        `head`, [[
          `meta`, `&@charset>utf-8`], [
          `title`, `~@${mapping.title}`], [
          `meta`, `&@name>viewport`, `&@content>width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no`], [
          `style`, `&@type>text/css`, `~@${mapping.css}`]]], [
        `body`, mapping.appendModel]]]]
  },

  wrapper (pool ) {
    return [
      `span`, `#@corrde-root`, [[
        `section`, `.@_miY`, pool.appendModel]]];
  },

  main (pool) {
    return [`main`, `.@_xC2`, pool.appendModel]
  },

  header (pool) {
    return [`nav`, 
      `.@_uHC`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY`, [[
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `.@_tXa`, `&@href>/`, `~@corrde`], [
                `span`, `.@_tCc`, `~@beta`]]], [
              `div`, `.@_QZg`, pool.appendModel], [
              `div`, `#@mug`, `.@_aYx _-Zz`, [[
                `ul`, `.@_aYy _tXx`, [[
                  `li`, `.@_-zZx`, [[
                    `a`, `.@_-xQy`, `&@href>/in`, [[`span`, `.@_Xtx _tAx`, `~@log in`]]]]], [
                  `li`, `.@_-zZx`, [[
                    `a`, `.@_-xQy`, `&@role>signup`, config.nullSrc + `signup`, [[`span`, `.@_Xtx _tAx`, `~@sign up`]]]]]]]]]]]]]]]]]
  },

  mugger () {
    return [[
    `div`, `.@_y4x`, [[
      `a`, `&@role>mug`, `.@-_tX MugColorv`, config.to_mug, `~@Mug`]]]]
  },

  banner () {
    return [
      `header`, `.@_cXz`, [[
        `div`, `.@_XsQ`, [[
          `div`, [[
            `h1`, `.@_tQz`, [[
              `span`, `.@_-X`, `~@${config.TM}`]], 
              `~@${config.bann}`], [
            `p`, `.@_t4z`, `~@${config.byline}`], [
            `div`, `.@_SaQ`, [[
              `h2`, `.@_uHg _-SZ6 h4`, `~@${config.promptSign}`], [
              `form`, `.@_cQc`, [[
                `div`, `.@_cQX`, [[
                  `input`, `#@signup`, `.@_-Yz`, config.placeMail, config.valText]]], [
                `div`, `.@_cQX`, [[
                  `input`, `#@make-pass`, `.@_-Yz`, config.placePass, config.valPass]]], [
                  `div`, `.@_agM _gM_a _cQc`, [[
                    `a`, `#@make`, `.@_TX_a _atX _c5Q`, config.nullSrc + `go`, config.MakeAccount]]]]]]]]]]], [`div`, `.@_-ZCc`]]]
  },

  products () {

    let fieldAll = [], i = 0;

    for (let field in config.fields) {

      let subAll = [], a = 0, subs = config.fields[field];

      for (let sub in subs) {
        subAll[a] = [`li`, `.@_-zZx`, [[
          `a`, `.@_-xQy`, config.nullSrc + `null`, [[`div`, `.@_gXs`, [[`p`, `.@_Xtx _tAx`, `~@${subs[a]}`]]]]]]]
        a++
      }

      fieldAll[i] = [`li`, `.@aXy _-_y`, [[
        `a`, `.@_Xxt _A`, config.nullSrc + `null`, [[
          `span`, `&@role>pro`, `#@${i}`, `.@_aXx _tAx`, `~@${field}`], [
          `i`, `#@${i}`, `&@role>pro`, `.@_yXx NavDownColor`]]], [`div`, `#@pro-${i}`, `.@_-aX _-Zz`, [[`ul`, `.@_aYz`, subAll]]]]]

      i++
    }

    return [
      `section`, `.@_C9y`, [[
        `div`, `.@_XsQ _xsQ-`, [[
          `h2`, `.@_SCx`, config.products_sect_title], [
          `p`, `.@_tqS`, config.products_sect_desc], [
          `div`, [[
            `div`, `.@_aXy`, [[
              `ul`, `.@_aYy`, fieldAll]]]]]]], [`div`, `.@_aAx`]]]
  },

  SVGMetrics (pool) {

    let SVGPool = [[], []];

    for (let pane in pool.field_count) {

      SVGPool[0].push(pool.field_count[pane].field);
      SVGPool[1].push(pool.field_count[pane][`modulus`]);
    }

    return [
      `section`, `.@_C9y _uZ0`, [[
        `div`, `.@_XsQ _xsQ-`, [[
          `h2`, `.@3tx _WtX`, `~@Our Metrics`], [
          `div`, [[
            `h4`, `.@_ax2 _ut0`, `~@Jobs Activity`], [
            `div`, `.@_gMX _geQ _sZ2 _XY0`, [[
              `div`, `.@_geQ`, [[
                `div`, `.@_aXZ`, [[`span`, `.@_Ax0 _ut0`, `~@Total Jobs Posted`], [`span`, `.@_ax4 _ut0`, `~@${pool.all_jobs}`]]], [
                `div`, `.@_aXZ`, [[`span`, `.@_Ax0 _ut0`, `~@Total Freelancers`], [`span`, `.@_ax4 _ut0`, `~@${pool.all_pro}`]]]]], [
              `div`, `.@_geQ`, [[
                `div`, `.@_aXZ`, [[`span`, `.@_Ax0 _ut0 _qaZ`, `~@Open Jobs`]]], [
                  `svg`, `.@geQ`, [[
                    `circle`, `.@_cC8`, `&@r>90`, `&@cy>100`, `&@cx>100`], [
                    `circle`, `#@openOffSVG`, `&@style>stroke-dashoffset: ${600-pool.open_modulus/100*565}px`, `.@_cC8-`, `&@r>90`, `&@cy>100`, `&@cx>100`]]], [
                  `div`, `.@_-Qc _a00`, [[`span`, `#@openSVG`, `.@_tX7`, `~@${pool.open_modulus}`], [`span`, `.@_t2X`, `~@%`]]]]], [
              `div`, `.@_geQ`, [[
                `div`, `.@_aXZ`, [[`span`, `.@_Ax0 _ut0 _qaZ`, `~@Active Freelancers`]]], [
                  `svg`, `.@geQ`, [[
                    `circle`, `.@_cC8`, `&@r>90`, `&@cy>100`, `&@cx>100`], [
                    `circle`, `#@proOffSVG`, `&@style>stroke-dashoffset: ${600-pool.pro_modulus/100*565}px`, `.@_cC8-`, `&@r>90`, `&@cy>100`, `&@cx>100`]]], [
                  `div`, `.@_-Qc _a00`, [[`span`, `#@proSVG`, `.@_tX7`, `~@${pool.pro_modulus}`], [`span`, `.@_t2X`, `~@%`]]]]]]], [
              `div`, [[
              `h4`, `.@_ax2 _ut0`, `~@Top Jobs`], [
              `div`, `.@_sZ2`, [[
                `div`, `.@_aXZ`, [[`span`, `.@_Ax0 _ut0`, `~@Total Jobs`], [`span`, `.@_ax4 _ut0`, `~@${pool.all_jobs}`]]],
                this.XBARAnalysis(SVGPool[0], SVGPool[1])]]]]]]]]]]
  },

  hows () {

    let stepsAll = [], i = 0;

    for (let step in config.hows) {

      stepsAll[i] = [
        `li`, `.@_WtX`, `~@${step}`, [[`ul`, `.@_iSa`, [[`li`, `~@${config.hows[step]}`]]]]]

      i++
    }

    return [
      `section`, `.@_C9y`, [[
        `div`, `.@_XsQ _xsQ-`, [ [
          `p`, `.@_tqS _WtX`, config.home_how], [
          `div`, [[
            `div`, `.@aXy`, [[
              `ul`, `.@_SCz`, stepsAll]]]]]]], [`div`, `.@_aAx _aAz`]]]
  },

  feature () {

    let featAll = [], i = 0;

    for (let feat in config.feature) {

      featAll[i] = [
        `div`, `.@_SCz `, [[`p`, `.@tqS _qSz`, `~@${feat}`], [`div`, `.@_txx`, [[`p`, `~@${config.feature[feat]}`]]]]]

      i++
    }

    return [
      `section`, `.@_C9y`, [[
        `div`, `.@_XsQ _xsQ-`, [[
          `h2`, `.@_SCx`, config.feature_title], [`div`, featAll]]]]]
  },

  footer () {

    let footAll = [], i = 0;

    for (let foot in config.foots) {

      footAll[i] = [
        `div`, `.@_geQ`, [[`a`, `.@_uHB`, `&@href>${config.foots[foot]}`, `~@${foot}`]]]

      i++
    }
    return [
      `footer`, `.@_CuH`, [[  
        `div`, `.@_gxM _aYS`, footAll], [
        `div`, `.@_gMX _aYS`, [[
          `a`, `.@-_tX _4Qx GramColor`, config.out_to, config.to_insta, `~@instagram`], [
          `a`, `.@-_tX _4Qx TwitterColor`,config.out_to, config.to_twitter, `~@twitter`]]], [
        `div`, `.@_geQ _aYS`, [[`span`, `.@_uHB`, config.ip]]]]]
  },

  jS (pool) {
    return [
      `aside`, [[
        `script`, `&@src>/socket.io/socket.io.js`], [
        `script`, `&@src>/gp/d3.js`]/*, [
        `script`, `&@src>/gp/topojson-client-master/src/index.js`]*/, [
        `script`, `&@src>${config.cd.utilJS}`], [
        `script`, config.valjS, `~@JSStore.to(${pool.jSStore})`], [
        `script`, `&@src>${pool.jsState}`]]]
  },

  in () {
    return [
      `header`, `.@_cXz`, [[
        `div`, `.@_XsQ`, [[
          `div`, [[
            `div`, `.@_SaQ`, [[
              `h2`, `.@_uHg _-SZ6 h4`, config.in_title], [
              `form`, `.@_cQc`, [[
                `div`, `.@_cQX`, [[
                  `input`, `#@mail`, `.@_-Yz`, config.placeMail, config.valText]]], [
                `div`, `.@_cQX`, [[
                  `input`, `#@pass`, `.@_-Yz`, config.placePass, config.valPass]]], [
                  `div`, `.@_agM _gM_a _cQc`, [[
                    `a`, `#@signin`, `.@_TX_a _atX _c5Q`, config.nullSrc + `in`, config.in_to]]]]]]]]]]], [`div`, `.@_-ZCc`]]];
  },

  inMeta () {

    let metaAll = [], i = 0;

    for (let meta in config.meta_to) {

      metaAll[i] = [
        `div`, `.@_dVP`, [[
          `label`, `.@_cVP _btX`, `&@role>radio`, [[
            `input`, `#@mt0`, `&@type>radio`, `&@name>meta-to`, `&@value>${i}`], [
            `span`, `.@_tCw _axX`, `~@${config.meta_to[meta]}`]]]]]

      i++
    }
    return [
      `header`, `.@_cXz`, [[
        `div`, `.@_XsQ`, [[
          `div`, [[
            `div`, `.@_SaQ`, [[
              `h2`, `.@_uHg _-SZ6 h4`, config.in_meta_title], [
              `form`, `.@_cQc`, [[
                `div`, `.@_cQX`, [[
                  `input`, `#@full`, `.@_-Yz`, config.placeName, config.valText]]], [
                `div`, `.@_aSz`, [[
                  `span`, `.@_tCx`, config.meta_to_title], [
                  `div`, metaAll]]], [
                  `div`, `.@_agM _gM_a _cQc`, [[
                    `a`, `#@meta-sign`, `.@_TX_a _atX _c5Q`, config.nullSrc + `meta`, config.MakeAccount]]]]]]]]]]], [`div`, `.@_-ZCc`]]]
  },

  inputFile () {
    return [
      `form`, `&@enctype>multipart/form-data`, [[`input`, `#@file`, `&@type>file`]]]
  },

  setPro () {

    let fieldAll = [], subAll = [], qualAll = [], workAll = [], i = 0;

    for (let field in config.fields) {

      fieldAll[i] = [
        `div`, `.@_qXq`, [[
          `label`, `.@_tXv`, `&@role>checkbox`, [[
            `input`, `#@field-${i}-0`, `&@type>checkbox`, `&@name>field-top`, `&@value>${field}`], [
            `span`, `.@_tCw axX`, `~@${field}`]]], [`div`]]]

      let lvlAll = [], a = 0, subs = config.fields[field];

      for (let sub in subs) {
        lvlAll[a] = [`div`, `.@_qXq`, [[
          `label`, `.@_tXv`, `&@role>checkbox`, [[
            `input`, `#@sub-${i}-${a}-0`, `&@type>checkbox`, `&@name>field-last`, `&@value>${field}_${subs[a]}`], [
            `span`, `.@_tCw axX`, `~@${subs[a]}`]]], [`div`]]]
        a++
      }

      subAll[i] = [`div`, `#@sub-${i}`, `.@_-Zz`, [[`a`, `.@_qS2`, `&@href>#sub-${i}`, `~@${field}`], [`div`, `.@_gZy`, lvlAll]]]

      i++
    }

    for (let i = 0; i < 4; i++) {

      let levAll = [], quallevAll = [], lev2All = [], a = 0, c = 0, s = 0;
      
      for (let qual in config.qual) {
        levAll[a] = [
            `div`, `.@_qXq`, [[
              `label`, `.@_tXv`, `&@role>radio`, [[
                `input`, `#@qual-${i}`, `&@type>radio`, `&@name>qual`, `&@value>${a}`], [
                `span`, `.@_tCw axX`, `~@${config.qual[a]}`]]]]]
        a++;
      }

      for (let lev in config.qual_diploma) {
        quallevAll[c] = [
            `div`, `.@_qXq`, [[
              `label`, `.@_tXv`, `&@role>radio`, [[
                `input`, `#@quallev-${i}`, `&@type>radio`, `&@name>qual-lev`, `&@value>${config.qual_diploma[c]}`], [
                `span`, `.@_tCw axX`, `~@${config.qual_diploma[c]}`]]]]]
        c++;
      }

      for (let lev2 in config.qual_degree) {
        lev2All[s] = [
            `div`, `.@_qXq`, [[
              `label`, `.@_tXv`, `&@role>radio`, [[
                `input`, `#@qual-${i}-0`, `&@type>radio`, `&@name>qual`, `&@value>${config.qual_degree[s]}`], [
                `span`, `.@_tCw axX`, `~@${config.qual_degree[s]}`]]]]]
        s++;
      }

      qualAll[i] = [`div`, `#@level-${i}-0`, `&@role>schule`, `.@_-Zz _sZ2`, [[
        `a`, `.@_tAa _tXx`, `&@href>#s-${i}`, `~@School #${i + 1}`], [
        `div`, `.@_gZy _caZ`, `levAll`], [
        `p`, `.@_tCx _t2x`, config.qual_para], /*[
        `div`, `.@_gZy _caZ`, quallevAll],*/ [
        `div`, `.@_gZy _caZ`, lev2All], [
        `div`, [[
          `p`, `.@_tCx`, config.instut_para], [
          `div`, `.@_UFA`, [[
            `input`, `#@sc-${i}`, `.@_RRD _Ccs`, config.fill_off, config.place_instut]]]]], [
        `div`, [[
          `p`, `.@_tCx`, `~@Course`], [
          `div`, `.@_UFA`, [[
            `input`, `#@crs-${i}`, `.@_RRD _Ccs`, config.fill_off, `&@placeholder>Course`]]]]], [
        `div`, [[
          `p`, `.@_tCx`, config.instut_era_para], [
          `div`, `.@_UFA`, [[
            `input`, `#@sca-${i}`, `.@_RRD _Ccs`, config.fill_off, config.place_era_a]]], [
          `div`, `.@_UFA`, [[
            `input`, `#@scz-${i}`, `.@_RRD _Ccs`, config.fill_off, config.place_era_z]]], [
          `div`, `.@_yCR`, [[
            `p`, `.@_axX`, config.study_yet_para], [
            `label`, `.@_tXv`, `&@role>checkbox`, [[
              `input`, `#@ugrad-${i}`, `&@type>checkbox`, `&@name>school-yet`, `&@value>0`], [
              `span`, `.@_tCw _t2x`, config.study_yet]]]]]]]]];

      workAll[i] = [`div`, `#@wpl-${i}-0`, `&@role>arbeit`, `.@_-Zz _sZ2`, [[
        `a`, `.@_tAa _tXx`, `&@href>#w-${i}`, `~@Work #${i + 1}`], [
        `div`, [[
          `p`, `.@_tCx`, config.work_para], [
          `div`, `.@_UFA`, [[
            `input`, `#@place-${i}`, `.@_RRD _Ccs`, config.fill_off, config.place_workplace]]], [
          `div`, `.@_UFA`, [[
            `input`, `#@pos-${i}`, `.@_RRD _Ccs`, config.fill_off, config.place_role]]]]], [
        `div`, [[
          `p`, `.@_tCx`, config.work_era_para], [
          `div`, `.@_UFA`, [[
            `input`, `#@empa-${i}`, `.@_RRD _Ccs`, config.fill_off, config.place_era_a]]], [
          `div`, `.@_UFA`, [[
            `input`, `#@empz-${i}`, `.@_RRD _Ccs`, config.fill_off, config.place_era_z]]], [
          `div`, `.@_yCR`, [[
            `p`, `.@_axX`, config.work_yet_para], [
            `label`, `.@_tXv`, `&@role>checkbox`, [[
              `input`, `#@emp-${i}`, `&@type>checkbox`, `&@name>work-yet`, `&@value>0`], [
              `span`, `.@_tCw _t2x`, config.work_yet]]]]]]]]];
    }

   return [
      `section`, `.@_C9y`, [[
        `div`, `.@_XsQ _xsQ-`, [[
          `h2`, `.@_SCx`, config.pro_title], [
          `div`, `.@_aSz`, [[
            `div`, `.@_sZ2`, [[
              `p`, `.@_yCR _eZz`, config.set_avatar_title], [
              `div`, `.@_4sC _dMG`, [[
                `label`, `.@_cCq _gS6`, `#@ini-ava`, `&@for>file`, config.to_ava, [[
                  `img`, `#@ini-ava`, `.@_aWz`]]], [
                `p`, `.@_axX`, config.ava_to], 
                this.inputFile()]]]], [
            `div`, `.@_sZ2`, [[
              `p`, `.@_yCR _eZz`, config.set_field_title], [
              `div`, `.@_4sC _XsQ`, [[
                `p`, `.@_axX _gxM _gMX`, config.fields_para], [
                `div`, `.@_gZy`, fieldAll]]]]], [
            `div`, `.@_sZ2`, [[
              `p`, `.@_yCR _eZz`, config.set_fieldsub_title], [
              `div`, `.@_4sC _XsQ`, [[
                `p`, `.@_axX _gxM _gMX`, config.fieldsub_para], [
                `div`, subAll]]]]], [
            `div`, `.@_sZ2`, [[
              `p`, `.@_yCR _eZz`, config.set_field_desc_title], [
              `div`, `.@_4sC _XsQ`, [[
                `p`, `.@_tCx`, config.field_desc_para], [
                `div`, [[
                  `textarea`, `#@summ`, `.@-_tyq`, config.fill_off, config.place_long]]]]]]], [
            `div`, `.@_sZ2`, [[
              `p`, `.@_yCR _eZz`, config.set_appraise_title], [
              `div`, `.@_4sC _XsQ`, [[
                `p`, `.@_tCx`, config.appraise_para], [
                `div`, `.@_UFA`, [[
                  `input`, `#@rate`, `.@_RRD _Ccs`, config.fill_off, config.place_appraise_rate]]]]]]], [
            `div`, `.@_sZ2 -Zz`, [[
              `p`, `.@_yCR _eZz`, config.set_academia_title], [
              `div`, `.@_4sC _XsQ`, [[
                `p`, `.@_tCx _caZ`, config.academia_para], [`div`, qualAll]]], [
              `div`, `.@_gxM _CYc`, [[
                `div`, `.@_QZg`, [[
                `div`, `.@_gM_a _agM`, [[`a`, `#@schule`, `.@_TX_a _atX`, config.add_instut, config.to_instut]]]]]]]]], [
            `div`, `.@_sZ2 _-Zz`, [[
              `p`, `.@_yCR _eZz`, config.set_work_title], [
              `div`, `.@_4sC _XsQ`, [[
                `div`, workAll]]], [
              `div`, `.@_gxM _CYc`, [[
                `div`, `.@_QZg`, [[
                `div`, `.@_gM_a _agM`, [[`a`, `#@wpl`, `.@_TX_a _atX`, config.add_work, config.to_work]]]]]]]]]]], [
          `div`, `.@_gxM _CYc _gcQ _geQ _gMX`, [[
            `div`, `.@QZg`, [[
              `div`, `.@_gM_a _agM`, [[`a`, `#@save`, `.@_TX_a _atX`, config.save_pro, config.to_save]]]]]]]]]]] 
  },

  top (pool) {

    let skillFields = [],
      to = config,
      mugPool = [`Profile`, `Find Work`, `Contract Work`, `Notifications`, `Settings`],
      mugPoolids = [`tomug`, `towork`, `tosell`, `tomail`, `toadjust`],
      mugPooltos = [to.lvl_mug, to.lvl_work, to.lvl_sell, to.lvl_mail, to.lvl_settings];

    for (let field in config.fields) {

      skillFields.push(field)
    }

    return [`nav`, 
      `.@_uHC`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY`, [[
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `.@_tXa`, `&@href>/`, `~@corrde`], [
                `span`, `.@_tCc`, `~@beta`]]], [
              `div`, `.@_QZg _-Zz`, `#@mugvisibility`, [[
                `a`, `.@_cCq _gS3`, `#@mug-ava`, `&@href>javascript:;`, [[
                  `img`, `#@mug-ava`, `.@_aWz`, `&@src>/${pool.ava}`]]]]], 
              this.inModal({id: `fields_modal`, in: this.aModal(skillFields)}), 
              this.inModal({id: `mug_modal`, in: this.aPoolModal(mugPool, mugPoolids, mugPooltos)})]]]]]]]]
  },

  inView (A, B) {

    return [
      `section`, `#@field_root`, [[
        `section`, `.@_C3y`, [[
          `div`, `.@_XsQ _xsQ-`, [[
            `h2`, `.@3tx`, `~@Overview`],/*, [
          `div`, `.@_sZ2 _UFA`, [[
            `input`, `#@locate`, `.@_RRD _Ccs`, config.fill_off, `&@placeholder>Search location for Activity`]]],*/ [
            `div`, [[
              `div`, [[
                `div`, `.@_gxM _gcQ _CYc _sZ2`, [[
                  `div`, [[`a`, `#@fields`, `.@_tX PrevGrayColor`, `&@href>#a2`]]], [
                  `div`, `.@_dMG eYG _geQ`, [[`span`, `.@_utQ`, `~@${B.field}`]]], [
                  `div`, `.@_QZg _gMz`, [[`a`, `#@fields`, `.@_tX NextGrayColor`, `&@href>#a2`]]]]], [
                    `div`, `.@_geQ _sZ2`, [[
                      `div`, `.@_aXZ`, [[
                        `span`, `.@_Ax0 _aA2`, `~@Total ${B.field} Jobs Today`], [
                        `span`, `.@_ax4 _aA4`, `~@${A[0].total}`]]]]], [
                  `div`, `.@_sZ2`, [this.SVG_YBAR(A, B)]],
                  this.SVGlinePie(A, B), 
                  this.recentContractsView(B.field, B.contracts.sort((a,b) => {return (b.ini_log - a.ini_log)})) /*, [
              `div`, `.@_gxM _gcQ _CYc _sZ2`, [[
                `div`, [[`a`, `.@_tX ChevFroGrayColor`, `&@href>#p2`]]], [
                `div`, `.@_gxM _geQ`, [[
                  `div`, `.@_geQ`, [[
                    `a`, `.@_Cc2`, [[
                      `img`, `.@_aWz`, `#@src`], [
                      `div`, `.@_qz-`, [[
                        `div`, [[
                          `span`, `.@_yCR`, `~@Mann Asugo`]]], [
                        `div`, [[
                          `div`, `.@_gM_a _agM _guZ _eX2 _SxQ _gxM _dMG`, [[
                            `span`, `.@-_tX StarMiniColor`], [
                            `span`, `.@_utQ _tAx`, `~@0.0`]]]]]]]]]]], [
                  `div`, `.@_geQ`, [[`a`, `.@_Cc2`, [[`img`, `.@_aWz`, `#@src`]]]]], [
                  `div`, `.@_geQ`, [[`a`, `.@_Cc2`, [[`img`, `.@_aWz`, `#@src`]]]]]]], [
                `div`, `.@_QZg _gMz`, [[`a`, `.@_tX ChevToGrayColor`, `&@href>#u2`]]]]],  [
                `h4`, `.@_ax2`, `~@Experts' Activity in Home`], [
                `div`, `.@_gMX _geQ _sZ2 _XY0`, [[
                  `svg`, `.@_geQ`, [[
                    `circle`, `.@_cC2`, `&@r>20`, `&@cy>100`, `&@cx>100`], [
                    `circle`, `.@_cC4`, `&@r>40`, `&@cy>100`, `&@cx>100`], [
                    `circle`, `.@_cC6`, `&@r>60`, `&@cy>100`, `&@cx>100`], [
                    `circle`, `.@_cC4-`, `&@r>40`, `&@cy>100`, `&@cx>100`], [
                    `circle`, `.@_cC6-`, `&@r>60`, `&@cy>100`, `&@cx>100`]]], [
                  `div`, `.@_geQ`, [[
                    `div`, `.@_aXZ`, [[`span`, `.@_Ax0`, `~@Total`], [`span`, `.@_ax4`, `~@180,678,003`]]], [
                    `div`, `.@_aXZ`, [[
                      `div`, `.@aXZ _gxM`, [[
                        `div`, `.@_gxM _Cy0 _dMG`, [[
                          `span`, `.@_aWc _uH3`], [
                          `span`, `.@_AXt`, `~@Active freelancers`]]], [
                        `div`, `.@_QZg`, [[`span`, `~@65%`]]]]], [
                      `div`, `.@_gxM`, [[
                        `div`, `.@_gxM _Cy0 _dMG`, [[
                          `span`, `.@_aWc _uH6`], [
                          `span`, `.@_AXt`, `~@Inactive freelancers`]]], [
                        `div`, `.@_QZg`, [[`span`, `~@35%`]]]]]]]]]]],*/ ]]]]]]]]]]
  },


  XBARAnalysis (keyPool, valPool) {

    let XBARPool = [];

    //valPool.sort((a,b) => {
    //  return (b - a)});

    for (let val = 0; val < valPool.length; ++val) {

      XBARPool[val] = [
        `g`, [[
          `rect`, `.@_aW2`, `&@x>9%`, `&@y>${(val + 1) * 50}`, `&@width>90%`, `&@height>30`], [
          `text`, `&@x>1%`, `&@y>${(val + 1) * 50 + 18}`, `~@${valPool[val]}%`], [
          `rect`, `.@_aX0`, `&@x>9%`, `&@y>${(val + 1) * 50}`, `&@width>${parseInt(valPool[val] * (9/10))}%`, `&@height>30`], [
          `text`, `&@x>12%`, `&@y>${(val + 1) * 50 + 20}`, `~@${keyPool[val]}`]]]
    }

    return [
      `svg`, `.@_aXZ _a02`, `&@style>height: ${valPool.length*50+50}px`, [[`g`, XBARPool]]]
  },

  inModal (pool) {

    return [
      `div`, `#@${pool.id}`, `&@for>modal`, `.@_aAY _-Zz`, [[
        `div`, `.@_gcQ _gxM _geQ`, [[
          `div`, `.@_QZg`, [[
            `div`, [[`a`, `#@del`, `&@href>javascript:;`, `.@-_tX DelColor`]]]]]]], 
        [`div`, `.@_aXY`, [pool.in]]]]
  },

  aModal (pool) {

    let inPool = []

    for (let i = 0; i < pool.length; i++) {

      inPool[i] = [`li`, `.@_-zZx`, [[`a`, `#@to_field`, `&@href>#field`, `.@_-xQy`, [[`span`, `.@_tAx _Xtx`, `~@${pool[i]}`]]]]];
    }

    return [
      `ul`, `.@_aYy _tXx`, inPool]
  },

  aPoolModal (pool, idPool, toPool) {

    let inPool = []

    for (let i = 0; i < pool.length; i++) {

      inPool[i] = [`li`, `.@_-zZx`, [[`a`, `#@${idPool[i]}`, `&@href>${toPool[i]}`, `.@_-xQy`, [[`span`, `.@_tAx _Xtx`, `~@${pool[i]}`]]]]];
    }

    return [
      `ul`, `.@_aYy _tXx`, inPool]
  },

  UTCDayMin (UTC) {

    let day = new Date(parseInt(UTC)),
      listMonths = config.listReducMonths,

      dayReduc = listMonths[day.getUTCMonth()] + ` ` + day.getUTCDate();
    
    return dayReduc;
  },

  SVG_YBAR (A, B) {

    let xPlot = [],
      today = ``,
      SVGlays = [], 
      SVGCount = [];

    if (B.days_totals[0] <= 2) {

      xPlot = [0, 1, 2];
    }

    else if (B.days_totals[0] > 2 && B.days_totals[0] <= 4) xPlot = [0, 2, 4];

    else if (B.days_totals[0] > 4 && B.days_totals[0] <= 6) xPlot = [0, 3, 6];

    else if (B.days_totals[0] > 6 && B.days_totals[0] <= 8) xPlot = [0, 2, 4, 6, 8];

    else if (B.days_totals[0] > 8 && B.days_totals[0] <= 10) xPlot = [0, 5, 10];

    else if (B.days_totals[0] > 10 && B.days_totals[0] <= 20) xPlot = [0, 10, 20];

    else if (B.days_totals[0] > 20 && B.days_totals[0] <= 40) xPlot = [0, 20, 40];

    else if (B.days_totals[0] > 40 && B.days_totals[0] < 60) xPlot = [0, 30, 60];

    else if (B.days_totals[0] > 60 && B.days_totals[0] < 80) xPlot = [0, 20, 40, 60, 80];

    else if (B.days_totals[0] > 80 && B.days_totals[0] < 100) xPlot = [0, 50, 100];

    let xKey = [`Jan 10`, `Jan 9`, `Jan 8`, `Jan 7`, `Jan 6`, `Jan 5`, `Jan 4`],
      freqs = [1, 1, 2, 0, 1, 2, 0]

    for (let lay = 0; lay < xPlot.length; lay++) {
      
      SVGlays[lay] = [
        `g`, [[
          `rect`, `.@_pg0`, `&@x>0%`, `&@y>${185 - (lay * 180/(xPlot.length - 1))}`, `&@width>90%`, `&@height>1`], [
          `text`, `&@x>95%`, `&@y>${187.5 - (lay * 180/(xPlot.length - 1))}`, `~@${xPlot[lay]}`]]]
    }

    for (let day = 0; day < A.length; day++) {//console.log(new Date(parseInt(A[day].UTC)).toUTCString())

      if (parseInt(A[day].UTC) < parseInt(new Date(new Date().setUTCHours(0) - new Date().getUTCMinutes()).valueOf())) {

        today = ``;
      }

      else {today = ` _pg2-`;}
      
      SVGCount[day] = [
        `g`, [[
          `text`, `&@x>${80 - (day * 77.5/(A.length - 1))}%`, `&@y>197.5`, `~@${this.UTCDayMin(A[day].UTC)}`], [
          `rect`,
          `.@_pg2${today}`,
          `&@x>${80 - (day * 77.5/(A.length - 1))}%`, 
          `&@y>${185 - (parseInt(A[day].total) * 180/xPlot[(xPlot.length - 1)]/*(xPlot.length - 1)*/)}`, 
          `&@width>10%`, 
          `&@height>${185 - (185 - (A[day].total * 180/xPlot[(xPlot.length - 1)]/*(xPlot.length - 1)*/))}`]]]
    }

    return [
      `svg`, `.@_aXZ _a02`, `&@style>height: ${200}px`, [[`g`, SVGlays], [`g`, SVGCount]]]
  },

  SVGlinePie (A, B) {

    let CatPanes = [],
      index = 0,
      modus = 0,
      cats = A[0].sub_totals;

    for (let pane in cats) {

      if (parseInt(A[0].total) > 0) {

        modus = parseInt(cats[pane])/parseInt(A[0].total) * 100;
      }

      CatPanes[index] = [
        `div`, `.@_gMX _geQ _sZ2`, [[
          `a`, `.@_aA8`, `~@${pane}`, `&@href>#${pane}`], [
          `div`, `.@_QZg`, [[
            `div`, [[
              `svg`, `.@_zg0`, [[
                `g`, [[
                  `circle`, `.@_cC4`, `&@r>19`, `&@cy>20`, `&@cx>20`], [
                  `circle`, `&@style>stroke-dashoffset: ${600-modus/100*120}px`, `.@_cC4-`, `&@r>19`, `&@cy>20`, `&@cx>20`]]]]], [
              `div`, `.@_-cC4 _a00`, [[`span`, `~@${Math.floor(modus)}`], [`span`, `~@%`]]]]], [
            `span`, `.@_xg2 _ax4 _aA4`, `~@${cats[pane]}`]]]]]

      index++;
    }

    return [
      `div`, [[`div`, `.@_QZg _q2s`, [[`span`, `.@_ytx _tXx _aA6`, `~@Jobs`]]], [`div`, `.@_sZ2 _aA2 q2s`, CatPanes]]];
  },

  ContractsView () { //separate from find work navigation

    let to = config;

    let mapPool = [`Contract Work`, `Explore`, `My Contracts`, `Find Work`],
      mapPoolids = [`togyro`, `toexplore`, `tofeed`, `towork`],
      mapPoolto = [to.lvl_sell, to.lvl_explore, to.lvl_myjobs, to.lvl_work];

    return [
      `nav`, `.@_uHC`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY _eXz`, [[
            `div`, `.@_aXz _xQz`, [[
              `div`, `.@_gcQ _aXZ`, [[
                `div`, [[`a`, `#@jobs_pool`, `.@_tX PrevGrayColor`, `&@href>#jobs`]]], [
                `div`, `.@_dMG _geQ _aA2`, [[`span`, `.@_tXx`, `~@Find Experts`]]], [
                `div`, `.@_QZg _gMz`, [[`a`, `.@_tX FilterColor`, `&@href>javascript:;`]]],
                this.inModal({id: `jobs_modal`, in: this.aPoolModal(mapPool, mapPoolids, mapPoolto)})]]]]]]]]]];
  },

  MapSVGView () {

    return [`section`, `#@map`, [[`svg`, `.@_aXZ`]]]
  },

  slideDemoView () {

    return [
      `div`, `.@sliderView`, [[`div`, `.@sliderContainer`, [[`div`, [[`div`, `.@sliderContent`, [[`div`, `.@sliderTransform _gxM`, [[
        `div`, `.@slide`, [[`div`]]], [`div`, `.@slide`, [[`div`]]], [`div`, `.@slide`, [[`div`]]]]]]]]]]]]]
  },

  sellViaMapView () {

    return [
      `div`, `.@_xZ-`, [[
        `div`, `.@_c5Q`, [[
          `div`, `.@_QZg`, [[`div`, `.@_gM_a _agM _z2a`, [[`a`, `#@contract`, `.@_TX_a _atX`, `&@href>javascript:;`, `~@Post a Job`]]]]]]]]
    ]
  },

  mycontractView () {

    let xPool = [];

    for (let i in config.fields) {

      xPool.push(i)
    }

    return [
      `section`, `.@_C3y`, [[
        `div`, `.@_XsQ _xsQ- _aA2`, [[
          `h4`, `.@_aX2 _tAa`, `~@Define Your Contract`], [
          `div`, [[
            `div`, `.@_cS2`, [[`span`, `.@_tXx`, `~@Choose field of work`]]], 
            this.XOptions(xPool, xPool), [`div`, `#@field2skill`], [
            `div`, `.@_eZz`, [[
              `div`, `.@_cS2`, [[`span`, `.@_tXx`, `~@Work Title`]]], [
              `div`, `.@_4sC _XsQ`, [[
                `p`, `.@_tCx _aA2`, `~@Provide brief and precise title to headline your post.`], [
                `div`, `.@_UFA _cS2`, [[
                  `input`, `#@contracttitle`, `.@_RRD _Ccs`, `&@autocomplete>off`, `&@placeholder>Title`]]]]]]], [
            `div`, `.@_eZz`, [[
              `div`, `.@_cS2`, [[`span`, `.@_tXx`, `~@Work Description`]]], [
              `div`, `.@_4sC _XsQ`, [[
                `p`, `.@_tCx _aA2`, `~@Give a detailed description for your contract.`], [
                `div`, `.@ _cS2`, [[
                  `textarea`, `#@contractdetail`, `.@-_tyq`, `&@autocomplete>off`, `&@placeholder>Type Text Here`]]]]]]], [
            `div`, `.@_eZz`, [[
              `div`, `.@_cS2`, [[`span`, `.@_tXx`, `~@Set Payment Rate`]]], [
              `div`, `.@_4sC _XsQ`, [[
                `p`, `.@_tCx _aA2`, `~@Select an Option.`], this.labelRadioView([`Hourly`, `Fixed-Price`], `payrate`), [
                `div`, `.@_UFA _cS2`, [[
                  `input`, `#@contractpay`, `.@_RRD _Ccs`, `&@autocomplete>off`, `&@placeholder>Figure in Dollars`]]]]]]], [
            `div`, `.@_eZz`, [[
              `div`, `.@_cS2`, [[`span`, `.@_tXx`, `~@Application Duration`]]], [
              `div`, `.@_4sC _XsQ`, [[
                `p`, `.@_tCx _aA2`, `~@Set days to contract application deadline.`], [
                `div`, `.@_UFA _cS2`, [[
                  `input`, `#@contractdays`, `.@_RRD _Ccs`, `&@autocomplete>off`, `&@placeholder>Days to deadline`]]]]]]], [
            `div`, `.@_gxM _CYc _gcQ _geQ _gMX`, [[
              `div`, `.@QZg`, [[
                `div`, `.@_gM_a _agM`, [[
                  `a`, `#@savecontract`, `.@_TX_a _tXv _atX`, `&@href>javascript:;`, `~@Post Job`]]]]]]]]]]]]]

  },

  XOptions (pool, idPool) {

    let xPool = []

    for (let i = 0; i < pool.length; i++) {

      xPool[i] = [`div`, `.@_qXc geQ`, [[
        `div`, `.@_guZ _agM _gM_a`, [[`a`, `.@_utQ _TX_a _tXv _aX2`, `#@xoption`, `&@href>javascript:;`, `~@${pool[i]}`]]]]];
    }

    return [
      `div`, `.@_eZz`, [[`div`, [[`div`, `.@_aVz`, [[`div`, `.@_xXx _gxM`, xPool]]]]]]]
  },

  fieldtoSkillView (skills, id) {

    return [
      `div`, `.@_eZz`, [[
        `div`, `.@_cS2`, [[`span`, `.@_tXx`, `~@Choose skill for work`]]], 
        this.labelRadioView(skills, id)]]
  },

  labelRadioView (pool, id) {

    let labelPool = [];

    for (let i = 0; i < pool.length;++i) {

      labelPool[i] = [`div`, [[
        `label`, `.@_tXv`, `&@role>radio`, [
          [`input`, `&@type>radio`, `#@${id}`, `&@value>${pool[i]}`, `&@name>${id}`], [`span`, `.@_tCw _aA2`, `~@${pool[i]}`]]]]]
    }

    return [
      `div`, `.@_caZ`, labelPool]
  },

  ContractsRangeView (B, range) {

    let contracts = B.slice(range[0], range[1]),
      pool = [];

    for (let index = 0; index < contracts.length; index++) {

      let sale = contracts[index];

      pool[index] = [
        `section`, [[
          `div`, `.@_uZM _CYc`, [[
            `div`, `.@_eYG`, [[
              `div`, `.@_gM_a _agM`, [[`a`, `.@_TX_a _atX`, `&@href>javascript:;`, `~@${contracts[index][`subfield`]}`]]]]]]], [
          `div`, `#@dept`, [[
            `div`, `.@_uZC`, [[
              `div`, [[
                `div`, `.@-Zz`, [[
                  `h4`, `#@c_${index}`, [[
                    `a`, `.@_tX2 _aX2 _aA4`, `&@href>/p/${sale.ini_sum}/`, `~@${contracts[index][`lead`]}`]]], [
                  `div`, `.@_gMX _geQ _sZ2`, [[
                    `div`, [[`span`, `.@_tXx`, `~@$${contracts[index][`pay`]}`], [`span`, `.@_aA6`, `~@${contracts[index][`payway`]}`]]], [
                    `div`, `.@_QZg`, [[
                      `div`, [[
                        `span`, `.@_tXx`, `~@${this.availtimeleft(parseInt((sale.days * 86400000) + sale.ini_log))}`], [
                        `span`, `.@_aA6`, `~@Duration`]]]]]]], [
                    `div`, `.@`, [[`a`, `.@_zY0`, `&@href>/p/${sale.ini_sum}/`, `~@${sale.detail}`]]], [
                  `div`, `.@_gxM _CYc`, [[
                    `div`, `.@_axS`, [[
                      `div`, `.@_gM_a _agM _guZ`, [[`a`, `.@_TX_a _atX _qXS _utQ`, `&@href>javascript:;`, `~@View Activity on Map`]]]]]]]]], /*[
                `div`, [[
                  `div`, [[
                  `h4`, `#@task_0`, [[`a`, `.@_tX2 _aX2 _aA4`, `&@href>#task_0`, `~@art curator`]]], [
                  `div`, `.@_QZg _sZ2`, [[`span`, `.@ _aA6`, `~@20 May 2020`]]], [
                    `div`, `.@_sZ2`, [[`span`, `.@_zY0 _zYg`, `~@this is a demo text field with a null line break for the entire grid. this additional text is a measure taken for a wide media field.`]]], [
                    `div`, `.@_cS2 _geQ _gMX sZ2`, [[
                      `span`, `.@_tXx`, `~@Work Options`], [
                      `div`, `.@_QZg`, [[
                        `div`, `.@_axS`, [[`div`, `.@_gM_a _agM _guZ`, [[`a`, `.@_TX_a _atX _qXS _utQ`, `&@href>#site`, `~@On-site`]]]]], [
                        `div`, `.@_axS`, [[`div`, `.@_gM_a _agM _guZ`, [[`a`, `.@_TX_a _atX _qXS _utQ`, `&@href>#site`, `~@Remote`]]]]]]]]], [
                    `div`, `.@_cS2 _geQ _gMX sZ2`, [[
                      `div`, [[`span`, `.@_tXx`, `~@$10`], [`span`, `.@_aA6`, `~@Hourly`]]], [
                      `div`, `.@_QZg`, [[`div`, [[`span`, `.@_tXx`, `~@Under 2 weeks`], [`span`, `.@_aA6`, `~@Duration`]]]]]]], [
                    `div`, `.@_sZ2 _cS2 gxM`, [[
                      `span`, `.@_tXx _ytx`, `~@Activity on this job`], [
                      `div`, `.@_gxM`, [[`span`, `.@_aA6`, `~@Applications: `], [`span`, `.@_axS`, `~@ 20`]] ] ]], [
                    `div`, `.@_gHm _aGX -gs`, [[
                      `div`, `.@_xGy`, [[`div`, `.@_gxM _CYc _gcQ _geQ _gMX`, [[
                        `div`, `.@_gcQ`, [[
                          `div`, `.@_gM_a _agM`, [[`a`, `.@_TX_a _atX`, `&@href>#apply`, `~@Submit Application`]]]]]]]]]]]]]]],*/ [
                `div`, `.@_geQ _gMX _CYc`, [[
                  `span`, `.@_aA6 _a2X`, `~@${this.log(sale.ini_log)}`], [
                  `div`, `.@_QZg`, [[`div`, `.@_gM_a _agM`, [[`a`, `.@_TX_a _atX`, `&@href>/p/${sale.ini_sum}/`, `~@Read More`]]]]]]]]]]]]]]]
    }

    return [`section`, pool];
    
  },

  recentContractsView (field, B) {

    if (B.length > 0) {

      return [
        `div`, `.@_aA2`, [[
          `h4`, `.@_Ax0 _aA2`, `~@Recent Jobs in ${field}`], this.ContractsRangeView(B, [0, 5])]]
    } else return []

  },

  px900JobsView (B) {

    return [
      `section`, `.@_C3y`, [[
        `div`, `.@_XsQ _xsQ- _aA2`, [this.ContractsRangeView(B.sort((a,b) => {return (b.ini_log - a.ini_log)}), [0, 10])]]]]
  },

  navView (title) {

    let to = config;

    let mapPool = [`Contract Work`, `Explore`, `My Contracts`, `Find Work`],
      mapPoolids = [`togyro`, `toexplore`, `tofeed`, `towork`],
      mapPoolto = [to.lvl_sell, to.lvl_explore, to.lvl_myjobs, to.lvl_work];

    return [
      `nav`, `.@_uHC`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY _eXz`, [[
            `div`, `.@_aXz _xQz`, [[
              `div`, `.@_gcQ _aXZ`, [[
                `div`, [[`a`, `#@jobs_pool`, `.@_tX PrevGrayColor`, `&@href>javascript:;`]]], [
                `div`, `.@_dMG _geQ _aA2`, [[`span`, `.@_tXx`, `~@${title}`]]], [
                `div`, `.@_QZg _gMz`, [[`a`, `.@_tX FilterColor`, `&@href>javascript:;`]]],
                this.inModal({id: `jobs_modal`, in: this.aPoolModal(mapPool, mapPoolids, mapPoolto)})]]]]]]]]]];
  },
  
  modalView (modelPool) {

    return [
      `div`, `.@_UQe`, `#@modalView`, [[
        `div`, `.@_HUa`], [`div`, `.@_UfX`, [[
          `div`, `.@_oPQ`, modelPool]]]]];
  },

  filterView () {

    let poolA = [];

    for (let field in config.fields) { poolA.push(field) }; 

    return [
      `div`, [[
        `div`, `.@_gcQ _aXZ`, [[
          `div`, `.@_axS`, [[
            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@filterclose`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@exit`]]]]], [
          `div`, `.@_dMG _geQ _aA2`, [[`span`, `.@_tXx`, `~@SEARCH FILTER`]]], [
          `div`, `.@_QZg _gMz`, [[`div`, `.@_gM_a _agM`, [[`a`, `#@filterapply`, `.@_TX_a _atX`, `&@href>javascript:;`, `~@Apply`]]]]]]], [
        `div`, `.@_aXY _XsQ`, [[
          `div`, `.@_eZz`, [[
            `div`, `.@_cS2`, [[`span`, `.@_tXx`, `~@filter by field`]]], 
              this.labelMultiCheckFitView(poolA, `filterfield`)]]]]]];
  },

  labelMultiCheckFitView (pool, id) {

    let labelPool = [];

    for (let i = 0; i < pool.length;++i) {

      labelPool[i] = [`div`, `.@_qXq`, [[
        `label`, `.@_tXv`, `&@role>checkbox`, [[
          `input`, `&@type>checkbox`, `#@${id}`, `&@value>${pool[i]}`, `&@name>${id}`], [`span`, `.@_tCw _aA2`, `~@${pool[i]}`]]]]]
    }

    return [`div`, `.@_gZy _caZ`, labelPool];
  },

  loadDOMModalView: (model, id) => {return [`div`, `.@_-Zz`, `#@${id}`, model];},

  labelSingleCheckFitView (pool, id) {

    let labelPool = [];

    for (let i = 0; i < pool.length;++i) {

      labelPool[i] = [`div`, `.@_qXq`, [[
        `label`, `.@_tXv`, `&@role>radio`, [[
          `input`, `&@type>radio`, `#@${id}`, `&@value>${pool[i]}`, `&@name>${id}`], [`span`, `.@_tCw _aA2`, `~@${pool[i]}`]]]]]
    }

    return [`div`, `.@_gZy _caZ`, labelPool];
  },

  filterView2 () {

    let poolA = [];

    for (let field in config.fields) { poolA.push(field) };

    return [
      `div`, [[
        `div`, `.@_gcQ _aXZ`, [[
          `div`, `.@_axS`, [[
            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@filterclose`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@exit`]]]]], [
          `div`, `.@_dMG _geQ _aA2`, [[`span`, `.@_tXx`, `~@Search Filter`]]], [
          `div`, `.@_QZg _gMz`, [[`div`, `.@_gM_a _agM`, [[`a`, `#@filterapply`, `.@_TX_a _atX`, `&@href>javascript:;`, `~@Apply`]]]]]]], [
        `div`, `.@_aXY _XsQ _aA2`, [[
          `div`, `.@_eZz`, [[
            `div`, `.@_caZ`, [[`span`, `.@_tXx aA2`, `~@filter by location`]]], 
              this.labelSingleCheckFitView([`My locale`, `Everywhere`], `filterlocation`)]], [
          `div`, `.@eZz`, [[
            `div`, `.@_caZ`, [[`span`, `.@_tXx aA2`, `~@filter by location`]]], 
              this.labelMultiCheckFitView(poolA, `filterfield`)]]]]]];
  },

  detailedContractView (pool) {

    let inlineJSON = `&@data>{
      &quot;sum&quot;: &quot;${pool.sum}&quot;,
      &quot;ini_sum&quot;: &quot;${pool.ini_sum}&quot;,
      &quot;is_avail&quot;: ${pool.is_open}}`;

    let acts = [];

    (pool.activity) ? acts = pool.activity : acts = [];

    return [`main`, `.@_xC2`, [[
      `section`, `.@_C3y`, [[
        `div`, `.@_XsQ _xsQ- _aA2`, [[
        `section`, [[
          `div`, `#@dept`, [[
            `div`, `.@cS2`, [[
              `div`, [[
                `div`, [[
                  `div`, [[
                    `h4`, [[
                      `a`, `.@_tX2 _aX2 _aA4`, `&@href>/p/${pool.ini_sum}/`, `~@${pool[`lead`]}`]]], [
                  `div`, `.@_QZg _sZ2`, [[`span`, `.@ _aA6 _a2X`, `~@${this.log(pool.ini_log)}`]]], [
                  `div`, `.@_sZ2`, [[`span`, `.@_zY0 _zYg`, `~@${pool.detail}`]]], [
          `div`, `.@_uZM _CYc`, [[
            `div`, `.@_gxM _sZ2`, [[
              `div`, `.@_gM_a _agM _guZ`, [[`a`, `.@_TX_a _atX _qXS _utQ`, `&@href>javascript:;`, `~@${pool[`subfield`]}`]]]]]]], [
          `div`, `.@_yZS _gxM _geQ _gMX`, [[
            `div`, `.@eYG _`, [[`span`, `.@aA2 _tXx`, `~@Duration`]]], [
            `div`, `.@_QZg _gxM`, [[
              `div`, `.@_gM_a _agM _guZ`, [[
                `a`, `.@_TX_a _atX _qXS _utQ`, `&@href>javascript:;`, `~@${this.availtimeleft(parseInt((pool.days * 86400000) + pool.ini_log))}`]]], [
                `span`, `.@ _aA6 _a2X _axS`, `~@${this.secs2UTC(pool.ini_log)} - ${this.secs2UTC(parseInt((pool.days * 86400000) + pool.ini_log))}`]]]]], [
          `div`, `.@_yZS _gxM _geQ _gMX`, [[
            `div`, `.@eYG _`, [[`span`, `.@aA2 _tXx`, `~@Pay`]]], [
            `div`, `.@_QZg _gxM`, [[
              `div`, `.@_gM_a _agM _guZ`, [[
                `a`, `.@_TX_a _atX _qXS _utQ`, `&@href>javascript:;`, `~@${pool[`payway`]}`]]], [
              `span`, `.@ _aA6 _a2X _axS _tXx`, `~@$ ${pool[`pay`]}`]]]]], [
          `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
            `div`, `.@eYG _`, [[`span`, `.@aA2 _tXx`, `~@Location`]]], [
                      `div`, `.@_QZg _gxM`, [[
                        `div`, `.@_gM_a _agM _guZ`, [[
                          `a`, `.@_TX_a _atX _qXS _utQ`, `&@href>javascript:;`, `~@View on Map`]]], [
                        `span`, `.@ _aA6 _a2X _axS _tXx`, `~@${pool[`gps`].toString().replace(`,`, `, `)}`]]]]], [
                    `div`, [
                      this.actsSliceView(acts.applications, [0, 5], {
                        id: `applications`, tally: acts.applications.length, title: `Applications`, to: `Book`}), 
                      this.actsSliceView(acts.interviews, [0, 5], {
                        id: `interviews`, tally: acts.interviews.length, title: `Interviews`, to: `Hire`}), 
                      this.actsSliceView(acts.gives, [0, 5], {
                        id: `gives`, tally: acts.gives.length, title: `Hires`, to: `Terminate`})]]]]]]]]]]]]]], [
          `div`, `#@submitvisibility`, `.@_-Zz _azX- _gMX _gp0`, [[
            `div`, `.@_gxM CYc gcQ geQ _gMX`, [[
              `div`, `.@_gMX gcQ`, [[
                `div`, `.@_gM_a _agM _gMX`, `&@style>max-width: 500px`, [[
                  `a`, `#@contractsubmit`, inlineJSON, `.@_TX_a _atX _gMX`, `&@href>javascript:;`, `~@Submit an Application`]]]]]]]]]]]]]]]
  },

  actsSliceView (pool, off, att) {

    let B = pool.slice(off[0], off[1]), model = [], plus;

    for (let index = 0; index < B.length; index++) {

      let act = B[index];

      model[index] = [
        `div`, `.@_gMB _gcQ`, `&@style>padding: 20px 7px 0`, [[
          `span`, `.@_cCq`, `&@style>width: 36px;height: 36px`, [[`img`, `.@_aWz`, `&@alt>`, `&@src>/${act.ava}`]]], [
          `div`, `.@tXx _eYG`, [[
            `div`, `.@_QxM`, [[`span`, `.@_tXx _aA6`, `~@${act.full}`]]], [
            `div`, [[`span`, `.@_aA6 _a2X`, `~@$${act.per}/hour`]]]]], [
          `div`, `.@_QZg`, [[`div`, `.@_gM_a _agM _guZ`, [[`a`, `.@_TX_a _atX _qXS _utQ`, `&@href>javascript:;`, `~@${att.to}`]]]]]]];
    }

    plus = [
      `div`, `.@_gHm _aGX -gs -Zz`, `#@plus${att.id}visible`, [[
        `div`, `.@_xGy`, [[
          `div`, `.@_gxM _CYc _gcQ _geQ _gMX`, [[
            `div`, `.@_gcQ`, [[
              `div`, `.@_gM_a _agM _guZ`, [[
                `a`, `.@_TX_a _atX _qXS _utQ`, `&@href>javascript:;`, `~@All ${att.title}`]]]]]]]]]]];

    return [
      `div`, [[
        `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
          `div`, `.@eYG`, [[`span`, `.@aA2 _tXx`, `~@${att.title}`]]], [
          `div`, `.@_QZg _gxM`, [[`span`, `.@ _aA6 _a2X _axS tXx`, `~@${att.tally}`]]]]], [
        `div`, `#@${att.id}visible`, model], ((att.tally > 4) ? plus = plus : plus = [])]];
  },

  mailSlicedView (pool, off) {

    let poolSlice = pool.slice(off[0], off[1]), model = [];

    poolSlice = poolSlice.sort((a,b) => {return (b.mail_log - a.mail_log)});

    for (let mail = 0; mail < poolSlice.length; mail++) {

      let slice = poolSlice[mail], msg;

      if (slice[`mode`] === `push`) {

        msg = `${slice.alt_src} applied for your ${slice.title} job post`;
      }

      else if (slice[`mode`] === `revert`) {

       msg = `${slice.alt_src} withdrew their application for your ${slice.title} job post`;}

      model[mail] = [
        `div`, `.@_yZS _gxM _geQ`, [[
          `div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
            `span`, `.@_cCq`, `&@style>width:40px;height:40px`, [[
              `img`, `.@_aWz`, `&@src>/${slice[`ava_src`]}`, `&@alt>`]]], [
            `div`, `.@_eYG`, [[
              `div`, `.@_QxM`, [[`span`, `.@_tXv _aA2`, `~@${slice[`title`]}`]]], [
            `div`, `.@_gxM _geQ`, [[
              `a`, `#@mailcookie`, `&@mail>${slice.ini_sum}`, `&@peers>${slice.sum_to}:${slice.sum_src}`, `.@_vC-`,  `&@href>javascript:;`, `~@${msg}`]]]]]]], [
          `div`, `.@_QZg`, [[`div`, [[`span`, `.@_szU`, `~@${this.log(slice[`mail_log`])}`]]]]]]]
    }

    return [
      `main`, `.@_xC2`, [[
        `section`, `._@_C3y`, [[
          `div`, `.@_XsQ _xsQ- _aA2`, [[
            `div`, `&@style>margin:56px 0 0;font-size:15px`, [[
              `div`, `.@_eZz`, [[`span`, `~@Notifications`]]], [
              `div`, model]]]]]]]]];
  },

  peerAvaView(pool) {

    return [
      `header`, `.@_uHC`, [[
        `div`, `.@_xCt`], [`div`, `.@_tY2-`, [[
          `div`, `.@_aXz`, `&style>padding:0 8px`, [[
            `div`, `.@_gMB _geQ _gcQ`, [[
              `span`, `.@_cCq`, `&@style>width: 36px;height: 36px`, [[`img`, `.@_aWz`, `&@alt>`, `&@src>/${pool.ava}`]]], [
            `div`, `.@tXx _eYG`, [[
            `div`, `.@_QxM`, [[`span`, `.@_tXx _aA6`, `~@${pool.title}`]]], [
            `div`, [[`span`, `.@_aA6 _a2X`, `~@${pool.alt}`]]]]]]]]]]]]];
  },

  mailPeersView (pool, peer2) {

    let poolSlice = pool, model = [];

    //poolSlice = poolSlice.sort((a,b) => {return (b.mail_log - a.mail_log)});

    for (let mail = 0; mail < poolSlice.length; mail++) {

      let slice = poolSlice[mail], msg;

      if (slice.sum_src === peer2) {

        model[mail] = [
          `div`, `.@_gcQ`, [[
            `div`, `.@_aCz _eYG _MtX`, `&@style>overflow:unset`, [[
              `span`, `.@_aCz _szU`, `~@${this.log(slice.mail_log)}`]]], [
            `div`, `.@_QZg`, [[`span`, `.@_pV3 tEx`, `~@${slice.mail}`]]]]];
      }

      else {

        if (slice.mode === `push`) msg = `${slice.alt_src} applied for your '${slice.title}' job post`;

        if (slice.mode === `revert`) msg = `${slice.alt_src} withdrew their application for your '${slice.title}' job post`;

        model[mail] = [
          `div`, `.@_gcQ`, [[
            `div`, `.@aCz _eYG MtX`, `&@style>overflow:unset;margin: 0`, [[
              `span`, `.@_pV9 tWx`, `~@${msg}`]]], [
            `div`, `.@_QZg`, [[`span`, `.@_aCz _szU`, `~@${this.log(slice.mail_log)}`]]]]];

      }
    }

    return [`main`, `.@_xC2`, `&@style>/*background: #f4f4f4*/`, [[
      `section`, `.@_C3y`, [[
        `div`, `.@_XsQ _xsQ- _aA2`, [[
          `section`, `&@style>padding:0 0 30px`, [[
            `div`, `.@aGX`, [[
              `section`, `&@style>padding:0 0 75px`, model]]]]], [
          `div`, `.@_gHm _azX- -gs`, [[`div`, `.@_aGX`, [[
            `div`, `.@_xGy`, [[
              `div`, `&@style>padding:0 15px`, `.@_gxM _gMX`, [[
                `div`, `.@_eYG _3qg`, [[
                  `textarea`, `#@msgplace`, `.@_Wtx`, `&@placeholder>Type Text Here`]]], [
                `div`, `.@_QZg`, [[
                  `div`, `.@_`, [[`a`, `#@msg`, `.@-_tX ProceedColor`, `&@href>javascript:;`]]]]]]]]]]]]]]]]]]]
  },

  mailPush (msg) {

    return [
      `div`, `.@_gcQ`, [[
        `div`, `.@_aCz _eYG _MtX`, `&@style>overflow:unset`, [[
          `span`, `.@_aCz _szU`, `~@${this.log(msg.log)}`]]], [
        `div`, `.@_QZg`, [[`span`, `.@_pV3 tEx`, `~@${msg.msg}`]]]]];
  },

  tp2 () {

    return [`nav`, 
      `.@_uHC`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY`, [[
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `.@_tXa`, `&@href>/`, `~@corrde`], [
                `span`, `.@_tCc _pV4`, `~@Monitor`]]], [
              `div`, `.@_QZg`, [[
                `div`, `.@_y4x`, [[
                  `a`, `#@monitor-top`, `.@-_tX Graph000`, `&@href>#app-ejs`, `~@Monitor`]]]]]]]]]]]]]
  },

  monitorView (pool) {

    let alinks = [`Overview`, `Graphs`, `Analyze`],
      placers = [`admin-root`, `admin-infograph`, `admin-detail`],
      to = [`/monitor/`, `/monitor/graphs/`, `/monitor/analytics/`];

    let rawDA = pool[`raw`], rawPlus = 0;

    if (parseInt(rawDA[0][`poolDay`].length) > parseInt(rawDA[1][`poolDay`].length)) {

     rawPlus = rawDA[0][`poolDay`].length - rawDA[1][`poolDay`].length
    }

    let rawAnalysis = [
      [`Current`, `Active`, `Gain`], 
      [pool[`raw`][0][`poolDay`].length, 0, rawPlus],
      [`sum-raw`, `dedicated-raw`, `gain-raw`]];

    let DUA = [
      [`Current`, `Registered & Active`, `Unregistered & Active`], 
      [0, 0, 0], 
      [`raw-DUA`, `reg-DUA`, `unreg-DUA`]];

    let regs = [
      [`Current`,`Total Freelancers`, `Total Contractors`, `Gain`], 
      [pool[`regs`][0][`poolDay`].length, pool[`regs`][0][`pool2`].length ,pool[`regs`][0][`pool0`].length, pool[`regs`][0][`gain`].length], 
      [`raw-regs`, `mono-regs`, `di-regs`, `gain-regs`]]

    let poolAct = pool[`acts`][0], work = [
      [`Current`,`Open`, `Gain`], 
      [poolAct[`poolDay`].length, poolAct[`avails`].length, poolAct[`gain`].length], 
      [`raw-wrk`, `active-wrk`, `gain-wrk`]]

    return [
      `main`, `.@_xC2`, [[
        `section`, `#@app-ejs`, `.@_C3y`, [[
          `div`, `.@_XsQ _xsQ- _aA2`, [[
            `section`, [[
              `div`, [[
                `div`, `#@monitor-menu`, `.@_-Zz`, `&@style>margin: 50px 0 30px`, [this.aPoolModal(alinks, placers, to)]]]], [
              `div`], [
              `div`, `#@semver`, [[`div`, `.@_uZM`, [[
                `div`, `.@_yZS _gxM _geQ _gMX`, [[
                  `div`, [[`span`, `.@_aA6`, `~@Version`]]], [
                  `div`, `.@_QZg _gxM`, [[`span`, `.@_axS _tXx`, `~@corrde.0.0-beta.0`]]]]], [
                `div`, `.@_yZS _gxM _geQ _gMX`, [[
                  `div`, [[`span`, `.@_aA6`, `~@Address`]]], [
                  `div`, `.@_QZg _gxM`, [[`span`, `.@_axS _tXx`, `~@127.0.0.1:8124`]]]]]]]]], [
              `div`, `&@style>margin: 25px 0`, [[`div`, `.@_uZM`, [[
                `div`, `.@_yZS _gxM _geQ _gMX`, [[
                  `div`, [[`span`, `.@_tXx`, `~@Traffic (Requests)`]]], [
                  `div`, `.@_QZg _gxM`, [[`span`, `.@_axS _a2X _aA6`, `~@`]]]]], 
                this.wideSliceView(rawAnalysis[0], rawAnalysis[1], rawAnalysis[2])]]]], [
              `div`, `&@style>margin: 25px 0`, [[`div`, `.@_uZM`, [[
                `div`, `.@_yZS _gxM _geQ _gMX`, [[
                  `div`, [[`span`, `.@_tXx`, `~@Daily User Activity`]]], [
                  `div`, `.@_QZg _gxM`, [[`span`, `.@_axS _a2X _aA6`, `~@`]]]]], 
                this.wideSliceView(DUA[0], DUA[1], DUA[2])]]]], [
              `div`, `&@style>margin: 25px 0`, [[`div`, `.@_uZM`, [[
                `div`, `.@_yZS _gxM _geQ _gMX`, [[
                  `div`, [[`span`, `.@_tXx`, `~@Registered User Activity`]]], [
                  `div`, `.@_QZg _gxM`, [[`span`, `.@_axS _a2X _aA6`, `~@`]]]]], 
                this.wideSliceView(regs[0], regs[1], regs[2])]]]], [
              `div`, `&@style>margin: 25px 0`, [[`div`, `.@_uZM`, [[
                `div`, `.@_yZS _gxM _geQ _gMX`, [[
                  `div`, [[`span`, `.@_tXx`, `~@Jobs Activity`]]], [
                  `div`, `.@_QZg _gxM`, [[`span`, `.@_axS _a2X _aA6`, `~@`]]]]], 
                this.wideSliceView(work[0], work[1], work[2])]]]]]]]]]]]]
  },

  wideSliceView (keys, values, placers) {

    let model = [];

    for (let slice = 0; slice < keys.length; slice++) {

      model[slice] = [
        `div`, `.@_yZS _gxM _geQ _gMX`, [[
          `div`, `.@_aYS`, [[
            `span`, `.@_aA6`, `~@${keys[slice]}`]]], 
          [`div`, `.@_QZg _gxM`, [[`span`, `#@${placers[slice]}`, `.@_ax4 _aAe _a00`, `~@${values[slice]}`]]]]]
    }

    return [
      `div`, `.@gMX _geQ sZ2 _XY0 _Qtx`, model];
  },

  mugView (C, JS) {

    let roles = `Contractor`;

    let listify = (pool) => {

      let pool2 = [];

      for (let key in pool) {

        pool2.push(pool[key]);
      }

      return pool2;
    };

    let clusterScopes = (scopes) => {

      let pool3 = [];

      for (let scope = 0; scope < scopes.length; ++scope) {

        if (!pool3[scopes[scope].split(`_`)[0]]) pool3[scopes[scope].split(`_`)[0]] = [];

        pool3[scopes[scope].split(`_`)[0]].push(scopes[scope].split(`_`)[1]);
      }

      return pool3;
    }

    let sliceScopesView = (scopes) => {

      let model0 = [];

      for (let scope = 0; scope < scopes.length; scope++) {

        model0[scope] = [
          `div`, `.@_aYS _uZM`, [[
            `div`, `.@yZS _gxM _geQ _gMX`, [[
              `div`, `.@_eYG`, [[`span`, `.@aA2`, `~@${scopes[scope][0]} in ${scopes[scope][2]}`]]]]], [
            `div`, `.@_yZS _gxM _geQ _gMX`, [[
              `div`, `.@_eYG`, [[`span`, `.@_aA6 _a2X`, `~@${scopes[scope][1]}`]]], [
            `div`, `.@_QZg _gxM`, [[
              `span`, `.@_a2X _aA6 _tXv`, `~@${scopes[scope][3]} - ${scopes[scope][4]}`]]]]]]]
      }

      return model0
    }

    let tSlicedView = (scopes) => {

      let model0 = [];

      for (let scope = 0; scope < scopes.length; scope++) {

        let t = scopes[scope];

        model0[scope] = [
          `div`, `.@_aYS _uZM`, [[
            `div`, `.@yZS _gxM _geQ _gMX`, [[
              `div`, `.@_eYG`, [[`span`, `.@aA2`, `~@${t.lead}`]]], [
                    `div`, `.@_QZg _gxM`, [[
                      `div`, `.@_gM_a _agM _guZ`, [[
                        `a`, `.@_TX_a _atX _qXS _utQ`, `&@href>javascript:;`, `~@${t.payway}`]]]]]]], [
            `div`, `.@_yZS _gxM _geQ _gMX`, [[
              `div`, `.@_eYG`, [[`span`, `.@_aA6 _a2X`, `~@ $ ${t.pay}`]]], [
            `div`, `.@_QZg _gxM`, [[
              `span`, `.@_a2X _aA6 _tXv`, `~@${this.secs2UTC(t.ini_log)} - ${this.secs2UTC(parseInt((t.days * 86400000) + t.ini_log))}`]]]]]]]
      }

      return model0
    }

    let clusterScopesView = (fields) => {

      let index = 0, model = [];

      for(let scope in fields) {

        let model2 = [];

        for (let scope2 = 0; scope2 < fields[scope].length; ++scope2) {

          model2[scope2] = [
            `div`, `.@_gM_a _agM _guZ _Ss0`, [[`a`, `.@_TX_a _atX _qXS _utQ`, `&@href>javascript:;`, `~@${fields[scope][scope2]}`]]]
        };

        model[index] = [
          `div`, `.@_aYS _uZM`, [[
            `div`, `.@yZS _gxM`, [[`span`, `~@${scope}`]]], [
          `div`, `.@_gZy`, model2]]];

        ++index;
      };

      return [`div`, model];
    }

    let availFields = () => {

      let fields = [
        `div`, `.@_sZ2`, [[
          `div`, `.@_yZS _gxM _geQ _gMX`, [[
            `div`, [[`span`, `.@_tXx`, `~@Expertise and Skills`]]], [
            `div`, `.@_QZg _gxM`, [[`span`, `.@_axS _a2X _aA6`, `~@`]]]]], clusterScopesView(clusterScopes(C.is_valid.skills))]];

      (C.is_valid.skills.length === 0) ? fields = []: fields = fields;

      return fields;
    }

    let availDesc = () => {

      let desc = [
        `div`, `.@_sZ2`, [[
          `div`, `.@_yZS _gxM _geQ _gMX`, [[
            `div`, [[`span`, `.@_tXx`, `~@Proffessional Summary`]]], [
            `div`, `.@_QZg _gxM`, [[`span`, `.@_axS _a2X _aA6`, `~@`]]]]], [
          `div`, `.@_sZ2`, [[`span`, `.@_zY0 _zYg`, `~@${C.is_valid.desc}`]]]]];

      (C.is_valid.desc === false) ? desc = []: desc = desc;

      return desc;
    }

    let availPortfolio = () => {

      let portfolio = [
              `div`, `.@_sZ2`, [[
                `div`, `.@_yZS _gxM _geQ _gMX`, [[
                  `div`, [[`span`, `.@_tXx`, `~@Work Experience`]]], [
                  `div`, `.@_QZg _gxM`, [[`span`, `.@_axS _a2X _aA6`, `~@`]]]]], [
                `div`, `.@_aYS _uZM`, [[
                  `div`, `.@yZS _gxM _geQ _gMX`, [[
                    `div`, `.@_eYG`, [[`span`, `.@aA2`, `~@Data Analyst`]]]]], [
                  `div`, `.@_yZS _gxM _geQ _gMX`, [[
                    `div`, `.@_eYG`, [[`span`, `.@_aA6 _a2X`, `~@Cambridge Analytica`]]], [
                    `div`, `.@_QZg _gxM`, [[
                      `span`, `.@_a2X _aA6`, `~@sept 2018 - `]]]]]]]]];

      (C.is_valid.wpl.length === 0) ? portfolio = []: portfolio = portfolio;

      return portfolio;
    }

    let availt2 = () => {

      let t2 = [
        `div`, `.@_sZ2`, [[
          `div`, `.@_yZS _gxM _geQ _gMX`, [[
            `div`, [[`span`, `.@_tXx`, `~@Jobs History`]]], [
            `div`, `.@_QZg _gxM`, [[`span`, `.@_axS _a2X _aA6`, `~@`]]]]], [
                `div`, `.@_aYS _uZM`, [[
                  `div`, `.@yZS _gxM _geQ _gMX`, [[
                    `div`, `.@_eYG`, [[`span`, `.@aA2`, `~@Senior Java Developer`]]], [
                    `div`, `.@_QZg _gxM`, [[
                      `div`, `.@_gM_a _agM _guZ`, [[
                        `a`, `.@_TX_a _atX _qXS _utQ`, `&@href>javascript:;`, `~@Fixed-Price`]]]]]]], [
                  `div`, `.@_yZS _gxM _geQ _gMX`, [[
                    `div`, `.@_eYG`, [[`span`, `.@_aA6`, `~@$ 1500`]]], [
                    `div`, `.@_QZg _gxM`, [[
                      `span`, `.@_a2X _aA6`, `~@1 JAN 2019 - 4 MAR 2020`]]]]]]]]];
      
      (C.t2.length === 0) ? t2 = []: t2 = t2;

      return t2; 
    }

    let availScopes = () => {

      let scopes = [
        `div`, `.@_sZ2`, [[
          `div`, `.@_yZS _gxM _geQ _gMX`, [[
            `div`, [[`span`, `.@_tXx`, `~@Education`]]], [
          `div`, `.@_QZg _gxM`, [[`span`, `.@_axS _a2X _aA6`, `~@`]]]]], [`div`, sliceScopesView(listify(C.is_valid.edu))]]];
      
      (listify(C.is_valid.edu).length === 0) ? scopes = []: scopes = scopes;

      return scopes; 
    }

    let availt0 = () => {

      let t0 = [
        `div`, `.@_sZ2`, [[
          `div`, `.@_yZS _gxM _geQ _gMX`, [[
            `div`, [[`span`, `.@_tXx`, `~@Job Listings`]]], [
            `div`, `.@_QZg _gxM`, [[`span`, `.@_axS _a2X _aA6`, `~@`]]]]], [`div`, tSlicedView(C.t0)]]];
      
      (C.t0.length === 0) ? t0 = []: t0 = t0;

      return t0; 
    }

    let preJS = 

      `let preJS = JSON.parse('${JS}');`;

    return [
      `main`, `.@_xC2`, [[
        `section`, `.@_C3y`, [[
          `div`, `.@_XsQ _xsQ- _aA2`, [[
            `section`, [[
              `div`, `.@_yZS _gxM _geQ`, [[
                `div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                  `span`, `.@_cCq`, `&@style>width:60px;height:60px`, [[
                    `img`, `.@_aWz`, `&@src>/${C.is_valid.ava}`, `&@alt>avatar`]]], [
                  `div`, `.@_eYG`, [[
                    `div`, `.@_QxM`, [[`span`, `.@_tXx aA2`, `~@${C.is_valid.full}`]]], [
                    `div`, `.@_gxM _geQ`, [[
                      `span`, `.@_aA6`, `~@${(C.is_valid_dual === true) ? roles = `Contractor & Freelancer`: roles = roles}`]]]]]]]]], [
              `div`, `.@azX- _gMX _gp0 _sZ2`, `&@style>margin-top: 20px`, [[
                `div`, `.@_-Zz _gxM _gMX`, [[
                  `div`, `.@_gMX gcQ`, [[
                    `div`, `.@_gM_a _agM _guZ _gMX`, `&@style>max-width: 450px`, [[
                      `a`, `.@_TX_a _atX _utQ _gMX`, `#@mug-ejs`, `&@href>javascript:;`, `~@Edit Profile`]]]]]]]]], [
              `div`, `.@_sZ2`, [[
                `div`, `.@_yZS _gxM _geQ _gMX`, [[
                  `div`, [[`span`, `.@_aA6`, `~@Standard Rate`]]], [
                  `div`, `.@_QZg _gxM`, [[`p`, `.@_axS _gxM _tXx`, [[`span`, `~@$`], [`span`, `.@_btx`, `~@${C.is_valid.appraisal}`]]], [
              `div`, `.@_gM_a _agM _guZ _axS`, [[
                `a`, `.@_TX_a _atX _qXS _utQ`, `&@href>javascript:;`, `~@Hourly`]]]]]]]]], 
              availDesc(), availFields(), /*availPortfolio(),*/ availt2(), availScopes(), availt0()]]]]]], [
        `script`, `&@type>text/javascript`, `~@${preJS}`]]]
  },

  plotY (Y_MAX) {

    let YPool = [] 

    if (Y_MAX <= 2) yPlots = [0, 1, 2];

    else if (Y_MAX > 2 && Y_MAX <= 4) yPlots = [0, 2, 4];

    else if (Y_MAX > 4 && Y_MAX <= 6) yPlots = [0, 3, 6];

    else if (Y_MAX > 6 && Y_MAX <= 8) yPlots = [0, 2, 4, 6, 8];

    else if (Y_MAX > 8 && Y_MAX <= 10) yPlots = [0, 5, 10];

    else if (Y_MAX > 10 && Y_MAX <= 20) yPlots = [0, 10, 20];

    else if (Y_MAX > 20 && Y_MAX <= 40) yPlots = [0, 20, 40];

    else if (Y_MAX > 40 && Y_MAX < 60) yPlots = [0, 30, 60];

    else if (Y_MAX > 60 && Y_MAX < 80) yPlots = [0, 20, 40, 60, 80];

    else if (Y_MAX > 80 && Y_MAX < 100) yPlots = [0, 50, 100];

    else if (Y_MAX > 100 && Y_MAX <= 200) yPlots = [0, 100, 200];

    else if (Y_MAX > 200 && Y_MAX <= 400) yPlots = [0, 200, 400];

    else if (Y_MAX > 400 && Y_MAX <= 600) yPlots = [0, 300, 600];

    else if (Y_MAX > 600 && Y_MAX <= 800) yPlots = [0, 200, 400, 600, 800];

    else if (Y_MAX > 800 && Y_MAX <= 1000) yPlots = [0, 500, 1000];

    else if (Y_MAX > 1000 && Y_MAX <= 2000) yPlots = [0, 1000, 2000];

    else if (Y_MAX > 2000 && Y_MAX <= 4000) yPlots = [0, 2000, 4000];

    else if (Y_MAX > 4000 && Y_MAX <= 6000) yPlots = [0, 3000, 6000];

    else if (Y_MAX > 6000 && Y_MAX <= 8000) yPlots = [0, 2000, 4000, 6000, 8000];

    else if (Y_MAX > 8000 && Y_MAX <= 10000) yPlots = [0, 5000, 10000];

    return yPlots;
  },

  BarPlotView (A) {

    let SVGlays = [], SVGCount = [];

    let _A = A[0].yPlots.sort((a,b) => {
      return b - a});

    let yPlots = this.plotY(_A[0]);

    for (let lay = 0; lay < yPlots.length; lay++) {
      
      SVGlays[lay] = [
        `g`, [[
          `rect`, `.@_pg4`, `&@x>0%`, `&@y>${215 - (lay * 200/(yPlots.length - 1))}`, `&@width>95%`, `&@height>1`]]]
    }

    for (let day = 0; day < A.length; day++) {

      //if (parseInt(A[day].UTC) < parseInt(new Date(new Date().setUTCHours(0) - new Date().getUTCMinutes()).valueOf())) {

      //  today = ``;
      //}

      //else {today = ` _pg2-`;}

      let loop = ``, top = ``;

      if (day === 1 || day === 3 || day === 5) loop = `@style>display:none;`

      if (A[day].poolDay.length > 0) top = A[day].poolDay.length;
      
      SVGCount[day] = [
        `g`, [[
          `text`, loop, `&@x>${82 - (day * 77.5/(A.length - 1))}%`, `&@y>232.5`, `~@${this.UTCDayMin(A[day].secsUTC)}`], [
          `text`, `@style>text-anchor:middle;`, `&@x>${82.5 - (day * 77.5/(A.length - 1))}%`, `&@y>${215 - (parseInt(A[day].poolDay.length) * 207/yPlots[(yPlots.length - 1)])}`, `~@${top}`], [
          `rect`,
          `.@_pg6`,
          `&@x>${80 - (day * 77.5/(A.length - 1))}%`, 
          `&@y>${215 - (parseInt(A[day].poolDay.length) * 200/yPlots[(yPlots.length - 1)])}`, 
          `&@width>10%`, 
          `&@height>${215 - (215 - (A[day].poolDay.length * 200/yPlots[(yPlots.length - 1)]))}`]]]
    }

    return [
      `svg`, `.@_aXZ _a02`, `&@style>height: ${240}px`, [[`g`, SVGlays], [`g`, SVGCount]]]
  },

  linePlotHour () {

    let SVGCount = [];

    for (let sect = 0; sect < 12; sect++) {

      let secs = ``; let placer = ``;

      if (sect === 0 || sect === 5 || sect === 11) {

        //secs = `${new Date(parseInt((new Date().valueOf() + 3600) - (sect * 300000))).getUTCHours()}${new Date(parseInt((new Date().valueOf() + 3600) - (sect * 300000))).getUTCMinutes()}`;
      }

      if (sect === 0) placer = `secs`;

      SVGCount[sect] = [
        `g`, [[
          `text`, `.@_aA2`, `#@${placer}`, `&@x>${82 - (sect * 77.5/(12 - 1))}%`, `&@y>232.5`, `~@${secs}`]
      ]];
    }

    return [
      `svg`, `#@duaplot`, `.@_aXZ _a02`, `&@style>height: ${240}px`, [[`g`, SVGCount]/*, [`path`, `.@_sV0`, `#@line`, `&@d>M150 100, h4 V130 h16 V100`]*/]]
  }, 

  graphsRepView (A) {

    let alinks = [`Overview`, `Graphs`, `Analyze`],
      placers = [`admin-root`, `admin-infograph`, `admin-detail`],
      to = [`/monitor/`, `/monitor/graphs/`, `/monitor/analytics/`];

    return [
      `main`, `.@_xC2`, [[
        `section`, `.@_C3y`, `#@app-ejs`,[[
          `div`, `.@_XsQ _xsQ- _aA2`, [[
            `section`, [[
              `div`, [[
                `div`, `#@monitor-menu`, `.@_-Zz`, `&@style>margin: 50px 0 30px`, [this.aPoolModal(alinks, placers, to)]]]], [
              `div`], [
              `div`, `#@reqs-graph`, `.@_sZ2`, [[
                `div`, [[
                  `div`, `.@_sZ2`, [[
                    `div`, `.@_yZS _gxM _geQ _gMX`, [[
                      `div`, `.@_`, [[`span`, `.@_tXx`, `~@Requests`]]], [
                      `div`, `.@_QZg _gxM`, [[
                        `div`, `.@_gM_a _agM _guZ`, [[
                          `a`, `.@_TX_a _atX _qXS _utQ _a2X`, `&@href>javascript:;`, `~@${this.secs2UTC(new Date().valueOf() - parseInt((6 * 86400000)))} - ${this.secs2UTC(new Date().valueOf())}`]]]]]]], [
                    `div`, [this.BarPlotView(A.raw)]]]]]]]], [
              `div`, `#@duas-graph`, `.@_sZ2`, [[
                `div`, [[
                  `div`, `.@_sZ2`, [[
                    `div`, `.@_yZS _gxM _geQ _gMX`, [[
                      `div`, `.@_`, [[`span`, `.@_tXx`, `~@Daily user activity`]]], [
                      `div`, `.@_QZg _gxM`, [[
                        `div`, `.@_gM_a _agM _guZ`, [[
                          `a`, `.@_TX_a _atX _qXS _utQ _a2X`, `&@href>javascript:;`, `~@active/sec`]]]]]]], [
                    `div`, [this.linePlotHour()]]]]]]]], [
              `div`, `#@regs-graph`, `.@_sZ2`, [[
                `div`, [[
                  `div`, `.@_sZ2`, [[
                    `div`, `.@_yZS _gxM _geQ _gMX`, [[
                      `div`, `.@_`, [[`span`, `.@_tXx`, `~@Registered users`]]], [
                      `div`, `.@_QZg _gxM`, [[
                        `div`, `.@_gM_a _agM _guZ`, [[
                          `a`, `.@_TX_a _atX _qXS _utQ _a2X`, `&@href>javascript:;`, `~@${this.secs2UTC(new Date().valueOf() - parseInt((6 * 86400000)))} - ${this.secs2UTC(new Date().valueOf())}`]]]]]]], [
                    `div`, [this.BarPlotView(A.regs)]]]]]]]], [
              `div`, `#@regs-graph`, `.@_sZ2`, [[
                `div`, [[
                  `div`, `.@_sZ2`, [[
                    `div`, `.@_yZS _gxM _geQ _gMX`, [[
                      `div`, `.@_`, [[`span`, `.@_tXx`, `~@Jobs activity`]]], [
                      `div`, `.@_QZg _gxM`, [[
                        `div`, `.@_gM_a _agM _guZ`, [[
                          `a`, `.@_TX_a _atX _qXS _utQ _a2X`, `&@href>javascript:;`, `~@${this.secs2UTC(new Date().valueOf() - parseInt((6 * 86400000)))} - ${this.secs2UTC(new Date().valueOf())}`]]]]]]], [
                    `div`, [this.BarPlotView(A.acts)]]]]]]]]]]]]]]]];
  },

  toDevsView () {

     return [
      `section`, [[
            `div`, `.@_aXz _xQz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `.@_tXa`, `&@href>/`, `~@corrde`], [
                `span`, `.@_tCc _pV4`, `~@devs`]]], [
              `div`, `.@_QZg`, [[
                    `div`, `.@_gM_a _agM _guZ gMX`, `&@style>max-width: 450px`, [[
                      `a`, `.@_TX_a _atX _utQ _gMX`, `#@devs-add-ejs`, `&@href>/devs/add/`, `~@+ Add Dev`]]]]]]], [
        `div`, `.@_cXz`, [[
                  `div`, `.@_XsQ`, [[
                    `div`, [[
                      `div`, `.@_SaQ`, [[
                        `h4`, `.@_uHg _-SZ6`, `~@Corrde Administrator login`], [
                        `form`, `.@_cQc`, [[
                          `div`, `.@_cQX`, [[
                            `input`, `#@dev-tjs`, `.@_-Yz _txx _aA6`, `&@placeholder>work email`, `&@type>text`]]], [
                          `div`, `.@_cQX`, [[
                            `input`, `#@pass-tjs`, `.@_-Yz _txx _aA6`, config.placePass, config.valPass]]], [
                            `div`, `.@_agM _gM_a _cQc`, [[
                              `a`, `#@to-devs-ejs`, `.@_TX_a _atX _c5Q`, `&@href>javascript:;`, `~@Sign in`]]]]]]]]]]], [`div`, `.@_-ZCc`]]]]];
  },

  addDevsView () {

     return [
      `section`, [[
            `div`, `.@_aXz _xQz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `.@_tXa`, `&@href>/`, `~@corrde`], [
                `span`, `.@_tCc _pV4`, `~@devs`]]], [
              `div`, `.@_QZg`, [[
                    `div`, `.@_gM_a _agM _guZ gMX`, `&@style>max-width: 450px`, [[
                      `a`, `.@_TX_a _atX _utQ _gMX`, `#@devs-add-ejs`, `&@href>/devs/`, `~@login`]]]]]]], [
        `div`, `.@_cXz`, [[
                  `div`, `.@_XsQ`, [[
                    `div`, [[
                      `div`, `.@_SaQ`, [[
                        `h4`, `.@_uHg _-SZ6`, `~@Corrde Administrator Creator`], [
                        `form`, `.@_cQc`, [[
                          `div`, `.@_cQX`, [[
                            `input`, `#@token-tjs`, `.@_-Yz _txx _aA6`, `&@placeholder>Access Token`, `&@type>text`]]], [
                          `div`, `.@_cQX`, [[
                            `input`, `#@pre-tjs`, `.@_-Yz _txx _aA6`, `&@placeholder>First name`, `&@type>text`]]], [
                          `div`, `.@_cQX`, [[
                            `input`, `#@suff-tjs`, `.@_-Yz _txx _aA6`, `&@placeholder>Surname`, `&@type>text`]]], [
                          `div`, `.@_cQX`, [[
                            `input`, `#@pass-tjs`, `.@_-Yz _txx _aA6`, config.placePass, config.valPass]]], [
                            `div`, `.@_agM _gM_a _cQc _guZ`, [[
                              `a`, `#@add-devs-ejs`, `.@_TX_a _atX _c5Q _utQ`, `&@href>javascript:;`, `~@+ Add Dev`]]]]]]]]]]], [`div`, `.@_-ZCc`]]]]];
  },

  controlsView () {

    let iconRules = [`RootGray`, `MugColor`, `MailColor`, `StatsPlaneColor`];

    let to = [`/devs/`, `/devs/mug/`, `/devs/mail/`, `/devs/analytics/`];

    let model = [];

    iconRules.forEach((rule, index) => {

      model[index] = [`div`, `.@_Ssa`, [[
        `a`, `.@-_tX ${rule}`, `&@href>${to[index]}`]]];
    });

    return [`div`, `.@_gV0 _gDa`, [[
      `div`, `.@_STa`, [[
        `div`, `.@_gDE`, [[`div`, `.@_gyQ`, model]]]]]]];
  },

  tailControls () {

    let rules = [`RootGray`, `MugColor`, `MailColor`, `StatsPlaneColor`];

    let to = [`/devs/`, `/devs/mug/`, `/devs/mail/`, `/devs/analytics/`];

    let tail = [];

    rules.forEach((rule, e) => {

      tail[e] = [
        `div`, `.@_geQ _gMX`, [[
          `a`, `.@-_tX ${rule}`, `&@href>${to[e]}`]]];
    });

    return [
      `div`, `&@style>max-width:100%`, `.@_gHm _aGX _-gs -gV0`, [[
        `div`, `.@_xGy`, [[`div`, `&@style>background:#fff`, `.@_gxM _gMX _uxq _egZ`, tail]]]]];
  },

  devSysAlert (Obj, MailObj) {

    let model = [];

    let mail = [];

    let modelAlert = alertObj => {

      return [
        `div`, `#@${alertObj.obj_placer}`, `.@_cx4 _gxM _geQ _gMX`, [[
          `div`, `.@_x10`, [[
            `div`, `.@_gxM _x2y`, `&@style>margin: 0 auto;`, [[
              `div`, `.@_x40 _sZ2`, [[`div`, `.@_tXx _a2X _aAe`, `~@Corrde Devs system`], [`div`, `.@_a2X`, `~@${alertObj.setting}`]]], [
              `div`, `.@_x17`, [[
                `div`, `.@_Xsa`, [[
                  `a`, `&@href>javascript:;`, `&@style>line-height: 1.6em; padding: 0 0 20px`, `.@_aA2`, `~@${alertObj.alert}`]]]]], [
              `div`, `.@_x60`, [[`div`, `.@_cy0`, [[
                `div`, `.@_gM_a _agM _guZ`, [[
                  `a`,`#@${alertObj.placer}`, `.@_TX_a _atX qXS _utQ a2X`, `&@href>javascript:;`, `~@${alertObj.to}`]]]]]]]]]]]]]
    }

    let modelMail = ObjMail => {

      return [
        `div`, `.@_cx4 _gxM _geQ _gMX`, [[
          `div`, `.@_x10 _x00`, [[
            `div`, `.@_gxM _x2y _gMX`, `&@style>margin: 0 auto;`, [[
              `div`, `.@_x25`, `&@style>padding: 0 15px 0 0`, [[
                `div`, `&@style>letter-spacing:0.75px`, `.@_ZSg _ZCg _eYG _gcQ`, [[`span`, `.@_cCq`, `&@style>width:40px;height:40px`, [[
                  `img`, `.@_aWz`, `&@src>${ObjMail.ava}`, `&@alt>avatar`]]], [
                `div`, `.@_eYG`, [[
                  `div`, `.@_gxM _gMX`, [[`div`, `.@_eYG _ZSg`, [[`span`, `.@_tXx aA2`, `~@${ObjMail.alt}`]]], [
                    `div`, `.@_QZg _gxM`, [[`span`, `.@_a2X _tXv`, `~@${this.log(ObjMail.utc)}`]]]]], [
                  `div`, `.@_gxM _geQ`, [[
                    `span`, `.@_aA6 _a2X`, `~@${ObjMail.dev_group}`]]]]]]]]], [
              `div`, `.@_x16`, [[
                `div`, `.@_Xsa`, [[
                  `a`, `&@href>/devs/mail/${ObjMail.mail_md5}/`, `&@style>line-height: 1.6em`, `.@_aA2 _tXv`, `~@${ObjMail.msg}`]]]]]]]]]]]
    }

    let msgs = msg => {

      msg.forEach((obj, e) => {

        let g;

        if (msg[e].group === `alerts`) {

          if (msg[e].type === `push dev`) {

            g = {
              ava: msg[e].src_ava,
              alt: msg[e].alt_src,
              dev_group: msg[e].src_group,
              mail_md5: msg[e].mail_md5,
              utc: msg[e].mail_log,
              msg: 
                `Your new addition to the Corrde Team is all set to go! The user can access the administration panel using these credentials`}

              if (Obj.dev_md5 !== msg[e].src_md5) {

                g[`msg`] = 
                  `Welcome to the Corrde Development Team, you are all set to go! Below are your work designations and credentials you may use`
              }
          }
        
          mail[e] = modelMail(g)}
      });

      return mail;
    }

    if (Obj.ava === false || Obj.pass_reset === false || MailObj.length > 0) {

      let avaObj = {
        alert: 
          `For administrative assurances you need 
          to provide an avatar photo for identification, 
          please upload a photo capturing your front profile clearly.`, obj_placer: `ava-obj-ejs`, placer: `place-devs-ava-ejs`, setting: `profile settings`, to: `upload photo`};

      let passObj = {
        alert: 
          `For security reasons, you are required 
          to change your system provided password, 
          you should choose a personalised and strong 
          password, preferrably of an alpha-numeric combination 
          with no whitespace character.`, obj_placer: `reset-obj-ejs`, placer: `reset-devs-pass-ejs`, setting: `security settings`, to: `set password`};

      model = [
        `div`, `.@_sZ2`, [[
          `div`, `.@_yZS _gxM _geQ _gMX _uZM _cX0`, [[
            `div`, `.@_`, [[`span`, `&@style>letter-spacing:0.75px`, `.@_tXx`, `~@Alerts`]]], [
            `div`, `.@_QZg _gxM`, []]]], 
          ((Obj.ava === false) ? avaObj = modelAlert(avaObj): avaObj = []),
          ((Obj.pass_reset === false) ? passObj = modelAlert(passObj): passObj = []), [`div`, msgs(MailObj)]]]
    }

    return model;
  },

  avaSaveModal () {

    return [
      `div`, `&@style>letter-spacing:0.75px`, [[
        `div`, `.@_gcQ _aXZ`, [[
          `div`, `.@_axS`, [[
            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@ava-place-exit-ejs`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Revert`]]]]], [
          `div`, `.@_dMG _geQ _aA2`, [[`span`, `.@_tXx`, `~@Set Avatar Photo`]]], [
          `div`, `.@_QZg _gMz`, [[`div`, `.@_gM_a _agM`, [[`a`, `#@ava-place-save-ejs`, `.@_TX_a _atX`, `&@href>javascript:;`, `~@Save`]]]]]]], [
        `div`, `.@_aXY _XsQ _aA2`, [[
            `div`, `.@_sZ2`, [[
              `div`, `.@_4sC _dMG _sZ2`, [[
                `label`, `&@style>width:150px;height:150px`, `.@_cCq _gS6`, `#@devs-ava-ejs`, `&@for>file`, `config.to_ava`, [[
                  `img`, `#@devs-ava-ejs`, `.@_aWz`]]], [
                `p`, `.@_axX`, `~@Click on avatar space to upload or change photo`], 
                this.inputFile()]]]]]]]]
  },

  passResetModal () {

    return [
      `div`, `&@style>letter-spacing:0.75px`, [[
        `div`, `.@_gcQ _aXZ _sZ2`, [ [
          `div`, `.@_dMG _geQ _aA2`, [[`span`, `.@_tXx`, `~@Reset Password`]]], [
          `div`, `.@_QZg _gMz`, [[
          `div`, `.@_axS`, [[
            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@pass-reset-exit-ejs`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@return`]]]]]]]]], [
        `div`, `.@_aXY _XsQ _aA2`, [[
          `div`, `#@reset-response-ejs`, `.@_-Zz _sZ2`, `&@style>padding: 14px; border: 1px solid #ffacac; border-radius: 16px` , [[
            `p`, `#@pass-match-false`, `.@_aA6`, `~@*passwords do not match.`], [
            `p`, `#@pass-match-true`, `.@_aA6`, `~@*your changes have been saved successfully.`]]],[
            `div`, `.@_sZ2`, [[
                        `form`, `.@_cQc`, [[
                          `div`, `.@_cQX`, [[
                            `input`, `#@pass-tjs`, `.@_-Yz _txx _aA6`, `&@placeholder>New password`, config.valPass]]], [
                          `div`, `.@_cQX`, [[
                            `input`, `#@reset-pass-tjs`, `.@_-Yz _txx _aA6`, `&@placeholder>Re-type new password`, `&@type>password`]]], [
                            `div`, `.@_agM _gM_a _cQc _guZ`, [[
                              `a`, `#@reset-pass-devs-save-ejs`, `.@_TX_a _atX _c5Q _utQ`, `&@href>javascript:;`, `~@reset password`]]]]]]]]]]]
  },

  devsStat (Obj) {

    let model = [];

    Obj.forEach((dev, e) => {

      let ava = ``;

      model[e] = [
        `div`, `.@_X4-`, [[
          `div`, `.@_yZS _gxM _geQ`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[`span`, `.@_cCq`, `&@style>width:60px;height:60px`, [[
            `img`, `.@_aWz`, `&@src>${dev.ava}`, `&@alt>avatar`]]], [
          `div`, `.@_eYG`, [[
            `div`, `.@_QxM`, [[`span`, `.@_tXx aA2`, `~@${dev.alt} ${dev.alt2}`]]], [
            `div`, `.@_gxM _geQ`, [[
              `span`, `.@_aA6 _a2X`, `~@${dev.role}`]]]]]]]]], [
          `div`, `.@_yZS _gxM _geQ _gMX`, [[
            `div`, [[`span`, `.@_aA6`, `~@Availability`]]], [
            `div`, `.@_QZg _gxM`, [[
              `div`, [[`svg`, `.@_zg0`, [[`g`, [[
                `circle`, `.@_cC4`, `&@r>19`, `&@cy>20`, `&@cx>20`], [
                `circle`, `&@style>stroke-dashoffset: ${600-parseFloat(dev.reqs_per_secs)/100*120}px`, `.@_cC4-`, `&@r>19`, `&@cy>20`, `&@cx>20`]]]]], [
                `div`, `.@_-cC4 _a00`, [[`span`, `~@${dev.reqs_per_secs}`], [`span`, `&@style>font-size:10px`, `~@%`]]]]]]]]], [
          `div`, `.@_yZS _gxM _geQ _gMX`, [[
            `div`, [[`span`, `.@_aA2`, `~@Last Seen`]]], [
            `div`, `.@_QZg _gxM`, [[`span`, `.@_a2X`, `~@${this.log(dev.pre_utc)}`]]]]], [
                `div`, `.@_yZS _gxM _geQ _gMX`, [[
                  `div`, [[`span`, `.@_aA6`, `~@${(dev.gps === `false` || dev.gps === false ? dev.gps = `location disabled`: dev.gps = dev.gps)}`]]]]]]];
    });

    return model;
  },

  appendDevsModal () {
    
    let teams = [
      [`Research & Development`, [`Co-Systems Architect`, `Data Scientist`, `Co-Founder`]],
      [`Engineering`, [
        `Network Engineer`,
        `Node.js Developer`, 
        `Senior IOS Developer`, 
        `IOS Developer`, 
        `Senior Android Developer`, 
        `Android Developer`, 
        `Cryptographer`,
        `Database Administrator`, 
        `System Administrator`]],
      [`Product Design`, [`Senior UX Developer`, `Front-end Developer`]],
      [`Communications & Internal Relations`, [`Head Operations`, `Communications Director`, `Head Marketing`]],
      [`User Experience`, [`Calls & Mail Support`, `Content Manager`]]];

    let teamModel = [];

    teams.forEach((team, e) => {

      let roles = []

      team[1].forEach((role, e2) => {

        roles[e2] = [
          `div`, [[
            `div`, `.@_yZS _gxM geQ gMX _uZM`, [[
              `label`, `.@_tXv`, `&@role>radio`, [[
                `input`, `&@type>radio`, `#@role-ejs`, `&@value>${team[1][e2]}`, `&@name>role-ejs`], [
                `span`, `.@_tCw _aA2 _tXx`, `~@${team[1][e2]}`]]]]]]];
      });

      teamModel[e] = [
        `div`, `#@team`, [[
          `div`, `.@_yZS _gxM geQ gMX _uZM`, [[
            `label`, `.@_tXv`, `&@role>radio`, [[
              `input`, `&@for>${e}`, `&@type>radio`, `#@team-ejs`, `&@value>${team[0]}`, `&@name>team-ejs`], [
              `span`, `.@_tCw aA2 _tXx`, `~@${team[0]}`]]]]], [
          `div`, `.@_-Zz`, `&@team>${e}`, `#@roles`, roles]]]
    });

    return [
      `div`, `&@style>letter-spacing:0.75px`, [[
        `div`, `.@_gcQ _aXZ sZ2`, [ [
          `div`, `.@_eYG _geQ _aA2`, [[`span`, `.@_tXx`, `~@Add a Team Member`]]], [
          `div`, `.@_QZg _gMz`, [[
          `div`, `.@_axS`, [[
            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@add-dev-exit-ejs`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@return`]]]]]]]]], [
        `div`, `.@_aXY _XsQ _aA2`, `&@style>margin:0 0 60px;max-height: calc(100vh - 170px);`, [[
          `div`, `#@add-devs-response-ejs`, `.@_-Zz _sZ2`, `&@style>padding: 14px; border: 1px solid #ffacac; border-radius: 16px` , [[
            `p`, `#@add-devs-false`, `.@_aA6`, `~@*invalid or empty input.`], [
            `p`, `#@pass-match-true`, `.@_aA6`, `~@*your changes have been saved successfully.`]]],[
            `div`, `.@_sZ2`, teamModel], [
            `div`, [[
              `div`, `.@_yZS _gxM geQ gMX _uZM`, [[`span`, `.@_tXx`, `~@Names`]]], [
                `div`, `.@_UFA _cS2`, [[
                  `input`, `#@add-name-devs-tjs`, `.@_RRD _Ccs`, `&@autocomplete>off`, `&@placeholder>Firstname`]]], [
                `div`, `.@_UFA _cS2`, [[
                  `input`, `#@add-surname-devs-tjs`, `.@_RRD _Ccs`, `&@autocomplete>off`, `&@placeholder>Surname`]]]]]]], [
          `div`, `#@add-dev-see-ejs`, `.@_azX- _gMX _gp0 _gmg`, [[
            `div`, `.@_gxM CYc gcQ geQ _gMX`, [[
              `div`, `.@_gMX gcQ`, [[
                `div`, `.@_gM_a _agM _gMX`, `&@style>max-width: 500px`, [[
                  `a`, `#@add-dev-ejs`, `inlineJSON`, `.@_TX_a _atX _gMX`, `&@href>javascript:;`, `~@Add to Team`]]]]]]]]]]]
  },

  supportReqs (Obj) {

    let reqs = []

    Obj.forEach((Msg, a) => {

      let risk = `&@style>color:`;

      if (Msg.risk === `Urgent`) risk += `#db0404`;

      else if (Msg.risk === `High`) risk += `#04db30`;

      else if (Msg.risk === `Low`) risk += `#046cdb`;

      reqs[a] = [
        `div`, `.@_cx4 _gxM _geQ _gMX`, [[
          `div`, `.@_x10 _x00`, [[
            `div`, `.@_gxM _x2y _gMX`, `&@style>margin: 0 auto;`, [[
              `div`, `.@_x25`, `&@style>padding: 0 15px 0 0`, [[
                `div`, `&@style>letter-spacing:0.75px`, `.@_ZSg _ZCg _eYG _gcQ`, [[`span`, `.@_cCq`, `&@style>width:40px;height:40px`, [[
                  `img`, `.@_aWz`, `&@src>${Msg.src_ava}`, `&@alt>avatar`]]], [
                `div`, `.@_eYG`, [[
                  `div`, `.@_gxM _gMX`, [[`div`, `.@_eYG _ZSg`, [[`span`, `.@tXx aA2 _tXv`, `~@${Msg.src_alt}`]]], [
                    `div`, `.@_QZg _gxM`, [[`span`, `.@_a2X _tXv`, `~@${this.log(Msg.mail_log)}`]]]]], [
                  `div`, `.@_gxM _geQ`, [[
                    `span`, `.@_aA6 _a2X`, `~@${Msg.src_role}`]]]]]]]]], [
              `div`, `.@_x16`, [[
                `div`, `.@_Xsa`, [/*[`span`, `.@_tXv _tXx`, `~@${Msg.title}`], */[
                  `a`, `&@href>/devs/mail/c/${Msg.mail_md5}/`, `&@style>line-height: 1.6em`, `.@_aA2 _tXx _tXv`, `~@${Msg.title}`], [
                  `span`, risk, `.@_aA2 tXx`, `~@#${Msg.risk}`]]]]]]]]]]]
    })

    let supportReqs = [
        `div`, `.@_sZ2`, [[
          `div`, `.@_yZS _gxM _geQ _gMX _uZM _cX0`, [[
            `div`, `.@_`, [[`span`, `&@style>letter-spacing:0.75px`, `.@_tXx`, `~@Feedback & Support Requests`]]], [
            `div`, `.@_QZg _gxM`, []]]], [`div`, reqs]]]

    if (!Obj.length > 0) supportReqs = [];

    return supportReqs;
  },

  rootDevsView (Obj, MailObj, Obj2, Mail2Obj) {

    let appendDev = () => {

      let model = [];

      if (Obj.access.indexOf(`universal`) !== -1) {

        model =  [
            `div`, `.@_gxM _yZS _cX0 _aYS`, [[
              `div`, `.@_gM_a _agM _guZ`, [[
                `a`, `#@append-devs-ejs`, `.@_TX_a _atX qXS _utQ a2X`, `&@href>javascript:;`, `~@+ Add Team Member`]]]]]
      }

      return model;
    }

    return [`main`, `.@_aA2 _sy2`, [[
      `div`, `.@_sZ2 _cX0`, [[`div`, `&@style>letter-spacing:0.75px`, `.@_tXx`, `~@${Obj.group}`], [`div`, `.@_a2X`, `~@${Obj.role}`]]], [
      `div`, `.@_pV0`], [
      `div`, `.@_sZ2 pV0`, [[
        `div`, `.@xSe`, [this.devSysAlert(Obj, MailObj)]], [
          `div`, `.@_sZ2 _-Zz`, [[
            `div`, `.@_yZS _gxM _geQ _gMX _uZM`, [[
                      `div`, `&@style>letter-spacing:0.75px`, `.@_gxM`, [[`span`, `.@_tXx`, `~@Work `]]], [
                      `div`, `.@_QZg _gxM _cX5`, [[`a`, `#@dev-active-next-ejs`, `.@_tX ProceedColor`, `&@href>javascript:;`]]]]], [
            `div`, `&@style>line-height: 1.6em;letter-spacing:0.75px`, `.@cx4 _gxM _geQ _gMX`, [[
              `div`, `.@_miY _gMX`, [[`div`, `.@_AZc`, [[`div`, [[`div`, `.@_AZx`, [[`div`, `.@_AZs _gxM`, [[
                `div`, `.@_X4-`, [[
                  `div`, `.@_yZS _gxM _geQ`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [ [
                  `div`, `.@_ZSg _ZCg _eYG`, [[
                    `div`, `.@_QxM`, [[`span`, `.@_tXx _aAe _a2X`, `~@Firmware intergration`]]], [
                    `div`, `.@_gxM _geQ`, [[
                      `span`, `.@_aA6`, `~@intergrate firmware driver`]]]]]]], [
                    `div`, `.@_QZg`, [[
                      `div`, [[
                        `svg`, `.@_zg0`, [[
                          `g`, [[
                            `circle`, `.@_cC4`, `&@r>19`, `&@cy>20`, `&@cx>20`], [
                            `circle`, `&@style>stroke-dashoffset: ${600-47/100*120}px`, `.@_cC4-`, `&@r>19`, `&@cy>20`, `&@cx>20`]]]]], [
              `div`, `.@_-cC4 _a00`, [[`span`, `~@47`], [`span`, `~@%`]]]]]]]]]]]]]]]]]]]]]]]]], [
          `div`, `.@_sZ2`, [[
            `div`, `.@_yZS _gxM _geQ _gMX _uZM _cX0`, [[
              `div`, `&@style>letter-spacing:0.75px`, `.@_gxM`, [[`span`, `.@_tXx`, `~@Team `]]], [
              `div`, `.@_QZg _gxM _cX5`, [[`a`, `#@dev-active-next-ejs`, `.@_tX ProceedColor`, `&@href>javascript:;`]]]]], appendDev(), [
            `div`, `&@style>letter-spacing:0.75px`, `.@cx4 _gxM _geQ _gMX`, [[
              `div`, `.@_miY _gMX`, [[
                `div`, `#@team-slide-ejs`, `.@_AZc`, [[
                  `div`, [[`div`, `.@_AZx ava`, [[`div`, `#@team-rotate-ejs`, `.@_AZs _gxM`, this.devsStat(Obj2)]]]]]]]]]]]]], this.supportReqs(Mail2Obj), [
          `div`, `.@_sZ2 _-Zz`, [[
            `div`, `.@_yZS _gxM _geQ _gMX _uZM`, [[
                      `div`, `.@_`, [[`span`, `&@style>letter-spacing:0.75px`, `.@_tXx`, `~@Tasks`]]], [
                      `div`, `.@_QZg _gxM`, []]]], [
                      `div`, `&@style>padding:25px 0 0`, `.@_gxM _yZS`, [[
                        `div`, `.@_gM_a _agM _guZ`, [[
                          `a`, `.@_TX_a _atX qXS _utQ a2X`, `&@href>javascript:;`, `~@+ Assign a Task`]]]]]]]]]]];
  },

  rootView (pool ) {
    return [
      `span`, `#@corrde-root`, pool.appendModel];
  },

  topDevsView (pool) {

    return [`nav`, 
      `.@_uHC`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY`, [[
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `#@devs`, `.@_tXa`, `&@href>/`, `~@corrde`], [
                `span`, `.@_tCc _pV4`, `~@devs`]]], [
              `div`, `.@_QZg _gxM _aA2`, [[`span`, `&@style>letter-spacing:0.75px`, `.@_axS _gV0 _tXx`, `~@${pool.mail}`], [
                `a`, `.@_axS _cCq _gS3`, `#@mug-ava`, `&@href>javascript:;`, [[
                  `img`, `#@mug-ava`, `.@_aWz`, `&@src>${pool.ava}`, `&@alt>avatar`]]]]]]]]]]]]]
  },

  readDevsMail (msg, Obj) {

    let sortGroup = () => {

      let mail = [];

      let text = ``;

      if (msg.type === `push dev`) {

        text = 
          `Your new addition to the Corrde Team is all set to go! Please provide the new user 
          with the listed credentials so that may they may have access to their designated portal.`;

        if (msg.dev_md5 !== msg.src_md5) {

          text = 
            `Welcome to the Corrde Development Team, you are all set to go! 
            Below are your work designations and credentials that you may use to 
            access your administrative portal. These credentials also serve as 
            an identity for your work email, you may receive or send emails to your 
            fellow Corrde Team colleagues using these credentials.`;
        }

        mail = [
          `div`,`&@style>line-height:1.6em; width: 100%`, [[
            `p`,`.@_sZ2`, `~@${text}`], [
            `div`, `.@_sZ2`, [[
                `p`, `.@_a2X`, `~@WORK EMAIL`], [
                `a`, `.@_tXx`, `&@href>javascript:;`, `~@${msg.mail.mail}`], [
                `p`, `.@_a2X`, `~@PASSWORD`], [
                `p`, `.@_tXx`, `~@${msg.mail.dev}`], [
                `p`, `.@_a2X`, `~@ACCESS GROUP`], [
                `p`, `.@_tXx`, `~@${msg.mail.group}`], [
                `p`, `.@_a2X`, `~@DESIGNATION`], [
                `p`, `.@_tXx`, `~@${msg.mail.role}`]]]]]

      }
        
      return mail;
    }

    return [`main`, `&@style>letter-spacing:0.75px`, `.@_aA2 _sy2`, [[
      `div`, `.@_sZ2 _cX0`, [[`div`, `.@_tXx`, `~@${msg.title}`], [`div`, `.@_a2X`, `~@${msg.group}`]]], [
      `div`, `.@_pV0`], [
      `div`, `.@_sZ2 pV0`, [[
        `div`, `.@cX0`, [[
          `div`, `.@_sZ2 cX0`, [[
            `div`, `.@_yZS _gxM _geQ _gMX uZM _cX0`, [[
                `div`, `&@style>letter-spacing:0.75px`, `.@_ZSg _ZCg _eYG _gcQ`, [[`span`, `.@_cCq`, `&@style>width:40px;height:40px`, [[
                  `img`, `.@_aWz`, `&@src>${msg.src_ava}`, `&@alt>avatar`]]], [
                `div`, `.@_eYG`, [[
                  `div`, `.@_gxM _gMX`, [[`div`, `.@_eYG _ZSg`, [[`span`, `.@_tXx aA2`, `~@${msg.alt_src}`]]], [
                    `div`, `.@_QZg _gxM`, [[`span`, `.@_a2X _tXv _cXq`, `~@${this.log(msg.mail_log)}`]]]]], [
                  `div`, `.@_gxM _geQ`, [[
                    `span`, `.@_aA6 _a2X`, `~@${msg.src_group}`]]]]]]]]]]]]]]], [
          `div`, `.@_sZ2`, [[
            `div`, `.@_yZS _gxM _geQ _gMX _uZM _cX0`, [sortGroup(msg)]]]], [
        `div`,`&@style>margin: 0 0 60px`, `.@_gcQ _aXZ`, [[
          `div`, `.@_axS`, [[
            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#ava-place-exit-ejs`, `.@_TX_a _atX _utQ`, `&@href>javascript:;`, `~@Reply`]]]]], [
          `div`, `.@_dMG _geQ _aA2`, [[`span`, `.@tXx`, `~@`]]], [
          `div`, `.@_QZg _gMz`, [[`div`, `.@_gM_a _agM _guZ`, [[`a`, `#ava-place-save-ejs`, `.@_TX_a _atX _utQ`, `&@href>javascript:;`, `~@Forward`]]]]]]]]];
  },

  topSupport () {

    return [`nav`, 
      `.@_uHC`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY`, [[
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `.@_tXa`, `&@href>/`, `~@corrde`], [
                `span`, `.@_tCc _pV4`, `~@support`]]], [
              `div`, `.@_QZg _gMz`, [[`a`, `.@_tX SearchColor`, `&@href>javascript:;`]]]]]]]]]]];
  },

  supportMsgModal () {

    return [
      `div`, `&@style>letter-spacing:0.75px;line-height:1.6rem`, [[
        `div`, `.@_gcQ _aXZ sZ2`, [ [
          `div`, `.@_eYG _geQ _aA2`, [[`span`, `.@_tXx`, `~@`]]], [
          `div`, `.@_QZg _gMz`, [[
          `div`, `.@_axS`, [[
            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@support-exit-ejs`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@exit`]]]]]]]]], [
        `div`, `.@_aXY _XsQ _aA2`, `&@style>max-height: calc(100vh - 170px);`, [[
          `div`, `&@style>padding-top:50px;padding-bottom:50px`, `#@push-quiz-true`, `.@_-Zz _sZ2`, [[
            `p`, `#@quiz-true`, `.@_aA2`, `~@Thank you for using our help service, your question has been delivered to our support team.`]]], [
          `div`, `#@hide-support-msg-ejs`, [[
            `div`, `.@sZ2`, `teamModel`], [
            `div`, `.@_sZ2`, [[
              `div`, `#@support-to-ejs`, [[
                `div`, `.@_UFA`, [[
                  `input`, `#@support-q-mail-tjs`, `.@_RRD Ccs _aA2 _pVa`, `&@autocomplete>off`, `&@placeholder>Email`]]]]], [
                `div`, `.@_UFA cS2`, [[
                  `input`, `#@support-q-subject-tjs`, `.@_RRD Ccs _aA2 _pVa`, `&@autocomplete>off`, `&@placeholder>Subject`]]]]], [
            `div`, `.@_sZ2`, [[
              `div`, `.@_yZS _gxM geQ gMX`, [[
                `span`, `.@_aA2 _tXx`, `~@Priority level`]]], [
                            `div`, `.@_gxM _geQ _gMX`, [[
                              `div`, `.@_miY _gMX`, [[
                                `div`, `#@priority-slide-ejs`, `.@_AZc`, [[
                                  `div`, [[`div`, `.@_AZx ava`, [[`div`, `#@priority-rotate-ejs`, `.@_AZs _gxM`, [[
                                    `div`, `.@_xX4 _tXv`, [[
                                      `label`, `.@_tXv`, `&@role>radio`, [[
                                        `input`, `&@type>radio`, `#@alert-level-ejs`, `&@value>Urgent`, `&@name>alert-level-ejs`], [
                                          `span`, `.@_tCw aA2 tXx`, `~@Urgent`]]]]], [
                                    `div`, `.@_xX4 _tXv`, [[
                                      `label`, `.@_tXv`, `&@role>radio`, [[
                                        `input`, `&@type>radio`, `#@alert-level-ejs`, `&@value>High`, `&@name>alert-level-ejs`], [
                                          `span`, `.@_tCw aA2 tXx`, `~@High`]]]]], [
                                    `div`, `.@_xX4 _tXv`, [[
                                      `label`, `.@_tXv`, `&@role>radio`, [[
                                        `input`, `&@type>radio`, `#@alert-level-ejs`, `&@value>Low`, `&@name>alert-level-ejs`], [
                                          `span`, `.@_tCw aA2 tXx`, `~@Low`]]]]]]]]]]]]]]]]]]], [
                          `div`, `.@_`, [[
                            `div`, `.@_yZS _gxM _geQ _gMX`, [[
                                  `textarea`, `#@support-quiz-tjs`, `.@-_tyq _aA2`, `&@autocomplete>off`, `&@placeholder>Type your question`]]]]], [
                        `div`, `.@_gcQ _aXZ sZ2`, [ [
                          `div`, `.@_eYG _geQ _aA2`, [[`span`, `.@_tXx`, `~@`]]], [
                          `div`, `.@_QZg _gMz`, [[
                          `div`, `.@_axS`, [[
                            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@push-support-quiz-ejs`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Send`]]]]]]]]]]]]]]]
  },

  support () {

    return [
      `main`, `.@_xC2 _aA2`, `&@style>letter-spacing: .75px`, [[`section`, `.@_g29`, `&@style>line-height:1.5em`, [[
        `div`, `.@_cX3`, [[`div`, `.@_gxQ _gxM _X2Y _gxZ`, `&@style>min-height:250px`, [[
          `div`, `.@_gxQ _gQ0 _S8Y _c3x`, [[`h1`, `.@_tx1 _atX`, `~@We're here to help`]]], [`div`, `.@_ge0 _c3x`, [[
          `div`, `~@Support is just a few taps away. 
          You can slide through our support topics for help, or get your questions answered by using our community chat service.`]]]]]]], [
            `div`, `&@style>letter-spacing:0.75px`, `.@cx4 _gxM _geQ _gMX`, [[
              `div`, `.@_miY _gMX`, [[
                `div`, `#@support-slide-ejs`, `.@_AZc`, [[
                  `div`, [[`div`, `.@_AZx ava`, [[`div`, `#@support-rotate-ejs`, `.@_AZs _gxM`, [[
                    `div`, `.@_xX4 _tXv`, [[`a`, `.@_tXx _aA0`, `&@href>/community/`, `~@Community`]]]/*, [`div`, `.@_xX4`, `~@How to's`], [
                    `div`, `.@_xX4 _tXv`, `~@Corrde Maps`], [
                    `div`, `.@_xX4 _tXv`, `~@Developers`], [
                    `div`, `.@_xX4 _tXv`, `~@FAQs`], [
                    `div`, `.@_xX4 _tXv`, `~@RAQs`], [
                    `div`, `.@_xX4 _tXv`, `~@Corrde Ads`]*/]]]]]]]]]]]]]], [
          `div`, `@-ejs`, `.@_azX- _gMX _gp0 _gmg`, [[
            `div`, `.@_gxM CYc gcQ geQ _gMX`, [[
              `div`, `.@_gMX gcQ`, [[
                `div`, `.@_gM_a _agM _gMX _guZ`, `&@style>max-width: 500px`, [[
                  `a`, `#@support-msg-ejs`, `inlineJSON`, `.@_TX_a _atX _gMX _utQ _tXx`, `&@href>javascript:;`, `~@Ask Support Team a Question`]]]]]]]]]]]
  }

}
