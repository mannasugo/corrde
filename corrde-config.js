let cdto = {
  res: `/`,
  //res: `https://corrde.com/`,
  reqs: `/corrde-reqs/ua/`,
  //reqs: `corrde-reqs.corrde.com/`,
  //gp: `gp.corrde.com/`,
  gp: `/gp/`,
  dev: `https://developer.corrde.com/`,
  support: `https://help.corrde.com/`},

  root = `gp/`,

  mimeTitle = `Content-Type`

module.exports = {

  to: cdto,

  lvl: {//svr_map
    css: root + `css/css.css`},

  cd : { //site_map
    uareq: cdto.reqs + `ua/`,
    platform: cdto.res + `about/`,
    us: cdto.res + `about/` + `us/`,
    jobs: cdto.res + `about/` + `jobs/`,
    css: cdto.gp + `css/css.css`,
    utilJS: cdto.gp + `js/utils.js`,
    unauJS: cdto.gp + `js/un-au.js`,
    auJS: cdto.gp + `js/au.js`,u: cdto.res + `u/`},

  rexp: {
    cssSlim: {'{ ': /\s*{/g, '{': /{\s*/g, ';': /;\s*/g, ' }': /\s*}/g, '}': /}\s*/g}}, //{[`{`]: RegExp}

  reqMime: {
    htm: {mimeTitle: `text/html`},
    json: {mimeTitle: `application/json`}},

  sqlPass: {
    h: `localhost`,
    u: `root`,
    p: `Mann2asugo`,
    d: `corrde`,},

  sql: {
    db: `CREATE DATABASE IF NOT EXISTS corrde`,
    u: `CREATE TABLE IF NOT EXISTS u (
          alt TEXT NOT NULL,
          mail TEXT NOT NULL,
          mug TEXT NOT NULL,
          pass TEXT NOT NULL,
          St_ TEXT NOT NULL,
          sum VARCHAR(320) NOT NULL)`,
    i: `CREATE TABLE IF NOT EXISTS i (
          sum VARCHAR(320) NOT NULL,
          type TEXT NOT NULL)`,
    m: `CREATE TABLE IF NOT EXISTS j (
          blab TEXT NOT NULL,
          freq INT NOT NULL,
          location TEXT NOT NULL,
          pay INT NOT NULL,
          report TEXT NOT NULL,
          St_ TEXT NOT NULL,
          status TEXT NOT NULL,
          sum VARCHAR(320) NOT NULL,
          St_to TEXT NOT NULL,
          type TEXT NOT NULL,
          uSum VARCHAR(320) NOT NULL)`,
    freqs: `CREATE TABLE IF NOT EXISTS freq (
          jobs_total INT NOT NULL,
          sum VARCHAR(320) NOT NULL,
          rate_total INT NOT NULL,
          type TEXT NOT NULL)`,
    j: `CREATE TABLE IF NOT EXISTS j_{sum} (
          blab TEXT NOT NULL,
          freq INT NOT NULL,
          location TEXT NOT NULL,
          pay INT NOT NULL,
          report TEXT NOT NULL,
          St_ TEXT NOT NULL,
          status TEXT NOT NULL,
          sum VARCHAR(320) NOT NULL,
          St_to TEXT NOT NULL,
          type TEXT NOT NULL,uSum VARCHAR(320) NOT NULL)`,
    a_u: `CREATE TABLE IF NOT EXISTS a_{sum} (
          jsum VARCHAR(320) NOT NULL,
          res TEXT NOT NULL,
          sum VARCHAR(320) NOT NULL,
          St_ TEXT NOT NULL,
          type TEXT NOT NULL)`, //user's applicants
    a_p: `CREATE TABLE IF NOT EXISTS a_p_{sum} (
          jsum VARCHAR(320) NOT NULL,
          res TEXT NOT NULL,
          sum VARCHAR(320) NOT NULL,
          St_ TEXT NOT NULL,
          type TEXT NOT NULL)`, //user's applications

    interactions: 
      `CREATE TABLE IF NOT EXISTS interactions (
          cord VARCHAR(320) NOT NULL,
          fro VARCHAR(320) NOT NULL,
          ilk TEXT NOT NULL,
          jsum VARCHAR(320) NOT NULL,
          last_fro VARCHAR(320) NOT NULL,
          last_fro_log TEXT NOT NULL,
          last_to_log TEXT NOT NULL,
          log TEXT NOT NULL,
          src_to VARCHAR(320) NOT NULL,
          src VARCHAR(320) NOT NULL,
          toward VARCHAR(320) NOT NULL,
          txt TEXT NOT NULL)`,

    texts:
      `CREATE TABLE IF NOT EXISTS texts (
        cord VARCHAR(320) NOT NULL,
        fro VARCHAR(320) NOT NULL,
        ilk TEXT NOT NULL,
        jilk TEXT NOT NULL,
        jsum VARCHAR(320) NOT NULL,
        log TEXT NOT NULL,
        src_to VARCHAR(320) NOT NULL,
        src VARCHAR(320) NOT NULL,
        toward VARCHAR(320) NOT NULL,
        txt TEXT NOT NULL)`,

    all: `select * from {tab}`, //adapt python's string-format value filling i.e {0} {1}, one, two
    fv: `select * from ?? where ?? = ?`,
    tfv: `select * from {tab} where {field} = '{value}'`,
    to: `insert into ?? set ?`,
    lmtDsc: `select * from {tab} ORDER BY {field} desc limit {int}`,
    tf_v_: `select * from {tab} where {field} = '{value}' and {field_} = '{value_}'`,
    lmtDscf_v_: `select * from {tab} where {field} ='{value}' and {field_} = '{value_}' ORDER BY {lmtV} desc limit {int}`,
    f_veq: `select * from {tab} join {tab_} on {tab}.{field} = {tab_}.{field_} where {tab}.{field__} = '{value}'`,
    triple_tfv: `select * from {tab} where {field} = '{value}' and {field_} = '{value_}' and {field__} = '{value__}'`,
    uvf2: `update {tab} set {fieldsValues} where {field} = '{value}' and {field_} = '{value_}'`,
    delf2: `delete from {tab} where {field} = '{value}' and {field_} = '{value_}'`,
    f__: `alter table {tab}`},

  fields: {
    [`arts`]: [
      `art installation`, 
      `painting restoration`, 
      `art design`, 
      `art supplies`],
    [`fashion and appeal`]: [
      `accessories`, 
      `wear design`, 
      `wear fitting`, 
      `tailoring`, 
      `apparel production and supply`],
    [`home`]: [
      `interior design`,
      `furniture fitting`, 
      `furniture repair and maintenance`, 
      `woodwork`,
      `gardening`,
      `landscaping`,
      `plumbing`,
      `electrical repair and maintenance`],
    [`machinery`]: [
      `electrical repair and maintenance`,
      `mechanical repair and maintenance`,
      `installation`,
      `supply`],
    [`office`]: [
      `interior design`,
      `stationery supply`,
      `plumbing`,
      `electrical repair and maintenance`,
      `interior fitting`,
      `office temp work`],
    [`tourism`]: [
      `curios and artifacts`,
      `archives`,
      `tour guide`]
  }
}