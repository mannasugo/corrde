`use strict`;

const fs = require(`fs`),
  crypto = require(`crypto`),
  mysql = require(`mysql`),
  cookie = require(`cookie`),
  OAuthSign = require(`oauth-signature`),
  UrlCall = require(`request`),
  //UUID = require(`uuid`),
  
  config = require(`./corrde-config`),
  model = require(`./corrde-model`),

  gyro = require(`./corrde-geoJSON`),

  RetailSets = config.RetailSets,

  RetailMaps = config.RetailZones,

  SellSet = config.SellSet;

class Auxll {

  constructor () {
    this.allSubs = {};}

  modelStyler (file, callback) {
    fs.readFile(file, {encoding: `utf8`}, (err, SString) => {
      for (let trim in config.rexp.cssSlim) {
        SString = SString.replace(config.rexp.cssSlim[trim], trim);
      }
      return callback(SString);
    });
  }

  literalFormat (configText) {
    let allSubs = {};
    for (let sub in this.allSubs) {
      allSubs[sub] = this.allSubs[sub];
    }
    for (let sub in allSubs) {
      allSubs[sub] = new RegExp(`{` + allSubs[sub] + `}`, `g`);
      configText = configText.replace(allSubs[sub], sub);
    }
    return configText;
  }

  availSubs (allSubs) {
    this.allSubs = allSubs;
    return this.allSubs;
  }

  availContracts4Field (B, field) {

    let alt = [];

    for (let task in B) {

      if (B[task].blab[0] === `{`) {

        let alt_ = JSON.parse(B[task].blab);

        if (field === alt_.field) {

          alt.push(alt_);
        }
      }
    }

    return alt;
  }

  availSelfsActivity (u, call) {

    new Sql().multi({}, `select * from u;select * from j;`, (A, B, C) => {

      let t2 = [], is_valid = false, //t2 tasks accepted
        is_valid_dual = false,
        contracts = [],
        selfContracts = [],
        fields = [];
      
      for (let uself in B[0]) {

        let alt = JSON.parse(B[0][uself].alt);

        if (alt.sum && alt.sum === u) {

          is_valid = alt;

          if (is_valid.skills.length > 0) {

            is_valid_dual = true;
            fields = is_valid.skills;
          }

        }
      }

      for (let jself in B[1]) {

        let alt = JSON.parse(B[1][jself].blab);

        contracts.push(alt);

        if (alt.sum && alt.sum === u) selfContracts.push(alt);

        for (let t in alt.activity.gives) {

          if (alt.activity.gives[t].sum === u) t2.push(alt);
        }
      }

      call (is_valid, selfContracts, {
        contracts: contracts,
        fields: fields,
        is_valid: is_valid,
        is_valid_dual: is_valid_dual, t0: selfContracts, t2: t2});
    })
  }

  locusGPS (locus, gps, radius) {

    let is_locus_valid = false;

    if (typeof locus === `object` && typeof gps === `object`) {

      let locussquare = [locus[0] - radius, locus[1] - radius, locus[0] + radius, locus[1] + radius];

      if (gps[0] >= locussquare[0] && gps[0] <= locussquare[2]) {

        if (gps[1] >= locussquare[1] && gps[1] <= locussquare[3]) {
          
          is_locus_valid = true;
        }
      }
    }

    return is_locus_valid;
  }

  inisumAvail (sum, call) {

    new Sql().multi({}, `select * from j`, (A, B, C) => {

      let job = [], is_avail = false;

      for (let task in B) {

        let alt = JSON.parse(B[task].blab);

        if (alt.ini_sum && alt.ini_sum === sum) job.push(alt);
      }

      if (job.length > 0) is_avail = true;

      call(is_avail, job);
    });
  }

  inisumAssoc (ini_sum, u, call) {

    let assoc = [], valid = false;

    this.inisumAvail(ini_sum, (A, B) => {

      let is_avail = A, job = B[0];

      this.availSelfsActivity(u, (A, B, C) => {

        if (is_avail === true && C.is_valid_dual === true) {

          let field = job[`field`] + `_` + job[`subfield`];

          if (C.fields.indexOf(field) !== -1) valid = true;

        }

        assoc[`open`] = job[`is_open`];
        assoc[`pool`] = job;

        if (valid === true && job.activity) {

          assoc[`valid`] = valid;

          let actsState = e => {

            let state = false;

            for (let act in e) {

              if (e[act].sum === u) state = true;
            }

            return state;
          }

          assoc[`applications`] = actsState(job.activity.applications);
          assoc[`gives`] = actsState(job.activity.gives);
          assoc[`interviews`] = actsState(job.activity.interviews);

          assoc[`u`] = C.is_valid;
        }

        call(assoc)
      });
    });
  }

  mailCluster (peer, call) {

    new Sql().multi({}, `select * from messages`, (A, B, C) => {
      
      let mailSliced = [], mailPaired = [];

      for (let msg in B) {

        let mailPool = JSON.parse(B[msg][`json`]);

        if (mailPool[`sum_to`] === peer) {

          mailSliced.push(mailPool);
          mailPaired.push(mailPool);

        }

        if (mailPool[`sum_src`] === peer) {

          mailPaired.push(mailPool);
        }
      }

      call(mailSliced, mailPaired);
    })
  }

  pushReq (req) {

    req.headers[`log`] = new Date().valueOf();

    if (req.headers.cookie && cookie.parse(req.headers.cookie).gps) {

       req.headers[`gps`] = cookie.parse(req.headers.cookie).gps 
     } 

     else req.headers[`gps`] = false;

    new Sql().to([`traffic`, {json: JSON.stringify(req.headers)}], (A, B, C) => {});
  }

  appAnalytics (call) {

    new Sql().multi({},
     `select * from traffic
     ;select * from u
     ;select * from j`, (A, B, C) => {

      let week = [], regulars = [], acts = [], yPlots0 = [], yPlots2 = [], gainCount = 0;

      let yPlotsActs = [];

      for (let day = 0; day < 7; day++) {

        let a = new Date(new Date().setUTCHours(0) - (day * 86400000)).toUTCString().valueOf(),
          z = new Date(new Date().setUTCHours(24) - (day * 86400000)).toUTCString().valueOf(),
          A = new Date(new Date().setUTCHours(0) - (day * 86400000)).valueOf(),
          Z = new Date(new Date().setUTCHours(24) - (day * 86400000)).valueOf();

        let dayOfWeek = [], gain = 0;

        if (!B || !B[0]) return;
      
        for (let log in B[0]) {

          let logStack = JSON.parse(B[0][log].json);

          if (parseInt(logStack.log) > A && parseInt(logStack.log) < Z) {

            dayOfWeek.push(logStack);
          }
        }

         yPlots0.push(dayOfWeek.length);

        (dayOfWeek.length > gainCount) ? gain = dayOfWeek.length - gainCount : gain = gain;

        gainCount = dayOfWeek.length;

        let regs = [], regStackPlus = [], regStack0 = [], regStack2 = [];

        let dayRegs = [];

        for (let regular in B[1]) {

          if (B[1][regular].alt[0] === `{`) {

            let regStack = JSON.parse(B[1][regular].alt);

            regs.push(regStack);

            if (parseInt(regStack.log) > A && parseInt(regStack.log) < Z) regStackPlus.push(regStack);

            if (parseInt(regStack.log) < Z) dayRegs.push(regStack)

            if (regStack[`skills`].length > 0) {

              regStack2.push(regStack);
            }

            else regStack0.push(regStack);
          }
        }

        yPlots2.push(regs.length);

        let poolActs = [], actsPlus = [], avails = [];

        for (let task in B[2]) {

          if (B[2][task].blab[0] === `{`) {

            let act = JSON.parse(B[2][task].blab);

            poolActs.push(act);

            if (parseInt(act.ini_log) > A && parseInt(act.ini_log) < Z) actsPlus.push(act);

            if (act.is_open === true && model.availtimeleft(parseInt((act.days * 86400000) + act.ini_log)) !== `timeout`) avails.push(act);

          }
        }

        yPlotsActs.push(poolActs.length)

        week[day] = {
          day: a,
          gain: gain,
          poolDay: dayOfWeek,
          secsUTC: new Date(new Date().setUTCHours(0) - (day * 86400000)).valueOf(),
          yPlots: yPlots0};

        regulars[day] = {
          day: a,
          gain: regStackPlus,
          poolDay: dayRegs,//regStackPlus,//regs,
          pool2: regStack2,
          pool0: regStack0,
          secsUTC: new Date(new Date().setUTCHours(0) - (day * 86400000)).valueOf(),
          yPlots: yPlots2};

        acts[day] = {
          avails: avails, 
          day: a,
          gain: actsPlus,
          poolDay: poolActs,
          secsUTC: new Date(new Date().setUTCHours(0) - (day * 86400000)).valueOf(),
          yPlots: yPlotsActs}

      }

      call({raw: week, regs: regulars, acts: acts});
    });
  }

  availDev (dev_md5, async) {

    new Sql().multi({},
      `select * from devs
      ;select * from devs_mail
      ;select * from support_mail
      ;select * from u`, (A, B, C) => {

        let joinObj = {};

        let devObj = [];

        let devsObj = [];

        let mailObj = [];

        let alertsObj = [];

        let mail2Obj = [];

        let mail_ = [];

        let uKeys = {};

        for (let dev in B[0]) {

          let devs = JSON.parse(B[0][dev].json);

          joinObj[devs.dev_md5] = devs;

          devsObj.push(devs);

          if (devs.ava === false) devs[`ava`] = this.alternativeMug(devs.alt);

          if (devs.dev_md5 === dev_md5) devObj.push(devs);

        }

        for (let msg in B[1]) {

          let msgObj = JSON.parse(B[1][msg].json);

          msgObj[`src_group`] = joinObj[msgObj.src_md5].group;
          msgObj[`src_ava`] = joinObj[msgObj.src_md5].ava;
          msgObj[`to_ava`] = joinObj[msgObj.to_md5].ava;

          if (msgObj.read === false && (msgObj.src_md5 === dev_md5 || msgObj.to_md5 === dev_md5)) alertsObj.push(msgObj);
        }

        for (let u in B[3]) {

          let uObj = JSON.parse(B[3][u].alt);

          uKeys[uObj.sum] = uObj;
        }

        for (let msg in B[2]) {

          let msgObj = JSON.parse(B[2][msg].json);

          mail2Obj.push(msgObj);

          if (msgObj.type === `quizes` && msgObj.to_md5 === devsObj[0].dev_md5) {

            if (msgObj.src_md5 === false) {

              msgObj[`src_ava`] = this.alternativeMug(msgObj.mailto);
              msgObj[`src_alt`] = msgObj.mailto;
              msgObj[`src_role`] = `customer`}

            else if (msgObj.src_md5 !== false) {
              msgObj[`src_alt`] = uKeys[msgObj.src_md5].full;
              msgObj[`src_ava`] = `/` + uKeys[msgObj.src_md5].ava;
              
              if (uKeys[msgObj.src_md5].skills.length > 0) msgObj[`src_role`] = `contractor & freelancer`;

              else msgObj[`src_role`] = `contractor`;

            }

            else if (msgObj.src_md5 !== false && uKeys[msgObj.src_md5].ava === false) {

              msgObj[`src_ava`] = this.alternativeMug(uKeys[msgObj.src_md5].full);}

            mail_.push(msgObj);
            mail_.sort((a, b) => {return b.mail_log - a.mail_log});
          }
        }

        async({dev: devObj, alerts: alertsObj, mail2: mail2Obj, mail_: mail_});
      })
  }

  logDevs (call) {

    new Sql().multi({},
      `select * from devs
      ;select * from devs_traffic`, (A, B, C) => {

        let devObj = [];

        let devsKey = {};

        const utc_Z = new Date().valueOf();

        const utc_A = new Date(new Date() - (6 * 86400000)).valueOf();

        for (let dev in B[0]) {

          let logCount = 0;

          let utcCount = 0;

          let diff = 0;

          let utc;

          let logObj = [];

          let mailObj = [];

          let devs = JSON.parse(B[0][dev].json);

          if (devs.ava === false) devs[`ava`] = this.alternativeMug(devs.alt)
          devs[`gps`] = false;
          devs[`pos`] = [];
          devs[`pre_mail_utc`] = new Date().valueOf();
          devs[`pre_utc`] = false;
          devs[`reqs_per_secs`] = 0.0;

          for (let log in B[1]) {

            let logs = JSON.parse(B[1][log].json);

            if (logs.utc > utc_A && logs.utc < utc_Z && logs.headers.dev_md5 === devs.dev_md5) {

              if (logCount > 0 && logCount%2 !== 0) {

                utc = logs.utc;

                if (utc === NaN) diff = diff
              }

              else if (logCount > 1 && logCount%2 === 0) {

                if (utc === NaN) diff = diff

                diff = parseInt(logs.utc) - parseInt(utc)

                utcCount += diff;

                devs[`reqs_per_secs`] = ((utcCount/(86400000*7))*100).toFixed(1);
              }

              logObj.push(logs);

              logObj.sort((a,b) => {return b.utc - a.utc});

              if (logObj[0].headers.gps && (logObj[0].headers.gps !== false || logObj[0].headers.gps !== `false`)) devs[`gps`] = logObj[0].headers.gps;

              if (logs.headers.referer.split(`/`).length > 2 && logs.headers.referer.split(`/`)[4] === `mail`) {

                mailObj.push(logs);

                devs[`pre_mail_utc`] = mailObj.sort((a, b) => {return b.utc - a.utc})[0].utc;
              }

              devs[`pre_utc`] = logObj[0].utc;

              logCount++
            }
          }

          let logs_ = [];

          for (let logs in B[1]) {

            let log_ = JSON.parse(B[1][logs].json);

            if (log_.headers.dev_md5 === devs.dev_md5 && typeof log_.headers.gps === `string` && log_.headers.gps[0] === `[`) devs[`pos`].push(log_.headers.gps)

            logs_.push(log_);
          }

          devObj.push(devs);

          devsKey[devs.dev_md5] = devs
        }

        call({dev: devObj, devsKey: devsKey});
      })
  }

  getDevsMail (async) {

    new Sql().multi({},
      `select * from devs
      ;select * from devs_mail
      ;select * from u
      ;select * from support_mail`, (A, B, C) => {

        let devsObj = [];

        let joinObj = {};

        let mailObj = [];

        let mailKeys = {};

        let mail2Obj = [];

        let mail_desc_txt = [];

        for (let dev in B[0]) {

          let devs = JSON.parse(B[0][dev].json);

          joinObj[devs.dev_md5] = devs;

          devsObj.push(devs);

        }

        for (let msg in B[1]) {

          let msgObj = JSON.parse(B[1][msg].json);

          msgObj[`src_group`] = joinObj[msgObj.src_md5].group;
          msgObj[`src_ava`] = joinObj[msgObj.src_md5].ava;
          msgObj[`to_ava`] = joinObj[msgObj.to_md5].ava;

          mailKeys[msgObj.mail_md5] = msgObj;

          mailObj.push(msgObj);
        }

        let mail_desc = [];

        for (let msg in B[3]) {

          let msgObj = JSON.parse(B[3][msg].json);

          mail2Obj.push(msgObj);

          if (devsObj[0].dev_md5 === msgObj.to_md5 && msgObj.src_md5 !== false) {

            if (mail_desc.indexOf(msgObj.src_md5) > -1) {

              mail_desc_txt.forEach((M, a) => {

                if (M[0] === msgObj.src_md5 && M[1] < msgObj.mail_log) M[1] = msgObj.mail_log;
              })
            }

            else {

              mail_desc_txt.push([msgObj.src_md5, msgObj.mail_log])
              mail_desc.push(msgObj.src_md5);
            }
          }

          else if (devsObj[0].dev_md5 === msgObj.src_md5 && msgObj.to_md5 !== false) {

            if (mail_desc.indexOf(msgObj.to_md5) > -1) {

              mail_desc_txt.forEach((M, a) => {

                if (M[0] === msgObj.to_md5 && M[1] < msgObj.mail_log) M[1] = msgObj.mail_log;
              })
            }

            else {

              mail_desc_txt.push([msgObj.to_md5, msgObj.mail_log])
              mail_desc.push(msgObj.to_md5);
            }
          }
        }

        async([
          mailObj, 
          mailKeys, 
          devsObj, 
          mail2Obj.sort((a,b) => {return b.mail_log - a.mail_log}),
          mail_desc_txt]);
      })
  }

  alternativeMug (subj) {

    let alpha = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;

    subj = parseInt(alpha.indexOf(subj.toUpperCase()[0]) + 1);

    let ava = config.reqs.alt_ava + subj + `_${Math.round(Math.random()*1)}.svg`;

    return ava
  }

  logs_u_md5 (call) {

    new Sql().multi({},
      `select * from u
      ;select * from u_md5_logs
      ;select * from stories
      ;select * from jobs
      ;select * from support_mail
      ;select * from vServices`, (A, B, C) => {

        let u_md5Obj = [];

        let u_md5Key = {};

        let polygs = [];

        let polygs_key = {};

        let jobs = [];

        let jobs_log = {};

        let VServiceArray = [];

        let VServiceMap = {};

        const utc_Z = new Date().valueOf();

        const utc_A = new Date(new Date() - (6 * 86400000)).valueOf();

        if (!B) return;

        for (let u in B[0]) {

          let logCount = 0;

          let utcCount = 0;

          let diff = 0;

          let utc;

          let logObj = [];

          let polygs_ = [];

          let polygs__key = {};

          let jobs_ = [];

          let jobs_log_ = {};

          let md5 = JSON.parse(B[0][u].alt);

          let DEVS_MAIL = [];

          let VServiceSelfArray = [];

          let VServiceSelfMap = {};

          if (md5.ava === false) {md5[`ava`] = this.alternativeMug(md5.full); md5[`ava_alert`] = true;}

          else if (md5.ava !== false) md5[`ava`] = `/` + md5[`ava`];

          md5[`gps`] = false;
          md5[`polygs`] = [];
          md5[`polygs_audience`] = [];
          md5[`polygs_mail`] = 0;
          md5[`polygs_mail2`] = 0;
          md5[`pos`] = [];
          md5[`pre_devs_msg`] = [];
          md5[`pre_mail_log_secs`] = new Date().valueOf();
          md5[`pre_log_secs`] = new Date().valueOf();
          md5[`pre_mail_utc`] = new Date().valueOf();
          md5[`pre_utc`] = new Date().valueOf();
          md5[`reqs_per_polyg`] = 0.0;
          md5[`reqs_per_secs`] = 0.0;
          md5[`vServices`] = [];

          for (let log in B[1]) {

            let logs = JSON.parse(B[1][log].json);

            if (logs.utc > utc_A && logs.utc < utc_Z && logs.u_md5 === md5.sum) {

              if (logCount > 0 && logCount%2 !== 0) {

                utc = logs.utc;

                if (utc === NaN) diff = diff
              }

              else if (logCount > 1 && logCount%2 === 0) {

                if (utc === NaN) diff = diff

                diff = parseInt(logs.utc) - parseInt(utc)

                utcCount += diff;

                md5[`reqs_per_secs`] = ((utcCount/(86400000*7))*100).toFixed(1);
              }

              logObj.push(logs);

              logObj.sort((a,b) => {return b.utc - a.utc});

              if (logObj[0].gps && (logObj[0].gps !== false || logObj[0].gps !== `false`)) md5[`gps`] = logObj[0].gps;

              if (logs.headers.referer.split(`/`).length > 2 && logs.headers.referer.split(`/`)[4] === `mail`) {

                //mailObj.push(logs);

                //md5[`pre_mail_utc`] = mailObj.sort((a, b) => {return b.utc - a.utc})[0].utc;
              }

              md5[`pre_utc`] = logObj[0].utc;

              logCount++
            }
          }

          let miniKey = {};

          for (let u in B[0]) {

            let md5_ = JSON.parse(B[0][u].alt);

            miniKey[md5_.sum] = md5_;
          }

          let logs_ = [];

          let PRE_LOG_SECS = [];

          for (let logs in B[1]) {

            let log_ = JSON.parse(B[1][logs].json);

            if (log_.u_md5 === md5.sum && typeof log_.gps === `string` && log_.gps[0] === `[`) md5[`pos`].push(log_.gps)

            //logs_.sort((a, b) => {return b.utc - a.utc})

            if (log_.u_md5 === md5.sum) {

              if (log_.headers.referer.split(`/`).length > 2 && log_.headers.referer.split(`/`)[3] === `mail`) {

                PRE_LOG_SECS.push(log_);

                md5[`pre_mail_log_secs`] = PRE_LOG_SECS.sort((a, b) => {return b.utc - a.utc})[0].utc;
              }

              //md5[`pre_log_secs`] = logs_[0].utc;
            }

            logs_.push(log_);
          }

          for (let msg in B[4]) {

            let Msg = JSON.parse(B[4][msg].json);

            if (md5.sum === Msg.to_md5 || md5.sum === Msg.src_md5) DEVS_MAIL.push(Msg);

            if (md5.sum === Msg.to_md5 && Msg.mail_log > md5[`pre_mail_log_secs`]) md5[`pre_devs_msg`].push(Msg);
          }

          let polygs_mail2 = 0;

          let polygs_mail = 0;

          let polygs_audience = []

          for (let img in B[2]) {

            let pfolio = JSON.parse(B[2][img].json);

            pfolio[`seen`] = [];

            logs_.forEach(logs => {

              if (logs.headers.referer.split(`/`).length > 2 && logs.headers.referer.split(`/`)[4] === pfolio.log_md5) {

                pfolio.seen.push(logs.u_md5)
              }
            });

            if (miniKey[pfolio.u_md5].ava === false) {pfolio[`ava`] = this.alternativeMug(miniKey[pfolio.u_md5].full);}

            else if (miniKey[pfolio.u_md5].ava !== false) pfolio[`ava`] = `/` + miniKey[pfolio.u_md5].ava;

            pfolio[`full`] = miniKey[pfolio.u_md5].full;

            if (pfolio.text === false) pfolio.text = `${pfolio.tag[0]}, ${pfolio.tag[1]}`;

            if (md5.sum === pfolio.u_md5) {

              pfolio[`mail`].forEach(U => {

                if (md5[`polygs_audience`].indexOf(U.u_md5) === -1) md5[`polygs_audience`].push(U.u_md5);

              })

              md5[`polygs_mail`] += pfolio.mail.length;
              md5[`polygs_mail2`] += pfolio.mail2.length;
              md5[`polygs`].push(pfolio);
            }

            polygs_mail2 += pfolio.mail2.length;

            polygs_.push(pfolio);

            polygs__key[pfolio.log_md5] = pfolio;

            polygs_.sort((a,b) => {return b.log_secs - a.log_secs});
          }

          for (let img in B[3]) {

            let J = JSON.parse(B[3][img].json);

            J[`seen`] = [];

            logs_.forEach(logs => {

              if (logs.headers.referer.split(`/`).length > 2 && logs.headers.referer.split(`/`)[4] === J.log_md5) {

                J.seen.push(logs.u_md5)
              }
            });

            /**

            if (miniKey[pfolio.u_md5].ava === false) {pfolio[`ava`] = this.alternativeMug(miniKey[pfolio.u_md5].full);}

            else if (miniKey[pfolio.u_md5].ava !== false) pfolio[`ava`] = `/` + miniKey[pfolio.u_md5].ava;

            pfolio[`full`] = miniKey[pfolio.u_md5].full;

            if (pfolio.text === false) pfolio.text = `${pfolio.tag[0]}, ${pfolio.tag[1]}`;

            if (md5.sum === pfolio.u_md5) {

              pfolio[`mail`].forEach(U => {

                if (md5[`polygs_audience`].indexOf(U.u_md5) === -1) md5[`polygs_audience`].push(U.u_md5);

              })

              md5[`polygs_mail`] += pfolio.mail.length;
              md5[`polygs_mail2`] += pfolio.mail2.length;
              md5[`polygs`].push(pfolio);
            }

            polygs_mail2 += pfolio.mail2.length;

            **/

            jobs_.push(J);

            jobs_log_[J.log_md5] = J;

            jobs_.sort((a,b) => {return b.log_secs - a.log_secs});
          }

          for (let v in B[5]) {

            let Retail = JSON.parse(B[5][v].json);

            if (!Retail.vServiceAva) Retail[`vServiceAva`] = false;

            if (!Retail.vServiceRating) Retail[`vServiceRating`] = `0.0`;

            if (md5.sum === Retail.u_md5) md5[`vServices`].push(Retail);

            VServiceSelfMap[Retail.log_md5] = Retail;

            VServiceSelfArray.push(Retail);
          }

          md5[`img`] = [{img_2d: [700, 350]}]; 

          if (md5[`polygs`].length > 0) {

            md5[`img`][0].img_2d = md5[`polygs`][md5[`polygs`].length - 1].img[0].img_2d

            md5[`polygs_cover_img`] = md5[`polygs`][md5[`polygs`].length - 1].img[0].src;

            if (polygs_mail2 > 0) md5[`reqs_per_polyg`] = ((4.999*md5[`polygs_mail2`])/polygs_mail2).toFixed(2);
          }

          else if (md5[`polygs`].length === 0) {md5[`polygs_cover_img`] = `gp/p/vector/polyg_mug.svg`;}

          u_md5Obj.push(md5);

          u_md5Key[md5.sum] = md5;

          polygs = polygs_;

          polygs_key = polygs__key;

          jobs = jobs_;

          jobs_log = jobs_log_;

          VServiceMap = VServiceSelfMap;

          VServiceArray = VServiceArray;
        }

        call({
          jobs: jobs,
          jobs_log: jobs_log,
          md5: u_md5Obj, 
          md5Key: u_md5Key, 
          polygs: polygs, 
          polygs_log_key: polygs_key,
          vServiceMap: VServiceMap,
          vServiceArray: VServiceArray});
      })
  }

