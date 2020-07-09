`use strict`;

(function () {

  const socket = io();

  const uaX = parseInt(document.querySelector(`body`).clientWidth);
    
  const uaY = parseInt(document.querySelector(`#map`).clientHeight + 55);

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

  let seekJob = () => {

    d3.json(`/gp/twineJSON/custom.json`)

      .then(json => {

        JMD5()
      
        let projection = d3.geoMercator()
          .scale(120000)
          .translate([uaX / 2, uaY / 2])
          .center(JSStore.avail().j_obj.geo),

        path = d3.geoPath().projection(projection);

        let svg = d3.select(`#map`)
          .selectAll(`svg`).data([json])
          .style(`width`, uaX + `px`)
          .style(`height`, (uaY - 55) + `px`)
          .attr(`class`, `d3JS _aXZ _gmg`)

        let map = svg.append(`g`)
          .attr(`class`, `boundary`);

        let topo = json;

        json = topojson.feature(json, json.objects[`custom.geo`])

        let sel = [];

        let adm0_a3;

        json.features.forEach(Obj => {

          if (d3.geoContains(Obj, projection.invert([uaX/2, uaY/2]))) adm0_a3 = Obj.properties.adm0_a3;
          
          sel.push(Obj);
        });

        map.selectAll(`path`).data(sel)
          .enter()
          .append(`path`)
          .attr(`d`, path)
          .attr(`class`, `adm0`);

        svg.select(`g`)
          .attr(`fill`, `#d7d7dd`)
          .attr(`fill`, `#cccccc`)
          .attr(`stroke`, `#fff`)
          .style(`stroke-width`, 1.2)

        let PRI = [];

        let RDS = {}

      d3.json(`/gp/twineJSON/${adm0_a3}_rds.json`)

        .then(rds_json => {

          rds_json = topojson.feature(rds_json, rds_json.objects[`${adm0_a3}_rds.geo`]);RDS = rds_json;

          rds_json.features.forEach(Obj => {

          let rds = [];

          let PJ = projection.invert([uaX/2, uaY/2]);

          let SQ = [PJ[0] - .10, PJ[1] - .10, PJ[0] + .10, PJ[1] + .10] 
 
            if (Obj.geometry.type === `LineString`) {

              Obj.geometry.coordinates.forEach(POS => {

                if (POS[0] >= SQ[0] && POS[0] <= SQ[2]) {

                  if (POS[1] >= SQ[1] && POS[1] <= SQ[3]) rds.push(Obj);
                }
              })
            }

          map.selectAll(`path.rds`).data(rds)
            .enter()
            .append(`path`)
            .attr(`d`, path)
            .attr(`class`, `adm1`)
            .attr(`id`, `${adm0_a3}_adm1`)
            .attr(`stroke`, `#ffe754`)
            .attr(`fill`, `none`)
            .style(`stroke-width`, `1.5`);

            PRI.push(Obj);
          })
      })

      .catch(error => {throw error})

      let labels = []

      d3.json(`/gp/twineJSON/${adm0_a3}_gaz.geo.json`)

        .then(gaz_json => {

          let PJ = projection.invert([uaX/2, uaY/2]);

          let SQ = [PJ[0] - .10, PJ[1] - .10, PJ[0] + .10, PJ[1] + .10]

          gaz_json.forEach(Obj => {

            labels.push(Obj);labels = labels.slice(0, 3500)
          });
      })

      .catch(error => {throw error})

      d3.json(`/gp/twineJSON/${adm0_a3}_wat0.json`)

        .then(wat0_json => {

          wat0_json = topojson.feature(wat0_json, wat0_json.objects[`${adm0_a3}_wat0.geo`]);

          wat0_json.features.forEach(Obj => {})

          map.selectAll(`path.wat0`).data(wat0_json.features)
            .enter()
            .append(`path`)
            .attr(`d`, path)
            .attr(`stroke`, `#1185fe`)
            .attr(`fill`, `#1185fe`)

          SQ_j_md5([JSStore.avail().j_obj]);
      })

      .catch(error => {throw error})

      let SQ_j_md5 = (Obj) => {

        map.selectAll(`.j_md5`).remove();

        map.selectAll(`SQ.j_md5`).data(Obj)
          .enter()
          .append(`circle`)
          .attr(`class`, `j_md5`)
          .attr(`cx`, d => {return parseInt(projection(d.geo) [0]);})
          .attr(`cy`, d => {return parseInt(projection(d.geo) [1]);})
          .attr(`r`, 5)
          .attr(`fill`, `none`)
          .attr(`stroke`, `#1185fe`)
          .attr(`id`, d => {return d.log_md5})

        map.selectAll(`SQ.j_md5`).data(Obj)
          .enter()
          .append(`rect`)
          .attr(`x`, d => {return parseInt(projection(d.geo) [0]) - 75;})
          .attr(`y`, d => {return parseInt(projection(d.geo) [1]) - 25;})
          .attr(`class`, `j_md5`)
          .attr(`width`, `150`)
          .attr(`height`, `25`)
          .attr(`fill`, `#fff`)
          .attr(`rx`, 12)
          .attr(`stroke`, `#1185fe`)
          .attr(`id`, d => {return Obj.log_md5})

        map.selectAll(`SQ.j_md5`).data(Obj)
          .enter()
          .append(`text`)
          .attr(`x`, d => {return parseInt(projection(d.geo) [0]);})
          .attr(`y`, d => {return parseInt(projection(d.geo) [1]) - 8;})
          .text(d => {return (d3.geoDistance(JSStore.avail().gps, d.geo) * 6888).toFixed(1) + ` Miles | ${d.USD} USD`;})
          .attr(`class`, `j_md5`)
          .style(`fill`, `#1185fe`)
          .attr(`text-anchor`, `middle`)
          .attr(`stroke-width`, `0.24`)
          .attr(`font-size`, `12`)
          .attr(`cursor`, `pointer`)
          .attr(`id`, d => {return d.log_md5})
      }

      socket.on(`J_md5`, J => {

        //if (JSStore.avail().gps.length === 2) SQ_j_md5(J)
      })

        let scaleSVG = d3.zoom()
          .scaleExtent([.5, 48])
            .on(`zoom`, zoomMap);

        svg
          .call(scaleSVG);

        function zoomMap (d) {

          map.selectAll(`text`).remove();

          map.selectAll(`.adm1`).remove();

          map.selectAll(`#pos`).remove();

          map.selectAll(`.u_md5`).remove();

          map.selectAll(`.j_md5`).remove();

          let zoomScale = d3.zoomTransform(svg.node());

          projection.translate([zoomScale.x, zoomScale.y]).scale(zoomScale.k*120000);

          let rds = [];

          let PJ = projection.invert([uaX/2, uaY/2]);

          let SQ = [PJ[0] - .15, PJ[1] - .15, PJ[0] + .15, PJ[1] + .15]  

          PRI.forEach(Obj => {
 
            if (Obj.geometry.type === `LineString`) {

              Obj.geometry.coordinates.forEach(POS => {

                if (POS[0] >= SQ[0] && POS[0] <= SQ[2]) {

                  if (POS[1] >= SQ[1] && POS[1] <= SQ[3]) rds.push(Obj);
                }
              })
            }
          });

          map.selectAll(`path.rds`).data(rds)
            .enter()
            .append(`path`)
            .attr(`d`, path)
            .attr(`class`, `adm1`)
            .attr(`id`, `${adm0_a3}_adm1`)
            .attr(`stroke`, `#ffe754`)
            .attr(`fill`, `none`)
            .style(`stroke-width`, `1.95`);

          let lbls = []

          SQ = [PJ[0] - .10, PJ[1] - .10, PJ[0] + .10, PJ[1] + .10];

          labels.forEach(Obj => {

            if (Obj.LONG >= SQ[0] && Obj.LONG <= SQ[2]) {

              if (Obj.LAT >= SQ[1] && Obj.LAT <= SQ[3] && Obj.F_CLASS === `P`) lbls.push(Obj);
            }
          })

          map.selectAll(`text`).data(lbls)
                .enter()
                .append(`text`)
                .attr(`x`, d => {return projection([d.LONG, d.LAT])[0]})
                .attr(`y`, d => {return projection([d.LONG, d.LAT])[1]})
                .style(`stroke`, `#000`)
                .style(`stroke-width`, `.5`)
                .style(`font-size`, `10px`)
                .style(`font-weight`, `normal`)
                .style(`letter-spacing`, `.75px`)
                .style(`fill`, `#000`)
                .text(d => {return d.NAME})

          d3.selectAll(`path`).attr(`d`, path);

          JMD5();SQ_j_md5([JSStore.avail().j_obj]);
        }
    })

  .catch(error => {throw error})

  }

  let readMug = e => {

    if (e.className.baseVal === `u_md5`) window.location = `/mug/${e.id}/`;
  }

  let JMD5 = () => {

    if (JSStore.avail().gps.length === 2) socket.emit(`J_md5`, JSStore.avail());
  }

  let readJob = e => {

    if (e.className.baseVal === `j_md5`) window.location = `/j/${e.id}/`;
  }

  let e0 = e => {

    e = e.target;
    readMug(e);
    readJob(e)
  }

  seekJob();

  document.addEventListener(`click`, e0);

  socket.on(`J_md5`, J => {

    if (JSStore.avail().gps.length === 2) {JSStore.to({J_md5: J});}
  })
})();