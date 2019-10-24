let cdto = {
  //reqs: `/corrde-reqs/ua/`,
  reqs: `corrde-reqs.corrde.com/`,
  //gp: `gp.corrde.com/`,
  gp: `gp/`},
  mimeTitle = `Content-Type`

module.exports = {

  cd : {
    uareq: cdto.reqs + `ua/`,
    css: cdto.gp + `css/css.css`},

  rexp: {
    cssSlim: {'{ ': /\s*{/g, '{': /{\s*/g, ';': /;\s*/g, ' }': /\s*}/g, '}': /}\s*/g}},

  reqMime: {
    htm: {mimeTitle: `text/html`},
    json: {mimeTitle: `application/json`}
  }
}