  Stores (call) {

    new Sql().multi({},
      `select * from vServices
      ;select * from products
      ;select * from payments
      ;select * from transfers
      ;select * from sales`, (A, B, C) => {

      let Dailies = [[], []];

      let Deals = [];

      let DealsMap = {};

      let Monthlies = [[], []]

      let Stores = [];

      let StoresMap = {};

      let Sales = [];

      let SalesMap = {};

      let Sent = [];

      let SentMap = {};

      let Stock = [];

      let StockMap = {};

      let Weeklies = [[], []];

      for (let store in B[0]) {

        let Store = JSON.parse(B[0][store].json);

        let SalesSelf = [];

        let SalesSelfMap = {};

        let SentSelf = [];

        let SentSelfMap = {};

        let StockSelf = [];

        let StockSelfMap = {};

        let floatSales = 0;

        let floatSent = 0;

        let intRatings = 0;

        let floatStoresRatings = 0;

        Store[`Balance`] = `0.0`;

        Store[`RateSum`] = 0;

        Store[`Sales`] = [];

        Store[`Sent`] = [];

        Store[`Stock`] = [];

        if (!Store.vServiceAva) Store[`vServiceAva`] = false;

        Store[`vServiceRating`] = `0.0`;

        for (let item in B[1]) {

          let Asset = JSON.parse(B[1][item].json);

          Asset[`rating`] = `0.0`;

          if (Asset.store_md5 === Store.log_md5 && Asset.u_md5 === Store.u_md5) Store[`Stock`].push(Asset);

          intRatings += Asset.ratings.length;

          StockSelf.push(Asset);

          StockSelfMap[Asset.asset_md5] = Asset;
        }

        for (let item in StockSelf) {

          let Self = StockSelf[item];

          if (intRatings > 0) {

            Self.rating = ((4.999*Self.ratings.length)/intRatings).toFixed(2);

            if (Self.store_md5 === Store.log_md5 && Self.u_md5 === Store.u_md5) Store[`RateSum`] += parseFloat(Self.rating)
          }
        }

        for (let sale in B[2]) {

          let Sale = JSON.parse(B[2][sale].json);

          if (Sale.sale_to === `store_md5` && Sale.store_md5 === Store.log_md5) {

            floatSales += Sale.sale;

            Store[`Sales`].push(Sale);
          }

          SalesSelf.push(Sale);

          SalesSelfMap[Sale.sale_md5] = Sale;
        }

        for (let remit in B[3]) {

          let Remit = JSON.parse(B[3][remit].json);

          if (Remit.remit_to === `store_md5` && Remit.store_md5 === Store.log_md5) {

            floatSent += Remit.sale;

            Store[`Sent`].push(Remit);
          }

          SentSelf.push(Remit);

          SentSelfMap[Remit.remit_md5] = Remit;
        }

        Store[`Balance`] = floatSales - floatSent;

        if (typeof Store.vServiceAddress !== `object` || typeof Store.vServiceAddress[0] !== `object`) Store.vServiceAddress = [];

        if (intRatings > 0) Store[`vServiceRating`] = (Store.RateSum/Store.Stock.length).toFixed(2);

        Stores.push(Store);

        StoresMap[Store.log_md5] = Store;

        Sales = SalesSelf;

        SalesMap = SalesSelfMap;

        Sent = SentSelf;

        SentMap = SentSelfMap;

        Stock = StockSelf;

        StockMap = StockSelfMap;
      }

      for (let deal in B[4]) {

        let Deal = JSON.parse(B[4][deal].json);

        if (Deal.sale_state === true && Deal.sale_off_log_secs > new Date().valueOf()) {

          if (Deal.sale_class === `monthly`) {

            Monthlies[0].push(Deal.log_md5);
            Monthlies[1].push(Deal.asset_md5);
          }

          if (Deal.sale_class === `weekly`) {

            Weeklies[0].push(Deal.log_md5);
            Weeklies[1].push(Deal.asset_md5);
          }

          if (Deal.sale_class === `daily`) {

            Dailies[0].push(Deal.log_md5);
            Dailies[1].push(Deal.asset_md5);
          }

          Deals.push(Deal);

          DealsMap[Deal.log_md5] = Deal;
        }
      }

      call({
        Dailies: Dailies,
        Deals: Deals,
        DealsMap: DealsMap,
        Monthlies: Monthlies,
        Stores: Stores, 
        StoresMap: StoresMap,
        Stock: Stock,
        StockMap: StockMap,
        Sales: Sales,
        SalesMap: SalesMap,
        Sent: Sent,
        Sent: SentMap,
        Weeklies: Weeklies})
    })
  }

  Sell (Aft) {

    new Sql().multi({},
      `select * from inventory
      ;select * from payrequest
      ;select * from fronts
      ;select * from listings`, (A, B, C) => {

        let Pay = [];

        let PaySet = {};

        let Pledge = [];

        let PledgeSet = {};

        let Sell = [];

        let SellSet = {};

        let Stalls = [];

        let StallSet = {};

        for (let row in B[0]) {

          let Row = JSON.parse(B[0][row].json);

          Sell.push(Row);

          SellSet[Row.MD5] = Row;
        }

        for (let pay in B[1]) {

          let Row = JSON.parse(B[1][pay].json);

          Pay.push(Row);

          PaySet[Row.MD5] = Row;
        }

        for (let stall in B[2]) {

          let Row = JSON.parse(B[2][stall].json);

          Stalls.push(Row);

          StallSet[Row.MD5] = Row;
        }

        for (let row in B[3]) {

          let Row = JSON.parse(B[3][row].json);

          Pledge.push(Row);

          PledgeSet[Row.sum] = Row;
        }

        Aft({
          Sell: [Sell, SellSet],
          Pay: [Pay, PaySet],
          Stalls: [Stalls, StallSet],
          Pledge: [Pledge, PledgeSet]})
      })
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
        `${config.sql.devs}
        ;${config.sql.devs_mail}
        ;${config.sql.devs_traffic}
        ;${config.sql.fronts}
        ;${config.sql.inventory}
        ;${config.sql.jobs}
        ;${config.sql.listings}
        ;${config.sql.m}
        ;${config.sql.messages}
        ;${config.sql.payments}
        ;${config.sql.payrequest}
        ;${config.sql.products}
        ;${config.sql.sales}
        ;${config.sql.stories}
        ;${config.sql.support_mail}
        ;${config.sql.traffic}
        ;${config.sql.transfers}
        ;${config.sql.u}
        ;${config.sql.u_md5_logs}
        ;${config.sql.u_md5_mail}
        ;${config.sql.vServices}`);
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

  multi (allSubs, conca, call) {
    this.availSubs(allSubs);

    this.multiSql.query(this.literalFormat(conca), (A, B, C) =>  call(A, B, C));
    this.multiSql.end();
  }

}

class UAPublic extends Auxll {

  constructor (level, req, res) {
    super();
    this.levelState = level;
    this.app = {fro: req, to: res};
  }

  handleUACalls () {

    if (this.levelState === ``) this.Root();

    /**
    Adhere to Alphabetic Order
    Perpendicularly Bisect Countries to find tiles-to-quadrant origin.
    **/

    if (this.levelState === `contracts`) this.contractsMap();

    if (this.levelState === `devs`) this.toDevs();

    if (this.levelState === `getjobs`) this.getJobs();

    //if (this.levelState === `mail`) this.mailSliced();

    if (this.levelState === `monitor`) this.monitor();

    if (this.levelState === `support`) this.support();

    if (this.levelState === `in`) this.in();

    if (this.levelState === `mycontract`) this.formContract();

    if (this.levelState === `myjobs`) this.selfContracts();

    if (this.levelState === `p`) this.p();

    if (this.levelState === `quora`) this.quora();

    if (this.levelState === `meta`) this.meta();

    if (this.levelState === `setup`) this.setup();

    if (this.levelState === `explore`) this.inView();

    else if (this.levelState === `app`) this.appRoot();

    else if (this.levelState === `checkout`) this.ComputePay();

    else if (this.levelState === `contract`) this.contract();

    else if (this.levelState === `favicon.ico`) {

      let File = fs.createReadStream(`gp/p/vector/app_logo.svg`);

      this.app.to.writeHead(200, {
        [`Content-Type`]: `image/svg+xml`
      })

      File.on(`data`, this.app.to.write.bind(this.app.to));

      File.on(`close`, () => this.app.to.end())
    }

    else if (this.levelState === `invoices`) this.PullPays();

    else if (this.levelState === `feed`) this.feed();

    else if (this.levelState === `jobs`) this.Jobs();

    else if (this.levelState === `login`) this.login();

    else if (this.levelState === `mail`) this.selfMail();

    else if (this.levelState === `mug`) this.selfMug();

    else if (this.levelState === `pay`) this.StockPay();

    else if (this.levelState === `portfolio`) this.createStory();

    else if (this.levelState === `signup`) this.signup();

    else if (this.levelState === `seek`) this.seek();

    else if (this.levelState === `tour`) this.tour();

    else if (this.levelState === `vendors`) this.PullStores();
  }

  subCalls () {

    if (this.levelState[1] === `category`) {

      let StockSet = [
        `bags`,
        `bodysuit`,
        `bottoms`, 
        `dresses`, 
        `ear wear`, 
        `heels`, `hoodies`, `lingerie`, `lips`, `monitors`, `pants`, `phones`, `shoes`, `shorts`, `sneakers`, `swimwear`, `tops`, `watches`];

      this.Stores(A => {

        if (StockSet.indexOf(this.levelState[2]) > -1) this.StockSet(this.levelState[2], A);

      });
    }

    else if (this.levelState[1] === `checkout`) {

      this.ComputePay();
    
    }

    else if (this.levelState[1] === `dashboard`) this.ControlStore(this.levelState[2])

    else if (this.levelState[1] === `devs`) {

      if (this.levelState[2] === `add`) this.addDevs();

      else if (this.levelState[2] === `analytics`) this.analyticsRoot();

      else if (this.levelState[2] === `mail`) {

        this.getDevsMail(A => {

          if (A[1][this.levelState[3]]) this.readDevsMail(A[1][this.levelState[3]], A);

          else this.devsMail(A);

        });
      }

      else if (this.levelState[2] === `toolkit`) {

        this.Stores(A => {this.toolSuite(A)})}
    }

    else if (this.levelState[1] === `grocery`) {

      if (this.levelState[2]) this.RetailStock([`grocery`, this.levelState[2]]);
    }

    else if (this.levelState[1] === `j`) {

      this.logs_u_md5(A => {

        if (A.jobs_log[this.levelState[2]]) this.readJob(A.jobs_log[this.levelState[2]], A);
      });
    }

    else if (this.levelState[1] === `mail`) {

      this.inisumAvail(this.levelState[2], (A, B) => {

        this.mailPeers(A, B[0]);
      });
    }

    else if (this.levelState[1] === `maps`) {

      this.logs_u_md5(A => {

        if (A.jobs_log[this.levelState[2]]) this.JobMap(A.jobs_log[this.levelState[2]], A);

        else if (this.levelState[2] === `store`) {

          if (this.levelState[3] === `set`) {

            if (A.vServiceMap[this.levelState[4]]) this.StoreAddressSet(A.vServiceMap[this.levelState[4]]);
          }
        }
      });
    }

    else if (this.levelState[1] === `monitor`) {

      if (this.levelState[2] === `graphs`) this.graphsRep()
    }

    else if (this.levelState[1] === `mug`) {

      this.logs_u_md5(A => {

        if (A.md5Key[this.levelState[2]]) this.readMug(A.md5Key[this.levelState[2]], A.md5Key);
      });
    }

    else if (this.levelState[1] === `p`) {

      this.inisumAvail(this.levelState[2], (A, B) => {

        if (A === true) {

          this.contractDetailed(B[0]);
        }
      });
    }

    else if (this.levelState[1] === `payrequest`) {

      if (this.levelState[2]) this.PullPay(this.levelState[2]);

    }

    else if (this.levelState[1] === `portfolio`) {

      this.logs_u_md5(A => {

        if (A.polygs_log_key[this.levelState[2]]) this.readStory(A.polygs_log_key[this.levelState[2]], A.md5Key);
      });
    }

    else if (this.levelState[1] === `sales`) {

      this.Stores(A => {

        if (this.levelState[2] === `quick`) this.flashSale(A);
      })
    }

    else if (this.levelState[1] === `stock`) {

      this.Stores(A => {

        if (A.StockMap[this.levelState[3]]) {

          if (A.StockMap[this.levelState[3]].store_md5 === this.levelState[2]) {

            this.StoreStock(A.StockMap[this.levelState[3]], A);
          }
        }
      });
    }

    else if (this.levelState[1] === `store`) {

      if (this.levelState[2].length > 3) {

        let Shelf = this.levelState[2].replace(new RegExp(/_/, `g`), ` `);

        if (RetailSets.indexOf(Shelf) > -1) this.RetailSets(Shelf);

        else {

          this.Stores(A => {

            if (this.levelState[2] === `billings`) {

              if (A.StoresMap[this.levelState[3]]) this.StoreBillings(A.StoresMap[this.levelState[3]]);
            }

            else if (A.StoresMap[this.levelState[2]]) this.retailStore(A, A.StoresMap[this.levelState[2]]);

          })
        }
      }
    }

    else if (this.levelState[1] === `v`) this.PullStall(this.levelState[2]);

    else if (this.levelState[1] === `v2`) {

      if (this.levelState[2] === `devs`) {

        this.devsControls()
      }
    }
  }

  rootCall () {

    this.modelStyler(config.lvl.css, CSSString => {

      this.analytics(msg => {

        this.logs_u_md5(A => {

        const modelMapping = {
          title: `Corrde`,
          css: CSSString,
          jSStore: JSON.stringify({State: `offline`}),
          jsState: [`/gp/js/topojson.v1.min.js`, config.reqs._js/*, config.cd.auJS*/],
          appendModel: ``
        };

        let rootDualCall, a2 = {};

        if (this.app.fro.headers.cookie) {

          let cJar = cookie.parse(this.app.fro.headers.cookie);

          if (cJar[`u`]) {

            a2 = A.md5Key[cJar[`u`]];
            rootDualCall = model.top(a2);
          } 
          
          else {

            a2[`appendModel`] = model.mugger();
            rootDualCall = model.header(a2);
          }
        }

        else {

          a2[`appendModel`] = model.mugger();
          rootDualCall = model.header(a2);
        }

        modelMapping[`appendModel`] = [
          model.main({
            appendModel: [model.supportAlert(),
              model.banner(), model.rootXtra(), 
              model.products(),
              model.SVGMetrics(msg),
              model.hows(), model.feature(),
              model.footer()]}), rootDualCall];
        modelMapping[`appendModel`] = [model.wrapper(modelMapping), model.jS(modelMapping)];

        this.app.to.writeHead(200, config.reqMime.htm);
        this.app.to.end(model.call(modelMapping));
      });
    });

    });
  }

  in () {

    this.modelStyler(config.lvl.css, CSS => {

      const pool = {
        title: `Corrde - Sign in`,
        css: CSS, 
        jSStore: JSON.stringify({State: `Sign in`}),
        jsState: config.cd.auJS};

      pool.appendModel = [
        model.main({
          appendModel: [
            model.in(),
            model.footer()]
        })];

      pool.appendModel = [
        model.wrapper(pool),
        model.jS(pool)];

      this.app.to.writeHead(200, config.reqMime.htm);
      this.app.to.end(model.call(pool));
    })
  }

  meta () {

    this.isValid(`is_mail`);

    this.modelStyler(config.lvl.css, CSS => {

      const pool = {
        title: `Corrde - Sign Up`,
        css: CSS, 
        jSStore: JSON.stringify({State: `Sign up`}),
        jsState: config.cd.auJS};

      pool.appendModel = [
        model.main({
          appendModel: [
            model.inMeta(),
            model.footer()]
        })];

      pool.appendModel = [
        model.wrapper(pool),
        model.jS(pool)];

      this.app.to.writeHead(200, config.reqMime.htm);
      this.app.to.end(model.call(pool));
    })
  }

  isValid (is) {

    if (this.app.fro.headers.cookie) {

      let cJar = cookie.parse(this.app.fro.headers.cookie);

      if (!cJar[is]) this.rootCall();

      return cJar[is];

    } 

    else this.rootCall();
  }

  isCookieValid (is, callView) {

    if (this.app.fro.headers.cookie) {

      let cJar = cookie.parse(this.app.fro.headers.cookie);

      if (!cJar[is]) {

        this.rootCall();
      }
      
      else callView();

    } 

    else this.rootCall();
  }

  setup () {

    this.isValid(`is_full_set`);

    this.modelStyler(config.lvl.css, CSS => {

      const pool = {
        title: `Corrde - Set Up Pro Account`,
        css: CSS, 
        jSStore: JSON.stringify({State: `setup`}),
        jsState: config.cd.auJS};

      pool.appendModel = [
        model.main({
          appendModel: [
            model.setPro(),
            model.footer()]
        })];

      pool.appendModel = [
        model.wrapper(pool),
        model.jS(pool)];

      this.app.to.writeHead(200, config.reqMime.htm);
      this.app.to.end(model.call(pool));
    })
  }

  u () {

    if (typeof this.isPassValid() !== `string`) return;

    this.modelStyler(config.lvl.css, CSSString => {

      this.availSubs({[this.isPassValid()]: `sum`});

      let conca = this.literalFormat(config.sql.j);

      conca += `;` + this.literalFormat(config.sql.a_u);

      conca += `;` + this.literalFormat(config.sql.a_p);

      this.availSubs({
        [this.isPassValid()]: `sum`, 
        [`j`/*_` + this.isPassValid()*/]: `tab`,
        [`uSum`]: `field`, [this.isPassValid()]: `value`,
        [`St_`]: `way`, [`10`]: `int`})

      conca += `;` + this.literalFormat(config.sql.all + `;` + config.sql.limself);

      new Sql().multi({
        [this.isPassValid()]: `sum`, 
        [`j`/*_` + this.isPassValid()*/]: `tab`,
        [`uSum`]: `field`, [this.isPassValid()]: `value`,
        [`St_`]: `way`, [`10`]: `int`}, conca, (A, B, C) => {console.log(B[4])

          let modelMapping = {
            title: `Corrde`,
            css: CSSString,
            appendModel: ``,
            JSStore: {
              u: this.isPassValid()}};

          modelMapping[`JSStore`] = JSON.stringify(modelMapping[`JSStore`]);

          if (B[4].length === 0) {
            modelMapping.raw = `post job to boost activity`;
            modelMapping[`appendModel`] = [model.null(modelMapping)];
          }

          if (B[4].length > 0) {
            modelMapping[`s`] = B[4];
            modelMapping[`appendModel`] = model.market(modelMapping);
          }

          modelMapping[`appendModel`] = model.uModel(modelMapping);

          this.app.to.writeHead(200, config.reqMime.htm);
          this.app.to.end(model.call(modelMapping));
        });
      });
  }

  p () {

    if (typeof this.isPassValid() !== `string`) return;

    this.modelStyler(config.lvl.css, CSSString => {

      //default to skill filter when scaling i.e. iterate over market table with user skills.

      let conca = config.sql.j + `;` + 
                  config.sql.a + `;` +
                  config.sql.a_p;

      new Sql().multi({
        [this.isPassValid()]: `sum`}, conca, (A, B, C) => {

          let modelMapping = {
            title: `Corrde`,
            css: CSSString,
            appendModel: ``,
            JSStore: {
              u: this.isPassValid()}};

          modelMapping[`JSStore`] = JSON.stringify(modelMapping[`JSStore`]);

          //if (B[1].length === 0) {
          //  modelMapping.raw = `select skills to view jobs`;
          //  modelMapping[`appendModel`] = [model.null(modelMapping)];
          //}

          new Sql().multi({
            [`j`]: `tab`,
            [`St_`]: `field`, [`10`]: `int`}, config.sql.lmtDsc, (A,B,C) => {console.log(B)

              if (B.length > 0) {
                modelMapping[`s`] = B;
                modelMapping[`appendModel`] = model.market(modelMapping);
              }

              modelMapping[`appendModel`] = 
                model.pModel(modelMapping);

              this.app.to.writeHead(200, config.reqMime.htm);
              this.app.to.end(model.call(modelMapping));
            });
        });
      });
  }

  quora () {

    this.isPassValid();

    this.modelStyler(config.lvl.css, CSSString => {

      this.availSubs({
      [`quora`]: `tab`, [`u`]: `tab_1`,
      [`src`]: `field`, [`sum`]: `field_1`,
      [`log`]: `rule`, [`10`]: `int`});

      let conca = this.literalFormat(config.sql.join_csc_sel_field);

      this.availSubs({
      [`quora_comments`]: `tab`, [`u`]: `tab_1`,
      [`src`]: `field`, [`sum`]: `field_1`,});

      conca += `;` + this.literalFormat(config.sql.join_sel_field);

      let issue = [],
        //plus = [],
        support = 0,
        stats = 0;

      new Sql().multi({}, conca, (A,B,C) => {

        B[1].sort((a,b) => {
          return (b.log - a.log)});

        for (let i = 0; i < B[0].length; i++) {

          let plus = []
          //B[0][i][`plus`] = []

          for (let a = 0; a < B[1].length; a++) {

            if (B[0][i].cord === B[1][a].cord) {

              if (B[1][a].fro === `admin`) support += 1;

              plus.push(B[1][a]);
            }
          };

          (support > 0) ? support = `true` : support = `false`;

          (plus.length > 0) ? stats = plus.length.toString() : stats = ``;

          issue[i] = {
            alt: B[0][i].alt,
            log: B[0][i].log,
            ilk: B[0][i].ilk,
            text: B[0][i].txt,
            view: support,
            stat: stats,
            cord: B[0][i].cord,
            _src: B[0][i].src,
            pool: plus};
        };console.log(issue)

        let modelMapping = {
          title: `Corrde Quora`,
          css: CSSString,
          pool: issue,
          JSStore: {
            u: this.isPassValid()}};

      modelMapping[`JSStore`] = JSON.stringify(modelMapping[`JSStore`]);

      modelMapping[`appendModel`] = [model.quora(modelMapping)];

      this.app.to.writeHead(200, config.reqMime.htm);
      this.app.to.end(model.call(modelMapping));

      });

      
      });
  }

  vacant () {

    this.modelStyler(config.lvl.css, CSSString => {

      let modelMapping = {
        title: `Corrde Jobs`,
        css: CSSString,
        appendModel: ``,
        JSStore: {
          jobs: true}};

      modelMapping[`JSStore`] = JSON.stringify(modelMapping[`JSStore`]);

      modelMapping[`appendModel`] = [model.vacant(modelMapping)];

      this.app.to.writeHead(200, config.reqMime.htm);
      this.app.to.end(model.call(modelMapping));
      });
  }

  inView () {

    this.isValid(`u`);

    let conca = `select * from u`;

    this.modelStyler(config.lvl.css, CSS => {

      new Sql().multi({}, conca, (A, B, C) => {

        let isAuth = false;

        for (let u in B) {

          if (B[u].sum === this.isValid(`u`)) isAuth = B[u];
        }

        if (isAuth !== false) {

          this.availSelfsActivity(this.isValid(`u`), (A, B, C) => {

            let alt = JSON.parse(isAuth.alt);

            const pool = {
              title: `Corrde Overview`,
              css: CSS, 
              jSStore: JSON.stringify({
                ava: alt.ava,
                fields: C.fields,
                full: alt.full,
                is_valid_dual: C.is_valid_dual,
                per: A.appraisal,
                State: `overview`,
                in: this.isValid(`u`)}),
                jsState: config.cd.auJS};

            this.fieldAnalysis(`Art`, (A, B) => {

              pool.appendModel = [
                model.main({
                  appendModel: [ model.inView(A, B), model.footer()]
                }), model.top(alt)];

              pool.appendModel = [model.wrapper(pool), model.jS(pool)];

              this.app.to.writeHead(200, config.reqMime.htm);
              this.app.to.end(model.call(pool));
            })
          }); 
        }
      })
    })    
  }

  analytics (call) {

    let allJobs = [],
      fieldCount = [],
      auMap = new Map(),
      conca = `select * from j;`;
      conca += `select * from u;`;


    new Sql().multi({}, conca, (A, B, C) => {

      if (B && parseInt(B[0].length)) allJobs = B[0];

        let allPro = new Map(),
          openTasks = new Map(),
          fCount = 0;

        if (B && B[0]) {

          for (let task in B[0]) {

            if (B[0][task].blab[0] === `{`) {

              let alt_ = JSON.parse(B[0][task].blab);

              if (alt_.is_open === true) {

                openTasks.set(alt_.ini_sum, alt_.sum);
              }

            }
          }

          for (let field in config.fields) {

            let sFields = [];

            for (let task in B[0]) {

              if (B[0][task].blab[0] === `{`) {

                let alt_ = JSON.parse(B[0][task].blab);

                if (field === alt_.field) {

                  sFields.push(alt_.subfield)
                }
              }
            }
              
            let fieldModus;

            if (allJobs.length === 0) {

              fieldModus = 0;
            } 

            else {

              fieldModus = parseInt(sFields.length/allJobs.length * 100);
            }

            fieldCount[fCount] = {field: field, count: sFields.length, modulus: fieldModus}
            fCount++
          }
        }

        if (B && B[1]) {

          for (let auth in B[1]) {

            if (B[1][auth].alt[0] === `{`) {

              let alt_ = JSON.parse(B[1][auth].alt);

              if (alt_.skills.length > 0) {

                allPro.set(alt_.sum, alt_.skills);
              }
            }
          }
        }

        let openMod, proMod;

        if (allPro.size === 0 || allJobs.length === 0) {

          openMod = 0;
          proMod = 0;
        } 

        else {

          openMod = parseInt(openTasks.size/allJobs.length * 100);
          proMod = parseInt(auMap.size/allPro.size * 100);
        }
          
        fieldCount.sort((a,b) => {
          return (b.count.length - a.count.length)});

        let analytics = {
            all_active_pros: auMap.size,
            all_jobs: allJobs.length,
            all_pro: allPro.size,
            //contracts: allJobs,
            field_count: fieldCount,
            open_modulus: openMod,
            pro_modulus: proMod};

        call(analytics);
      })
  }

