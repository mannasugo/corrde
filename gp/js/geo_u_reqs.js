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

    //JSStore.to({gps: [34.753, -.533]/*[7.723, 50.533]*/});
    //JSStore.to({gps: [7.723, 50.533]});

    //JSStore.to({gps: false})
    JSStore.to({gps: [-77.035264, 38.993869]})

    GPS(a => {

      isCoords(a);

      AJXReq([`/devs_reqs/`, `setGPSCookie`], JSStore.avail(), (A, B) => {loadSeek()});

      }, (b) => {

        /**
        *@dev
        **/

        AJXReq([`/devs_reqs/`, `setGPSCookie`], JSStore.avail(), (A, B) => {loadSeek()});
    })    
  }

  let loadSeek = () => {

    if (typeof JSStore.avail().gps === `object` && JSStore.avail().gps.length === 2) seekMD5 ();

    else seekAlert();
  }

  let seekMD5 = () => {

  d3.json(`/gp/twineJSON/custom.json`)

    .then(json => {

      areaMD5();

      JMD5()
      
      let projection = d3.geoMercator()
        .scale(1200)
        .translate([uaX / 2, uaY / 2])
        .center(JSStore.avail().gps),

      path = d3.geoPath().projection(projection);

      let svg = d3.select(`#map`)
          .selectAll(`svg`).data([json])
          .style(`width`, uaX + `px`)
          .style(`height`, (uaY - 55) + `px`)
          .attr(`class`, `d3JS _aXZ _gmg`)

        let map = svg.append(`g`)
          .attr(`class`, `boundary`);

      let md5 = () => {

        map.selectAll(`pos`).data([{}])
          .enter()
          .append(`circle`)
          .attr(`id`, `pos`)
          .attr(`cx`, projection(JSStore.avail().gps)[0])
          .attr(`cy`, projection(JSStore.avail().gps)[1])
          .attr(`r`, 5)
          .attr(`fill`, `#1185fe`)
          .attr(`stroke`, `#fff`)
      }

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

      md5();

          let PRI = [];

          let RDS = {}

      d3.json(`/gp/twineJSON/${adm0_a3}_rds.json`)

        .then(rds_json => {

          rds_json = topojson.feature(rds_json, rds_json.objects[`${adm0_a3}_rds.geo`]);RDS = rds_json;

          rds_json.features.forEach(Obj => {

          let rds = [];

          let PJ = projection.invert([uaX/2, uaY/2]);

          let SQ = [PJ[0] - .10, PJ[1] - .10, PJ[0] + .10, PJ[1] + .10]  

          //PRI.forEach(Obj => {
 
            if (Obj.geometry.type === `LineString`) {

              Obj.geometry.coordinates.forEach(POS => {

                if (POS[0] >= SQ[0] && POS[0] <= SQ[2]) {

                  if (POS[1] >= SQ[1] && POS[1] <= SQ[3]) rds.push(Obj);
                }
              })
            }
          //});

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

            //if (Obj.LONG >= SQ[0] && Obj.LONG <= SQ[2]) {

              //if (Obj.LAT >= SQ[1] && Obj.LAT <= SQ[3] && Obj.NAME === `Berlin`) labels.push(Obj);
            //}
            labels.push(Obj);labels = labels.slice(0, 3500)
          });
      })

      .catch(error => {throw error})

      d3.json(`/gp/twineJSON/${adm0_a3}_wat0.json`)

        .then(wat0_json => {

          wat0_json = topojson.feature(wat0_json, wat0_json.objects[`${adm0_a3}_wat0.geo`]);

          wat0_json.features.forEach(Obj => {

            //labels.push(Obj);
          })

          map.selectAll(`path.wat0`).data(wat0_json.features)
            .enter()
            .append(`path`)
            .attr(`d`, path)
            .attr(`stroke`, `#1185fe`)
            .attr(`fill`, `#1185fe`)

          JMD5()
      })

      .catch(error => {throw error})

      let SQ_u_md5 = (Obj) => {

        map.selectAll(`.u_md5`).remove();

        map.selectAll(`SQ.u_md5`).data(Obj)
          .enter()
          .append(`circle`)
          .attr(`class`, `u_md5`)
          .attr(`cx`, d => {return parseInt(projection(d.gps) [0]);})
          .attr(`cy`, d => {return parseInt(projection(d.gps) [1]);})
          .attr(`r`, 5)
          .attr(`fill`, `#1185fe`)
          .attr(`stroke`, `#fff`)
          .attr(`id`, d => {return d.u_md5})

        map.selectAll(`SQ.u_md5`).data(Obj)
          .enter()
          .append(`rect`)
          .attr(`x`, d => {return parseInt(projection(d.gps) [0]) - 25;})
          .attr(`y`, d => {return parseInt(projection(d.gps) [1]) - 25;})
          .attr(`class`, `u_md5`)
          .attr(`width`, `25`)
          .attr(`height`, `25`)
          .attr(`fill`, `#1185fe`)
          .attr(`stroke`, `none`)
          .attr(`id`, d => {return Obj.u_md5})

        map.selectAll(`SQ.u_md5`).data(Obj)
          .enter()
          .append(`circle`)
          .attr(`cx`, d => {return parseInt(projection(d.gps) [0]) - 25;})
          .attr(`cy`, d => {return parseInt(projection(d.gps) [1]) - 25;})
          .attr(`r`, 25)
          .attr(`class`, `u_md5`)
          .attr(`cursor`, `pointer`)
          .attr(`fill`, `#1185fe`)
          .attr(`stroke`, `none`)
          .attr(`id`, d => {return d.u_md5})

        map.selectAll(`SQ.u_md5`).data(Obj)
          .enter()
          .append(`text`)
          .attr(`x`, d => {return parseInt(projection(d.gps) [0]) - 25;})
          .attr(`y`, d => {return parseInt(projection(d.gps) [1]) - 20;})
          .text(d => {return (d3.geoDistance(JSStore.avail().gps, d.gps) * 6888).toFixed(1) + ` Mil`;})
          .attr(`class`, `u_md5`)
          .style(`fill`, `#fff`)
          .attr(`text-anchor`, `middle`)
          .attr(`stroke-width`, `0.24`)
          .attr(`font-size`, `10`)
          .attr(`cursor`, `pointer`)
          .attr(`id`, d => {return d.u_md5})
      }

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

      socket.on(`area_md5`, u_md5 => {

        if (JSStore.avail().gps.length === 2) SQ_u_md5(u_md5[0])
      })

      socket.on(`J_md5`, J => {

        if (JSStore.avail().gps.length === 2) SQ_j_md5(J)
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

          projection.translate([zoomScale.x, zoomScale.y]).scale(zoomScale.k*1200);

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

          /*let adm0_a3;

          let geos = []

          json.features.forEach((Obj, i) => {

            if (d3.geoContains(Obj, projection.invert([uaX/2, uaY/2]))) {

              adm0_a3 = Obj.properties.adm0_a3;

              //console.log(Obj.properties, zoomScale.k)
              if (zoomScale.k > 10) {
                d3.selectAll(`path`)
                .filter((p,q) => {if (neighbors[i].indexOf(q) > -1) return geos.push(p)})
                              //.style(`fill`, `green`)
              }

            }

              map.selectAll(`text`).data(geos)
                .enter()
                .append(`text`)
                .attr(`x`, d => {return path.centroid(d)[0]})
                .attr(`y`, d => {return path.centroid(d)[1]})
                .style(`stroke`, `#000`)
                .style(`stroke-width`, `.5`)
                .style(`font-size`, `12.5px`)
                .attr(`font-weight`, `normal`)
                .style(`fill`, `#000`)
                .attr(`text-transform`, `uppercase`)
                .text(d => {return d.properties.adm0_a3})
          })

          if (zoomScale.k < 20) {

            d3.selectAll(`.adm1`).remove();

            if (!document.querySelector(`#adm0`)) {

              map.selectAll(`path`).data(sel)
                .enter()
                .append(`path`)
                .attr(`d`, path)
                .attr(`class`, `adm0`);
              }
          }

          if (zoomScale.k > 20 && adm0_a3 && !document.querySelector(`#${adm0_a3}_adm1`)) {

            d3.json(`/gp/twineJSON/${adm0_a3}_rds.json`)

              .then(rds_json => {

                //d3.selectAll(`.water`).remove()

                rds_json = topojson.feature(rds_json, rds_json.objects[`${adm0_a3}_rds.geo`]);

                let PRI = [];//console.log(rds_json.features[0])

                rds_json.features.forEach(Obj => {

                //if (Obj.properties.RTT_DESCRI === `Primary Route`) 
                  PRI.push(Obj);
                })

                map.selectAll(`path.adm1`).data(PRI)
                  .enter()
                  .append(`path`)
                  .attr(`d`, path)
                  .attr(`class`, `adm1`)
                  .attr(`id`, `${adm0_a3}_adm1`)
                  .attr(`stroke`, `#fff`)
                  .attr(`fill`, `none`)
                  .style(`stroke-width`, `1.5`)
              })

              .catch(error => {throw error})
          }

          if (zoomScale.k > 24) {

            d3.selectAll(`.adm0`).remove();
            d3.selectAll(`.water`).remove();
            d3.selectAll(`.adm1`).style(`fill`, `#cccccc`);
          }*/

          d3.selectAll(`path`).attr(`d`, path);

          md5();

          areaMD5();

          JMD5();

          socket.on(`area_md5`, u_md5 => {

            if (JSStore.avail().gps.length === 2) SQ_u_md5(u_md5[0])
          })

          socket.on(`J_md5`, J => {

            if (JSStore.avail().gps.length === 2) SQ_j_md5(J)
          })
        }
    })

  .catch(error => {throw error})

  }

  let seekAlert = () => {

    document.querySelector(`#seek-modal-ejs`).setAttribute(`class`, `-Zz`);

    d3.json(`/gp/twineJSON/custom.json`)
      
      .then(json => {

        let PJ = d3.geoMercator()
          .scale(120)
          .translate([uaX / 2, uaY / 2])
          .center([0, 32]),

          path = d3.geoPath().projection(PJ);

        let svg = d3.select(`#map`)
          .selectAll(`svg`).data([json])
          .style(`width`, uaX + `px`)
          .style(`height`, (uaY - 55) + `px`)
          .attr(`class`, `d3JS _aXZ _gmg`)

        let map = svg.append(`g`)
          .attr(`class`, `boundary`);

        let topo = json;

        json = topojson.feature(json, json.objects[`custom.geo`])

        let sel = []

        json.features.forEach(Obj => {

          sel.push(Obj);
        })

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

    }).catch(error => {throw error})
  }

  let supportMsgModal = e => {

    if (e.id === `support-msg-ejs`) {

      if (JSStore.avail().in) document.querySelector(`#support-to-ejs`).setAttribute(`class`, `_-Zz`);

      let modal_ejs = document.querySelector(`#support-msg-modal-ejs`);

      document.querySelector(`#push-quiz-true`).setAttribute(`class`, `_-Zz _sZ2`);
      document.querySelector(`#hide-support-msg-ejs`).setAttribute(`class`, `-Zz`);

      if (modal_ejs.className === `_-Zz`) modal_ejs.className = `-Zz`
    }
  }

  let locate = e => {

    if (e.id === `locate`) setGPSCookie();
  }

  let areaMD5 = () => {

    if (JSStore.avail().u_md5 && JSStore.avail().gps.length === 2) socket.emit(`area_md5`, JSStore.avail());
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
    
    supportMsgModal(e);
    readMug(e);
    readJob(e)
  }

  setGPSCookie();

  document.addEventListener(`click`, e0);

  let skilledSlides = d3.select(`#skilled-rotate-ejs`)
  d3.select(`#skilled-slide-ejs`).call(d3.zoom().scaleExtent([1, 1]).translateExtent([[0,0], [3250, 3250]]) .on(`zoom`, () => {
    skilledSlides.style(`transform`, `translate3d(${d3.event.transform.x}px, 0, 0)`)
  }))

  socket.on(`area_md5`, md5 => {

    if (JSStore.avail().gps.length === 2) {JSStore.to({area_md5: md5});}
  })

  socket.on(`J_md5`, J => {

    if (JSStore.avail().gps.length === 2) {JSStore.to({J_md5: J});}
  })
})();