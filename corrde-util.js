const fs = require(`fs`),
  crypto = require(`crypto`),
  mysql = require(`mysql`),
  cookie = require(`cookie`),
  
  config = require(`./corrde-config`),
  model = require(`./corrde-model`)

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

    if (this.levelState === `u`) this.u();

    if (this.levelState === `p`) this.p();

    if (this.levelState === `analytics`) this.metric();

    if (this.levelState === `mug`) this.mug();

    if (this.levelState === `quora`) this.quora();

    if (this.levelState === `jobs`) this.vacant();
  }

  rootCall () {

    this.modelStyler(config.lvl.css, CSSString => {

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

  isPassValid () {
    let cJar = cookie.parse(this.app.fro.headers.cookie);

    if (!cJar.u) return;

    return cJar.u;
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
          JSStore: {
            u: this.isPassValid()}};

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
          u: `this.isPassValid()`}};

      modelMapping[`JSStore`] = JSON.stringify(modelMapping[`JSStore`]);

      modelMapping[`appendModel`] = [model.vacant(modelMapping)];

      this.app.to.writeHead(200, config.reqMime.htm);
      this.app.to.end(model.call(modelMapping));
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
    if (this.q.setup) {
      this.setup(JSON.parse(this.q.setup));
    }

    if (this.q.ini) this.ini(JSON.parse(this.q.ini));

    if (this.q.urlCall) this.urlCall(JSON.parse(this.q.urlCall));

    if (this.q.passValid) this.passValid(JSON.parse(this.q.passValid));

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
  }

  setup (q) {
    let modelMapping = {
      appendModel: model.setup()};

    this.app.to.writeHead(200, config.reqMime.json);
    this.app.to.end(JSON.stringify(model.modal(modelMapping)));
  }

  ini (q) {
    new Sql().fValue({
      table: `u`, 
      field: `mail`, fieldValue: q[1]}, (A, B, C) => {console.log(A)

        if (B.length === 0) {

          let localSt_ = new Date().valueOf();

          let localSt_Sum = crypto.createHash(`md5`).update(`${localSt_}`, `utf8`).digest(`hex`);

          let mailPass = crypto.createHash(`md5`).update(q[2], `utf8`);

          new Sql().to([`u`, {
            alt: q[0],
            mail: q[1],
            mug: `null`,
            pass: mailPass.digest(`hex`),
            St_: localSt_,
            sum: localSt_Sum}], (A, B, C) => {
              this.iniCookie(`u`, localSt_Sum);

              let modelMapping = {
                appendModel: model.mode()};

              this.app.to.writeHead(200, config.reqMime.json);
              this.app.to.end(JSON.stringify(model.modal(modelMapping)));
            });
        }});
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

  passValid (q) {
    new Sql().fValue({
      table: `u`,
      field: `mail`,
      fieldValue: q[0]}, (A, B, C) => {
        if (B.length === 1) {
          let hexPass = crypto.createHash(`md5`).update(q[1], `utf8`);
          if (B[0].pass === hexPass.digest(`hex`)) {
            this.iniCookie(`u`, B[0].sum);

            this.app.to.writeHead(200, config.reqMime.json);
            this.app.to.end(JSON.stringify({url: config.cd.u}));
          }
        }
      });
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
}

module.exports = {

  mysql () {
    new Sql().ini();
  },

  UAPublic (level, req, res) {
    new UAPublic(level, req, res).handleUACalls();
  },

  viaAJX (q, to, fro) {
    new ViaAJX(q, to, fro).AJXCalls();
  }
}