  fieldAnalysis(field, call) {

    let conca = `select * from j;`,
      fieldPool = [],
      dayTotals = [],
      taskPool = [],
      subsPool = config.fields[field]; 

    new Sql().multi({}, conca, (A,B,C) => {

        for (let day = 0; day < 7; day++) {

          let a = new Date(new Date().setUTCHours(0) - (day * 86400000)).toUTCString().valueOf(),
            z = new Date(new Date().setUTCHours(24) - (day * 86400000)).toUTCString().valueOf(),
            A = new Date(new Date().setUTCHours(0) - (day * 86400000)).valueOf(),
            Z = new Date(new Date().setUTCHours(24) - (day * 86400000)).valueOf();

          let sFields = [], subsCount = {}; 
      
          for (let task in B) {

            let alt_ = JSON.parse(B[task].blab);

            if (field === alt_.field) {

              if (parseInt(alt_.ini_log) > A && parseInt(alt_.ini_log) < Z) {

                sFields.push(alt_.subfield)
              }
            }
          }

          for (let sub in subsPool) {

            subsCount[subsPool[sub]] = subsCount[subsPool[sub]] || 0;

            for (let sub_ in sFields) {

              if (subsPool[sub] === sFields[sub_]) {

                subsCount[subsPool[sub]] += 1;
              }
            }
          }

          dayTotals.push(sFields.length);

          fieldPool[day] = {
            day: a, 
            sub_totals: subsCount, 
            total: sFields.length,
            UTC: new Date(new Date().setUTCHours(0) - (day * 86400000)).valueOf()};

        }

        for (let task in B) {

          if (B[task].blab[0] === `{`) {

            let alt_ = JSON.parse(B[task].blab);

            if (field === alt_.field) {

              taskPool.push(alt_);
            }
          }
        }

      dayTotals.sort((a, b) => {
        return (b - a)
      });

      taskPool.sort((a, b) => {
        return (b.ini_log - a.ini_log)
      });

      call(fieldPool, {
        days_totals: dayTotals, 
        field: field, 
        task_pool: taskPool,
        contracts: this.availContracts4Field(B, field)});
    })
  }

  contractsMap () {

    this.isCookieValid(`u`, () => {

      this.modelStyler(config.lvl.css, CSS => {

        const pool = {
          title: `Contract Work & Find Proffessionals for your Work.`,
          css: CSS, 
          jSStore: JSON.stringify({
                //ava: alt.ava,
                //full: alt.full,
            //filter_valid_pool: [],
            State: `contracts`,
            gps: false,
            in: this.isValid(`u`),
            valid_filter: `field`}),
          jsState: config.cd.auJS};

        pool.appendModel = [
          model.main({
            appendModel: [
              model.MapSVGView()]
          }), model.ContractsView(), model.sellViaMapView()];

        pool.appendModel = [
          model.wrapper(pool),
          model.jS(pool), 
          model.loadDOMModalView([], `validmodal`), 
          model.loadDOMModalView([model.modalView([model.filterView()])], `filtermodal`)];

        this.app.to.writeHead(200, config.reqMime.htm);
        this.app.to.end(model.call(pool));
      });
    });
  }

  formContract () {

    this.isCookieValid(`u`, () => {

      this.modelStyler(config.lvl.css, CSS => {

        const pool = {
          title: `Set Contract form for applications.`,
          css: CSS, 
          jSStore: JSON.stringify({
                //ava: alt.ava,
                //full: alt.full,*/
            State: `mycontract`,
            gps: false,
            in: this.isValid(`u`)}),
          jsState: config.cd.auJS};

        pool.appendModel = [
          model.main({
            appendModel: [
              model.mycontractView(), model.footer()]
          })];

        pool.appendModel = [
          model.wrapper(pool),
          model.jS(pool)];

        this.app.to.writeHead(200, config.reqMime.htm);
        this.app.to.end(model.call(pool));
      });
    })
  }

  selfContracts () {

    this.isCookieValid(`u`, () => {

      this.modelStyler(config.lvl.css, CSS => {

        this.availSelfsActivity(this.isValid(`u`), (A, B, C) => {

          const pool = {
            title: `Corrde Contracts' Work & Proffessionals' Activity.`,
            css: CSS, 
            jSStore: JSON.stringify({
              ava: A.ava,
              full: A.full,
              State: `mycontracts`,
              gps: false,
              in: this.isValid(`u`)}),
            jsState: config.cd.auJS};

          pool.appendModel = [
            model.main({
              appendModel: [model.px900JobsView(B)]
            }), model.navView(`My Contracts`), model.footer()];

          pool.appendModel = [
            model.wrapper(pool),
            model.jS(pool)];

          this.app.to.writeHead(200, config.reqMime.htm);
          this.app.to.end(model.call(pool));
      
        });

      });
    });
  }

  getJobs () {

    this.isCookieValid(`u`, () => {

      this.modelStyler(config.lvl.css, CSS => {

        this.analytics(msg => {

          //let contracts = msg[`contracts`];

          this.availSelfsActivity(this.isValid(`u`), (A, B, C) => {

            const pool = {
              title: `Get Jobs fit for your Proffession and field Preferences.`,
              css: CSS, 
              jSStore: JSON.stringify({
                ava: A.ava,
                fields: C.fields,
                is_valid_dual: C.is_valid_dual,
                State: `getjobs`,
                gps: false,
                in: this.isValid(`u`)}),
              jsState: config.cd.auJS};

            pool.appendModel = [
            model.main({
              appendModel: [model.px900JobsView(C.contracts)]
              }), model.navView(`Find Work`), model.footer()];

            pool.appendModel = [
              model.wrapper(pool),
              model.jS(pool), 
              model.loadDOMModalView([model.modalView([model.filterView2()])], `filtermodal`)];

            this.app.to.writeHead(200, config.reqMime.htm);
            this.app.to.end(model.call(pool));
      
          });
        });
      });
    });
  }

  contractDetailed (task) {

    this.modelStyler(config.lvl.css, CSS => {
      
      const pool = {
        jSStore: JSON.stringify({j: task}),
        title: task.lead,
        css: CSS,
        jsState: config.cd.auJS}

      pool.appendModel = [
        model.main({
          appendModel: [model.detailedContractView(task)/*, model.footer()*/]
        }), model.top({ava: ``})];

      pool.appendModel = [model.wrapper(pool), model.jS(pool)];

      this.app.to.writeHead(200, config.reqMime.htm);
      this.app.to.end(model.call(pool));
    });
  }

  mailSliced () {

    this.isCookieValid(`u`, () => {

      this.modelStyler(config.lvl.css, CSS => {

        this.mailCluster(this.isValid(`u`), (A, B) => {

          const pool = {
          jSStore: JSON.stringify({}),
          title: `Notifications`,
          css: CSS,
          jsState: config.cd.auJS};

        pool.appendModel = [
          model.main({
            appendModel: [model.mailSlicedView(A, [0, 5]), model.footer()]
          }), model.top({ava: ``})];

        pool.appendModel = [model.wrapper(pool), model.jS(pool)];

        this.app.to.writeHead(200, config.reqMime.htm);
        this.app.to.end(model.call(pool));
        });
      });
    });
  }

  mailPeers (state, more) {

    this.isCookieValid(`u`, () => {

      this.isCookieValid(`msgpeer`, () => {

        if (state === true) {

          let peer = JSON.parse(this.isValid(`msgpeer`));

          this.mailCluster(this.isValid(`u`), (A, B) => {

            let mailPeered = [], to = [];

            for (let msg in B) {

              let mailPool = B[msg];

              if (mailPool[`ini_sum`] === more[`ini_sum`]) {

                if (mailPool[`sum_to`] === peer[0] || mailPool[`sum_src`] === peer[0]) mailPeered.push(mailPool);

                if (mailPool[`sum_to`] === peer[1]) {

                  to[`alt`] = mailPool[`alt_to`];
                  to[`ava`] = mailPool[`ava_to`];
                }

                if (mailPool[`sum_src`] === peer[1]) {

                  to[`alt`] = mailPool[`alt_src`];
                  to[`ava`] = mailPool[`ava_src`];
                }
                
              }
            }

            if (mailPeered.length > 0) {

              this.modelStyler(config.lvl.css, CSS => {

                const pool = {
                  jSStore: JSON.stringify({peer: peer[1], peer_ini_sum: more[`ini_sum`]}),
                  title: more[`lead`],
                  css: CSS,
                  jsState: config.cd.auJS};

                pool.appendModel = [
                  model.main({
                    appendModel: [model.mailPeersView(mailPeered, this.isValid(`u`))]
                  }), model.top({ava: ``}), model.peerAvaView({alt: to.alt, ava: to.ava, title: more.lead})];

                pool.appendModel = [model.wrapper(pool), model.jS(pool)];

                this.app.to.writeHead(200, config.reqMime.htm);
                this.app.to.end(model.call(pool));
        
              });
            }

            else this.rootCall();
          });
        }

        else this.rootCall();
      });
    });
  }

  mug () {

    this.isCookieValid(`u`, () => {

      this.availSelfsActivity(this.isValid(`u`), (A, B, C) => {

        this.modelStyler(config.lvl.css, CSS => {

          let preJS = {};

          preJS[`self`] = true;
          preJS[`sum`] = this.isValid(`u`);
          preJS[`mug_ejs_value`] = `Edit Profile`;

          const JS = JSON.stringify(preJS);
      
          const pool = {
            jSStore: JSON.stringify({ava: A.ava}),
            title: A[`full`],
            css: CSS,
            jsState: config.cd.auJS};

          pool.appendModel = [
            model.main({
              appendModel: [model.mugView(C, JS)]
              }), model.top({ava: ``})];
            
          pool.appendModel = [model.wrapper(pool), model.jS(pool)];
            
          this.app.to.writeHead(200, config.reqMime.htm);
          this.app.to.end(model.call(pool));
    });});});
  }

