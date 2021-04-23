const config = require(`./corrde-config`),
  RetailMaps = config.RetailZones,
  RetailSets = config.RetailSets,
  SellSet    = config.SellSet,
  SVG        = config.SVG,
  TagSets    = config.TagSets,
  AlterCues  = config.AlterCues,
  MakeCues   = config.MakeCues,
  UASVG      = config.icons;

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

      if (typeof t2 === `string` && t2.split(`@`)[0] === `~`) {this.appendString += this.avail_esc_Chars(t2.substring(2, t2.length+1));}

      if (typeof lv2 === `object`) {this.modelStringify(lv2);}

      let queer = [`img`, `input`, `meta`];

      let XML = [`?xml`];

      if (queer.indexOf(z) === -1) this.appendString += `</` + z + `>`;
    }
    return this.appendString;
  }

  avail_esc_Chars (String) {

    String = String.replace(new RegExp(`u/0026`, `g`), `&`);

    String = String.replace(new RegExp(`u/0027`, `g`), `'`);

    String = String.replace(new RegExp(`u/0022`, `g`), `"`);

    String = String.replace(new RegExp(`u/002F`, `g`), `/`);

    return String;
  }
}

class Util {

  secs2UTC (sec) {

    let day = new Date(parseInt(sec)),
      listMonths = config.listReducMonths,

      dayReduc = listMonths[day.getUTCMonth()] + ` ` + day.getUTCDate() + ` ` + day.getUTCFullYear();
    
    return dayReduc;
  }

  secsSince (sec) {

    let then = sec, lapse = (new Date().valueOf() - then), lapseString;

    if (lapse >= 86400000) lapseString = Math.floor(lapse/86400000) + `d`;

    else if (lapse >= 3600000) lapseString = Math.floor(lapse/3600000) + `hr`;

    else if (lapse >= 60000) lapseString = Math.floor(lapse/60000) + `min`;

    else if (lapse >= 0) lapseString = Math.floor(lapse/1000) + `sec`;

    else lapseString = new Date(sec).getDate() + ` ` + config.listReducMonths[new Date(sec).getMonth()];

    return lapseString;
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

  alternativeMug (subj) {

    let alpha = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;

    subj = parseInt(alpha.indexOf(subj.toUpperCase()[0]) + 1);

    let ava = config.reqs.alt_ava + subj + `_${Math.round(Math.random()*1)}.svg`;

    return ava
  }
}

module.exports = {

  ava: (subj) => new Util().alternativeMug(subj),

  log: (time) => new Util().timeFormat(time),

  tick: sec => new Util().ticker(sec),

  secs2UTC: sec => new Util().secs2UTC(sec),

  pre_utc: sec => new Util().secsSince(sec),

  availtimeleft: sec => new Util().availtimeleft(sec),

  filter: all => new ModelString().avail_esc_Chars(all),

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

    let SaleModes = [
      [`Visa`, `Visa`],
      [`MasterCard`, `MasterCard`],
      [`Amex`, `Amex`],
      [`Paypal`, `Paypal`],
      [`GooglePay`, `GooglePay`], 
      [`Stripe`, `Stripe`], 
      [`ApplePay`, `ApplePay`], 
      [`Venmo`, `Venmo`], 
      [`Bitcoin`, `Bitcoin`]];

    let ModelSaleGateWay = [];

    for (let foot in config.foots) {

      footAll[i] = [
        `div`, `.@_geQ`, [[`a`, `.@_uHB`, `&@href>${config.foots[foot]}`, `~@${foot}`]]]

      i++
    }

    SaleModes.forEach(Mode => {

      ModelSaleGateWay.push([
        `div`, `.@_geQ`, [[ `div`, `.@_uHB`, [[`a`, `.@-_tX ${Mode[1]}`, `&@href>javascript:;`, `~@${Mode[0]}`]]]]])
      
    })

    return [
      `footer`, `.@_CuH`, [[  
        `div`, `.@_gxM _aYS`, footAll], [
        `div`, `.@_gMX _aYS`, [[
          `a`, `.@-_tX _4Qx GramColor`, config.out_to, `&@href>https://instagram.com/corrdeapp`, `~@instagram`], [
          `a`, `.@-_tX _4Qx TwitterColor`,config.out_to, `&@href>https://twitter.com/corrdeapp`, `~@twitter`], [
          `a`, `.@-_tX _4Qx VKBlack`,config.out_to, `&@href>https://vk.com/corrdeapp`, `~@vk`], [
          `a`, `.@-_tX _4Qx Dribbble`,config.out_to, `&@href>https://dribbble.com/corrde`, `~@dribbble`], [
          `a`, `.@-_tX _4Qx GitHub`,config.out_to, `&@href>https://github.com/mannasugo/corrde`, `~@GitHub`]]], [
        `div`, `.@_geQ _aYS`, [[`span`, `.@_uHB`, config.ip]]], [  
        `div`, `.@_gxM _aYS`, ModelSaleGateWay]]]
  },

  jS (pool) {

    let JS;

    if (typeof pool.jsState === `object`) {

      let JS_ = [];

      pool.jsState.forEach(script => {

        JS_[pool.jsState.indexOf(script)]  = [`script`, `&@src>${script}`];
      })

      JS = [`div`, JS_]
    }

    else JS = [`script`, `&@src>${pool.jsState}`];

    return [
      `aside`, [[
        `script`, `&@src>/socket.io/socket.io.js`], [
        `script`, `&@src>/gp/d3.js`]/*, [
        `script`, `&@src>/gp/topojson-client-master/src/index.js`]*/, [
        `script`, `&@src>${config.cd.utilJS}`], [
        `script`, config.valjS, `~@JSStore.to(${pool.jSStore})`], JS]]
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
      `form`, `&@enctype>multipart/form-data`, [[`input`, `#@file`, `&@type>file`, `&@accept>image/*`]]]
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
      mugPool = [`My Feed`],
      mugPoolids = [`tofeed`],
      mugPooltos = [`/feed/`];

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
                  `img`, `#@mug-ava`, `.@_aWz`, `&@src>${pool.ava}`]]]]], 
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
          `div`, `.@_XsQ _xsQ- _aA2 _tY0`, [[
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
          `text`, `&@style>font-weight:300`, loop, `&@x>${82 - (day * 77.5/(A.length - 1))}%`, `&@y>232.5`, `~@${this.UTCDayMin(A[day].secsUTC)}`], [
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
          `div`, `.@_XsQ _xsQ- _aA2 _tY0`, [[
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
                          `a`, `.@_TX_a _atX _qXS _utQ _a2X`, `&@style>text-transform:capitalize;font-size:11px`, `&@href>javascript:;`, `~@${this.secs2UTC(new Date().valueOf() - parseInt((6 * 86400000)))} - ${this.secs2UTC(new Date().valueOf())}`]]]]]]], [
                    `div`, [this.BarPlotView(A.raw)]]]]]]]], [
              `div`, `#@duas-graph`, `.@_sZ2`, [[
                `div`, [[
                  `div`, `.@_sZ2`, [[
                    `div`, `.@_yZS _gxM _geQ _gMX`, [[
                      `div`, `.@_`, [[`span`, `.@_tXx`, `~@Daily user activity`]]], [
                      `div`, `.@_QZg _gxM`, [[
                        `div`, `.@_gM_a _agM _guZ`, [[
                          `a`, `.@_TX_a _atX _qXS _utQ _a2X`, `&@style>text-transform:capitalize;font-size:11px`, `&@href>javascript:;`, `~@active/sec`]]]]]]], [
                    `div`, [this.linePlotHour()]]]]]]]], [
              `div`, `#@regs-graph`, `.@_sZ2`, [[
                `div`, [[
                  `div`, `.@_sZ2`, [[
                    `div`, `.@_yZS _gxM _geQ _gMX`, [[
                      `div`, `.@_`, [[`span`, `.@_tXx`, `~@Registered users`]]], [
                      `div`, `.@_QZg _gxM`, [[
                        `div`, `.@_gM_a _agM _guZ`, [[
                          `a`, `.@_TX_a _atX _qXS _utQ _a2X`, `&@style>text-transform:capitalize;font-size:11px`, `&@href>javascript:;`, `~@${this.secs2UTC(new Date().valueOf() - parseInt((6 * 86400000)))} - ${this.secs2UTC(new Date().valueOf())}`]]]]]]], [
                    `div`, [this.BarPlotView(A.regs)]]]]]]]], [
              `div`, `#@regs-graph`, `.@_sZ2`, [[
                `div`, [[
                  `div`, `.@_sZ2`, [[
                    `div`, `.@_yZS _gxM _geQ _gMX`, [[
                      `div`, `.@_`, [[`span`, `.@_tXx`, `~@Jobs activity`]]], [
                      `div`, `.@_QZg _gxM`, [[
                        `div`, `.@_gM_a _agM _guZ`, [[
                          `a`, `.@_TX_a _atX _qXS _utQ _a2X`, `&@style>text-transform:capitalize;font-size:11px`, `&@href>javascript:;`, `~@${this.secs2UTC(new Date().valueOf() - parseInt((6 * 86400000)))} - ${this.secs2UTC(new Date().valueOf())}`]]]]]]], [
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

    let iconRules = [`RootGray`, `MugColor`, `SellColor`, `MailColor`, `StatsPlaneColor`];

    let to = [`/devs/`, `/devs/mug/`, `/devs/toolkit/`, `/devs/mail/`, `/devs/analytics/`];

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

    let rules = [`RootGray`, `MugColor`, `SellColor`, `MailColor`, `StatsPlaneColor`];

    let to = [`/devs/`, `/devs/mug/`, `/devs/toolkit/`, `/devs/mail/`, `/devs/analytics/`];

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
            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@ava-place-exit-ejs`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Exit`]]]]], [
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
            `p`, `#@pass-match-true`, `.@_aA6`, `~@*your changes have been saved successfully.`]]], [
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
        `div`, `.@_X4- _rQ0`, [[
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
                    `div`, `.@_g00 _gxM yZS`, [/*[
                      `span`, `&@style>background-image:url(${config.reqs.check_svg})`, `.@_fg0`]*/[
                      `a`, `.@-_tX GeoGray`, `&@href>javascript:;`] , [
                      `p`, `#@last_PJ`, `.@_aA6`, `~@${dev.pos[dev.pos.length - 1]}`]]]]]]];
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
      `.@_uHC _tY0`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY`, [[
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM _geQ`, [[
                `a`, `#@devs`, `.@-_tX AppMedium`, `&@href>/v2/devs/`, `~@corrde`], [
                `span`, `@_aA6`, `&@style>padding: 0 7px`, `~@ | DASHBOARD`]]], [
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
      `main`, `.@_xC2 _aA2`, `&@style>letter-spacing: .75px`, [[`section`, `.@_g29`, `&@style>line-height:1.5rem`, [[
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
  },

  supportAlert () {

    return [`section`, `.@_gf3 _aA2`, [[`div`, `.@_cX3`, [[`div`, `&@style>padding:24px 0`, `.@_gxQ`, [[
      `span`, `~@Need any assistance? We now have a fully operational support team to tackle your requests or improve on your suggestions.`]]], [
      `div`, `.@_gxQ`, `&@style>padding: 0 0 24px`, [[
        `div`, `.@_gM_a _agM _guZ`, [[`a`, ``, `.@_TX_a _atX qXS _utQ`, `&@href>/support/`, `~@Request Support`]]]]]]], [
      `div`, [[
            `div`, `.@_aXz`, `&@style>max-width:100%;background:#1185fe;`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `.@_tXa`, `&@href>/`, `~@`], [
                `span`, `.@tCc pV4`, `~@`]]], [
              `div`, `.@_QZg _gMz`, [[
                    `div`, `.@_pVf _agM _guZ gMX`, `&@style>max-width: 450px`, [[
                      `a`, `.@_TX_a _atX utQ _atX _gMX`, `&@href>/tour/`, `~@Take A Tour`]]]]]]]]]]]
  },

  topTour () {

    return [`nav`, 
      `.@_uHC`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY`, [[
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `.@_tXa`, `&@href>/`, `~@corrde`], [
                `span`, `@_tCc _pV4`, `@explore`]]], [
              `div`, `.@_QZg _gMz`, [[`a`, `.@_tX SearchColor`, `&@href>/seek/`]]]]]]]]]]];
  },

  u_md5_y_scroll (A) {

    let Obj = A.md5;

    Obj.sort((a, b) => {return b.log - a.log})

    let u_md5_y_scroll = [];

    Obj.forEach(md5 => {

      u_md5_y_scroll[Obj.indexOf(md5)] = [
        `div`, `.@_xX0 _tXv`, [[
          `a`, `.@_cCq`, `&@style>width:50px;height:50px`, `&@href>/mug/${md5.sum}/`, [[
            `img`, `.@_aWz`, `&@src>${md5.ava}`, `&@alt>avatar`]]], [
          `span`, `&@style>margin:10px 0 0`, `.@_aA6 _a2X`, `~@${this.pre_utc(md5.pre_utc)}`]]];
    })

    return u_md5_y_scroll;
  },

  tour (A) {

    return [
      `main`, `.@_xC2 _aA2 _gf3`, `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%`, [[
        `section`, `&@style>margin-top: 70px`, `.@cX3 _ss7`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3`, [[`span`, `.@a2X _aA6`, `~@Corrde Users Around You `]]], [
                `div`, `.@_QZg _gxM cX5`, [[`a`, `#@dev-active-next-ejs`, `.@_tX ProceedColor`, `&@href>/seek/`]]]]]]], [
            `div`,`.@_gxM _geQ _gMX`, [[
              `div`, `.@_miY _gMX`, [[
                `div`, `#@around-slide-ejs`, `.@_AZc`, [[
                  `div`, [[`div`, `.@_AZx ava`, [[`div`, `#@around-rotate-ejs`, `.@_AZs _gxM`, 
                    this.u_md5_y_scroll(A)]]]]]]]]]]]]]]], [
        `section`, `.@cX3 _ss7`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3`, [[`span`, `.@a2X _aA2`, `~@Portfolio stories`]]], [
                `div`, `.@_QZg _gxM cX5`, [[`a`, `@_tX SellColor`, `&@href>javascript:;`]]]]]]], [
            `div`,`.@_gxM _geQ _gMX`, [[
              `div`, `.@miY _gMX`, [[
                `div`, `#@stories-slide-ejs`, `.@_AZc`, [[
                  `div`, [[`div`, `.@_AZx ava`, [[`div`, `#@stories-rotate-ejs`, `.@_AZs _gxM`, this.stories_y_scroll(A)]]]]]]]]]]]]]]], [
        `section`, `.@cX3 _ss7 -Zz`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3`, [[`span`, `.@a2X _aA2`, `~@Popular`]]], [
                `div`, `.@_QZg _gxM cX5`, [[`a`, `#@dev-active-next-ejs`, `@_tX SellColor`, `&@href>javascript:;`]]]]]]], [
            `div`,`.@_gxM _geQ _gMX`, [[
              `div`, `.@miY _gMX`, [[
                `div`, `#@skilled-slide-ejs`, `.@_AZc`, [[
                  `div`, [[`div`, `.@_AZx ava`, [[`div`, `#@skilled-rotate-ejs`, `.@_AZs _gxM`, this.popular_y_scroll(A)]]]]]]]]]]]]]]], [
        `section`, `.@cX3 _ss7`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3`, [[`span`, `.@a2X _aA6`, `~@Popular Jobs`]]], [
                `div`, `.@_QZg _gxM cX5`, [[`a`, `.@_tX ProceedColor`, `&@href>/jobs/`]]]]]]], [
            `div`,`.@_gxM _geQ _gMX`, [[
              `div`, `.@_miY _gMX`, [[
                `div`, `#@jobs-slide`, `.@_AZc`, [[
                  `div`, [[`div`, `.@_AZx ava`, [[`div`, `#@jobs-rotate`, `.@_AZs _gxM`, 
                    this.jobs_y_scroll(A)]]]]]]]]]]]]]]], [
        `section`, `.@cX3 _ss7 _-Zz`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3`, [[`span`, `.@a2X _aA2`, `~@Jobs Around You`]]], [
                `div`, `.@_QZg _gxM cX5`, [[`a`, `#@dev-active-next-ejs`, `.@_tX SellColor`, `&@href>javascript:;`]]]]]]], [
            `div`,`.@_gxM _geQ _gMX`, [[
              `div`, `.@miY _gMX`, [[
                `div`, `#@jobs-slide-ejs`, `.@_AZc`, [[
                  `div`, [[`div`, `.@_AZx ava`, [[`div`, `#@jobs-rotate-ejs`, `.@_AZs _gxM`, [[
        `div`, `.@_X4- _rQ0 _gC0`, [[
          `div`, `.@_uxq`, [[`div`, `.@_`, [[`div`, `.@_`, [[`div`, `.@_gef`, [[
            `div`, `&@style>padding-bottom:50%`, `.@_g0z`, [[
              `img`, `&@style>height:100%`, `.@_aMz _gVm`, 
              `&@src>/gp/img-ssl/stories/0ca0b557661050b67678471ea12f2519.jpg`]]], [`div`, `.@_gVm`]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _xC3`, [[
                `div`, `.@_yZS _gMX _eYG gcQ`, [[
                `div`, `.@_eYG _ZSg`, [[
                  `div`, `.@_gxM _gMX`, [[`div`, `.@_eYG _ZSg`, [[`span`, `.@_tXx _aA6 _tXv`, `~@Quadcopter Electronics Dealer`]]]]], [
                  `div`, `.@_gxM _gMX`, [[
                    `span`, `.@_aA6 _tXv`, `~@Applicants must have prior job completions in corrde with adequate`]]]]]]], [
              `div`, `.@_yZS _gxM _gMX _geQ`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                `div`, `.@_eYG _gxM`, [[`div`, `.@aXs`, `~@9.7 Miles`], [
                  `div`, `.@_aXs _gxM`, [[
                    `span`, `.@-_tX CommentsGray`, `~@4.2 Miles`], [
                    `span`, `.@_a2X _axS _aA6`, `~@500`]]]]], [`div`, [[`span`, `.@_a2X`, `~@${this.log(new Date().valueOf() - 2383000)}`]]]]]]]]]]]]], [
        `div`, `.@_X4- _rQ0 _gC0`, [[
          `div`, `.@_uxq`, [[`div`, `.@_`, [[`div`, `.@_`, [[`div`, `.@_gef`, [[
            `div`, `&@style>padding-bottom:50%`, `.@_g0z`, [[
              `img`, `&@style>height:155.0859%`, `.@_aMz _gVm`, `&@src>/gp/img-ssl/stories/book-p77-3f4bf87d29a1541fcabe683f565d1dfe.png`]]], [`div`, `.@_gVm`]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _xC3`, [[
                `div`, `.@_yZS _gMX _eYG gcQ`, [[
                `div`, `.@_eYG _ZSg`, [[
                  `div`, `.@_gxM _gMX`, [[`div`, `.@_eYG _ZSg`, [[`span`, `.@_tXx _aA6 _tXv`, `~@Animation Creativity Director`]]]]], [
                  `div`, `.@_gxM _gMX`, [[
                    `span`, `.@_aA6 _tXv`, `~@Project 77 is an animation adapted from a graphic novel, we are seeking`]]]]]]], [
              `div`, `.@_yZS _gxM _gMX _geQ`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                `div`, `.@_eYG _gxM`, [[`div`, `.@aXs`, `~@3.7 Miles`], [
                  `div`, `.@_aXs _gxM`, [[
                    `span`, `.@-_tX CommentsGray`, `~@4.2 Miles`], [
                    `span`, `.@_a2X _axS _aA6`, `~@500`]]]]], [`div`, [[`span`, `.@_a2X`, `~@${this.log(new Date().valueOf() - 1383000)}`]]]]]]]]]]]]]]]]]]]]]]]]]]]]], [
        `section`, `.@cX3 _ss7 _-Zz`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3`, [[`span`, `.@a2X _aA2`, `~@Freelancers Around You`]]], [
                `div`, `.@_QZg _gxM cX5`, [[`a`, `#@dev-active-next-ejs`, `@_tX SellColor`, `&@href>javascript:;`]]]]]]], [
            `div`,`.@_gxM _geQ _gMX`, [[
              `div`, `.@miY _gMX`, [[
                `div`, `#@near-slide-ejs`, `.@_AZc`, [[
                  `div`, [[`div`, `.@_AZx ava`, [[`div`, `#@near-rotate-ejs`, `.@_AZs _gxM`, [[
        `div`, `.@_X4- _rQ0 _gC0`, [[
          `div`, `.@_uxq`, [[`div`, `.@_`, [[`div`, `.@_`, [[`div`, `.@_gef`, [[
            `div`, `&@style>padding-bottom:50%`, `.@_g0z`, [[
              `img`, `&@style>height:133.4%`, `.@_aMz _gVm`, 
              `&@src>/gp/img-ssl/stories/db913623-1000x667.jpg`]]], [`div`, `.@_gVm`]]]]]]], [
            `div`, `.@_yZS _gxM _geQ _gMX _xC3`, [[
              `div`, `.@_yZS _gxM _geQ`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                `div`, `.@_eYG _gxM`, [[
                    `div`, `.@_gM_a _agM _guZ`, `&@style>max-width: 450px`, [[
                      `a`, `.@_TX_a _utQ _atX _gMX`, `&@href>javascript:;`, `~@2.1 Stars`]]]]], [
                `div`, [[`span`, `.@_a2X _aA6`, `~@$ 27 / Hour`]]]]]]]]]]], [
          `div`, `.@_yZS _gxM _geQ _gMX _xC3`, [[
          `div`, `.@_yZS _gxM _geQ`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
            `div`, `.@_eYG`, [[
              `div`, `.@_QxM`, [[`span`, `.@tXx aA2`, `~@Mitchell Tenpenny`]]], [
              `div`, `.@_gxM _geQ`, [[
                `span`, `.@_aA6 a2X`, `~@4.2 Miles`]]]]], [`div`, [[`span`, `.@_cCq`, `&@style>width:40px;height:40px`, [[
            `img`, `.@_aWz`, `&@src>${this.ava(`M`)}`, `&@alt>avatar`]]]]]]]]]]]]], [
        `div`, `.@_X4- _rQ0 _gC0`, [[
          `div`, `.@_uxq`, [[`div`, `.@_`, [[`div`, `.@_`, [[`div`, `.@_gef`, [[
            `div`, `&@style>padding-bottom:50%`, `.@_g0z`, [[
              `img`, `&@style>height:111.6363636%`, `.@_aMz _gVm`, `&@src>/gp/img-ssl/stories/image-chromestore-55e0cd9562c0c56cb11d7cec6aac5ce6.jpg`]]], [`div`, `.@_gVm`]]]]]]], [
            `div`, `.@_yZS _gxM _geQ _gMX _xC3`, [[
              `div`, `.@_yZS _gxM _geQ`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                `div`, `.@_eYG _gxM`, [[
                    `div`, `.@_gM_a _agM _guZ`, `&@style>max-width: 450px`, [[
                      `a`, `.@_TX_a _utQ _atX _gMX`, `&@href>javascript:;`, `~@3.4 Stars`]]]]], [
                `div`, [[`span`, `.@_a2X _aA6`, `~@$ 19 / Hour`]]]]]]]]]]], [
          `div`, `.@_yZS _gxM _geQ _gMX _xC3`, [[
          `div`, `.@_yZS _gxM _geQ`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
            `div`, `.@_eYG`, [[
              `div`, `.@_QxM`, [[`span`, `.@tXx aA2`, `~@Ashley Munroe`]]], [
              `div`, `.@_gxM _geQ`, [[
                `span`, `.@_aA6 a2X`, `~@6.2 Miles`]]]]], [`div`, [[`span`, `.@_cCq`, `&@style>width:40px;height:40px`, [[
            `img`, `.@_aWz`, `&@src>${this.ava(`A`)}`, `&@alt>avatar`]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

  },

  rootXtra () {

    return [
      `section`, `.@_tY0 _aA2`, [[
        `div`, `.@_xC3`, [[
          `div`, `.@_gxM _yZS cX0 _aYS`, [[
            `div`, `.@_gM_a _agM _guZ`, [[
              `a`, ``, `.@_TX_a _atX qXS _utQ tXx`, `&@href>/seek/`, `~@COVID-19 Watch`]]]]], [
          `div`, `.@_gxQ _gxM _X2Y`, [[
            `div`, `.@_g17 _c3x`, [[
              `div`, `&@style>height:280px`, [[
                `div`, `.@_gMr _gfb`, `&@style>margin:14.75% 0 0 9%`], [
                  `div`, `.@_gMr _gfb`, `&@style>margin:33% 0 0 22.5%;animation-delay:1s`], [
                  `div`, `.@_gMr _gfb`, `&@style>margin:10.55% 0 0 44.75%;animation-delay:1.75s`], [
                    `div`, `.@_gMr _gfb`, `&@style>margin:23% 0 0 42%;animation-delay:2.5s`], [
                    `div`, `.@_gMr _gfb`, `&@style>margin:8% 0 0 71.5%;animation-delay:3.25s`], [
                    `div`, `.@_gMr _gfb`, `&@style>margin:39% 0 0 51%;animation-delay:4s`], [
                    `div`, `.@_gMr _gfb`, `&@style>margin:12.75% 0 0 79.25%;animation-delay:4.25s`], [
                    `div`, `.@_gMr _gfb`, `&@style>margin:37.6% 0 0 93%;animation-delay:5.5s`], [
                    `div`, `.@_gMr`, `&@style>margin:14.75% 0 0 9%`], [
                    `div`, `.@_gMr`, `&@style>margin:33% 0 0 22.5%;animation-delay:1s`], [
                    `div`, `.@_gMr`, `&@style>margin:10.55% 0 0 44.75%;animation-delay:1.75s`], [
                    `div`, `.@_gMr`, `&@style>margin:23% 0 0 42%;animation-delay:2.5s`], [
                    `div`, `.@_gMr`, `&@style>margin:8% 0 0 71.5%;animation-delay:3.25s`], [
                    `div`, `.@_gMr`, `&@style>margin:39% 0 0 51%;animation-delay:4s`], [
                    `div`, `.@_gMr`, `&@style>margin:12.75% 0 0 79.25%;animation-delay:4.25s`], [
                    `div`, `.@_gMr`, `&@style>margin:37.6% 0 0 93%;animation-delay:5.5s`]]]]], [
                `div`, `.@_ge0 _c3x`, [[
                  `div`, [[
                    `h1`, `.@_t22`, `~@Move, deliver & earn safely with COVID-19 monitor maps`], [
                    `p`, `.@_sZ2`, `~@As an augmentation to facilitate services through our live maps, we will be adding globally approved COVID-19 geodata
                      by regularly marking and tagging (in hazard level color codes) locations and zones with their 
                      relative COVID-19 distribution patterns.`], [
                    `div`, `.@_g00 _gxM _sZ2`, [[
                      `span`, `&@style>background-image:url(${config.reqs.check_svg})`, `.@_fg0`], [
                      `p`, `.@_aA6`, `~@Facilitate safe navigation to remote jobs and corrde delivery services.`]]], [
                    `div`, `.@_g00 _gxM _sZ2`, [[
                      `span`, `&@style>background-image:url(${config.reqs.check_svg})`, `.@_fg0`], [
                      `p`, `.@_aA6`, `~@Find safe & open restuarants or hotels for delivery requests.`]]]]]]]]]]]]];},

  feedControls () {

    let iconRules = [`RootGray`, `SearchColor`, `SellColor`, `MugColor`, `MailColor`];

    let to = [`/feed/`, `/seek/`, `/portfolio/`, `/mug/`, `/mail/`];

    let model = [];

    iconRules.forEach((rule, index) => {

      model[index] = [`div`, `.@_Ssa`, [[
        `a`, `.@-_tX ${rule}`, `&@href>${to[index]}`]]];
    });

    return [`div`, `.@_gV0 _gDa`, [[
      `div`, `.@_STa`, [[
        `div`, `.@_gDE`, [[`div`, `.@_gyQ`, model]]]]]]];
  },

  tailFeedControls () {

    let rules = [`RootGray`, `SearchColor`, `SellColor`, `MugColor`, `MailColor`];

    let to = [`/feed/`, `/seek/`, `/portfolio/`, `/mug/`, `/mail/`];

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

  feedTop (A) {

    return [`nav`, 
      `.@_uHC`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY`, [[
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `.@_tXa`, `&@href>/feed/`, `@corrde`], [
                `span`, `.@_tCc _pV4`, `~@feed`]]], [
              `div`, `.@_QZg _gxM _aA2`, [[`span`, `&@style>letter-spacing:0.75px`, `.@_axS _gV0 _tXx`, `~@${A.full}`], [
                `a`, `.@_axS _cCq _gS3`, `#@mug-ava`, `&@href>javascript:;`, [[
                  `img`, `#@mug-ava`, `.@_aWz`, `&@src>${A.ava}`, `&@alt>avatar`]]]]]]]]]]]]];
  },

  md5Alerts (Obj) {

    let alerts = [
      `div`, `#@ava-obj-ejs`, `.@_cX3`, [[
        `div`, `&@style>padding:24px 0`, `.@_gxQ`, [[
        `span`, `~@You seem to have no visual identity, 
          please upload a photo capturing your front profile clearly.`]]], [
          `div`, `.@_gxQ`, `&@style>padding: 0 0 24px`, [[
        `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@place-devs-ava-ejs`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@upload photo`]]]]]]];

    let md5Alerts = [
      `section`, `&@style>margin-top: 70px`, `.@_ss7 _aA2`, [[
        `div`, `.@_sZ2 _uZM`, [[`div`, `.@_cX3 uZM`, [[
          `div`, `.@_yZS _gxM _geQ _gMX _uZM _cX0`, [[
            `div`, `.@_`, [[`span`, `&@style>letter-spacing:0.75px`, `.@_tXx`, `~@Alerts`]]], [
            `div`, `.@_QZg _gxM`, []]]], [`div`, [alerts]]]]]]]]

    if (!Obj.ava_alert) md5Alerts = [];

    return md5Alerts;
  },

  iniStories () {

    return [`div`, `.@_cX3`, [[
      `div`, `&@style>padding:24px 0`, `.@_gxQ`, [[
        `span`, `.@_tXx _uHg`, `~@Advertise Your Products & Store Portfolio`], [
        `div`, `.@_gyQ`, [[
          `span`, `.@_Qtx`, `&@style>padding:24px 0`, `~@Post promotional photos of your best and top rated products for your portfolio identity.`]]], [
          `div`, `.@_gxQ`, `&@style>padding: 0 0 24px`, [[
        `div`, `.@_gM_a _agM _guZ`, [[`a`, `@place-devs-ava-ejs`, `.@_TX_a _atX qXS _utQ`, `&@href>/portfolio/`, `~@Get Started`]]]]]]]]]
  },

  stories_y_scroll (A) {

    let Obj = A.polygs;

    let stories_y_scroll = [];

    Obj.forEach(md5 => {

      let plane_x = ``;

      let plane_y = `200`;

      if (md5.img[0].img_2d[1] < md5.img[0].img_2d[0]) {

        plane_y = (md5.img[0].img_2d[1]/(md5.img[0].img_2d[0]/2)*100);

        if (md5.img[0].img_2d[1] < md5.img[0].img_2d[0]/2) {

          plane_y = 100;
          plane_x = `width:${((md5.img[0].img_2d[0]/2)/(md5.img[0].img_2d[1])*100)}%;`;
        }
      }

      if (md5.img[0].img_2d[1] > md5.img[0].img_2d[0]) plane_y = md5.img[0].img_2d[1]/(md5.img[0].img_2d[0]/2)*100;

      stories_y_scroll[Obj.indexOf(md5)] = [
        `div`, `.@_X4- _rQ0 _gC0`, [[
          `div`, `.@_uxq`, [[`div`, `.@_`, [[`div`, `.@_`, [[`div`, `.@_gef`, [[
            `div`, `&@style>padding-bottom:50%`, `.@_g0z`, [[
              `img`, `&@style>${plane_x}height:${plane_y}%`, `.@_aMz _gVm`, 
              `&@src>/${md5.img[0].src}`]]], [`div`, `.@_gVm`]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _xC3`, [[
              `div`, `.@_yZS _gMX _eYG gcQ`, [[
                `div`, `.@_eYG _ZSg`, [[
                  `div`, `.@_gxM _gMX`, [[`div`, `.@_eYG _ZSg`, [[`a`, `&@href>/portfolio/${md5.log_md5}`, `.@_tXx _aA6 _tXv`, `~@${md5.text}`]]]]], [
                  `div`, `.@_ZSg _gxM _eYG`, [[`span`, `.@_aA6 _tXv`, `~@${md5.seen.length} views`]]]]]]], [
              `div`, `.@_yZS _gxM _geQ _gMX`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                `div`, `.@_eYG _gxM`, [[
                  `div`, `.@aXs _gxM`, [[`a`, `.@-_tX HeartsGray`, `&@href>/portfolio/${md5.log_md5}`], [`span`, `.@_a2X _axS _aA6`, `~@${md5.mail2.length}`]]], [
                  `div`, `.@_aXs _gxM`, [[`a`, `.@-_tX CommentsGray`, `&@href>/portfolio/${md5.log_md5}`], [`span`, `.@_a2X _axS _aA6`, `~@${md5.mail.length}`]]]]], [
                `div`, [[`span`, `.@_a2X`, `~@${this.log(md5.log_secs)}`]]]]]]]]]]], [
          `div`, `.@_yZS _gxM _geQ _gMX _xC3`, [[
            `div`, `.@_yZS _gxM _geQ`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
              `div`, `.@_eYG`, [[
                `div`, `.@_QxM`, [[`a`, `.@tXx aA2`, `~@${md5.full}`, `&@href>/mug/${md5.u_md5}/`]]], [
                `div`, `.@_gxM _geQ _-Zz`, [[`span`, `.@_aA6 a2X`, `~@4.2 Miles`]]]]], [
              `div`, [[`span`, `.@_cCq`, `&@style>width:40px;height:40px`, [[`img`, `.@_aWz`, `&@src>${md5.ava}`, `&@alt>avatar`]]]]]]]]]]]]];
    })

    return stories_y_scroll;
  },

  popular_y_scroll (A) {

    let Obj = A.md5;

    Obj.sort((a,b) => {return b.reqs_per_polyg - a.reqs_per_polyg})

    let popular_y_scroll = [];

    Obj.forEach(md5 => {

      let plane_x = ``;

      let plane_y = `200`;

      if (md5.img[0].img_2d[1] < md5.img[0].img_2d[0]) {

        plane_y = (md5.img[0].img_2d[1]/(md5.img[0].img_2d[0]/2)*100);

        if (md5.img[0].img_2d[1] < md5.img[0].img_2d[0]/2) {

          plane_y = 100;
          plane_x = `width:${((md5.img[0].img_2d[0]/2)/(md5.img[0].img_2d[1])*100)}%;`;
        }
      }

      if (md5.img[0].img_2d[1] > md5.img[0].img_2d[0]) plane_y = md5.img[0].img_2d[1]/(md5.img[0].img_2d[0]/2)*100;

      popular_y_scroll[Obj.indexOf(md5)] = [
        `div`, `.@_X4- _rQ0 _gC0`, [[
          `div`, `.@_uxq`, [[`div`, `.@_`, [[`div`, `.@_`, [[`div`, `.@_gef`, [[
            `div`, `&@style>padding-bottom:50%`, `.@_g0z`, [[
              `img`, `&@style>${plane_x}height:${plane_y}%`, `.@_aMz _gVm`, 
              `&@src>/${md5.polygs_cover_img}`]]], [`div`, `.@_gVm`]]]]]]], [
            `div`, `.@_yZS _gxM _geQ _gMX _xC3`, [[
              `div`, `.@_yZS _gxM _geQ`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                `div`, `.@eYG _gxM _geQ`, [[
                  `p`, `.@_aA6`, `~@${md5.reqs_per_polyg}`],
                  this.reqs_per_polyg(md5.reqs_per_polyg)]], [
                `div`, [[`span`, `.@_a2X _aA6`, `@$ 9 / Hour`]]]]]]]]]]], [
          `div`, `.@_yZS _gxM _geQ _gMX _xC3`, [[
            `div`, `.@_yZS _gxM _geQ`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
              `div`, `.@_eYG`, [[
                `div`, `.@_QxM`, [[`a`, `.@tXx aA2`, `~@${md5.full}`, `&@href>/mug/${md5.sum}/`]]], [
                `div`, `.@_gxM _geQ _-Zz`, [[`span`, `.@_aA6 a2X`, `~@4.2 Miles`]]]]], [
              `div`, [[`span`, `.@_cCq`, `&@style>width:40px;height:40px`, [[`img`, `.@_aWz`, `&@src>${md5.ava}`, `&@alt>avatar`]]]]]]]]]]]]];
    })

    return popular_y_scroll;
  }, 

  pfolioTop (A) {

    return [`nav`, 
      `.@_uHC`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY`, [[
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `.@_tXa`, `&@href>/feed/`, `@corrde`], [
                `span`, `.@_tCc _pV4`, `~@portfolio`]]], [
              `div`, `#@hide-pfolio-ava`, `.@_QZg _gxM _aA2`, [[`span`, `&@style>letter-spacing:0.75px`, `.@_axS _gV0 _tXx`, `~@${A.full}`], [
                `a`, `.@_axS _cCq _gS3`, `#@mug-ava`, `&@href>javascript:;`, [[
                  `img`, `#@mug-ava`, `.@_aWz`, `&@src>${A.ava}`, `&@alt>avatar`]]]]], [
              `div`, `#@hide-pfolio-img`, `.@_QZg _-Zz`, [[
                `div`, `@_gM_a _agM _guZ gMX`, `&@style>max-width: 450px`, [[
                  `label`, `.@_gM_a _agM _guZ gMX`, `&@for>file`, `#@add-pfolio-img`, [[
                    `a`, `&@for>file`, `.@_TX_a _atX _utQ _gMX`, `#@add-pfolio-img`, `@href>#add-pfolio-img`, `~@Add Photo`]]]]], 
                this.inputFile()]]]]]]]]]];
  },

  listServices () {

    let services_ = [ 
      [`Data Science & Analytics`, [`A/B Testing`, `Data Visualization`, `Data Extraction`, `Data Mining & Extraction`, `Machine Learning`, `Quantitative Analysis`]],
      [`Design & Creative`, [`Animation`, `Art & Illustration`, `Audio Production`, `Branding & Strategy`, `Graphics & Design`, `Motion Graphics`, `Photography`, `Presentations`, `Video Production`, `Voice Talent`]],
      [`Engineering & Architecture`, [`3D Modeling & CAD`, `Architecture`, `Chemical Engineering`, `Civil & Structural Engineering`, `Contract Manufacturing`, `Electrical Engineering`, `Interior Design`, `Mechanical Engineering`, `Product Design`]],
      [`Fashion & Beauty`, [`Hair-styling`, `Make-up`, `Pedicure`]], 
      [`Fitness & Health`, [`Gym Fitness`, `Masseuse`, `Yoga`]], 
      [`Home & Housekeeping`, [`Cleaning`, `Furniture`, `Home Painting`, `Landscaping`, `Plumbing`, `Wash & Fold`]], 
      [`Sales & Marketing`, [`Display Advertising`, `Email & Marketing Automation`, `Lead Generation`, `Marketing Strategy`, `Public Relations`, `SEM - Search Engine Marketing`, `SEO - Search Engine Optimisation`, `Social Media Marketing`, `Telemarketing & Telesales`]], 
      [`Tourism`, [`Tour Guiding`]], 
      [`Web Mobile & Software Dev`, [`Desktop Software Development`, `Game Development`, `Mobile Development`, `Product Management`, `QA & Testing`, `Scripts & Utilities`, `Web Development`, `Web & Mobile Design`]],
      [`Writing`, [`Academic Writing Research`, `Article & Blog`, `Copyrighting`, `Creative Writing`, `Editing & Proofreading`, `Grant Writing`, `Resumes & Cover Letters`, `Technical writing`, `Web Content`]]];

    let services = [
      [
        `Body & Beauty Products`, [
          `Perfumes & Deodarant`,
          `Hair Product`]],
      [
        `Clothing & Accessories`, [
          `Bags`,
          `Belts`,
          `Dresses`,
          `Head Wear`,
          `Jackets`,
          `Optics & Eyewear`,
          `Pants`,
          `Shirts & Tops`, 
          `Shoes`,
          `Wallets`]],
      [
        `Food & Kitchen`, [
          `Drinks & Beverages`,
          `Pastries`]],
      [
        `Furniture`, [
          `Beds`,
          `Chairs`,
          `Couches`,
          `Kitchen Furniture`,
          `Lounge Chairs`,
          `Office Chairs`,
          `Tables & Nightstands`]],
      [
        `Gadgets & Electronics`, [
          `Ear Wear`,
          `Computing`,
          `Gaming`, 
          `Phones`,
          `UAVs`, 
          `Watches`,
          `Wearables`]], 
      [
        `Sports`, [
          `Cycling`]]]

    let listServices = [];

    services.forEach((field, e) => {

      let service = []

      field[1].forEach((role, e2) => {

        service[e2] = [`div`, `.@xX4 _tXv _c3`, [[
          `label`, `.@tXv _xQz`, `&@role>radio`, [[
            `input`, `&@type>radio`, `#@service-ejs`, `&@value>${field[1][e2]}`, `&@name>service-ejs`], [
              `span`, `.@_tCw _aA2 _tXx`, `~@${field[1][e2]}`]]]]];
      });

      listServices[e] = [
        `div`, `#@field`, [[
          `div`, `.@_yZS _gxM geQ gMX _uZM`, [[
            `label`, `.@_tXv`, `&@role>radio`, [[
              `input`, `&@for>${e}`, `&@type>radio`, `#@field-ejs`, `&@value>${field[0]}`, `&@name>field-ejs`], [
              `span`, `.@_tCw aA2 _tXx`, `~@${field[0]}`]]]]], [
          `div`, `.@_-Zz`, `&@field>${e}`, `#@service`, /*roles*/ [[
            `div`,`.@_gxM _geQ _gMX`, [[
              `div`, `.@_miY _gMX`, [[
                `div`, `#@service-slide-ejs`, `.@_AZc`, `&@style>padding: 32px 14px`, [[
                  `div`, [[`div`, `.@_AZx ava`, [[`div`, `#@service-rotate-ejs`, `.@_AZs _gxM`, service]]]]]]]]]]]]]]]
    });

    return [`div`, `.@xC3`, listServices];
  },

  createStory (A) {

    return [`span`, `&@style>overflow:hidden`, `#@root`, [
      this.feedControls(), [
      `main`, `.@_xC2 _aA2 xC3`, `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;background:#f3f4f7`, [[
        `section`, `&@style>margin: 70px 0`, `.@_ss7`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@xC3`, [[
              `div`, `.@_yZS _gxM _geQ _eYG _uZM`, [[
                `div`,`.@_gxM _xC3`, [[`span`, `.@a2X _aA2`, `~@Select Your Service`]]]]]]], this.listServices()]], [
          `div`, `.@_-Zz _aGX`, [[
          `div`, `.@_uxq`, [[`div`, `.@_`, [[`div`, `.@_`, [[`div`, `.@_gef`, [[
            `div`, `&@style>padding-bottom:60%`, `.@_g0z`, [[
              `img`, `.@_aMz _gVm`, 
              `&@src>`]]], [`div`, `.@_gVm`]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _xC3`, [[
                `div`, `.@_yZS _gMX _eYG _uZM`, [[
                `div`, `.@_eYG _ZSg`, [[
                  `div`, `.@_aXZ uZM`, [[
                    `div`, `.@_g00 _gxM _yZS`, [[
                      `span`, `&@style>background-image:url(${config.reqs.check_svg})`, `.@_fg0`], [
                      `p`, `.@_aA6`, `~@Art & Decor`]]], [
                    `div`, `.@_g00 _gxM _yZS`, [[
                      `span`, `&@style>background-image:url(${config.reqs.check_svg})`, `.@_fg0`], [
                      `p`, `.@_aA6`, `~@Interior Design`]]]]], [
                  `div`, `.@_gMX`, [[
                    `div`, `.@_yZS _gxM _geQ _gMX`, [[
                      `textarea`, `&@style>background: none`, `#@add-pfolio-text`, `.@-_tyq _aA2`, `&@autocomplete>off`, `&@placeholder>Write something about your post`]]]]]]]]], [
                        `div`, `.@_gcQ _aXZ sZ2`, [ [
                          `div`, `.@_eYG _geQ _aA2`, [[`span`, `.@_tXx`, `~@`]]], [
                          `div`, `.@_QZg _gMz`, [[
                          `div`, `.@_axS`, [[
                            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@add-pfolio`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Send`]]]]]]]]]]]]]]]]]]]]];
  },

  iconsStory (A) {

    let rules = [`CommentsGray`, `HeartsGray`, `ArchiveGray`];

    let placer = [`start-pfolio-mail`, `start-mail2`, `save-story`];

    let tail = [];

    rules.forEach((rule, e) => {

      tail[e] = [
        `div`, `.@_geQ _gMX`, [[
          `a`, `#@${placer[e]}`, `.@-_tX ${rule}`, `&@href>javascript:;`]]];
    });

    return tail;
  },

  storyMail (A, B) {

    let storyMail = [];

    A.sort((a, b) => {return b.log_secs - a.log_secs})

    A.forEach((Obj) => {

      storyMail[A.indexOf(Obj)] = [
        `div`, `.@ZSg _yZS _eYG _gcQ _uZM`, [[`span`, `.@_cCq`, `&@style>width:40px;height:40px`, [[
          `img`, `.@_aWz`, `&@src>${B[Obj.u_md5].ava}`, `&@alt>avatar`]]], [
          `div`, `.@_eYG`, [[
            `div`, `.@_gxM _gMX`, [[`div`, `.@_eYG _ZSg`, [[`a`, `.@tXx aA2 _tXv`, `~@${B[Obj.u_md5].full}`, `&@href>/mug/${Obj.u_md5}/`]]], [
              `div`, `.@_QZg _gxM`, [[`span`, `.@_a2X _tXv`, `~@${this.log(Obj.log_secs)}`]]]]], [
                  `div`, `.@_gxM _geQ`, [[
                    `span`, `.@_aA6 a2X`, `~@${Obj.mail}`]]]]]]];
    });

    return storyMail;
  },

  readStory (A, B) {

    return [`span`, `&@style>overflow:hidden`, `#@root`, [
      this.feedControls(), [
      `main`, `.@_xC2 _aA2 xC3`, `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;background:#f3f4f7`, [[
        `section`, `&@style>margin: 0 0 70px`, `.@_ss7`, [[`div`, [[`div`, `.@_aGX`, [[
          `div`, `.@_yZS _gxM _geQ _gMX _xC3`, [[
            `div`, `.@_yZS _gxM _geQ`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
              `div`, `.@_eYG`, [[
                `div`, `.@_QxM`, [[`a`, `.@tXx aA2`, `~@${A.full}`, `&@href>/mug/${A.u_md5}/`]]], [
                `div`, `.@_gxM _geQ`, [[`span`, `.@_aA6 _a2X`, `~@${this.log(A.log_secs)}`]]]]], [
              `div`, [[`span`, `.@_cCq`, `&@style>width:40px;height:40px`, [[`img`, `.@_aWz`, `&@src>${A.ava}`, `&@alt>avatar`]]]]]]]]]]], [
          `div`, `.@_uxq`, [[`div`, `.@_`, [[`div`, `.@_`, [[`div`, `.@_gef`, [[
            `div`, `&@style>padding-bottom:${A.img[0].img_2d[1]/A.img[0].img_2d[0]*100}%`, `.@_g0z`, [[
              `img`, `.@_aMz _gVm`, 
              `&@src>/${A.img[0].src}`]]], [`div`, `.@_gVm`]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
                `div`, `.@yZS _gMX _eYG _xC3`, [[
                `div`, `.@_eYG _ZSg`, [[
                  `div`, `.@_aXZ uZM`, [[
                    `div`, `.@_g00 _gxM _yZS`, [[
                      `span`, `&@style>background-image:url(${config.reqs.check_svg})`, `.@_fg0`], [
                      `p`, `.@_aA6`, `~@${A.tag[0]}`]]], [
                    `div`, `.@_g00 _gxM _yZS`, [[
                      `span`, `&@style>background-image:url(${config.reqs.check_svg})`, `.@_fg0`], [
                      `p`, `.@_aA6`, `~@${A.tag[1]}`]]]]]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
                `div`, `.@yZS _gMX _eYG _xC3`, [[
                `div`, `.@_eYG _gxM`, [[`div`, `.@aXs _gxM`, [[
                    `span`, `.@_tXx`, `~@${A.seen.length}`], [
                    `span`, `.@a2X _axS _aA6`, `~@Views`]]], [
                  `div`, `.@_aXs _gxM`, [[
                    `span`, `#@mail`, `.@_tXx`, `~@${A.mail.length}`], [
                    `span`, `.@_axS _aA6`, `~@Comments`]]], [
                  `div`, `.@_aXs _gxM`, [[
                    `span`, `#@mail2`, `.@_tXx`, `~@${A.mail2.length}`], [
                    `span`, `.@_axS _aA6`, `~@Likes`]]]]]]]]], [
            `div`, `#@hide-pfolio-icons`, `.@_yZS gxM _geQ gMX _uZM`, [[
                `div`, `.@yZS _gMX _eYG _xC3`, this.iconsStory(A)]]], [
            `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
                `div`, `.@yZS gMX _eYG _xC3`, [[`span`, `.@yZS`, `~@${A.text}`]]]]], [
            `div`,`#@hide-pfolio-mail`, `.@-Zz _geQ _uZM`, [[
                `div`, `.@yZS gMX _eYG _xC3`, [[
                  `div`, `.@_gMX -Zz`, [[
                    `div`, `.@_yZS _gxM _geQ _gMX`, [[
                      `textarea`, `&@style>background: none`, `#@pfolio-mail`, `.@-_tyq _aA2`, `&@autocomplete>off`, `&@placeholder>Write a comment about this post`]]]]], [
                        `div`, `.@_gcQ _aXZ -Zz`, [ [
                          `div`, `.@_eYG _geQ _aA2`, [[`span`, `.@_tXx`, `~@`]]], [
                          `div`, `.@_QZg _gMz`, [[
                          `div`, `.@_axS`, [[
                            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@add-pfolio-mail`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Send`]]]]]]]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX uZM _sZ2`, [[
                `div`, `#@polyg-mail`, `.@_sZ2 _aXZ _xC3`, this.storyMail(A.mail, B)]]]]]]]]]]]]]]];
  },

  seek () {

    return [`span`, `&@style>overflow:hidden`, `#@root`, [
      this.feedControls(), [
      `main`, `.@_xC2 _aA2 xC3`, `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;background:#f3f4f7`, [[
        `section`, `#@map`, [[`svg`, `.@_aXZ _gmg`]]]]], [
      `section`, `&@style>position:absolute;top:0;right:0;z-index:2`, [[
        `div`, [[`div`, `.@geQ _sQ0`, [[`a`, `.@-_tX FilterColor`, `&@href>javascript:;`, `&@style>width: 20px; height: 20px`]]]]]]]]]
  },

  seekModal () {

    return [
      `div`, `&@style>letter-spacing:0.75px;line-height:1.6rem`, [[
        `div`, `.@_gcQ _aXZ sZ2`, [ [
          `div`, `.@_eYG _geQ _aA2`, [[`span`, `.@_tXx`, `~@Enable Location Settings`]]]]], [
        `div`, `.@_aXY _XsQ _aA2`, `&@style>max-height: calc(100vh - 170px);`, [[`div`, `.@_cX3`, [[
      `div`, `&@style>padding:24px 0`, `.@_gxQ`, [[
        `span`, `.@_tXx _uHg`, `~@Turn on your location`], [
        `div`, `.@_gyQ`, [[
          `span`, `.@_Qtx`, `&@style>padding:24px 0`, `~@Go to the location settings panel on your device and allow location positioning`]]], [
          `div`, `.@_gxQ`, `&@style>padding: 0 0 24px`, [[
        `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@locate`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Enable now`]]]]]]]]]]]]]
  },

  slide_md5 (A) {

    let Obj = A.md5;

    Obj.sort((a,b) => {return b.reqs_per_polyg - a.reqs_per_polyg})

    let popular_y_scroll = [];

    Obj.forEach(md5 => {

      let plane_x = ``;

      let plane_y = `200`;

      if (md5.img[0].img_2d[1] < md5.img[0].img_2d[0]) {

        plane_y = (md5.img[0].img_2d[1]/(md5.img[0].img_2d[0]/2)*100);

        if (md5.img[0].img_2d[1] < md5.img[0].img_2d[0]/2) {

          plane_y = 100;
          plane_x = `width:${((md5.img[0].img_2d[0]/2)/(md5.img[0].img_2d[1])*100)}%;`;
        }
      }

      if (md5.img[0].img_2d[1] > md5.img[0].img_2d[0]) plane_y = md5.img[0].img_2d[1]/(md5.img[0].img_2d[0]/2)*100;

      popular_y_scroll[Obj.indexOf(md5)] = [
        `div`, `.@_X4- _rQ0 _gC0`, [[
          `div`, `.@_uxq`, [[`div`, `.@_`, [[`div`, `.@_`, [[`div`, `.@_gef`, [[
            `div`, `&@style>padding-bottom:50%`, `.@_g0z`, [[
              `img`, `&@style>${plane_x}height:${plane_y}%`, `.@_aMz _gVm`, 
              `&@src>/${md5.polygs_cover_img}`]]], [`div`, `.@_gVm`]]]]]]], [
            `div`, `.@_yZS _gxM _geQ _gMX _xC3 _-Zz`, [[
              `div`, `.@_yZS _gxM _geQ`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                `div`, `.@_eYG _gxM`, [[
                    `div`, `.@_gM_a _agM _guZ`, `&@style>max-width: 450px`, [[
                      `a`, `.@_TX_a _utQ _atX _gMX`, `&@href>javascript:;`, `~@${md5.reqs_per_polyg} Stars`]]]]], [
                `div`, [[`span`, `.@_a2X _aA6`, `@$ 9 / Hour`]]]]]]]]]]], [
          `div`, `.@_yZS _gxM _geQ _gMX _xC3 _f47`, [[
            `div`, `.@_yZS _gxM _geQ`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
              `div`, `.@_eYG`, [[
                `div`, `.@_QxM`, [[`span`, `.@tXx aA2`, `~@${md5.full}`]]], [
                `div`, `.@_gxM _geQ _-Zz`, [[`span`, `.@_aA6 a2X`, `~@4.2 Miles`]]]]], [
              `div`, [[`span`, `.@_cCq`, `&@style>width:40px;height:40px`, [[`img`, `.@_aWz`, `&@src>${md5.ava}`, `&@alt>avatar`]]]]]]]]]]]]];
    })

    return [
      `div`, `&@style>max-width:100%`, `.@_gHm _aGX _-gs _t00 _aA2 _gVc _-Zz`, [[
        `div`, `.@_xGy`, [[
        `section`, `.@cX3 _ss7 -Zz`, [[
          `div`, `.@sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3`, [[`span`, `.@a2X _aA2`, `~@Around You`]]], [
                `div`, `.@_QZg _gxM cX5`, [[`a`, `#@dev-active-next-ejs`, `@_tX SellColor`, `&@href>javascript:;`]]]]]]], [
            `div`,`.@_gxM _geQ _gMX`, [[
              `div`, `.@miY _gMX`, [[
                `div`, `#@skilled-slide-ejs`, `.@_AZc`, [[
                  `div`, [[`div`, `.@_AZx ava`, [[`div`, `#@skilled-rotate-ejs`, `.@_AZs _gxM`, popular_y_scroll]]]]]]]]]]]]]]]]]]];
  }, 

  readMugTop () {

    let Settings = [`Add Portfolio Story`, `Create Vendor Service`, `Change Profile Picture`]//, `Edit Profile & Portfolio`, `Sign Out`]

    let Attr = [`portfolio-story`, `vendor`, `self`]//, `edit-mug`, `signout`];

    let Href = [`/portfolio/`, `javascript:;`, `javascript:;`]//, `javascript:;`, `javascript:;`];

    return [`nav`, `.@_uHC _t00`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY`, [[
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `.@_tXa`, `&@href>/feed/`, `@corrde`], [
                `span`, `.@_tCc _pV4`, `~@profile`]]], [
              `div`, `.@_QZg _-Zz`, []],
              this.inModal({id: `Settings`, in: this.aPoolModal(Settings, Attr, Href)})]]]]]]]];
  },

  readMug (A, B, C) {

    let mug = ``;

    let Settings = [];

    let Retail = [];

    if (A.vServices.length > 0) {

      Retail = [
        `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
          `div`, `.@yZS _gMX _eYG _xC3`, [[
            `div`, `.@eYG _ZSg _gxM _geQ`, this.listvServicesSliced(A.vServices, C)]]]]]
    }

    if (B !== false) {

      let Attr = [`to-msg`, `Message`];

      if (A.sum === B) {

        mug = `#@self`;

        Attr = [`to-settings`, `Settings`]
      }

      Settings = [
      `div`, `.@_QZg`, [[
        `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@${Attr[0]}`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@${Attr[1]}`]]]]];
    }

    return [`main`, `&@style>overflow:hidden`, `#@gM`, [
      this.feedControls(), [
      `main`, `.@_xC2 _aA2 xC3`, `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;background:#f3f4f7`, [[
        `section`, `&@style>margin: 70px 0 0`, `.@_ss7`, [[`div`, [[`div`, `.@_aGX`, [[
          `section`, `.@_gvQ _pQ0`, `&@style>padding: 15px 15px 0;margin: 0 0 10px`, [[
              `div`, `.@_yZS _gxM _geQ`, [[
                `div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                  `a`, mug, `.@_cCq`, `&@style>width:60px;height:60px`, `&@href>javascript:;`, [[
                    `img`, `#@mug-ava`, `.@_aWz`, `&@src>${A.ava}`, `&@alt>avatar`]]], [
                  `div`, `.@_eYG`, [[
                    `div`, `.@_QxM`, [[`span`, `.@_tXx aA2`, `~@${A.full}`]]], [
                    `div`, `.@_gxM _geQ _gMX`, [[`div`, `.@_eYG`], Settings]]]]]]]], [
              `div`, `.@azX- _gMX gp0 _sZ2`, `&@style>margin-top: 20px`, [[
                `div`, `.@-Zz _gxM _gMX`, [[
                  `div`, `.@_gMX gcQ`, [[
                    `div`, `.@_gM_a _agM _guZ _gMX`, `&@style>max-width: 450px`, [[
                      `a`, `.@_TX_a _atX _utQ _gMX`, `#@vendor`, `&@href>javascript:;`, `~@Create Vendor Service`]]]]]]]]]]], [
          `section`, `.@_gvQ _pQ0`, `&@style>margin: 0 0 10px`, [[
            `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
                `div`, `.@yZS _gMX _eYG _xC3`, [[
                `div`, `.@_eYG _ZSg`, [[
                  `div`, `.@_aXZ uZM`, [[
                    `div`, `.@g00 _gxM _yZS _gxQ`, [[
                      `p`, `.@_aA6`, `~@${A.reqs_per_polyg}`], this.reqs_per_polyg(A.reqs_per_polyg)]], [
                    `div`, `.@_g00 _gxM yZS`, [[
                      `span`, `.@_a2X`, `~@${A.polygs_mail} Reviews`]]]]]]]]]]], Retail, [
            `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
                `div`, `.@yZS _gMX _eYG _xC3`, [[
                `div`, `.@eYG _ZSg _gxM _geQ`, this.polygs_audience(A.polygs_audience, C)]]]]], [
            `div`, `#@last_PJ`, `.@_yZS _geQ _uZM _-Zz`, [[
                `div`, `.@yZS _gMX _eYG _xC3`, [[
                `div`, `.@_eYG _ZSg`, [[
                  `div`, `.@_aXZ _gxM`, [[
                    `div`, `.@g00 _gxM yZS _geQ`, [[
                      `a`, `.@-_tX GeoGray`, `&@href>javascript:;`, `&@style>width:15px;height:15px;margin-right:8px`], [
                      `p`, `.@_aA2 _tXx`, `~@Kenya`]]], [
                    `div`, `.@_g00 _gxM _yZS _axS _-Zz`, [[
                      `span`, `&@style>background-image:url(${config.reqs.check_svg})`, `.@_fg0`], [
                      `p`, `.@_aA6`, `~@Oyugis`]]]]]]]]]]]]], /*this.mug_polygs(A, B, C)*/]]]]]],  this.polygs_slide(A, B, C)]]]]
  },

  reqs_per_polyg (reqs) {

    reqs = reqs.toString()

    if (reqs.indexOf(`.`) === -1) reqs += `.0`;

    let star = [1,2,3,4,5];

    let reqs_per_polyg = [];

    let deflt = `#ffab2e`;

    let dec = `#ffab2e`;

    star.forEach((e, Vtx) => {

      if (parseInt(reqs[0]) <= Vtx) {

        deflt = `#d7d8d9`

        dec = `#d7d8d9`
      }

      reqs_per_polyg[Vtx] = [`svg`, `.@_QgY`, `&@viewBox> 0 0 15 15`, [[
        `g`, `&@fill-rule>evenodd`, [[
          `path`, `&@fill>${deflt}`, `&@d>M10.925 14.302c.173.13.408.13.58-.002.174-.13.244-.362.175-.572
        l-1.323-4.296 3.435-2.456c.175-.13.25-.36.185-.572-.064-.212-.253-.357-.468-.36H9.275L7.96 1.754
        c-.064-.21-.21-.354-.46-.354-.14 0-1.027 3.53-.988 6.32.04 2.788.98 3.85.98 3.85l3.433 2.732z`], [
          `path`, `&@fill>${dec}`, `&@d>M7.5 1.4c-.25 0-.41.144-.474.354l-1.318 4.29H1.49
          c-.214.003-.403.148-.467.36-.065.212.01.442.185.572l3.42 2.463-1.307 4.286
          c-.066.21.004.44.176.572.172.13.407.132.58.003l3.42-2.734L7.5 1.4z`]]]]]
    })
  
    return [`span`, `.@_axS`, reqs_per_polyg];
  },

  polygs_audience (A, B) {

    //A.shuffle();

    A.slice(0, 10);

    let polygs_audience = [];

    A.forEach(U => {

      polygs_audience[A.indexOf(U)] = [
        `div`, `.@_aS0`, [[
          `span`, `.@_cCq`, `&@style>width:28px;height:28px`, [[`img`, `.@_aWz`, `&@src>${B[U].ava}`, `&@title>${B[U].full}`, `&@alt>avatar`]]]]]
    })

    return [[`div`, `.@_gxM`, polygs_audience], [`div`, `.@_QZg`, [[`span`, `.@_aA6`, `~@${A.length} Reviewers`]]]]
  },

  mug_polygs (A, B, C) {

    let mug_polygs = [];

    if (A.polygs.length === 0 && A.sum === B) mug_polygs = this.iniStories();

    else if (A.polygs.length > 0) {

      A.polygs.sort((a, b) => {return b.log_secs - a.log_secs})

      let polygs = [];

      A.polygs.forEach(P => {

        polygs[A.polygs.indexOf(P)] = [
          `article`, `&@style>margin: 0 0 10px`, [[`div`, `.@_aGX`, [[
          `div`, `.@_yZS _gxM _geQ _gMX _xC3`, [[
            `div`, `.@_yZS _gxM _geQ`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
              `div`, `.@_eYG`, [[
                `div`, `.@_QxM`, [[`a`, `.@tXx aA2`, `~@${P.full}`, `&@href>/mug/${P.u_md5}/`]]], [
                `div`, `.@_gxM _geQ`, [[`span`, `.@_aA6 _a2X`, `~@${this.log(P.log_secs)}`]]]]], [
              `div`, [[`span`, `.@_cCq`, `&@style>width:40px;height:40px`, [[`img`, `.@_aWz`, `&@src>${P.ava}`, `&@alt>avatar`]]]]]]]]]]], [
          `div`, `.@_uxq`, [[`div`, `.@_`, [[`div`, `.@_`, [[`div`, `.@_gef`, [[
            `div`, `&@style>padding-bottom:${P.img[0].img_2d[1]/P.img[0].img_2d[0]*100}%`, `.@_g0z`, [[
              `img`, `.@_aMz _gVm`, 
              `&@src>/${P.img[0].src}`]]], [`div`, `.@_gVm`]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
                `div`, `.@yZS _gMX _eYG _xC3`, [[
                `div`, `.@_eYG _ZSg`, [[
                  `div`, `.@_aXZ uZM`, [[
                    `div`, `.@_g00 _gxM _yZS`, [[
                      `span`, `&@style>background-image:url(${config.reqs.check_svg})`, `.@_fg0`], [
                      `p`, `.@_aA6`, `~@${P.tag[0]}`]]], [
                    `div`, `.@_g00 _gxM _yZS`, [[
                      `span`, `&@style>background-image:url(${config.reqs.check_svg})`, `.@_fg0`], [
                      `p`, `.@_aA6`, `~@${P.tag[1]}`]]]]]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
                `div`, `.@yZS _gMX _eYG _xC3`, [[
                `div`, `.@_eYG _gxM`, [[`div`, `.@aXs _gxM`, [[
                    `span`, `.@_tXx`, `~@${P.seen.length}`], [
                    `span`, `.@a2X _axS _aA6`, `~@Views`]]], [
                  `div`, `.@_aXs _gxM`, [[
                    `span`, `@mail`, `.@_tXx`, `~@${P.mail.length}`], [
                    `span`, `.@_axS _aA6`, `~@Comments`]]], [
                  `div`, `.@_aXs _gxM`, [[
                    `span`, `@mail2`, `.@_tXx`, `~@${P.mail2.length}`], [
                    `span`, `.@_axS _aA6`, `~@Likes`]]]]]]]]], this.iconVars(A, B, P), [
            `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
                `div`, `.@yZS gMX _eYG _xC3`, [[`span`, `.@yZS`, `~@${P.text}`]]]]], [
            `div`, `.@_yZS _geQ`, [[
                `div`, `@polyg-mail`, `.@_sZ2 _aXZ _xC3`, this.storyMail(P.mail, C)]]]]]]]]]
      });

      mug_polygs = [
          `section`, `.@gvQ pQ0`, `&@style>margin: 0 0 10px`, polygs]
    }

    return mug_polygs;
  },

  iconVars (A, B, C) {

    let iconVars = []

    if (B !== false) {

      let rules = [`CommentsGray`, `HeartsGray`, `ArchiveGray`];

      let placer = [`tart-pfolio-mail`, `tart-mail2`, `save-story`];

      let to = [`/portfolio/${C.log_md5}#start-pfolio-mail`, `/portfolio/${C.log_md5}#start-mail2`, `javascript:;`];

      let tail = [];

      if (C.mail2.indexOf(B) > -1) rules[1] = `HeartsColor`;

      rules.forEach((rule, e) => {

        tail[e] = [
          `div`, `.@_geQ _gMX`, [[
            `a`, `#@${placer[e]}`, `.@-_tX ${rule}`, `&@href>${to[e]}`]]];
      });

      iconVars = [
        `div`, `.@_yZS _geQ _uZM`, [[
          `div`, `.@_gMX _eYG _xC3`, tail]]]
    }

    return iconVars;
  },

  createJob (A) {

    return [`span`, `&@style>overflow:hidden`, `#@root`, [
      this.feedControls(), [
      `main`, `.@_xC2 _aA2 xC3`, `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;background:#f3f4f7`, [[
        `section`, `#@DOM`, `&@style>margin: 70px 0`, `.@_ss7 _-Zz`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@xC3`, [[
              `div`, `.@_yZS _gxM _geQ _eYG _uZM`, [[
                `div`,`.@_gxM _xC3`, [[`span`, `.@a2X _aA2`, `~@Choose field and Service`]]]]]]], this.listServices()]], [
          `div`, `.@_-Zz _aGX`, [[
          `div`, `.@_uxq`, [[`div`, `.@_`, [[`div`, `.@_`, [[`div`, `.@_gef`, [[
            `div`, `&@style>padding-bottom:60%`, `.@_g0z`, [[
              `img`, `.@_aMz _gVm`, 
              `&@src>`]]], [`div`, `.@_gVm`]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _xC3`, [[
              `div`, `.@_yZS _gMX _eYG _uZM`, [[
                `div`, `.@_eYG _ZSg`, [[
                  `div`, `.@_aXZ uZM`, [[
                    `div`, `.@_g00 _gxM _yZS`, [[
                      `span`, `&@style>background-image:url(${config.reqs.check_svg})`, `.@_fg0`], [
                      `p`, `.@_aA6`, `~@Art & Decor`]]], [
                    `div`, `.@_g00 _gxM _yZS`, [[
                      `span`, `&@style>background-image:url(${config.reqs.check_svg})`, `.@_fg0`], [
                      `p`, `.@_aA6`, `~@Interior Design`]]]]]]]]]]], [
              `div`, `.@_yZS gxM _geQ gMX _xC3`, [[
                `div`, `.@_yZS _gMX eYG uZM`, [[
                  `div`, `.@_UFA cS2 _gMX`, [[
                    `input`, `#@title`, `.@_RRD Ccs _aA2 _pVa`, `&@autocomplete>off`, `&@placeholder>Job Title`]]]]]]], [
              `div`, `.@_yZS _xC3`, [[
                `div`, `.@_yZS _gxM _uZM`, [[`div`, `.@gMX`, [this.labelRadioView([`Hourly`, `Fixed-Price`], `payrate`)]]]]]], [
              `div`, `.@_yZS gxM _geQ gMX _xC3`, [[
                `div`, `.@_yZS _gMX eYG uZM`, [[
                  `div`, `.@_UFA cS2 _gMX`, [[
                    `input`, `#@USD`, `.@_RRD Ccs _aA2 _pVa`, `&@autocomplete>off`, `&@placeholder>Amount in USD`]]]]]]], [
              `div`, `.@_yZS gxM _geQ gMX _xC3`, [[
                `div`, `.@_yZS _gMX eYG uZM`, [[
                  `div`, `.@_UFA cS2 _gMX`, [[
                    `input`, `#@duration`, `.@_RRD Ccs _aA2 _pVa`, `&@autocomplete>off`, `&@placeholder>Duration (in days)`]]]]]]], [
            `div`, `.@-Zz _geQ uZM`, [[
                `div`, `.@yZS gMX _eYG _xC3`, [[
                  `div`, `.@_gMX -Zz`, [[
                    `div`, `.@_yZS _gxM _geQ _gMX`, [[
                      `textarea`, `&@style>background: none`, `#@job-text`, `.@-_tyq _aA2`, `&@autocomplete>off`, `&@placeholder>Give a job description`]]]]], [
                        `div`, `.@_gcQ _aXZ -Zz`, [ [
                          `div`, `.@_eYG _geQ _aA2`, [[`span`, `.@_tXx`, `~@`]]], [
                          `div`, `.@_QZg _gMz`, [[
                          `div`, `.@_axS`, [[
                            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@add-job`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Create Job`]]]]]]]]]]]]] ]]]]]], [
        `section`, `#@position-alert`, `.@_-Zz`, [[
          `div`, `.@_cX3`, [[
            `div`, `&@style>padding:24px 0`, `.@_gxQ`, [[
              `span`, `.@_tXx _uHg`, `~@Turn on location settings`], [
              `div`, `.@_gyQ`, [[
                `span`, `.@_Qtx`, `&@style>padding:24px 0`, `~@You cannot create a job listing with your location off. Enable your location settings to proceed.`]]], [
              `div`, `.@_gxQ`, `&@style>padding: 0 0 24px`, [[
                `div`, `.@_gM_a _agM _guZ`, [[`a`, `.@_TX_a _atX qXS _utQ`, `&@href>/feed/`, `~@Go Back to Feed`]]]]]]]]]]], [
        `section`, `#@upload`, `.@_-Zz`, [[
          `div`, `.@_cX3`, [[
            `div`, `&@style>padding:24px 0`, `.@_gxQ`, [[
              `span`, `.@_tXx _uHg`, `~@Job cover photo`], [
              `div`, `.@_gyQ`, [[
                `span`, `.@_Qtx`, `&@style>padding:24px 0`, `~@Upload relevant cover photo for your listing.`]]], [
              `div`, `.@_gxQ`, `&@style>padding: 0 0 24px`, [[
                `div`, `@_gM_a _agM _guZ`, [[
                  `label`, `.@_gM_a _agM _guZ gMX`, `&@for>file`, `#@job-cover`, [[
                    `a`, `&@for>file`, `.@_TX_a _atX _utQ _gMX`, `#@job-cover`, `~@Add Photo`]]], this.inputFile()]]]]]]]]]]]]]];
  },

  jobs_y_scroll (A) {

    let Obj = A.jobs;

    let jobs_y_scroll = [];

    Obj.forEach(md5 => {

      let plane_x = ``;

      let plane_y = `200`;

      if (md5.img[0].img_2d[1] < md5.img[0].img_2d[0]) {

        plane_y = (md5.img[0].img_2d[1]/(md5.img[0].img_2d[0]/2)*100);

        if (md5.img[0].img_2d[1] < md5.img[0].img_2d[0]/2) {

          plane_y = 100;
          plane_x = `width:${((md5.img[0].img_2d[0]/2)/(md5.img[0].img_2d[1])*100)}%;`;
        }
      }

      if (md5.img[0].img_2d[1] > md5.img[0].img_2d[0]) plane_y = md5.img[0].img_2d[1]/(md5.img[0].img_2d[0]/2)*100;

      jobs_y_scroll[Obj.indexOf(md5)] = [
        `div`, `.@_X4- _rQ0 _gC0`, [[
          `div`, `.@_uxq`, [[`div`, `.@_`, [[`div`, `.@_`, [[`div`, `.@_gef`, [[
            `div`, `&@style>padding-bottom:50%`, `.@_g0z`, [[
              `img`, `&@style>${plane_x}height:${plane_y}%`, `.@_aMz _gVm`, 
              `&@src>/${md5.img[0].src}`]]], [`div`, `.@_gVm`]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _xC3`, [[
                `div`, `.@_yZS _gMX _eYG gcQ`, [[
                `div`, `.@_eYG _ZSg`, [[
                  `div`, `.@_gxM _gMX`, [[`div`, `.@_eYG _ZSg`, [[`a`, `&@href>/j/${md5.log_md5}/`, `.@_tXx _aA6 _tXv`, `~@${md5.title}`]]]]], [
                  `div`, `.@_gxM _gMX`, [[`a`, `&@href>/j/${md5.log_md5}/`, `.@_aA6 _tXv`, `~@${md5.text}`]]]]]]], [
              `div`, `.@_yZS _gxM _gMX _geQ`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                `div`, `.@eYG _gxM`, [[
                  `div`, `.@_gxM CYc`, [[
                    `div`, `.@axS`, [[
                      `div`, `.@_gM_a _agM _guZ`, [[
                        `a`, `.@_TX_a _atX _qXS _utQ`, `&@href>/j/${md5.log_md5}/`, `~@${md5.USD} USD | ${md5.USD_MODE}`]]]]]]]]], [
              `div`, `.@_QZg`, [[
                    `a`, `.@-_tX ProceedColor`, `~@job`, `&@href>/j/${md5.log_md5}/`]]]]]]], [
              `div`, `.@_yZS _gxM _gMX _geQ`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                `div`, `.@_eYG _gxM`, [[
                  `div`, `.@aXs -Zz`, [[`a`, `#@J_PJ`, `.@_tXx _aA2`, `~@${JSON.stringify(md5.geo)}`, `&@href>/maps/${md5.log_md5}/`]]], [
                  `div`, `.@_aXs _gxM`, [[
                    `a`, `.@-_tX CommentsGray`, `~@Applications`, `&@href>/j/${md5.log_md5}/`], [
                    `span`, `.@_a2X _axS _aA6`, `~@${md5.apps_mail.length}`]]]]], [
              `div`, [[`span`, `.@_a2X`, `~@${this.log(md5.log_secs)}`]]]]]]]]]]]]]
    })

    return jobs_y_scroll;
  }, 

  readJobTop (J) {

    return [`nav`, 
      `.@_uHC`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY`, [[
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `.@_tXa`, `&@href>/feed/`, `@corrde`], [
                `span`, `.@_tCc _pV4`, `~@Jobs`]]], [
              `div`, `.@_QZg`, [[
                `div`, `.@_y4x`, [[
                  `a`, `&@role>geo`, `.@-_tX GeoGray`, `&@href>/maps/${J.log_md5}/`, `~@job-geo`]]]]]]]]]]]]];
  },

  readJob (A, B, C) {

    let u_md5_to = [];

    let apps_mail = [];

    if (A.apps_mail.length > 0) {

      apps_mail = [
        `section`, `.@_gvQ _pQ0`, `&@style>margin: 0 0 10px`, [[
          `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
            `div`, `.@yZS _gMX _eYG _xC3`, [[
              `div`, `.@eYG _ZSg _gxM _geQ`, [[
                `span`, `.@_a2X`, `~@${A.apps_mail.length} Applicants`], [
                `div`, `.@_QZg _-Zz`, [[
                  `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@applicants`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Show All`]]]]]]]]]]], [
          `div`, this.listApplicants(A,B,C)]]]
    }

    if (B !== false) {

      if (B !== A.u_md5) {

        let placer = [`to-apps`, `Submit Application`];

        if (A.apps_mail.indexOf(B) > -1) placer = [`del-apps`, `Withdraw Application`];

        u_md5_to = [
          `div`, `.@_yZS gxM _geQ gMX uZM`, [[
            `div`, `.@yZS _gMX eYG _xC3`, [[
              `div`, `.@_gxM _aMz`, [[
                `div`, `.@_QZg`, [[
                  `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@${placer[0]}`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@${placer[1]}`]]]]]]]]]]]
      }
    }

    return [`span`, `&@style>overflow:hidden`, `#@root`, [
      this.feedControls(), [
      `main`, `.@_xC2 _aA2 xC3`, `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;background:#f3f4f7`, [[
        `section`, `&@style>margin: 70px 0 70px`, `.@_ss7`, [[`div`, [[`div`, `.@_aGX`, [[
          `div`, `.@_uxq`, [[`div`, `.@_`, [[`div`, `.@_`, [[`div`, `.@_gef`, [[
            `div`, `&@style>padding-bottom:${A.img[0].img_2d[1]/A.img[0].img_2d[0]*100}%`, `.@_g0z`, [[
              `img`, `.@_aMz _gVm`, 
              `&@src>/${A.img[0].src}`]]], [`div`, `.@_gVm`]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
                `div`, `.@yZS gMX _eYG _xC3`, [[
                  `span`, [[
                    `a`, `.@_tX2 _aX2 _aA4`, `&@href>/j/${A.log_md5}/`, `~@${A.title}`]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX uZM`, [[
                `div`, `.@yZS gMX _eYG _xC3`, [[`span`, `.@yZS`, `~@${A.text}`]]]]],
            u_md5_to, [
            `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
                `div`, `.@yZS gMX _eYG _xC3`, [[
                  `div`, `.@eYG _gxM _gMX`, [[
                    `div`, `#@J_PJ`, `.@_eYG _ZSg`, `~@${JSON.stringify(A.geo)}`], [
                    `div`, `.@_QZg _gxM`, [[`span`, `.@_a2X`, `~@${this.log(A.log_secs)}`]]]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
                `div`, `.@yZS _gMX _eYG _xC3`, [[
                `div`, `.@_eYG _ZSg`, [[
                  `div`, `.@_aXZ uZM`, [[
                    `div`, `.@_g00 _gxM _yZS`, [[
                      `span`, `&@style>background-image:url(${config.reqs.check_svg})`, `.@_fg0`], [
                      `p`, `.@_aA6`, `~@${A.tag[0]}`]]], [
                    `div`, `.@_g00 _gxM _yZS`, [[
                      `span`, `&@style>background-image:url(${config.reqs.check_svg})`, `.@_fg0`], [
                      `p`, `.@_aA6`, `~@${A.tag[1]}`]]]]]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
              `div`, `.@yZS gMX _eYG _xC3`, [[
                `div`, `.@_gMX _geQ`, [[
                  `div`, [[`span`, `.@_tXx`, `~@${A.USD} USD`], [`span`, `.@_aA6`, `~@${A.USD_MODE}`]]], [
                  `div`, `.@_QZg`, [[
                    `div`, [[
                      `span`, `.@_tXx`, `~@${this.availtimeleft(parseInt((A.days * 86400000) + A.log_secs))}`], [
                      `span`, `.@_aA6`, `~@Duration`]]]]]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
                `div`, `.@yZS _gMX _eYG _xC3`, [[
                `div`, `.@_eYG _gxM`, [[`div`, `.@aXs _gxM`, [[
                    `span`, `.@_tXx`, `~@${A.books_mail.length}`], [
                    `span`, `.@a2X _axS _aA6`, `~@Bookings`]]], [
                  `div`, `.@_aXs _gxM`, [[
                    `span`, `#@mail`, `.@_tXx`, `~@${A.apps_mail.length}`], [
                    `span`, `.@_axS _aA6`, `~@Applications`]]], [
                  `div`, `.@_aXs _gxM`, [[
                    `span`, `#@mail2`, `.@_tXx`, `~@${A.give_mail.length}`], [
                    `span`, `.@_axS _aA6`, `~@Hires`]]]]]]]]]]]]], [`div`, `.@_aGX`, [apps_mail]]]]]]]]]]
  },

  listApplicants (A, B, C) {

    let listApplicants = [];

    let J = C.md5Key;

    A.apps_mail.forEach(u => {

      listApplicants.push([
        `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
          `div`, `.@yZS _gMX _eYG _xC3`, [[
            `div`, `.@eYG _ZSg _gxM _geQ`, [[
              `div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
              `div`, [[`span`, `.@_cCq`, `&@style>width:40px;height:40px`, [[`img`, `.@_aWz`, `&@src>${J[u].ava}`, `&@alt>avatar`]]]]], [
                `div`, `.@_eYG`, [[
                  `div`, `.@_QxM`, [[`a`, `.@tXx aA2`, `~@${J[u].full}`, `&@href>/mug/${J[u].sum}/`]]], [
                `div`, `#@mini`, `.@_gxM _geQ`, [[
                  `span`, `.@_aA6 a2X`, `~@${J[u].reqs_per_polyg}`], 
                  this.reqs_per_polyg(J[u].reqs_per_polyg), [
                  `span`, `.@_axS _aA6 _a2X`, `~@ ${J[u].polygs_mail} reviews`]]]]]]], this.listApplicantsAction(A, B, J[u].sum)]]]]]])
    })

    return listApplicants;
  },

  listApplicantsAction (A, B, C) {

    let mail_to = [];

    if (B !== false) {

      if (B === A.u_md5) {

        let inlineJSON = `&@md5>{
          &quot;j_md5&quot;: &quot;${A.log_md5}&quot;,
          &quot;mail&quot;: &quot;${C}&quot;,
          &quot;u_md5&quot;: ${A.u_md5}}`;

        mail_to = [
          `div`, `.@_QZg`, [[
            `div`, `.@_gM_a _agM _guZ`, [[`a`, inlineJSON, `#@to-book`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@interview`]]]]]
      }
    }

    return mail_to;

  },

  Jobs (A) {

    A.jobs.sort((a, b) => {return b.log_secs - a.log_secs});

    let Jobs = [];

    A.jobs.forEach(J => {

      Jobs.push([
        `section`, `&@style>margin: 0 0 10px`, [[
          `div`, `.@_uxq`, [[`div`, `.@_`, [[`div`, `.@_`, [[`div`, `.@_gef`, [[
            `div`, `&@style>padding-bottom:${J.img[0].img_2d[1]/J.img[0].img_2d[0]*100}%`, `.@_g0z`, [[
              `img`, `.@_aMz _gVm`, 
              `&@src>/${J.img[0].src}`]]], [`div`, `.@_gVm`]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
                `div`, `.@yZS gMX _eYG _xC3`, [[
                  `span`, [[
                    `a`, `.@_tX2 _aX2 _aA4`, `&@href>/j/${J.log_md5}/`, `~@${J.title}`]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX uZM`, [[
                `div`, `.@yZS _gMX eYG _xC3`, [[`a`, `.@_zY0 _tXv`, `&@href>/j/${J.log_md5}/`, `~@${J.text}`]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
                `div`, `.@yZS gMX _eYG _xC3`, [[
                  `div`, `.@eYG _gxM _gMX`, [[
                    `div`, `#@J_PJ`, `.@_eYG _ZSg`, `~@${JSON.stringify(J.geo)}`], [
                    `div`, `.@_QZg _gxM`, [[`span`, `.@_a2X`, `~@${this.log(J.log_secs)}`]]]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
                `div`, `.@yZS _gMX _eYG _xC3`, [[
                `div`, `.@_eYG _ZSg`, [[
                  `div`, `.@_aXZ uZM`, [[
                    `div`, `.@_g00 _gxM _yZS`, [[
                      `span`, `&@style>background-image:url(${config.reqs.check_svg})`, `.@_fg0`], [
                      `p`, `.@_aA6`, `~@${J.tag[0]}`]]], [
                    `div`, `.@_g00 _gxM _yZS`, [[
                      `span`, `&@style>background-image:url(${config.reqs.check_svg})`, `.@_fg0`], [
                      `p`, `.@_aA6`, `~@${J.tag[1]}`]]]]]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
              `div`, `.@yZS gMX _eYG _xC3`, [[
                `div`, `.@_gMX _geQ`, [[
                  `div`, [[`span`, `.@_tXx`, `~@${J.USD} USD`], [`span`, `.@_aA6`, `~@${J.USD_MODE}`]]], [
                  `div`, `.@_QZg`, [[
                    `div`, [[
                      `span`, `.@_tXx`, `~@${this.availtimeleft(parseInt((J.days * 86400000) + J.log_secs))}`], [
                      `span`, `.@_aA6`, `~@Duration`]]]]]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
                `div`, `.@yZS _gMX _eYG _xC3`, [[
                `div`, `.@_eYG _gxM`, [[`div`, `.@aXs _gxM`, [[
                    `span`, `.@_tXx`, `~@${J.books_mail.length}`], [
                    `span`, `.@a2X _axS _aA6`, `~@Bookings`]]], [
                  `div`, `.@_aXs _gxM`, [[
                    `span`, `#@mail`, `.@_tXx`, `~@${J.apps_mail.length}`], [
                    `span`, `.@_axS _aA6`, `~@Applications`]]], [
                  `div`, `.@_aXs _gxM`, [[
                    `span`, `#@mail2`, `.@_tXx`, `~@${J.give_mail.length}`], [
                    `span`, `.@_axS _aA6`, `~@Hires`]]]]]]]]]]]]])
    });

    return [`span`, `&@style>overflow:hidden`, `#@root`, [
      this.feedControls(), [
      `main`, `.@_xC2 _aA2 xC3`, `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;background:#f3f4f7`, [[
        `section`, `&@style>margin: 70px 0 70px`, `.@_ss7`, [[`div`, [[`div`, `.@_aGX`, Jobs]]]]]]]]]
  },

  jobMap () {

    return [`span`, `&@style>overflow:hidden`, `#@root`, [
      this.feedControls(), [
      `main`, `.@_xC2 _aA2 xC3`, `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;background:#f3f4f7`, [[
        `section`, `#@map`, [[`svg`, `.@_aXZ _gmg`]]]]]]]
  },

  analyticsRoot (Obj, MailObj, Obj2, Mail2Obj) {

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
      `div`, `.@_sZ2 _cX0 _-Zz`, [[`div`, `&@style>letter-spacing:0.75px`, `.@_tXx`, `~@${Obj.group}`], [`div`, `.@_a2X`, `~@${Obj.role}`]]], [
      `div`, `.@_pV0`], [
      `div`, `.@_sZ2 pV0`, [
        this.supportReqs(Mail2Obj), [
        `div`, `.@_sZ2 _-Zz`, [[
          `div`, `.@_yZS _gxM _geQ _gMX _uZM`, [[
            `div`, `.@_`, [[`span`, `&@style>letter-spacing:0.75px`, `.@_tXx`, `~@Tasks`]]], [
              `div`, `.@_QZg _gxM`, []]]], [
                `div`, `&@style>padding:25px 0 0`, `.@_gxM _yZS`, [[
                  `div`, `.@_gM_a _agM _guZ`, [[
                    `a`, `.@_TX_a _atX qXS _utQ a2X`, `&@href>javascript:;`, `~@+ Assign a Task`]]]]]]]]]]];
  },

  topAppRoot (A, B) {

    let to = [
      `div`, `.@_gM_a _agM _guZ gMX`, `&@style>max-width: 450px`, [[
        `a`, `.@_TX_a _atX _utQ _gMX`, `#@devs-add-ejs`, `&@href>/login/`, `~@login`]]];

    let txt = [`My Feed`, `Profile`]

    let plc = [`feed`, `mug`]

    let a = [`/feed/`, `/mug/`];

    if (B !== false) {//console.log(`#1234`)
 
      to = [
        `a`, `.@_cCq _gS3`, `#@mug-ava`, `&@href>javascript:;`, `&@style>height:24px;width:24px`, [[
          `img`, `#@mug-ava`, `.@_aWz`, `&@src>${A[B].ava}`]]]  
    }

    return [`nav`, 
      `.@_uHC _tY0`, [[
        `div`, `.@_xCt _g2s`], [
        `div`, [[
          `div`, `.@_-tY _y2s`, [[
            `div`, `&@style>height:45px;background: #1185fe;width: 100%;padding: 0 20px`, [[
              `div`, `.@_geQ _gMX _aA0`, [[
                `div`, `.@_eYG`, [[
                  `div`, `.@_gxQ gMX`, [[`span`, `.@_tAa _tXx`, `~@Free International Shipping`]]]]], [
                `div`, `.@_QZg`, [[
                  `div`, [[
                    `a`, `#@SetCurrency`, `.@_cCq`, `&@style>width:32px;height:32px`, `&@href>javascript:;`, [[
                      `svg`, `#@SetCurrency`, `&@style>min-height:32px;width:32px`, `&@viewBox>0 0 24 24`, [[
                        `circle`, `#@SetCurrency`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
                          `text`, `#@SetCurrency`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 9px;`, `~@usd`]]]]]]]]]]]]], [
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `#@devs`, `.@-_tX AppMedium`, `&@href>/`, `~@corrde`], [
                `span`, `@_tCc _pV4`, `@alpha`]]], [
              `div`, `.@_QZg`, [to, [
                `a`, `#@saleBag`, `.@-_tX Bag`, `&@style>margin: 0 24px;width:24px;height:24px`, `&@href>javascript:;`]]],
              this.Monies(), 
              this.inModal({id: `mugger`, in: this.aPoolModal(txt, plc, a)})]]]]]]]];
  },

  login () {

     return [
      `section`, [[
            `div`, `.@_aXz _xQz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `.@_tXa`, `&@href>/`, `~@corrde`], [
                `span`, `.@_tCc _pV4`, `~@login`]]], [
              `div`, `.@_QZg`, [[
                    `div`, `.@_gM_a _agM _guZ gMX`, `&@style>max-width: 450px`, [[
                      `a`, `.@_TX_a _atX _utQ _gMX`, `&@href>/signup/`, `~@Sign up for free`]]]]]]], [
        `div`, `.@_cXz`, [[
                  `div`, `.@_XsQ`, [[
                    `div`, [[
                      `div`, `.@_SaQ`, [[
                        `h4`, `.@_uHg _-SZ6`, `~@Welcome back`], [
                        `form`, `.@_cQc`, [[
                          `div`, `.@_cQX`, [[
                            `input`, `#@mail`, `.@_-Yz _txx _aA6`, `&@placeholder>email`, `&@type>text`]]], [
                          `div`, `.@_cQX`, [[
                            `input`, `#@pass`, `.@_-Yz _txx _aA6`, config.placePass, config.valPass]]], [
                            `div`, `.@_agM _gM_a _cQc`, [[
                              `a`, `#@to-app`, `.@_TX_a _atX _c5Q`, `&@href>javascript:;`, `~@Sign in`]]]]]]]]]]], [`div`, `.@_-ZCc`]]]]];
  },

  signup () {

     return [
      `section`, [[
            `div`, `.@_aXz _xQz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `.@_tXa`, `&@href>/`, `~@corrde`], [
                `span`, `.@_tCc _pV4`, `~@signup`]]], [
              `div`, `.@_QZg`, [[
                    `div`, `.@_gM_a _agM _guZ gMX`, `&@style>max-width: 450px`, [[
                      `a`, `.@_TX_a _atX _utQ _gMX`, `&@href>/login/`, `~@login`]]]]]]], [
        `div`, `.@_cXz`, [[
                  `div`, `.@_XsQ`, [[
                    `div`, [[
                      `div`, `.@_SaQ`, [[
                        `h4`, `.@_uHg _-SZ6`, `~@Create a Corrde Account`], [
                        `form`, `.@_cQc`, [[
                          `div`, `.@_cQX`, [[
                            `input`, `#@ini_mail`, `.@_-Yz _txx _aA6`, `&@placeholder>email`, `&@type>email`]]], [
                          `div`, `.@_cQX`, [[
                            `input`, `#@pre`, `.@_-Yz _txx _aA6`, `&@placeholder>First name`, `&@type>text`]]], [
                          `div`, `.@_cQX`, [[
                            `input`, `#@suff`, `.@_-Yz _txx _aA6`, `&@placeholder>Surname`, `&@type>text`]]], [
                          `div`, `.@_cQX`, [[
                            `input`, `#@pass`, `.@_-Yz _txx _aA6`, config.placePass, config.valPass]]], [
                            `div`, `.@_agM _gM_a _cQc _guZ`, [[
                              `a`, `#@add-u_md5`, `.@_TX_a _atX _c5Q _utQ`, `&@href>javascript:;`, `~@sign up`]]]]]]]]]]], [`div`, `.@_-ZCc`]]]]];
  },

  listSubs (a, A) {

    let listSubs = [];

    A[0].forEach((S, s) => {

      listSubs.push([
        `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
          `div`, `.@yZS _gMX _eYG _xC3`, [[
            `div`, `.@eYG _ZSg _gxM _geQ`, [[
              `div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                `div`, `.@_eYG`, [[
                  `div`, `.@_QxM`, [[`span`, `.@tXx aA2 _utQ`, `~@${S}`]]], [
                `div`, `#@mini`, `.@_gxM _geQ`, [[
                  `span`, `&@style>background-image:url(${config.reqs.check_svg});height:11px;width:11px;min-width: 0;margin-right:8px`, `.@_fg0`], [
                  `span`, `.@_aA6 _a2X`, `~@${A[1][s]} Freelancers`], [
                  `span`, `&@style>background-image:url(${config.reqs.check_svg});height:11px;width:11px;min-width: 0;margin-right:8px`, `.@_axS _fg0`], [
                  `span`, `.@axS _aA6 _a2X`, `~@ ${A[2][s]} JOBS`]]]]]]]]]]]]])
    })

    return [
      `div`, `&@style>letter-spacing:1.1px`, [[
        `div`, `.@_gcQ _aXZ sZ2 _tY0 _aA2`, [ [
          `div`, `.@_eYG _geQ _aA2 _tXv`, [[`span`, `.@_tXx`, `~@${a}`]]], [
          `div`, `.@_QZg _gMz`, [[
          `div`, `.@_axS`, [[
            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@exit-subs`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@return`]]]]]]]]], [
        `div`, `.@_aXY XsQ _aA2`, `&@style>margin:0 0;max-height: calc(100vh - 170px);`, [[
            `div`, `.@_sZ2`, listSubs]]]]]
  },

  selfMail (A, B) {

    return [`span`, `&@style>overflow:hidden`, `#@root`, [
      this.feedControls(), [
      `main`, `.@_xC2 _aA2 xC3`, `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;background:#f3f4f7`, [[
        `section`, `&@style>margin: 70px 0`, `.@_ss7`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3`, [[`span`, `.@a2X _aA6`, `~@Chat Messages`]]], [
                `div`, `.@_QZg _gxM cX5`, [[`a`, `#@dev-active-next-ejs`, `.@_tX ProceedColor`, `&@href>javascript:;`]]]]]]], [
            `div`,`.@_gxM _geQ _gMX`, [[
              `div`, `.@_miY _gMX`, [[
                `div`, `#@around-slide-ejs`, `.@_AZc`, [[
                  `div`, [[`div`, `.@_AZx ava`, [[`div`, `#@around-rotate-ejs`, `.@_AZs _gxM`, 
                    this.text_y_scroll(A, B)]]]]]]]]]]]]], [
          `div`, `.@_-Zz _aGX`, [[
          `div`, `.@_uxq`, [[`div`, `.@_`, [[`div`, `.@_`, [[`div`, `.@_gef`, [[
            `div`, `&@style>padding-bottom:60%`, `.@_g0z`, [[
              `img`, `.@_aMz _gVm`, 
              `&@src>`]]], [`div`, `.@_gVm`]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _xC3`, [[
                `div`, `.@_yZS _gMX _eYG _uZM`, [[
                `div`, `.@_eYG _ZSg`, [[
                  `div`, `.@_aXZ uZM`, [[
                    `div`, `.@_g00 _gxM _yZS`, [[
                      `span`, `&@style>background-image:url(${config.reqs.check_svg})`, `.@_fg0`], [
                      `p`, `.@_aA6`, `~@Art & Decor`]]], [
                    `div`, `.@_g00 _gxM _yZS`, [[
                      `span`, `&@style>background-image:url(${config.reqs.check_svg})`, `.@_fg0`], [
                      `p`, `.@_aA6`, `~@Interior Design`]]]]], [
                  `div`, `.@_gMX`, [[
                    `div`, `.@_yZS _gxM _geQ _gMX`, [[
                      `textarea`, `&@style>background: none`, `#@add-pfolio-text`, `.@-_tyq _aA2`, `&@autocomplete>off`, `&@placeholder>Write something about your post`]]]]]]]]], [
                        `div`, `.@_gcQ _aXZ sZ2`, [ [
                          `div`, `.@_eYG _geQ _aA2`, [[`span`, `.@_tXx`, `~@`]]], [
                          `div`, `.@_QZg _gMz`, [[
                          `div`, `.@_axS`, [[
                            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@add-pfolio`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Send`]]]]]]]]]]]]]]]]]]]]];
  }, 

  topMail (A) {

    return [`nav`, 
      `.@_uHC`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY`, [[
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `.@_tXa`, `&@href>/feed/`, `@corrde`], [
                `span`, `.@_tCc _pV4`, `~@mail`]]], [
              `div`, `.@_QZg _gxM _aA2`, [[`span`, `&@style>letter-spacing:0.75px`, `.@_axS _gV0 _tXx`, `~@${A.full}`], [
                `a`, `.@_axS _cCq _gS3`, `#@mug-ava`, `&@href>javascript:;`, [[
                  `img`, `#@mug-ava`, `.@_aWz`, `&@src>${A.ava}`, `&@alt>avatar`]]]]]]]]]]]]];
  },

  text_y_scroll (A, B) {

    let text_y_scroll = [];

    text_y_scroll.push([
      `div`, `.@_xX0 _tXv`, [[
        `a`, `.@_cCq`, `&@u_md5>${B}`, `&@style>width:50px;height:50px`, `&@href>javascript:;`, [[
          `img`, `.@_aWz`, `#@dev_md5`, `&@src>/gp/p/vector/support_mug.svg`, `&@alt>avatar`]]], [
        `span`, `&@style>margin:10px 0 0`, `.@_aA6 a2X Zz`, `~@Corrde Team`]]])

    /*let Obj = A.md5;

    Obj.sort((a, b) => {return b.log - a.log})

    let u_md5_y_scroll = [];

    Obj.forEach(md5 => {

      u_md5_y_scroll[Obj.indexOf(md5)] = [
        `div`, `.@_xX0 _tXv`, [[
          `a`, `.@_cCq`, `&@style>width:50px;height:50px`, `&@href>/mug/${md5.sum}/`, [[
            `img`, `.@_aWz`, `&@src>${md5.ava}`, `&@alt>avatar`]]], [
          `span`, `&@style>margin:10px 0 0`, `.@_aA6 _a2X`, `~@${this.pre_utc(md5.pre_utc)}`]]];
    })*/

    return text_y_scroll;
  },

  devsMail (A, B) {

    return [
      `main`, `.@_xC2 _aA2 xC3`, `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;`, [[
        `section`, `@style>margin: 70px 0`, `.@ss7`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3`, [[`span`, `.@a2X _aA6`, `~@Support Chat`]]], [
                `div`, `.@_QZg _gxM cX5`, [[`a`, `#@msg_u_md5`, `.@_tX ProceedColor`, `&@href>javascript:;`]]]]]]], [
            `div`,`.@_gxM _geQ _gMX`, [[
              `div`, `.@_miY _gMX`, [[
                `div`, `#@around-slide-ejs`, `.@_AZc`, [[
                  `div`, [[`div`, `.@_AZx ava`, [[`div`, `#@around-rotate-ejs`, `.@_AZs _gxM`, 
                    this.devs_text_y_scroll(A, B)]]]]]]]]]]]]], [
          `div`, `.@_-Zz _aGX`, [[
          `div`, `.@_uxq`, [[`div`, `.@_`, [[`div`, `.@_`, [[`div`, `.@_gef`, [[
            `div`, `&@style>padding-bottom:60%`, `.@_g0z`, [[
              `img`, `.@_aMz _gVm`, 
              `&@src>`]]], [`div`, `.@_gVm`]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _xC3`, [[
                `div`, `.@_yZS _gMX _eYG _uZM`, [[
                `div`, `.@_eYG _ZSg`, [[
                  `div`, `.@_aXZ uZM`, [[
                    `div`, `.@_g00 _gxM _yZS`, [[
                      `span`, `&@style>background-image:url(${config.reqs.check_svg})`, `.@_fg0`], [
                      `p`, `.@_aA6`, `~@Art & Decor`]]], [
                    `div`, `.@_g00 _gxM _yZS`, [[
                      `span`, `&@style>background-image:url(${config.reqs.check_svg})`, `.@_fg0`], [
                      `p`, `.@_aA6`, `~@Interior Design`]]]]], [
                  `div`, `.@_gMX`, [[
                    `div`, `.@_yZS _gxM _geQ _gMX`, [[
                      `textarea`, `&@style>background: none`, `#@add-pfolio-text`, `.@-_tyq _aA2`, `&@autocomplete>off`, `&@placeholder>Write something about your post`]]]]]]]]], [
                        `div`, `.@_gcQ _aXZ sZ2`, [ [
                          `div`, `.@_eYG _geQ _aA2`, [[`span`, `.@_tXx`, `~@`]]], [
                          `div`, `.@_QZg _gMz`, [[
                          `div`, `.@_axS`, [[
                            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@add-pfolio`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Send`]]]]]]]]]]]]]]]]]]];
  },

  devs_text_y_scroll (A, U) {

    let devs_text_y_scroll = [];

    let Obj = A[4];

    Obj.sort((a, b) => {return b[1] - a[1]})

    Obj.forEach(md5 => {

      devs_text_y_scroll[Obj.indexOf(md5)] = [
        `div`, `#@${md5[0]}`, `.@_xX0 _tXv`, [[
          `a`, `.@_cCq`, `&@style>width:50px;height:50px`, `#@${md5[0]}`, `&@href>javascript:;`, [[
            `img`, `.@_aWz`, `&@src>${U[md5[0]].ava}`, `#@text`, `&@alt>avatar`]]], [
          `span`, `&@style>margin:10px 0 0`, `.@_aA6 _a2X`, `~@${this.pre_utc(md5[1])}`]]];
    })

    return devs_text_y_scroll;
  },

  u_md5Msg (A, B, C) {

    let u_md5Msg = [];

    B.sort((a, b) => {return a.mail_log - b.mail_log})

    B.forEach (Msg => {

      if (Msg.src_md5 === A) {

        u_md5Msg.push([
          `div`, `.@_gcQ`, [[
            `div`, `.@aCz _eYG MtX`, `&@style>overflow:unset;margin: 0`, [[
              `span`, `.@pV9 tWx`, `~@${Msg.mail}`]]], [
            `div`, `.@_QZg`, [[`span`, `.@_aCz _szU`, `~@${this.log(Msg.mail_log)}`]]]]]);

      }

      else {

        u_md5Msg.push([
          `div`, `.@_gcQ`, [[
            `div`, `.@_aCz _eYG _MtX`, `&@style>overflow:unset`, [[
              `span`, `.@_aCz _szU`, `~@${this.log(Msg.mail_log)}`]]], [
            `div`, `.@_QZg`, [[`span`, `.@pV3 tEx`, `~@${Msg.mail}`]]]]]);
      }
    })

    return [
      `div`,  `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;`, [[
        `div`, `.@_gcQ _aXZ sZ2 _uZM _aA0 _aA2`, [[
          `div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
            `div`, [[`span`, `.@_cCq`, `&@style>width:40px;height:40px`, [[`img`, `.@_aWz`, `&@src>${C[A].ava}`, `&@alt>avatar`]]]]], [
            `div`, `.@_eYG`, [[
              `div`, `.@_QxM`, [[`a`, `.@tXx aA2`, `~@${C[A].full}`, `&@href>/mug/${C[A].sum}/`]]], [
              `div`, `#@mini`, `.@_gxM _geQ`, [[
                `span`, `.@_aA6 a2X`, `~@${C[A].reqs_per_polyg}`], 
                this.reqs_per_polyg(C[A].reqs_per_polyg), [
                `span`, `.@_axS _aA6 _a2X`, `~@ ${C[A].polygs_mail} reviews`]]]]]]], [
          `div`, `.@_QZg _gMz`, [[
            `div`, `.@_axS`, [[
              `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@exit-msg`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@return`]]]]]]]]], [
        `div`, `.@_aXY _XsQ _aA2`, `&@style>margin:0 0 90px;max-height: calc(100vh - 170px);`, [[
          `div`, `.@_sZ2`, u_md5Msg]]], [
          `div`, `#@add-dev-see-ejs`, `.@_azX- _gMX _gp0 _gmg`, [[
            `div`, `.@_gxM _gMX`, [[
              `div`, `.@_gMX gcQ`, [[
          `div`, `.@_gMX`, [[`div`, `.@_aGX`, [[
            `div`, `.@_xGy`, [[
              `div`, `.@_gxM _gMX`, [[
                `div`, `&@style>padding-right: 10px;width: 100%`, `.@_eYG`, [[
                  `textarea`, `#@msg_value`, `.@_Wtx`, `&@placeholder>Type Text Here`]]], [
                `div`, `.@_QZg`, [[
                  `span`, `.@_`, [[`a`, `#@msg`, `&@u_md5>${A}`, `.@-_tX ProceedColor`, `&@href>javascript:;`]]]]]]]]]]]]]]]]]]]]]


  },

  u_md5_2_dev_md5 (A, B, C) {

    let u_md5_2_dev_md5 = [];

    B.sort((a, b) => {return a.mail_log - b.mail_log})

    B.forEach (Msg => {

      if (Msg.src_md5 === A) {

        u_md5_2_dev_md5.push([
          `div`, `.@_gcQ`, [[
            `div`, `.@_aCz _eYG _MtX`, `&@style>overflow:unset`, [[
              `span`, `.@_aCz _szU`, `~@${this.log(Msg.mail_log)}`]]], [
            `div`, `.@_QZg`, [[`span`, `.@pV3 tEx`, `~@${Msg.mail}`], [`a`, `#@msg-`, `&@href>javascript:;`]]]]]);

      }

      else {

        u_md5_2_dev_md5.push([
          `div`, `.@_gcQ`, [[
            `div`, `.@aCz _eYG MtX`, `&@style>overflow:unset;margin: 0`, [[
              `span`, `.@pV9 tWx`, `~@${Msg.mail}`]]], [
            `div`, `.@_QZg`, [[`span`, `.@_aCz _szU`, `~@${this.log(Msg.mail_log)}`], [`a`, `#@msg-`, `&@href>javascript:;`]]]]]);
      }
    })

    return [
      `div`,  `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;`, [[
        `div`, `.@_gcQ _aXZ _uZM _aA0 _aA2`, [[
          `div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
            `div`, [[`span`, `.@_cCq`, `&@style>width:40px;height:40px`, [this.helpSVG()]]]], [
            `div`, `.@_eYG`, [[
              `div`, `.@_QxM`, [[`a`, `.@_tXx _aA2`, `~@Corrde Support Team`, `&@href>javascript:;`]]]]]]], [
          `div`, `.@_QZg _gMz`, [[
            `div`, `.@_axS`, [[
              `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@exit-msg`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@return`]]]]]]]]], [
        `div`, `.@_aXY _XsQ _aA2`, `&@style>margin:0 0 90px;max-height: calc(100vh - 170px);`, [[
          `div`, `#@u_md5_2_dev_md5`, `.@_sZ2`, u_md5_2_dev_md5], [`a`, `#@msg--`, `&@href>javascript:;`]]], [
          `div`, `#@add-dev-see-ejs`, `.@_azX- _gMX _gp0 _gmg`, [[
            `div`, `.@_gxM _gMX`, [[
              `div`, `.@_gMX gcQ`, [[
          `div`, `.@_gMX`, [[`div`, `.@_aGX`, [[
            `div`, `.@_xGy`, [[
              `div`, `.@_gxM _gMX`, [[
                `div`, `&@style>padding-right: 10px;width: 100%`, `.@_eYG`, [[
                  `textarea`, `#@msg_value`, `.@_Wtx`, `&@placeholder>Type Text Here`]]], [
                `div`, `.@_QZg`, [[
                  `span`, `.@_`, [[`a`, `#@msg`, `&@u_md5>${A}`, `.@-_tX ProceedColor`, `&@href>javascript:;`]]]]]]]]]]]]]]]]]]]]]


  },

  helpSVG () {

    return [`svg`, `&@style>min-height:40px;width:40px`, `&@viewBox>0 0 24 24`, [[
      `circle`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
      `text`, `&@x>12`, `&@y>14.5`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:unset;letter-spacing:normal;font-size: 5.75px;`, `~@Support`]]]
  },

  u_md5_as_dev_md5 (A, B, C) {

    let u_md5_2_dev_md5 = [];

    B.sort((a, b) => {return a.mail_log - b.mail_log})

    B.forEach (Msg => {

      if (Msg.src_md5 === A) {

        u_md5_2_dev_md5.push([
          `div`, `.@_gcQ`, [[
            `div`, `.@_aCz _eYG _MtX`, `&@style>overflow:unset`, [[
              `span`, `.@_aCz _szU`, `~@${this.log(Msg.mail_log)}`]]], [
            `div`, `.@_QZg`, [[`span`, `.@pV3 tEx`, `~@${Msg.mail}`], [`a`, `#@msg-`, `&@href>javascript:;`]]]]]);

      }

      else {

        u_md5_2_dev_md5.push([
          `div`, `.@_gcQ`, [[
            `div`, `.@aCz _eYG MtX`, `&@style>overflow:unset;margin: 0`, [[
              `span`, `.@pV9 tWx`, `~@${Msg.mail}`]]], [
            `div`, `.@_QZg`, [[`span`, `.@_aCz _szU`, `~@${this.log(Msg.mail_log)}`], [`a`, `#@msg-`, `&@href>javascript:;`]]]]]);
      }
    })

    return u_md5_2_dev_md5;
  },

  list_u_md5 (A) {

    let P = A.md5.sort((a, b) => {return b.pre_utc - a.pre_utc});

    let K = A.md5Key;

    let list_u_md5 = [];

    P.forEach(U => {

      list_u_md5.push([
        `div`, `.@_gcQ aXZ sZ2 _uZM _aA0 _aA2`, [[
          `div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
            `div`, [[`span`, `.@_cCq`, `&@style>width:40px;height:40px`, [[`img`, `.@_aWz`, `&@src>${U.ava}`, `&@alt>avatar`]]]]], [
            `div`, `.@_eYG`, [[
              `div`, `.@_QxM`, [[`a`, `.@_tXx _aA2`, `~@${U.full}`, `&@href>/mug/${U.sum}/`]]], [
              `div`, `#@mini`, `.@_gxM _geQ`, [[
                `span`, `.@_aA6 a2X`, `~@${U.reqs_per_polyg}`], 
                this.reqs_per_polyg(U.reqs_per_polyg), [
                `span`, `.@_axS _aA6 _a2X`, `~@ ${U.polygs_mail} reviews | ${this.pre_utc(U.pre_utc)}`]]]]]]], [
          `div`, `.@_QZg _gMz`, [[
            `div`, `.@_axS`, [[
              `div`, `#@${U.sum}`, `.@_gM_a _agM _guZ`, [[`a`, `#@text`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Message`]]]]]]]]])
    })

    return [
      `div`,  `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;`, [[
        `div`, `.@_gxM _gMX _gcQ _uZM`, [[
          `div`, `&@style>padding-right: 10px;width: 100%`, `.@_eYG`, [[
            `input`, `#@u_md5_value`, `.@_Wtx`, `&@placeholder>Search user`, `&@style>`]]], [
          `div`, `.@_QZg`, [[
            `span`, `.@_`, [[`a`, `#@unlist_u_md5`, `&@u_md5>${null}`, `.@-_tX DelColor`, `&@href>javascript:;`]]]]]]], [
        `div`, `.@_aXY XsQ _aA2`, `&@style>margin:0 0;max-height: calc(100vh - 170px);`, [[
            `div`, `.@_sZ2`, list_u_md5]]]]]
  },

  polygs_slide (A, B, C) {

    let mug_polygs = [];

    if (A.polygs.length === 0 && A.sum === B) mug_polygs = this.iniStories();

    else if (A.polygs.length > 0) {

      A.polygs.sort((a, b) => {return b.log_secs - a.log_secs})

      let polygs = [];

      A.polygs.forEach(md5 => {

        let plane_x = ``;

        let plane_y = `200`;

        if (md5.img[0].img_2d[1] < md5.img[0].img_2d[0]) {

          plane_y = (md5.img[0].img_2d[1]/(md5.img[0].img_2d[0]/2)*100);

          if (md5.img[0].img_2d[1] < md5.img[0].img_2d[0]/2) {

            plane_y = 100;
            plane_x = `width:${((md5.img[0].img_2d[0]/2)/(md5.img[0].img_2d[1])*100)}%;`;
          }
        }

        if (md5.img[0].img_2d[1] > md5.img[0].img_2d[0]) plane_y = md5.img[0].img_2d[1]/(md5.img[0].img_2d[0]/2)*100;

        polygs[A.polygs.indexOf(md5)] = [
        `div`, `.@_X4- _rQ0 _gC0`, [[
          `div`, `.@_uxq`, [[`div`, `.@_`, [[`div`, `.@_`, [[`div`, `.@_gef`, [[
            `div`, `&@style>padding-bottom:50%`, `.@_g0z`, [[
              `img`, `&@style>${plane_x}height:${plane_y}%`, `.@_aMz _gVm`, 
              `&@src>/${md5.img[0].src}`]]], [`div`, `.@_gVm`]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX _xC3`, [[
              `div`, `.@_yZS _gMX _eYG gcQ`, [[
                `div`, `.@_eYG _ZSg`, [[
                  `div`, `.@_gxM _gMX`, [[`div`, `.@_eYG _ZSg`, [[`a`, `&@href>/portfolio/${md5.log_md5}`, `.@_tXx _aA6 _tXv`, `~@${md5.text}`]]]]], [
                  `div`, `.@_ZSg _gxM _eYG`, [[`span`, `.@_aA6 _tXv`, `~@${md5.seen.length} views`]]]]]]], [
              `div`, `.@_yZS _gxM _geQ _gMX`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                `div`, `.@_eYG _gxM`, [[
                  `div`, `.@aXs _gxM`, [[`a`, `.@-_tX HeartsGray`, `&@href>/portfolio/${md5.log_md5}`], [`span`, `.@_a2X _axS _aA6`, `~@${md5.mail2.length}`]]], [
                  `div`, `.@_aXs _gxM`, [[`a`, `.@-_tX CommentsGray`, `&@href>/portfolio/${md5.log_md5}`], [`span`, `.@_a2X _axS _aA6`, `~@${md5.mail.length}`]]]]], [
                `div`, [[`span`, `.@_a2X`, `~@${this.log(md5.log_secs)}`]]]]]]]]]]]]];
      })

      mug_polygs = [
          `section`, `.@gvQ pQ0`, `&@style>margin: 0 0 10px`, [[
        `section`, `.@cX3 _ss7`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3`, [[`span`, `.@a2X _aA2`, `~@Portfolio stories`]]], [
                `div`, `.@_QZg _gxM cX5`, [[`a`, `@_tX SellColor`, `&@href>javascript:;`]]]]]]], [
            `div`,`.@_gxM _geQ _gMX`, [[
              `div`, `.@miY _gMX`, [[
                `div`, `#@stories-slide-ejs`, `.@_AZc`, [[
                  `div`, [[`div`, `.@_AZx ava`, [[`div`, `#@stories-rotate-ejs`, `.@_AZs _gxM`, polygs]]]]]]]]]]]]]]]]];
    }

    return mug_polygs;
  },

  vService () {

    return [
      `div`,  `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;`, [[
        `div`, `.@_aXY XsQ _aA2`, `&@style>margin:0 0;max-height: calc(100vh - 170px);`, [[
            `div`, `.@_sZ2`, [[
              `div`, `.@_gxM _gMX`, `&@style>margin: 25px 0`, [[
                `div`, `.@_geQ _gMX`, [[`span`, `.@-_tX vServiceGray`, `&@style>width: 100px; height:100px`]]]]], [
              `div`, `&@style>padding: 0 24px`, [[
                `div`, `.@_gxQ`, [[
                  `span`, `.@_utQ`, `&@style>font-size:17px`, `~@Vendor Service`], [
                  `span`, `.@_Qtx`, `&@style>padding:10px 0`, `~@Our vendor service helps you set up shop for selling your products on order.`]]]]]]], [
            `div`, `.@_sZ2`, [[
              `div`, `.@_gxM _gMX`, `&@style>margin: 25px 0`, [[
                `div`, `.@_geQ _gMX`, [[`span`, `.@-_tX cServiceGray`, `&@style>width: 100px; height:100px`]]]]], [
              `div`, `&@style>padding: 0 24px`, [[
                `div`, `.@_gxQ`, [[
                  `span`, `.@_utQ`, `&@style>font-size:17px`, `~@Shipping & Delivery`], [
                  `span`, `.@_Qtx`, `&@style>padding:10px 0`, `~@You can facilitate shipping products to your customers after checkout with our courier hailing service.`]]]]]]], [
            `div`, `.@_sZ2`, [[
              `div`, `.@_gxM _gMX`, `&@style>margin: 25px 0`, [[
                `div`, `.@_geQ _gMX`, [[`span`, `.@-_tX GeoLightGray`, `&@style>width: 70px; height:70px`]]]]], [
              `div`, `&@style>padding: 0 24px`, [[
                `div`, `.@_gxQ`, [[
                  `span`, `.@_utQ`, `&@style>font-size:17px`, `~@Geolocation`], [
                  `span`, `.@_Qtx`, `&@style>padding:10px 0`, `~@Set reliable business and address location with our mapping service to enhance your shipping and delivery services.`]]]]]]], [
            `div`,`&@style>margin: 0 0 30px`, `.@_gcQ _aXZ`, [[
              `div`, `.@_axS`, [[
                `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@foldVService`, `.@_TX_a _atX _utQ`, `&@href>javascript:;`, `~@Close`]]]]], [
              `div`, `.@_dMG _geQ _aA2`, [[`span`, `.@tXx`, `~@`]]], [
              `div`, `.@_QZg _gMz`, [[`div`, `.@_gM_a _agM _guZ`, [[`a`, `#@vServiceCreate`, `.@_TX_a _atX _utQ`, `&@href>javascript:;`, `~@Next`]]]]]]]]]]]
  },

  vServiceSet () {

    return [
      `div`, `&@style>letter-spacing:0.75px`, [[
        `div`, `.@_gcQ _aXZ`, [[
          `div`, `.@_axS`, [[
            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@vServiceSetFold`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Exit`]]]]], [
          `div`, `.@_dMG _geQ _aA2`, [[`span`, `.@_tXx`, `~@Set Vendor Service Name`]]], [
          `div`, `.@_QZg _gMz`, [[`div`, `.@_gM_a _agM`, [[`a`, `#@vServicePush`, `.@_TX_a _atX`, `&@href>javascript:;`, `~@Create`]]]]]]], [
        `div`, `.@_aXY _XsQ _aA2`, [[
          `div`, `.@_yZS gxM _geQ gMX _xC3`, `&@style>margin: 10px auto 60px`, [[
            `div`, `.@_yZS _gMX eYG uZM`, [[
              `div`, `.@_UFA cS2 _gMX`, [[
                `input`, `#@vServiceValue`, `.@_RRD Ccs _aA2 _pVa`, `&@autocomplete>off`, `&@placeholder>Vendor name`]]]]]]]]]]]
  },

  listvServicesSliced (A, B) {

    //A.shuffle();

    A.slice(0, 5);

    let ModelvServices = [];

    A.forEach(Retail => {

      let ModelAva = [];

      if (Retail.vServiceAva === false) {

        ModelAva = [`svg`, `&@title>${Retail.vServiceSet}`, `&@style>min-height:28px;width:28px`, `&@viewBox>0 0 24 24`, [[
          `circle`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
          `text`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 12px;`, `~@${Retail.vServiceSet[0]}`]]]

      }

      else if (Retail.vServiceAva !== false) ModelAva = [`img`, `.@_aWz`, `&@src>${Retail.ava}`, `&@title>${Retail.vServiceSet}`, `&@alt>avatar`];

      ModelvServices[A.indexOf(Retail)] = [
        `div`, `.@_aS0`, [[
          `a`, `.@_cCq`, `&@style>width:28px;height:28px`, `&@href>/store/${Retail.log_md5}/`, [ModelAva]]]]
    })

    return [[`div`, `.@_gxM`, ModelvServices], [`div`, `.@_QZg`, [[`a`, `#@listvServices`, `.@_aA6 _tXx`, `&@href>javascript:;`, `~@${A.length} Vendor Services`]]]]
  },

  listvServicesAvatr (Retail) {

    let ModelAva = [];

    if (Retail.vServiceAva === false) {

      ModelAva = [`svg`, `&@title>${Retail.vServiceSet}`, `&@style>min-height:40px;width:40px`, `&@viewBox>0 0 24 24`, [[
        `circle`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
        `text`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 12px;`, `~@${Retail.vServiceSet[0]}`]]]

    }

    else if (Retail.vServiceAva !== false) ModelAva = [`img`, `.@_aWz`, `&@src>${Retail.ava}`, `&@title>${Retail.vServiceSet}`, `&@alt>avatar`];

    return [`a`, `.@_cCq`, `&@style>width:40px;height:40px`, `&@href>/store/${Retail.log_md5}/`, [ModelAva]]

  },

  listvServices (A) {

    let ModelvServices = [];

    A.forEach(Retail => {

      let ModelRetailClass = []

      if (Retail.vServiceClass !== false) ModelRetailClass = [`span`, `.@_aA6`, `~@${Retail.vServiceClass}`]

      ModelvServices.push([
        `div`, `.@_gcQ aXZ sZ2 _uZM _aA0 _aA2`, [[
          `div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
            `div`, [this.listvServicesAvatr(Retail)]], [
            `div`, `.@_eYG`, [[
              `div`, `.@_QxM`, [[`a`, `.@_tXx _aA2`, `~@${Retail.vServiceSet}`, `&@href>/store/${Retail.log_md5}/`]]], [
              `div`, `#@mini`, `.@_gxM _geQ`, [
                ModelRetailClass, [
                `span`, `.@_aA6 _tXx _axS`, `~@${Retail.vServiceRating}`], 
                this.reqs_per_polyg(Retail.vServiceRating)/*, [
                `span`, `.@_axS _aA6 _a2X`, `~@ ${U.polygs_mail} reviews | ${this.pre_utc(U.pre_utc)}`]*/]]]]]], [
          `div`, `.@_QZg _gMz`, [/*[
            `div`, `.@_axS`, [[
              `div`, `#@${U.sum}`, `.@_gM_a _agM _guZ`, [[`a`, `#@text`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Message`]]]]]*/]]]])
    })

    return [
      `div`,  `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;`, [[
        `div`, `.@_gxM _gMX _gcQ _uZM`, [[
          `div`, `&@style>padding-right: 10px;width: 100%`, `.@_eYG`, [[
            `input`, `#@`, `.@_Wtx`, `&@placeholder>Search service`, `&@style>`]]], [
          `div`, `.@_QZg`, [[
            `span`, `.@_`, [[`a`, `#@listvServicesFold`, `.@-_tX DelColor`, `&@href>javascript:;`]]]]]]], [
        `div`, `.@_aXY XsQ _aA2`, `&@style>margin:0 0;max-height: calc(100vh - 170px);`, [[
            `div`, `.@_sZ2`, ModelvServices]]]]]
  }, 

  retailStoreHead (Store, u_md5) {

    let ModelStoreAddress = [];

    if (Store.vServiceAddress !== false) {

      ModelStoreAddress = [`span`, [[`a`, `#@StockSites`, `.@-_tX GeoGray`, /*`&@href>/maps/store/${Store.log_md5}/`*/ `&@href>javascript:;`,]]]
    } 

    else if (Store.vServiceAddress === false && Store.u_md5 === u_md5) {

      ModelStoreAddress = [
        `div`, `.@_gM_a _agM _guZ`, [[
          `a`, `.@_TX_a _atX _utQ`, `&@href>/maps/store/set/${Store.log_md5}/`, `~@Add Stock Site`]]]
    }

    let Settings = [
      [`Billing & Payments`, `Buy Merchandise`, `Stock Sites`], 
      [`toBilling`, `toStore`, `toStockSite`], 
      [`/store/billings/${Store.log_md5}`, `/store/`, `/maps/store/set/${Store.log_md5}/`]]

    return [`nav`, `.@_t00`, 
      `.@_uHC`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY`, [[
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `.@_tXa`, `&@href>/feed/`, `@corrde`], [
                `span`, `.@_tCc _pV4`, `~@vendor`]]], [
              `div`, `.@_QZg _gxM _aA2`, [ModelStoreAddress]],
              this.StockSites(Store, u_md5),
              this.listStoreServices(),
              this.inModal({id: `StoreSettings`, in: this.aPoolModal(Settings[0], Settings[1], Settings[2])})]]]]]]]];
  },

  retailStore (Stores, Retail, u_md5) {

    let ModelRetailClass = []

    let ModelRetailClassSet = [];

    let ModelAddStock = [];

    let ModelStock = [];

    if (Retail.vServiceClass === false && Retail.u_md5 === u_md5) {

      ModelRetailClassSet = [`div`, `.@_gM_a _agM _guZ`, [[`a`, `#@listRetailServices`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Choose Service`]]]

    } 

    else if (Retail.vServiceClass !== false && Retail.u_md5 === u_md5) {

      ModelRetailClassSet = [`div`, `.@_gM_a _agM _guZ`, [[`a`, `#@StoreSettingsSet`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Settings`]]];
    }

    if (Retail.vServiceClass !== false) ModelRetailClass = [`span`, `.@_aA6`, `~@${Retail.vServiceClass}`];

    if (Retail.u_md5 === u_md5) ModelAddStock = [`a`, `#@toModelSets`, `.@_tX SellColor`, `&@href>javascript:;`];

    let RetailStock = [];

    if (Retail.Stock.length > 0) {

      RetailStock = Retail.Stock.sort((a,b) => {return b.log_secs - a.log_secs});

      RetailStock = RetailStock.slice(0, 50);
    }

    ModelStock = [
      `section`, `.@gvQ pQ0`, `&@style>margin: 0 0 10px`, [[
        `section`, `.@cX3 _ss7`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3`, [[`span`, `.@a2X _aA2`, `~@Products`]]], [
                `div`, `.@_QZg _gxM cX5`, [ModelAddStock]]]]]], [
            `div`, [[`div`, `.@_gZy`, this.Stock(Stores, RetailStock)]]]]]]]]]
    
    if (Retail.u_md5 === u_md5 && Retail.Stock.length === 0) {

      ModelStock = [
      `div`, `.@_cX3`, [[
        `div`, `&@style>padding:24px 0`, `.@_gxQ`, [[
          `span`, `.@_tXx _uHg`, `~@Add Products to your Stock`], [
          `div`, `.@_gyQ`, [[
            `span`, `.@_Qtx`, `&@style>padding:24px 0`, `~@Post product pictures, price tags and more details for your customers.`]]], [
          `div`, `.@_gxQ`, `&@style>padding: 0 0 24px`, [[
            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@toModelSets`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Get Started`]]]]]]]]]
    }

    return [`main`, `&@style>overflow:hidden`, `#@gM`, [
      this.feedControls(), [
        `main`, `.@_xC2 _aA2`, `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;background:#f3f4f7`, [[
          `section`, `&@style>margin: 70px 0`, [[
            `div`, `.@_sZ2 _cX3 cX0`, [[
              `div`, `.@_gcQ aXZ sZ2 _uZM _aA0 _aA2`, [[
                `div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                  `div`, [this.listvServicesAvatr(Retail)]], [
                  `div`, `.@_eYG`, [[
                    `div`, `.@_QxM`, [[`a`, `.@_tXx _aA2`, `~@${Retail.vServiceSet}`, `&@href>/store/${Retail.log_md5}/`]]], [
                    `div`, `#@mini`, `.@_gxM _geQ`, [
                    ModelRetailClass, [
                    `span`, `.@_aA6 _tXx _axS`, `~@${Retail.vServiceRating}`], 
                    this.reqs_per_polyg(Retail.vServiceRating)/*, [
                `span`, `.@_axS _aA6 _a2X`, `~@ ${U.polygs_mail} reviews | ${this.pre_utc(U.pre_utc)}`]*/]]]]]], [
                `div`, `.@_QZg _gMz`, [[
                  `div`, `.@_axS`, [ModelRetailClassSet]]]]]]]], ModelStock]]]]]]
  },

  listStoreServices () {

    let Services = [
      `Body & Beauty Products`,
      `Clothing & Accessories`, 
      `Drinks & Beverages`, 
      `Gadgets & Electronics`, 
      `Food & Kitchen`, 
      `Furniture`,
      `Sports & Gaming`];

    let ModelServices = [];

    Services.forEach(S => {

      ModelServices.push([
        `div`, `.@_-zZx`, `@team`, [[
          `div`, `.@_gxM _gcQ _geQ _-zZx`, [[
            `label`, `.@_tXv`, `&@role>radio`, [[
              `input`, `&@for>`, `&@type>radio`, `#@storeServiceSet`, `&@value>${S}`, `&@name>service`], [
              `span`, `.@_tCw _aA2 _tXx`, `&@style>margin-bottom: 2px`, `~@${S}`]]]]]]])
    });

    return [
      `div`, `#@retailServices`, `&@for>modal`, `.@_aAY _-Zz`, [[
        `div`, `.@_gcQ _gxM _geQ`, [[
          `div`, `.@_eYG`, `~@Select a Service`], [
          `div`, `.@_QZg`, [[
            `div`, [[`a`, `#@del`, `&@href>javascript:;`, `.@-_tX DelColor`]]]]]]], 
        [`div`, `.@_aXY`, [[`div`], [`div`, ModelServices]]]]]
  }, 

  StoreAddressSetHead () {

    return [`nav`, `.@_t00 _aA2`, 
      `.@_uHC`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY`, [[
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `.@_tXa`, `&@href>/feed/`, `@corrde`], [
                `span`, `.@_tCc _pV4 _-Zz`, `@Jobs`]]], [
              `div`, `.@_QZg`, [[
                `div`, `.@_gM_a _agM _guZ`, [[
                  `a`, `#@draggableOff`, `.@_TX_a _atX _utQ`, `&@href>#`, `~@Select Position`]]]]], [
              `div`, `#@draggableControls`, `&@for>modal`, `.@_aAY _-Zz`, [[
                `div`, `.@_gcQ _gxM _geQ`, [[
                  `div`, `.@_eYG`, `~@Tooltips`], [
                  `div`, `.@_QZg`, [[`div`, [[`a`, `#@del`, `&@href>javascript:;`, `.@-_tX DelColor`]]]]]]], [
                `div`, `.@_aXY`, [[
                  `div`], [
                  `div`, `.@_gcQ _gxQ`, [[
                    `p`, `~@Drag to pan, double click or pinch out to zoom out and pinch in or mouse wheel in to zoom in.`]]], [
                  `div`, `.@_gcQ _gxQ`, [[
                    `p`, `~@When in focus of your peripheral locale click on the "Select Position" on the top right corner to enable position selection, single click on a point to assign location.`]]], [
                  `div`, `.@_gcQ _gxQ`, [[
                    `p`, `~@To undo position selection click on "Back to Map" option to revert to map zooming and panning`]]]]]]], [
              `div`, `#@storeAddressPlace`, `&@for>modal`, `.@_aAY _-Zz`, [[
                `div`, `.@_gcQ _gxM _geQ`, [[
                  `div`, `.@_eYG`, `~@Tooltips`], [
                  `div`, `.@_QZg`, [[`div`, [[`a`, `#@del`, `&@href>javascript:;`, `.@-_tX DelColor`]]]]]]], [
                `div`, `.@_aXY`, [[
                  `div`], [
                  `div`, `.@_gcQ _gxQ`, [[
                    `div`, `.@g00 _gxM yZS _geQ`, [[
                      `a`, `.@-_tX GeoGray`, `&@href>javascript:;`, `&@style>width:15px;height:15px;margin-right:8px`], [
                      `p`, `#@coord`, `.@_aA2 _tXx`, `~@0, 0`]]]]], [
                  `div`, `.@_gcQ _gxQ`, [[
            `div`,`&@style>margin: 0 0 10px`, `.@_gcQ _aXZ`, [[
              `div`, `.@_axS`, [[
                `div`, `.@_gM_a _agM _guZ _-Zz`, [[`a`, `@foldVService`, `.@_TX_a _atX _utQ`, `&@href>javascript:;`, `@Close`]]]]], [
              `div`, `.@_dMG _geQ _aA2`, [[`span`, `.@tXx`, `~@`]]], [
              `div`, `.@_QZg _gMz`, [[`div`, `.@_gM_a _agM _guZ`, [[`a`, `#@StoreAddressSet`, `.@_TX_a _atX _utQ`, `&@href>javascript:;`, `~@Save`]]]]]]]]]]]]]]]]]]]]];
  },

  StoreAddressSet () {

    return [`span`, `&@style>overflow:hidden`, `#@root`, [
      this.feedControls(), [
      `main`, `.@_xC2 _aA2 xC3`, `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;background:#f3f4f7`, [[
        `section`, `#@map`, [[`svg`, `.@_aXZ _gmg`]]]]], [
      `section`, `.@_-Zz`, `&@style>position:absolute;top:0;right:0;z-index:2`, [[
        `div`, [[`div`, `.@geQ _sQ0`, [[`a`, `.@-_tX FilterColor`, `&@href>javascript:;`, `&@style>width: 20px; height: 20px`]]]]]]]]]
  },

  StoreAssetSet () {

    return [
      `div`, `&@style>letter-spacing:0.75px`, [[
        `div`, `.@_gcQ _aXZ`, [[
          `div`, `.@_axS`, [[
            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@foldModelStockFile`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Exit`]]]]], [
          `div`, `.@_dMG _geQ _aA2`, [[`span`, `.@_tXx`, `~@Product Thumbnail`]]], [
          `div`, `.@_QZg _gMz`, [[`div`, `.@_gM_a _agM _-Zz`, [[`a`, `#@StoreAssetSet`, `.@_TX_a _atX`, `&@href>javascript:;`, `~@Save`]]]]]]], [
        `div`, `.@_aXY _XsQ _aA2`, [[
            `div`, `.@_sZ2`, [[
              `div`, `.@_4sC _dMG _sZ2`, [[
                `label`, `&@style>width:183px;height:244px;border-radius: 2px`, `.@_cCq _pV2 _gS6`, `#@thumbnailSet`, `&@for>file`, [[
                  `img`, `#@thumbnailSet`, `.@_aWz`]]], [
                `p`, `.@_axX`, `~@Click on gray space to upload or change photo`], 
                this.inputFile()]]]]]]]]
  },

  StockSet () {

    return [
      `div`, `&@style>letter-spacing:0.75px`, [[
        `div`, `.@_gcQ _aXZ`, [[
          `div`, `.@_axS`, [[
            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@StockSetFold`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Exit`]]]]], [
          `div`, `.@_dMG _geQ _aA2`, [[`span`, `.@_tXx`, `~@Product Description`]]], [
          `div`, `.@_QZg _gMz`, [[`div`, `.@_gM_a _agM`, [[`a`, `#@StockSet`, `.@_TX_a _atX`, `&@href>javascript:;`, `~@Save`]]]]]]], [
        `div`, `.@_aXY _XsQ _aA2`, [[
          `div`, `.@_yZS gxM _geQ gMX _xC3`, `&@style>margin: 10px 0 0`, [[
            `div`, `.@_yZS _gMX eYG uZM`, [[
              `div`, `.@_UFA cS2 _gMX`, [[
                `input`, `#@itemValue`, `.@_RRD Ccs _aA2 _pVa`, `&@autocomplete>off`, `&@placeholder>Item Name`]]]]]]], [
              `div`, `.@_yZS gxM _geQ gMX _xC3`, [[
                `div`, `.@_yZS _gMX eYG uZM`, [[
                  `div`, `.@_UFA cS2 _gMX`, [[
                    `input`, `#@itemPrice`, `.@_RRD Ccs _aA2 _pVa`, `&@autocomplete>off`, `&@placeholder>Price in USD`]]]]]]], [
              `div`, `.@_sZ2`, [[
                `div`, `.@_yZS _gxM geQ gMX`, [[
                  `span`, `.@_aA2 _tXx`, `~@Customer Designation/Gender`]]], [
                `div`, `.@_gZy`, [[
                  `div`, `.@_qXq`, [[
                    `label`, `.@_tXv`, `&@role>radio`, [[
                      `input`, `&@type>radio`, `#@AssetSex`, `&@value>Men`, `&@name>alert-level-ejs`], [
                      `span`, `.@_tCw aA2 tXx`, `~@Men`]]]]], [
                  `div`, `.@_qXq`, [[
                    `label`, `.@_tXv`, `&@role>radio`, [[
                      `input`, `&@type>radio`, `#@AssetSex`, `&@value>Women`, `&@name>alert-level-ejs`], [
                      `span`, `.@_tCw aA2 tXx`, `~@Women`]]]]], [
                            `div`, `.@_qXq`, [[
                              `label`, `.@_tXv`, `&@role>radio`, [[
                                `input`, `&@type>radio`, `#@AssetSex`, `&@value>Unisex`, `&@name>alert-level-ejs`], [
                                `span`, `.@_tCw aA2 tXx`, `~@Unisex`]]]]], [
                            `div`, `.@_qXq`, [[
                              `label`, `.@_tXv`, `&@role>radio`, [[
                                `input`, `&@type>radio`, `#@AssetSex`, `&@value>Kids`, `&@name>alert-level-ejs`], [
                                `span`, `.@_tCw aA2 tXx`, `~@Kids`]]]]], [
                            `div`, `.@_qXq`, [[
                              `label`, `.@_tXv`, `&@role>radio`, [[
                                `input`, `&@type>radio`, `#@AssetSex`, `&@value>Other`, `&@name>alert-level-ejs`], [
                                `span`, `.@_tCw aA2 tXx`, `~@Other`]]]]]]]]], [
              `div`, `.@_yZS gxM _geQ gMX _xC3`, [[
                `div`, `.@_yZS _gMX eYG uZM`, [[
                  `div`, `.@_gMX -Zz`, [[
                    `div`, `.@_yZS _gxM _geQ _gMX`, [[
                      `textarea`, `&@style>background: none`, `#@itemDesc`, `.@-_tyq _aA2`, `&@autocomplete>off`, `&@placeholder>item description`]]]]]]]]]]]]]
  },

  Stock (Stores, Stock) {

    //Stock.sort((a, b) => {return b.rating - a.rating})

    let ModelStock = [];

    Stock.forEach(Asset => {

      let ModelDealCut = [
        `div`, `.@_gxM`, `&@style>justify-content:center`, [[
          `div`, `.@_geQ _gxM`, `&@style>justify-content:center`, [[
            `span`, `#@denom`, `.@a00`, `&@style>color: #222222 !important; font-weight: 700`, `~@$`], [
            `span`, `#@denomValue`, `&@usd>${Asset.asset_USD}`, `&@style>color: #222222 !important; font-weight: 700; margin-left: 3px`, `~@${Asset.asset_USD}`]]]]]

      if (Stores.Dailies[1].indexOf(Asset.asset_md5) > -1) {

        let Deal = Stores.DealsMap[Stores.Dailies[0][Stores.Dailies[1].indexOf(Asset.asset_md5)]];

        ModelDealCut = [
        `div`, `.@_gxM`, `&@style>justify-content:center`, [[
          `div`, `.@_geQ _gxM`, `&@style>justify-content:center`, [[
            `span`, `#@denom`, `&@style>color: #919191 !important; font-weight: 700; text-decoration-line: line-through`, `~@$`], [
            `span`, `#@denomValue`, `&@usd>${(Asset.asset_USD)}`, `&@style>color: #919191 !important; font-weight: 700; text-decoration-line: line-through; margin-left: 3px`, `~@${Asset.asset_USD}`]]], [
          `div`, `.@_geQ _gxM`, `&@style>justify-content:center`, [[
            `span`, `#@denom`, `.@a00`, `&@style>color: #222222 !important; font-weight: 700`, `~@$`], [
            `span`, `#@denomValue`, `&@usd>${(Asset.asset_USD * (100 - Deal.deal)/100).toFixed(2)}`, `&@style>color: #222222 !important; font-weight: 700; margin-left: 3px`, `~@${(Asset.asset_USD * (100 - Deal.deal)/100).toFixed(2)}`]]]]]
      }

      ModelStock.push([
        `div`, `.@_gQ`, [[
          `div`, `&@style>margin-bottom:10px`, [[
            `a`, `&@href>/stock/${Asset.store_md5}/${Asset.asset_md5}/`, [[
              `img`, `&@src>/${Asset.asset[0].path}`, `&@alt>${Asset.text}`, `&@style>max-width: 100%;height: auto; vertical-align:middle`]]]]], [
          `a`, `&@href>/stock/${Asset.store_md5}/${Asset.asset_md5}/`, [[
            `div`, `#@mini`, `.@_gxM _geQ`, `&@style>justify-content:center`, [[
              `span`, `.@_aA6 _tXx axS`, `~@${Asset.rating}`], 
              this.reqs_per_polyg(Asset.rating), [
              `span`, `.@_axS _aA6 _a2X`, `~@ ${Asset.mail.length} reviews`]]], [`span`, `.@_aA2 tXx`, `~@${Asset.asset_alt}`]]], [
          `div`, `&@style>margin-top:3px; font-size: 11px`, [ModelDealCut]]]])
    })

    return ModelStock;    
  }, 

  StoreStockHead (Stock, u_md5) {

    let nullJS = `javascript:;`

    let A = [[`Cart`, `Orders`, `Wishlist`], [`toCartSet`, `toOrders`, `toWishlist`], [nullJS, nullJS, nullJS]]

    return [`nav`, `.@_t00`, 
      `.@_uHC`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY`, [[
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `.@_tXa`, `&@href>/feed/`, `@corrde`], [
                `span`, `.@_tCc _pV4 _-Zz`, `~@vendor`]]], [
              `div`, `.@_QZg _gxM _aA2`, [[
                `a`, `#@toCartServices`, `.@-_tX CartGray`, `&@href>javascript:;`, `@style>width: 20px; height: 20px`]]], [
              `div`, `#@cartServices`, `&@for>modal`, `.@_aAY _-Zz`, [[
                `div`, `.@_gcQ _gxM _geQ`, [[`div`, `#@cartService`, `.@_eYG`, `@My Orders`], [
                `div`, `.@_QZg`, [[
                  `div`, [[`a`, `#@del`, `&@href>javascript:;`, `.@-_tX DelColor`]]]]]]], [
                `div`, `.@_aXY`, `&@style>text-align:center`, [this.aPoolModal(A[0], A[1], A[2])]]]], [
              `div`, `#@toCart`, `&@for>modal`, `.@_aAY _-Zz`, [[
                `div`, `.@_gcQ _gxM _geQ`, [[`div`, `#@cartAlt`, `.@_eYG`], [
                `div`, `.@_QZg`, [[
                  `div`, [[`a`, `#@del`, `&@href>javascript:;`, `.@-_tX DelColor`]]]]]]], [
                `div`, `#@listCart`, `.@_aXY`, []]]]]]]]]]]];
  },

  StoreStock (Stock, u_md5, Stores) {

    let Store = Stores.StoresMap[Stock.store_md5];

    let ModelHearts = [`a`, `#@rateStock`, `.@-_tX HeartsGray`, `&@href>javascript:;`];

    let ModelCartSet = [];

    let ModelStockSites = [];

    let ModelDealCut = [
        `div`, `.@_dMG _geQ _aA2 _tXx _gxM`, [[
          `span`, `#@SaleValue`, `&@usd>${(Stock.asset_USD)}`, `&@style>padding: 0 15px; color: #222222;`, `.@_tXx`, `~@$${Stock.asset_USD} USD`]]];

    if (Stores.Dailies[1].indexOf(Stock.asset_md5) > -1) {

      let Deal = Stores.DealsMap[Stores.Dailies[0][Stores.Dailies[1].indexOf(Stock.asset_md5)]];

      ModelDealCut = [
        `div`, `.@_dMG _geQ _aA2 _tXx _gxM`, [[
          `span`, `#@SaleValue`, `&@usd>${(Stock.asset_USD)}`, `&@style>padding: 0 15px; color: #919191;text-decoration-line: line-through`, `.@_tXx`, `~@$${Stock.asset_USD} USD`], [
          `span`, `#@SaleValue`, `&@usd>${(Stock.asset_USD * (100-Deal.deal)/100).toFixed(2)}`, `&@style>padding: 0 15px; color: #222222`, `.@_tXx`, `~@$${(Stock.asset_USD * (100-Deal.deal)/100).toFixed(2)} USD`]]]
    }

    if (Stock.ratings.indexOf(u_md5) > -1) ModelHearts = [`a`, `#@rateStock`, `.@-_tX HeartsColor`, `&@href>javascript:;`];

    if (Stock.u_md5 !== u_md5) {

      ModelCartSet = [
        `div`, `.@_yZS gxM _geQ gMX uZM`, [[
          `div`, `.@yZS _gMX _eYG _xC3`, [[
            `div`, `.@_eYG`, [[
              `div`, `.@_gxM _gMX`, [[
                `div`, `.@_gMX gcQ`, [[
                  `div`, `.@_gM_a _agM _guZ _gMX`, `&@style>max-width: 450px`, [[
                    `a`, `.@_TX_a _atX _utQ _gMX`, `#@CartSet`, `&@href>javascript:;`, `~@Add to Cart`]]]]]]]]]]]]]
    }

    if (Store.vServiceAddress.length > 0) {

      ModelStockSites = [
        `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
          `div`, `.@yZS _gMX _eYG _xC3`, [[
            `div`, `.@eYG _ZSg _gxM _geQ`, this.StockSitesSliced(Store.vServiceAddress)]]]]]
    }

    let ModelStockPath = []

    if (Stock.asset_set_type) {

      ModelStockPath = [
        `div`, `.@_yZS _gxM _geQ _gMX _xC3`, [[
          `div`, `.@_yZS _gxM _geQ`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
            `div`, [/*this.listvServicesAvatr(Store)*/]], [
            `div`, `.@_eYG`, [[
              `div`, `.@_QxM`, [[
                `a`, `&@style>text-decoration:underline`, `.@_tXx aA2`, `~@${Stock.asset_set} > ${Stock.asset_set_type}`, `&@href>/category/${(Stock.asset_set_type).toLowerCase()}/`]]]/*, [
                        `div`, `#@mini`, `.@_gxM _geQ`, [[
                          `span`, `.@_aA6 _tXx axS`, `~@${Store.vServiceRating}`], 
                          this.reqs_per_polyg(Store.vServiceRating)]]*/]]]]]]]]


    }

    return [`main`, `&@style>overflow:hidden`, `#@gM`, [
      this.feedControls(), [
        `main`, `.@_xC2 _aA2`, `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;background:#f3f4f7`, [[
          `section`, `&@style>margin: 70px 0 70px`, `.@_ss7`, [[
            `div`, [[
              `div`, `.@_aGX`, [ModelStockPath, [
                `div`, `.@_uxq`, [[
                  `div`, `.@_`, [[
                    `div`, `.@_`, [[
                      `div`, `.@_gef`, [[
                        `div`, `&@style>padding-bottom:${Stock.asset[0].span[1]/Stock.asset[0].span[0]*100}%`, `.@_g0z`, [[
                          `img`, `.@_aMz _gVm`, `&@src>/${Stock.asset[0].path}`]]], [`div`, `.@_gVm`]]]]]]], [
                  `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
                    `div`, `.@yZS _gMX _eYG _xC3`, [[
                      `div`, `.@_gcQ _aXZ`, [[
                        `div`, `.@axS`, [[`a`, `.@-_tX ArchiveGray`, `&@href>javascript:;`]]], ModelDealCut, [
                        `div`, `.@_QZg _gMz`, [ModelHearts]]]]]]]], [
                  `div`, `.@_yZS gxM _geQ gMX uZM`, [[
                    `div`, `.@yZS _gMX _eYG _xC3`, [[
                      `div`, `.@_eYG`, [[
                        `div`, `.@_QxM`, [[`span`, `.@_tXx _aA2`, `~@${Stock.asset_alt}`]]], [
                        `div`, `#@mini`, `.@_gxM _geQ`, [[
                          `span`, `.@_aA6 _tXx axS`, `~@${Stock.rating}`], 
                          this.reqs_per_polyg(Stock.rating), [
                          `span`, `.@_axS _aA6 _a2X`, `~@ ${Stock.mail.length} reviews`]]]]]]]]],
                  ModelStockSites, 
                  ModelCartSet, [
                  `div`, `.@_yZS gxM _geQ gMX _uZM`, [[
                    `div`, `.@yZS gMX _eYG _xC3`, [[`span`, `.@_eYG _Qtx`, `~@${Stock.text}`]]]]], [
            `div`,`#@hide-pfolio-mail`, `.@_-Zz _geQ _uZM`, [[
                `div`, `.@yZS gMX _eYG _xC3`, [[
                  `div`, `.@_gMX -Zz`, [[
                    `div`, `.@_yZS _gxM _geQ _gMX`, [[
                      `textarea`, `&@style>background: none`, `#@pfolio-mail`, `.@-_tyq _aA2`, `&@autocomplete>off`, `&@placeholder>Write a comment about this post`]]]]], [
                        `div`, `.@_gcQ _aXZ _-Zz`, [ [
                          `div`, `.@_eYG _geQ _aA2`, [[`span`, `.@_tXx`, `~@`]]], [
                          `div`, `.@_QZg _gMz`, [[
                          `div`, `.@_axS`, [[
                            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@add-pfolio-mail`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Send`]]]]]]]]]]]]], [
            `div`, `.@_yZS gxM _geQ gMX uZM _sZ2 _-Zz`, [[
                `div`, `#@polyg-mail`, `.@_sZ2 _aXZ _xC3`, /*this.storyMail(A.mail, B)*/]]]]]]]]]]]]]]]
  }, 

  StockPayHead () {

    return [`nav`, `.@_t00`, 
      `.@_uHC`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY`, [[
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `.@_tXa`, `&@href>/feed/`, `@corrde`], [
                `span`, `.@_tCc _pV4 _-Zz`, `~@vendor`]]], [
              `div`, `.@_QZg _gxM _aA2`, []]]]]]]]]];
  },

  StockPay () {

    return [`main`, `&@style>overflow:hidden`, `#@gM`, [
      this.feedControls(), [
        `main`, `.@_xC2 _aA2`, `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;background:f3f4f7`, [[
          `section`, `&@style>margin: 70px 0 70px`, `.@_ss7`, [[
            `div`, [[
              `div`, `.@_aGX`, [[
                `div`, `#@payfor`], [
                `div`, [[
                  `div`, `.@_sZ2`, [[
                    `div`, `.@_cX3`, [[
                      `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                        `div`,`.@_gxM cX3`, [[`span`, `.@a2X _aA2`, `~@Choose Payment Method`]]]]]]]]], [
                  `div`, `&@style>border: 1px solid #e4e4e4;border-radius:4px;width: 100%`, `.@_sZ2`, [[
                    `div`, `&@style>margin:0 0 2rem;padding: 0 2rem`, [[
                      `span`, `&@style>border-top: 1px solid #e4e4e4;margin: 0 0 2rem`], [
          `div`, `.@cX3`, [[
            `div`, `.@gcQ _aA0 _aA2`, [[
              `div`, `.@_-zZx`, `@team`, [[
                `div`, `.@_gxM _gcQ _geQ _-zZx`, [[
                  `label`, `.@_tXv`, `&@role>radio`, [[
                    `input`, `&@for>`, `&@type>radio`, `#@payChannel`, `&@value>flutterwave`, `&@name>service`], [
              `span`, `.@_tCw _aA2 _tXx`, `&@style>margin-bottom: 2px`, `~@flutterwave`]]]]]]]]]]]]]]]]]]]]]]]]]]]
  },

  CartXMLHead () {

    return [[`?xml`, `&@version>1.0`, `&@encoding>utf-8`]];
  },

  CartXMLOrder () {

    return [[
              `PesapalDirectOrderInfo`, 
              `&@Amount>5`, 
              `&@Description>Demo Order`,
              `&@Type>MERCHANT`,
              `&@Reference>${Date.now()}`,
              `&@FirstName>Mann`,
              `&@LastName>Asugo`,
              `&@Email>mannasugo@gmail.com`,
              `&@xmlns>http://www.pesapal.com`]];
  },

  topStores (Stores) {

    let Retail = Stores.Stores;

    Retail.sort((a,b) => {return b.vServiceRating - a.vServiceRating})

    let ModelStores = [];

    Retail.forEach(Store => {

      let Asset = {
        path: `gp/p/vector/polyg_mug.svg`,
        span: [700, 350]
      }

      if (Store.Stock.length > 0) Asset = Store.Stock[Store.Stock.length - 1].asset[0];

      let plane_x = ``;

      let plane_y = `200`;

      if (Asset.span[1] < Asset.span[0]) {

        plane_y = (Asset.span[1]/(Asset.span[0]/2)*100);

        if (Asset.span[1] < Asset.span[0]/2) {

          plane_y = 100;
          plane_x = `width:${((Asset.span[0]/2)/(Asset.span[1])*100)}%;`;
        }
      }

      if (Asset.span[1] > Asset.span[0]) plane_y = Asset.span[1]/(Asset.span[0]/2)*100;

      ModelStores[Retail.indexOf(Store)] = [
        `div`, `.@_X4- _rQ0 _gC0`, [[
          `div`, `.@_uxq`, [[`div`, `.@_`, [[`div`, `.@_`, [[`div`, `.@_gef`, [[
            `div`, `&@style>padding-bottom:50%`, `.@_g0z`, [[
              `img`, `&@style>${plane_x}height:${plane_y}%`, `.@_aMz _gVm`, 
              `&@src>/${Asset.path}`]]], [`div`, `.@_gVm`]]]]]]], [
            `div`, `.@_yZS _gxM _geQ _gMX _xC3`, [[
              `div`, `.@_yZS _gxM _geQ`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                `div`, `.@eYG _gxM _geQ`, [[
                  `p`, `.@_aA6`, `~@${Store.vServiceRating}`],
                  this.reqs_per_polyg(Store.vServiceRating)]]]]]]]]]], [
          `div`, `.@_yZS _gxM _geQ _gMX _xC3`, [[
            `div`, `.@_yZS _gxM _geQ`, [[`div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
              `div`, `.@_eYG`, [[
                `div`, `.@_QxM`, [[`a`, `.@_tXx aA2`, `~@${Store.vServiceSet}`, `&@href>/store/${Store.log_md5}/`]]]]], [
              `div`, [this.listvServicesAvatr(Store)]]]]]]]]]];
    })

    return ModelStores;
  },

  feed (A, B, Stores) {

    let RateStock = [];

    if (Stores.Stock.length > 0) {

      RateStock = Stores.Stock.sort((a,b) => {return b.log_secs - a.log_secs});

      RateStock = RateStock.slice(0, 15);
    }

    //Stores.Stock.sort((a,b) => {return b.rating - a.rating});

    return [`main`, `&@style>overflow:hidden`, `#@gM`, [
      this.feedControls(), [
        `main`, `.@_xC2 _aA2`, `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;background:#f3f4f7`, [
        this.md5Alerts(B), [
        `section`, `&@style>margin-top: 70px`, `.@cX3 _ss7`, []], [
        `section`, `.@cX3 _ss7`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3 _eYG`, [[`span`, `.@a2X _aA2`, `~@Popular Vendors`]]], [
                `div`, `.@_QZg _gxM _-Zz`, [[`a`, `#@add-stories-ejs`, `.@_tX AddStoriesColor`, `&@href>/portfolio/`]]]]]]], [
            `div`,`.@_gxM _geQ _gMX`, [[
              `div`, `.@miY _gMX`, [[
                `div`, `#@skilled-slide-ejs`, `.@_AZc`, [[
                  `div`, [[`div`, `.@_AZx ava`, [[`div`, `#@skilled-rotate-ejs`, `.@_AZs _gxM`, this.topStores(Stores)]]]]]]]]]]]]]]],
        this.ModelDeals(Stores, 5, `daily`), [
        `section`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3`, [[`span`, `.@a2X _aA2`, `~@New Products`]]], [
                `div`, `.@_QZg _gxM cX5`, []]]]]], [
            `div`, [[`div`, `.@_gZy`, this.Stock(Stores, RateStock)]]]]]]]]]]]
  },

  appRoot (A, Stores) {

    let RateStock = [];

    if (Stores.Stock.length > 0) {

      RateStock = Stores.Stock.sort((a,b) => {return b.log_secs - a.log_secs});

      RateStock = RateStock.slice(0, 15);
    }

    return [
      `main`, `.@_xC2 _aA2`, `&@style>letter-spacing: .75px;line-height:1.5rem`, [[
        `section`, `.@_g29 _sZ2`, `&@style>line-height:1.5rem`, [[
          `div`, `.@_cX3`, [[
            `div`, `.@_gxQ _gxM _X2Y _gxZ`, `&@style>min-height:250px`, [[
              `div`, `.@_gxQ _gQ0 _S8Y _c3x`, [[
                `h1`, `.@_tx1 _atX`, `~@The Vendors Hub ™`]]], [
              `div`, `.@_ge0 _c3x _Qtx`, [[
                `div`, `~@Buy or Sell with our free subscription marketplace for freelance vendors and retail stores. We facilitate ecommerce for buyers and vendors' needs by streamlining the functionality overhead.`], [
                `div`, `&@style>padding: 24px 0`, [[
                  `div`, `.@QZg`, [[
                    `div`, `.@_gM_0 _agM _guZ gMX`, `&@style>max-width: 450px`, [[
                      `a`, `.@_TX_a _atX _utQ _gMX _aA0`, `&@href>/signup/`, `~@sign up for free`]]]]]]]]]]]]]]],
        this.ModelDeals(Stores, 5, `daily`), [
        `section`, `.@cX3 _ss7`, [[
          `div`, `.@sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3 _eYG`, [[`span`, `.@a2X _aA2`, `~@Top Categories`]]], [
                `div`, `.@_QZg _gxM _-Zz`, [[`a`, `#@add-stories-ejs`, `.@_tX AddStoriesColor`, `&@href>javascript:;`]]]]]]], [
            `div`, [[`div`, `.@_gZy`, this.topStock()]]]]]]], [
        `section`, `.@cX3 _ss7 _-Zz`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3 _eYG`, [[`span`, `.@a2X _aA2`, `~@Popular Vendors`]]], [
                `div`, `.@_QZg _gxM _-Zz`, [[`a`, `#@add-stories-ejs`, `.@_tX AddStoriesColor`, `&@href>/portfolio/`]]]]]]], [
            `div`,`.@_gxM _geQ _gMX`, [[
              `div`, `.@miY _gMX`, [[
                `div`, `#@skilled-slide-ejs`, `.@_AZc`, [[
                  `div`, [[`div`, `.@_AZx ava`, [[`div`, `#@skilled-rotate-ejs`, `.@_AZs _gxM`, this.topStores(Stores)]]]]]]]]]]]]]]], [
        `section`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3`, [[`span`, `.@a2X _aA2`, `~@New Products`]]], [
                `div`, `.@_QZg _gxM cX5`, []]]]]], [
            `div`, [[`div`, `.@_gZy`, this.Stock(Stores, RateStock)]]]]]]], [
        `section`, `.@_aGX _-Zz`, [[
          `div`, `.@_cX3`, [[
            `div`, `.@_sZ2`, [[
              `div`, `.@_gxM _gMX`, `&@style>margin: 25px 0`, [[
                `div`, `.@_geQ _gMX`, [[`span`, `.@-_tX vServiceGray`, `&@style>width: 100px; height:100px`]]]]], [
              `div`, `&@style>padding: 0 24px`, [[
                `div`, `.@_gxQ`, [[
                  `span`, `.@_utQ`, `&@style>font-size:17px`, `~@Vendor Service`], [
                  `span`, `.@_Qtx`, `&@style>padding:10px 0`, `~@Our vendor services helps store owners set up shop for selling products on order. It also provides a diverse marketplace for clients and customers to find products preferable to their budget and functional convenience.`]]]]]]]]], [
            `div`, `.@_sZ2`, [[
              `div`, `.@_gxM _gMX`, `&@style>margin: 25px 0`, [[
                `div`, `.@_geQ _gMX`, [[`span`, `.@-_tX cServiceGray`, `&@style>width: 100px; height:100px`]]]]], [
              `div`, `&@style>padding: 0 24px`, [[
                `div`, `.@_gxQ`, [[
                  `span`, `.@_utQ`, `&@style>font-size:17px`, `~@Shipping & Delivery`], [
                  `span`, `.@_Qtx`, `&@style>padding:10px 0`, `~@You can facilitate shipping products to your customers after checkout with our courier hailing service. Users can also earn by participating in delivery and shipping as our operational model allows third party deliveries.`]]]]]]], [
            `div`, `.@_sZ2`, [[
              `div`, `.@_gxM _gMX`, `&@style>margin: 25px 0`, [[
                `div`, `.@_geQ _gMX`, [[`span`, `.@-_tX GeoLightGray`, `&@style>width: 70px; height:70px`]]]]], [
              `div`, `&@style>padding: 0 24px`, [[
                `div`, `.@_gxQ`, [[
                  `span`, `.@_utQ`, `&@style>font-size:17px`, `~@Geolocation`], [
                  `span`, `.@_Qtx`, `&@style>padding:10px 0`, `~@By using our comprehensive mapping service you can find vendors and stores near you.`], [
                  `span`, `.@_Qtx`, `&@style>padding:10px 0`, `~@Set reliable business and address location with our mapping service to enhance your shipping and delivery services.`]]]]]]]]], [
        `section`, `.@_sZ2 _g29`, [[
          `div`, `.@_cX3 _aA0`, [[
            `div`, `&@style>padding:24px 0`, `.@_gxQ`, [[
              `span`, `~@Need any assistance? We now have a fully operational support team to tackle your requests or improve on your suggestions.`]]], [
            `div`, `.@_gxQ`, `&@style>padding: 0 0 24px`, [[
              `div`, `.@_gM_0 _agM _guZ`, [[`a`, ``, `.@_TX_a _atX qXS _utQ _aA0`, `&@href>/support/`, `~@Request Support`]]]]]]]]], [
        `section`, `.@cX3 _ss7 _-Zz`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3`, [[`span`, `.@a2X _aA2`, `~@Popular Portfolios`]]], [
                `div`, `.@_QZg _gxM cX5`, [[`a`, `@_tX SellColor`, `&@href>javascript:;`]]]]]]], [
            `div`,`.@_gxM _geQ _gMX`, [[
              `div`, `.@miY _gMX`, [[
                `div`, `#@jobs-slide`, `.@_AZc`, [[
                  `div`, [[`div`, `.@_AZx ava`, [[`div`, `#@jobs-rotate`, `.@_AZs _gxM`, this.popular_y_scroll(A)]]]]]]]]]]]]]]]]]
  }, 

  StoreBillingsHead () {

    return [`nav`, `.@_t00`, 
      `.@_uHC`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY`, [[
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `.@_tXa`, `&@href>/feed/`, `@corrde`], [
                `span`, `.@_tCc _pV4`, `~@billing`]]], [
              `div`, `.@_QZg _gxM _aA2`, [`ModelStoreAddress`]]]]]]]]]];
  },

  StoreBillings (Store) {

    return [`main`, `&@style>overflow:hidden`, `#@gM`, [
      this.feedControls(), [
        `main`, `.@_xC2 _aA2`, `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;background:f3f4f7`, [[
          `section`, `&@style>margin: 70px 0 70px`, `.@_ss7`, [[
            `div`, [[
              `div`, `.@_aGX`, [[
                `div`, `.@_cX3`, [[
                  `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                    `div`,`.@_gxM cX3 _eYG`, [[`span`, `.@_aA2`, `~@Store Balance`]]], [
                  `div`, `.@_QZg _gxM`, [[`span`, `.@_aA6 _tXx`, `~@$ ${Store.Balance}`]]]]]]], [
                `div`, [[
                  `div`, `.@_sZ2`, [[
                    `div`, `.@_cX3`, [[
                      `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                        `div`,`.@_gxM cX3`, [[`span`, `.@a2X _aA2`, `~@Choose Withdrawal Method`]]]]]]]]], [
                  `div`, `&@style>border: 1px solid #e4e4e4;border-radius:4px;width: 100%`, `.@_sZ2`, [[
                    `div`, `&@style>margin:0 0 2rem;padding: 0 2rem`, [[
          `div`, `.@_yZS gxM _geQ gMX _xC3`, `&@style>margin: 10px 0 0`, [[
            `div`, `.@_yZS _gMX eYG uZM`, [[
              `div`, `.@_UFA cS2 _gMX`, [[
                `input`, `#@sale`, `.@_RRD Ccs _aA2 _pVa`, `&@autocomplete>off`, `&@style>margin-bottom:2.7rem`, `&@placeholder>amount to withdraw in dollars`]]]]]]], [
                      `span`, `&@style>border-top: 1px solid #e4e4e4;margin: 0 0 2rem`], [
                      `div`, `.@cX3`, [[
                        `div`, `.@gcQ _aA0 _aA2`, [[
                          `div`, `.@_-zZx`, `@team`, [[
                            `div`, `.@_gxM _gcQ _geQ _-zZx`, [[
                              `label`, `.@_tXv`, `&@role>radio`, [[
                                `input`, `&@for>`, `&@type>radio`, `#@payChannel`, `&@value>MPESA`, `&@name>service`], [
                                `span`, `.@_tCw _aA2 _tXx`, `&@style>margin-bottom: 2px`, `~@MPESA`]]]]]]]]]]]]]]]]]]]]]]]]]]]
  },

  StockSiteAva (Site) {

    let ModelAva = [
      `svg`, `&@style>min-height:40px;width:40px`, `&@viewBox>0 0 24 24`, [[
        `circle`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
        `text`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 9px;`, `~@${Site.adm0_a3}`]]];

    return [`a`, `@site`, `.@_cCq`, `&@style>width:40px;height:40px`, `&@href>javascript:;`, [ModelAva]]
  },

  StockSites (Store, u_md5) {

    let StockSite = Store.vServiceAddress;

    let ModelStockSites = [];

    StockSite.forEach(Site => {

      let ModelSites = []

      Site.points.forEach(Point => {

        ModelSites.push([
        `div`, `.@_-zZx`, [[
          `a`, `&@href>javascript:;`, [[
            `div`, `.@_gcQ _aA0 _aA2`, [[
              `div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                `div`, `.@_eYG`, [[
                  `div`, `.@_QxM _-Zz`, [[`span`, `.@_tXx _aA2`, `~@{Site.long_a3}`]]], [
                  `div`,`.@_gxM _geQ`, [[
                    `span`, `.@_aA6 _tXx`, `~@${Point.toString()}`]]]]]]]]]]]]])
      })

      ModelStockSites.push([
        `div`, `.@_-zZx`, `#@long_a3`, [[
          `a`, `@site`, `&@href>javascript:;`, [[
            `div`, `.@_gcQ _aA0 _aA2`, [[
              `div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                `div`, [this.StockSiteAva(Site)]], [
                `div`, `.@_eYG`, [[
                  `div`, `.@_QxM`, [[`a`, `#@site`, `.@_tXx _aA2`, `~@${Site.long_a3}`, `&@href>javascript:;`]]], [
                  `div`, `#@mini`, `.@_gxM _geQ`, [[
                    `span`, `.@_aA6 _tXx`, `~@${Site.points.length} Site(s)`]]]]]]]]]]], [
          `div`, `.@_-Zz`, `&@site>${StockSite[Site]}`, `#@sites`, ModelSites]]]);
    });

    return [
      `div`, `#@SiteServices`, `&@for>modal`, `.@_aAY _-Zz`, [[
        `div`, `.@_gcQ _gxM _geQ`, [[
          `div`, `.@_eYG`, `~@Stock Sites`], [
          `div`, `.@_QZg`, [[
            `div`, [[`a`, `#@del`, `&@href>javascript:;`, `.@-_tX DelColor`]]]]]]], 
        [`div`, `.@_aXY`, [[`div`], [`div`, ModelStockSites]]]]]
  },

  StockSitesSliced (Sites) {

    Sites.slice(0, 5);

    let ModelStockSites = [];

    Sites.forEach(Site => {

    let ModelAva = [
      `svg`, `&@title>${Site.long_a3}`, `&@style>min-height:28px;width:28px`, `&@viewBox>0 0 24 24`, [[
        `circle`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
          `text`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 10px;`, `~@${Site.adm0_a3}`]]];

      ModelStockSites[Sites.indexOf(Site)] = [
        `div`, `.@_aS0`, [[
          `a`, `.@_cCq`, `&@style>width:28px;height:28px`, `&@href>javascript:;`, [ModelAva]]]]
    })

    return [[`div`, `.@_gxM`, ModelStockSites], [`div`, `.@_QZg`, [[`a`, `@listvServices`, `.@_aA6 _tXx`, `&@href>javascript:;`, `~@${Sites.length} Stock Zones`]]]]
  },

  Monies () {

    let Monies = [
      [`American Dollars`, `usd`],
      [`Australian Dollars`, `aud`],
      [`Canadian Dollars`, `cad`],
      [`Euro`, `eur`],
      [`Japanese Yen`, `yen`],
      [`Kenyan Shillings`, `kes`],
      [`Sterling Pound`, `gbp`]
    ]

    let ModelMonies = [];

    Monies.forEach(Money => {

      ModelMonies.push([
        `li`, `.@_-zZx`, `#@long_a3`, [[
          `span`, `.@_-xQy`, `@saleMode`, `@for>${Money[1]}`, `@href>javascript:;`, [[
            `div`, `.@_gcQ _aA0 _aA2 _ZCg`, [[
              `div`, `.@_ZSg _ZCg _eYG _gcQ _ZCg`, [[
                  `div`, [[
                    `span`, `.@_cCq`, `&@style>width:32px;height:32px`, [[
                      `svg`, `&@style>min-height:32px;width:32px`, `&@viewBox>0 0 24 24`, [[
                        `circle`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
                          `text`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 9px;`, `~@${Money[1]}`]]]]]]], [
                `div`, `.@_eYG`, [[
                  `div`, `.@_QxM`, [[`a`, `#@saleMode`, `&@for>${Money[1]}`, `&@href>javascript:;`, `.@_tXx _aA2`, `~@${Money[0]}`]]]]]]]]]]]]]);
    });

    return [
      `div`, `#@Monies`, `&@for>modal`, `.@_aAY _-Zz`, [[
        `div`, `.@_gcQ _gxM _geQ`, [[
          `div`, `.@_eYG`, `~@Select Country Currency`], [
          `div`, `.@_QZg`, [[
            `div`, [[`a`, `#@del`, `&@href>javascript:;`, `.@-_tX DelColor`]]]]]]], 
        [`div`, `.@_aXY`, `&@style>max-height: calc(76vh - 70px);`, [[`ul`, `.@_aYy _tXx`, ModelMonies]]]]]
  },

  Coupon () {

    return [
      `div`,  `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;`, [[
        `div`, `.@_aXY XsQ _aA2`, `&@style>margin:0 0;max-height: calc(100vh - 140px);`, [[
        `div`, `.@_gcQ _gxM _geQ`, [[
          `div`, `.@_eYG`, `~@Discount Coupon`], [
          `div`, `.@_QZg`, [[
            `div`, [[`a`, `#@foldCoupon`, `&@href>javascript:;`, `.@-_tX DelColor`]]]]]]], [
            `div`, `.@_sZ2`, [[
              `div`, `.@_gxM _gMX`, `&@style>margin: 25px 0`, [[
                `div`, `.@_geQ _gMX`, [[`span`, `.@-_tX cServiceGray`, `&@style>width: 100px; height:100px`]]]]], [
              `div`, `&@style>padding: 0 24px`, [[
                `div`, `.@_gxQ`, [[
                  `span`, `.@_utQ`, `&@style>font-size:17px`, `~@Shopping Discount`], [
                  `span`, `.@_Qtx`, `&@style>padding:10px 0`, `~@Get 20% OFF on first checkout.`]]]]]]], [
            `div`,`&@style>margin: 0 0 30px`, `.@_gcQ _aXZ`, [[
              `div`, `.@azX- _gMX gp0 _sZ2`, `&@style>margin-top: 20px`, [[
                `div`, `.@-Zz _gxM _gMX`, [[
                  `div`, `.@_gMX gcQ`, [[
                    `div`, `.@_gM_a _agM _guZ _gMX`, `&@style>max-width: 450px`, [[
                      `a`, `.@_TX_a _atX _utQ _gMX`, `#@vendor`, `&@href>/signup`, `~@Register for Coupon`]]]]]]]]]]]]]]]
  },

  topStock () {

    let StockSet = [
      `Bags`, `Dresses`, `Ear Wear`, `Hoodies`, `Lingerie`, `Lips`, `Monitors`, `Pants`/*, `Phones`*/, `Shoes`, `Shorts`, `Sneakers`, `Tops`, `Watches`];

    let ModelStock = [];

    StockSet.forEach(Set => {

      ModelStock.push([
        `div`, `.@_gQ`, `&@style>align-items:center`, [[
          `div`, `&@style>margin-bottom:10px`, [[
            `a`, `mug`, `.@_cCq`, `&@style>width:80px;height:80px`, `&@href>/category/${Set.toLowerCase()}/`, [[
              `img`, `.@_aWz`, `&@src>/gp/p/store/assets/${Set}_stock_asset.jpg`, `&@alt>avatar`]]]]], [
          `a`, `&@href>/category/${Set.toLowerCase()}/`, [[
            `div`, `#@mini`, `.@_gxM _geQ`, `&@style>justify-content:center`, []], [`span`, `.@_aA2 tXx`, `~@${Set}`]]], [
          `div`, `&@style>margin-top:3px; font-size: 13px`, [[
            `div`, `.@_gxM`, `&@style>justify-content:center`, []]]]]])
    })

    return ModelStock;

  },

  setStockSet () {
    
    let StockSet = [
      [
        `Body & Beauty Products`, [
          `Perfumes & Deodarant`,
          `Hair Product`]],
      [
        `Clothing & Accessories`, [
          `Bags`,
          `Belts`,
          `bodysuit`,
          `bottoms`,
          `Dresses`,
          `Head Wear`,
          `Heels`,
          `Jackets`,
          `Lingerie`,
          `Optics & Eyewear`,
          `Pants`,
          `Tops`, 
          `Shoes`,
          `shorts`,
          `Sneakers`,
          `swimwear`,
          `Wallets`]], 
      [
        `Computer Parts & Components`, [
          `Monitors`]], 
      [
        `Cosmetics`, [
          `Brows`, `Eyes`, `Face`, `Lips`, `Skin`, ]],
      [
        `Food & Kitchen`, [
          `Drinks & Beverages`,
          `Pastries`]],
      [
        `Furniture`, [
          `Beds`,
          `Chairs`,
          `Couches`,
          `Kitchen Furniture`,
          `Lounge Chairs`,
          `Office Chairs`,
          `Tables & Nightstands`]],
      [
        `Gadgets & Electronics`, [
          `Ear Wear`,
          `Computing`,
          `Gaming`, 
          `Phones`,
          `UAVs`, 
          `Watches`,
          `Wearables`]], 
      [
        `Sports`, [
          `Cycling`]]]

    let ModelStockSet = [];

    StockSet.forEach((Set, e) => {

      let ModelSets = []

      Set[1].forEach((Stock, e2) => {

        ModelSets[e2] = [
          `div`, [[
            `div`, `.@_yZS _gxM geQ gMX _uZM`, [[
              `label`, `.@_tXv`, `&@role>radio`, [[
                `input`, `&@type>radio`, `#@setSub`, `&@value>${Set[1][e2]}`, `&@name>setSub`], [
                `span`, `.@_tCw _aA2 tXx`, `~@${Set[1][e2]}`]]]]]]];
      });

      ModelStockSet[e] = [
        `div`, `#@team`, [[
          `div`, `.@_yZS _gxM geQ gMX _uZM`, [[
            `label`, `.@_tXv`, `&@role>radio`, [[
              `input`, `&@for>${e}`, `&@type>radio`, `#@foldSets`, `&@value>${Set[0]}`, `&@name>foldSets`], [
              `span`, `.@_tCw aA2 _tXx`, `~@${Set[0]}`]]]]], [
          `div`, `.@_-Zz`, `&@set>${e}`, `#@sets`, ModelSets]]]
    });

    return [
      `div`, `&@style>letter-spacing:0.75px`, [[
        `div`, `.@_gcQ _aXZ sZ2`, [ [
          `div`, `.@_eYG _geQ _aA2`, [[`span`, `.@_tXx`, `~@Set Product Type`]]], [
          `div`, `.@_QZg _gMz`, [[
          `div`, `.@_axS`, [[
            `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@toModelSets`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@return`]]]]]]]]], [
        `div`, `.@_aXY _XsQ _aA2`, `&@style>margin:0 0 60px;max-height: calc(100vh - 170px);`, [[
          `div`, `#@add-devs-response-ejs`, `.@_-Zz _sZ2`, `&@style>padding: 14px; border: 1px solid #ffacac; border-radius: 16px` , [[
            `p`, `#@add-devs-false`, `.@_aA6`, `~@*invalid or empty input.`], [
            `p`, `#@pass-match-true`, `.@_aA6`, `~@*your changes have been saved successfully.`]]],[
            `div`, `.@_sZ2`, ModelStockSet]]], [
          `div`, `#@add-dev-see-ejs`, `.@_azX- _gMX _gp0 _gmg`, [[
            `div`, `.@_gxM CYc gcQ geQ _gMX`, [[
              `div`, `.@_gMX gcQ`, [[
                `div`, `.@_gM_a _agM _gMX`, `&@style>max-width: 500px`, [[
                  `a`, `#@toModelStockFile`, `.@_TX_a _atX _gMX`, `&@href>javascript:;`, `~@Continue`]]]]]]]]]]]
  },

  ModelStockSetTop (A, B) {

    /*let to = [
      `div`, `.@_gM_a _agM _guZ gMX`, `&@style>max-width: 450px`, [[
        `a`, `.@_TX_a _atX _utQ _gMX`, `#@devs-add-ejs`, `&@href>/login/`, `~@login`]]];

    let txt = [`My Feed`, `Profile`]

    let plc = [`feed`, `mug`]

    let a = [`/feed/`, `/mug/`];

    if (B !== false) {//console.log(`#1234`)
 
      to = [
        `a`, `.@_cCq _gS3`, `#@mug-ava`, `&@href>javascript:;`, [[
          `img`, `#@mug-ava`, `.@_aWz`, `&@src>${A[B].ava}`]]]  
    }*/

    return [`nav`, 
      `.@_uHC _tY0`, [[
        `div`, `.@_xCt _g2s`], [
        `div`, [[
          `div`, `.@_-tY _y2s`, [[
            `div`, `&@style>height:45px;background: #1185fe;width: 100%;padding: 0 20px`, [[
              `div`, `.@_geQ _gMX _aA0`, [[
                `div`, `.@_eYG`, [[
                  `div`, `.@_gxQ gMX`, [[`span`, `.@_tAa _tXx`, `~@Free International Shipping`]]]]], [
                `div`, `.@_QZg`, [[
                  `div`, [[
                    `a`, `#@SetCurrency`, `.@_cCq`, `&@style>width:32px;height:32px`, `&@href>javascript:;`, [[
                      `svg`, `#@SetCurrency`, `&@style>min-height:32px;width:32px`, `&@viewBox>0 0 24 24`, [[
                        `circle`, `#@SetCurrency`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
                          `text`, `#@SetCurrency`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 9px;`, `~@usd`]]]]]]]]]]]]], [
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `#@devs`, `.@_tXa`, `&@href>/`, `~@corrde`], [
                `span`, `@_tCc _pV4`, `@alpha`]]], [
              `div`, `.@_QZg`, [[
                `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@toModelCategory`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Category`]]]]], [
              `div`, `#@toCart`, `&@for>modal`, `.@_aAY _-Zz`, [[
                `div`, `.@_gcQ _gxM _geQ`, [[`div`, `#@cartAlt`, `.@_eYG`, `~@My Shopping Cart`], [
                `div`, `.@_QZg`, [[
                  `div`, [[`a`, `#@del`, `&@href>javascript:;`, `.@-_tX DelColor`]]]]]]], [
                `div`, `#@listCart`, `.@_aXY`, []]]],
              this.Monies(), this.ModelStockSets()]]]]]]]];
  },

  ModelStockSet (Stores, StockSet, Stock) {

    let Sets = [];

    Stock.forEach(Asset => {

      if (Asset.asset_set_type && Asset.asset_set_type.toLowerCase() === StockSet) Sets.push(Asset)
    })

    let ModelStock = [];

    ModelStock = [
      `section`, `.@gvQ pQ0`, `&@style>margin: 0 0 10px`, [[
        `section`, `.@cX3 _ss7`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3`, [[`span`, `.@a2X _aA2 tXx`, `~@${StockSet}`]]], [
                `div`, `.@_QZg _gxM cX5`, []]]]]], [
            `div`, [[`div`, `.@_gZy`, this.Stock(Stores, Sets)]]]]]]]]];

    return [`main`, `&@style>overflow:hidden`, `#@gM`, [
      /*this.feedControls(), */[
        `main`, `.@_xC2 _aA2`, `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;background:#f3f4f7`, [[
          `section`, `&@style>margin: 100px 0`, [[
            `div`, `.@_sZ2 _cX3 cX0`, []], ModelStock]]]]]]
  },

  ModelStoreControls () {

    let Rules = [`Filter2Gray`, `SortGray`, `SearchColor`, `Bag`];

    let Places = [``, ``, ``, `toModelCart`];

    let ModelTail = [];

    Rules.forEach((rule, e) => {

      ModelTail[e] = [
        `div`, `.@_geQ _gMX`, [[
          `a`, `#@${Places[e]}`, `.@-_tX ${rule}`, `&@href>javascript:;`]]];
    });

    return [
      `div`, `&@style>max-width:100%;bottom:0`, `.@_gHm _aGX _-gs`, [[
        `div`, `.@_xGy`, [[`div`, `&@style>background:#fff;border-radius:0`, `.@_gxM _gMX _uxq _egZ`, ModelTail]]]]];
  },

  ModelStockSets () {

    let StockSets = [
      `Bags`, `Dresses`, `Ear Wear`, `Hoodies`, `Lingerie`, `Lips`, `Monitors`, `Pants`/*, `Phones`*/, `Shoes`, `Shorts`, `Sneakers`, `Tops`, `Watches`];

    let ModelStockSets = [];

    StockSets.forEach(StockSet => {

      ModelStockSets.push([
        `li`, `.@_-zZx`, `#@long_a3`, [[
          `span`, `.@_-xQy`, `@saleMode`, `@for>${StockSet}`, `@href>javascript:;`, [[
            `div`, `.@_gcQ _aA0 _aA2 _ZCg`, [[
              `div`, `.@_ZSg _ZCg _eYG _gcQ _ZCg`, [[
                  `div`, [[
                    `a`, `mug`, `.@_cCq`, `&@style>width:30px;height:30px`, `&@href>/category/${StockSet.toLowerCase()}/`, [[
                      `img`, `.@_aWz`, `&@src>/gp/p/store/assets/${StockSet}_stock_asset.jpg`, `&@alt>avatar`]]]]], [
                `div`, `.@_eYG`, [[
                  `div`, `.@_QxM`, [[`a`, `@saleMode`, `&@for>${StockSet}`, `&@href>/category/${StockSet.toLowerCase()}/`, `.@_tXx _aA2`, `~@${StockSet}`]]]]]]]]]]]]]);
    });

    return [
      `div`, `#@ModelStockSets`, `&@for>modal`, `.@_aAY _-Zz`, [[
        `div`, `.@_gcQ _gxM _geQ`, [[
          `div`, `.@_eYG`, `~@Product category`], [
          `div`, `.@_QZg`, [[
            `div`, [[`a`, `#@del`, `&@href>javascript:;`, `.@-_tX DelColor`]]]]]]], 
        [`div`, `.@_aXY`, `&@style>max-height: calc(76vh - 70px);`, [[`ul`, `.@_aYy _tXx`, ModelStockSets]]]]]
  },

  toolSuite (Stores) {

    return [`main`, `.@_aA2 _sy2 _tY0`, [[
      `div`, `.@_pV0`], [
      `div`, `.@_sZ2 pV0`, [[
        `div`, `.@_sZ2`, [[
          `div`, `.@_yZS _gxM _geQ _gMX _uZM _cX0`, [[
            `div`, `&@style>letter-spacing:0.75px`, `.@_gxM`, [[`span`, `.@_tXx`, `~@Inventory Toolkit`]]], [
              `div`, `.@_QZg _gxM _cX5`, [[`a`, `#@StockSuite`, `.@-_tX AddStoriesColor`, `&@href>javascript:;`]]]]], [
            `div`, [[`div`, `.@_gZy`, `this.ModelSales(Stores, 5)`]]]]], [
        `div`, `.@_sZ2`, [[
          `div`, `.@_yZS _gxM _geQ _gMX _uZM _cX0`, [[
            `div`, `&@style>letter-spacing:0.75px`, `.@_gxM`, [[`span`, `.@_tXx`, `~@Sale settings`]]], [
              `div`, `.@_QZg _gxM _cX5`, [[`a`, `#@toModalSales`, `.@-_tX ProceedColor`, `&@href>javascript:;`]]]]], [
            `div`, [[`div`, `.@_gZy`, this.ModelSales(Stores, 5)]]]]]]]]];

  },

  ModelSales (Stores, stock_offset) {

    let Stock = [];

    if (Stores.Stock.length > 0) {

      Stock = Stores.Stock.sort((a,b) => {return b.log_secs - a.log_secs});

      Stock = Stock.slice(0, stock_offset);
    }

    let ModelStock = [];

    Stock.forEach(Asset => {

    let dailySale = 0;

    let monthlySale = 0;

    let weeklySale = 0; 

      if (Stores.Monthlies[1].indexOf(Asset.asset_md5) > -1) {

        monthlySale = Stores.DealsMap[Stores.Monthlies[0][Stores.Monthlies[1].indexOf(Asset.asset_md5)]].deal
      }

      else if (Stores.Dailies[1].indexOf(Asset.asset_md5) > -1) {

        dailySale = Stores.DealsMap[Stores.Dailies[0][Stores.Dailies[1].indexOf(Asset.asset_md5)]].deal
      }

      ModelStock.push([
        `div`, `.@_gQ`, [[
          `div`, `&@style>margin-bottom:10px`, [[
            `a`, `&@href>/stock/${Asset.store_md5}/${Asset.asset_md5}/`, [[
              `img`, `&@src>/${Asset.asset[0].path}`, `&@alt>${Asset.text}`, `&@style>max-width: 100%;height: auto; vertical-align:middle`]]]]], [
          `a`, `.@_tXv`, `&@href>javascript:;`, [[
            `span`, `&@style>margin-top:3px; font-size: 11px`, `.@_aA2 tXx _tXv`, `~@${Asset.asset_alt}`]]], [
          `div`, `&@style>margin-top:3px; font-size: 11px`, [[
            `div`, `.@_gxM`, `&@style>justify-content:center`, [[
              `div`, `.@_geQ _gxM`, `&@style>justify-content:center`, [[
                `span`, `#@denom`, `&@style>color: #222222 !important; font-weight: 700`, `~@$${(Asset.asset_USD)} USD`]]]]]]], [
          `div`, `&@style>margin-top:3px; font-size: 11px`, [[
            `div`, `.@_gxM`, `&@style>justify-content:center`, [[
              `div`, `.@_geQ _gxM`, `&@style>justify-content:center`, [[
                `a`, `#@SetCurrency`, `.@_cCq`, `&@style>width:40px;height:40px`, `&@href>javascript:;`, [[
                  `svg`, `&@style>min-height:40px;width:40px`, `&@viewBox>0 0 40 40`, [[
                    `circle`, `.@_cC4`, `&@r>19`, `&@cy>20`, `&@cx>20`], [
                      `text`, `@SetCurrency`, `&@x>20`, `&@y>22`, `&@text-anchor>middle`, `&@style>fill: #e11d1d;font-size: 9px;`, `~@-${dailySale}%`], [
                      `circle`, `&@style>stroke: #e11d1d;stroke-dashoffset: ${600-parseFloat(dailySale)/100*120}px`, `.@_cC4-`, `&@r>19`, `&@cy>20`, `&@cx>20`]]]]]]], [
              `div`, `.@_geQ _gxM`, `&@style>justify-content:center`, [[
                `a`, `#@SetCurrency`, `.@_cCq`, `&@style>width:40px;height:40px`, `&@href>javascript:;`, [[
                  `svg`, `&@style>min-height:40px;width:40px`, `&@viewBox>0 0 40 40`, [[
                    `circle`, `.@_cC4`, `&@r>19`, `&@cy>20`, `&@cx>20`], [
                      `text`, `@SetCurrency`, `&@x>20`, `&@y>22`, `&@text-anchor>middle`, `&@style>fill: #1dcae1;font-size: 9px;`, `~@-${weeklySale}%`], [
                      `circle`, `&@style>stroke-dashoffset: ${600-parseFloat(weeklySale)/100*120}px`, `.@_cC4-`, `&@r>19`, `&@cy>20`, `&@cx>20`]]]]]]] , [
              `div`, `.@_geQ _gxM`, `&@style>justify-content:center`, [[
                `a`, `#@SetCurrency`, `.@_cCq`, `&@style>width:40px;height:40px`, `&@href>javascript:;`, [[
                  `svg`, `&@style>min-height:40px;width:40px`, `&@viewBox>0 0 40 40`, [[
                    `circle`, `.@_cC4`, `&@r>19`, `&@cy>20`, `&@cx>20`], [
                      `text`, `@SetCurrency`, `&@x>20`, `&@y>22`, `&@text-anchor>middle`, `&@style>fill: #48e11d;font-size: 9px;`, `~@-${monthlySale}%`], [
                      `circle`, `&@style>stroke: #48e11d;stroke-dashoffset: ${600-parseFloat(monthlySale)/100*120}px`, `.@_cC4-`, `&@r>19`, `&@cy>20`, `&@cx>20`]]]]]]]]]]], [
          `div`, `&@style>margin-top:16px; font-size: 11px`, [[
            `div`, `.@_gxM`, `&@style>justify-content:center`, [[
              `div`, `.@_geQ _gxM`, `&@style>justify-content:center`, [[
                `a`, `#@ModelSale`, `&@for>${Asset.asset_md5}`, `.@-_tX Sale`, `&@href>javascript:;`, `~@Sale`]]]]]]]]])
    })

    return ModelStock;
  },

  ModelSalesModal () {

    return [
      `div`,  `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;`, [[
        `div`, `.@_gxM _gMX _gcQ _uZM`, [[
          `div`, `&@style>padding-right: 10px;width: 100%;max-width:541px`, `.@_eYG`, [[
            `input`, `#@u_md5_value`, `.@_Wtx`, `&@placeholder>Search user`, `&@style>`]]], [
            `span`, `.@_`, [[`a`, `.@-_tX SearchColor`, `&@href>javascript:;`]]], [
          `div`, `.@_QZg`, [[
            `span`, `.@_`, [[`a`, `#@foldSales`, `.@-_tX DelColor`, `&@href>javascript:;`]]]]]]], [
        `div`, `.@_aXY XsQ _aA2`, `&@style>margin:0 0;max-height: calc(100vh - 90px);`, [[
          `div`, `#@listSales`, `.@_sZ2`, []], [
          `div`, `#@Sale`, `.@_sZ2`, []]]]]];
  },

  ModalSales (Sales) {

    return [`div`, `.@_gZy`, this.ModelSales(Sales, 100)]
  },

  ModalSale (Stores, Sale) {

    let Stock = Stores.StockMap[Sale];

    let ModelStockPath = []

    if (Stock.asset_set_type) {

      ModelStockPath = [
        `div`, `.@_gxM _ga0`, `&@style>`, [[
          `a`, `.@_a0`, `&@href>/`, `~@Home`], [
            `span`, `.@_p0`, `~@/`], [
            `a`, `.@_a0`, `&@href>/category/${(Stock.asset_set_type).toLowerCase()}/`, `~@${Stock.asset_set_type}`], [
            `span`, `.@_p0`, `~@/`], [
            `span`, `~@${Stock.asset_alt}`]]];
    }

    let Deals = [[0, Stock.asset_USD], 0, 0];

    if (Stores.Dailies[1].indexOf(Stock.asset_md5) > -1) {

      Deals[0][0] = Stores.DealsMap[Stores.Dailies[0][Stores.Dailies[1].indexOf(Stock.asset_md5)]].deal;

      Deals[0][1] = ((100 - Deals[0][0])/100*Stock.asset_USD).toFixed(2);
    }

    return [
      `section`, `.@_tY0`, `#@ModelSale`, `@&style>width: 100%`, [[
        `div`, `.@_g0`, [
          ModelStockPath, [
          `div`, `.@_g2 _gZy`, [[
            `div`, `.@_ga2`, [[
              `div`, `#@ModelSaleJPG`, [[
                `div`, `.@_g0`, [[
                  `div`, `.@_ga`, [[
                    `div`, `.@_ga0`, [[`img`, `&@src>/${Stock.asset[0].path}`]]]]]]]]]]], [
            `div`, `#@ModelSaleSet`, `.@_gb`, [[
              `div`, `.@gb0`, `#@ModelSaleAlt`, [[
                `span`, `.@_p0 _aA2`, `~@${Stock.asset_alt}`], [
                `div`, `.@_g0`, `#@ModelSaleUSD`, [[`span`, `.@_p0`, `~@$${Stock.asset_USD} USD`]]]]], [
              `div`, `#@daily-pane`, `.@_gxM geQ`, [[
                `svg`, `&@viewBox>0 0 40 40`, [[
                  `circle`, `#@daily-c0-stroke`, `&@cy>20`, `&@cx>20`, `&@r>19`], [
                  `text`, `&@x>20`, `&@y>22`, `~@-${Deals[0][0]}%`], [
                  `circle`, `#@daily-c2-dash`, `&@cy>20`, `&@cx>20`, `&@r>19`, `&@style>stroke-dashoffset: ${600-parseFloat(Deals[0][0])/100*120}px`]]], [
                `div`, `.@_eYG`, []], [
                `div`, `.@_QZg _gxM`, [[
                  `span`, `&@style>padding: 0 10px;color:#e11d1d`, `~@$${Deals[0][1]} USD`]]]]], [
              `div`, `#@set-daily-pane`, `.@_gxM`, [[
                `div`, `.@_QZg`, [[
                  `div`, `&@style>padding-right: 20px`, [[
                    `input`, `&@id>daily-deal`, `&@type>text`, `&@style>padding:5px;max-width:40px;height:100%;outline:none;text-align:right;border:1px solid #d7d7d7;border-radius:4px`]]], [
                    `a`, `&@id>edit-daily`, `&@for>${Stock.asset_md5}`, `.@-_tX Sale`, `&@href>javascript:;`]]]]]]]]]]]]]
  },

  ModelDeals (Stores, stock_offset, saleClass) {

    let Deals = [];

    let DealSet = [];

    let title;

    let ModelSource = [];

    let dealSpan = [];

    let ModelDealSpan = [];

    let epoch = 0;

    let ModelStock = [];

    let levelSale = [`javascript:;`, ``];

    let ModelSalesPlus = [];

    if (saleClass === `daily`) {

      DealSet = Stores.Dailies;

      title = `Flash Deals`;

      DealSpan = [`D`, `H`, `M`, `S`];

      levelSale = [`/sales/quick/`, `More Flash Deals`];

      if (DealSet[0].length > 0) epoch = Stores.DealsMap[DealSet[0][0]].sale_off_log_secs;
    }

    if (Stores.Deals.length > 0) {

      let AllDeals = Stores.Deals.sort((a,b) => {return b.log_secs - a.log_secs});

      AllDeals.forEach(Deal => {

        if (DealSet[0].indexOf(Deal.log_md5) > -1) Deals.push(Deal);
      })

      Deals = Deals.slice(0, stock_offset);
    }

    if (stock_offset < 50) {

      ModelSalesPlus = [
      `div`, `.@_gxQ`, `&@style>padding: 0 0 24px`, [[
        `div`, `.@_gM_a _agM _guZ`, [[
          `a`, `.@_TX_a _atX _utQ`, `&@href>${levelSale[0]}`, `~@${levelSale[1]}`]]]]]
    } 

    Deals.forEach(Deal => {

      let Stock = Stores.StockMap[Deal.asset_md5];

      ModelStock.push([
        `div`, `.@_gQ`, [[
          `div`, `&@style>margin-bottom:10px`, [[
            `a`, `&@href>/stock/${Stock.store_md5}/${Stock.asset_md5}/`, [[
              `img`, `&@src>/${Stock.asset[0].path}`, `&@alt>${Stock.text}`, `&@style>max-width: 100%;height: auto; vertical-align:middle`]]]]], [
          `a`, `.@_tXv`, `&@href>/stock/${Stock.store_md5}/${Stock.asset_md5}/`, [[
            `span`, `&@style>margin-top:3px; font-size: 11px;white-space:nowrap`, `.@_aA2 tXx _tXv`, `~@${Stock.asset_alt}`]]], [
          `div`, `&@style>margin-top:3px; font-size: 11px`, [[
            `div`, `.@_gxM`, `&@style>justify-content:center`, [[
              `div`, `.@_geQ _gxM`, `&@style>justify-content:center`, [[
                `span`, `#@saleValue`, `&@usd>${(Stock.asset_USD)}`, `&@style>padding: 0 15px; color: #919191;text-decoration-line: line-through;white-space:nowrap`, `.@_tXx`, `~@$${Stock.asset_USD} USD`]]], [
              `div`, `.@_geQ _gxM`, `&@style>justify-content:center`, [[
                `span`, `#@saleValue`, `&@usd>${(Stock.asset_USD * (100 - Deal.deal)/100).toFixed(2)}`, `&@style>padding:0 15px;white-space:nowrap;color: #222222 !important; font-weight: 700`, `~@$${(Stock.asset_USD * (100 - Deal.deal)/100).toFixed(2)} USD`]]]]]]], [
          `div`, `&@style>margin-top:3px; font-size: 11px`, [[
            `div`, `.@_gxM`, `&@style>justify-content:center`, [[
              `div`, `.@_geQ _gxM`, `&@style>justify-content:center`, [[
                `a`, `#@SetCurrency`, `.@_cCq`, `&@style>width:40px;height:40px`, `&@href>javascript:;`, [[
                  `svg`, `&@style>min-height:40px;width:40px`, `&@viewBox>0 0 40 40`, [[
                    `circle`, `.@_cC4`, `&@r>19`, `&@cy>20`, `&@cx>20`], [
                      `text`, `@SetCurrency`, `&@x>20`, `&@y>22`, `&@text-anchor>middle`, `&@style>fill: #e11d1d;font-size: 9px;`, `~@-${Deal.deal}%`], [
                      `circle`, `&@style>stroke: #e11d1d;stroke-dashoffset: ${600-parseFloat(Deal.deal)/100*120}px`, `.@_cC4-`, `&@r>19`, `&@cy>20`, `&@cx>20`]]]]]]]]]]], [
          `div`, `&@style>margin-top:16px; font-size: 11px`, [[
            `div`, `.@_gxM`, `&@style>justify-content:center`, [[
              `div`, `.@_geQ _gxM`, `&@style>justify-content:center`, [[
                `a`, `#@ModelCart`, `&@for>${Stock.asset_md5}`, `.@-_tX Cart`, `&@href>javascript:;`, `~@Sale`]]]]]]]]])
    });

    DealSpan.forEach(S => {

      ModelDealSpan.push([`div`, `.@_gxM`, `&@epoch>${epoch}`, [[
        `span`, `.@_aA6`, `&@style>padding-left:8px`, `~@${S} :`], [
        `span`, `.@aA6`, `&@style>padding-left:8px`, `&@id>${S}-span`, `~@00`]]])
    })

    ModelSource = [
      `section`, [[
        `div`, `.@_sZ2`, [[
          `div`, `.@_cX3`, [[
            `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
              `div`,`.@_gxM cX3`, [[
                `svg`, `&@style>stroke:#e11d1d; stroke-width:1.5px;fill:none;min-height:0;height:24px;width:120px`, `&@viewBox>`, [[
                  `g`, [[
                    `path`, `&@d>M1 1 119 1 119 23 1 23z`], [
                      `text`, `&@x>60`, `&@y>15`, `&@text-anchor>middle`, `&@style>fill: #e11d1d;font-size: 10px;letter-spacing:3.5px;stroke:none`, `~@${title.toUpperCase()}`]]]]]]], [
              `div`, `.@_QZg _gxM _tXx`, `&@style>font-size:11px`, [[
                `div`, [[
                  `span`, `.@-_tX Clock`]]], [`div`, `#@${saleClass}-span`, `.@_gxM`, `&@epoch>${epoch}`, ModelDealSpan]]]]]]], [
          `div`, [[
            `div`, `.@_gZy`, ModelStock], ModelSalesPlus]]]]]];

    if (DealSet[0].length === 0) ModelSource = []

    return ModelSource;
  },

  ModelFlashSale (Stores) {

    return [`main`, `&@style>overflow:hidden`, `#@gM`, [
      /*this.feedControls(), */[
        `main`, `.@_xC2 _aA2`, `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;background:#f3f4f7`, [[
          `section`, `&@style>margin: 100px 0`, [[
            `div`, `.@_sZ2 _cX3 cX0`, []], [`div`, `&@style>padding:60px 0`, [this.ModelDeals(Stores, 100, `daily`)]]]]]]]]


  },

  ModelSalesAlpha () {

    return [`nav`, 
      `.@_uHC _tY0`, [[
        `div`, `.@_xCt _g2s`], [
        `div`, [[
          `div`, `.@_-tY _y2s`, [[
            `div`, `&@style>height:45px;background: #1185fe;width: 100%;padding: 0 20px`, [[
              `div`, `.@_geQ _gMX _aA0`, [[
                `div`, `.@_eYG`, [[
                  `div`, `.@_gxQ gMX`, [[`span`, `.@_tAa _tXx`, `~@Free International Shipping`]]]]], [
                `div`, `.@_QZg _geQ`, [[
                  `div`, `.@_gxM`, [[
                    `a`, `#@SetCurrency`, `.@_cCq`, `&@style>width:32px;height:32px`, `&@href>javascript:;`, [[
                      `svg`, `#@SetCurrency`, `&@style>min-height:32px;width:32px`, `&@viewBox>0 0 24 24`, [[
                        `circle`, `#@SetCurrency`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
                          `text`, `#@SetCurrency`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 9px;`, `~@usd`]]]]]]]]]]]]], [
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM`, [[
                `a`, `#@devs`, `.@_tXa`, `&@href>/`, `~@corrde`], [
                `span`, `@_tCc _pV4`, `@alpha`]]], [
              `div`, `.@_QZg`, [[
                `a`, `#@saleBag`, `.@-_tX Bag`, `&@style>width:24px;height:24px`, `&@href>javascript:;`]]], [
              `div`, `#@toCart`, `&@for>modal`, `.@_aAY _-Zz`, [[
                `div`, `.@_gcQ _gxM _geQ`, [[`div`, `#@cartAlt`, `.@_eYG`, `~@My Shopping Cart`], [
                `div`, `.@_QZg`, [[
                  `div`, [[`a`, `#@del`, `&@href>javascript:;`, `.@-_tX DelColor`]]]]]]], [
                `div`, `#@listCart`, `.@_aXY`, []]]],
              this.Monies()/*, this.ModelStockSets()*/]]]]]]]];
  },

  /**
  @corrde.beta.0.0.2
  **/

  ModelRootAlpha (A, State) {

    let ModelMug = [`a`, `#@offmugger`, `.@-_tX Mug`, `&@style>margin:0 15px`, `&@href>javascript:;`];

    let ModalA = [`pay orders & invoices`, `Shop by Category`, `Vendors & MarketPlace`, `Mail & Notifications`, `Sign Out`]

    let ModalB = [``, `getSets`, `marketplace`, `mail`, ``]

    let ModalC = [`/invoices/`, `javascript:;`, `/vendors/`, `javascript:;`, `javascript:;`];

    if (State !== false) {

      let ModelMugFile = [
      `svg`, `#@mug-ava`, `&@style>min-height:24px;width:24px`, `&@viewBox>0 0 24 24`, [[
        `circle`, `#@mug-ava`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
          `text`, `#@mug-ava`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 12px;`, `~@${A[State].full[0]}`]]]

      if (A[State].ava !== false) ModelMugFile = [`img`, `#@mug-ava`, `.@_aWz`, `&@src>/${A[State].ava}`];
 
      ModelMug = [
        `a`, `.@_cCq _gS3`, `#@mug-ava`, `&@href>javascript:;`, `&@style>height:24px;width:24px;margin: 0 15px`, [ModelMugFile]];
    }

    return [`nav`, 
      `.@_uHC _tY0`, [[
        `div`, `.@_xCt g2s`], [
        `div`, [[
          `div`, `.@_-tY y2s`, [[
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM _geQ`, [[
                `a`, `#@devs`, `.@-_tX AppMedium`, `&@href>/`, `~@corrde`], [
                `span`, `@_aA6`, `&@style>padding: 0 7px`, `~@ | CORRDE STORE`]]], [
              `div`, `.@_QZg`, [[
                `a`, `#@SetZone`, `.@-_tX GeoGray`, `&@style>margin: 0 15px;width:24px;height:24px`, `&@href>javascript:;`], [
                `a`, `#@myBag`, `.@-_tX Bag`, `&@style>margin: 0 15px;width:24px;height:24px`, `&@href>javascript:;`],
                ModelMug]], 
              this.inModal({id: `mugger`, in: this.aPoolModal(ModalA, ModalB, ModalC)}), 
              this.inModal({
                id: `offmug`, 
                in: this.aPoolModal([
                  `Sign in`, `Create Free Account`, `Shop By Category`, `Vendors & MarketPlace`], [
                  ``, ``, `getSets`, `marketplace`], [
                  `/login/`, `/signup/`, `javascript:;`, `/vendors/`])})]]]]]]]];

  },

  ModalZones () {
    
    let Zones = [
      `Global`, 
      `Australia`, 
      `Canada`, 
      `Germany`, 
      `Japan`, 
      `Kenya`, 
      `Norway`, `South Africa`, `Sweden`, `United Kingdom`, `United States Of America`]

    let ModelZones = [];

    Zones.forEach((Zone, e) => {

      ModelZones.push([
        `div`, [[
          `div`, `.@_yZS _gxM geQ gMX _uZM`, [[
            `label`, `.@_tXv`, `&@role>radio`, [[
              `input`, `&@type>radio`, `#@getZone`, `&@value>${Zone}`, `&@name>setSub`], [
                `span`, `.@_tCw _aA2 tXx`, `~@${Zone}`]]]]]]]);
    });

    return [
      `div`, `&@style>letter-spacing:0.75px`, [[
        `div`, `.@_gcQ _aXZ _uZM`, [[
          `div`, `.@_geQ _gxM _eYG`, [[
            `div`, `.@_aA2`, [[
              `div`, [[
                `span`, `&@style>`, `~@Choose Country For Market & Shipping`]]], [
              `div`, [[`span`, `#@localeZone`, `.@_aA6`, `&@style>text-transform:uppercase; font-size:11px`, `~@global`]]]]]]], [
          `div`, `.@_QZg _gMz`, [[`a`, `#@DelModalZones`, `.@_-Zz -_tX DelColor`, `&@href>javascript:;`]]]]], [
        `div`, `.@_aXY _XsQ _aA2`, `&@style>max-height: calc(100vh - 170px);`, [[
          `div`, `.@_sZ2`, ModelZones]]]]]

  },

  ModelRoot (A, Stores) {

    let RateStock = [];

    if (Stores.Stock.length > 0) {

      RateStock = Stores.Stock.sort((a,b) => {return b.log_secs - a.log_secs});

      RateStock = RateStock.slice(0, 15);
    }

    return [
      `main`, `.@_xC2 _aA2`, `&@style>letter-spacing: .75px;line-height:1.5rem`, [[
        `section`, `.@_g29 _sZ2`, `&@style>line-height:1.5rem`, [[
          `div`, `.@_cX3`, [[
            `div`, `.@_gxQ _gxM _X2Y _gxZ`, `&@style>min-height:250px`, [[
              `div`, `.@_gxQ _gQ0 _S8Y _c3x`, [[
                `h1`, `.@_tx1 _atX`, `~@The Vendors Hub ™`]]], [
              `div`, `.@_ge0 _c3x _Qtx`, [[
                `div`, `~@Buy or Sell with our free subscription marketplace for freelance vendors and retail stores. We facilitate ecommerce for buyers and vendors' needs by streamlining the functionality overhead.`], [
                `div`, `&@style>padding: 24px 0`, [[
                  `div`, `.@QZg`, [[
                    `div`, `.@_gM_0 _agM _guZ gMX`, `&@style>max-width: 450px`, [[
                      `a`, `.@_TX_a _atX _utQ _gMX _aA0`, `&@href>/signup/`, `~@sign up for free`]]]]]]]]]]]]]]],
        this.ModelDeals(Stores, 5, `daily`), [
        `section`, `.@cX3 _ss7`, [[
          `div`, `.@sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3 _eYG`, [[`span`, `.@a2X _aA2`, `~@Top Categories`]]], [
                `div`, `.@_QZg _gxM _-Zz`, [[`a`, `#@add-stories-ejs`, `.@_tX AddStoriesColor`, `&@href>javascript:;`]]]]]]], [
            `div`, [[`div`, `.@_gZy`, this.topStock()]]]]]]], [
        `section`, `.@cX3 _ss7 _-Zz`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3 _eYG`, [[`span`, `.@a2X _aA2`, `~@Popular Vendors`]]], [
                `div`, `.@_QZg _gxM _-Zz`, [[`a`, `#@add-stories-ejs`, `.@_tX AddStoriesColor`, `&@href>/portfolio/`]]]]]]], [
            `div`,`.@_gxM _geQ _gMX`, [[
              `div`, `.@miY _gMX`, [[
                `div`, `#@skilled-slide-ejs`, `.@_AZc`, [[
                  `div`, [[`div`, `.@_AZx ava`, [[`div`, `#@skilled-rotate-ejs`, `.@_AZs _gxM`, this.topStores(Stores)]]]]]]]]]]]]]]], [
        `section`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3`, [[`span`, `.@a2X _aA2`, `~@New Products`]]], [
                `div`, `.@_QZg _gxM cX5`, []]]]]], [
            `div`, [[`div`, `.@_gZy`, this.Stock(Stores, RateStock)]]]]]]], [
        `section`, `.@_aGX _-Zz`, [[
          `div`, `.@_cX3`, [[
            `div`, `.@_sZ2`, [[
              `div`, `.@_gxM _gMX`, `&@style>margin: 25px 0`, [[
                `div`, `.@_geQ _gMX`, [[`span`, `.@-_tX vServiceGray`, `&@style>width: 100px; height:100px`]]]]], [
              `div`, `&@style>padding: 0 24px`, [[
                `div`, `.@_gxQ`, [[
                  `span`, `.@_utQ`, `&@style>font-size:17px`, `~@Vendor Service`], [
                  `span`, `.@_Qtx`, `&@style>padding:10px 0`, `~@Our vendor services helps store owners set up shop for selling products on order. It also provides a diverse marketplace for clients and customers to find products preferable to their budget and functional convenience.`]]]]]]]]], [
            `div`, `.@_sZ2`, [[
              `div`, `.@_gxM _gMX`, `&@style>margin: 25px 0`, [[
                `div`, `.@_geQ _gMX`, [[`span`, `.@-_tX cServiceGray`, `&@style>width: 100px; height:100px`]]]]], [
              `div`, `&@style>padding: 0 24px`, [[
                `div`, `.@_gxQ`, [[
                  `span`, `.@_utQ`, `&@style>font-size:17px`, `~@Shipping & Delivery`], [
                  `span`, `.@_Qtx`, `&@style>padding:10px 0`, `~@You can facilitate shipping products to your customers after checkout with our courier hailing service. Users can also earn by participating in delivery and shipping as our operational model allows third party deliveries.`]]]]]]], [
            `div`, `.@_sZ2`, [[
              `div`, `.@_gxM _gMX`, `&@style>margin: 25px 0`, [[
                `div`, `.@_geQ _gMX`, [[`span`, `.@-_tX GeoLightGray`, `&@style>width: 70px; height:70px`]]]]], [
              `div`, `&@style>padding: 0 24px`, [[
                `div`, `.@_gxQ`, [[
                  `span`, `.@_utQ`, `&@style>font-size:17px`, `~@Geolocation`], [
                  `span`, `.@_Qtx`, `&@style>padding:10px 0`, `~@By using our comprehensive mapping service you can find vendors and stores near you.`], [
                  `span`, `.@_Qtx`, `&@style>padding:10px 0`, `~@Set reliable business and address location with our mapping service to enhance your shipping and delivery services.`]]]]]]]]], [
        `section`, `.@_sZ2 _g29`, [[
          `div`, `.@_cX3 _aA0`, [[
            `div`, `&@style>padding:24px 0`, `.@_gxQ`, [[
              `span`, `~@Need any assistance? We now have a fully operational support team to tackle your requests or improve on your suggestions.`]]], [
            `div`, `.@_gxQ`, `&@style>padding: 0 0 24px`, [[
              `div`, `.@_gM_0 _agM _guZ`, [[`a`, ``, `.@_TX_a _atX qXS _utQ _aA0`, `&@href>/support/`, `~@Request Support`]]]]]]]]], [
        `section`, `.@cX3 _ss7 _-Zz`, [[
          `div`, `.@_sZ2`, [[
            `div`, `.@_cX3`, [[
              `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
                `div`,`.@_gxM cX3`, [[`span`, `.@a2X _aA2`, `~@Popular Portfolios`]]], [
                `div`, `.@_QZg _gxM cX5`, [[`a`, `@_tX SellColor`, `&@href>javascript:;`]]]]]]], [
            `div`,`.@_gxM _geQ _gMX`, [[
              `div`, `.@miY _gMX`, [[
                `div`, `#@jobs-slide`, `.@_AZc`, [[
                  `div`, [[`div`, `.@_AZx ava`, [[`div`, `#@jobs-rotate`, `.@_AZs _gxM`, this.popular_y_scroll(A)]]]]]]]]]]]]]]]]]
  },

  ModelZone (zone, Retail) {

    let ZoneSet = {
      kenya: {
        swap: 109,
        swapAlpha: `k£.`, 
        zones: [{
          locale: `homa bay`,
          drop: [[20, `mins`], [10, `hrs`]],
          rates: [{
            saleSetAlpha: [.133, 14],
            grams: [{
              gramSetAlpha: [1, 99],
              sale: [.20, .23]
            }]
          }]
        }, {
          locale: `kakamega`,
          drop: [[20, `mins`], [9, `hrs`]],
          rates: [{
            saleSetAlpha: [.133, 14],
            grams: [{
              gramSetAlpha: [1, 99],
              sale: [.20, .23]
            }]
          }]
        }, {
          locale: `kisii`,
          drop: [[15, `mins`], [15, `hrs`]],
          rates: [{
            saleSetAlpha: [.133, 14],
            grams: [{
              gramSetAlpha: [1, 99],
              sale: [.20, .23]
            }]
          }]
        }, {
          locale: `kisumu`,
          drop: [[10, `mins`], [5, `hrs`]],
          rates: [{
            saleSetAlpha: [.133, 14],
            grams: [{
              gramSetAlpha: [1, 99],
              sale: [.20, .23]
            }]
          }]
        }, {
          locale: `machakos`,
          drop: [[30, `mins`], [48, `hrs`]],
          rates: [{
            saleSetAlpha: [.133, 14],
            grams: [{
              gramSetAlpha: [1, 99],
              sale: [.20, .23]
            }]
          }]
        }, {
          locale: `maseno`,
          drop: [[10, `mins`], [8, `hrs`]],
          rates: [{
            saleSetAlpha: [.133, 14],
            grams: [{
              gramSetAlpha: [1, 99],
              sale: [.20, .23]
            }]
          }]
        }, {
          locale: `nairobi`,
          drop: [[25, `mins`], [24, `hrs`]],
          rates: [{
            saleSetAlpha: [.133, 14],
            grams: [{
              gramSetAlpha: [1, 99],
              sale: [.20, .23]
            }]
          }]
        }, {
          locale: `oyugis`,
          drop: [[25, `mins`], [7, `hrs`]],
          rates: [{
            saleSetAlpha: [.133, 14],
            grams: [{
              gramSetAlpha: [1, 99],
              sale: [.20, .23]
            }]
          }]
        }]
      }
    };

    let Swap = [RetailMaps[zone].swapAlpha, RetailMaps[zone].swap];

    let ModelZones = [];

    let ModalSet = {};

    let ModelPayAd = [];

    let Shelve = (Shelf, Sell) => {

      let Rows = Sell.Sell[0].sort((a, b) => {return b.log - a.log});

      let ModelShelve = [];

      let Stock = [];

      let alpha = Shelf,

        uScore = `` + Shelf;

      let toShelf = uScore.replace(new RegExp(/\s/, `g`), `_`);

      Rows.forEach(Row => {

        //Shelf = Shelf.replace(new RegExp(/&/, `g`), `u/0026`);
        //Shelf = this.filter(this.filter(Shelf));console.log(Shelf)

        if (Row.mass && this.filter(this.filter(Row.set)) === Shelf && Row.market === zone) Stock.push(Row)
      });

      Stock = Stock.slice(0, 3);

      Stock.forEach(Row => {

        if (Row.mass && this.filter(this.filter(Row.set)) === Shelf && Row.market === zone) {

          let ModelJSON = `&@data>{
            &quot;alpha&quot;: &quot;${Row.alpha.replace(new RegExp(`/`, `g`), `u/002F`)}&quot;,
            &quot;dollars&quot;: &quot;${Row.dollars}&quot;,
            &quot;file&quot;: &quot;${Row.files[0]}&quot;,
            &quot;mass&quot;: &quot;${Row.mass}&quot;,
            &quot;MD5&quot;: &quot;${Row.MD5}&quot;,
            &quot;swap&quot;: &quot;${Swap[1]}&quot;,
            &quot;swapAlpha&quot;: &quot;${Swap[0]}&quot;}`,

            dollars = (Row.dollars*Swap[1]).toFixed(2);

          if (Row.set === `clothing`) {

            ModelShelve.push([
            `div`, `#@ModelShelf-2`, [[
              `div`, `.@_gQ-2`, [[
                `div`, `.@_gY-0`, [[
                  `div`, `&@style>height:200px`, [[
                    `a`, `@ModalCue`, `.@_Qg-2`, [[
                     `div`, `.@Qg0`, [[
                      `div`, [[`img`, `#@pullRetailStock`, `&@sum>${Row.MD5}`, `&@alt>${Row.alpha}`, `&@src>/${Row.files[0]}`]]]]]], `&@href>javascript:;`]]], [
                  `div`, `&@style>height:40px`], [
                  `div`, `&@style>height:64px`, [[
                    `div`, `.@_Aa`, [[
                      `a`, `.@_aA`, `&@href>javascript:;`, [[
                        `span`, `#@pullRetailStock`, `.@_Ax`, `&@sum>${Row.MD5}`, [[`strong`, `.@_tXx`, `~@${Row.factory}`]]], [
                        `span`, `#@pullRetailStock`, `&@sum>${Row.MD5}`, `&@style>line-height:1.5`, `~@${Row.alpha}`]]]]]]], [
                  `div`, `&@style>height:88px`, [[
                    `div`, [[
                      `span`, [[`span`, `.@_tXx _p0`, `&@style>padding-top:16px;display:block`, `~@${Swap[0]} ${dollars.toLocaleString()}`]]], [
                      `div`, `&@style>display:block;font-size:11px`, [[`span`, `~@Free delivery on `], [`span`, `~@ orders over ${Swap[0]} 250`]]]]]]], [
                  `div`, `&@style>height:30px`, [[
                    `div`, `.@_2pY`, [[
                      `div`, `&@style>width:max-content`, [[
                      `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe;${(Row.pile && Row.pile > 0)?``:`border-color:#000;color:#000;background:none`}`, [[
                        `a`, `#@${(Row.pile && Row.pile > 0)?`alterCart`:`null`}`, ModelJSON, `.@_TX_a _atX`, `&@href>javascript:;`, `&@style>font-size:12px;font-weight:300;${(Row.pile && Row.pile > 0)?``:`color:#000`}`, `~@${(Row.pile && Row.pile > 0)?`add to cart`:`out of stock`}`]]]]]]]]]]]]]]]);
          }

          else {

            ModelShelve.push([
            `div`, `.@_gA0`, [[
              `div`, `.@_gY`, [[
                `a`, `.@_Qg`, [[
                  `div`, `.@_Qg0`, [[`img`, `#@pullRetailStock`, `&@sum>${Row.MD5}`, `&@alt>${Row.alpha}`, `&@src>/${Row.files[0]}`]]]], `&@href>javascript:;`], [
                `div`, [[
                  `div`, `.@_pY`, [[
                    `div`, `.@_Xx _gxM`, [[
                      `span`, `.@_tXx`, [[`span`, `.@_p0`, `~@${Swap[0]} ${dollars.toLocaleString()}`]]], [
                      `span`, `.@_gp2`, [[`span`, `.@_p2`, `~@(${Row.mass}G)`]]]]], [
                    `a`, `#@pullRetailStock`, `&@sum>${Row.MD5}`, `.@_a2`, [[
                      `span`, `&@style>line-height:22px;-moz-orient:vertical;display:-webkit-box;overflow:hidden;-webkit-line-clamp:3;font-size:12px`, `~@${Row.alpha}`]], `&@href>javascript:;`]]], [
                  `div`, `.@_2pY`, [[
                    `div`, `&@style>width:max-content`, [[
                      `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe;${(Row.pile && Row.pile > 0)?``:`border-color:#000;color:#000;background:none`}`, [[
                        `a`, `#@${(Row.pile && Row.pile > 0)?`alterCart`:`null`}`, ModelJSON, `.@_TX_a _atX`, `&@href>javascript:;`, `&@style>font-size:12px;font-weight:300;${(Row.pile && Row.pile > 0)?``:`color:#000`}`, `~@${(Row.pile && Row.pile > 0)?`add to cart`:`out of stock`}`]]]]]]]]]]]]]);
          }
        }
      });

      return [
      `section`, `#@ModelShelf`, [[
        `div`, `.@_g0`, `&@style>border-bottom: 1px solid #e6e7e8;margin-top:16px`, [[
          `div`, `.@_gxM _geQ _cX3`, `&@style>margin-bottom:16px`, [[
            `div`, [[`p`, `.@_tXx`, `&@style>color:rgb(34, 34, 34)`, `~@${alpha}`]]], [
            `div`, `.@_QZg`, [[`a`, `.@_aA2`, `&@style>text-decoration:underline`, `&@href>/store/${toShelf}/`, `~@view all`]]]]], [
          `div`, `.@_gX0`, ModelShelve]]]]]
    }

    if (zone === `kenya`) {

      ModelPayAd = [
      `section`, `.@_g29 sZ2`, `&@style>line-height:1.5rem;font-size:11px;color:#fff`, [[
        `div`, `.@_cX3`, [[
          `div`, `.@_yZS _gxM _geQ _gMX`, [[
            `div`,`.@_gxM _S8Y`, [[`span`, `.@_atX`, `&@style>font-size:13px`, `~@Payment Options For Kenya`]]]]]]], [
        `div`, `.@_cX3`, [[
          `div`, `.@_gxQ _gxM _X2Y _gxZ`, `&@style>min-height:250px`, [[
            `div`, `.@_gxQ _gQ0 _S8Y _c3x`, [[
              `div`, `.@_sZ2 _atX`, [[
                `div`, `.@_gxM _gMX`, `&@style>margin: 25px 0`, [[
                  `div`, `.@_geQ _gMX`, [[`span`, `.@-_tX Flutterwave`, `&@style>width: 250px; height:50px`]]]]], [
              `div`, `&@style>padding: 0 24px`, [[
                `div`, `.@_gxQ`, [[
                  `span`, `.@_tXx`, `~@Simplified Payment`], [
                  `span`, `.@_Qtx`, `&@style>padding:10px 0`, `~@An ideal payment gateway in Kenya as it accepts popular payment choices, like M-PESA & Debit Cards`]]]]]]]]], [
              `div`, `.@_ge0 _c3x _Qtx`, [[
              `div`, `.@_sZ2 _atX`, [[
                `div`, `.@_gxM _gMX`, `&@style>margin: 25px 0`, [[
                  `div`, `.@_geQ _gMX`, [[`span`, `.@-_tX Mpesa`, `&@style>width: 250px; height:50px`]]]]], [
              `div`, `&@style>padding: 0 24px`, [[
                `div`, `.@_gxQ`, [[
                  `span`, `.@_tXx`, `~@Mobile Payment`], [
                  `span`, `.@_Qtx`, `&@style>padding:10px 0`, `~@Convenient & Quick Mobile Payments with M-PESA within Kenya at normal service rates.`]]]]]]]]]]]]]]];
    }

    RetailMaps[zone].zones.forEach(Zone => {

      let ModelRateSet = []

      Zone.rates.forEach(Sale => {

        let ModelVolumeSet = [];

        Sale.grams.forEach(Volume => {

          ModelVolumeSet.push([
            `div`, `.@_gxM _yZS`, `&@style>text-transform:uppercase`, [[
              `span`, `&@style>color: #999`, `~@${Volume.gramSetAlpha[0]} grams - ${Volume.gramSetAlpha[1]} grams`], [
              `div`, `.@_QZg _gxM`, [[
                `div`, [[
                  `span`, `&@style>color:red;padding:0 14px`, `~@${Swap[0]} ${(Volume.sale[0] * Swap[1]).toFixed(2)}`]]], [
                `div`, [[`span`, `&@style>`, `~@${Swap[0]} ${(Volume.sale[1] * Swap[1]).toFixed(2)}`]]]]]]])
        })

        ModelRateSet.push([
          `div`, [[
            `div`, `.@_yZS _uZM`, [[
              `span`, `&@style>text-transform:uppercase`, `~@from ${Swap[0]} ${(Sale.saleSetAlpha[0]*Swap[1]).toFixed(2)} - ${Swap[0]} ${(Sale.saleSetAlpha[1]*Swap[1]).toFixed(2)}`]]], [
            `div`, ModelVolumeSet]]])
      })

      ModalSet[Zone.locale] = [
      `div`, `.@_-Zz`, `#@ModelZonalRates`, `&@locale>${Zone.locale}`, [[
        `div`, `.@_UQe`, `#@modalView`, [[
         `div`, `.@_HUa`], [`div`, `.@_UfX`, [[
          `div`, `.@_oPQ`, [[
            `div`, `&@style>letter-spacing:0.75px`, [[
              `div`, `.@_gcQ _aXZ _uZM`, [[
                `div`, `.@_gxM _geQ`, [[
                  `div`, [[
                    `svg`, `&@style>font-size:0.81rem;width: 48px;height:48px;min-height:48px;height: 48px`, [[
                      `circle`, `&@style>fill:#2929f2;stroke:none`, `&@r>22px`, `&@cx>24px`, `&@cy>24px`], [
                      `text`, `&@x>24`, `&@y>28`, `&@style>text-anchor: middle;fill:#fff`, `~@${Zone.drop[1][0]}${Zone.drop[1][1]}`]]]]], [
                  `div`, `.@_eYG`, [[
                    `div`, `.@tXx _aA2`, [[
                      `a`, `#@getZoneOptions`, `.@_aA2`, `&@href>javascript:;`, `&@style>text-transform: capitalize`, `~@${Zone.locale}`]]], [
                    `div`, [[`span`, `&@style>text-transform:uppercase;color:#999;font-size:11px`, `~@${Zone.drop[0][0]} ${Zone.drop[0][1]} - ${Zone.drop[1][0]} ${Zone.drop[1][1]}`]]]]], [
                  `div`, `.@_QZg _gMz`, [[`a`, `#@DelZonal`, `.@-_tX DelColor`, `&@href>javascript:;`]]]]]]], [
              `div`, `.@_aXY _XsQ _aA2`, `&@style>max-height: calc(100vh - 170px);`, [[
                `div`, `.@_sZ2`, `&@style>font-size:.81rem`, [[
                  `div`, `.@_yZS`, [[
                    `span`, `&@style>color:red`, `~@*Prices coded in red are discounted rates for perishable packages (i.e. fast foods) which do not need to come from our warehouses' stock.`]]], [
                  `div`, ModelRateSet]]]]]]]]]]]]]]];

      ModelZones.push([
        `div`, `.@_gQ`, [[
          `div`, `.@_gxM _geQ`, [[
            `div`, [[
              `a`, `#@getZoneOptions`, `&@for>${Zone.locale}`, `.@_cCq`, `&@style>width:48px;height:48px`, `&@href>javascript:;`, [[
                `svg`, `&@style>width: 48px;height:48px;min-height:48px;height: 48px`, [[
                  `circle`, `#@getZoneOptions`, `&@for>${Zone.locale}`, `&@style>fill:#2929f2;stroke:none`, `&@r>22px`, `&@cx>24px`, `&@cy>24px`], [
                  `text`, `#@getZoneOptions`, `&@for>${Zone.locale}`, `&@x>24`, `&@y>28`, `&@style>text-anchor: middle;fill:#fff`, `~@${Zone.drop[1][0]}${Zone.drop[1][1]}`]]]]]]], [
            `div`, `.@_eYG`, [[
              `div`, `.@tXx _aA2`, [[
                `a`, `#@getZoneOptions`, `&@for>${Zone.locale}`, `.@_aA2`, `&@href>javascript:;`, `&@style>text-transform: capitalize`, `~@${Zone.locale}`]]], [
                `div`, [[`span`, `&@style>text-transform:uppercase;color:#999;font-size:11px`, `~@${Zone.drop[0][0]} ${Zone.drop[0][1]} - ${Zone.drop[1][0]} ${Zone.drop[1][1]}`]]]]]]]]]);
    })

    return [
    `main`, `.@_xC2`, [[
      `div`, `.@_tY0`, [[
        `section`, `.@_-Zz`, `&@style>background-image:url(gp/p/store/assets/clothing_hero_0.jpg);background-repeat:no-repeat;min-height:300px;background-size: 100%`, [[
          `div`, `.@_cX3`, [[
            `div`, `.@_gxQ _gxM _X2Y _gxZ`, `&@style>color:#fff;min-height:300px`, [[
              `div`, `.@gxQ _gQ0 _S8Y _c3x`, [[
                `span`, `&@style>padding-bottom: 24px;font-weight:600;text-transform:uppercase`, `~@Clothing sale, April Special`], [
                `div`, `~@Get affordable deals on great quality second-hand apparel, garments & clothing, with thrift rates as low as k£. 50.`], [
                `div`, `&@style>padding: 24px 0`, [[
                  `div`, `.@QZg`, [[
                    `div`, `.@_gM_0 _agM _guZ gMX`, `&@style>max-width: 200px`, [[
                      `a`, `.@_TX_a _atX _utQ _gMX _aA0`, `&@href>/store/clothing`, `~@shop now`]]]]]]]]], [
              `div`, `.@_ge0 _c3x _Qtx`, [[]]]]]]]]],
        Shelve(`fast food & eatery`, Retail),
        Shelve(`fruits & vegetables`, Retail), [
        `section`, `.@_g29`, `&@style>line-height:1.5rem;background:#14312d`, [[
          `div`, `.@_cX3`, [[
            `div`, `.@_gxQ _gxM _X2Y _gxZ`, `&@style>min-height:250px`, [[
              `div`, `.@_gxQ _gQ0 _S8Y _c3x`, [[
                `h1`, `.@_tx1 _atX`, `~@Corrde Vendors`]]], [
              `div`, `.@_ge0 _c3x _Qtx`, [[`span`, `&@style>padding-bottom: 24px;font-weight:600`, `~@Become a Partner`], [
                `div`, `~@Grow your business and reach new patners by patnering with us.`], [
                `div`, `&@style>padding: 24px 0`, [[
                  `div`, `.@QZg`, [[
                    `div`, `.@_gM_0 _agM _guZ gMX`, `&@style>max-width: 450px`, [[
                      `a`, `#@CreateStore`, `.@_TX_a _atX _utQ _gMX _aA0`, `&@href>javascript:;`, `~@sign up your store`]]]]]]]]]]]]]]],  
        Shelve(`bread & bakery`, Retail),  
        Shelve(`deli`, Retail),
        Shelve(`beverages`, Retail),
        Shelve(`pantry`, Retail),  
        Shelve(`alcohol`, Retail),  
        Shelve(`beauty & personal care`, Retail),   
        Shelve(`clothing`, Retail),
        ModelPayAd, [
        `section`, [[
          `div`, `.@_sZ2 _-Zz`, [[
                    `div`, `.@_cX3`, [[
                      `div`, `.@_yZS _gxM _geQ _gMX`, [[
                        `div`,`.@_gxM`, [[`span`, `.@_aA2`, `~@Delivery Time & Rates`]]]]]]], [
                    `div`, [[`div`, `.@_gZy`, ModelZones], [
                    `div`, `.@_gxQ`, `&@style>padding: 0 0 24px`, [[
                      `div`, `.@_gM_a _agM _guZ`, [[
                        `a`, `.@_TX_a _atX _utQ`, `&@href>javascript:;`, `~@All Cities & Towns`]]]]]]]]]]], [
                `aside`, `#@ModalSet`], [
                `script`, `#@ZonalModalSet`, `~@${JSON.stringify({ZonalModalSet: ModalSet})}`]]]]]
  },

  ModelStockSuite () {

    let StockAva = [1, 2, 3, 4, 5]; 

    let Stores = [`Grocery`,  `Store`];

    let StockState = [`New`, `Used`, `Refurbished`, `Other`];

    let Sets = [
      `alcohol`, `baby`, `beverages`, `beauty & personal care`, `bread & bakery`, `christmas shop`, `clothing`, `cold & flu`, 
      `deli`,  `eggs & dairy`, `frozen`, `fruits & vegetables`, `garden & tools`, `gift shop`, `health & nutrition`, 
      `home, kitchen & dine`, `household essentials`, `meat & seafood`, `office & electronics`, `organic shop`, 
      `pantry`, `party supplies & crafts`, `pets`, `sports & outdoor`, `snacks & candy`, `toys`];

    let Catalog = [
      `bulk beverages`, `seasonal & new flavors`, `domestic beer`, `fresh flowers`, `fresh fruit`, `fresh herbs`, 
      `fresh prepared produce`, `fresh vegetables`, `fruit juice`, `import beer`, `craft beer`, `hard seltzer & flavored beverages`, 
      `nuts dried fruit & healthy snacks`, `red wine`, `white wine`, `rose & blush wine`, `sports & energy drinks`, `champagne & sparkling wine`, `liquor`, `soft drinks`];

    let Shelves = [
      `all domestic beer`, `big domestic breweries`, `energy drinks`, `heavy`, `light`, `sports & vitamin drinks`, `value`];

    let Sizes = [`6 pack`, `9 pack`, `12 pack`, `15 pack`, `18 pack`, `24 pack`, `30 pack`];

    let Classes = [`ale`, `energy drinks`, `energy enhancers`, `flavored malt beverage`, `flavored sparkling`, `lager`, `malt liquor`];

    let Brands = [`budweiser`, `coca-cola`, `fila`, `monster energy`, `puma`, `red bull`];

    let Zones = [`germany`, `kenya`, `norway`, `south africa`, `sweden`, `united states of america`];

    let Orients = [`boys`, `girls`, `him`, `her`, `kids`, `men`, `women`, `unisex`]

    let ModelStockAva = [];

    let ModelStore = [];

    let ModelStockState = [];

    let ModelSets = [];

    let ModelCatalog = [];

    let ModelShelves = [];

    let ModelSizes = []

    let ModelClass = []

    let ModelBrands = [];

    let ModelZones = [];

    let ModelOrients = [];

    StockAva.forEach(Ava => {

      ModelStockAva.push([
        `div`, `#@File`, `.@_gQ`, [[
          `div`, `.@_gxM`, [[
            `a`, `.@_cCq`, `&@style>width:72px;height:72px`, `&@href>javascript:;`, [[
              `img`, `#@Ava-${StockAva.indexOf(Ava)}`, `.@file`, `&@alt>`, `&@style>width: 100%`, `&@src>`]]], [
            `div`, `.@_eYG`, `#@DelAva`, [[`a`, `#@DelAva-${StockAva.indexOf(Ava)}`, `.@_-Zz -_tX DelColor`, `&@href>javascript:;`]]]]]]])
    });

    Stores.forEach(Store => {

      ModelStore.push([
        `div`, `.@_qXq`, `&@style>width:17.5%;margin-bottom:14px`, [[
          `label`, `.@_tXv`, `&@role>radio`, [[
            `input`, `&@type>radio`, `#@StockStore`, `&@value>${Store}`, `&@name>-Store`], [
            `span`, `.@_tCw aA2 tXx`, `~@${Store}`]]]]])
    });

    Sets.forEach(Set => {

      ModelSets.push([
        `div`, `.@_qXq`, `&@style>width:17.5%;margin-bottom:14px;pdding-right:14px`, [[
          `label`, `.@_tXv`, `&@role>radio`, [[
            `input`, `&@type>radio`, `#@Sets`, `&@value>${Set}`, `&@name>-Sets`], [
            `span`, `.@_tCw aA2 tXx`, `~@${Set}`]]]]])
    });

    StockState.forEach(State => {

      ModelStockState.push([
        `div`, `.@_qXq`, `&@style>width:17.5%;margin-bottom:14px`, [[
          `label`, `.@_tXv`, `&@role>radio`, [[
            `input`, `&@type>radio`, `#@StockState`, `&@value>${State}`, `&@name>-States`], [
            `span`, `.@_tCw aA2 tXx`, `~@${State}`]]]]])
    });

    Catalog.forEach(Set => {

      ModelCatalog.push([
        `div`, `.@_qXq`, `&@style>width:17.5%;margin-bottom:14px`, [[
          `label`, `.@_tXv`, `&@role>radio`, [[
            `input`, `&@type>radio`, `#@Catalog`, `&@value>${Set}`, `&@name>-Catalog`], [
            `span`, `.@_tCw aA2 tXx`, `~@${Set}`]]]]])
    });

    Shelves.forEach(Shelve => {

      ModelShelves.push([
        `div`, `.@_qXq`, `&@style>width:17.5%;margin-bottom:14px`, [[
          `label`, `.@_tXv`, `&@role>radio`, [[
            `input`, `&@type>radio`, `#@Shelves`, `&@value>${Shelve}`, `&@name>-Shelve`], [
            `span`, `.@_tCw aA2 tXx`, `~@${Shelve}`]]]]])
    });

    Sizes.forEach(Size => {

      ModelSizes.push([
        `div`, `.@_qXq`, `&@style>width:17.5%;margin-bottom:14px`, [[
          `label`, `.@_tXv`, `&@role>radio`, [[
            `input`, `&@type>radio`, `#@Sizes`, `&@value>${Size}`, `&@name>-Sizes`], [
            `span`, `.@_tCw aA2 tXx`, `~@${Size}`]]]]])
    });

    Classes.forEach(Class_ => {

      ModelClass.push([
        `div`, `.@_qXq`, `&@style>width:17.5%;margin-bottom:14px`, [[
          `label`, `.@_tXv`, `&@role>radio`, [[
            `input`, `&@type>radio`, `#@Classes`, `&@value>${Class_}`, `&@name>-Classes`], [
            `span`, `.@_tCw aA2 tXx`, `~@${Class_}`]]]]])
    });

    Brands.forEach(Brand => {

      ModelBrands.push([
        `div`, `.@_qXq`, `&@style>width:17.5%;margin-bottom:14px`, [[
          `label`, `.@_tXv`, `&@role>radio`, [[
            `input`, `&@type>radio`, `#@Brands`, `&@value>${Brand}`, `&@name>-Brands`], [
            `span`, `.@_tCw aA2 tXx`, `~@${Brand}`]]]]])
    });

    Zones.forEach(Zone => {

      ModelZones.push([
        `div`, `.@_qXq`, `&@style>width:17.5%;margin-bottom:14px`, [[
          `label`, `.@_tXv`, `&@role>radio`, [[
            `input`, `&@type>radio`, `#@Markets`, `&@value>${Zone}`, `&@name>-Zones`], [
            `span`, `.@_tCw aA2 tXx`, `~@${Zone}`]]]]])
    });

    Orients.forEach(Orient => {

      ModelOrients.push([
        `div`, `.@_qXq`, `&@style>width:17.5%;margin-bottom:14px`, [[
          `label`, `.@_tXv`, `&@role>radio`, [[
            `input`, `&@type>radio`, `#@Orients`, `&@value>${Orient}`, `&@name>-Orients`], [
            `span`, `.@_tCw aA2 tXx`, `~@${Orient}`]]]]])
    });

    return [
    `div`,  `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;font-size:11px`, [[
      `div`, `.@_gxM _gMX _gcQ _uZM`, [[
        `div`, `.@_QZg`, [[
          `span`, `.@_`, [[`a`, `#@foldStockSuite`, `.@-_tX DelColor`, `&@href>javascript:;`]]]]]]], [
      `div`, `.@_aXY`, `&@style>margin:0 0 55px;max-height: calc(100vh - 180px);`, [[
        `div`, `.@_sZ2`, `&@style>padding:14px`, [[
          `div`, `.@yZS`, [[
            `div`, `.@_gxM _yZS _uZM`, [[
              `div`, `.@_eYG`, `~@Product Photos & Media`], [
              `div`, `.@_QZg _gMz`, [[
                `div`, `.@_axS`, [[
                  `label`, `&@for>file`, `.@-_tX AddStoriesColor`, `&@style>font-size:11px`, `~@Add Photo`], 
                  this.inputFile()]]]]]], [
            `div`, `.@_gZy`, ModelStockAva]]], [
          `div`, `.@sZ2`, [[
            `div`, `.@_gxM _yZS _uZM`, [[
              `div`, `.@_eYG`, `~@Shops`], [
              `div`, `.@_QZg _gMz`, []]]], [
            `div`, `.@_gZy`, ModelStore]]], [
          `div`, `.@sZ2`, [[
            `div`, `.@_gxM _yZS _uZM`, [[
              `div`, `.@_eYG`, `~@Condition`], [
              `div`, `.@_QZg _gMz`, []]]], [
            `div`, `.@_gZy`, ModelStockState]]], [
          `div`, `.@sZ2`, [[
            `div`, `.@_gxM _yZS _uZM`, [[
              `div`, `.@_eYG`, `~@Departments`], [
              `div`, `.@_QZg _gMz`, []]]], [
            `div`, `.@_gZy`, ModelSets]]], [
          `div`, `.@sZ2`, [[
            `div`, `.@_gxM _yZS _uZM`, [[
              `div`, `.@_eYG`, `~@Categories`], [
              `div`, `.@_QZg _gMz`, []]]], [
            `div`, `.@_gZy`, ModelCatalog]]], [
          `div`, `.@sZ2`, [[
            `div`, `.@_gxM _yZS _uZM`, [[
              `div`, `.@_eYG`, `~@Shelves`], [
              `div`, `.@_QZg _gMz`, []]]], [
            `div`, `.@_gZy`, ModelShelves]]], [
          `div`, `.@sZ2`, [[
            `div`, `.@_gxM _yZS _uZM`, [[
              `div`, `.@_eYG`, `~@Sizes`], [
              `div`, `.@_QZg _gMz`, []]]], [
            `div`, `.@_gZy`, ModelSizes]]], [
          `div`, `.@sZ2`, [[
            `div`, `.@_gxM _yZS _uZM`, [[
              `div`, `.@_eYG`, `~@Types`], [
              `div`, `.@_QZg _gMz`, []]]], [
            `div`, `.@_gZy`, ModelClass]]], [
          `div`, `.@sZ2`, [[
            `div`, `.@_gxM _yZS _uZM`, [[
              `div`, `.@_eYG`, `~@Brands`], [
              `div`, `.@_QZg _gMz`, []]]], [
            `div`, `.@_gZy`, ModelBrands]]], [
          `div`, `.@sZ2`, [[
            `div`, `.@_gxM _yZS _uZM`, [[
              `div`, `.@_eYG`, `~@Markets`], [
              `div`, `.@_QZg _gMz`, []]]], [
            `div`, `.@_gZy`, ModelZones]]], [
          `div`, `.@sZ2`, [[
            `div`, `.@_gxM _yZS _uZM`, [[
              `div`, `.@_eYG`, `~@Orientation & Customer Designation`], [
              `div`, `.@_QZg _gMz`, []]]], [
            `div`, `.@_gZy`, ModelOrients]]], [
          `div`, `.@sZ2`, [[
            `div`, `.@_gxM _yZS _uZM`, [[
              `div`, `.@_eYG`, `~@Mass Unit`]]], [
            `div`, `.@_eYG`, [[
              `div`, `.@_yZS _gMX`, [[
                `div`, `.@_UFA _gMX`, [[
                  `input`, `#@Mass`, `.@_RRD _aA2 _pVa`, `&@autocomplete>off`, `&@placeholder>Mass in grams`]]]]]]]]], [
          `div`, `.@sZ2`, [[
            `div`, `.@_gxM _yZS _uZM`, [[
              `div`, `.@_eYG`, `~@Units`]]], [
            `div`, `.@_eYG`, [[
              `div`, `.@_yZS _gMX`, [[
                `div`, `.@_UFA _gMX`, [[
                  `input`, `#@Units`, `.@_RRD _aA2 _pVa`, `&@autocomplete>off`, `&@placeholder>Package Unit`]]]]]]]]], [
          `div`, `.@sZ2`, [[
            `div`, `.@_gxM _yZS _uZM`, [[
              `div`, `.@_eYG`, `~@Product`]]], [
            `div`, `.@_eYG`, [[
              `div`, `.@_yZS _gMX`, [[
                `div`, `.@_UFA _gMX`, [[
                  `input`, `#@Product`, `.@_RRD _aA2 _pVa`, `&@autocomplete>off`, `&@placeholder>Product Title`]]]]]]]]], [
          `div`, `.@sZ2`, [[
            `div`, `.@_gxM _yZS _uZM`, [[
              `div`, `.@_eYG`, `~@Store Price`]]], [
            `div`, `.@_eYG`, [[
              `div`, `.@_yZS _gMX`, [[
                `div`, `.@_UFA _gMX`, [[
                  `input`, `#@Dollars`, `.@_RRD _aA2 _pVa`, `&@autocomplete>off`, `&@placeholder>Amount in Dollars`]]]]]]]]], [
          `div`, `.@sZ2`, [[
            `div`, `.@_gxM _yZS _uZM`, [[
              `div`, `.@_eYG`, `~@Description & Details`]]], [
            `div`, `.@_eYG`, [[
              `div`, `.@_yZS _gMX`, [[
                `textarea`, `&@style>background: none`, `#@StockString`, `.@-_tyq _aA2`, `&@autocomplete>off`, `&@placeholder>Write About Product`]]]]]]]]], [
        `div`, `#@Sale`, `.@_sZ2`, []]]], [
          `div`, `.@_azX- _gMX _gp0 _gmg`, [[
            `div`, `.@_gxM _gMX`, [[
              `div`, `.@_gMX`, [[
                `div`, `.@_eYG`], [
                `div`, `.@_QZg _gMz`, [[
                  `div`, `.@_axS`, [[
                    `div`, `.@_gM_a _agM _guZ`, [[
                      `a`, `#@AddStock`, `.@_TX_a _atX _utQ`, `&@href>javascript:;`, `&@style>font-size:11px`, `~@Save Stock`]]]]]]]]]]]]]]];  

  },

  ModelWait (JSArgs) {

    let ModelJS = []

    if (JSArgs) {

      ModelJS = [`script`, `&@type>text/javascript`, `~@let JSModel = ${JSON.stringify(JSArgs)}`]
    }

    return [
    `main`, `.@_xC2 _aA2`, [[`div`, `.@_geQ`, `&@style>justify-content:center`, [[`span`, `.@-_tX AppMedium`, `&@style>width:56px;height:56px`]]], ModelJS]];

  },

  ModelShelf (locale, Sell) {

    return [
    `section`, `#@ModelShelf`, [[
      `div`, `.@_g0`, `&@style>border-bottom: 1px solid #e6e7e8`, [[
        `div`, `.@_gxM _geQ`, [[
          `div`, [[`p`, `.@_tXx`, `&@style>color:rgb(34, 34, 34)`, `cheers to the holidays`]]], [
          `div`, `.@_QZg`, [[`a`, `.@_aA0`, `&@style>text-decoration:underline`, `&@href>javascript:;`, `~@view all`]]]]]]]]]
  },

  ModalMyCart () {

    return [
    `div`,  `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;font-size:12px`, [[
      `div`, `.@_gxM _gMX _gcQ _uZM`, [[
        `div`, `~@My Shopping Cart`], [
        `div`, `.@_QZg`, [[
          `span`, `.@_`, [[`a`, `#@foldMyCart`, `.@-_tX DelColor`, `&@href>javascript:;`]]]]]]], [
      `div`, `.@_aXY`, `&@style>margin:0 0 55px;max-height: calc(100vh - 180px);`, [[
        `div`, `.@_sZ2`, `&@style>padding:14px`, []]]], [
          `div`, `.@_azX- _gMX _gp0 _gmg`, [[
            `div`, `.@_gxM _gMX`, [[
              `div`, `.@_gMX`, [[
                `div`, `.@_eYG`], [
                `div`, `.@_QZg _gMz`, [[
                  `div`, `.@_axS`, [[
                    `div`, `.@_gM_a _agM _guZ`, [[
                      `a`, `#@toCheckOut`, `.@_TX_a _atX _utQ`, `&@href>javascript:;`, `&@style>font-size:12px`, `~@proceed to checkout`]]]]]]]]]]]]]]];


  },

  ModelRetailStock (Sell, MD5) {

    let RowSet = Sell.Sell[1][MD5];

    let Swap = [RetailMaps[RowSet.market.toLowerCase()].swapAlpha, RetailMaps[RowSet.market.toLowerCase()].swap];

    let ModelJSON = `&@data>{
      &quot;alpha&quot;: &quot;${RowSet.alpha}&quot;,
      &quot;dollars&quot;: &quot;${RowSet.dollars}&quot;,
      &quot;file&quot;: &quot;${RowSet.files[0]}&quot;,
      &quot;mass&quot;: &quot;${RowSet.mass}&quot;,
      &quot;MD5&quot;: &quot;${RowSet.MD5}&quot;,
      &quot;swap&quot;: &quot;${Swap[1]}&quot;,
      &quot;swapAlpha&quot;: &quot;${Swap[0]}&quot;}`;

    let Shelve = (Shelf, Sell) => {

      let Rows = Sell.Sell[0].sort((a, b) => {return b.log - a.log});

      Rows = Rows.slice(0, 6)

      let ModelShelve = [];

      let alpha = Shelf;

      //if (Shelf === `alcohol`) alpha = `cheers to the holidays`;

      Rows.forEach(Row => {

        if (Row.mass && Row.set === Shelf && Row.market === RowSet.market) {

          let ModelJSON = `&@data>{
            &quot;alpha&quot;: &quot;${Row.alpha.replace(new RegExp(`/`, `g`), `u/002F`)}&quot;,
            &quot;dollars&quot;: &quot;${Row.dollars}&quot;,
            &quot;file&quot;: &quot;${Row.files[0]}&quot;,
            &quot;MD5&quot;: &quot;${RowSet.MD5}&quot;,
            &quot;MD5&quot;: &quot;${Row.MD5}&quot;,
            &quot;swap&quot;: &quot;${Swap[1]}&quot;,
            &quot;swapAlpha&quot;: &quot;${Swap[0]}&quot;}`,

            dollars = (Row.dollars*Swap[1]).toFixed(2);

          if (Row.set === `clothing`) {

            ModelShelve.push([
            `div`, `#@ModelShelf-2`, [[
              `div`, `.@_gQ-2`, [[
                `div`, `.@_gY-0`, [[
                  `div`, `&@style>height:200px`, [[
                    `a`, `@ModalCue`, `.@_Qg-2`, [[
                     `div`, `.@Qg0`, [[
                      `div`, [[`img`, `#@pullRetailStock`, `&@sum>${Row.MD5}`, `&@alt>${Row.alpha}`, `&@src>/${Row.files[0]}`]]]]]], `&@href>javascript:;`]]], [
                  `div`, `&@style>height:40px`], [
                  `div`, `&@style>height:64px`, [[
                    `div`, `.@_Aa`, [[
                      `a`, `.@_aA`, `&@href>javascript:;`, [[
                        `span`, `#@pullRetailStock`, `.@_Ax`, `&@sum>${Row.MD5}`, [[`strong`, `.@_tXx`, `~@${Row.factory}`]]], [
                        `span`, `#@pullRetailStock`, `&@sum>${Row.MD5}`, `&@style>line-height:1.5`, `~@${Row.alpha}`]]]]]]], [
                  `div`, `&@style>height:88px`, [[
                    `div`, [[
                      `span`, [[`span`, `.@_tXx _p0`, `&@style>padding-top:16px;display:block`, `~@${Swap[0]} ${dollars.toLocaleString()}`]]], [
                      `div`, `&@style>display:block;font-size:11px`, [[`span`, `~@Free delivery on `], [`span`, `~@ orders over ${Swap[0]} 250`]]]]]]], [
                  `div`, `&@style>height:30px`, [[
                    `div`, `.@_2pY`, [[
                      `div`, `&@style>width:max-content`, [[
                      `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe;${(Row.pile && Row.pile > 0)?``:`border-color:#000;color:#000;background:none`}`, [[
                        `a`, `#@${(Row.pile && Row.pile > 0)?`alterCart`:`null`}`, ModelJSON, `.@_TX_a _atX`, `&@href>javascript:;`, `&@style>font-size:12px;font-weight:300;${(Row.pile && Row.pile > 0)?``:`color:#000`}`, `~@${(Row.pile && Row.pile > 0)?`add to cart`:`out of stock`}`]]]]]]]]]]]]]]]);
          }

          else {

            ModelShelve.push([
            `div`, `.@_gA0`, [[
              `div`, `.@_gY`, [[
                `a`, `.@_Qg`, [[
                  `div`, `.@_Qg0`, [[`img`, `&@alt>${Row.alpha}`, `&@src>/${Row.files[0]}`]]]], `&@href>/grocery/${Row.MD5}/`], [
                `div`, [[
                  `div`, `.@_pY`, [[
                    `div`, `.@_Xx _gxM`, [[
                      `span`, `.@_tXx`, [[`span`, `.@_p0`, `~@${Swap[0]} ${dollars.toLocaleString()}`]]], [
                      `span`, `.@_gp2`, [[`span`, `.@_p2`, `~@(${Row.units})`]]]]], [
                    `a`, `.@_a2`, [[
                      `span`, `&@style>line-height:22px;-moz-orient:vertical;display:-webkit-box;overflow:hidden;-webkit-line-clamp:3;font-size:12px`, `~@${Row.alpha}`]], `&@href>/grocery/${Row.MD5}/`]]], [
                  `div`, `.@_2pY`, [[
                    `div`, `&@style>width:max-content`, [[
                      `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe;${(Row.pile && Row.pile > 0)?``:`border-color:#000;color:#000;background:none`}`, [[
                        `a`, `#@${(Row.pile && Row.pile > 0)?`alterCart`:`null`}`, ModelJSON, `.@_TX_a _atX`, `&@href>javascript:;`, `&@style>font-size:12px;font-weight:300;${(Row.pile && Row.pile > 0)?``:`color:#000`}`, `~@${(Row.pile && Row.pile > 0)?`add to cart`:`out of stock`}`]]]]]]]]]]]]]);
          }
        }
      });

      return [
      `section`, `#@ModelShelf`, [[
        `div`, `.@_g0`, `&@style>border-bottom: 1px solid #e6e7e8;margin-top:16px`, [[
          `div`, `.@_gxM _geQ _cX3`, `&@style>margin-bottom:16px`, [[
            `div`, [[`p`, `.@_tXx`, `&@style>color:rgb(34, 34, 34)`, `~@Related Products`]]]]], [
          `div`, `.@_gX0`, ModelShelve]]]]]
    }

    let ModelAvaFiles = [];

    RowSet.files.forEach(File => {

      ModelAvaFiles.push([
        `a`, `.@_cCq _4Qx`, `&@style>width:36px;height:36px;`, `&@href>javascript:;`, [[`img`, `&@style>width:100%;height:100%;`, `&@src>/${File}`]]])
    })

    return [
    `main`, `.@_xC2`, [[
      `div`, `.@_tY0`, [[
        `section`, `#@ModelRetailStock`, [[
          `div`, [[
            `div`, `&@style>max-width:2560px;margin: 0 auto`, [[
              `div`], [
              `div`, `.@_gZy`, [[
                `div`, `.@_g0X`, [[
                  `div`, `.@_yZ`, [[
                    `div`, `&@style>height:100%;overflow:hidden`, [[
                      `div`, `.@_gA`, `&@style>z-index:1;position:absolute;top:50%;transform:translateY(-50%);left:0`], [
                      `div`, `.@_gA`, [[`img`, `&@alt>${RowSet.alpha}`, `&@src>/${RowSet.files[0]}`]]], [
                      `div`, `.@_gA`, `&@style>z-index:1;position:absolute;top:50%;transform:translateY(-50%);right:0`]]]]]]], [
                `div`, `.@_g2X`, [[
                  `div`, [[`div`, `.@_gMX uZM _yZS`, ModelAvaFiles]]], [
                  `div`, [[`span`, `.@_yZS`, `&@style>margin-bottom:12px;font-size:17px;text-transform: capitalize`, `~@${RowSet.alpha}`]]], [
                  `div`, `.@_gxM _yZS`, [[
                    `div`, [[
                      `div`, [[`span`, `.@_tXx`, `&@style>color:#1185fe;font-size:17px;text-transform:uppercase`, `~@${Swap[0]}${(RowSet.dollars*Swap[1]).toFixed(2)}`]]], [
                      `div`, [[`span`, `.@tXx`, `&@style>color:#999;text-transform:uppercase`, `~@in stock`]]]]], [
                      `div`, `.@_QZg`, `&@style>width:mx-content`, [[
                        `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe`, [[
                          `a`, `#@alterCart`, ModelJSON, `.@_TX_a _atX`, `&@href>javascript:;`, `&@style>font-size:12px;text-transform:uppercase`, `~@add to cart`]]]]]]], [
                  `div`, `.@_yZS`, `&@style>font-size:12.5px`, [[
                    `div`, [[`span`, `.@_tXx`, `&@style>text-transform:uppercase`, `~@market & shipping within`]]], [
                    `div`, `.@_gxM`, [[
                      `div`, [[`span`, `.@_tXx`, `&@style>color:#999;text-transform:uppercase`, `~@${RowSet.market}`]]], [
                      `div`, `.@_QZg`, `&@style>width:max-content`, [[
                        `div`, `.@_gM_a _agM _guZ`, `&@style>backgound:#1185fe`, [[
                          `a`, `#@retailMaps`, `.@_TX_a _atX _utQ`, `&@href>javascript:;`, `&@style>font-size:11px;text-transform:uppercase`, `~@view shipping guide`]]]]]]]]]]]]], 
              Shelve(RowSet.set, Sell)]]]]]]]]]]
  },

  ModalRetailRates (zone) {

    let Swap = [RetailMaps[zone].swapAlpha, RetailMaps[zone].swap];

    let ModalSet = [];

    RetailMaps[zone].zones.forEach(Zone => {

      let ModelRateSet = []

      Zone.rates.forEach(Sale => {

        let ModelVolumeSet = [];

        Sale.grams.forEach(Volume => {

          ModelVolumeSet.push([
            `div`, `.@_gxM _yZS`, `&@style>text-transform:uppercase`, [[
              `span`, `&@style>color: #999`, `~@${Volume.gramSetAlpha[0]} grams - ${Volume.gramSetAlpha[1]} grams`], [
              `div`, `.@_QZg _gxM`, [[
                `div`, [[
                  `span`, `&@style>color:red;padding:0 14px`, `~@${Swap[0]} ${(Volume.sale[0] * Swap[1]).toFixed(2)}`]]], [
                `div`, [[`span`, `&@style>`, `~@${Swap[0]} ${(Volume.sale[1] * Swap[1]).toFixed(2)}`]]]]]]])
        })

        ModelRateSet.push([
          `div`, [[
            `div`, `.@_yZS _uZM`, [[
              `span`, `&@style>text-transform:uppercase`, `~@from ${Swap[0]} ${(Sale.saleSetAlpha[0]*Swap[1]).toFixed(2)} - ${Swap[0]} ${(Sale.saleSetAlpha[1]*Swap[1]).toFixed(2)}`]]], [
            `div`, ModelVolumeSet]]])
      })

      ModalSet.push([
      `div`, [[
        `div`, `.@_gcQ _aXZ _uZM`, `&@style>padding:8px 0`, [[
          `div`, `.@_gxM _geQ`, [[
            `div`, [[
              `svg`, `&@style>font-size:11px;width: 48px;height:48px;min-height:48px;height: 48px`, [[
                `circle`, `&@style>fill:#2929f2;stroke:none`, `&@r>22px`, `&@cx>24px`, `&@cy>24px`], [
                  `text`, `&@x>24`, `&@y>28`, `&@style>text-anchor: middle;fill:#fff`, `~@${Zone.drop[1][0]}${Zone.drop[1][1]}`]]]]], [
              `div`, `.@_eYG`, [[
                `div`, `.@tXx _aA2`, [[
                  `a`, `@getZoneOptions`, `.@_aA2 _tXx`, `&@href>javascript:;`, `&@style>text-transform: capitalize`, `~@${Zone.locale}`]]], [
                `div`, [[`span`, `&@style>text-transform:uppercase;color:#999;font-size:11px`, `~@${Zone.drop[0][0]} ${Zone.drop[0][1]} - ${Zone.drop[1][0]} ${Zone.drop[1][1]}`]]]]]]]]], [
        `div`, ModelRateSet]]]);
    })

    return [
    `div`, `&@style>letter-spacing:0.75px`, [[
      `div`, `.@_gcQ _aXZ _uZM`, [[
        `div`, `.@_gxM _geQ`, [[`div`, `.@_eYG`], [`div`, `.@_QZg _gMz`, [[`a`, `#@DelRetailRates`, `.@-_tX DelColor`, `&@href>javascript:;`]]]]]]], [
      `div`, `.@_aXY _XsQ _aA2`, `&@style>max-height: calc(100vh - 170px);`, [[
        `div`, `.@_sZ2`, `&@style>font-size:.81rem`, [[
          `div`, `.@_yZS`, [[
            `span`, `&@style>color:red`, `~@*Prices coded in red are discounted rates for perishable packages (i.e. fast foods) which do not need to come from our warehouses' stock.`]]], [
          `div`, ModalSet]]]]]]]
  },

  ModalSets () {

    let ModelSets = [];

    RetailSets.forEach((Catalog) => {

      let Shelf = Catalog;

      Shelf = Shelf.replace(new RegExp(/\s/, `g`), `_`);

      ModelSets.push([`li`, `.@_-zZx`, [[`a`, `.@_-xQy`, `&@href>/store/${Shelf}/`, [[`span`, `.@_tAx _aA2`, `~@${Catalog}`]]]]]);
    });

    return [
      `div`, `&@style>letter-spacing:0.75px`, [[
        `div`, `.@_gcQ _aXZ _uZM`, [[
          `div`, `.@_geQ _gxM _eYG`, [[
            `div`, `.@_aA2`, [[
              `div`, [[
                `span`, `&@style>`, `~@Catalog & Shelves`]]]]]]], [
          `div`, `.@_QZg _gMz`, [[`a`, `#@foldModalSets`, `.@-_tX DelColor`, `&@href>javascript:;`]]]]], [
        `div`, `.@_aXY XsQ _aA2`, `&@style>max-height: calc(100vh - 170px);`, [[
          `ul`, `.@_aYy`, ModelSets]]]]]

  },

  ModelRetailSet (alpha, locale, RetailSet) {

    let Swap = [RetailMaps[locale].swapAlpha, RetailMaps[locale].swap];

    let Rows = RetailSet.sort((a, b) => {return b.log - a.log});

    let ModelShelve = [];

    RetailSet.slice(0, 30);

    RetailSet.forEach(Row => {

      let ModelJSON = `&@data>{
        &quot;alpha&quot;: &quot;${Row.alpha.replace(new RegExp(`/`, `g`), `u/002F`)}&quot;,
        &quot;dollars&quot;: &quot;${Row.dollars}&quot;,
        &quot;file&quot;: &quot;${Row.files[0]}&quot;,
        &quot;mass&quot;: &quot;${Row.mass}&quot;,
        &quot;MD5&quot;: &quot;${Row.MD5}&quot;,
        &quot;swap&quot;: &quot;${Swap[1]}&quot;,
        &quot;swapAlpha&quot;: &quot;${Swap[0]}&quot;}`,

        dollars = (Row.dollars*Swap[1]).toFixed(2);

          if (Row.set === `clothing`) {

            ModelShelve.push([
            `div`, `#@ModelShelf-2`, [[
              `div`, `.@_gQ-2`, [[
                `div`, `.@_gY-0`, [[
                  `div`, `&@style>height:200px`, [[
                    `a`, `@ModalCue`, `.@_Qg-2`, [[
                     `div`, `.@Qg0`, [[
                      `div`, [[`img`, `#@pullRetailStock`, `&@sum>${Row.MD5}`, `&@alt>${Row.alpha}`, `&@src>/${Row.files[0]}`]]]]]], `&@href>javascript:;`]]], [
                  `div`, `&@style>height:40px`], [
                  `div`, `&@style>height:64px`, [[
                    `div`, `.@_Aa`, [[
                      `a`, `.@_aA`, `&@href>javascript:;`, [[
                        `span`, `#@pullRetailStock`, `.@_Ax`, `&@sum>${Row.MD5}`, [[`strong`, `.@_tXx`, `~@${Row.factory}`]]], [
                        `span`, `#@pullRetailStock`, `&@sum>${Row.MD5}`, `&@style>line-height:1.5`, `~@${Row.alpha}`]]]]]]], [
                  `div`, `&@style>height:88px`, [[
                    `div`, [[
                      `span`, [[`span`, `.@_tXx _p0`, `&@style>padding-top:16px;display:block`, `~@${Swap[0]} ${dollars.toLocaleString()}`]]], [
                      `div`, `&@style>display:block;font-size:11px`, [[`span`, `~@Free delivery on `], [`span`, `~@ orders over ${Swap[0]} 250`]]]]]]], [
                  `div`, `&@style>height:30px`, [[
                    `div`, `.@_2pY`, [[
                      `div`, `&@style>width:max-content`, [[
                      `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe;${(Row.pile && Row.pile > 0)?``:`border-color:#000;color:#000;background:none`}`, [[
                        `a`, `#@${(Row.pile && Row.pile > 0)?`alterCart`:`null`}`, ModelJSON, `.@_TX_a _atX`, `&@href>javascript:;`, `&@style>font-size:12px;font-weight:300;${(Row.pile && Row.pile > 0)?``:`color:#000`}`, `~@${(Row.pile && Row.pile > 0)?`add to cart`:`out of stock`}`]]]]]]]]]]]]]]]);
          }

          else {

            ModelShelve.push([
            `div`, `.@_gA0`, [[
              `div`, `.@_gY`, [[
                `a`, `.@_Qg`, [[
                  `div`, `.@_Qg0`, [[`img`, `&@alt>${Row.alpha}`, `&@src>/${Row.files[0]}`]]]], `&@href>/grocery/${Row.MD5}/`], [
                `div`, [[
                  `div`, `.@_pY`, [[
                    `div`, `.@_Xx _gxM`, [[
                      `span`, `.@_tXx`, [[`span`, `.@_p0`, `~@${Swap[0]} ${dollars.toLocaleString()}`]]], [
                      `span`, `.@_gp2`, [[`span`, `.@_p2`, `~@(${Row.units})`]]]]], [
                    `a`, `.@_a2`, [[
                      `span`, `&@style>line-height:22px;-moz-orient:vertical;display:-webkit-box;overflow:hidden;-webkit-line-clamp:3;font-size:12px`, `~@${Row.alpha}`]], `&@href>/grocery/${Row.MD5}/`]]], [
                  `div`, `.@_2pY`, [[
                    `div`, `&@style>width:max-content`, [[
                      `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe;${(Row.pile && Row.pile > 0)?``:`border-color:#000;color:#000;background:none`}`, [[
                        `a`, `#@${(Row.pile && Row.pile > 0)?`alterCart`:`null`}`, ModelJSON, `.@_TX_a _atX`, `&@href>javascript:;`, `&@style>font-size:12px;font-weight:300;${(Row.pile && Row.pile > 0)?``:`color:#000`}`, `~@${(Row.pile && Row.pile > 0)?`add to cart`:`out of stock`}`]]]]]]]]]]]]]);
          }
    });

    return [
    `main`, `.@_xC2`, [[
      `div`, `.@_tY0`, [[
        `section`, `#@ModelShelf`, [[
          `div`, `.@_g0`, `&@style>border-bottom: 1px solid #e6e7e8;margin-top:16px`, [[
            `div`, `.@_gxM _geQ _cX3`, `&@style>margin-bottom:16px`, [[
              `div`, [[`p`, `.@_tXx`, `&@style>color:rgb(34, 34, 34)`, `~@${alpha}`]]], [
              `div`, `.@_QZg`, []]]], [
            `div`, `.@_gX0`, ModelShelve]]]]]]]]];
  },

  ModalRegions (locale) {

    if (!RetailMaps[locale]) return [];

    let ModelRegions = [];

    RetailMaps[locale].zones.forEach(Region => {

      ModelRegions.push([
        `div`, [[
          `div`, `.@_yZS _gxM geQ gMX _uZM`, [[
            `label`, `.@_tXv`, `&@role>radio`, [[
              `input`, `&@type>radio`, `#@getRegion`, `&@value>${Region.locale}`, `&@name>setSub`], [
                `span`, `.@_tCw _aA2 tXx`, `~@${Region.locale}`]]]]]]]);
    });

    return [
      `div`, `&@style>letter-spacing:0.75px`, [[
        `div`, `.@_gcQ _aXZ _uZM`, [[
          `div`, `.@_geQ _gxM _eYG`, [[
            `div`, `.@_aA2`, [[
              `div`, [[
                `span`, `&@style>`, `~@Choose Town For Shipping & Delivery`]]], [
              `div`, [[`span`, `@locale`, `.@_aA6`, `&@style>text-transform:uppercase; font-size:11px`, `~@${locale}`]]]]]]], [
          `div`, `.@_QZg _gMz`, [[`a`, `#@foldModalRegions`, `.@_-Zz -_tX DelColor`, `&@href>javascript:;`]]]]], [
        `div`, `.@_aXY _XsQ _aA2`, `&@style>max-height: calc(100vh - 170px);`, [[
          `div`, `.@_sZ2`, ModelRegions]]]]]

  },

  ModelPullPays: (Pays) => {

    let ModelPay = [];

    let FullPays = Pays;

    SlicePays = Pays.sort((a, b) => {return b.secs - a.secs});

    let fillFloat = float => {

      if (float < 10) return `0` + float;

      else return float;
    }

    SlicePays.forEach(Pay => {

      let Secs = new Date(parseInt(Pay.secs));

      ModelPay.push([
        `div`, `.@_g0`, [[
          `div`, `.@_p0 _yZS _gxM`, [[
            `span`, `&@style>color:#adbcc6`, `~@order `], [
            `span`, `&@style>color:#1185fe;padding-left:8px`, `~@ #${FullPays.length - (FullPays.indexOf(Pay) + 1)}`], [
            `div`, `.@_QZg`, [[
              `span`, `&@style>color:#adbcc6`, `~@${
                Secs.getUTCFullYear() + ` ` + 
                fillFloat(Secs.getUTCMonth() + 1) + ` ` + 
                fillFloat(Secs.getUTCDate()) + ` ` + 
                fillFloat(Secs.getUTCHours()) + 
                fillFloat(Secs.getUTCMinutes())}`]]]]], [
          `div`, `.@_gxM`, `&@style>padding:10px 24px;text-transform:capitalize`, [[
            `span`, `&@style>color:#adbcc6;padding-left:24px`, `~@order no: `, [[`span`, `&@style>color:#1185fe`, `~@${Pay.secs}`]]]]]]])
    })

    return [
    `main`, `.@_xC2`, `&@style>background:#f7f7f7;height:100%`, [[
      `div`, `.@_tY0`, [[
        `section`, [[
          `div`, `.@_g0`, `&@style>border-bottom: 1px solid #e6e7e8;margin-top:16px`, [[
            `div`, `.@_geQ _cX3`, `&@style>margin-bottom:16px`, [[
              `div`, [[
                `p`, `.@_tXx`, `&@style>font-size:1.2rem;text-align:center`, `~@Welcome Back!`], [
                `p`, `.@`, `&@style>font-size:0.8rem;color:#999;text-align:center;padding:10px 0 0`, `~@Lets see what happened while you were away.`]]], [
              `div`, `.@_QZg`, []]]]]]]], [
        `section`, `#@ModelPay`, ModelPay]]]]];
  },

  ModalCreateStore () {

    return [
    `div`, `&@style>letter-spacing:0.75px`, [[
      `div`, `.@_gcQ _aXZ _uZM`, [[
        `div`, `.@_gxM _geQ`, [[
          `div`, `.@_gxM _geQ`, [[
            `span`, `.@-_tX AppMedium`], [
            `span`, `&@style>padding-left:8px`, `~@| CORRDE MERCHANT`]]], [
          `div`, `.@_QZg _gMz`, [[`a`, `#@foldModalCreateStore`, `.@-_tX DelColor`, `&@href>javascript:;`]]]]]]], [
      `div`, `.@_aXY _XsQ _aA2`, `&@style>max-height: calc(100vh - 170px);`, [[
        `div`, `.@_cX3`, [[
          `div`, ``, [[
            `span`, `&@style>font-size:1.8rem;font-weight:600;margin: 24px auto`, `~@Corrde Vendors`], [
            `span`, `&@style>font-size:.8rem;font-weight:600;margin: 12px auto 24px`, `~@Market your store or restuarant online`]]], [
          `div`, `&@style>max-width:450px;margin: 0 auto;width:100%`, [[
            `div`, `.@sZ2`, [[
              `div`, `.@_yZS _gMX`, [[
                `div`, `.@_UFA _gMX`, [[
                  `input`, `#@Store`, `.@_RRD _aA2 _pVa`, `&@autocomplete>off`, `&@placeholder>Store/Restuarant Name`]]]]]]], [
            `div`, `.@sZ2`, [[
              `div`, `.@_yZS _gMX`, [[
                `div`, `.@_UFA _gMX _gxM _geQ`, [[
                  `span`, `&@style>border-right:1px solid #e5e5e5;font-weight:600;color:#1dcae1;padding-right:8px`, `~@+254`], [
                  `input`, `#@Call`, `.@_RRD _aA2 _pVa`, `&@autocomplete>off`, `&@style>margin: 0;padding-left:8px`, `&@placeholder>Mobile Phone`]]]]]]], [
            `div`, `.@sZ2`, [[
              `div`, `.@_yZS _gMX`, [[
                `div`, `.@_UFA _gMX _gxM _geQ`, [[
                  `span`, `&@style>border-right:1px solid #e5e5e5;font-weight:600;color:#1dcae1;padding-right:8px`, `~@https://corrde.com/`], [
                  `input`, `#@Alt`, `.@_RRD _aA2 _pVa`, `&@autocomplete>off`, `&@style>margin: 0;padding-left:8px`, `&@placeholder>username for weblink`]]]]]]], [
                `div`, `&@style>padding: 24px 0`, [[
                  `div`, `.@QZg`, [[
                    `div`, `.@_gM_a _agM _guZ`, `&@style>max-width: 450px`, [[
                      `a`, `#@SignupStore`, `.@_TX_a _atX _utQ _gMX`, `&@href>javascript:;`, `~@sign up your store`]]]]]]]]]]]]]]]

  },

  ModelPullStalls (Stalls, MyStalls) {

    let ModelStallsAva = []

    let ModelMyStalls = [
      `section`, `#@ModelShelf`, [[
        `div`, `.@_g0`, `@style>border-bottom: 1px solid #e6e7e8;margin-top:16px`, [[
          `div`, `.@_gxM _geQ _cX3`, `&@style>margin-bottom:16px`, [[
            `div`, [[`p`, `.@_tXx`, `&@style>color:rgb(34, 34, 34)`, `~@My Stores`]]], [
            `div`, `.@_QZg`, []]]], [
          `div`, `.@_gX0`, ModelStallsAva]]]]];

    MyStalls.forEach(Stall => {

      ModelStallsAva.push([
        `div`, `.@_gA0`, [[
          `div`, `.@_gY`, [[
            `div`, `.@_uxq`, `&@style>width:100%`, [[
              `div`, `.@_`, [[
                `div`, `.@_`, [[
                  `div`, `.@_gef`, [[
                    `div`, `&@style>padding-bottom:50%`, `.@_g0z`, [[
                      `img`, `&@style>height:100%`, `.@_aMz _gVm`, `&@src>/gp/p/vector/crate.svg`]]], [
                    `div`, `.@_gVm`]]]]]]], [
              `div`, `.@_yZS _gxM _geQ _gMX _xC3`, [[
                `div`, `.@_yZS _gxM _geQ`, [[
                  `div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                    `div`, `.@_eYG`, [[
                      `div`, `.@_QxM`, [[`a`, `.@_tXx aA2`, `~@${Stall.alpha}`, `&@href>/dashboard/${Stall.MD5}/`]]], [
                      `div`, [[`a`, `.@_aA2`, `&@href>/v/${Stall.MD5}/`, `~@@${Stall.alt}`]]]]], [
                    `div`, [[
                      `a`, `.@_cCq`, `&@style>width:40px;height:40px`, `&@href>/dashboard/${Stall.MD5}/`, [[
                        `svg`, `&@title>${Stall.alpha}`, `&@style>min-height:40px;width:40px`, `&@viewBox>0 0 24 24`, [[
                          `circle`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
                          `text`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 12px;`, `~@${Stall.alpha[0]}`]]]]]]]]]]]]]]]]]]])
    });

    if (MyStalls.length === 0) ModelMyStalls = [];

    let Shelve = [];

    Stalls[2].forEach(Row => {

      if (Shelve.indexOf(Row.shelf) === -1) Shelve.push(Row.shelf)
    });

    let ModelShelve = () => {

      let ModelShelves = [];

      Shelve.forEach(Shelf => {

        ModelShelves.push(this.ModelShelveStall([
          Shelf.replace(new RegExp(`u/0026`, `g`), `&`), Stalls[2], 3, Stalls[3]]))
      });

      return ModelShelves;
    }

    return [
    `main`, `.@_xC2`, [[
      `div`, `.@_tY0`, [ModelMyStalls, [`div`, ModelShelve()]]]]];
  },

  ModelPullStallControls (Stall, Pledge) {

    let Shelve = [];

    Pledge.forEach(Row => {

      if (Shelve.indexOf(Row.shelf) === -1) Shelve.push(Row.shelf)
    });

    let ModelShelve = () => {

      let ModelShelves = [];

      Shelve.forEach(Shelf => {

        ModelShelves.push(this.ModelStallShelf([
          Shelf.replace(new RegExp(`u/0026`, `g`), `&`), Pledge, 3]))
      });

      return ModelShelves;
    }

    let ModelStallAlerts = [
      `section`, `#@ModelStallAlerts`, [[
        `div`, `.@_g0`, `&@style>border-bottom: 1px solid #e6e7e8;margin-top:16px`, [[
          `div`, `.@_gxM _geQ _cX3`, `&@style>margin-bottom:16px`, [[
            `div`, [[`p`, `.@_tXx`, `&@style>color:rgb(34, 34, 34)`, `~@Alerts`]]], [
            `div`, `.@_QZg`, []]]], [
          `div`, `.@_gZy`, `&@style>max-width:960px;margin:0 auto; padding: 16px`, [[
            `div`, `.@_gX0`, `&@style>text-transform:uppercase`, [[
              `div`, [[
                `span`, `.@_aAe _a2X _tXx`, `~@corrde vendor system`], [
                `span`, `.@_a2X`, `~@operation settings`]]]]], [
            `div`, `.@_gX2`, [[
              `div`, [[
                `a`, `.@_aA2`, `&@style>line-height:1.6em;padding:0 0 20px`, `&@href>javascript:;`, `~@To make your store/restuarant available on our vendor & marketplace catalgue, you should set your stock zones & regions.`]]]]], [
            `div`, `.@_gX3`, [[
              `div`, `.@_gM_a _agM _guZ`, [[
                `a`,`#@setStallCountry`, `.@_TX_a _atX qXS _utQ a2X`, `&@href>javascript:;`, `~@set store region & zone`]]]]]]]]]]];

    if (Stall.locales.length > 0) ModelStallAlerts = []

    return [
      `article`, `#@ModelStallControls`, [[
        `div`, `.@_tY0`, [[
          `main`, `.@_gZy`, [[
            `nav`, `.@_gy0`, [[
              `div`, `.@_gy`, [[
                `div`, `.@_gq`, [[
                  `div`, `.@_gMX _geQ`, `&@style>min-height:55px`, [[`a`, `.@-_tX AppMedium`, `&@href>/`]]], [
                  `div`, `.@_gMX _geQ _s0`, [[`a`, `.@-_tX RootGray`, `&@href>`]]], [
                  `div`, `.@_gMX _geQ _s0`, [[`a`, `#@Sell`, `.@-_tX SellColor`, `&@href>javascript:;`]]], [
                  `div`, `.@_gMX _geQ _s0`, [[`a`, `.@-_tX Bag`]]]]]]]]], [
            `section`, `.@_gy2`, `&@style>width:100%`, [[
              `main`, `.@_xC2`, [
                ModelStallAlerts, [`div`, ModelShelve()]]], [
              `nav`, `.@_uHC`, `&@style>background:none`, [[
                `div`, `.@_xCt`], [
                `div`, [[
                  `div`, `.@_-tY`, [[
                    `div`, `.@_aXz`, [[
                      `div`, `.@_-Xg _gxM`, []], [
                      `div`, `.@_QZg _gxM _aA2`, [[
                        `span`, `.@_axS _gV0 _tXx`, `~@${Stall.alpha}`], [
                      `a`, `.@_cCq _axS _gS3`, `&@style>width:40px;height:40px`, `&@href>/dashboard/${Stall.MD5}/`, [[
                        `svg`, `&@title>${Stall.alpha}`, `&@style>min-height:40px;width:40px`, `&@viewBox>0 0 24 24`, [[
                          `circle`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
                          `text`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 12px;`, `~@${Stall.alpha[0]}`]]]]]]]]]]]]]]]]]]]]]]]

  },

  ModalStallCountry () {
    
    let Zones = [ 
      `Australia`, 
      `Canada`, 
      `Germany`, 
      `Japan`, 
      `Kenya`, 
      `Norway`, `South Africa`, `Sweden`, `United Kingdom`, `United States Of America`];

    let Towns = [
      [], [], [], [], [
        `bungoma`, `eldoret`, `homa bay`, `kakamega`, `kisii`, `kisumu`, `machakos`, `maseno`, `mombasa`, `nairobi`, `oyugis`], [], [], [], [], []]

    let ModelZones = [];

    Zones.forEach((Zone, e) => {

      let JS = JSON.stringify(Towns[e]);

      JS.replace(new RegExp(`"`, `g`), `&quot;`);

      let ModelJSON = `&@data>${JS}`;

      ModelZones.push([
        `div`, [[
          `div`, `.@_yZS _gxM geQ gMX _uZM`, [[
            `label`, `.@_tXv`, `&@role>radio`, [[
              `input`, `&@type>radio`, `#@getZone`, `&@value>${Zone}`, `&@name>setSub`, ModelJSON], [
                `span`, `.@_tCw _aA2 tXx`, `~@${Zone}`]]]]]]]);
    });

    return [
      `div`, `&@style>letter-spacing:0.75px`, [[
        `div`, `.@_gcQ _aXZ _uZM`, [[
          `div`, `.@_geQ _gxM _eYG`, [[
            `div`, `.@_aA2`, [[
              `div`, [[
                `span`, `&@style>`, `~@Choose Your Country of Operation`]]]]]]], [
          `div`, `.@_QZg _gMz`, [[`a`, `#@DelModalStallCountry`, `.@-_tX DelColor`, `&@href>javascript:;`]]]]], [
        `div`, `.@_aXY _XsQ _aA2`, `&@style>max-height: calc(100vh - 170px);`, [[
          `div`, `.@_sZ2`, ModelZones]]]]]

  },

  ModalSellSet () {

    let ModelSell = [];

    SellSet.forEach(Sell => {

      ModelSell.push([
        `div`, [[
          `div`, `.@_yZS _gxM geQ gMX _uZM`, [[
            `label`, `.@_tXv`, `&@role>radio`, [[
              `input`, `&@type>radio`, `#@getSet`, `&@value>${Sell[0]}`, `&@name>setSub`], [
                `span`, `.@_tCw _aA2 tXx`, `~@${Sell[0]}`]]]]]]]);
    });

    return [
      `div`, `&@style>letter-spacing:0.75px`, [[
        `div`, `.@_gcQ _aXZ _uZM`, [[
          `div`, `.@_geQ _gxM _eYG`, [[
            `div`, `.@_aA2`, [[
              `div`, [[
                `span`, `&@style>`, `~@Choose Product Category`]]]]]]], [
          `div`, `.@_QZg _gMz`, [[`a`, `#@foldModalSellSet`, `.@-_tX DelColor`, `&@href>javascript:;`]]]]], [
        `div`, `.@_aXY _XsQ _aA2`, `&@style>max-height: calc(100vh - 170px);`, [[
          `div`, `.@_sZ2`, ModelSell]]]]]

  },

  ModelStallShelf (Shelf) {

    let Swap = [RetailMaps[`kenya`].swapAlpha, RetailMaps[`kenya`].swap];

    let Rows = Shelf[1].sort((a, b) => {return b.log - a.log});

    let ModelShelve = [];

    let Stock = [];

    Rows.forEach(Row => {

      Shelf[0] = Shelf[0].replace(new RegExp(/&/, `g`), `u/0026`);

      if (Row.shelf === Shelf[0]) Stock.push(Row)
    });

    Stock = Stock.slice(0, Shelf[2]);

    let File = Files => {

      let file = Files[0];

      if (Files.length > 0) Files[0];

      else {

        file = SVG[Shelf[0].replace(new RegExp(`u/0026`, `g`), `&`)][
          Math.round(Math.random()*(SVG[Shelf[0].replace(new RegExp(`u/0026`, `g`), `&`)].length - 1))];

      }

      return file;
    }

    Stock.forEach(Row => {

      if (Row.shelf === Shelf[0]) {

        if (Row.dollars === false) Row.dollars = 0;

        if (Row.alpha === false) Row.alpha = Row.item;

          let JS = JSON.stringify(Row);

          JS.replace(new RegExp(`"`, `g`), `&quot;`);

          let ModelJSON = `&@data>${JS}`,

            dollars = (Row.dollars*Swap[1]).toFixed(2);

        ModelShelve.push([
            `div`, `.@_gA0`, [[
              `div`, `.@_gY`, [[
                `a`, `.@_Qg`, [[
                  `div`, `.@_Qg0`, [[
                    `img`, `&@alt>${Row.alpha}`, `&@src>/${File(Row.files)}`, `&@style>width:70%;height:70%`]]]], `&@href>javascript:;`], [
                `div`, [[
                  `div`, `.@_pY`, [[
                    `div`, `.@_Xx _gxM`, [[
                      `span`, `.@_tXx`, [[`span`, `.@_p0`, `~@${Swap[0]} ${dollars.toLocaleString()}`]]], [
                      `span`, `.@_gp2`, [[`span`, `.@_p2`, `~@(${Row.shelf})`]]]]], [
                    `a`, `.@_a2`, [[
                      `span`, `&@style>line-height:22px;-moz-orient:vertical;display:-webkit-box;overflow:hidden;-webkit-line-clamp:3;font-size:12px`, `~@${Row.alpha}`]], `&@href>javascript:;`]]], [
                  `div`, `.@_2pY`, [[
                    `div`, `&@style>width:max-content`, [[
                      `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe`, [[
                        `a`, `#@getAlter`, ModelJSON, `.@_TX_a _atX`, `&@href>javascript:;`, `&@style>font-size:12px;font-weight:300`, `~@edit item`]]]]]]]]]]]]]);
      }
    });

    return [
      `section`, `#@ModelShelf`, [[
        `div`, `.@_g0`, `&@style>border-bottom: 1px solid #e6e7e8;margin-top:16px`, [[
          `div`, `.@_gxM _geQ _cX3`, `&@style>margin-bottom:16px`, [[
            `div`, [[`p`, `.@_tXx`, `&@style>color:rgb(34, 34, 34)`, `~@${Shelf[0]}`]]], [
            `div`, `.@_QZg`, [[`a`, `.@_aA2`, `&@style>text-decoration:underline`, `&@href>javascript:;`, `~@edit shelf`]]]]], [
          `div`, `.@_gX0`, ModelShelve]]]]]
  },

  //@editShelf should not be modalled, complicates editing modals, try page per shelf,

  ModelPullStall (Stall) {

    return [
    `main`, `.@_xC2`, [[
      `div`, `.@_tY0`, [[
        `section`, `#@ModelShelf`, [[
          `div`, `.@_g0`, `&@style>/*border-bottom: 1px solid #e6e7e8;*/margin-top:16px`, [[
            `div`, `.@_gxM _geQ _cX3`, `&@style>margin-bottom:16px`, [[
              `div`, `.@_QZg`, []]]], [
            `div`, `.@_gX0`, [[
              `div`, `.@_gA0`, `&@style>width:100%`, [[
                `div`, `.@_gY`, [[
                  `div`, `.@_uxq`, `&@style>width:100%`, [[
                    `div`, `.@_`, [[
                      `div`, `.@_`, [[
                        `div`, `.@_gef`, [[
                          `div`, `&@style>padding-bottom:100px`, `.@_g0z`, [[
                            `img`, `&@style>height:100%`, `.@_aMz _gVm`, `&@src>/gp/p/vector/crate.svg`]]], [
                          `div`, `.@_gVm`]]]]]]], [
                    `div`, `.@_yZS _gxM _geQ _gMX _xC3`, [[
                      `div`, `.@_yZS _gxM _geQ`, [[
                        `div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                          `div`, `.@_eYG`, [[
                            `div`, `.@_QxM`, [[`a`, `.@_tXx aA2`, `~@${Stall.alpha}`, `&@href>/v/${Stall.MD5}/`]]], [
                            `div`, [[`a`, `.@_aA2`, `&@href>/v/${Stall.MD5}/`, `~@@${Stall.alt}`]]]]], [
                          `div`, [[
                            `a`, `.@_cCq`, `&@style>width:40px;height:40px`, `&@href>/v/${Stall.MD5}/`, [[
                              `svg`, `&@title>${Stall.alpha}`, `&@style>min-height:40px;width:40px`, `&@viewBox>0 0 24 24`, [[
                                `circle`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
                                `text`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 12px;`, `~@${Stall.alpha[0]}`]]]]]]]]]]]]]]]]]]]]]]]]]]]]];
  },

  ModelShelveStall (Shelf) {

    let Rows = Shelf[1].sort((a, b) => {return b.log - a.log});

    let ModelShelve = [];

    let Retail = [];

    Rows.forEach(Row => {

      Shelf[0] = Shelf[0].replace(new RegExp(/&/, `g`), `u/0026`);

      if (Row.shelf === Shelf[0] && Retail.indexOf(Shelf[3][Row.stall]) === -1) Retail.push(Shelf[3][Row.stall])
    });

    Retail = Retail.slice(0, Shelf[2]);

    Retail.forEach(Row => {

      ModelShelve.push([
        `div`, `.@_gA0`, [[
          `div`, `.@_gY`, [[
            `div`, `.@_uxq`, `&@style>width:100%`, [[
              `div`, `.@_`, [[
                `div`, `.@_`, [[
                  `div`, `.@_gef`, [[
                    `div`, `&@style>padding-bottom:50%`, `.@_g0z`, [[
                      `img`, `&@style>height:100%`, `.@_aMz _gVm`, `&@src>/gp/p/vector/crate.svg`]]], [
                    `div`, `.@_gVm`]]]]]]], [
              `div`, `.@_yZS _gxM _geQ _gMX _xC3`, [[
                `div`, `.@_yZS _gxM _geQ`, [[
                  `div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                    `div`, `.@_eYG`, [[
                      `div`, `.@_QxM`, [[`a`, `.@_tXx aA2`, `~@${Row.alpha}`, `&@href>/v/${Row.MD5}/`]]], [
                      `div`, [[`a`, `.@_aA2`, `&@href>/v/${Row.MD5}/`, `~@@${Row.alt}`]]]]], [
                    `div`, [[
                      `a`, `.@_cCq`, `&@style>width:40px;height:40px`, `&@href>/v/${Row.MD5}/`, [[
                        `svg`, `&@title>${Row.alpha}`, `&@style>min-height:40px;width:40px`, `&@viewBox>0 0 24 24`, [[
                          `circle`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
                          `text`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 12px;`, `~@${Row.alpha[0]}`]]]]]]]]]]]]]]]]]]]);
    });

    return [
      `section`, `#@ModelShelf`, [[
        `div`, `.@_g0`, `@style>border-bottom: 1px solid #e6e7e8;margin-top:16px`, [[
          `div`, `.@_gxM _geQ _cX3`, `&@style>margin-bottom:16px`, [[
            `div`, [[`p`, `.@_tXx`, `&@style>color:rgb(34, 34, 34)`, `~@${Shelf[0]}`]]], [
            `div`, `.@_QZg`, [[`a`, `.@_aA2`, `&@style>text-decoration:underline`, `&@href>javascript:;`, `~@view more`]]]]], [
          `div`, `.@_gX0`, ModelShelve]]]]]
  },

  ModelMugPays (Sell, mug) {

    let Pays = [];

    let PaySet = {}

    Sell.Pay[0].forEach(Pay => {

      if (Pay.payer === mug) {

        Pays.push(Pay);

        PaySet[Pay.MD5] = Pay;
      }
    })

    let ModelPay = [];

    let FullPays = Pays;

    let SlicePays = Pays.sort((a, b) => {return b.secs - a.secs});

    SlicePays.forEach(Pay => {

      let ModelFiles = [];

      let items = 0;

      Pay.bag.forEach(File => {

        items += File.items

        ModelFiles.push([
        `span`, `.@_cCq _gS3`, `&@href>javascript:;`, `&@style>height:24px;width:24px;margin: 0 15px`, [[`img`, `.@_aWz`, `&@src>/${File.file}`]]])
      });

      ModelPay.push([
          `div`, `.@_gZy _geQ`, `&@style>max-width:960px;margin:0 auto; padding: 16px`, [[
            `div`, `.@_gX0`, `&@style>overflow:hidden`, [[
              `div`, [[`div`, `.@_gxM`, [[`span`, `&@style>font-size:10px;padding:0 12px;background:#1185fe3b;border-radius:100px;color:#1185fe`, `~@${Pay.MD5}`]]], [
                `span`, `&@style>font-size:10px`, `.@_a2X`, `~@${this.log(Pay.secs)}`]]]]], [
            `div`, `.@_gX2`, [[
              `div`, [[
                `div`, `.@_gxM _yZS`, [[
                  `span`, `&@style>font-size:10px;padding:0 24px;background:#1185fe3b;border-radius:100px;color:#1185fe`, `~@#${Pay.secs}`], [
                  `div`, `.@_QZg`, [[`span`, `&@style>font-size:10px`, `.@_a2X`, `~@${items} items`]]]]], [
                `div`, `.@_gxM _yZS`, [[
                  `div`, `.@_gxM`, ModelFiles], [
                  `div`, `.@_QZg`, [[`span`, `&@style>font-size:10px`, `.@_a2X`, `~@${Pay.mass}grams`]]]]], [
                `div`, `.@_gxM _yZS`, [[
                  `span`, `.@_-Zz`, `&@style>font-size:10px;padding:0 24px;background:#ffacac2b;border-radius:100px;color:#ffacac;text-transform:uppercase`, `~@cancelled`], [
                  `div`, `.@_QZg`, [[`span`, `&@style>font-size:10px;padding:0 12px;background:#9999992e;border-radius:100px;`, `.@_a2X`, `~@kes${(Pay.pay).toFixed(2)}`]]]]]]]]], [
            `div`, `.@_gX3 _geQ _QZg`, [[
              `div`, `.@_gM_a _agM _guZ`, [[
                `a`, `#@getPay`, `.@_TX_a _atX qXS _utQ a2X`, `&@sum>${Pay.MD5}`, `&@href>javascript:;`, `~@view order`]]]]]]])
    });

    return [
    `main`, `.@_xC2`, `&@style>height:100%`, [[
      `div`, `.@_tY0`, [[
        `section`, `#@ModelStallAlerts`, [[
          `div`, `.@_g0`, `&@style>border-bottom: 1px solid #e6e7e8;margin-top:16px`, [[
            `div`, `.@_gxM _geQ _cX3`, `&@style>margin-bottom:16px`, [[
              `div`, [[`p`, `.@_tXx`, `&@style>color:rgb(34, 34, 34)`, `~@Pay Orders`]]], [
              `div`, `.@_QZg`, []]]], [`div`, ModelPay]]]]]]], [
      `script`, `#@pays`, `&@type>text/javascript`, `~@${JSON.stringify(PaySet)}`]]];
  },

  ModalMyPay () {

    return [
    `div`,  `&@style>letter-spacing: .75px;line-height:1.5rem; max-width: 100%;font-size:12px`, [[
      `div`, `.@_gxM _gMX _gcQ _uZM`, [[
        `div`, `~@My Order`], [
        `div`, `.@_QZg`, [[
          `span`, `.@_`, [[`a`, `#@foldMyPay`, `.@-_tX DelColor`, `&@href>javascript:;`]]]]]]], [
      `div`, `.@_aXY`, `&@style>margin:0 0 55px;max-height: calc(100vh - 180px);`, [[
        `div`, `.@_sZ2`, []]]], [
          `div`, `.@_-Zz _azX- _gMX _gp0 _gmg`, [[
            `div`, `.@_gxM _gMX`, [[
              `div`, `.@_gMX`, [[
                `div`, `.@_eYG`], [
                `div`, `.@_QZg _gMz`, [[
                  `div`, `.@_axS`, [[
                    `div`, `.@_gM_a _agM _guZ`, [[
                      `a`, `#@toCheckOut`, `.@_TX_a _atX _utQ`, `&@href>javascript:;`, `&@style>font-size:12px`, `~@proceed to checkout`]]]]]]]]]]]]]]];
  },

  Controller (Model) {

    return [
      `article`, `#@ModelStallControls`, [[
        `div`, `.@_tY0`, [[
          `main`, `.@_gZy`, [[
            `nav`, `.@_gy0`, [[
              `div`, `.@_gy`, [[
                `div`, `.@_gq`, [[
                  `div`, `.@_gMX _geQ`, `&@style>min-height:55px`, [[`a`, `.@-_tX RootGray`, `&@href>/`]]], [
                  `div`, `.@_-Zz _gMX _geQ _s0`, [[`a`, `.@-_tX RootGray`, `&@href>`]]], [
                  `div`, `.@_gMX _geQ _s0`, [[`a`, `#@Tools`, `.@-_tX SellColor`, `&@href>javascript:;`]]], [
                  `div`, `.@_gMX _geQ _s0`, [[`a`, `.@-_tX Bag`]]]]]]]]], [
            `section`, `.@_gy2`, `&@style>width:100%`, [
              Model, [
              `nav`, `.@_uHC`, `&@style>background:none`, [[
                `div`, `.@_xCt`], [
                `div`, [[
                  `div`, `.@_-tY`, [[
                    `div`, `.@_aXz`, [[
                      `div`, `.@_-Xg _gxM _geQ`, [[
                        `a`, `#@devs`, `.@-_tX AppMedium`, `&@href>/v2/devs/`, `~@corrde`], [
                        `span`, `@_aA6`, `&@style>padding: 0 7px`, `~@ | DASHBOARD`]]]/*, [
                      `div`, `.@_QZg _gxM _aA2`, [[
                        `span`, `.@_axS _gV0 _tXx`, `~@{Stall.alpha}`], [
                      `a`, `.@_cCq _axS _gS3`, `&@style>width:40px;height:40px`, `&@href>/dashboard/{Stall.MD5}/`, [[
                        `svg`, `&@title>{Stall.alpha}`, `&@style>min-height:40px;width:40px`, `&@viewBox>0 0 24 24`, [[
                          `circle`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
                          `text`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 12px;`, `~@${Stall.alpha[0]}`]]]]]]]*/]]]]]]]]]]]]]]]]

  },

  ModelRootController (Args) {

    return [`main`, `.@_xC2`, [this.ModelSlicePpl([Args, 10]), this.ModelSliceStock([Args, 5]), this.ModelSlicePay([Args, 10])]];
  },

  ModelSlicePpl (Args) {

    let ModelSlicePpl = [];

    let SlicePpl = Args[0].Ppl[0].sort((A, B) => {return B.log - A.log});

    SlicePpl = SlicePpl.slice(0, Args[1]);

    SlicePpl.forEach(Ps => {

      let ModelMug = [
      `svg`, `#@mug-ava`, `&@style>min-height:24px;width:24px`, `&@viewBox>0 0 24 24`, [[
        `circle`, `#@mug-ava`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
          `text`, `#@mug-ava`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 12px;`, `~@${Ps.full[0]}`]]]

      if (Ps.ava !== false) ModelMug = [`img`, `#@mug-ava`, `.@_aWz`, `&@src>/${Ps.ava}`];

      ModelSlicePpl.push([
        `div`, `.@yZS`, [[
          `div`, `.@_gxM _yZS`, [[
            `span`, `&@style>font-size:10px;padding:0 24px;background:#1185fe3b;border-radius:100px;color:#1185fe`, `~@${Ps.sum}`], [
            `div`, `.@_QZg`, [[
              `span`, `&@style>font-size:10px;padding:0 12px;background:#9999992e;border-radius:100px;`, `.@_a2X`, `~@${this.log(Ps.log)}`]]]]], [
          `div`, `.@_gxM _yZS`, [[
            `a`, `.@_cCq _gS3`, `#@mug-ava`, `&@href>javascript:;`, `&@style>height:24px;width:24px;`, [ModelMug]], [
            `div`, `.@_eYG`, [[
              `span`, `&@style>font-size:10px;padding:0 12px;background:#9999992e;border-radius:100px;`, `.@_a2X`, `~@${Ps.full}`]]]]], [
          `div`, `.@_gxM _yZS`, [[
            `div`, `.@_QZg`, [[
              `span`, `&@style>font-size:10px;padding:0 12px;background:#9999992e;border-radius:100px;`, `.@_a2X`, `~@${Ps.mail}`]]]]]]])
    })

    return [
      `section`, `#@ModelStallAlerts`, [[
        `div`, `.@_g0`, `&@style>border-bottom: 1px solid #e6e7e8;margin-top:16px`, [[
          `div`, `.@_gxM _geQ _cX3`, `&@style>margin-bottom:16px`, [[
            `div`, [[`p`, `.@_tXx`, `&@style>color:rgb(34, 34, 34)`, `~@Recent Signups`]]], [
            `div`, `.@_QZg`, []]]], [`div`, `&@style>max-width:960px;margin:0 auto;width:100%; padding: 16px`, ModelSlicePpl]]]]]
  },

  ModelSlicePay (Args) {

    let ModelSlicePay = [];

    let PaySet = {};

    let SlicePay = Args[0].Pay[0].sort((A, B) => {return B.secs - A.secs});

    SlicePay = SlicePay.slice(0, Args[1]);

    SlicePay.forEach(Pay => {PaySet[Pay.MD5] = Pay})

    SlicePay.forEach(Pay => {

      let alpha = `anonymous`;

      if (Args[0].Ppl[1][Pay.payer]) alpha = Args[0].Ppl[1][Pay.payer].full;

      let ModelMug = [
      `svg`, `#@mug-ava`, `&@style>min-height:24px;width:24px`, `&@viewBox>0 0 24 24`, [[
        `circle`, `#@mug-ava`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#4444441c`], [
          `text`, `#@mug-ava`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill:#444;text-transform:uppercase;letter-spacing:normal;font-size: 12px;`, `~@a`]]];

      if (Args[0].Ppl[1][Pay.payer] && Args[0].Ppl[1][Pay.payer].ava === false) {

        ModelMug = [
        `svg`, `#@mug-ava`, `&@style>min-height:24px;width:24px`, `&@viewBox>0 0 24 24`, [[
          `circle`, `#@mug-ava`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
            `text`, `#@mug-ava`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 12px;`, `~@${Args[0].Ppl[1][Pay.payer].full[0]}`]]];
        }

      else if (Args[0].Ppl[1][Pay.payer] && Args[0].Ppl[1][Pay.payer].ava !== false) ModelMug = [`img`, `#@mug-ava`, `.@_aWz`, `&@src>/${Args[0].Ppl[1][Pay.payer].ava}`];

      let ModelFiles = [];

      let items = 0;

      Pay.bag.forEach(File => {

        items += File.items

        ModelFiles.push([
        `span`, `.@_cCq _gS3`, `&@href>javascript:;`, `&@style>height:24px;width:24px;margin: 0 15px`, [[`img`, `.@_aWz`, `&@src>/${File.file}`]]])
      });

      ModelSlicePay.push([
        `div`, `.@_gZy _geQ`, `&@style>max-width:960px;margin:0 auto; padding: 16px`, [[
          `div`, `.@_gX0`, `&@style>overflow:hidden`, [[
            `div`, [[
              `div`, `.@_gxM _yZS`, [[
                `a`, `.@_cCq _gS3`, `#@mug-ava`, `&@href>javascript:;`, `&@style>height:24px;width:24px;`, [ModelMug]], [
                `div`, `.@_eYG`, [[
                  `span`, `&@style>font-size:10px;padding:0 12px;background:#9999992e;border-radius:100px;`, `.@_a2X`, `~@${alpha}`]]]]]]]]], [
          `div`, `.@_gX2`, [[
            `div`, [[
              `div`, `.@_gxM _yZS`, [[
                `span`, `&@style>font-size:10px;padding:0 24px;background:#1185fe3b;border-radius:100px;color:#1185fe`, `~@${Pay.MD5}`], [
                `div`, `.@_QZg`, [[
                  `span`, `&@style>font-size:10px;padding:0 12px;background:#9999992e;border-radius:100px;`, `.@_a2X`, `~@${this.log(Pay.secs)}`]]]]], [
                `div`, `.@_gxM _yZS`, [[
                  `div`, `.@_gxM`, ModelFiles], [
                  `div`, `.@_QZg`, [[`span`, `&@style>font-size:10px`, `.@_a2X`, `~@${Pay.mass}grams`]]]]], [
                `div`, `.@_gxM _yZS`, [[
                  `span`, `#@payStatus`, `.@_-Zz`, `&@sum>${Pay.MD5}`, `&@style>font-size:10px;padding:0 24px;background:#ffacac2b;border-radius:100px;color:#ffacac;text-transform:uppercase`, `~@cancelled`], [
                  `div`, `.@_QZg`, [[
                    `span`, `&@style>font-size:10px;padding:0 12px;background:#9999992e;border-radius:100px;`, `.@_a2X`, `~@kes${(Pay.pay).toFixed(2)}`]]]]], [
                `div`, `.@_gxM _yZS`, [[
                  `div`, `.@QZg`, [[
                    `span`, `&@style>font-size:10px;padding:0 12px;background:#9999992e;border-radius:100px;`, `.@_a2X`, `~@${Pay.gArray[0]}, ${Pay.gArray[1]}`]]]]]]]]], [
            `div`, `.@_gX3 _geQ _QZg`, [[
              `div`, `.@_gM_a _agM _guZ`, [[
                `a`, `#@getPay`, `.@_TX_a _atX qXS _utQ a2X`, `&@sum>${Pay.MD5}`, `&@href>javascript:;`, `~@view order`]]]]]]])
    })

    return [
      `section`, `#@ModelStallAlerts`, [[
        `div`, `.@_g0`, `&@style>border-bottom: 1px solid #e6e7e8;margin-top:16px`, [[
          `div`, `.@_gxM _geQ _cX3`, `&@style>margin-bottom:16px`, [[
            `div`, [[`p`, `.@_tXx`, `&@style>color:rgb(34, 34, 34)`, `~@Recent Orders`]]], [
            `div`, `.@_QZg`, []]]], [`div`, ModelSlicePay]]], [
        `script`, `#@pays`, `&@type>text/javascript`, `~@${JSON.stringify(PaySet)}`]]]
  },

  ModalControllers () {

    let ModelTools = [];

    let Tools = [[`shelf inventory`, ``]];

    Tools.forEach((Tool) => {

      ModelTools.push([`li`, `.@_-zZx`, [[`a`, `#@getTool`, `.@_-xQy`, `&@href>javascript:;`, [[`span`, `.@_tAx _aA2 _tXx`, `~@${Tool[0]}`]]]]]);
    });

    return [
      `div`, `&@style>letter-spacing:0.75px`, [[
        `div`, `.@_gcQ _aXZ _uZM`, [[
          `div`, `.@_geQ _gxM _eYG`, [[
            `div`, `.@_aA2`, [[
              `div`, [[
                `span`, `&@style>`, `~@`]]]]]]], [
          `div`, `.@_QZg _gMz`, [[`a`, `#@foldModalTools`, `.@-_tX DelColor`, `&@href>javascript:;`]]]]], [
        `div`, `.@_aXY XsQ _aA2`, `&@style>max-height: calc(100vh - 170px);`, [[
          `ul`, `.@_aYy`, ModelTools]]]]]

  },

  ModalControlsCatalog () {

    let ModelSets = [];

    RetailSets.forEach((Catalog) => {

      let Shelf = Catalog;

      ModelSets.push([
        `li`, `.@_-zZx`, [[
          `a`, `#@pollStock`, `.@_-xQy`, `&@shelf>${Catalog}`, `&@href>javascript:;`, [[`span`, `.@_tAx _aA2 _tXx`, `~@${Catalog}`]]]]]);
    });

    return [
      `div`, `&@style>letter-spacing:0.75px`, [[
        `div`, `.@_gcQ _aXZ _uZM`, [[
          `div`, `.@_geQ _gxM _eYG`, [[
            `div`, `.@_aA2`, [[
              `div`, [[
                `span`, `&@style>`, `~@Catalog & Shelves`]]]]]]], [
          `div`, `.@_QZg _gMz`, [[`a`, `#@foldModalCatalog`, `.@-_tX DelColor`, `&@href>javascript:;`]]]]], [
        `div`, `.@_aXY XsQ _aA2`, `&@style>max-height: calc(100vh - 170px);`, [[
          `ul`, `.@_aYy`, ModelSets]]]]]

  },

  ModelSliceStock (Args) {

    let ModelSliceStock = [];

    let SellSet = {};

    let SliceStock = Args[0].Sell[0].sort((A, B) => {return B.log - A.log});

    SliceStock = SliceStock.slice(0, Args[1]);

    SliceStock.forEach(Sell => {SellSet[Sell.MD5] = Sell});

    SliceStock.forEach(Sell => {

      let alpha = `anonymous`;

      if (Sell.set) alpha = Sell.set;

      alpha = alpha.toString().slice(0, 2);

      let ModelMug = [
      `svg`, `#@mug-ava`, `&@style>min-height:24px;width:24px`, `&@viewBox>0 0 24 24`, [[
        `circle`, `#@mug-ava`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#4444441c`], [
          `text`, `#@mug-ava`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill:#444;text-transform:capitalize;letter-spacing:normal;font-size: 12px;`, `~@${alpha}`]]];

      if (Sell.files.length > 0) ModelMug = [`img`, `#@mug-ava`, `.@_aWz`, `&@style>height:auto`, `&@src>/${Sell.files[0]}`];

      ModelSliceStock.push([
        `span`, `.@_-zZx`, [[
          `a`, `#@getStock`, `.@_-xQy`, `&@sum>${Sell.MD5}`, `&@href>javascript:;`, [[
            `div`, `.@_gxM _geQ`, `&@style>max-width:960px;margin:0 auto; padding:0 16px`, [[
          `div`, `.@gX0`, `&@style>overflow:hidden`, [[
            `div`, [[
              `div`, `.@_gxM _yZS`, [[
                `span`, `.@_cCq _gS3`, `#@mug-ava`, `@href>javascript:;`, `&@style>height:24px;width:24px;`, [ModelMug]], [
                `div`, `.@_eYG`, [[
                  `span`, `&@style>font-size:10px;padding:0 12px;background:#9999992e;border-radius:100px;`, `.@_a2X`, `~@${Sell.set}`]]]]]]]]], [
          `div`, `.@_QZg`, [[
            `span`, `&@style>font-size:10px;padding:0 12px;background:#9999992e;border-radius:100px;`, `.@_a2X _tXx`, `~@€${(Sell.dollars*.84).toFixed(2)}`]]]]]]]]]);
    })

    return [
      `section`, `#@ModelStallAlerts`, [[
        `div`, `.@_g0`, `&@style>border-bottom: 1px solid #e6e7e8;margin-top:16px`, [[
          `div`, `.@_gxM _geQ _cX3`, `&@style>margin-bottom:16px`, [[
            `div`, [[`p`, `.@_tXx`, `&@style>color:rgb(34, 34, 34)`, `~@Recent Inventory`]]], [
            `div`, `.@_QZg`, []]]], [`div`, ModelSliceStock]]], [
        `script`, `#@sell`, `&@type>text/javascript`, `~@${JSON.stringify(SellSet)}`]]]
  },

  ModelShelfEditor(Sell, setBool) {

    let ModelShelfEditor = [];

    let ModelAlterAltString = []; 

    let ModelFileAlter = [];

    let ModelAlterMake = [];

    let ModelAlterSex = [];

    let ModelAlterZone = [];

    let ModelAlterPay = [];

    let ModelAlterKilo = [];

    let ModelAlterPile = [];

    if (setBool === false) {

      let ModelCatalog = [];

      TagSets[this.filter(this.filter(Sell.set))].forEach(Tag => {

        ModelCatalog.push([
          `a`, `#@pollTag`, `&@sum>${Sell.MD5}`, `&@style>margin: 0 14px 14px 0;font-size:12px;padding:0 12px;background:#9999992e;border-radius:100px;color:#999;`, `&@href>javascript:;`, `~@${Tag}`])
      })

      ModelShelfEditor = [
        `div`, [[
          `div`, `.@_gxM _yZS _geQ`, `&@style>box-shadow: 1px 0 3px rgba(26,26,26, .1);padding:10px 14px`, [[
            `div`, [[`span`, `.@_tXx`, `~@${Sell.set}`]]], [
            `div`, `.@_QZg`, [[`a`, `.@-_tX MoveTop`, `&@href>javascript:;`]]]]], [
          `div`, `.@_gZy`, `&@style>padding:24px 14px`, ModelCatalog]]]
    }

    else if (setBool === true) {

      let ModelCatalog = [];

      let ModelSellFiles = [];

      let ModelMakeAlterns = [];

      let ModelZoneAlterns = [];

      let ModelZoneCheck = [];

      TagSets[this.filter(this.filter(Sell.set))].forEach(Tag => {

        let rule = ``;

        if (Sell.tags && Sell.tags[0][0] === Tag) rule = `font-weight:600;text-decoration:line-through;`;

        ModelCatalog.push([
          `a`, `#@pollTag`, `&@sum>${Sell.MD5}`, `&@style>margin: 0 14px 14px 0;font-size:12px;padding:0 12px;background:#9999992e;border-radius:100px;color:#999;${rule}`, `&@href>javascript:;`, `~@${Tag}`])
      });

      let Cues = AlterCues[Sell.tags[0][0]];

      if (Cues && Cues.indexOf(`sex`) > -1) {

        let ModelCueCheck = [];

        let ModelCueAlterns = [];

        let CueAlterns = [`boys`, `girls`, `her`, `him`, `men`, `unisex`, `women`];

        if (Sell.sex && Sell.sex !== false) {

          ModelCueCheck = [
          `span`, `&@style>margin: 0 0 0 14px;font-size:12px;padding:0 12px;background:#9999992e;border-radius:100px;color:#999;`, `~@${Sell.sex}`]
        }

        CueAlterns.forEach(Cue => {

          let rule = ``;

          if (Sell.sex && Sell.sex === Cue) rule = `font-weight:600;text-decoration:line-through;`;

          ModelCueAlterns.push([
            `a`, `#@pollSex`, `&@sum>${Sell.MD5}`, `&@style>margin: 0 14px 14px 0;font-size:12px;padding:0 12px;background:#9999992e;border-radius:100px;color:#999;${rule}`, `&@href>javascript:;`, `~@${Cue}`])
        });

        ModelAlterSex = [
          `div`, [[
            `div`, `.@_gxM _yZS _geQ`, `&@style>box-shadow: 1px 0 3px rgba(26,26,26, .1);padding:10px 14px`, [[
              `div`, `.@_gxM`, [[
                `span`, `.@_tXx`, `~@Sex`], ModelCueCheck]], [
              `div`, `.@_QZg`, [[`a`, `.@-_tX MoveTop`, `&@href>javascript:;`]]]]], [
            `div`, `.@_gZy`, `&@style>padding:24px 14px`, ModelCueAlterns]]];
      }

      ModelShelfEditor = [
        `div`, [[
          `div`, `.@_gxM _yZS _geQ`, `&@style>box-shadow: 1px 0 3px rgba(26,26,26, .1);padding:10px 14px`, [[
            `div`, `.@_gxM`, [[
              `span`, `.@_tXx`, `~@${Sell.set}`], [
              `span`, `&@style>margin: 0 0 0 14px;font-size:12px;padding:0 12px;background:#9999992e;border-radius:100px;color:#999;`, `~@${Sell.tags[0][0]}`]]], [
            `div`, `.@_QZg`, [[`a`, `.@-_tX MoveTop`, `&@href>javascript:;`]]]]], [
          `div`, `.@_gZy`, `&@style>padding:24px 14px`, ModelCatalog]]];

      let alpha = `short shelf description`;

      if (Sell.alpha) alpha = Sell.alpha;

      ModelAlterAltString = [
        `div`, [[
          `div`, `.@_gxM _yZS _geQ`, `&@style>box-shadow: 1px 0 3px rgba(26,26,26, .1);padding:10px 14px`, [[
            `div`, `.@_gxM`, [[
              `span`, `.@_tXx`, `~@Shelf Title`]]], [
            `div`, `.@_QZg`, []]]], [ 
          `div`, `.@gZy`, `&@style>padding:24px 14px`, [[
            `div`, `.@_gxM`, [[
              `div`, `.@_UFA _gMX _gxM geQ`, `&@style>width:auto`, [[
                `input`, `#@altString`, `.@_RRD _aA2 _pVa`, `&@autocomplete>off`, `&@style>margin: 0;padding: 10px 0 10px 10px;border-bottom:1px solid #e5e5e5`, `&@placeholder>${alpha}`]]], [
              `div`, `.@_QZg`, `&@style>flex:0`, [[`a`, `#@pollAltString`, `&@sum>${Sell.MD5}`, `&@style>color:#1185fe`, `&@href>javascript:;`, `~@save`]]]]]]]]];

      Sell.files.forEach(File => {

        ModelSellFiles.push([
          `div`, `.@_gxM _geQ _yZS _gZ`, `&@style>width:100%;overflow:hidden`, [[
            `div`, `.@_gxM`, [[
              `span`, `.@_cCq _gS3`, `#@mug-ava`, `@href>javascript:;`, `&@style>height:24px;width:24px;`, [[
                `img`, `#@mug-ava`, `.@_aWz`, `&@style>height:auto`, `&@src>/${File}`]]], [
              `span`, `&@style>margin: 0 0 0 14px;font-size:12px;padding:0 12px;background:#9999992e;border-radius:100px;color:#999;white-space:nowrap`, `~@${File}`]]], [
            `div`, `.@_QZg`, [[`a`, `.@-_tX Close`, `&@href>javascript:;`]]]]]);
      });

      ModelFileAlter = [
        `div`, [[
          `div`, `.@_gxM _yZS _geQ`, `&@style>box-shadow: 1px 0 3px rgba(26,26,26, .1);padding:10px 14px`, [[
            `div`, `.@_gxM`, [[
              `span`, `.@_tXx`, `~@Images`], [
              `span`, `&@style>margin: 0 0 0 14px;font-size:12px;padding:0 12px;background:#9999992e;border-radius:100px;color:#999;`, `~@${Sell.files.length}`]]], [
            `div`, `.@_QZg`, [[
              `div`, [[
                `label`, `#@pollFile`, `.@-_tX SellColor`, `&@sum>${Sell.MD5}`, `&@for>file`, `&@style>margin: 0 14px`], [
                `form`, `&@enctype>multipart/form-data`, [[
                  `input`, `#@file`, `&@type>file`, `&@accepts>image/*`]]]]], [
              `a`, `.@-_tX MoveTop`, `&@href>javascript:;`]]]]], [
          `div`, `.@gZy`, `&@style>padding:24px 14px`, ModelSellFiles]]];

      if (MakeCues[Sell.tags[0][0]]) {

        let ModelMakeCheck = [];

        if (Sell.factory && MakeCues[Sell.tags[0][0]].indexOf(Sell.factory) > -1) {

          ModelMakeCheck = [
          `span`, `&@style>margin: 0 0 0 14px;font-size:12px;padding:0 12px;background:#9999992e;border-radius:100px;color:#999;`, `~@${Sell.factory}`]
        }

        MakeCues[Sell.tags[0][0]].forEach(Cue => {

          let rule = ``;

          if (Sell.factory && Sell.factory === Cue) rule = `font-weight:600;text-decoration:line-through;`;

          ModelMakeAlterns.push([
            `a`, `#@pollMake`, `&@sum>${Sell.MD5}`, `&@style>margin: 0 14px 14px 0;font-size:12px;padding:0 12px;background:#9999992e;border-radius:100px;color:#999;${rule}`, `&@href>javascript:;`, `~@${Cue}`])
        });

        ModelAlterMake = [
          `div`, [[
            `div`, `.@_gxM _yZS _geQ`, `&@style>box-shadow: 1px 0 3px rgba(26,26,26, .1);padding:10px 14px`, [[
              `div`, `.@_gxM`, [[
                `span`, `.@_tXx`, `~@Brand`], ModelMakeCheck]], [
              `div`, `.@_QZg`, [[`a`, `.@-_tX MoveTop`, `&@href>javascript:;`]]]]], [
            `div`, `.@_gZy`, `&@style>padding:24px 14px`, ModelMakeAlterns]]];
      }

      if (Sell.market) {

        ModelZoneCheck = [
          `span`, `&@style>margin: 0 0 0 14px;font-size:12px;padding:0 12px;background:#9999992e;border-radius:100px;color:#999;`, `~@${Sell.market}`]
      }

      let Zones = [`australia`, `germany`, `japan`, `kenya`, `new zealand`, `norway`, `sweden`, `united kingdom`, `united states of america`]

      Zones.forEach(Z => {

        let rule = ``;

        if (Sell.market && Sell.market === Z) rule = `font-weight:600;text-decoration:line-through;`;

        ModelZoneAlterns.push([
          `a`, `#@pollZone`, `&@sum>${Sell.MD5}`, `&@style>margin: 0 14px 14px 0;font-size:12px;padding:0 12px;background:#9999992e;border-radius:100px;color:#999;${rule}`, `&@href>javascript:;`, `~@${Z}`])
      });

      ModelAlterZone = [
        `div`, [[
          `div`, `.@_gxM _yZS _geQ`, `&@style>box-shadow: 1px 0 3px rgba(26,26,26, .1);padding:10px 14px`, [[
            `div`, `.@_gxM`, [[
              `span`, `.@_tXx`, `~@Market Zone`], ModelZoneCheck]], [
            `div`, `.@_QZg`, [[`a`, `.@-_tX MoveTop`, `&@href>javascript:;`]]]]], [
          `div`, `.@_gZy`, `&@style>padding:24px 14px`, ModelZoneAlterns]]];

      let pay = `amount in american dollars`;

      if (Sell.dollars) pay = Sell.dollars + `USD`;

      ModelAlterPay = [
        `div`, [[
          `div`, `.@_gxM _yZS _geQ`, `&@style>box-shadow: 1px 0 3px rgba(26,26,26, .1);padding:10px 14px`, [[
            `div`, `.@_gxM`, [[
              `span`, `.@_tXx`, `~@Standard Price`]]], [
            `div`, `.@_QZg`, []]]], [ 
          `div`, `.@gZy`, `&@style>padding:24px 14px`, [[
            `div`, `.@_gxM`, [[
              `div`, `.@_UFA _gMX _gxM geQ`, `&@style>width:auto`, [[
                `input`, `#@retailRate`, `.@_RRD _aA2 _pVa`, `&@autocomplete>off`, `&@style>margin: 0;padding: 10px 0 10px 10px;border-bottom:1px solid #e5e5e5`, `&@placeholder>${pay}`]]], [
              `div`, `.@_QZg`, `&@style>flex:0`, [[`a`, `#@pollRetailRate`, `&@sum>${Sell.MD5}`, `&@style>color:#1185fe`, `&@href>javascript:;`, `~@save`]]]]]]]]];

      let kilo = `weight in grams`;

      if (Sell.mass) kilo = Sell.mass + `G`;

      ModelAlterKilo = [
        `div`, [[
          `div`, `.@_gxM _yZS _geQ`, `&@style>box-shadow: 1px 0 3px rgba(26,26,26, .1);padding:10px 14px`, [[
            `div`, `.@_gxM`, [[
              `span`, `.@_tXx`, `~@Standard Weight`]]], [
            `div`, `.@_QZg`, []]]], [ 
          `div`, `.@gZy`, `&@style>padding:24px 14px`, [[
            `div`, `.@_gxM`, [[
              `div`, `.@_UFA _gMX _gxM geQ`, `&@style>width:auto`, [[
                `input`, `#@retailKilo`, `.@_RRD _aA2 _pVa`, `&@autocomplete>off`, `&@style>margin: 0;padding: 10px 0 10px 10px;border-bottom:1px solid #e5e5e5`, `&@placeholder>${kilo}`]]], [
              `div`, `.@_QZg`, `&@style>flex:0`, [[`a`, `#@pollRetailKilo`, `&@sum>${Sell.MD5}`, `&@style>color:#1185fe`, `&@href>javascript:;`, `~@save`]]]]]]]]];

      let pile = 0;

      if (Sell.pile) pile = Sell.pile;

      ModelAlterPile = [
        `div`, [[
          `div`, `.@_gxM _yZS _geQ`, `&@style>box-shadow: 1px 0 3px rgba(26,26,26, .1);padding:10px 14px`, [[
            `div`, `.@_gxM`, [[
              `span`, `.@_tXx`, `~@In Stock`]]], [
            `div`, `.@_QZg`, [[
              `span`, `&@style>margin: 0 0 0 14px;font-size:12px;padding:0 12px;background:#9999992e;border-radius:100px;color:#999;`, `~@${pile}`]]]]], [ 
          `div`, `.@gZy`, `&@style>padding:24px 14px`, [[
            `div`, `.@_gxM`, [[
              `div`, `.@_gxM _geQ`, `&@style>border:1px solid #e7e7e7;padding:4px 8px`, [[
                `div`, `.@_geQ`, `&@style>width:25%`, [[
                  `a`, `#@${(pile > 0) ? `pollRetailPile`: `null`}`, `.@-_tX Minus`, `&@sum>${Sell.MD5}`, `&@total>${pile}`, `&@role>minus`, `&@href>javascript:;`, `~@subtract`]]], [
                `div`, `&@style>width:50%;border:1px solid #e7e7e7;border-top:0;border-bottom: 0`, [[
              `div`, `.@_UFA _gMX _gxM geQ`, `&@style>width:100%`, [[
                `input`, `#@retailPile`, `.@_RRD _aA2`, `&@autocomplete>off`, `&@style>margin:0;padding:0;border:0;text-align:center`, `&@placeholder>no. of items to -/+`]]]]], [
                `div`, `.@_geQ`, `&@style>width:25%`, [[`a`, `#@pollRetailPile`, `.@-_tX Plus`, `&@sum>${Sell.MD5}`, `&@role>plus`, `&@href>javascript:;`, `~@add`]]]]]]]]]]];
    }

    return [
      `div`, `@_-Zz`, `#@ModelShelfEditor`, [[
        `div`, `.@_UQe`, `#@modalView`, [[
         `div`, `.@_HUa`], [`div`, `.@_UfX`, [[
          `div`, `.@_oPQ`, [[
            `div`, `&@style>letter-spacing:1.2px`, [[
              `div`, `.@_gcQ _aXZ _uZM`, [[
                `div`, `.@_gxM _geQ`, [[
                  `div`, `.@_eYG`, []], [
                  `div`, `.@_QZg _gMz`, [[`a`, `#@DelEditor`, `.@-_tX DelColor`, `&@href>javascript:;`]]]]]]], [
              `div`, `.@_aXY _XsQ _aA2`, `&@style>max-height: calc(100vh - 170px);padding:0`, [[
                `div`, `.@sZ2`, `&@style>font-size:12px`, [
                  ModelShelfEditor, ModelAlterAltString, ModelFileAlter, ModelAlterMake, ModelAlterSex, ModelAlterZone, ModelAlterPay, ModelAlterKilo, ModelAlterPile]]]]]]]]]]]]]];
  },

  ModalRetailStock (Sell, Pull) {

    let ModelFileSwipe = [];

    let ModelPollCart = [];

    let Swap = [RetailMaps[Sell.market].swapAlpha, RetailMaps[Sell.market].swap];

    let items;

    (Pull.items && Pull.items > 0) ? items = Pull.items : items = 1;

    let ModelJSON = `&@data>{
        &quot;alpha&quot;: &quot;${Sell.alpha.replace(new RegExp(`/`, `g`), `u/002F`)}&quot;,
        &quot;dollars&quot;: &quot;${Sell.dollars}&quot;,
        &quot;file&quot;: &quot;${Sell.files[0]}&quot;,
        &quot;items&quot;: &quot;${items}&quot;,
        &quot;mass&quot;: &quot;${Sell.mass}&quot;,
        &quot;MD5&quot;: &quot;${Sell.MD5}&quot;,
        &quot;swap&quot;: &quot;${Swap[1]}&quot;,
        &quot;swapAlpha&quot;: &quot;${Swap[0]}&quot;}`;

    let dollars = (Sell.dollars*items*Swap[1]).toFixed(2);

    if (Sell.files.length > 1) {

      let ModelFileSelect = [];

      Sell.files.forEach(File => {

        ModelFileSelect.push([
          `span`, `#@pullFile`, `&@file>${File}`, `&@style>${(Sell.files.indexOf(File) === 0)?`background:#54575a;`:``}width:10px;height:10px;border:1px solid #e3e3e3;margin:0 4px;border-radius:100%;cursor:pointer;opacity:1`])
      })

      ModelFileSwipe = [`div`, `.@_yZS _gMX`, ModelFileSelect];
    }

    if (Sell.pile && Sell.pile > 0) {

      ModelPollCart = [[
        `div`, `.@_geQ`, [[
          `div`, `.@_gxM _geQ`, `&@style>border:1px solid #e7e7e7;padding:4px 8px;width:100%`, [[
            `div`, `.@_geQ`, `&@style>width:25%`, [[
              `a`, `#@pollCartPile`, ModelJSON, `.@-_tX Minus`, `&@sum>${Sell.MD5}`, `&@role>minus`, `&@href>javascript:;`, `~@subtract`]]], [
            `div`, `&@style>width:50%;border:1px solid #e7e7e7;border-top:0;border-bottom: 0`, [[
              `span`, `&@style>text-align:center`, `~@${items}`]]], [
            `div`, `.@_geQ`, `&@style>width:25%`, [[
              `a`, `#@pollCartPile`, ModelJSON, `.@-_tX Plus`, `&@sum>${Sell.MD5}`, `&@role>plus`, `&@href>javascript:;`, `~@add`]]]]]]], [
        `div`, `.@_dMG _geQ`, [[`span`, `~@${Swap[0] + ` ` + dollars}`]]], [
        `div`, `.@_QZg _geQ`, [[
          `div`, `.@_axS`, [[
            `div`, `.@_gM_a _agM _guZ`, [[
              `a`, `#@alterCart`, `.@_TX_a _atX _utQ`, ModelJSON, `&@role>max`, `&@href>javascript:;`, `&@sum>{Args[2].sum}`, `&@style>font-size:12px`, `~@add to cart`]]]]]]]]
    }

    else {

      ModelPollCart = [[
        `div`, `.@_geQ`, []], [
          `div`, `.@_dMG _geQ`, [[`span`, `~@${Swap[0] + ` ` + dollars}`]]], [
          `div`, `.@_QZg _geQ`, [[
            `span`, `&@style>font-size:12px;font-weight:600;padding:0 12px;background:#9999992e;border-radius:100px;color:#999;`, `~@out of stock`]]]]
    }

    return [
      `div`, `@_-Zz`, `#@ModalRetailStock`, [[
        `div`, `.@_UQe _tY0`, `#@modalView`, [[
         `div`, `.@_HUa`], [`div`, `.@_UfX`, [[
          `div`, `.@_oPQ`, [[
            `div`, `&@style>letter-spacing:1.2px`, [[
              `div`, `.@_gcQ _aXZ uZM`, [[
                `div`, `.@_gxM _geQ`, `&@style>width:100%`, [[`a`, `#@DelRetailStock`, `.@-_tX Close`, `&@href>javascript:;`], [
                  `div`, `.@_eYG`, [[`span`, `&@style>overflow: hidden;text-overflow:ellipsis;white-space:nowrap;width:100%`, `~@${Sell.alpha}`]]]]]]], [
              `div`, `.@_aXY _XsQ _aA2`, `&@style>max-height: calc(100vh - 170px);padding:0;margin: 0 0 55px`, [[
                `div`, `.@sZ2`, `&@style>font-size:12px`, [[
                  `div`, [[
                    `div`, `.@g0X`, [[
                      `div`, `.@_yZ`, [[
                        `div`, `&@style>height:100%;overflow:hidden`, [[
                          `div`, `.@gA`, `&@style>z-index:1;position:absolute;top:50%;transform:translateY(-50%);left:0`], [
                          `div`, `.@gA`, [[`img`, `&@style>width:100%`, `&@alt>${Sell.alpha}`, `&@src>/${Sell.files[0]}`]]], [
                          `div`, `.@gA`, `&@style>z-index:1;position:absolute;top:50%;transform:translateY(-50%);right:0`]]]]]]], 
                    ModelFileSwipe, [
                    `div`, `.@_gcQ _aXZ`, [[`span`, `.@-_tX Ship`], [
                      `div`, `.@_eYG`, [[`span`, `~@Shipping & Delivery Time/Fees`]]], [
                      `div`, `.@_QZg`, [[`a`, `#@pullMailFee`, `.@-_tX To`, ModelJSON, `&@sum>${Sell.MD5}`, `&@href>javascript:;`]]]]]]]]]]], [
          `div`, `.@_azX- _gMX _gmg _gp0`, `&@style>border: none`, [[
            `div`, `.@_gxM _gMX`, [[
              `div`, `.@_gMX _geQ`, ModelPollCart]]]]]]]]]]]]]]];


  }
}