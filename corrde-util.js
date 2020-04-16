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

      let is_valid = false,
        is_valid_dual = false,
        contracts = [],
        selfContracts = [],
        fields = [];
      
      for (let uself in B[0]) {

        let alt = JSON.parse(B[0][uself].alt);

        if (alt.sum && alt.sum === u) is_valid = alt;

        if (alt.skills.length > 0) {

          is_valid_dual = true;
          fields = alt.skills;
        }
      }

      for (let jself in B[1]) {

        let alt = JSON.parse(B[1][jself].blab);

        contracts.push(alt);

        if (alt.sum && alt.sum === u) selfContracts.push(alt);
      }

      call (is_valid, selfContracts, {
        contracts: contracts,
        fields: fields,
        is_valid: is_valid,
        is_valid_dual: is_valid_dual});
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
        `${config.sql.u}
        ;${config.sql.i}
        ;${config.sql.m}
        ;${config.sql.freqs}
        ;${config.sql.texts}
        ;${config.sql.interactions}
        ;${config.sql.quora}
        ;${config.sql.quora_comments}`);
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

    if (this.levelState === `getjobs`) this.getJobs();

    if (this.levelState === `in`) this.in();

    if (this.levelState === `mycontract`) this.formContract();

    if (this.levelState === `myjobs`) this.selfContracts();

    if (this.levelState === `myjobs/u`) this.selfContracts();

    if (this.levelState === `p`) this.p();

    if (this.levelState === `analytics`) this.metric();

    if (this.levelState === `mug`) this.mug();

    if (this.levelState === `quora`) this.quora();

    if (this.levelState === `jobs`) this.vacant();

    if (this.levelState === `about`) this.about();

    if (this.levelState === `meta`) this.meta();

    if (this.levelState === `setup`) this.setup();

    if (this.levelState === `explore`) this.inView();

    if (this.levelState === `u`) this.uView();
  }


  subCalls () {

    if (this.levelState[1] === `p`) {

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

        const modelMapping = {
          title: `Corrde`,
          css: CSSString,
          jSStore: JSON.stringify({State: `offline`}),
          jsState: config.cd.auJS,
          appendModel: ``
        };

        let rootDualCall, a2 = {};

        if (this.app.fro.headers.cookie) {

          let cJar = cookie.parse(this.app.fro.headers.cookie);

          if (cJar[`u`]) {

            a2[`ava`] = ``;
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
            appendModel: [
              model.banner(), 
              model.products(),
              model.SVGMetrics(msg),
              model.hows(), model.feature(),
              model.footer()]}), rootDualCall];
        modelMapping[`appendModel`] = [model.wrapper(modelMapping), model.jS(modelMapping)];

        this.app.to.writeHead(200, config.reqMime.htm);
        this.app.to.end(model.call(modelMapping));
      });
    })
      
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

  metric () {

    //if (typeof this.isPassValid() !== `string`) return;

    this.modelStyler(config.lvl.css, CSSString => {

      let modelMapping = {
        title: `Corrde Metrics`,
        css: CSSString,
        appendModel: ``,
        JSStore: {
          u: `this.isPassValid()`}};

      modelMapping[`appendModel`] = [model.metric()];

      this.app.to.writeHead(200, config.reqMime.htm);
      this.app.to.end(model.call(modelMapping));
      });
  }

  mug () {

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

  about () {

    this.modelStyler(config.lvl.css, CSSString => {

      let modelMapping = {
        title: `About Corrde`,
        css: CSSString,
        appendModel: ``,
        JSStore: {
          about: true}};

      modelMapping[`JSStore`] = JSON.stringify(modelMapping[`JSStore`]);

      modelMapping[`appendModel`] = [model.about(modelMapping)];

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

      if (B && parseInt(B.length)) {

        for (let day = 0; day < 7; day++) {

          let a = new Date(new Date().setUTCHours(0) - (day * 86400000)).toUTCString().valueOf(),
            z = new Date(new Date().setUTCHours(24) - (day * 86400000)).toUTCString().valueOf(),
            A = new Date(new Date().setUTCHours(0) - (day * 86400000)).valueOf(),
            Z = new Date(new Date().setUTCHours(24) - (day * 86400000)).valueOf();

          let sFields = [], subsCount = {}; 
      
          for (let task in B) {

            if (B[task].blab[0] === `{`) {

              let alt_ = JSON.parse(B[task].blab);

              if (field === alt_.field) {

                if (parseInt(alt_.ini_log) > A && parseInt(alt_.ini_log) < Z) {

                  sFields.push(alt_.subfield)
                }
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
        title: task.lead,
        css: CSS,jsState: config.cd.auJS}

      pool.appendModel = [
        model.main({
          appendModel: [model.footer()]
        }), model.top({ava: ``})];

      pool.appendModel = [model.wrapper(pool), model.jS(pool)];

          this.app.to.writeHead(200, config.reqMime.htm);
          this.app.to.end(model.call(pool));
    });
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
}

class UATCP extends UAPublic {

  constructor () {super();}

  TCPCalls (tcp) {

    let valids = [],
      dualValids = [],
      locusValid = [],
      allJobs = [],
      fieldCount = [],
      conca = `select * from j;`;
      conca += `select * from u;`;

    tcp.on(`connection`, tls => {

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

        if (!valids[u.in]) {

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
          locus_valid: locusValid});

      })
      
      tls.on(`disconnect`, () => {

        //delete valids[cookie.parse(tls.request.headers.cookie).u];

        valids = [];
        dualValids = [];
        locusValid = [];

      });
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

  SublevelCalls: (level, req, res) => new UAPublic(level, req, res).subCalls(),

  viaAJX (q, to, fro) {
    new ViaAJX(q, to, fro).AJXCalls();
  },

  AJXJPEG(file, req, res) {
    new AJXJPEG(file, req, res).AJXCalls();
  },

  UATCP(tcp) {
    new UATCP().TCPCalls(tcp);
  }
}