  monitor () {

    this.modelStyler(config.lvl.css, CSS => {
      
      const pool = {
        jSStore: JSON.stringify({}),
        title: `Corrde Monitor`,
        css: CSS,
        jsState: config.cd.auJS}

      this.appAnalytics(A => {

        pool.appendModel = [
          model.main({
                      appendModel: [model.monitorView(A)]
                    }), model.tp2()];
            
                  pool.appendModel = [model.wrapper(pool), model.jS(pool)];
            
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));})
    
    });
  }

  graphsRep () {

    this.modelStyler(config.lvl.css, CSS => {
      
      const pool = {
        jSStore: JSON.stringify({}),
        title: `Corrde Monitor Graphs`,
        css: CSS,
        jsState: config.cd.auJS}

      this.appAnalytics(A => {

        pool.appendModel = [
          model.main({
                      appendModel: [model.graphsRepView(A)]
                    }), model.tp2()];
            
                  pool.appendModel = [model.wrapper(pool), model.jS(pool)];
            
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));})
    
    });
  }

  toDevs () {

    this.modelStyler(config.lvl.css, CSS => {

      this.getCookie(`dev_md5`, (A, B) => {

        if (A === true) {

          const pool = {
        jSStore: JSON.stringify({}),
        title: `Corrde Administration & Management System`,
        css: CSS,
        jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.devs_js]}

      this.appAnalytics(A => {

        pool.appendModel = [
          model.main({
            appendModel: [model.toDevsView()]
                    }), model.footer()];
            
                  pool.appendModel = [model.wrapper(pool), model.jS(pool)];
            
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));})
        }

        else if (A === false) {

          let dev_md5 = B;

          this.availDev(dev_md5, A => {

            let dev = A.dev[0];

            let mail = A.alerts.sort((a, b) => {return b.mail_log - a.mail_log});

            let mail_ = A.mail_;

            let preMail = false;

            this.logDevs(A => {

              let devs = A.dev;

              let ava = ``;

              if (mail_.length > 0 && mail_[0].mail_log > A.devsKey[dev_md5].pre_mail_utc) preMail = true;

              const pool = {
                jSStore: JSON.stringify({dev_md5: dev.dev_md5, pre_devs_mail: preMail}),
                title: `Corrde Administration & Management System`,
                css: CSS,
                jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.devs_js]}

              pool.appendModel = [
                model.rootView({
                  appendModel: [
                    model.topDevsView({
                      ava: (dev.ava), 
                      mail: dev.mail}), 
                    model.controlsView(), 
                    model.rootDevsView(dev, mail, devs, mail_),model.tailControls(), 
                    model.jS(pool), 
                    model.loadDOMModalView([model.modalView([model.avaSaveModal()])], `ava-modal-ejs`), 
                    model.loadDOMModalView([model.modalView([model.passResetModal()])], `pass-reset-modal-ejs`),
                    model.loadDOMModalView([model.modalView([model.appendDevsModal()])], `append-devs-modal-ejs`)]
              })];
              
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));
            })

            
          }); 
        }
      });
    });
  }

  addDevs () {

    this.modelStyler(config.lvl.css, CSS => {
      
      const pool = {
        jSStore: JSON.stringify({}),
        title: `Corrde Administrator Creator`,
        css: CSS,
        jsState: config.reqs.devs_js}

      this.appAnalytics(A => {

        pool.appendModel = [
          model.main({
            appendModel: [model.addDevsView()]
                    }), model.footer()];
            
                  pool.appendModel = [model.wrapper(pool), model.jS(pool)];
            
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));})
    
    });
  }

  getCookie (is, call) {

    let A = true;

    let B = null;

    if (this.app.fro.headers.cookie) {

      let cJar = cookie.parse(this.app.fro.headers.cookie);

      if (!cJar[is]) A = true;

      else {

        A = false;

        B = cJar[is];
      }

    } 

    else A = true;

    call(A, B);
  }

  readDevsMail (msg, Obj) {

    this.modelStyler(config.lvl.css, CSS => {

      this.getCookie(`dev_md5`, (A, B) => {

        if (A === true) this.toDevs();

        else if (A === false) {

          let dev_md5 = B;

          this.availDev(dev_md5, A => {

            let dev = A.dev[0];

            let mail = A.alerts;

            this.logDevs(A => {

              let devs = A.dev;

              let ava = ``;

              msg[`dev_md5`] = dev_md5;

              const pool = {
                jSStore: JSON.stringify({dev_md5: dev.dev_md5}),
                title: `Mail - ${msg.alt_src} > ${msg.title}`,
                css: CSS,
                jsState: config.reqs.devs_js}

              pool.appendModel = [
                model.rootView({
                  appendModel: [
                    model.topDevsView({
                      ava: ((dev.ava === false) ? ava = ava: ava = dev.ava), 
                      mail: dev.mail}), 
                    model.controlsView(), 
                    model.readDevsMail(msg, Obj),model.tailControls(), 
                    model.jS(pool)]
              })];
              
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));
            })

            
          }); 
        }
      });
    });
  }

  support () {

    this.modelStyler(config.lvl.css, CSS => {

      const pool = {
        jSStore: JSON.stringify({}),
        title: `Corrde Support`,
                css: CSS,
                jsState: config.reqs.devs_js}

              pool.appendModel = [
                model.rootView({
                  appendModel: [
                    model.topSupport(), model.support(), 
                    model.jS(pool),
                    model.loadDOMModalView([model.modalView([model.supportMsgModal()])], `support-msg-modal-ejs`)]
              })];
              
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));
            })
  }

  tour () {

    this.modelStyler(config.lvl.css, CSS => {

      this.Stores(Stores => {

        this.logs_u_md5(A => {

          const pool = {
            jSStore: JSON.stringify({}),
            title: `Take A Tour`,
            css: CSS,
            jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.app_js]}

              pool.appendModel = [
                model.rootView({
                  appendModel: [model.appRoot(A, Stores), model.topAppRoot(A.md5Key, false), 
                    model.loadDOMModalView([model.modalView([model.Coupon()])], `Coupon`), model.jS(pool), model.footer()]
              })];
              
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));
            })
      })


      })
  }

  feed () {

    this.modelStyler(config.lvl.css, CSS => {

      this.getCookie(`u`, (A, B) => {

        if (A === true) this.tour();
        
        else if (A === false) {

          this.Stores(A => {

            let Stores = A;

            this.logs_u_md5(A => {

              const pool = {
                jSStore: JSON.stringify({u_md5: B, pre_msg: A.md5Key[B].pre_devs_msg.length}),
                title: `The Vendor Hub.`,
                css: CSS,
                jsState: [`/gp/js/topojson.v1.min.js`, config.reqs._js]}

              pool.appendModel = [
                model.rootView({
                  appendModel: [
                    model.feed(A, A.md5Key[B], Stores), 
                    model.feedTop(A.md5Key[B]), model.tailFeedControls(), 
                    model.jS(pool), 
                    model.loadDOMModalView([model.modalView([model.avaSaveModal()])], `ava-modal-ejs`)]
              })];
              
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));
            })


          })
        }
      })
      })
  }

  createStory () {

    this.modelStyler(config.lvl.css, CSS => {

      this.getCookie(`u`, (A, B) => {

        if (A === true) this.tour();
        
        else if (A === false) {

          this.logs_u_md5(A => {

            const pool = {
              jSStore: JSON.stringify({u_md5: B}),
              title: `Create Your Portfolio Stories`,
              css: CSS,
              jsState: [config.reqs._js]}

              pool.appendModel = [
                model.rootView({
                  appendModel: [
                    model.createStory(A, A.md5Key[B]), 
                    model.pfolioTop(A.md5Key[B]), model.tailFeedControls(), 
                    model.jS(pool)]
              })];
              
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));
            })
        }
      })
      })
  }

  readStory (polyg, u_md5) {

    this.modelStyler(config.lvl.css, CSS => {

      const pool = {
        jSStore: JSON.stringify({
          pfolio_log_md5: polyg.log_md5}),
        title: `${polyg.text}`,
        css: CSS,
        jsState: [config.reqs._js]}

      this.getCookie(`u`, (A, B) => {

        let clientJSON = JSON.parse(pool.jSStore); 

        if (A === false) {

          clientJSON[`u_md5`] = B;

          clientJSON[`mail2`] = false;

          if (polyg.mail2.indexOf(B) !== -1) clientJSON[`mail2`] = true;
        }

        pool.jSStore = JSON.stringify(clientJSON); 

        pool.appendModel = [
          model.rootView({
                  appendModel: [
                    model.readStory(polyg, u_md5), model.tailFeedControls(), 
                    model.jS(pool)]
              })];
              
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));
      });
    });
  }

  seek (polyg, u_md5) {

    this.modelStyler(config.lvl.css, CSS => {

      const Stack = {
        jSStore: JSON.stringify({}),
        title: `Find Vendors, Shippers and Track Deliveries`,
        css: CSS,
        jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.geo_reqs]}

      this.getCookie(`u`, (A, B) => {

        let clientJSON = JSON.parse(Stack.jSStore); 

        if (A === false) clientJSON[`u_md5`] = B;

        this.Stores(Stores => {

          let StoresStack = [];

          Stores.Stores.forEach(Store => {

            Store.vServiceAddress.forEach(Points => {

              Points.points.forEach(Point => {

                StoresStack.push({
                  point: Point,
                  service: Store.vServiceClass,
                  store: Store.vServiceSet,
                  store_md5: Store.log_md5
                })
              })
            })
          });

          clientJSON[`Stores`] = StoresStack;

          Stack.jSStore = JSON.stringify(clientJSON);

          Stack.appendModel = [
            model.rootView({
              appendModel: [
                model.seek(), model.tailFeedControls(), 
                model.jS(Stack)]
              })];
              
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(Stack));
      });
      });
    });
  }

  readMug (u_md5, key) {

    this.modelStyler(config.lvl.css, CSS => {

      const pool = {
        jSStore: JSON.stringify({mug_u_md5: u_md5.sum}),
        title: `${u_md5.full}`,
        css: CSS,
        jsState: [`/gp/js/topojson.v1.min.js`, config.reqs._js, config.reqs.mug_js]}

      this.getCookie(`u`, (A, B) => {

        let clientJSON = JSON.parse(pool.jSStore);

        if (u_md5.pos.length > 0) clientJSON[`last_PJ`] = JSON.parse(u_md5[`pos`][u_md5[`pos`].length - 1]);

        let mug = false;

        if (A === false) {

          clientJSON[`u_md5`] = B;

          mug = B;
        }

        pool.jSStore = JSON.stringify(clientJSON); 

        pool.appendModel = [
          model.rootView({
                  appendModel: [
                    model.readMug(u_md5, mug, key), model.readMugTop(), model.tailFeedControls(), 
                    model.jS(pool), 
                    model.loadDOMModalView([model.modalView([model.avaSaveModal()])], `ava-modal-ejs`), 
                    model.loadDOMModalView([model.modalView([model.vService()])], `vService`), 
                    model.loadDOMModalView([model.modalView([model.vServiceSet()])], `vServiceSet`)]
              })];
              
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));
      });
    });
  }

  selfMug () {

    this.modelStyler(config.lvl.css, CSS => {

      this.getCookie(`u`, (A, B) => {

        if (A === true) this.tour();
        
        else if (A === false) {

          this.logs_u_md5(A => {

            this.readMug(A.md5Key[B], A.md5Key)
          })}})});
  }

  contract () {

    this.modelStyler(config.lvl.css, CSS => {

      this.getCookie(`u`, (A, B) => {

        if (A === true) this.tour();
        
        else if (A === false) {

          this.logs_u_md5(A => {

            const pool = {
              jSStore: JSON.stringify({u_md5: B}),
              title: `Create a Job Contract`,
              css: CSS,
              jsState: [config.reqs.contract_js]}

              pool.appendModel = [
                model.rootView({
                  appendModel: [
                    model.createJob(A, A.md5Key[B]), model.tailFeedControls(), 
                    model.jS(pool)]
              })];
              
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));
            })
        }
      })
      })

  }

  readJob (J, Obj) {

    this.modelStyler(config.lvl.css, CSS => {

      const pool = {
        jSStore: JSON.stringify({j_md5: J.log_md5, j_u_md5: J.u_md5}),
        title: `${J.title}`,
        css: CSS,
        jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.J_js]}

      this.getCookie(`u`, (A, B) => {

        let clientJSON = JSON.parse(pool.jSStore);

        let mug = false;

        if (A === false) {

          clientJSON[`u_md5`] = B;

          mug = B;
        }

        pool.jSStore = JSON.stringify(clientJSON); 

        pool.appendModel = [
          model.rootView({
            appendModel: [
              model.readJob(J, mug, Obj), model.readJobTop(J), model.tailFeedControls(), 
              model.jS(pool)]
        })];
              
        this.app.to.writeHead(200, config.reqMime.htm);
        this.app.to.end(model.call(pool));
      });
    });
  }

  Jobs () {

    this.modelStyler(config.lvl.css, CSS => {

      const pool = {
        jSStore: JSON.stringify({}),
        title: `Find Jobs`,
        css: CSS,
        jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.J_js]}

      this.getCookie(`u`, (A, B) => {

        let clientJSON = JSON.parse(pool.jSStore);

        let mug = false;

        if (A === false) {

          clientJSON[`u_md5`] = B;

          mug = B;
        }

        pool.jSStore = JSON.stringify(clientJSON);

        this.logs_u_md5(A => { 

          pool.appendModel = [
            model.rootView({
              appendModel: [
              model.Jobs(A), model.tailFeedControls(), 
              model.jS(pool)]
          })];
              
          this.app.to.writeHead(200, config.reqMime.htm);
          this.app.to.end(model.call(pool));
      });});});
  }

  JobMap (J, Obj) {

    this.modelStyler(config.lvl.css, CSS => {

      const pool = {
        jSStore: JSON.stringify({j_obj: J}),
        title: J.title,
        css: CSS,
        jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.job_geo_js]}

      this.getCookie(`u`, (A, B) => {

        let clientJSON = JSON.parse(pool.jSStore);

        let mug = false;

        if (A === false) {

          clientJSON[`u_md5`] = B;

          mug = B;
        }

        pool.jSStore = JSON.stringify(clientJSON);

          pool.appendModel = [
            model.rootView({
              appendModel: [
              model.jobMap(), model.tailFeedControls(), 
              model.jS(pool)]
          })];
              
          this.app.to.writeHead(200, config.reqMime.htm);
          this.app.to.end(model.call(pool));});});
  }

  analyticsRoot () {

    this.modelStyler(config.lvl.css, CSS => {

      this.getCookie(`dev_md5`, (A, B) => {

        if (A === true) {

          const pool = {
            jSStore: JSON.stringify({}),
            title: `Corrde Administration & Management System`,
            css: CSS,
            jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.devs_js]}

          this.appAnalytics(A => {

            pool.appendModel = [
              model.main({
                appendModel: [model.toDevsView()]
                    }), model.footer()];
            
                  pool.appendModel = [model.wrapper(pool), model.jS(pool)];
            
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));})
        }

        else if (A === false) {

          let dev_md5 = B;

          this.availDev(dev_md5, A => {

            let dev = A.dev[0];

            let mail = A.alerts.sort((a, b) => {return b.mail_log - a.mail_log});

            let mail_ = A.mail_;

            let preMail = false;

            this.logDevs(A => {

              let devs = A.dev;

              let ava = ``;

              if (mail_.length > 0 && mail_[0].mail_log > A.devsKey[dev_md5].pre_mail_utc) preMail = true;

              new Sql().multi({}, `select * from traffic`, (A,B,C) => {

                const pool = {
                  jSStore: JSON.stringify({dev_md5: dev.dev_md5, pre_devs_mail: preMail}),
                  title: `Corrde Activity Analytics`,
                  css: CSS,
                  jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.devs_geo_js]}

                pool.appendModel = [
                  model.rootView({
                    appendModel: [
                      model.topDevsView({
                        ava: (dev.ava), 
                        mail: dev.mail}), 
                      model.controlsView(), 
                      model.analyticsRoot(dev, mail, devs, mail_),model.tailControls(), 
                      model.jS(pool)]
                  })];
              
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));});
            })

            
          }); 
        }
      });
    });
  }

  appRoot () {

    this.modelStyler(config.lvl.css, CSS => {

      const pool = {
        jSStore: JSON.stringify({}),
        title: `The Vendor Hub ™`,
        css: CSS,
        jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.app_js]}

      this.getCookie(`u`, (A, B) => {

        let clientJSON = JSON.parse(pool.jSStore);

        let mug = false;

        if (A === false) {

          clientJSON[`u_md5`] = B;

          mug = B;
        }

        this.Stores(A => {

          let Stores = A;

        this.logs_u_md5(A => {

          pool.jSStore = JSON.stringify(clientJSON); 
                
          pool.appendModel = [
            model.rootView({
              appendModel: [model.appRoot(A, Stores), model.topAppRoot(A.md5Key, mug), 
                    model.loadDOMModalView([model.modalView([model.Coupon()])], `Coupon`), model.jS(pool), model.footer()]
            })];
                              
          this.app.to.writeHead(200, config.reqMime.htm);
          this.app.to.end(model.call(pool));})
        })
      });
    })
  }

  login () {

    this.modelStyler(config.lvl.css, CSS => {

      const pool = {
        jSStore: JSON.stringify({}),
        title: `Welcome back to Corrde`,
        css: CSS,
        jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.login_js]}

        pool.appendModel = [
          model.main({
            appendModel: [model.login()]
                    }), model.footer()];
            
                  pool.appendModel = [model.wrapper(pool), model.jS(pool)];
            
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));
    });
  }

  signup () {

    this.modelStyler(config.lvl.css, CSS => {
      
      const pool = {
        jSStore: JSON.stringify({}),
        title: `Sign up for an Account`,
        css: CSS,
        jsState: config.reqs.signup_js}

        pool.appendModel = [
          model.main({
            appendModel: [model.signup()]
                    }), model.footer()];
            
                  pool.appendModel = [model.wrapper(pool), model.jS(pool)];
            
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));
    
    });
  }

  selfMail () {

    this.modelStyler(config.lvl.css, CSS => {

      this.getCookie(`u`, (A, B) => {

        if (A === true) this.tour();
        
        else if (A === false) {

          this.getDevsMail(A => {

            let dev = A[2][0];

            this.logs_u_md5(A => {

              const pool = {
                jSStore: JSON.stringify({u_md5: B, pre_msg: A.md5Key[B].pre_devs_msg.length}),
                title: `Mail & Notifications`,
                css: CSS,
                jsState: [config.reqs.mail_js]}

                pool.appendModel = [
                  model.rootView({
                    appendModel: [
                      model.selfMail(dev, B), model.topMail(A.md5Key[B]), model.tailFeedControls(), 
                      model.jS(pool)]
                  })];
              
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));
            })
          })
        }
      })
      })

  }

  devsMail () {

    this.modelStyler(config.lvl.css, CSS => {

      this.getCookie(`dev_md5`, (A, B) => {

        if (A === true) {

          const pool = {
            jSStore: JSON.stringify({}),
            title: `Corrde Administration & Management System`,
            css: CSS,
            jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.mail_devs_js]}

          this.appAnalytics(A => {

            pool.appendModel = [
              model.main({
                appendModel: [model.toDevsView()]
                    }), model.footer()];
            
                  pool.appendModel = [model.wrapper(pool), model.jS(pool)];
            
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));})
        }

        else if (A === false) {

          let dev_md5 = B;

          this.availDev(dev_md5, A => {

            let dev = A.dev[0];

            let mail = A.alerts.sort((a, b) => {return b.mail_log - a.mail_log});

            let mail_ = A.mail_;

            let preMail = false;

            this.logDevs(A => {

              let devs = A.dev;

              let ava = ``;

              if (mail_.length > 0 && mail_[0].mail_log > A.devsKey[dev_md5].pre_mail_utc) preMail = true;

              this.logs_u_md5( A => {

                let u_md5 = A;

              this.getDevsMail(A => {

                const pool = {
                  jSStore: JSON.stringify({dev_md5: dev.dev_md5, pre_devs_mail: preMail}),
                  title: `Corrde System Mail`,
                  css: CSS,
                  jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.mail_devs_js]}

                pool.appendModel = [
                  model.rootView({
                    appendModel: [
                      model.topDevsView({
                        ava: (dev.ava), 
                        mail: dev.mail}), 
                      model.controlsView(), 
                      model.devsMail(A, u_md5[`md5Key`]),model.tailControls(), 
                      model.jS(pool)]
                  })];
              
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));});
            })

            })
          }); 
        }
      });
    });
  }

  retailStore (Stores, Retail) {

    this.modelStyler(config.lvl.css, CSS => {

      const pool = {
        jSStore: JSON.stringify({
          store_log_md5: Retail.log_md5,
          store_md5: Retail.log_md5,
          store_u_md5: Retail.u_md5}),
          title: Retail.vServiceSet,
          css: CSS,
          jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.store_js]}

      this.getCookie(`u`, (A, B) => {

        let clientJSON = JSON.parse(pool.jSStore);

        let mug = false;

        if (A === false) {

          clientJSON[`u_md5`] = B;

          mug = B;
        }

        this.Stores(A => {

          pool.jSStore = JSON.stringify(clientJSON); 
                
          pool.appendModel = [
            model.rootView({
              appendModel: [
                model.retailStore(A, A.StoresMap[Retail.log_md5], mug), 
                model.retailStoreHead(Retail, mug), 
                model.tailFeedControls(), 
                model.loadDOMModalView([model.modalView([model.setStockSet()])], `ModelSets`), 
                model.loadDOMModalView([model.modalView([model.StoreAssetSet()])], `ModelStockFile`), 
                model.jS(pool)]
            })];
                              
          this.app.to.writeHead(200, config.reqMime.htm);
          this.app.to.end(model.call(pool));})
      });
    })
  }

  StoreAddressSet (Store) {

    this.modelStyler(config.lvl.css, CSS => {

      this.getCookie(`u`, (A, B) => {

        if (A === true) this.tour();
        
        else if (A === false) {

          if (B !== Store.u_md5) this.tour();

          else {

            const Stack = {
              jSStore: JSON.stringify({
                store_log_md5: Store.log_md5,
                store_md5: Store.log_md5,}),
              title: `Set Store Address & Location`,
              css: CSS,
              jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.set_store_map_js]};

            Stack.appendModel = [
              model.rootView({
                appendModel: [
                  model.StoreAddressSetHead(), 
                  model.StoreAddressSet(),
                  model.tailFeedControls(), 
                  model.jS(Stack),
                  model.loadDOMModalView([model.modalView([model.seekModal()])], `seek-modal-ejs`)]
              })];
              
            this.app.to.writeHead(200, config.reqMime.htm);
            this.app.to.end(model.call(Stack));
          }
        }})});
  }

  StoreStock (Stock, Stores) {

    this.modelStyler(config.lvl.css, CSS => {

      const pool = {
        jSStore: JSON.stringify({
          stock_alt: Stock.asset_alt,
          stock_img: Stock.asset[0].path,
          stock_md5: Stock.asset_md5,
          stock_USD: Stock.asset_USD,
          store_md5: Stock.store_md5,
          store_u_md5: Stock.u_md5}),
          title: Stock.asset_alt,
          css: CSS,
          jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.stock_js]}

      this.getCookie(`u`, (A, B) => {

        let clientJSON = JSON.parse(pool.jSStore);

        let mug = false;

        if (A === false) {

          clientJSON[`u_md5`] = B;

          mug = B;
        }

        //this.Stores(A => {

          pool.jSStore = JSON.stringify(clientJSON); 
                
          pool.appendModel = [
            model.rootView({
              appendModel: [
                model.StoreStock(Stock, mug, Stores), 
                model.StoreStockHead(Stock, mug), 
                model.tailFeedControls(), 
                model.loadDOMModalView([model.modalView([model.StoreAssetSet()])], `StoreAsset`), 
                model.jS(pool)]
            })];
                              
          this.app.to.writeHead(200, config.reqMime.htm);
          this.app.to.end(model.call(pool));//})
      });
    })
  }

  StockPay () {

    this.modelStyler(config.lvl.css, CSS => {

      this.getCookie(`u`, (A, B) => {

        if (A === true) this.tour();
        
        else if (A === false) {

          //if (B !== Store.u_md5) this.appRoot();

          //else {

            const Stack = {
              jSStore: JSON.stringify({u_md5: B}),
              title: `Pay For Goods`,
              css: CSS,
              jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.pay_js]};

            Stack.appendModel = [
              model.rootView({
                appendModel: [
                  model.StockPayHead(), 
                  model.StockPay(),
                  model.tailFeedControls(), 
                  model.jS(Stack)]
              })];//`Authorization`, `Bearer FLWSECK-9da614832e3764fcdfa1eb9914f09d88-X`
              
            this.app.to.setHeader("Access-Control-Allow-Origin", `*`);
            this.app.to.writeHead(200, config.reqMime.htm);
            this.app.to.end(model.call(Stack));
          //}
        }})});
  }

  StoreBillings (Store) {

    this.modelStyler(config.lvl.css, CSS => {

      this.getCookie(`u`, (A, B) => {

        if (A === true) this.tour();
        
        else if (A === false) {

          if (B !== Store.u_md5) this.tour();

          else {

            const Stack = {
              jSStore: JSON.stringify({
                store_log_md5: Store.log_md5,
                store_md5: Store.log_md5,}),
                title: `Store Billings & Payments`,
                css: CSS,
                jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.store_billings_js]};

            Stack.appendModel = [
              model.rootView({
                appendModel: [
                  model.StoreBillingsHead(), 
                  model.StoreBillings(Store),
                  model.tailFeedControls(), 
                  model.jS(Stack)]
              })];
              
            this.app.to.writeHead(200, config.reqMime.htm);
            this.app.to.end(model.call(Stack));
          }
        }})});
  }

  StockSet (StockSet, Stores) { 

    this.modelStyler(config.lvl.css, CSS => {

      const Pool = {
        jSStore: JSON.stringify({}),
        title: `${StockSet.toUpperCase()}`,
        css: CSS,
        jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.stockset_js]}

      this.getCookie(`u`, (A, B) => {

        let clientJSON = JSON.parse(Pool.jSStore);

        let mug = false;

        if (A === false) {

          clientJSON[`u_md5`] = B;

          mug = B;
        }

        Pool.jSStore = JSON.stringify(clientJSON); 
                
        Pool.appendModel = [
          model.rootView({
            appendModel: [model.ModelStockSet(Stores, StockSet, Stores.Stock), model.ModelStockSetTop(), model.ModelStoreControls(), model.jS(Pool)]
          })];
                              
          this.app.to.writeHead(200, config.reqMime.htm);
          this.app.to.end(model.call(Pool));
        })
      });
  }

  toolSuite (Stores) {

    this.modelStyler(config.lvl.css, CSS => {

      this.getCookie(`dev_md5`, (A, B) => {

        if (A === true) {

          const Stack = {
            jSStore: JSON.stringify({}),
            title: `Corrde Administration & Management System`,
            css: CSS,
            jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.devs_js]}

          this.appAnalytics(A => {

            Stack.appendModel = [
              model.main({
                appendModel: [model.toDevsView()]
                    }), model.footer()];
            
                  Stack.appendModel = [model.wrapper(Stack), model.jS(Stack)];
            
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(Stack));})
        }

        else if (A === false) {

          let dev_md5 = B;

          this.availDev(dev_md5, A => {

            let dev = A.dev[0];

            let mail = A.alerts.sort((a, b) => {return b.mail_log - a.mail_log});

            let mail_ = A.mail_;

            let preMail = false;

            this.logDevs(A => {

              let devs = A.dev;

              let ava = ``;

              if (mail_.length > 0 && mail_[0].mail_log > A.devsKey[dev_md5].pre_mail_utc) preMail = true;

              new Sql().multi({}, `select * from traffic`, (A,B,C) => {

                const Stack = {
                  jSStore: JSON.stringify({dev_md5: dev.dev_md5, pre_devs_mail: preMail}),
                  title: `Tool Suite`,
                  css: CSS,
                  jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.toolkit_devs]}

                Stack.appendModel = [
                  model.rootView({
                    appendModel: [
                      model.topDevsView({
                        ava: (dev.ava), 
                        mail: dev.mail}), 
                      model.controlsView(), 
                      model.toolSuite(Stores), model.tailControls(), 
                      model.loadDOMModalView([model.modalView([model.ModelSalesModal()])], `ModelSales`), 
                      model.loadDOMModalView([model.modalView([model.ModelStockSuite()])], `ModelStockSuite`),   
                      model.jS(Stack)]
                  })];
              
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(Stack));});
            })

            
          }); 
        }
      });
    });
  }

  flashSale (Stores) { 

    this.modelStyler(config.lvl.css, CSS => {

      const Pool = {
        jSStore: JSON.stringify({}),
        title: `Corrde Store | Flash Sales`,
        css: CSS,
        jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.flashsale_js]}

      this.getCookie(`u`, (A, B) => {

        let clientJSON = JSON.parse(Pool.jSStore);

        let mug = false;

        if (A === false) {

          clientJSON[`u_md5`] = B;

          mug = B;
        }

        Pool.jSStore = JSON.stringify(clientJSON); 
                
        Pool.appendModel = [
          model.rootView({
            appendModel: [model.ModelFlashSale(Stores), model.ModelSalesAlpha(), model.ModelStoreControls(), model.jS(Pool)]
          })];
                              
          this.app.to.writeHead(200, config.reqMime.htm);
          this.app.to.end(model.call(Pool));
        })
      });
  }

  /**
  @corrde.beta.0.0.2
  **/


  Root () {

    this.modelStyler(config.lvl.css, CSS => {

      this.getCookie(`u`, (A, B) => {

        let mug = false;

        if (A === false) mug = B;

        this.getCookie(`locale`, (A, B) => {

          let locale = `kenya`;

          if (A === false) locale = B;

          this.Sell(A => {

            let Sell = A;

            this.logs_u_md5(A => {

              const Stack = {
                title: `Corrde Store | Enjoy Affordable Prices & Regular Sales`,
                css: CSS,
                jsState: [`/gp/js/topojson.v1.min.js`, config.reqs.root_js],
                jSStore: JSON.stringify({
                  Model: [
                    model.ModelZone(locale, Sell),
                    model.ModelRootAlpha(A.md5Key, mug),
                    model.loadDOMModalView([model.modalView([model.ModalZones()])], `ModelZones`),
                    model.loadDOMModalView([model.modalView([model.ModalMyCart()])], `ModalMyCart`),
                    model.loadDOMModalView([model.modalView([model.ModalSets()])], `ModalSets`),
                    model.loadDOMModalView([model.modalView([model.ModalRegions(locale)])], `ModalRegions`),
                    model.loadDOMModalView([model.modalView([model.ModalCreateStore()])], `ModalCreateStore`),   
                    model.footer()],
                  mug: mug,
                  regionMeta: RetailMaps[locale]
                })
              };
                
              Stack.appendModel = [
                model.rootView({
                  appendModel: [
                    model.ModelWait(),
                    model.loadDOMModalView([model.modalView([model.ModalZones()])], `ModelZones`),
                    model.jS(Stack)]
                })];
                              
              this.app.to.writeHead(200, config.reqMime.htm);
              this.app.to.end(model.call(Stack));
            })
          });

        });
      });
    })
  }

  RetailStock (Routes) {

    this.modelStyler(config.lvl.css, CSS => {

      const Stack = {
        jSStore: JSON.stringify({route: Routes}),
        title: `Corrde Store | Enjoy Affordable Prices & Regular Sales`,
        css: CSS,
        jsState: [config.reqs.retail_item_js]}

      this.getCookie(`u`, (A, B) => {

        let clientJSON = JSON.parse(Stack.jSStore);

        let mug = false;

        if (A === false) {

          clientJSON[`u_md5`] = B;

          mug = B;
        }

        clientJSON[`mug`] = mug;

          Stack.jSStore = JSON.stringify(clientJSON); 
                
          Stack.appendModel = [
            model.rootView({
              appendModel: [
                model.ModelWait(),
                model.loadDOMModalView([model.modalView([model.ModalZones()])], `ModelZones`),
                model.jS(Stack)]
            })];
                              
          this.app.to.writeHead(200, config.reqMime.htm);
          this.app.to.end(model.call(Stack));})
    })
  }

  RetailSets (Shelf) {

    this.modelStyler(config.lvl.css, CSS => {

      const Stack = {
        jSStore: JSON.stringify({retailSet: Shelf}),
        title: `Corrde Store | ${Shelf}`,
        css: CSS,
        jsState: [config.reqs.retail_catalog_js]}

      this.getCookie(`u`, (A, B) => {

        let clientJSON = JSON.parse(Stack.jSStore);

        let mug = false;

        if (A === false) {

          clientJSON[`u_md5`] = B;

          mug = B;
        }

        clientJSON[`mug`] = mug;

          Stack.jSStore = JSON.stringify(clientJSON); 
                
          Stack.appendModel = [
            model.rootView({
              appendModel: [
                model.ModelWait(),
                model.loadDOMModalView([model.modalView([model.ModalZones()])], `ModelZones`),
                model.jS(Stack)]
            })];
                              
          this.app.to.writeHead(200, config.reqMime.htm);
          this.app.to.end(model.call(Stack));})
    })
  }

  ComputePay () {

    this.modelStyler(config.lvl.css, CSS => {

      const Stack = {
        jSStore: JSON.stringify({}),
        title: `Corrde Store | Cart Processing & Checkout`,
        css: CSS,
        jsState: [config.reqs.retail_process_pay_js]}

      this.getCookie(`u`, (A, B) => {

        let clientJSON = JSON.parse(Stack.jSStore);

        let mug = false;

        if (A === false) {

          clientJSON[`u_md5`] = B;

          mug = B;
        }

        clientJSON[`mug`] = mug;

          Stack.jSStore = JSON.stringify(clientJSON); 
                
          Stack.appendModel = [
            model.rootView({
              appendModel: [
                model.ModelWait(),
                model.loadDOMModalView([model.modalView([model.ModalZones()])], `ModelZones`),
                model.jS(Stack)]
            })];
                              
          this.app.to.writeHead(200, config.reqMime.htm);
          this.app.to.end(model.call(Stack));})
    })
  }

  PullPay (pay) {

    this.modelStyler(config.lvl.css, CSS => {

      const Stack = {
        jSStore: JSON.stringify({pullPay: pay}),
        title: `Corrde Store | My Orders`,
        css: CSS,
        jsState: [config.reqs.retail_pull_pay_js]}

      this.getCookie(`u`, (A, B) => {

        let clientJSON = JSON.parse(Stack.jSStore);

        let mug = false;

        if (A === false) {

          clientJSON[`u_md5`] = B;

          mug = B;
        }

        clientJSON[`mug`] = mug;

          Stack.jSStore = JSON.stringify(clientJSON); 
                
          Stack.appendModel = [
            model.rootView({
              appendModel: [
                model.ModelWait(),
                model.loadDOMModalView([model.modalView([model.ModalZones()])], `ModelZones`),
                model.jS(Stack)]
            })];
                              
          this.app.to.writeHead(200, config.reqMime.htm);
          this.app.to.end(model.call(Stack));})
    })
  }

  PullPays () {

    this.modelStyler(config.lvl.css, CSS => {

      const Stack = {
        jSStore: JSON.stringify({}),
        title: `Corrde Store | Pay Orders & Invoices`,
        css: CSS,
        jsState: [config.reqs.retail_pull_pays_js]}

      this.getCookie(`u`, (A, B) => {

        let clientJSON = JSON.parse(Stack.jSStore);

        let mug = false;

        if (A === false) {

          clientJSON[`u_md5`] = B;

          mug = B;
        }

        clientJSON[`mug`] = mug;

          Stack.jSStore = JSON.stringify(clientJSON); 
                
          Stack.appendModel = [
            model.rootView({
              appendModel: [
                model.ModelWait(),
                model.loadDOMModalView([model.modalView([model.ModalZones()])], `ModelZones`),
                model.jS(Stack)]
            })];
                              
          this.app.to.writeHead(200, config.reqMime.htm);
          this.app.to.end(model.call(Stack));})
    })
  }

  ControlStore (Arg) {

    this.modelStyler(config.lvl.css, CSS => {

      const Stack = {
        jSStore: JSON.stringify({levels: [Arg]}),
        title: `Corrde Store`,
        css: CSS,
        jsState: [config.reqs.control_store_js]}

      this.getCookie(`u`, (A, B) => {

        let clientJSON = JSON.parse(Stack.jSStore);

        let mug = false;

        if (A === false) {

          clientJSON[`u_md5`] = B;

          mug = B;
        }

        clientJSON[`mug`] = mug;

          Stack.jSStore = JSON.stringify(clientJSON); 
                
          Stack.appendModel = [
            model.rootView({
              appendModel: [
                model.ModelWait(),
                model.loadDOMModalView([model.modalView([model.ModalZones()])], `ModelZones`),
                model.jS(Stack)]
            })];
                              
          this.app.to.writeHead(200, config.reqMime.htm);
          this.app.to.end(model.call(Stack));})
    })
  }

  PullStores () {

    this.modelStyler(config.lvl.css, CSS => {

      const Stack = {
        jSStore: JSON.stringify({}),
        title: `Corrde Vendors & Marketplace`,
        css: CSS,
        jsState: [config.reqs.pull_stores_js]}

      this.getCookie(`u`, (A, B) => {

        let clientJSON = JSON.parse(Stack.jSStore);

        let mug = false;

        if (A === false) {

          clientJSON[`u_md5`] = B;

          mug = B;
        }

        clientJSON[`mug`] = mug;

          Stack.jSStore = JSON.stringify(clientJSON); 
                
          Stack.appendModel = [
            model.rootView({
              appendModel: [
                model.ModelWait(),
                model.loadDOMModalView([model.modalView([model.ModalZones()])], `ModelZones`),
                model.jS(Stack)]
            })];
                              
          this.app.to.writeHead(200, config.reqMime.htm);
          this.app.to.end(model.call(Stack));})
    })
  }

  PullStall (Arg) {

    this.modelStyler(config.lvl.css, CSS => {

      const Stack = {
        jSStore: JSON.stringify({pullStall: Arg}),
        title: `Corrde Vendors & Marketplace`,
        css: CSS,
        jsState: [config.reqs.pull_stall_js]}

      this.getCookie(`u`, (A, B) => {

        let clientJSON = JSON.parse(Stack.jSStore);

        let mug = false;

        if (A === false) {

          clientJSON[`u_md5`] = B;

          mug = B;
        }

        clientJSON[`mug`] = mug;

          Stack.jSStore = JSON.stringify(clientJSON); 
                
          Stack.appendModel = [
            model.rootView({
              appendModel: [
                model.ModelWait(),
                model.loadDOMModalView([model.modalView([model.ModalZones()])], `ModelZones`),
                model.jS(Stack)]
            })];
                              
          this.app.to.writeHead(200, config.reqMime.htm);
          this.app.to.end(model.call(Stack));})
    })
  }

  devsControls (Arg) {

    this.modelStyler(config.lvl.css, CSS => {

      const Stack = {
        jSStore: JSON.stringify({pullStall: Arg}),
        title: `Corrde | Administration & Development Dashboard`,
        css: CSS,
        jsState: [config.reqs.devs_root_js]}

      this.getCookie(`dev_md5`, (A, B) => {

        let clientJSON = JSON.parse(Stack.jSStore);

        let mug = false;

        if (A === false) mug = B;

        clientJSON[`developer`] = mug;

          Stack.jSStore = JSON.stringify(clientJSON); 
                
          Stack.appendModel = [
            model.rootView({
              appendModel: [
                model.ModelWait(),
                model.jS(Stack)]
            })];
                              
          this.app.to.writeHead(200, config.reqMime.htm);
          this.app.to.end(model.call(Stack));})
    })
  }
}

class ViaAJX extends Auxll {

  constructor (q, req, res) {
    super();
    this.q = q;
    this.app = {fro: req, to: res};
  }

