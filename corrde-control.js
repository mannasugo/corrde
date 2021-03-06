const {basename} = require(`path`),
  {parse} = require(`querystring`),
  
  tcp = require(`./app`),

  Util = require(`./corrde-util`),
  config = require(`./corrde-config`);

class RouteControl {
  
  router (req, res) {

    Util.pushReq(req);
    
    let url = (`./${req.url}`).replace(`//`, `/`).replace(/%(..)/g, function (match, hex) {
      return String.fromCharCode(parseInt(hex, 16))
    });

    let levels = url.split(`/`);
    let level = levels.length;
    let lastChar = url.charAt(url.length - 1);
    let levelState = basename(url);

    if (req.method === `POST`) {

      let blob = new Buffer.alloc(+req.headers[`content-length`]);
      let endData = ``;
      let bufferOffset = 0;

      req.on(`data`, (data) => {

        data.copy(blob, bufferOffset);
        bufferOffset += data.length;
        endData += data;
      }).on(`end`, () => {

        if (endData[0] === `{`) Util.Pull([levels, JSON.parse(endData), req, res]);

        else {

          if (req.url === config.to.reqs) {

            if (req.headers[`content-type`] === `image/jpeg`) Util.AJXJPEG(blob, req, res);
          
            else Util.viaAJX(parse(endData), req, res);
          }

          else if (level === 2 && lastChar !== `/` || level === 3 && lastChar === `/`) {

            if (req.headers[`content-type`] === `image/jpeg`) Util.AJXJPEG(blob, req, res); 

            else Util.AJXReqs(levels, parse(endData), req, res);
          }
        }
      });
    }

    if (level === 2 && lastChar === `/`) {

      if (req.method === `GET`) Util.UAPublic(levelState, req, res);
    }

    else if (level === 2 && lastChar !== `/` || level === 3 && lastChar === `/`) {

      if (req.method === `GET`) Util.UAPublic(levelState, req, res);
    }

    else if (level === 3 && lastChar !== `/` || level === 4 && lastChar === `/`) {
      Util.SublevelCalls(levels, req, res);
    }

    else if (level === 4 && lastChar !== `/` || level === 5 && lastChar === `/`) {
      Util.SublevelCalls(levels, req, res);
    }

    else if (level === 5 && lastChar !== `/` || level === 6 && lastChar === `/`) {
      Util.SublevelCalls(levels, req, res);
    }

    //Util.Pull([levels, {}, req, res]);

  }
}

class RouteTCP {

  router (tcp) {

    //tcp.on(`connection`, tls => {

      Util.UATCP(tcp);
    //})
  }
}

module.exports = {
  router (req, res) {
    new RouteControl().router(req, res);
  },

  RouteTCP (tcp) {
    new RouteTCP().router(tcp);
  }
} 