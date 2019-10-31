let cdto = {
  res: `/`,
  //res: `https://corrde.com/`,
  reqs: `/corrde-reqs/ua/`,
  //reqs: `corrde-reqs.corrde.com/`,
  //gp: `gp.corrde.com/`,
  gp: `gp/`,
  dev: `https://developer.corrde.com/`,
  support: `https://help.corrde.com/`},

  mimeTitle = `Content-Type`

module.exports = {

  to: cdto,

  cd : {
    uareq: cdto.reqs + `ua/`,
    platform: cdto.res + `about/`,
    us: cdto.res + `about/` + `us/`,
    jobs: cdto.res + `about/` + `jobs/`,
    css: cdto.gp + `css/css.css`,
    utilJS: cdto.gp + `js/utils.js`,
    unauJS: cdto.gp + `js/un-au.js`,
    auJS: cdto.gp + `js/au.js`,u: cdto.res + `u/`},

  rexp: {
    cssSlim: {'{ ': /\s*{/g, '{': /{\s*/g, ';': /;\s*/g, ' }': /\s*}/g, '}': /}\s*/g}},

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
    fv: `select * from ?? where ?? = ?`,
    to: `insert into ?? set ?`,}
}