  AJXCalls () {

    if (this.q.field2skill) this.fieldtoSkill(JSON.parse(this.q.field2skill));

    if (this.q.isContract) this.isContract(JSON.parse(this.q.isContract));

    if (this.q.isMatrixAvailable) this.isMatrixAvailable(JSON.parse(this.q.isMatrixAvailable));

    if (this.q.saveContract) this.saveContract(JSON.parse(this.q.saveContract));

    if (this.q.urlCall) this.urlCall(JSON.parse(this.q.urlCall));

    if (this.q.iniSale) this.iniSale(JSON.parse(this.q.iniSale)); //iniSale

    if (this.q.fieldSale) this.fieldSale(JSON.parse(this.q.fieldSale));

    if (this.q.subSale) this.subSale(JSON.parse(this.q.subSale));

    if (this.q.sale) this.sale(JSON.parse(this.q.sale));

    if (this.q.stats) this.stats(JSON.parse(this.q.stats));

    if (this.q.bidSale) this.bidSale(JSON.parse(this.q.bidSale));

    if (this.q.toPool) this.toPool(JSON.parse(this.q.toPool));

    if (this.q.talkto) this.talkto(JSON.parse(this.q.talkto));

    if (this.q.talk) this.talk(JSON.parse(this.q.talk));

    if (this.q.isMail) this.isMail(JSON.parse(this.q.isMail));

    if (this.q.issue) this.issue(JSON.parse(this.q.issue));

    if (this.q.issueMail) this.issueMail(JSON.parse(this.q.issueMail));

    if (this.q.issueTalk) this.issueTalk(JSON.parse(this.q.issueTalk));

    if (this.q.isissue) this.isissue(JSON.parse(this.q.isissue));

    if (this.q.isissueTalk) this.isissueTalk(JSON.parse(this.q.isissueTalk));

    if (this.q.isMail_) this.isMail_(JSON.parse(this.q.isMail_));

    if (this.q.isFull) this.isFull(JSON.parse(this.q.isFull));

    if (this.q.isPro) this.isPro(JSON.parse(this.q.isPro));

    if (this.q.isAuth) this.isAuth(JSON.parse(this.q.isAuth));

    if (this.q.isClient) this.isClient(JSON.parse(this.q.isClient));

    if (this.q.isField) this.isField(JSON.parse(this.q.isField));

    if (this.q.submitContract) this.submitContract(JSON.parse(this.q.submitContract));

    if (this.q.setPeerCookie) this.setPeerCookie(JSON.parse(this.q.setPeerCookie));

    if (this.q.pushChat) this.pushChat(JSON.parse(this.q.pushChat));

    if (this.q.setGPSCookie) this.setGPSCookie(JSON.parse(this.q.setGPSCookie));
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

  isPassValid () {
    let cJar = cookie.parse(this.app.fro.headers.cookie);

    if (!cJar.u) return;

    return cJar.u;
  }

  iniSale (q) {
    if (typeof this.isPassValid() !== `string`) return;

    let modelMapping = {appendModel: model.fieldSale()};

    this.app.to.writeHead(200, config.reqMime.json);
    this.app.to.end(JSON.stringify(model.modal(modelMapping)));
  }

  fieldSale (q) {
    if (typeof this.isPassValid() !== `string`) return;

    let modelMapping = {
      u: q};

    modelMapping[`appendModel`] = model.subSale(modelMapping);

    this.app.to.writeHead(200, config.reqMime.json);
    this.app.to.end(JSON.stringify(model.modal(modelMapping)));
  }

  subSale (q) {
    if (typeof this.isPassValid() !== `string`) return;

    let modelMapping = {
      u: q};

    modelMapping[`appendModel`] = model.sale(modelMapping);

    this.app.to.writeHead(200, config.reqMime.json);
    this.app.to.end(JSON.stringify(model.modal(modelMapping)));
  }

  sale (q) {

    if (typeof this.isPassValid() !== `string`) return;

    let localSt_ = new Date().valueOf();

    let localSt_Sum = crypto.createHash(`md5`).update(`${localSt_}`, `utf8`).digest(`hex`);

    let sale = q.lastSale;

    new Sql().to([`j_` + q.u, {
      blab: sale[4],
      freq: 0,
      location: sale[2] + `-` + sale[3],
      pay: sale[1],
      report: `null`,
      St_: localSt_,
      status: `null`,
      St_to: sale[0],
      sum: localSt_Sum,
      type: q.field + `:` + q.fieldSub,
      uSum: q.u}], (A, B, C) => {
        //this.iniCookie(`u`, localSt_Sum);

        new Sql().to([`j`, {
          blab: sale[4],
          freq: 0,
          location: sale[2] + `-` + sale[3],
          pay: sale[1],
          report: `null`,
          status: `null`,
          St_: localSt_,
          St_to: sale[0],
          sum: localSt_Sum,
          type: q.field + `:` + q.fieldSub,
          uSum: q.u}], (A, B, C) => {

            this.app.to.writeHead(200, config.reqMime.json);
            this.app.to.end(JSON.stringify({url: config.cd.u}));
          });
        });
  }

  stats (q) {

    if (typeof this.isPassValid() !== `string`) return;

    this.availSubs({
      [`j`]: `tab`,
      [`sum`]: `field`,
      [q.lastStat[0]]: `value`});

    let conca = this.literalFormat(config.sql.tfv);

    //conca += `;` + this.literalFormat(config.sql.a_u);

    let avail = {
      [`a_` + q.lastStat[1]]: `tab`,
      [`jsum`]: `field`, [q.lastStat[0]]: `value`,
      [`sum`]: `field_`, [q.u]: `value_`,};

    this.availSubs(avail);

    conca += `;` + this.literalFormat(config.sql.tf_v_);

    conca += `;` + this.literalFormat(config.sql.tfv);

    this.availSubs({
      [`j`]: `tab`,
      [`status`]: `field`, [`null`]: `value`,
      [`uSum`]: `field_`, [q.lastStat[1]]: `value_`,
      [`St_`]: `lmtV`, [`5`]: `int`});

    conca += `;` + this.literalFormat(config.sql.lmtDscf_v_);

    /*this.availSubs({
      [`j`]: `tab`, [`u`]: `tab_`,
      [`uSum`]: `field`, [`sum`]: `field__`, [q.lastStat[0]]: `value`, [`sum`]: `field_`});*/

    this.availSubs({
      [`a_` + q.lastStat[1]]: `tab`, [`u`]: `tab_`,
      [`sum`]: `field`, [`jsum`]: `field__`, [q.lastStat[0]]: `value`, [`sum`]: `field_`});

    conca += `;` + this.literalFormat(config.sql.f_veq);

    //this.availSubs({[`sum`]: `field__`});

    this.availSubs({[`sum`]: `field`});

    conca = this.literalFormat(conca);console.log(conca);console.log()

    new Sql().multi({
      [`j`]: `tab`,
      [`sum`]: `field`,
      [q.lastStat[0]]: `value`,}, conca, (A,B,C) => {

        if (B[0].length === 0) return;

        let act, h, role;

        if (B[0][0].status === `null`) {

          if (B[1].length > 0) {
           act = `Withdraw Application`;
           role = `del-`;
          }

          if (B[1].length < 1) {
           act = `Apply`;
           role = `bid-`;
          }

          h = 0;
        }

        if (B[0][0].status !== `null`) {

          if (q.u === B[0][0].status) {
           act = `You Were Hired!`;
           role = `null-`;
          } else {
            act = `view job stats`;
            view = `to-`
          }

          h = 1;
        }

        let modelMapping = {
          s: {
            title: B[0][0].type.split(`:`)[0] + ` : ` + B[0][0].type.split(`:`)[1],
            desc: B[0][0].blab,
            geo: B[0][0].location.split(`-`)[0] + `, ` + B[0][0].location.split(`-`)[1],
            pay: B[0][0].pay,
            rl: role,
            action: act,
            then: B[0][0].St_,
            timer: B[0][0].St_to * 86400,
            applications: B[2].length.toString(),
            hires: h.toString(),
            sums: B[0][0].sum+`-`+B[0][0].uSum,
            active: B[3],}};

        if (q.u === B[0][0].uSum) {
          if (B[0][0].status === `null`) {
              
              let pool = {
                u: q.u,
                pool: B[4]
              }

            modelMapping[`appendModel`] = [model.pStats(pool)];console.log(pool)
          }  
        }

        if (q.u !== B[0][0].uSum) {
          modelMapping[`appendModel`] = [model.uStats(modelMapping.s)];
          //[model.poolStats()]
        }

        this.app.to.writeHead(200, config.reqMime.json);
        this.app.to.end(JSON.stringify(model.modal(modelMapping)));
      });
  }

  bidSale (q) {

    if (typeof this.isPassValid() !== `string`) return;

    this.availSubs({
      [`j`]: `tab`,
      [`sum`]: `field`,
      [q.lastBid[0]]: `value`});

    let conca = this.literalFormat(config.sql.tfv);

    new Sql().multi({}, conca, (A,B,C) => {

      if (B.length === 0) return;

      let localSt_ = new Date().valueOf();

      let localSt_Sum = crypto.createHash(`md5`).update(`${localSt_}`, `utf8`).digest(`hex`);

      let sale = q.lastSale;

      let ilkj = B[0].type,
        sumj = B[0].sum,
        usrc = B[0].uSum;

      new Sql().to([`a_` + B[0].uSum, {
        jsum: B[0].sum,
        res: `null`,
        St_: localSt_,
        sum: q.u,
        type: B[0].type}], (A, B, C) => {
          //this.iniCookie(`u`, localSt_Sum);

          new Sql().to([`texts`, {
            cord: localSt_Sum,
            fro: q.u, //source of text
            ilk: `apply`,
            jilk: ilkj,
            jsum: sumj,
            log: localSt_,
            src_to: q.u,
            src: usrc, //source of jsum
            toward: usrc,
            txt: `application`}], (A,B,C) => {

              new Sql().to([`interactions`, {
                cord: localSt_Sum,
                fro: q.u, //source of text
                ilk: `apply`,
                jsum: sumj,
                last_fro: q.u, //updates sum_of_last_correspondent @text
                last_fro_log: localSt_, //updates sum_of_last_correspondents_log @text
                last_to_log: localSt_, //fetches last time user texted on this thread @text
                log: localSt_,
                src_to: q.u,
                src: usrc,
                toward: usrc,
                txt: `application`}], (A,B,C) => {

                let modelMapping = {
                  appendModel: [model.bidSuccess()]};

                this.app.to.writeHead(200, config.reqMime.json);
                this.app.to.end(JSON.stringify(model.modal(modelMapping)));
              })

            })
        });
    });
  }

  toPool (q) {

    if (typeof this.isPassValid() !== `string`) return;

    this.availSubs({
      [`j`]: `tab`,
      [`sum`]: `field`, [q.lastBidView[0]]: `value`,
      [`uSum`]: `field_`, [q.u]: `value_`,});

    let conca = this.literalFormat(config.sql.tf_v_);

    this.availSubs({
      [`u`]: `tab`,
      [`sum`]: `field`, [q.lastBidView[2]]: `value`});

    conca += `;` + this.literalFormat(config.sql.tfv);

    this.availSubs({
      [`j`]: `tab`,
      [`status`]: `field`, [q.lastBidView[2]]: `value`});

    conca += `;` + this.literalFormat(config.sql.tfv);console.log(conca)

    new Sql().multi({}, conca, (A,B,C) => {

      if (B[0].length === 0) return;

      //let frq = 

      let modelMapping = {
        pool: {
          alt: B[1][0].alt,
          freq: 0.0,
          logSum: q.lastBidView[0],
          pro: q.lastBidView[2],
          sum: q.u}};

      modelMapping.appendModel = [model.poolStats(modelMapping.pool)]

          this.app.to.writeHead(200, config.reqMime.json);
          this.app.to.end(JSON.stringify(model.modal(modelMapping)));
    });
  }

  talks (q) { //if chats were to be groped by interactions

    if (typeof this.isPassValid() !== `string`) return;


  }

  talkto (q) {

    if (typeof this.isPassValid() !== `string`) return;

    this.availSubs({
      [`texts`]: `tab`,
      [`jsum`]: `field`, [q.lasttalkto[0]]: `value`,
      [`src`]: `field_`, [q.lasttalkto[1]]: `value_`,
      [`fro`]: `field__`, [q.lasttalkto[2]]: `value__`});

    let conca = this.literalFormat(config.sql.triple_tfv);

    this.availSubs({
      [`texts`]: `tab`,
      [`jsum`]: `field`, [q.lasttalkto[0]]: `value`,
      [`src`]: `field_`, [q.lasttalkto[1]]: `value_`,
      [`toward`]: `field__`, [q.lasttalkto[2]]: `value__`});

    conca += `;` + this.literalFormat(config.sql.triple_tfv);

    this.availSubs({
      [`u`]: `tab`,
      [`sum`]: `field`, [q.lasttalkto[2]]: `value`});

    conca += `;` + this.literalFormat(config.sql.tfv);

    new Sql().multi({}, conca, (A,B,C) => {

      let textPool = B[0].concat(B[1]);

            //if (txtStack.length > 0) {

        textPool.sort((a,b) => {
          return (a.log - b.log)});
        //}

      let pool = {
        alt: B[2][0].alt,
        situ: q,
        JSStore: JSON.stringify(q),
        pool: textPool}

      this.app.to.writeHead(200, config.reqMime.json);
      this.app.to.end(JSON.stringify({
        url: `/talkto`,
        title: `Corrde Chat`,
        model: JSON.stringify(model.talkto(pool))}));
      })

    
  }

  talk (q) {

    if (typeof this.isPassValid() !== `string`) return;

    this.availSubs({
      [`texts`]: `tab`,
      [`jsum`]: `field`, [q.lasttalkto[0]]: `value`,
      [`src`]: `field_`, [q.lasttalkto[1]]: `value_`,
      [`src_to`]: `field__`, [q.lasttalkto[2]]: `value__`})

    let conca = this.literalFormat(config.sql.triple_tfv);

    new Sql().multi({}, conca, (A,B,C) => {

      if (B.length === 0) return;

      let _to, ilkj = B[0].jilk,
        sumj = B[0].jsum,
        usrc = B[0].src;
          

      this.availSubs({
        [`interactions`]: `tab`,
        [`jsum`]: `field`, [q.lasttalkto[0]]: `value`,
        [`src_to`]: `field_`, [q.lasttalkto[2]]: `value_`})

      let conca = this.literalFormat(config.sql.delf2);

      new Sql().multi({}, conca, (A,B,C) => {

        let localSt_ = new Date().valueOf();

        let localSt_Sum = crypto.createHash(`md5`).update(`${localSt_}`, `utf8`).digest(`hex`);

        (q.u === q.lasttalkto[1]) ? _to = q.lasttalkto[2] : _to = q.lasttalkto[1]

        console.log(_to)

        new Sql().to([`texts`, {
          cord: localSt_Sum,
          fro: q.u, //source of text
          ilk: `txt`,
          jilk: ilkj,
          jsum: sumj,
          log: localSt_,
          src_to: q.lasttalkto[2],
          src: usrc, //source of jsum
          toward: _to,
          txt: q.txt}], (A,B,C) => {console.log(A)

            new Sql().to([`interactions`, {
              cord: localSt_Sum,
              fro: q.u, //source of text
              ilk: `txt`,
              jsum: sumj,
              last_fro: q.u, //updates sum_of_last_correspondent @text
              last_fro_log: localSt_, //updates sum_of_last_correspondents_log @text
              last_to_log: localSt_, //fetches last time user texted on this thread @text
              log: localSt_,
              src_to: q.lasttalkto[2],
              src: usrc,
              toward: _to,
              txt: q.txt}], (A,B,C) => {

                this.talkto(q);
              })

            })
        });

      })
  }

  isMail (q) {

    if (typeof this.isPassValid() !== `string`) return;

    this.availSubs({
      [`texts`]: `tab`, [`u`]: `tab_`,
      [`fro`]: `field`, [`toward`]: `field__`, [q.u]: `value`, [`sum`]: `field_`});

    let conca = this.literalFormat(config.sql.f_veq);

    this.availSubs({[`toward`]: `field`});

    conca = this.literalFormat(conca);console.log(conca)

    new Sql().multi({}, conca, (A,B,C) => {

      B.sort((a,b) => {
          return (b.log - a.log)});

      let pool = {
        appendModel: [model.isMail(B)]};console.log(B)

      this.app.to.writeHead(200, config.reqMime.json);
      this.app.to.end(JSON.stringify(model.modal(pool)));

    })
  }

  issue (q) {

    this.isPassValid();

    let modelMapping = {[`appendModel`]: [model.quoraMenu(`issue`)]};

    this.app.to.writeHead(200, config.reqMime.json);
    this.app.to.end(JSON.stringify(model.modal(modelMapping)));
  }

  issueMail (q) {

    this.isPassValid();

    let pool = {appendModel: [model.issueMail()]};

    this.app.to.writeHead(200, config.reqMime.json);
    this.app.to.end(JSON.stringify(model.modal(pool)));
  }

  issueTalk (q) {

    this.isPassValid();

    let localSt_ = new Date().valueOf();

    let localSt_Sum = crypto.createHash(`md5`).update(`${localSt_}`, `utf8`).digest(`hex`);

    new Sql().to([`quora`, {
      cord: localSt_Sum,
      ilk: q.issue,
      log: localSt_,
      src: q.u,
      txt: q.issueText}], (A,B,C) => {console.log(A)

        this.app.to.writeHead(200, config.reqMime.json);
        this.app.to.end(JSON.stringify({
          url: `quora/`,}));
    })
  }

  isissue () {

    this.isPassValid();

    let pool = {appendModel: [model.isissue()]};

    this.app.to.writeHead(200, config.reqMime.json);
    this.app.to.end(JSON.stringify(model.modal(pool)));
  }

  isissueTalk (q) {

    this.isPassValid();

    this.availSubs({
      [`quora`]: `tab`,
      [`cord`]: `field`, [q.to_issue_sum]: `value`,
      [`src`]: `field_`, [q.to_issue_src]: `value_`});

    let conca = this.literalFormat(config.sql.tf_v_);

    new Sql().multi({}, conca, (A,B,C) => {

      if (B.length === 0) return

      let localSt_ = new Date().valueOf();

      let localSt_Sum = crypto.createHash(`md5`).update(`${localSt_}`, `utf8`).digest(`hex`);

      new Sql().to([`quora_comments`, {
        cord: B[0].cord,
        fro: q.u,
        ilk: B[0].ilk,
        log: localSt_,
        self_cord: localSt_Sum,
        src: B[0].src,
        txt: q.to_issue_last}], (A,B,C) => {

        this.app.to.writeHead(200, config.reqMime.json);
        this.app.to.end(JSON.stringify({
          url: `quora/`,}));
    })
    })
  }

  isMail_ (q) {

    this.availSubs({
      [`u`]: `tab`,
      [`mail`]: `field`,
      [q[`make_mail`]]: `value`});

    let conca = this.literalFormat(config.sql.tfv);

    new Sql().multi({}, conca, (A, B, C) => {

      let pool = {
        err: {}};

      if (B.length > 0) {
        pool.is_mail = true;
        pool.err.is_mail = true;
      }

      else if (B.length === 0) {
        pool.is_mail = false;
        this.iniCookie(`is_mail`, false);
      }

      this.app.to.writeHead(200, config.reqMime.json);
      this.app.to.end(JSON.stringify(pool));
    })
  }

  isValid (is) {

    if (this.app.fro.headers.cookie) {

      let cJar = cookie.parse(this.app.fro.headers.cookie);

      if (!cJar[is]) return false;

      return cJar[is];

    } else return false;
  }

  isFull (q) {

    let pool = {
        err: {}};

    if (!q[`make_full`]) {
      pool.is_full_set = false;
      pool.err.cookie_err = true;
    }

    else {
      pool.is_full_set = true;
      this.iniCookie(`is_full_set`, true);
    }

    /*if (config.meta_to[0] === q.in_as) {
      pool.url = `/setup`;
    }

    else if (config.meta_to[1] === q.in_as) pool.url = `/meta`*/

    pool.url = `/setup` //public

    this.app.to.writeHead(200, config.reqMime.json);
    this.app.to.end(JSON.stringify(pool));
    
  }

  isPro (q) {

    let conca = `select * from u`;

    new Sql().multi({}, conca, (A, B, C) => {

      let is_mail, pool = {};

      for (let u in B) {

        if (B[u].mail === q.make_mail) is_mail = true;
      }

      if (is_mail !== true) {

        let localSt_ = new Date().valueOf();

          let ini_sum = crypto.createHash(`md5`).update(`${localSt_}`, `utf8`).digest(`hex`);

          let mailPass = crypto.createHash(`md5`).update(q.make_pass, `utf8`),
              is_ava = false;

          if (q.lvl_ini_ava) {

            let ava = config.lvl_ava + ini_sum + `/`;

            fs.mkdirSync(ava, {recursive: true});
            fs.copyFileSync(q.lvl_ini_ava, ava + localSt_ + `.jpg`);

            is_ava = ava + localSt_ + `.jpg`;
          }
          
          new Sql().to([`u`, {
            alt: JSON.stringify({
              appraisal: q.ini_rate,
              ava: is_ava,
              edu: q.ini_edu,
              desc: q.ini_desc,
              full: q.make_full,
              log: localSt_,
              mail: q.make_mail,
              pass: mailPass.digest(`hex`),
              skills: q.ini_skills,
              sum: ini_sum,
              wpl: q.ini_wpl}),
            mail: q.make_mail,
            mug: `null`,
            pass: 'mailPass.digest(`hex`)',
            St_: localSt_,
            sum: ini_sum}], (A, B, C) => {
              this.iniCookie(`u`, ini_sum);

              pool[`is_pro`] = true;

              this.app.to.writeHead(200, config.reqMime.json);
              this.app.to.end(JSON.stringify(pool));
            });
      }

      else pool[err].push(`true_mail`);
    })
  }


  isAuth (q) {

    let conca = `select * from u`,
      is_mail = false,
      pool = {};

    new Sql().multi({}, conca, (A, B, C) => {

      for (let u in B) {

        if (B[u].mail === q.mail) is_mail = B[u];
      }

      if (is_mail !== false) {

        let hexPass = crypto.createHash(`md5`).update(q.pass, `utf8`),
            alt = JSON.parse(is_mail.alt);

        if (alt.pass === hexPass.digest(`hex`)) {

          this.iniCookie(`u`, is_mail.sum);

          pool.is_auth = true; 

          this.app.to.writeHead(200, config.reqMime.json);
          this.app.to.end(JSON.stringify(pool));
        }
      }
    });
  }

  isClient (q) {

    let conca = `select * from u`;

    new Sql().multi({}, conca, (A, B, C) => {

      let is_mail, pool = {};

      for (let u in B) {

        if (B[u].mail === q.make_mail) is_mail = true;
      }

      if (is_mail !== true) {

        let localSt_ = new Date().valueOf();

          let ini_sum = crypto.createHash(`md5`).update(`${localSt_}`, `utf8`).digest(`hex`);

          let mailPass = crypto.createHash(`md5`).update(q.make_pass, `utf8`),
              is_ava = false;
          
          new Sql().to([`u`, {
            alt: JSON.stringify({
              appraisal: false,
              ava: is_ava,
              edu: [],
              desc: false,
              full: q.make_full,
              log: localSt_,
              mail: q.make_mail,
              pass: mailPass.digest(`hex`),
              skills: [],
              sum: ini_sum,
              wpl: []}),
            mail: q.make_mail,
            mug: `null`,
            pass: 'mailPass.digest(`hex`)',
            St_: localSt_,
            sum: ini_sum}], (A, B, C) => {
              this.iniCookie(`u`, ini_sum);

              pool[`is_mail`] = false;

              this.app.to.writeHead(200, config.reqMime.json);
              this.app.to.end(JSON.stringify(pool));
            });
      }

      else pool[err].push(`true_mail`);
    })
  }

  isField (q) {

    if (q.to_field && config.fields[q.to_field]) {

      new UAPublic().fieldAnalysis(q.to_field, (A, B) => {

        let pool = {};

        if (A.length > 0) {

          pool[`is_field`] = true;
          pool[`model`] = model.inView(A, B);
        }

        else {

          pool[`is_field`] = false;
        }

        this.app.to.writeHead(200, config.reqMime.json);
        this.app.to.end(JSON.stringify(pool));
      })
    }
  }

  isMatrixAvailable (q) {

    let pool = {is_matrix_avail: false};

    if (q.gps && q.gps.length > 1) {

      let matrixPool = gyro.pool_matrices,
        gps = q.gps;

      for (let matrix = 0; matrix < matrixPool.length; ++matrix) {

        if (gps[0] >= matrixPool[matrix][0] && gps[0] <= matrixPool[matrix][2]) {

          if (gps[1] >= matrixPool[matrix][1] && gps[1] <= matrixPool[matrix][3]) {

            pool[`matrix`] = matrixPool[matrix];
            pool[`is_matrix_avail`] = true; 
          }
        }
      }

      this.app.to.writeHead(200, config.reqMime.json);
      this.app.to.end(JSON.stringify(pool));
    }
  }

  isCookieValid (is, callView) {

    if (this.app.fro.headers.cookie) {

      let cJar = cookie.parse(this.app.fro.headers.cookie);

      if (!cJar[is]) {

        return//this.rootCall();
      }
      
      else callView();

    } 

    else return//this.rootCall();
  }

  isContract (q) {

    this.isCookieValid(`u`, () => {

      this.app.to.writeHead(200, config.reqMime.json);
      this.app.to.end(JSON.stringify({
        is_auth_valid: true,
        url: config.lvl_mycontract}));
    })
  }

  fieldtoSkill (q) {

    this.isCookieValid(`u`, () => {

      if (q.contract_field && config.fields[q.contract_field]) {

        this.app.to.writeHead(200, config.reqMime.json);
        this.app.to.end(JSON.stringify({
          is_field: true,
          model: model.fieldtoSkillView(config.fields[q.contract_field], `contractskill`)}));
      }
    })
  }

  saveContract (q) {

    let conca = `select * from u`;

    this.isCookieValid(`u`, () => {

      new Sql().multi({}, conca, (A, B, C) => {

        let is_mail, pool = {};

        for (let u in B) {

          if (B[u].mail === q.mail) is_mail = true;
        }

        if (is_mail === true) {

          let ini_log = new Date().valueOf();

          let ini_sum = crypto.createHash(`md5`).update(`${ini_log}`, `utf8`).digest(`hex`);

          let contractPool = {
            activity: {applications: [], gives: [], interviews: []},
            days: q.contract_days,
            detail: q.contract_detail,
            field: q.contract_field,
            gps: q.gps,
            ini_log: ini_log,
            ini_sum: ini_sum,
            is_open: true,
            lead: q.contract_lead,
            pay: q.contract_pay,
            payway: q.contract_payway,
            subfield: q.contract_skill,
            sum: q.in}
          
          new Sql().to([`j`, {
            blab: JSON.stringify(contractPool),
            freq: 0,
            location: `gps`,
            pay: 0,
            report: `null`,
            St_: `localSt_`,
            status: `null`,
            sum: `localSt_Sum`,
            St_to: `sale[0]`,
            type: `{q.field_q.fieldSub}`,
            uSum: `q.u`}], (A, B, C) => {

              pool[`is_contract_valid`] = true;
              pool[`url`] = config.lvl_myjobs;

              this.app.to.writeHead(200, config.reqMime.json);
              this.app.to.end(JSON.stringify(pool));
            });
        }

      })
    })
  }

  submitContract (q) {

    this.isCookieValid(`u`, () => {

      if (q.u !== q.sum) {

        this.inisumAssoc(q.ini_sum, q.u, (A => {

          let blobValue = JSON.stringify(A.pool)

          let column = A.pool;

          if (A.open === true && A.valid === true) {

            let actValue = {}, longText, mail, mode, notify = false;

            let displaceValue = (value, list) => {

              let list2 = [];

              for (let u = 0; u < list.length; u++) {

                if (list[u].sum !== value) list2.push(list[u]);
              }

              return list2;
            };

            let ava = A.u[`ava`], sumsrc = A.u[`sum`], altsrc = A.u[`full`];

            let maillog = new Date().valueOf();

            let maillog_sum = crypto.createHash(`md5`).update(`${maillog}`, `utf8`).digest(`hex`);

            if (A.gives === false && A.applications === false) {

              column[`activity`][`applications`].push({
                ava: A.u[`ava`],
                full: A.u[`full`],
                per: A.u[`appraisal`],
                sum: A.u[`sum`]});

              mail = column[`subfield`];

              mode = `push`
            }

            else if (A.gives === false && A.applications === true) {

              column[`activity`][`applications`] = displaceValue(A.u[`sum`], A.pool[`activity`][`applications`]);

              mail = column[`subfield`];

              mode = `revert`
            }

            new Sql().multi({}, 
              `update j set blab = '${JSON.stringify(column)}' where blab = '${blobValue}'`,
              (A, B, C) => {

                if (A === null) {

                  this.availSelfsActivity(column[`sum`], (A, B, C) => {

                    new Sql().to([`messages`, {json: JSON.stringify({
                      alt_src: altsrc,
                      alt_to: A.full,
                      ava_src: ava,
                      ava_to: A.ava,
                      ini_sum: q.ini_sum,
                      mail: mail,
                      mail_log: maillog,
                      mail_log_sum: maillog_sum,
                      mode: mode,
                      read: false,
                      sum_src: q.u,
                      sum_to: A.sum,
                      title: column[`lead`]})}], (A, B, C) => {

                      this.app.to.writeHead(200, config.reqMime.json);
                      this.app.to.end(JSON.stringify({exit: true}));
                    }); 
                  });
                }
            });
          }
        }));
      }
    });
  }

  setPeerCookie(q) {

    this.isCookieValid(`u`, () => {

      this.iniCookie(`msgpeer`, JSON.stringify(q.peers));

      this.app.to.writeHead(200, config.reqMime.json);
      this.app.to.end(JSON.stringify({exit: true}));
    });
  }

  pushChat (q) {

    this.isCookieValid(`u`, () => {

      this.mailCluster(q.in, (A, B) => {

        let mailPeered = [], top = [];

        for (let msg in B) {

          let mailPool = B[msg];

          if (mailPool[`ini_sum`] === q[`peer_ini_sum`]) {

            if (mailPool[`sum_to`] === q[`peer`] || mailPool[`sum_src`] === q[`peer`]) {

              mailPeered.push(mailPool);

              top = mailPool[`title`];
            }
          }
        }

        if (mailPeered.length > 0) {

          this.availSelfsActivity(q.peer, (A, B, C) => {

            //let ava = A.u[`ava`], sumsrc = A.u[`sum`], altsrc = A.u[`full`];

            let maillog = new Date().valueOf();

            let maillog_sum = crypto.createHash(`md5`).update(`${maillog}`, `utf8`).digest(`hex`);

            new Sql().to([`messages`, {json: JSON.stringify({
              alt_src: q.full,
              alt_to: A.full,
              ava_src: q.ava,
              ava_to: A.ava,
              ini_sum: q.peer_ini_sum,
              mail: q.peer_msg,
              mail_log: maillog,
              mail_log_sum: maillog_sum,
              mode: `text`,
              read: false,
              sum_src: q.in,
              sum_to: A.sum,
              title: top})}], (A, B, C) => {

                this.app.to.writeHead(200, config.reqMime.json);
                this.app.to.end(JSON.stringify({
                  exit: true,
                  model: model.mailPush({log: maillog, msg: q.peer_msg})}));
            });
          }); 
        }
      });
    });
  }

  setGPSCookie (q) {

    this.iniCookie(`gps`, JSON.stringify(q.gps));

    this.app.to.writeHead(200, config.reqMime.json);
    this.app.to.end(JSON.stringify({exit: true}));
  }
}

class AJXJPEG {

