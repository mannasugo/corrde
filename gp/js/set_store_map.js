`use strict`;

(function () {

  const S = io();

  const UAX = parseInt(document.querySelector(`body`).clientWidth);
    
  const UAY = parseInt(document.querySelector(`#map`).clientHeight + 55);

  const AJXReq = (reqs, allMeta, inCall) => {

    let req = new Req();

    req.call(`POST`, reqs[0], {
      title: reqs[1],
      JSON: JSON.stringify(allMeta),
      to: () => {

        let B = {}, A = {};

        if (req.req.responseText.length < 1) {
          A[`server_err`] = `Server Error.`;
        }

        if (JSON.parse(req.req.responseText).err) {
          A[`err`] = JSON.parse(req.req.responseText).err;
        }

        if (req.req.responseText.length > 0) {
          B = JSON.parse(req.req.responseText);
        }

        inCall(A, B);
      }
    });
  }

  let GPS = (dealGPS, dealBugs) => {
    navigator.geolocation.getCurrentPosition(a => {dealGPS(a)}, b => {dealBugs(b)});
  }

  let isCoords = (position) => {

    let gps = position.coords,
      lat = gps.latitude,
      long = gps.longitude;

    if (typeof lat === `number` && typeof long === `number`) {

      JSStore.to({gps: [long, lat]});
    }
  }

  let setGPSCookie = () => {

    JSStore.to({gps: false});

    GPS(a => {

      isCoords(a);

      AJXReq([`/devs_reqs/`, `setGPSCookie`], JSStore.avail(), (A, B) => {loadSeek()});

      }, (b) => {

        AJXReq([`/devs_reqs/`, `setGPSCookie`], JSStore.avail(), (A, B) => {loadSeek()});
    })    
  }

  let SVGScale = false;

  let Custom = [];

  let loadSeek = () => {

    let PQ;

    if (JSStore.avail().gps === false) PQ = [-0.723, 54.533]

    if (typeof JSStore.avail().gps === `object` && JSStore.avail().gps.length === 2) PQ = JSStore.avail().gps;

    JSStore.to({draggableSet: false, tiles_session: new Date().valueOf()});

    SVG_PQ(PQ);
  }

  let SVG_PQ = PQ => {

    d3.json(`/gp/twineJSON/custom.json`).then(json => {
      
      let projection = d3.geoMercator()
        .scale(1200)
        .translate([UAX / 2, UAY / 2])
        .center(PQ),

      path = d3.geoPath().projection(projection);

      let svg = d3.select(`#map`)
        .selectAll(`svg`).data([json])
        .style(`width`, UAX + `px`)
        .style(`height`, (UAY - 55) + `px`)
        .attr(`class`, `d3JS _aXZ _gmg`)

      let map = svg.append(`g`)
        .attr(`class`, `boundary`);

      let G0 = topojson.feature(json, json.objects[`custom.geo`]);

      Custom = G0;

      let ADM0 = [];

      let adm0_a3;

      G0.features.forEach(Obj => {

        if (d3.geoContains(Obj, projection.invert([UAX/2, UAY/2]))) adm0_a3 = Obj.properties.adm0_a3;
          
        ADM0.push(Obj);
      });

      SVGScale = projection;

      S.emit(`create_geo_tiles`, {adm0_a3: adm0_a3, PQ: PQ});

      S.emit(`geo_tiles`, {adm0_a3: adm0_a3, PQ: PQ, tiles_utc: JSStore.avail().tiles_session});

      map.selectAll(`path`).data(ADM0)
        .enter()
        .append(`path`)
        .attr(`d`, path)
        .attr(`class`, `g0`);

      svg.select(`g`)
        .attr(`fill`, `#d7d7dd`)
        .attr(`fill`, `#cccccc`)
        .attr(`stroke`, `#fff`)
        .style(`stroke-width`, 1.2)

      S.on(`geo_tiles`, Tiles => {

        if (Tiles[2][`tiles_utc`] !== JSStore.avail().tiles_session) return;

        map.selectAll(`path.rds`).data(Tiles[0])
          .enter()
          .append(`path`)
          .attr(`d`, path)
          .attr(`class`, `rds0`)
          .attr(`id`, `${adm0_a3}_rds0`)
          .attr(`stroke`, `#ffe754`)
          .attr(`fill`, `none`)
          .style(`stroke-width`, `1.95`);

        /*map.selectAll(`text`).data(Tiles[1])
          .enter()
          .append(`text`)
          .attr(`class`, `gaz0`)
          .attr(`x`, d => {return projection([d.LONG, d.LAT])[0]})
          .attr(`y`, d => {return projection([d.LONG, d.LAT])[1]})
          .style(`stroke`, `#000`)
          .style(`stroke-width`, `.5`)
          .style(`font-size`, `10px`)
          .style(`font-weight`, `normal`)
          .style(`letter-spacing`, `.75px`)
          .style(`fill`, `#000`)
          .text(d => {return d.NAME})*/
      })

      let Tilelist = {};

      let scaleSVG = d3.zoom()
        .scaleExtent([.9, 100])
        .on(`zoom`, zoomMap);

      svg.call(scaleSVG);

      function zoomMap (d) {

        map.selectAll(`.gaz0`).remove();

        map.selectAll(`.rds0`).remove();

        let zoomScale = d3.zoomTransform(svg.node());

        projection.translate([zoomScale.x, zoomScale.y]).scale(zoomScale.k*1200);

        SVGScale = projection;

        G0.features.forEach(Obj => {

          if (d3.geoContains(Obj, projection.invert([UAX/2, UAY/2]))) adm0_a3 = Obj.properties.adm0_a3;

        });

        S.emit(`create_geo_tiles`, {adm0_a3: adm0_a3, PQ: projection.invert([UAX/2, UAY/2])});

        let PJ_src = projection.invert([UAX/2, UAY/2]);

        let POS_max = [Math.ceil(PJ_src[0]), Math.ceil(PJ_src[1])];

        let geo_tile = `${POS_max[0] - 1}_${POS_max[1] - 1}_${POS_max[0]}_${POS_max[1]}`;

        let gaz_tile = `${POS_max[0] - 1}_${POS_max[1] - 1}_${POS_max[0]}_${POS_max[1]}_gaz`;//console.log(zoomScale.k)

        if (Tilelist[geo_tile]) {

          map.selectAll(`path.rds`).data(Tilelist[geo_tile])
            .enter()
            .append(`path`)
            .attr(`d`, path)
            .attr(`class`, `rds0`)
            .attr(`id`, `${adm0_a3}_rds0`)
            .attr(`stroke`, `#ffe754`)
            .attr(`fill`, `none`)
            .style(`stroke-width`, `1.95`);

          if (Tilelist[gaz_tile]) {

            let G_tiles = [];

            if (zoomScale.k > 9.999)  G_tiles = Tilelist[gaz_tile].slice(0, 10);

            map.selectAll(`text`).data(G_tiles)
              .enter()
              .append(`text`)
              .attr(`class`, `gaz0`)
              .attr(`x`, d => {return projection([d.LONG, d.LAT])[0]})
              .attr(`y`, d => {return projection([d.LONG, d.LAT])[1]})
              .style(`stroke`, `#000`)
              .style(`stroke-width`, `.5`)
              .style(`font-size`, `10px`)
              .style(`font-weight`, `normal`)
              .style(`letter-spacing`, `.75px`)
              .style(`fill`, `#000`)
              .text(d => {return d.NAME})
          }
        }

        else {

          d3.json(`/gp/twineJSON/${geo_tile}_rds.json`).then(json => {

            Tilelist[geo_tile] = json;

            map.selectAll(`path.rds`).data(json)
              .enter()
            .append(`path`)
            .attr(`d`, path)
            .attr(`class`, `rds0`)
            .attr(`id`, `${adm0_a3}_rds0`)
            .attr(`stroke`, `#ffe754`)
            .attr(`fill`, `none`)
            .style(`stroke-width`, `1.95`);

            d3.json(`/gp/twineJSON/${gaz_tile}.json`).then(json => {

              Tilelist[gaz_tile] = json;

              let Gz_tiles = [];

              if (zoomScale.k > 9.999)  Gz_tiles = json.slice(0, 10);

              map.selectAll(`text`).data(Gz_tiles)
                  .enter()
                  .append(`text`)
                  .attr(`class`, `gaz0`)
                  .attr(`x`, d => {return projection([d.LONG, d.LAT])[0]})
                  .attr(`y`, d => {return projection([d.LONG, d.LAT])[1]})
                  .style(`stroke`, `#000`)
                  .style(`stroke-width`, `.5`)
                  .style(`font-size`, `10px`)
                  .style(`font-weight`, `normal`)
                  .style(`letter-spacing`, `.75px`)
                  .style(`fill`, `#000`)
                  .text(d => {return d.NAME})   

            }).catch(error => {throw error})  

          }).catch(error => {throw error})

        }

        d3.selectAll(`path`).attr(`d`, path);
      }

    }).catch(error => {throw error})
  }

  let draggableSet = e => {

    if (e.id === `draggableOff`) {

      JSStore.to({draggableSet: true});

      e.setAttribute(`id`, `draggableSet`);

      e.innerHTML = `Back to Map`;

      document.querySelector(`#draggableControls`).className = `_aAY -Zz`;
    }

    else if (e.id === `draggableSet`) {

      JSStore.to({draggableSet: false});

      e.innerHTML = `Select Position`;

      e.setAttribute(`id`, `draggableOff`);
    }
  }

  let foldSettings = e => {

    if (e.id === `del`) {

      let modals = document.querySelectorAll(`[for = 'modal']`);

      for (let i = 0; i < modals.length; i++) {
        
        if (modals[i].className === `_aAY -Zz`) {

          modals[i].setAttribute(`class`, `_aAY _-Zz`);
        }
      }
    }

  }

  let selectPosition = e => {

    if (SVGScale !== false && JSStore.avail().draggableSet && JSStore.avail().draggableSet !== false) {

      if (e.clientX > 60 && e.clientY > 100) {

        let Feat = {};

        Custom.features.forEach(Feature => {

          if (d3.geoContains(Feature, SVGScale.invert([e.clientX, e.clientY + 55]))) {

            Feat = {adm0_a3: Feature.properties.adm0_a3, long_a3: Feature.properties.name_long, points: [SVGScale.invert([e.clientX, e.clientY + 55])]};
          }
      });

        JSStore.to({StockSite: Feat})

        document.querySelector(`#coord`).innerHTML = Feat.long_a3 + `:` + Feat.points[0];

        document.querySelector(`#storeAddressPlace`).className = `_aAY -Zz`;

        JSStore.to({draggableSet: false});

        let draggableSet = document.querySelector(`#draggableSet`);

        draggableSet.innerHTML = `Select Position`;

        draggableSet.setAttribute(`id`, `draggableOff`);
      }
    }
  }

  let StoreAddressSet = e => {

    if (e.id === `StoreAddressSet`) {

      JSStore.to({StoreAddressSet_log_secs: new Date().valueOf()});

      S.emit(`set_store_address`, {
        log_md5: JSStore.avail().store_log_md5,
        StoreAddressSet_log_secs: JSStore.avail().StoreAddressSet_log_secs, 
        vServiceAddress: JSStore.avail().StockSite});

      let to = document.querySelector(`#storeAddressPlace`);

      if (to.className === `_aAY -Zz`) to.className = `_aAY _-Zz`;

    }
  }

  let e0 = e => {

    selectPosition(e)

    e = e.target;

    draggableSet(e);

    foldSettings(e);

    StoreAddressSet(e)

  }

  setGPSCookie();

  document.addEventListener(`click`, e0);

  S.on(`set_store_address`, Args => {

    if (JSStore.avail().StoreAddressSet_log_secs !== Args.StoreAddressSet_log_secs) return;

    window.location = `/store/${JSStore.avail().store_log_md5}`

  })
})();