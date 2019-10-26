let cdto = {
  res: `https://corrde.com/`,
  //reqs: `/corrde-reqs/ua/`,
  reqs: `corrde-reqs.corrde.com/`,
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
    css: cdto.gp + `css/css.css`},

  rexp: {
    cssSlim: {'{ ': /\s*{/g, '{': /{\s*/g, ';': /;\s*/g, ' }': /\s*}/g, '}': /}\s*/g}},

  reqMime: {
    htm: {mimeTitle: `text/html`},
    json: {mimeTitle: `application/json`}
  }
}