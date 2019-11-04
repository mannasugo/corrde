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
          location TEXT NOT NULL,
          pay INT NOT NULL,
          St_ TEXT NOT NULL,
          sum VARCHAR(320) NOT NULL,
          St_to TEXT NOT NULL,
          type TEXT NOT NULL)`,
    j: `CREATE TABLE IF NOT EXISTS j_{sum} (
          blab TEXT NOT NULL,
          location TEXT NOT NULL,
          pay INT NOT NULL,
          St_ TEXT NOT NULL,
          sum VARCHAR(320) NOT NULL,
          St_to TEXT NOT NULL,
          type TEXT NOT NULL)`,
    a_u: `CREATE TABLE IF NOT EXISTS a_{sum} (
          jsum VARCHAR(320) NOT NULL,
          res TEXT NOT NULL,
          sum VARCHAR(320) NOT NULL,
          St_ TEXT NOT NULL,
          type TEXT NOT NULL)`,
    a_p: `CREATE TABLE IF NOT EXISTS a_p_{sum} (
          jsum VARCHAR(320) NOT NULL,
          res TEXT NOT NULL,
          sum VARCHAR(320) NOT NULL,
          St_ TEXT NOT NULL,
          type TEXT NOT NULL)`,
    all: `select * from {tab}`,
    fv: `select * from ?? where ?? = ?`,
    to: `insert into ?? set ?`,
    lmtDsc: `select * from {tab} ORDER BY {field} desc limit {int}`},

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