  constructor (file, req, res) {
    this.file = file;
    this.app = {
      fro: req,
      to: res};
    this.q = JSON.parse(req.headers[`corrde-reqs`]);
  }

  AJXCalls () {

    if (this.q.file === `asset_md5`) this.thumbnailSet();

    else if (this.q.file === `ini_ava`) this.iniAva();

    else if (this.q.file === `cover_img`) this.addCover();

    else if (this.q.file === `dev_ava`) this.devAva();

    else if (this.q.file === `StockFiles`) this.StockFiles();

    else if (this.q.file === `u_md5_ava`) this.md5Ava();

    else if (this.q.file === `u_md5_pfolio_img`) this.md5Story();
  }

  iniAva () {

    let localSt_ = new Date().valueOf();

    let mail = crypto.createHash(`md5`).update(`${this.q.make_mail}`, `utf8`).digest(`hex`);

    const u = config.lvl_ini_ava + mail + `/`;

    fs.mkdir(u, {recursive: true}, (err) => {

      fs.writeFile(u + localSt_ + `.jpg`, this.file, err => {

        let pool = {lvl_ini_ava: u + localSt_ + `.jpg`}

        this.app.to.writeHead(200, config.reqMime.json);
        this.app.to.end(JSON.stringify(pool));
      });
    });
  }

  devAva () {

    let localSt_ = new Date().valueOf();

    //let mail = crypto.createHash(`md5`).update(`${this.q.dev_md5}`, `utf8`).digest(`hex`);

    const u = config.write_reqs.devs_ava + this.q.dev_md5 + `/`;

    fs.mkdir(u, {recursive: true}, (err) => {

      fs.writeFile(u + localSt_ + `.jpg`, this.file, err => {

        let pool = {reqs_devs_ava: u + localSt_ + `.jpg`}

        new Auxll().availDev(this.q.dev_md5, A => {

          let dev = JSON.stringify(A.dev[0]);

          A.dev[0].ava = `/` + pool.reqs_devs_ava;

          new Sql().multi({}, 
            `update devs set json = '${JSON.stringify(A.dev[0])}' where json = '${dev}'`,
            (A, B, C) => {

              this.app.to.writeHead(200, config.reqMime.json);
              this.app.to.end(JSON.stringify(pool));
            })
        })
      });
    });
  }

  md5Ava () {

    let localSt_ = new Date().valueOf();

    const u = config.write_reqs.u_md5_ava + this.q.u_md5 + `/`;

    fs.mkdir(u, {recursive: true}, (err) => {

      fs.writeFile(u + localSt_ + `.jpg`, this.file, err => {

        let pool = {u_md5_ava: u + localSt_ + `.jpg`}

        new Sql().multi({}, 
            `select * from u`,
            (A, B, C) => {

          let md5;

          for (let u in B) {

            let Obj = JSON.parse(B[u].alt);

            if (Obj.sum === this.q.u_md5) md5 = Obj;
          }

          let _md5 = JSON.stringify(md5);

          md5.ava = pool.u_md5_ava;

          new Sql().multi({}, 
            `update u set alt = '${JSON.stringify(md5)}' where alt = '${_md5}'`,
            (A, B, C) => {

              this.app.to.writeHead(200, config.reqMime.json);
              this.app.to.end(JSON.stringify(pool));
            })
        })
      });
    });
  }

  md5Story () {

    let localSt_ = new Date().valueOf();

    const u = config.write_reqs.u_md5_pfolio_img + this.q.u_md5 + `/`;

    fs.mkdir(u, {recursive: true}, (err) => {

      fs.writeFile(u + this.q.pfolio_secs + `.jpg`, this.file, err => {

        let pool = {u_md5_pfolio_img: u + this.q.pfolio_secs + `.jpg`}

        this.app.to.writeHead(200, config.reqMime.json);
        this.app.to.end(JSON.stringify(pool));
            
      });
    });
  }

  addCover () {

    let localSt_ = new Date().valueOf();

    const u = config.write_reqs.cover_img + this.q.u_md5 + `/`;

    fs.mkdir(u, {recursive: true}, (err) => {

      fs.writeFile(u + this.q.cover_secs + `.jpg`, this.file, err => {

        let pool = {cover_img: u + this.q.cover_secs + `.jpg`}

        this.app.to.writeHead(200, config.reqMime.json);
        this.app.to.end(JSON.stringify(pool));
            
      });
    });
  }

  thumbnailSet () {

    let localSt_ = new Date().valueOf();

    const u = config.write_reqs.asset_img + this.q.u_md5 + `/`;

    fs.mkdir(u, {recursive: true}, (err) => {

      fs.writeFile(u + this.q.asset_secs + `.jpg`, this.file, err => {

        let pool = {
          asset_img: u + this.q.asset_secs + `.jpg`,
          ModelStockSet: model.loadDOMModalView([model.modalView([model.StockSet()])], `StockSetModal`)}

        this.app.to.writeHead(200, config.reqMime.json);
        this.app.to.end(JSON.stringify(pool));
            
      });
    });
  }

  StockFiles () {

    let log = new Date().valueOf();

    const u = config.write_reqs.asset_img + `g/`;

    fs.mkdir(u, {recursive: true}, (err) => {

      fs.writeFile(u + log + `.jpg`, this.file, err => {

        let Pool = {
          fileString: u + log + `.jpg`,
          log: log};console.log(Pool)

        this.app.to.writeHead(200, config.reqMime.json);
        this.app.to.end(JSON.stringify(Pool));
            
      });
    });
  }
}

class UATCP extends UAPublic {

  constructor () {super();}

