`use strict`;

const fs = require(`fs`),
  crypto = require(`crypto`),
  mysql = require(`mysql`),
  cookie = require(`cookie`),
  
  config = require(`./corrde-config`),
  model = require(`./corrde-model`),

  gyro = require(`./corrde-geoJSON`)

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

          if (msgObj.type === `quizes`/*msgObj.to_md5 === devsObj[0].dev_md5*/) {

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

        for (let msg in B[3]) {

          let msgObj = JSON.parse(B[3][msg].json);

          mail2Obj.push(msgObj);
        }

        async([mailObj, mailKeys, devsObj, mail2Obj.sort((a,b) => {return b.mail_log - a.mail_log})]);
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
      ;select * from stories`, (A, B, C) => {

        let u_md5Obj = [];

        let u_md5Key = {};

        let polygs = [];

        const utc_Z = new Date().valueOf();

        const utc_A = new Date(new Date() - (6 * 86400000)).valueOf();

        for (let u in B[0]) {

          let logCount = 0;

          let utcCount = 0;

          let diff = 0;

          let utc;

          let logObj = [];

          let polygs_ = [];

          let md5 = JSON.parse(B[0][u].alt);

          if (md5.ava === false) {md5[`ava`] = this.alternativeMug(md5.full); md5[`ava_alert`] = true;}

          else if (md5.ava !== false) md5[`ava`] = `/` + md5[`ava`];

          md5[`gps`] = false;
          md5[`pre_mail_utc`] = new Date().valueOf();
          md5[`pre_utc`] = new Date().valueOf();
          md5[`reqs_per_secs`] = 0.0;

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

                mailObj.push(logs);

                md5[`pre_mail_utc`] = mailObj.sort((a, b) => {return b.utc - a.utc})[0].utc;
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

          for (let img in B[2]) {

            let pfolio = JSON.parse(B[2][img].json);

            let seen = 0;

            logObj.forEach(logs => {

              if (logs.headers.referer.split(`/`).length > 2 && logs.headers.referer.split(`/`)[4] === pfolio.log_md5) {

                seen++;
              }
            });

            if (miniKey[pfolio.u_md5].ava === false) {pfolio[`ava`] = this.alternativeMug(miniKey[pfolio.u_md5].full);}

            else if (miniKey[pfolio.u_md5].ava !== false) pfolio[`ava`] = `/` + miniKey[pfolio.u_md5].ava;

            pfolio[`full`] = miniKey[pfolio.u_md5].full;

            pfolio[`seen`] = seen;

            if (pfolio.text === false) pfolio.text = `${pfolio.tag[0]}, ${pfolio.tag[1]}`;

            polygs_.push(pfolio);

            polygs_.sort((a,b) => {return b.log_secs - a.log_secs});
          }

          u_md5Obj.push(md5);

          u_md5Key[md5.sum] = md5;

          polygs = polygs_;
        }

        call({md5: u_md5Obj, md5Key: u_md5Key, polygs: polygs});
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
        ;${config.sql.m}
        ;${config.sql.messages}
        ;${config.sql.stories}
        ;${config.sql.support_mail}
        ;${config.sql.traffic}
        ;${config.sql.u}
        ;${config.sql.u_md5_logs}`);
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

    if (this.levelState === ``) this.rootCall();

    /**
    Adhere to Alphabetic Order
    Perpendicularly Bisect Countries to find tiles-to-quadrant origin.
    **/

    if (this.levelState === `contracts`) this.contractsMap();

    if (this.levelState === `devs`) this.toDevs();

    if (this.levelState === `getjobs`) this.getJobs();

    if (this.levelState === `mail`) this.mailSliced();

    if (this.levelState === `monitor`) this.monitor();

    if (this.levelState === `support`) this.support();

    if (this.levelState === `in`) this.in();

    if (this.levelState === `mycontract`) this.formContract();

    if (this.levelState === `myjobs`) this.selfContracts();

    if (this.levelState === `p`) this.p();

    if (this.levelState === `mug`) this.mug();

    if (this.levelState === `quora`) this.quora();

    if (this.levelState === `jobs`) this.vacant();

    if (this.levelState === `meta`) this.meta();

    if (this.levelState === `setup`) this.setup();

    if (this.levelState === `explore`) this.inView();

    else if (this.levelState === `feed`) this.feed();

    else if (this.levelState === `tour`) this.tour();

    else if (this.levelState === `portfolio`) this.createStory();
  }


  subCalls () {

    if (this.levelState[1] === `devs`) {

      if (this.levelState[2] === `add`) this.addDevs();

      else if (this.levelState[2] === `mail`) {

        this.getDevsMail(A => {

          if (A[1][this.levelState[3]]) this.readDevsMail(A[1][this.levelState[3]], A);

        });
      }
    }

    else if (this.levelState[1] === `mail`) {

      this.inisumAvail(this.levelState[2], (A, B) => {

        this.mailPeers(A, B[0]);
      });
    }

    else if (this.levelState[1] === `monitor`) {

      if (this.levelState[2] === `graphs`) this.graphsRep()
    }

    else if (this.levelState[1] === `p`) {

      this.inisumAvail(this.levelState[2], (A, B) => {

        if (A === true) {

          this.contractDetailed(B[0]);
        }
      });
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
          jsState: [config.reqs._js, config.cd.auJS],
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

  /*mug () {

    this.isPassValid();

    this.modelStyler(config.lvl.css, CSSString => {

      this.availSubs({
      [`u`]: `tab`,
      [`sum`]: `field`, [this.isPassValid()]: `value`});

      let conca = this.literalFormat(config.sql.tfv);

      this.availSubs({
      [`j`]: `tab`,
      [`status`]: `field`, [this.isPassValid()]: `value`});

      conca += `;` + this.literalFormat(config.sql.tfv);

      this.availSubs({
      [`j`]: `tab`,
      [`status`]: `field`, [`null`]: `value`,
      [`uSum`]: `field_`, [this.isPassValid()]: `value_`});

      conca += `;` + this.literalFormat(config.sql.falsef2);

      let freqs = 0.0,
        pays = 0.0,
        payto = 0.0;

      new Sql().multi({}, conca, (A,B,C) => {

        for (let i = 0; i < B[1].length; i++) {
          freqs += B[1][i].freq;
          pays += B[1][i].pay;
        }

        if (B[1].length === 0) freqs = parseFloat(B[1].length) * 1.0

        for (let i = 0; i < B[2].length; i++) {
          payto += B[2][i].pay;
        }

        let modelMapping = {
          title: `My Corrde Account.`,
          css: CSSString,
          alt: B[0][0].alt,
          freq: (freqs * 1.0) + 0.0,
          to: B[2].length, //orders
          from: B[1].length,
          to_ : payto.toString(),
          from_: pays.toString(),
          JSStore: JSON.stringify({
            u: this.isPassValid()})};

      modelMapping[`appendModel`] = [model.mug(modelMapping)];

      this.app.to.writeHead(200, config.reqMime.htm);
      this.app.to.end(model.call(modelMapping));

      });

      
      });
  }*/

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
        jsState: config.reqs.devs_js}

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
                jsState: config.reqs.devs_js}

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

      this.logs_u_md5(A => {

        const pool = {
        jSStore: JSON.stringify({}),
        title: `Take A Tour`,
                css: CSS,
                jsState: config.reqs.devs_js}

              pool.appendModel = [
                model.rootView({
                  appendModel: [
                    model.topTour(), model.tour(A), 
                    model.jS(pool)]
              })];
              
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));
            })
      })
  }

  feed () {

    this.modelStyler(config.lvl.css, CSS => {

      this.getCookie(`u`, (A, B) => {

        if (A === true) this.rootCall();
        
        else if (A === false) {

          this.logs_u_md5(A => {

            const pool = {
              jSStore: JSON.stringify({u_md5: B}),
              title: `The Blue Collar Hub.`,
              css: CSS,
              jsState: [config.reqs._js]}

              pool.appendModel = [
                model.rootView({
                  appendModel: [
                    model.feed(A, A.md5Key[B]), 
                    model.feedTop(A.md5Key[B]), model.tailFeedControls(), 
                    model.jS(pool), 
                    model.loadDOMModalView([model.modalView([model.avaSaveModal()])], `ava-modal-ejs`)]
              })];
              
                  this.app.to.writeHead(200, config.reqMime.htm);
                  this.app.to.end(model.call(pool));
            })
        }
      })
      })
  }

  createStory () {

    this.modelStyler(config.lvl.css, CSS => {

      this.getCookie(`u`, (A, B) => {

        if (A === true) this.rootCall();
        
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

    if (this.q.file === `ini_ava`) this.iniAva();

    else if (this.q.file === `dev_ava`) this.devAva();

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

    tcp.on(`connection`, tls => {

      if (tls.handshake.headers.cookie && cookie.parse(tls.handshake.headers.cookie).dev_md5) {

        tls.handshake[`utc`] = new Date().valueOf();

        tls.handshake.headers[`dev_md5`] = cookie.parse(tls.handshake.headers.cookie).dev_md5;
        tls.handshake.headers[`gps`] = cookie.parse(tls.handshake.headers.cookie).gps;

        new Sql().to([`devs_traffic`, {json: JSON.stringify(tls.handshake)}], (A, B, C) => {});
      }

      else if (tls.handshake.headers.cookie && cookie.parse(tls.handshake.headers.cookie).u) {

        tls.handshake[`utc`] = new Date().valueOf();

        tls.handshake[`u_md5`] = cookie.parse(tls.handshake.headers.cookie).u;
        tls.handshake[`gps`] = cookie.parse(tls.handshake.headers.cookie).gps;

        new Sql().to([`u_md5_logs`, {json: JSON.stringify(tls.handshake)}], (A, B, C) => {});
      }

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

      else if (this.args.accessDev) this.accessDev(JSON.parse(this.args.accessDev));

      else if (this.args.devPassReset) this.devPassReset(JSON.parse(this.args.devPassReset));

      else if (this.args.setGPSCookie) this.setGPSCookie(JSON.parse(this.args.setGPSCookie));

      else if (this.args.appendDevs) this.appendDevs(JSON.parse(this.args.appendDevs));

      else if (this.args.pushSupportMsg) this.pushSupportMsg(JSON.parse(this.args.pushSupportMsg));

      else if (this.args.setMD5Cookie) this.setMD5Cookie(JSON.parse(this.args.setMD5Cookie));

       else if (this.args.pushStory) this.pushStory(JSON.parse(this.args.pushStory));
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

      if (args.md5) md5 = args.in

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

              _field.replace(new RegExp(`${args.pfolio_field}_${args.pfolio_service},`, `g`), ``);

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