  TCPCalls (tcp) {

    let logs = [], reqs = [], regreqs = [], valids = [],
      dualValids = [],
      locusValid = [],
      allJobs = [],
      fieldCount = [],
      conca = `select * from j;`;
      conca += `select * from u;`;

    let tlsCount = 0;

    let tlsReqs = [];

    let poolReqs = [];

    let emit_md5 = [];

    let js_md5 = [];

    let logs_md5 = []

    let key_md5 = {}

    let area_umd5;

    tcp.on(`connection`, tls => {

      if (tls.handshake.headers.cookie && cookie.parse(tls.handshake.headers.cookie).dev_md5) {

        tls.handshake[`utc`] = new Date().valueOf();

        tls.handshake.headers[`dev_md5`] = cookie.parse(tls.handshake.headers.cookie).dev_md5;
        tls.handshake.headers[`gps`] = cookie.parse(tls.handshake.headers.cookie).gps;

        new Sql().to([`devs_traffic`, {json: JSON.stringify(tls.handshake)}], (A, B, C) => {});
      }

      if (tls.handshake.headers.cookie && cookie.parse(tls.handshake.headers.cookie).u) {

        tls.handshake[`utc`] = new Date().valueOf();

        tls.handshake[`u_md5`] = cookie.parse(tls.handshake.headers.cookie).u;
        tls.handshake[`gps`] = cookie.parse(tls.handshake.headers.cookie).gps;

        new Sql().to([`u_md5_logs`, {json: JSON.stringify(tls.handshake)}], (A, B, C) => {});
      }

      tls.on(`mail2`, polyg => {

        new Auxll().logs_u_md5(A => {

          let mail = A.polygs_log_key[polyg.pfolio_log_md5];

          let emitPolyg = {mail2Obj: mail.mail2, md5: polyg.pfolio_log_md5};

          tcp.emit(`mail2`, emitPolyg);

        })
      })

      tls.on(`polyg_mail`, polyg => {

        new Auxll().logs_u_md5(A => {

          let mail = A.polygs_log_key[polyg.pfolio_log_md5];

          let emitPolyg = {mailObj: mail.mail, md5: polyg.pfolio_log_md5, model: model.storyMail(mail.mail, A.md5Key)};

          tcp.emit(`polyg_mail`, emitPolyg);

        })
      })

      tls.on(`area_md5`, md5 => {

        area_umd5 = md5.u_md5;

        key_md5[md5.u_md5] = md5;

        if (emit_md5.indexOf(md5.u_md5) === -1) {

          emit_md5.push(md5.u_md5);

          js_md5.push(md5)

        }

        let PJ = md5.gps;

        let SQ = [PJ[0] - .10, PJ[1] - .10, PJ[0] + .10, PJ[1] + .10];

        let SQ_u_md5 = [];

        js_md5.forEach(u_md5 => {

          let POS = u_md5.gps

          if (POS[0] >= SQ[0] && POS[0] <= SQ[2]) {

            if (POS[1] >= SQ[1] && POS[1] <= SQ[3]) SQ_u_md5.push(u_md5);
          }
        })

        //SQ_u_md5 = logs_md5;

        tcp.emit(`area_md5`, [SQ_u_md5, emit_md5]);
      })

      tls.on(`J_md5`, md5 => {

        new Auxll().logs_u_md5(A => {

          tcp.emit(`J_md5`, A.jobs);

        })
      })

      tls.on(`listServices`, a => {

        let S = [ 
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
      
        new Auxll().logs_u_md5(A => {

          let F = [];

          let Obj = [];

          S.forEach(J => {

            if (J.indexOf(a.replace(new RegExp(/&amp;/g, `g`), `&`)) > -1) {

              let U_ = [];

              let J_ = [];

              J[1].forEach(B => {

                let S_ = [];

                let M_ = [];

                A.jobs.forEach(C => {

                  if (C.tag[1] === B.replace(new RegExp(/&/g, `g`), `u/0026`)) {S_.push(C);}
                })

                J_.push(S_.length);

                A.md5.forEach(C => {

                  if (C.skills.indexOf(B.replace(new RegExp(/&/g, `g`), `u/0026`)) > -1) {M_.push(C);}
                })

                U_.push(M_.length);

                F.push(B);
              })

              Obj[0] = F;
              Obj[1] = U_;
              Obj[2] = J_;

            }
          });

          if (Obj.length > 0) tcp.emit(`listServices`, model.loadDOMModalView([model.modalView([model.listSubs(a, Obj)])], `list-subs`))
        })
      })

      tls.on(`dev_md5_2_u_md5`, a => {
      
        new Auxll().logs_u_md5(A => {

          let U = A;

          new Auxll().getDevsMail(A => {

            let M = [];

            A[3].forEach(Msg => {

              if (Msg.to_md5 === a || Msg.src_md5 === a) M.push(Msg);
            })

            if (U.md5Key[a]) tcp.emit(`dev_md5_2_u_md5`, model.loadDOMModalView([model.modalView([model.u_md5Msg(a, M, U.md5Key)])], `u_md5-txt`))
          })
        })
      })

      tls.on(`msg_2_u_md5`, Msg => {

        new Auxll().getDevsMail( A => {

          if (!A[2].length > 0) return;

          let dev = A[2][0];

          let log = new Date().valueOf();

          let log_sum = crypto.createHash(`md5`).update(`${log}`, `utf8`).digest(`hex`);

          new Sql().to([`support_mail`, {json: JSON.stringify({
            group: `helps`, //support requests
            log_md5: log_sum,
            mail: Msg.msg,
            mail_log: log,
            mail_md5: log_sum,
            mailto: false,
            read: false,
            risk: false,
            src_md5: dev.dev_md5,
            to_md5: Msg.msg_u_md5,
            title: false,
            type: `quizes`})}], (A, B, C) => {
          });
        })
      })

      tls.on(`u_md5_2_dev_md5`, a => {
      
        new Auxll().logs_u_md5(A => {

          let U = A;

          new Auxll().getDevsMail(A => {

            let M = [];

            A[3].forEach(Msg => {

              if (Msg.to_md5 === a || Msg.src_md5 === a) M.push(Msg);
            })

            if (U.md5Key[a]) tcp.emit(`u_md5_2_dev_md5`, model.loadDOMModalView([model.modalView([model.u_md5_2_dev_md5(a, M, U.md5Key)])], `dev_md5-txt`))
          })
        })
      })

      tls.on(`msg_2_dev_md5`, Msg => {

        new Auxll().getDevsMail( A => {

          if (!A[2].length > 0) return;

          let dev = A[2][0];

          let Msgs = A[3];

          let log = new Date().valueOf();

          let log_sum = crypto.createHash(`md5`).update(`${log}`, `utf8`).digest(`hex`);

          new Sql().to([`support_mail`, {json: JSON.stringify({
            group: `helps`, //support requests
            log_md5: log_sum,
            mail: Msg.msg,
            mail_log: log,
            mail_md5: log_sum,
            mailto: false,
            read: false,
            risk: `moderate`,
            src_md5: Msg.msg_u_md5,
            to_md5: dev.dev_md5,
            title: `Support Request`,
            type: `quizes`})}], (A, B, C) => {
      
              new Auxll().logs_u_md5(A => {

                let U = A;

                new Auxll().getDevsMail( A => {

                  let Msgs = A[3];

                  let M = [];

                  Msgs.forEach(Mail => {

                    if (Mail.to_md5 === Msg.msg_u_md5 || Mail.src_md5 === Msg.msg_u_md5) M.push(Mail);
                  })

                  if (U.md5Key[Msg.msg_u_md5]) tcp.emit(`u_md5_as_dev_md5`, {html: model.u_md5_as_dev_md5(Msg.msg_u_md5, M, U.md5Key), u_md5: Msg.msg_u_md5})
                })
              });
          });
        })
      })

      tls.on(`list_u_md5`, a => {
      
        new Auxll().logs_u_md5(A => {

          tcp.emit(`list_u_md5`, model.loadDOMModalView([model.modalView([model.list_u_md5(A)])], `list_u_md5`))
        })
      });

      tls.on(`geo_tiles`, PJ => {

        fs.stat(`gp/twineJSON/${PJ.adm0_a3}_rds.geo.json`, (err, Stats) => {

          if (Stats && Stats.dev) {
            
            fs.readFile(`gp/twineJSON/${PJ.adm0_a3}_rds.geo.json`, {encoding: `utf8`}, (err, Utf8) => {
              
              let R = JSON.parse(Utf8);

              let R_tile = [];

              let PQ = PJ.PQ;

              let SQ = [PQ[0] - .15, PQ[1] - .15, PQ[0] + .15, PQ[1] + .15]  

              R.features.forEach(Feat => {
 
                if (Feat.geometry.type === `LineString`) {

                  Feat.geometry.coordinates.forEach(POS => {

                    if (POS[0] >= SQ[0] && POS[0] <= SQ[2]) {

                      if (POS[1] >= SQ[1] && POS[1] <= SQ[3]) R_tile.push(Feat);
                    }
                  })
                }
              });

              fs.stat(`gp/twineJSON/${PJ.adm0_a3}_gaz.geo.json`, (err, Stats) => {

                if (Stats && Stats.dev) {
            
                  fs.readFile(`gp/twineJSON/${PJ.adm0_a3}_gaz.geo.json`, {encoding: `utf8`}, (err, Utf8) => {
              
                    let G = JSON.parse(Utf8);

                    let G_tile = [];

                    let SQ_gaz = [PQ[0] - .025, PQ[1] - .075, PQ[0] + .025, PQ[1] + .075]  

                    G.forEach(Feat => {
 
                      if (Feat.LONG >= SQ_gaz[0] && Feat.LONG <= SQ_gaz[2]) {

                        if (Feat.LAT >= SQ_gaz[1] && Feat.LAT <= SQ_gaz[3] && Feat.F_CLASS === `P`) G_tile.push(Feat);
                      }
                    });

                    tcp.emit(`geo_tiles`, [R_tile, G_tile, {tile: SQ, tiles_utc: PJ.tiles_utc}]);
                  });
                }
              })
            });
          }
        })
      })

      tls.on(`create_geo_tiles`, PJ => {

        let POS_max = [Math.ceil(PJ.PQ[0]), Math.ceil(PJ.PQ[1])];

        let geo_tile = `${POS_max[0] - 1}_${POS_max[1] - 1}_${POS_max[0]}_${POS_max[1]}`;

        fs.stat(`gp/twineJSON/${geo_tile}_rds.json`, (err, Stats) => {

          if (err) 

            fs.stat(`gp/twineJSON/${PJ.adm0_a3}_rds.geo.json`, (err, Stats) => {

              if (Stats && Stats.dev) 

                  fs.readFile(`gp/twineJSON/${PJ.adm0_a3}_rds.geo.json`, {encoding: `utf8`}, (err, Utf8) => {
              
                    let R = JSON.parse(Utf8);

                    let R_tile = [];

                    let PQ = PJ.PQ;

                    let SQ = [POS_max[0] - 1, POS_max[1] - 1, POS_max[0], POS_max[1]]  

                    R.features.forEach(Feat => {
 
                      if (Feat.geometry.type === `LineString`) {

                        Feat.geometry.coordinates.forEach(POS => {

                          if (POS[0] >= SQ[0] && POS[0] <= SQ[2]) {

                            if (POS[1] >= SQ[1] && POS[1] <= SQ[3]) R_tile.push(Feat);
                          }
                        })
                      }
                    });

                    fs.writeFile(`gp/twineJSON/${geo_tile}_rds.json`, JSON.stringify(R_tile), err => {

                      fs.stat(`gp/twineJSON/${geo_tile}_gaz.json`, (err, Stats) => {

                        if (err)
            
                          fs.stat(`gp/twineJSON/${PJ.adm0_a3}_gaz.geo.json`, (err, Stats) => {

                            if (Stats && Stats.dev)
            
                              fs.readFile(`gp/twineJSON/${PJ.adm0_a3}_gaz.geo.json`, {encoding: `utf8`}, (err, Utf8) => {

                                let G = JSON.parse(Utf8);

                                let G_tile = [];

                                let SQ_gaz = [POS_max[0] - 1, POS_max[1] - 1, POS_max[0], POS_max[1]];  

                                G.forEach(Feat => {
 
                                  if (Feat.LONG >= SQ_gaz[0] && Feat.LONG <= SQ_gaz[2]) {

                                    if (Feat.LAT >= SQ_gaz[1] && Feat.LAT <= SQ_gaz[3] && Feat.F_CLASS === `P`) G_tile.push(Feat);
                                  }
                                });

                                fs.writeFile(`gp/twineJSON/${geo_tile}_gaz.json`, JSON.stringify(G_tile), err => {})
                              });
                          });
                      })
                    });
                  })
            }) 
        })
      })

      tls.on(`create_vService`, Vals => {

        let log = new Date().valueOf();

        let log_sum = crypto.createHash(`md5`).update(`${log}`, `utf8`).digest(`hex`);

        new Sql().to([`vServices`, {json: JSON.stringify({
          log_md5: log_sum,
          log_secs: log,
          u_md5: Vals.u_md5,
          vServiceAddress: false,
          vServiceBio: false,
          vServiceClass: false, 
          vServiceSet: Vals.vServiceSet,})}], (A, B, C) => {

          Vals[`log_md5`] = log_sum;

          tcp.emit(`create_vService`, Vals);
        })
      })

      tls.on(`list_vServices`, Vals => {
      
        new Auxll().logs_u_md5(A => {

          tcp.emit(`list_vServices`, {
            log_secs: Vals.log_secs,
            model: model.loadDOMModalView([model.modalView([model.listvServices(A.md5Key[Vals.u_md5].vServices)])], `listvServicesModal`)})
        })
      });

      tls.on(`set_store_class`, Args => {

        new Sql().multi({}, 
          `select * from vServices`, (A, B, C) => {

          let Store;

          for (let store in B) {

            let S = JSON.parse(B[store].json);

            if (S.log_md5 === Args.log_md5) Store = S;
          }

          let StoreSelf = JSON.stringify(Store);

          Store.vServiceClass = Args.vServiceClass;

          new Sql().multi({}, 
            `update vServices set json = '${JSON.stringify(Store)}' where json = '${StoreSelf}'`, (A, B, C) => {

              tcp.emit(`set_store_class`, Args)
            });
        })
      })

      tls.on(`set_store_address`, Args => {

        if (!Args.vServiceAddress.adm0_a3) return;

        new Sql().multi({}, 
          `select * from vServices`, (A, B, C) => {

          let Store;

          for (let store in B) {

            let S = JSON.parse(B[store].json);

            if (S.log_md5 === Args.log_md5) Store = S;
          }

          let StoreSelf = JSON.stringify(Store);

          if (typeof Store.vServiceAddress !== `object` || typeof Store.vServiceAddress[0] !== `object`) Store.vServiceAddress = [];

          let featState;

          for (let feat in Store.vServiceAddress) {

            let Feat = Store.vServiceAddress[feat];

            if (Feat.adm0_a3 === Args.vServiceAddress.adm0_a3) featState = feat;
          }

          if (featState) Store.vServiceAddress[featState].points.push(Args.vServiceAddress.points[0]);

          else Store.vServiceAddress.push(Args.vServiceAddress);

          new Sql().multi({}, 
            `update vServices set json = '${JSON.stringify(Store)}' where json = '${StoreSelf}'`, (A, B, C) => {

              tcp.emit(`set_store_address`, Args)
            });
        })
      })

      tls.on(`rateStock`, Args => {

        if (!Args.u_md5) return;

        new Sql().multi({}, 
          `select * from products`, (A, B, C) => {

          let Stock;

          let Ratings = [];

          for (let stock in B) {

            let S = JSON.parse(B[stock].json);

            if (S.store_md5 === Args.store_md5 && S.asset_md5 === Args.stock_md5) Stock = S;
          }

          //Stock = Stock

          let StockSelf = JSON.stringify(Stock);

          if (Stock.ratings.indexOf(Args.u_md5) > -1) {

            Stock.ratings.forEach(u_md5 => {

              if (u_md5 !== Args.u_md5) Ratings.push(u_md5);
            })

            Stock.ratings = Ratings;

          }

          else Stock.ratings.push(Args.u_md5);

          new Sql().multi({}, 
            `update products set json = '${JSON.stringify(Stock).replace(new RegExp(`\'`, `g`), `u/0027`)}' where json = \'${StockSelf}\'`, (A, B, C) => {
              console.log(A)

            tcp.emit(`rateStock`, Args);
          })
        })
      });

      tls.on(`payArgString`, Args => {

        /*let path = `https://www.pesapal.com/API/PostPesapalDirectOrderV4`;

        let t = Date();

        let QueryParameters = {
          offset: 0,
          limit: 100,
          filter:"status='active'"
        };

        let timeStamp = Math.floor(Date.now() / 1000);

        let nonce = timeStamp;

        let CartXMLOrder = `<?xmlversion="1.0"encoding="utf-8"?><PesapalDirectOrderInfoxmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" Amount="100.00" Description="Order payment" Type="MERCHANT" Reference="12" Currency="UGX" FirstName="Foo" LastName="Bar" Email="mannasugo@gmail.com" xmlns="http://www.pesapal.com" />`

        let Parameters = {
          //...QueryParameters,
          oauth_callback: `https://corrde.com/receipt/${timeStamp}`,
          oauth_consumer_key: `Pj4NoJh0Onuadd6l/mI60SF7nPhyPXi8`,
          oauth_nonce: nonce,
          oauth_signature_method : `HMAC-SHA1`,
          oauth_timestamp: timeStamp,
          oauth_version : `1.0`,
          pesapal_request_data: CartXMLOrder
        }

        let CartXML = encodeURIComponent(CartXMLOrder);

        let Ordered = {};

        Object.keys(Parameters).sort().forEach(key => {

          Ordered[key] = Parameters[key];
        });

        let encodedParameters = ``;

        for (let k in Ordered) {

          let encodedValue = escape(Ordered[k]);

          let encodedKey = encodeURIComponent(k);

          if (encodedParameters === ``) encodedParameters += encodeURIComponent(`&${encodedKey}=${encodedValue}`);

          else encodedParameters += encodeURIComponent(`&${encodedKey}=${encodedValue}`)

        }

        let method = `POST`;

        let encodedUrl = encodeURIComponent(path);

        encodedParameters = encodeURIComponent(encodedParameters);

        let baseString = `${method}&${encodedUrl}&${encodedParameters}`

        let secretKey = `xp7hGvRfmQAFOyYcNO9eBBna6Ps=`;

        let signingKey = `${secretKey}&`;

        /*let signature = crypto.createHmac(`sha1`, signingKey)
          .update(baseString).digest().toString(`base64`);

        signature = encodeURIComponent(signature);console.log(signature)

        let signature = OAuthSign.generate(
          `POST`,
          path,
          {
            oauth_callback: `https://corrde.com`,
            oauth_consumer_key: `Pj4NoJh0Onuadd6l/mI60SF7nPhyPXi8`,
            oauth_nonce: timeStamp,
            oauth_signature_method : `HMAC-SHA1`,
            oauth_timestamp: timeStamp,
            //oauth_version : `1.0`,
            pesapal_request_data: CartXML
          },

          `xp7hGvRfmQAFOyYcNO9eBBna6Ps=`);

        let Query = `oauth_callback=https://corrde.com&oauth_consumer_key=${encodeURIComponent(`Pj4NoJh0Onuadd6l/mI60SF7nPhyPXi8`)}&oauth_nonce=${timeStamp}&oauth_signature=${signature}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=${timeStamp}&oauth_version=1.0&pesapal_request_data=${CartXML}`;

*/
        let timeStamp = Date.now();

        /*let Parameters = {
            'method': 'GET',
            'url': 'https://api.flutterwave.com/v3/transactions/123456/verify',
            'headers': {
              'Content-Type': 'application/json',
    
              'Authorization': 'Bearer FLWSECK-9da614832e3764fcdfa1eb9914f09d88-X'
  }};*/
        
        let Parameters = {
          method: `POST`,
          url: 'https://api.flutterwave.com/v3/payments',
          headers: {
            'Authorization': 'Bearer FLWSECK-9da614832e3764fcdfa1eb9914f09d88-X'
          },
          form: {
            tx_ref: timeStamp,
            amount: 100,
            currency: `KES`,
            redirect_url: `https://corrde.com/receipt/${timeStamp}`,
            payment_options: `mpesa`,
            meta: {
              consumer_id: Args.u_md5,
            },
            customer: {
              email: `mannasugo@gmail.com`,
              name: `Mann Asugo`
            }
          }
        };

        UrlCall(Parameters, (error, response) => { 
            if (error) throw new Error(error);
            console.log(response.body);
        });
        
        //tcp.emit(`payArgString`, {logSocket: Args.logSocket_pay, post_to: path, query: Query})
      })

      let Data = new Auxll();

      tls.on(`sales`, J => {

        Data.Stores(A => {

          tcp.emit(`sales`, {
            log_secs: J,
            ModelSales: model.ModalSales(A)});
        })
      })

      tls.on(`sale`, J => {

        Data.Stores(A => {

          tcp.emit(`sale`, {
            log_secs: J.log_secs,
            ModelSale: model.ModalSale(A, J.log_md5)});
        })
      });

      tls.on(`edit_sale`, J => {

        Data.Stores(A => {

          let Stores = A;

          let Deals, saleClass, saleOff, saleState;

          let log = new Date().valueOf();

          let log_sum = crypto.createHash(`md5`).update(`${log}`, `utf8`).digest(`hex`);

          if (J.saleClass === `daily`) {

            Deals = A.Dailies;

            saleClass = J.saleClass

            saleOff = (2 * 86400000) + log;
          }

          if (Deals[1].length > 0) {

            if (Deals[1].indexOf(J.log_md5) > -1) {

              let Deal = A.DealsMap[Deals[0][Deals[1].indexOf(J.log_md5)]];

              let DealString = JSON.stringify(Deal);

              Deal.sale_state = false;

              saleOff = Deal.sale_off_log_secs;

              new Sql().multi({}, 
                `update sales set json = '${JSON.stringify(Deal)}' where json = '${DealString}'`, (A, B, C) => {});
            }

            else if (Deals[1].indexOf(J.log_md5) === -1) {

              saleOff = A.Deals[0].sale_off_log_secs;
            }
          }

          new Sql().to([`sales`, {json: JSON.stringify({
            asset_md5: J.log_md5,
            deal: J.deal,
            log_md5: log_sum,
            log_secs: log,
            sale_class: saleClass,
            sale_off_log_secs: saleOff,
            sale_state: true})}], (A, B, C) => {

              Data.Stores(A => {

                tcp.emit(`edit_sale`, {
                  log_secs: J.log_secs,
                  ModelSale: model.ModalSale(A, J.log_md5)});});

            })
        })
      });

      tls.on(`root`, J => {

        Data.Stores(A => {

          let Stores = A;

          Data.logs_u_md5(A => {

            tcp.emit(`root`, {
              log_secs: J.log_secs,
              ModelRoot: [
                model.ModelRoot(A, Stores),
                model.ModelRootAlpha(A.md5Key, J.mug),
                model.loadDOMModalView([model.modalView([model.ModalZones()])], `ModelZones`),
                model.loadDOMModalView([model.modalView([model.ModalRegions(J.locale)])], `ModalRegions`), 
                model.footer()]
              });
          })
        });
      });

      tls.on(`locale`, J => {

        Data.Sell(A => {

          tcp.emit(`locale`, {
            log_secs: J.log_secs,
            regions: RetailMaps[J.locale],
            ModelZonal: model.ModelZone(J.locale, A)});
          })
      });

      tls.on(`zonal`, J => {

        Data.Sell(A => {

          let Sell = A;

          Data.logs_u_md5(A => {

            tcp.emit(`zonal`, {
              log_secs: J.log_secs,
              regions: RetailMaps[J.locale],
              ModelZonal: [
                model.ModelZone(J.locale, Sell),
                model.ModelRootAlpha(A.md5Key, J.mug),
                model.loadDOMModalView([model.modalView([model.ModalZones()])], `ModelZones`),
                model.loadDOMModalView([model.modalView([model.ModalMyCart()])], `ModalMyCart`),
                model.loadDOMModalView([model.modalView([model.ModalSets()])], `ModalSets`),
                model.loadDOMModalView([model.modalView([model.ModalRegions(J.locale)])], `ModalRegions`),
                model.loadDOMModalView([model.modalView([model.ModalCreateStore()])], `ModalCreateStore`),   
                model.footer()]
              });
          })
        });
      });

      tls.on(`retailStock`, J => {

        Data.Sell(A => {

          let Sell = A;

          if (!Sell.Sell[1][J.route[1]] || (Sell.Sell[1][J.route[1]].shop).toLowerCase() !== J.route[0]) return;

          Data.logs_u_md5(A => {

            tcp.emit(`retailStock`, {
              alpha: Sell.Sell[1][J.route[1]].alpha + ` - ` + J.route[0] + ` | Corrde Stores`,
              log_secs: J.log_secs,
              regions: RetailMaps[Sell.Sell[1][J.route[1]].market],
              ModelRetailStock: [
                model.ModelRetailStock(Sell, J.route[1]),
                model.ModelRootAlpha(A.md5Key, J.mug),
                model.loadDOMModalView([model.modalView([model.ModalZones()])], `ModelZones`),
                model.loadDOMModalView([model.modalView([model.ModalMyCart()])], `ModalMyCart`),
                model.loadDOMModalView([model.modalView([model.ModalSets()])], `ModalSets`),
                model.loadDOMModalView([model.modalView([model.ModalRetailRates(Sell.Sell[1][J.route[1]].market)])], `ModalRetailRates`),
                model.loadDOMModalView([model.modalView([model.ModalRegions(Sell.Sell[1][J.route[1]].market)])], `ModalRegions`),
                model.footer()]
              });
          })
        });
      });

      tls.on(`retailSet`, J => {

        Data.Sell(A => {

          let Sell = A,

            Shelf = [];

          Sell.Sell[0].forEach(Stock => {

            if (Stock.mass && Stock.set === J.retailSet && Stock.market === J.locale) Shelf.push(Stock);
          })

          if (!Shelf.length > 0) return;

          Data.logs_u_md5(A => {

            tcp.emit(`retailSet`, {
              log_secs: J.log_secs,
              regions: RetailMaps[J.locale],
              ModelRetailSet: [
                model.ModelRetailSet(J.retailSet, J.locale, Shelf),
                model.ModelRootAlpha(A.md5Key, J.mug),
                model.loadDOMModalView([model.modalView([model.ModalZones()])], `ModelZones`),
                model.loadDOMModalView([model.modalView([model.ModalMyCart()])], `ModalMyCart`),
                model.loadDOMModalView([model.modalView([model.ModalSets()])], `ModalSets`),
                model.loadDOMModalView([model.modalView([model.ModalRegions(J.locale)])], `ModalRegions`),
                model.footer()]
              });
          })
        });
      });

      tls.on(`billings`, J => {

        Data.logs_u_md5(A => {

          tcp.emit(`billings`, {
            log_secs: J.log_secs,
            ModelRetailBill: [
              //model.ModelRetailSet(J.retailSet, J.locale, Shelf),
              model.ModelRootAlpha(A.md5Key, J.mug),
              model.loadDOMModalView([model.modalView([model.ModalZones()])], `ModelZones`),
              //model.loadDOMModalView([model.modalView([model.ModalRegions()])], `ModalRegions`),
              model.footer()]
            });
        })
      });

      tls.on(`flutterwave`, Args => {

        if (Args.myCart.length === 0) return [];

        let sum = 0, mass = 0;

        Args.myCart.forEach(Stock => {

          sum += Stock.dollars*Stock.items

          mass += Stock.mass*Stock.items

        });

        let Meta = Args.myCart[0];

        let Sum = (sum*Meta.swap).toFixed(2);

        let RegionSet, Range, Grams, Sell;

        Args.myRegion.zones.forEach(Region => {

          if (Region.locale === Args.Billto[0]) RegionSet = Region;
        });

        RegionSet.rates.forEach(Rate => {

          if (Rate.saleSetAlpha[1] > sum && sum > Rate.saleSetAlpha[0]) {

            Range = Rate.saleSetAlpha;

            Rate.grams.forEach(Mass => {

              if (Mass.gramSetAlpha[0] < mass && mass < Mass.gramSetAlpha[1]) {

                Grams = Mass.gramSetAlpha;

                Sell = Mass.sale;
              }
            })
          }
        })

        let Gross = parseFloat(Sum) + parseFloat(Sell[1])*Meta.swap

        let timeStamp = Date.now();

        let payer = Args.log_secs;

        if (Args.u_md5) payer = Args.u_md5;

        let logSum = crypto.createHash(`md5`).update(`${timeStamp}`, `utf8`).digest(`hex`);

        let Pay = {
          method: `POST`,
          url: 'https://api.flutterwave.com/v3/payments',
          headers: {'Authorization': 'Bearer FLWSECK-9da614832e3764fcdfa1eb9914f09d88-X'},
          form: {
            tx_ref: logSum,
            amount: Gross,
            currency: `KES`,
            redirect_url: `https://corrde.com/payrequest/${logSum}/`,
            payment_options: `mpesa`,
            meta: {
              consumer_id: payer,
            },
            customer: {
              email: `financedev@corrde.com`,
              name: `express pay`
            }
          }
        };

        UrlCall(Pay, (error, Pull) => {

          if (error) throw new Error(error);
            
          else {

            let S = JSON.parse(Pull.body)

            Args.Pay = [timeStamp, logSum, S.data.link];

            new Sql().to([`payrequest`, {json: JSON.stringify({
              bag: Args.myCart,
              complete: false,
              dollars: sum,
              gArray: [Args.locale, Args.Billto[0], Args.gArray], 
              mass: mass,
              MD5: logSum,
              paid: false,
              pay: Gross,
              payer: payer,
              secs: timeStamp})}], (A, B, C) => {

                tcp.emit(`flutterwave`, Args)
            })
          }
        });
      });

      tls.on(`pullPays`, J => {

        Data.Sell(A => {

          let Sell = A,

            Pays = [];

          Sell.Pay[0].forEach(Pay => {

            if (Pay.payer === J.mug) Pays.push(Pay);
          })

          if (!Pays.length > 0) return;

          Data.logs_u_md5(A => {

            tcp.emit(`pullPays`, {
              log_secs: J.log_secs,
              ModelPullPays: [
                model.ModelPullPays(Pays),
                model.ModelRootAlpha(A.md5Key, J.mug),
                model.loadDOMModalView([model.modalView([model.ModalZones()])], `ModelZones`),
                model.loadDOMModalView([model.modalView([model.ModalMyCart()])], `ModalMyCart`),
                model.loadDOMModalView([model.modalView([model.ModalSets()])], `ModalSets`),
                model.loadDOMModalView([model.modalView([model.ModalRegions(J.locale)])], `ModalRegions`)]
              });
          })
        });
      });

      tls.on(`pullStalls`, J => {

        Data.Sell(A => {

          let Sell = A, MyStalls = [], Stalls = [[], [], [], Sell.Stalls[1]];

          Sell.Stalls[0].forEach(Stall => {

            if (Stall.caller === J.mug) MyStalls.push(Stall);

            Stall.locales.forEach(Area => {

              if (Area.locale.toLowerCase() === J.locale) {

                Stalls[1].push(Stall.MD5);

                Stalls[0].push(Stall)
              }
            })
          });

          Sell.Pledge[0].forEach(Row => {

            if (Stalls[1].indexOf(Row.stall) > -1) Stalls[2].push(Row)
          });

          if (!Stalls[0].length > 0 && !MyStalls.length > 0) return;

          Data.logs_u_md5(A => {

            tcp.emit(`pullStalls`, {
              log_secs: J.log_secs,
              ModelPullStalls: [
                model.ModelPullStalls(Stalls, MyStalls),
                model.ModelRootAlpha(A.md5Key, J.mug),
                model.loadDOMModalView([model.modalView([model.ModalZones()])], `ModelZones`),
                model.loadDOMModalView([model.modalView([model.ModalMyCart()])], `ModalMyCart`),
                model.loadDOMModalView([model.modalView([model.ModalSets()])], `ModalSets`),
                model.loadDOMModalView([model.modalView([model.ModalRegions(J.locale)])], `ModalRegions`)]
              });
          })
        });
      });

      tls.on(`pullStallControls`, J => {

        Data.Sell(A => {

          let Sell = A, Stall = [], Catalogue = [{}, {}], Pledge = [];

          Sell.Stalls[0].forEach(Row => {

            if (Row.caller === J.mug && Row.MD5 === J.stall) Stall.push(Row);
          });

          Sell.Pledge[0].forEach(Row => {

            if (Row.caller === J.mug && Row.stall === J.stall) Pledge.push(Row);
          });

          if (!Stall.length > 0) return;

          SellSet.forEach(Stack => {

            Catalogue[0][Stack[0]] = Stack[1];

            Stack[1].forEach(Stock => {

              Catalogue[1][Stock[0]] = Stock[1];
            })
          });

          Data.logs_u_md5(A => {

            tcp.emit(`pullStallControls`, {
              catalogue: Catalogue,
              log_secs: J.log_secs,
              ModelPullStallControls: [
                model.ModelPullStallControls(Stall[0], Pledge),
                model.loadDOMModalView([model.modalView([model.ModalStallCountry()])], `ModalStallCountry`),
                model.loadDOMModalView([model.modalView([model.ModalStallCountry()])], `ModalStallCities`),
                model.loadDOMModalView([model.modalView([model.ModalSellSet()])], `ModalSellSet`)]
              });
          })
        });
      });

      tls.on(`pushStallCities`, J => {

        Data.Sell(A => {

          let Sell = A, Stall = [], Pledge = [];

          Sell.Stalls[0].forEach(Row => {

            if (Row.caller === J.mug && Row.MD5 === J.stall) Stall.push(Row);
          });

          Sell.Pledge[0].forEach(Row => {

            if (Row.caller === J.mug && Row.stall === J.stall) Pledge.push(Row);
          });

          if (Stall.length === 0) return;

          let StallString = JSON.stringify(Stall[0]);

          Stall[0].locales.push({
            locale: J.StallZones[0], cities: J.StallZones[1]});

          new Sql().multi({}, 
            `update fronts set json = '${JSON.stringify(Stall[0])}' where json = '${StallString}'`, (A, B, C) => {

          Data.logs_u_md5(A => {

            tcp.emit(`pullStallControls`, {
              log_secs: J.log_secs,
              ModelPullStallControls: [
                model.ModelPullStallControls(Stall[0], Pledge),
                model.loadDOMModalView([model.modalView([model.ModalStallCountry()])], `ModalStallCountry`),
                model.loadDOMModalView([model.modalView([model.ModalStallCountry()])], `ModalStallCities`),
                model.loadDOMModalView([model.modalView([model.ModalSellSet()])], `ModalSellSet`)]
              });
          })
            });
            
        })
      });

      tls.on(`pullStall`, J => {

        Data.Sell(A => {

          let Sell = A, Stalls = [];

          Sell.Stalls[0].forEach(Stall => {

            if (Stall.MD5 === J.pullStall) Stalls.push(Stall);

          });

          //if (!Stalls.length > 0 && !MyStalls.length > 0) return;

          Data.logs_u_md5(A => {

            tcp.emit(`pullStall`, {
              log_secs: J.log_secs,
              ModelPullStall: [
                model.ModelPullStall(Stalls[0]),
                model.ModelRootAlpha(A.md5Key, J.mug),
                model.loadDOMModalView([model.modalView([model.ModalZones()])], `ModelZones`),
                model.loadDOMModalView([model.modalView([model.ModalMyCart()])], `ModalMyCart`),
                model.loadDOMModalView([model.modalView([model.ModalSets()])], `ModalSets`),
                model.loadDOMModalView([model.modalView([model.ModalRegions(J.locale)])], `ModalRegions`)]
              });
          })
        });
      });


      /**
      @dev
      **

      let tlsReq = tls.id;

      if (!tlsReqs.hasOwnProperty(tlsReq)) {

        tlsReqs[tlsReq] = 1;
        tlsCount++;

        tls.emit(`analytics_reqs`, {tls_reqs: tlsCount});
      }

      /**
      @enddev
      **/

      tls.on(`analytics`, msg => {

        new Sql().multi({}, conca, (A, B, C) => {

          if (B && parseInt(B[0].length)) allJobs = B[0];

          let allPro = new Map(),
              openTasks = new Map(),
              fCount = 0;

          if (B && B[0]) {

            for (let task in B[0]) {

              if (B[0][task].blab[0] === `{`) {

                let alt_ = JSON.parse(B[0][task].blab);

                if (alt_.is_open === true) {

                    openTasks.set(alt_.ini_sum, alt_.sum);
                }

              }
            }

            for (let field in config.fields) {

              let sFields = [];

              for (let task in B[0]) {

                if (B[0][task].blab[0] === `{`) {

                  let alt_ = JSON.parse(B[0][task].blab);

                  if (field === alt_.field) {

                    sFields.push(alt_.subfield)
                  }
                }
              }
              
              let fieldModus;

              if (allJobs.length === 0) {

                fieldModus = 0;
              } 

              else {

                fieldModus = parseInt(sFields.length/allJobs.length) * 100;
              }

              fieldCount[fCount] = {field: field, count: sFields.length, modulus: fieldModus}
              fCount++
            }
          }

          if (B && B[1]) {

            for (let auth in B[1]) {

              if (B[1][auth].alt[0] === `{`) {

                let alt_ = JSON.parse(B[1][auth].alt);

                if (alt_.skills.length > 0) {

                  allPro.set(alt_.sum, alt_.skills);
                }
              }
            }
          }

          let openMod, proMod;

          if (allPro.size === 0 || allJobs.length === 0) {

            openMod = 0;
            proMod = 0;
          } 

          else {

            openMod = parseInt(openTasks.size/allJobs.length * 100);
            proMod = parseInt(dualValids.length/allPro.size * 100);
          }
          
          fieldCount.sort((a,b) => {
            return (b.count.length - a.count.length)});

          tls.emit(`quick_analytics`, {
            all_active_pros: dualValids.length,
            all_jobs: allJobs.length,
            all_pro: allPro.size,
            field_count: fieldCount,
            open_modulus: openMod,
            pro_modulus: proMod})
        });

      })

      tls.on(`is_au`, u => {

        if (u.in && !valids[u.in]) {

          valids[u.in] = u.in;

          if (u.is_valid_dual === true && (u.gps && u.gps !== false)) {

            dualValids.push({
              ava: u.ava,
              fields: u.fields,
              full: u.full,
              gps: u.gps,
              per: u.per,
              sum: u.in,})
          }

          regreqs.push({log: u.in});
        }

        else if (u.log && !logs[u.log]) {

          logs[u.log] = u.log;

          reqs.push({secs: u.log})
        }

        for (let valid in dualValids) {

          if (new Auxll().locusGPS(u.gps, dualValids[valid].gps, .010) === true) {

            locusValid[valid] = {};
            locusValid[valid][`ava`] = dualValids[valid].ava;
            locusValid[valid][`fields`] = dualValids[valid].fields;
            locusValid[valid][`full`] = dualValids[valid].full;
            locusValid[valid][`gps`] = dualValids[valid].gps;
            locusValid[valid][`per`] = dualValids[valid].per;
            locusValid[valid][`sum`] = dualValids[valid].sum;
          }
        }

        tls.emit(`quick_analytics`, {
          all_active_pros: dualValids.length,
          locus_valid: locusValid, reqs: tls.conn.server.clientsCount});

      });

      tls.on(`app_analytics`, js => {

        //poolReqs.push(tls.conn.server.clientsCount);

        new Auxll().appAnalytics(A => {

          /**
          @dev; call before async above, if ever bug

          if (js.log && !logs[js.log]) {

            logs[js.log] = js.log;

            reqs.push({secs: js.log})
          }
          **/

          let rawPlus = 0;

          if (A[`raw`][0][`poolDay`].length > A[`raw`][1][`poolDay`].length) {

            rawPlus = A[`raw`][0][`poolDay`].length - A[`raw`][1][`poolDay`].length
          }

          let poolAct = A[`acts`][0];

          let values = [
            A[`raw`][0][`poolDay`].length, tls.conn.server.clientsCount, rawPlus,
            tls.conn.server.clientsCount, regreqs.length, (tls.conn.server.clientsCount - regreqs.length),
            A.regs[0][`poolDay`].length, A.regs[0][`pool2`].length, A.regs[0][`pool0`].length, A.regs[0][`gain`].length,
            poolAct[`poolDay`].length, poolAct[`avails`].length, poolAct[`gain`].length];

          tls.emit(`analytics_reqs`, {
            app: values, tls_reqs: tls.conn.server.clientsCount, pool_reqs: poolReqs});
        });
      });
      
      tls.on(`disconnect`, () => {

        valids = [];
        dualValids = [];
        locusValid = [];
        reqs = [];
        regreqs = [];

        /**
        @dev; result might vary with endianness
        **

        if (tlsReqs.hasOwnProperty(tls.id)) {

          delete tlsReqs[tls.id];
          tlsCount--;

          tls.emit(`analytics_reqs`, {tls_reqs: tlsCount});
        }

        /**
        @enddev
        **/

        

          let _area_md5 = []

          let SQ_u_md5 = [];

          /*new Auxll().logs_u_md5(A => {

            emit_md5.forEach(_pos => {

              if (area_umd5 && _pos !== area_umd5) {

                _area_md5.push(_pos);
                
                if (key_md5[_pos]) SQ_u_md5.push(key_md5[_pos]);
              }
            });

            //logs_md5 = SQ_u_md5;

            tcp.emit(`area_md5`, [SQ_u_md5, _area_md5])
        })*/
        

        if (tls.handshake.headers.cookie && cookie.parse(tls.handshake.headers.cookie).dev_md5) {

          new Sql().to([`devs_traffic`, {json: JSON.stringify(tls.handshake)}], (A, B, C) => {});}

        else if (tls.handshake.headers.cookie && cookie.parse(tls.handshake.headers.cookie).u) {

          new Sql().to([`u_md5_logs`, {json: JSON.stringify(tls.handshake)}], (A, B, C) => {});}

      });
    });
  }
}

class AJXReqs extends Auxll {

  constructor (levels, args, req, res) {
    super();
    this.levels = levels;
    this.args = args;
    this.app = {fro: req, to: res};
  }

  createCookie (field, value) {

    this.app.to.setHeader(`Set-Cookie`, cookie.serialize(field, value, {
      httpOnly: true,
      path: `/`,
      secure: true}));
  }

  AJXCalls () {

    if (this.levels[1] === `devs_reqs`) {

      if (this.args.createDev) this.createDev(JSON.parse(this.args.createDev));

      else if (this.args.AddCreds) this.AddCreds(JSON.parse(this.args.AddCreds));

      else if (this.args.accessDev) this.accessDev(JSON.parse(this.args.accessDev));

      else if (this.args.devPassReset) this.devPassReset(JSON.parse(this.args.devPassReset));

      else if (this.args.setGPSCookie) this.setGPSCookie(JSON.parse(this.args.setGPSCookie));

      else if (this.args.appendDevs) this.appendDevs(JSON.parse(this.args.appendDevs));

      else if (this.args.pushSupportMsg) this.pushSupportMsg(JSON.parse(this.args.pushSupportMsg));

      else if (this.args.setMD5Cookie) this.setMD5Cookie(JSON.parse(this.args.setMD5Cookie));

       else if (this.args.pushStory) this.pushStory(JSON.parse(this.args.pushStory));

       else if (this.args.pushStoryMail) this.pushStoryMail(JSON.parse(this.args.pushStoryMail));

      else if (this.args.pushStoryMail2) this.pushStoryMail2(JSON.parse(this.args.pushStoryMail2));

      else if (this.args.pushJob) this.pushJob(JSON.parse(this.args.pushJob));

      else if (this.args.pushApps) this.pushApps(JSON.parse(this.args.pushApps));

      else if (this.args.pushCreds) this.pushCreds(JSON.parse(this.args.pushCreds));

      else if (this.args.StockSet) this.StockSet(JSON.parse(this.args.StockSet));

      /** **/

      else if (this.args.AddStock) this.AddStock(JSON.parse(this.args.AddStock));

      else if (this.args.localeCookie) this.localeCookie(JSON.parse(this.args.localeCookie));

      else if (this.args.CreateStore) this.CreateStore(JSON.parse(this.args.CreateStore));

      else if (this.args.pushSellArgs) this.pushSellArgs(JSON.parse(this.args.pushSellArgs));

      else if (this.args.SetAlterArgs) this.SetAlterArgs(JSON.parse(this.args.SetAlterArgs));
    }
  }

  createDev (args) {

    if (args.devs_token !== `mannasugo`) {

      this.app.to.writeHead(200, config.reqMime.json);
      this.app.to.end(JSON.stringify({exit: false}))
    }

    else {

      let log = new Date().valueOf();

      let log_sum = crypto.createHash(`md5`).update(`${log}`, `utf8`).digest(`hex`);

      let pass_sum = crypto.createHash(`md5`).update(args.devs_pass, `utf8`);

      new Sql().to([`devs`, {
        json: JSON.stringify({
          access: [`universal`],
          alt: args.devs_name,
          alt2: args.devs_surname,
          ava: false,
          dev: `001`,
          dev_log: log,
          dev_md5: log_sum,
          group: `Research & Development`,
          mail: `mannasugo@devs.corrde.com`,
          role: `Systems Architect`,
          pass: pass_sum.digest(`hex`),
          pass_reset: false})}], (A, B, C) => {

            this.createCookie(`dev_md5`, log_sum);

            this.app.to.writeHead(200, config.reqMime.json);
            this.app.to.end(JSON.stringify({exit: true}))
        })
    }
  }

  accessDev (args) {

    let conca = `select * from devs`;

    new Sql().multi({}, conca, (A, B, C) => {

      let poolDev = [];

      for (let dev in B) {

        let obj = JSON.parse(B[dev].json)

        if (obj.mail === args.dev) poolDev.push(obj);
      }

      if (poolDev.length === 1) {

        let hexPass = crypto.createHash(`md5`).update(args.pass, `utf8`);

        if (poolDev[0].pass === hexPass.digest(`hex`)) {

          this.createCookie(`dev_md5`, poolDev[0].dev_md5);

          this.app.to.writeHead(200, config.reqMime.json);
          this.app.to.end(JSON.stringify({exit: true}));
        }
      }
    });
  }

  getCookie (is, call) {

    let A = true;

    let B = null;

    if (this.app.fro.headers.cookie) {

      let cJar = cookie.parse(this.app.fro.headers.cookie);

      if (!cJar[is]) A = true;

      else {

        A = false;

        B = cJar[is];
      }

    } 

    else A = true;

    call(A, B);
  }

  devPassReset (args) {

    this.getCookie(`dev_md5`, (A, B) => {

      if (A === false) {

        this.availDev(args.dev_md5, A => {

          let dev = JSON.stringify(A.dev[0]);

          let pass_md5 = crypto.createHash(`md5`).update(args.pass_reset, `utf8`);

          A.dev[0].pass = pass_md5.digest(`hex`);
          A.dev[0].pass_reset = true;

          new Sql().multi({}, 
            `update devs set json = '${JSON.stringify(A.dev[0])}' where json = '${dev}'`,
            (A, B, C) => {

            this.app.to.writeHead(200, config.reqMime.json);
              this.app.to.end(JSON.stringify({exit: true}));
            })
        })
      }
    });
  }

  setGPSCookie (q) {

    this.createCookie(`gps`, JSON.stringify(q.gps));

    this.app.to.setHeader(`Content-type`, `application/json`)
    this.app.to.writeHead(200, config.reqMime.json);
    this.app.to.end(JSON.stringify({exit: true}));
  }

  appendDevs (args) {

    this.getCookie(`dev_md5`, (A, B) => {

      if (A === false) {

        new Sql().multi({}, 
          `select * from devs`, (A, B, C) => {

            let devsObj = [];

            let joinObj = {};

            for (let dev in B) {

              let obj = JSON.parse(B[dev].json);

              joinObj[obj.dev_md5] = obj;

              if (obj.alt.toLowerCase() === args.add_devs_alt.toLowerCase() && obj.alt2.toLowerCase() === args.add_devs_alt2.toLowerCase()) devsObj.push(obj);
            }

            let mail = `${args.add_devs_alt.toLowerCase()}${args.add_devs_alt2.toLowerCase()}@devs.corrde.com`;

            if (devsObj.length > 1) mail = `${args.add_devs_alt.toLowerCase()}${args.add_devs_alt2.toLowerCase()}${devsObj.length + 1}@devs.corrde.com`;
            
            let log = new Date().valueOf();

            let log_sum = crypto.createHash(`md5`).update(`${log}`, `utf8`).digest(`hex`);

            let pass_sum = crypto.createHash(`md5`).update(`00${B.length + 1}`, `utf8`);

            let access = [];

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

            if (teams[0][1].indexOf(args.add_devs_role) !== -1) access.push(`universal`);

            else if (teams[2][1][0] === args.add_devs_role) access.push(`group`);

            else if (teams[3][1].indexOf(args.add_devs_role) !== -1) access.push(`group`);

            let pushObj = {
              access: access,
              alt: args.add_devs_alt,
              alt2: args.add_devs_alt2,
              ava: false,
              dev: `00${B.length + 1}`,
              dev_log: log,
              dev_md5: log_sum,
              group: args.add_devs_team,
              mail: mail,
              role: args.add_devs_role,
              pass: pass_sum.digest(`hex`),
              pass_reset: false};

            new Sql().to([`devs`, {
              json: JSON.stringify(pushObj)}], (A, B, C) => {

                new Sql().to([`devs_mail`, {json: JSON.stringify({
                  alt_src: joinObj[args.dev_md5].alt + ` ` + joinObj[args.dev_md5].alt2,
                  alt_to: args.add_devs_alt + ` ` + args.add_devs_alt2,
                  group: `alerts`,
                  log_md5: log_sum,
                  mail: pushObj,
                  mail_log: log,
                  mail_md5: log_sum,
                  read: false,
                  src_md5: args.dev_md5,
                  to_md5: log_sum,
                  title: `New team addition`,
                  type: `push dev`})}], (A, B, C) => {

                      this.app.to.writeHead(200, config.reqMime.json);
                      this.app.to.end(JSON.stringify({exit: true}));
                });
            })
        })
      }
    });
  }

  pushSupportMsg (args) {

    this.getDevsMail( A => {

      if (!A[2].length > 0) return;

      let md5 = false;

      let dev = A[2][0];

      let log = new Date().valueOf();

      let log_sum = crypto.createHash(`md5`).update(`${log}`, `utf8`).digest(`hex`);

      if (args.md5) md5 = args.u_md5

      new Sql().to([`support_mail`, {json: JSON.stringify({
        group: `helps`, //support requests
        log_md5: log_sum,
        mail: args.quiz_to_devs,
        mail_log: log,
        mail_md5: log_sum,
        mailto: args.mail_to_devs,
        read: false,
        risk: args.support_msg,
        src_md5: md5,
        to_md5: dev.dev_md5,
        title: args.subj_to_devs,
        type: `quizes`})}], (A, B, C) => {
        
          this.app.to.writeHead(200, config.reqMime.json);
          this.app.to.end(JSON.stringify({exit: true}));
      });
    })
  }

  setMD5Cookie (args) {

    this.createCookie(`u_md5`, JSON.stringify(args.in));

    this.app.to.writeHead(200, config.reqMime.json);
    this.app.to.end(JSON.stringify({exit: true}));
  }

  pushStory (args) {

    this.getCookie(`u`, (A, B) => {

      if (A === false) {

        let log = new Date().valueOf();

        let log_sum = crypto.createHash(`md5`).update(`${log}`, `utf8`).digest(`hex`);

        let img = [{src: args.u_md5_pfolio_img, img_2d: [args.pfolio_img_x, args.pfolio_img_y]}];

        new Sql().to([`stories`, {json: JSON.stringify({
          geo: args.gps,
          img: img,
          log_md5: log_sum,
          log_secs: log,
          mail: [],
          mail2: [], tag: [args.pfolio_field, args.pfolio_service],
          text: args.pfolio_text,
          u_md5: args.u_md5})}], (A, B, C) => {

            new Sql().multi({}, 
              `select * from u`,
              (A, B, C) => {

              let md5;

              for (let u in B) {

                let Obj = JSON.parse(B[u].alt);

                if (Obj.sum === args.u_md5) md5 = Obj;
              }

              let _md5 = JSON.stringify(md5);

              let _field = md5.skills.toString().replace(new RegExp(`,${args.pfolio_field}_${args.pfolio_service}`, `g`), ``);

             _field = _field.replace(new RegExp(`${args.pfolio_field}_${args.pfolio_service},`, `g`), ``);

              _field += `,${args.pfolio_field}_${args.pfolio_service}`;

              md5.skills = _field.split(`,`);

              new Sql().multi({}, 
                `update u set alt = '${JSON.stringify(md5)}' where alt = '${_md5}'`,
                (A, B, C) => {
        
                  this.app.to.writeHead(200, config.reqMime.json);
                  this.app.to.end(JSON.stringify({exit: true}));
                })
              })
          });
      }
    });
  }

  pushStoryMail (args) {

    this.getCookie(`u`, (A, B) => {

      if (A === false) {

        let log = new Date().valueOf();

        let log_sum = crypto.createHash(`md5`).update(`${log}`, `utf8`).digest(`hex`);

        new Sql().multi({}, 
          `select * from stories`,
          (A, B, C) => {

          let md5;

          for (let polygs in B) {

            let Obj = JSON.parse(B[polygs].json);

            if (Obj.log_md5 === args.pfolio_log_md5) md5 = Obj;
          }

          let _md5 = JSON.stringify(md5);

          let mail = {log_md5: log_sum, log_secs: log, mail: args.pfolio_mail, u_md5: args.u_md5};

          md5.mail.push(mail);

              new Sql().multi({}, 
                `update stories set json = '${JSON.stringify(md5)}' where json = '${_md5}'`,
                (A, B, C) => {
        
                  this.app.to.writeHead(200, config.reqMime.json);
                  this.app.to.end(JSON.stringify({exit: true}));
                })
              })
      }

    });
  }

  pushStoryMail2 (args) {

    this.getCookie(`u`, (A, B) => {

      if (A === false) {

        let log = new Date().valueOf();

        let log_sum = crypto.createHash(`md5`).update(`${log}`, `utf8`).digest(`hex`);

        new Sql().multi({}, 
          `select * from stories`,
          (A, B, C) => {

          let md5;

          for (let polygs in B) {

            let Obj = JSON.parse(B[polygs].json);

            if (Obj.log_md5 === args.pfolio_log_md5) md5 = Obj;
          }

          let _md5 = JSON.stringify(md5);

          let mail2 = md5.mail2.toString();

          if (mail2.match(`${args.u_md5},`)) mail2 = mail2.replace(new RegExp(`${args.u_md5},`, `g`), ``);

          else if (mail2.match(`,${args.u_md5}`)) mail2 = mail2.replace(new RegExp(`,${args.u_md5}`, `g`), ``);

          else mail2 = `${args.u_md5},` + mail2;

          md5.mail2 = mail2.split(`,`);

              new Sql().multi({}, 
                `update stories set json = '${JSON.stringify(md5)}' where json = '${_md5}'`,
                (A, B, C) => {
        
                  this.app.to.writeHead(200, config.reqMime.json);
                  this.app.to.end(JSON.stringify({exit: true}));
                })
              })
      }

    });
  }

  pushJob (args) {

    this.getCookie(`u`, (A, B) => {

      if (A === false) {

        let log = new Date().valueOf();

        let log_sum = crypto.createHash(`md5`).update(`${log}`, `utf8`).digest(`hex`);

        let img = [{src: args.cover_img, img_2d: [args.cover_img_x, args.cover_img_y]}];

        new Sql().to([`jobs`, {json: JSON.stringify({
          days: args.job_span,
          geo: args.gps,
          img: img,
          log_md5: log_sum,
          log_secs: log,
          apps_mail: [],
          books_mail: [],
          give_mail: [], 
          tag: [args.pfolio_field, args.pfolio_service],
          title: args.job_title,
          text: args.job_text,
          u_md5: args.u_md5,
          USD: args.USD,
          USD_MODE: args.payway})}], (A, B, C) => {
        
          this.app.to.writeHead(200, config.reqMime.json);
          this.app.to.end(JSON.stringify({exit: true}));

        });
      }
    });
  }

  pushApps (args) {

    this.getCookie(`u`, (A, B) => {

      if (A === false) {

        let log = new Date().valueOf();

        let log_sum = crypto.createHash(`md5`).update(`${log}`, `utf8`).digest(`hex`);

        new Sql().multi({}, 
          `select * from jobs`,
          (A, B, C) => {

          let md5;

          let mail = [];

          for (let J in B) {

            let Obj = JSON.parse(B[J].json);

            if (Obj.log_md5 === args.j_md5) md5 = Obj;
          }

          let _md5 = JSON.stringify(md5);

          if (md5.apps_mail.indexOf(args.u_md5) > -1) delete md5.apps_mail[md5.apps_mail.indexOf(args.u_md5)];

          else md5.apps_mail.push(args.u_md5);

          md5.apps_mail.forEach(u => {

            if (u !== null) mail.push(u);
          });

          md5.apps_mail = mail;

              new Sql().multi({}, 
                `update jobs set json = '${JSON.stringify(md5)}' where json = '${_md5}'`,
                (A, B, C) => {
        
                  this.app.to.writeHead(200, config.reqMime.json);
                  this.app.to.end(JSON.stringify({exit: true}));
                })
              })
      }

    });
  }

  pushCreds (args) {

    let conca = `select * from u`;

    new Sql().multi({}, conca, (A, B, C) => {

      let u_md5 = [];

      for (let u in B) {

        let Obj = JSON.parse(B[u].alt);

        if (Obj.mail === args.mail) u_md5[0] = Obj;
      }

      if (u_md5.length === 1) {

        let hexPass = crypto.createHash(`md5`).update(args.pass, `utf8`);

        if (u_md5[0].pass === hexPass.digest(`hex`)) {

          this.createCookie(`u_md5`, u_md5[0].sum);

          this.createCookie(`u`, u_md5[0].sum);

          this.app.to.writeHead(200, config.reqMime.json);
          this.app.to.end(JSON.stringify({exit: true}));
        }
      }
    });
  }

  AddCreds (args) {

    let conca = `select * from u`;

    new Sql().multi({}, conca, (A, B, C) => {

      let is_mail, pool = {};

      for (let u in B) {

        if (B[u].mail === args.ini_mail) is_mail = true;
      }

      if (is_mail !== true) {

        let localSt_ = new Date().valueOf();

          let ini_sum = crypto.createHash(`md5`).update(`${localSt_}`, `utf8`).digest(`hex`);

          let mailPass = crypto.createHash(`md5`).update(args.ini_pass, `utf8`),
              is_ava = false;
          
          new Sql().to([`u`, {
            alt: JSON.stringify({
              appraisal: false,
              ava: is_ava,
              edu: [],
              desc: false,
              full: args.u_md5_alt,
              log: localSt_,
              mail: args.ini_mail,
              pass: mailPass.digest(`hex`),
              skills: [],
              sum: ini_sum,
              wpl: []}),
            mail: args.ini_mail,
            mug: `null`,
            pass: 'mailPass.digest(`hex`)',
            St_: localSt_,
            sum: ini_sum}], (A, B, C) => {

              this.createCookie(`u`, ini_sum);
              //this.createCookie(`u_md5`, ini_sum);

              pool[`is_mail`] = false;

              this.app.to.writeHead(200, config.reqMime.json);
              this.app.to.end(JSON.stringify({exit: true}));
            });
      }

      else pool[err].push(`true_mail`);
    })
  }

  StockSet (args) {

    this.getCookie(`u`, (A, B) => {

      if (A === false) {

        let log = new Date().valueOf();

        let log_sum = crypto.createHash(`md5`).update(`${log}`, `utf8`).digest(`hex`);

        let Asset = [{path: args.asset_img, span: [args.x_span, args.y_span]}];

        new Sql().to([`products`, {json: JSON.stringify({
          asset: Asset,
          asset_alt: args.asset_alt,
          asset_md5: log_sum,
          asset_set: args.set_asset_set,
          asset_set_type: args.set_asset_set_type,
          asset_sex: args.asset_sex,
          asset_USD: args.asset_USD,
          log_secs: log,
          mail: [],
          ratings: [],
          store_md5: args.store_log_md5,
          text: args.asset_more,
          u_md5: args.u_md5})}], (A, B, C) => {

              this.app.to.writeHead(200, config.reqMime.json);
              this.app.to.end(JSON.stringify({exit: true}));});
      }
    });
  }

  AddStock (Args) {

    this.getCookie(`u`, (A, B) => {

      if (A === false) {

        let Rows = Args.AddStock;

        let log = new Date().valueOf();

        let log_sum = crypto.createHash(`md5`).update(`${log}`, `utf8`).digest(`hex`);

        new Sql().to([`inventory`, {json: JSON.stringify({
          alpha: Rows.StockAlpha,
          catalog: Rows.Catalog,
          dollars: Rows.Dollars,
          factory: Rows.Factory,
          feature: Rows.Feature,
          files: Rows.Files,
          fullString: Rows.StockFullString,
          log: log,
          market: Rows.MarketZone,
          mass: Rows.Mass,
          MD5: log_sum,
          orient: Rows.Orient,
          sale: Rows.Sale,
          set: Rows.Set,
          shelf: Rows.Shelf,
          shop: Rows.Shop,
          size: Rows.Size,
          sort: Rows.Sorts,
          state: Rows.StockState,
          units: Rows.Units})}], (A, B, C) => {

            this.app.to.writeHead(200, config.reqMime.json);
            this.app.to.end(JSON.stringify({exit: true, route: [Rows.Shop.toLowerCase(), log_sum]}));
          });
      }
    });
  }

  CreateStore (Args) {

    this.getCookie(`u`, (A, B) => {

      if (A === false) {

        let Store = Args.createStore;

        let log = new Date().valueOf();

        let log_sum = crypto.createHash(`md5`).update(`${log}`, `utf8`).digest(`hex`);

        new Sql().to([`fronts`, {json: JSON.stringify({
          alpha: Store[0],
          alt: Store[2],
          caller: Args.mug,
          cell: Store[1],
          files: [[], []],
          locales: [],
          secs: log,
          MD5: log_sum})}], (A, B, C) => {

            this.app.to.writeHead(200, config.reqMime.json);
            this.app.to.end(JSON.stringify({exit: true, route: [Store[2], log_sum]}));
          });
      }
    });
  }

  pushSellArgs (Args) {

    this.getCookie(`u`, (A, B) => {

      if (A === false) {

        let log = new Date().valueOf();

        let log_sum = crypto.createHash(`md5`).update(`${log}`, `utf8`).digest(`hex`);

        new Sql().to([`listings`, {json: JSON.stringify({
          age: false,
          allString: false,
          alpha: false,
          caller: Args.mug,
          dollars: false,
          feature: false,
          files: [],
          item: Args.pushSellStockArg,
          log: log,
          sex: null,
          sum: log_sum,
          sale: false,
          shelf: Args.pushSellSetArg,
          stall: Args.levels[0],
          unit: false})}], (A, B, C) => {

            this.app.to.writeHead(200, config.reqMime.json);
            this.app.to.end(JSON.stringify({exit: true}));
          });
      }
    });
  }

  SetAlterArgs (J) {

    this.Sell(A => {

      let Sell = A, Stall = [], Pledge = [];

      Sell.Pledge[0].forEach(Row => {

        if (Row.caller === J.mug && Row.stall === J.levels[0] && Row.sum === J.itemAlterKey) Pledge.push(Row);
      });

      if (Pledge.length === 0) return;

      let PledgeString = JSON.stringify(Pledge[0]);

      new Sql().multi({}, 
        `update listings set json = '${JSON.stringify(J.itemAlter[J.itemAlterKey])}' where json = '${PledgeString}'`, (A, B, C) => {

            this.app.to.writeHead(200, config.reqMime.json);
            this.app.to.end(JSON.stringify({exit: true}));
          });
            
        })
      }

  localeCookie (Arg) {

    this.createCookie(`locale`, JSON.stringify(Arg));

    this.app.to.setHeader(`Content-type`, `application/json`)
    this.app.to.writeHead(200, config.reqMime.json);
    this.app.to.end(JSON.stringify({exit: true}));
  }
}

module.exports = {

  AJXReqs: (level, arg, req, res) => new AJXReqs(level, arg, req, res).AJXCalls(),

  mysql () {
    new Sql().ini();
  },

  UAPublic (level, req, res) {
    new UAPublic(level, req, res).handleUACalls();
  },

  SublevelCalls: (level, req, res) => new UAPublic(level, req, res).subCalls(),

  viaAJX (q, to, fro) {
    new ViaAJX(q, to, fro).AJXCalls();
  },

  AJXJPEG(file, req, res) {
    new AJXJPEG(file, req, res).AJXCalls();
  },

  pushReq: (req) => new Auxll().pushReq(req),

  UATCP(tcp) {
    new UATCP().TCPCalls(tcp);
  }
}