`use strict`;

(function () {

  const uaX = parseInt(document.querySelector(`body`).clientWidth);
    
  const uaY = parseInt(document.querySelector(`#map`).clientHeight + 55);


  let twinegyro = () => {

    let gps = [0, 32]//[-119.103781, 33.440444]

    let geoJSON = `custom.json`//`34.3455738_-0.7830171_34.7117878_-0.3787922.geoJSON`//`ne_110m_admin_0_map_units.geo.json`;

    d3.json(`/gp/twineJSON/` + geoJSON)
      
      .then(json => {

        /**
        @todo

        let viewPort = d3.geoDistance(
          [(gps[0] - .005), (gps[1] - .005)], [(gps[0] + .005), (gps[1] + .005)])

        **/

        let projection = d3.geoMercator()
          .scale(120)
          .translate([uaX / 2, uaY / 2])
          .center(gps),

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

        let sel = []

        json.features.forEach(Obj => {

          //if (Obj.geometry.type !== `Point`) 
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

        waterSVG(map, projection);
        //water2SVG(map, projection);

        let scaleSVG = d3.zoom()
          //.scaleExtent([1, 1000])
            //.translate(projection.translate())
            //.scale(projection.scale())
            .on(`zoom`, zoomMap);

        svg
          .call(scaleSVG//d3.zoom()
            //.scaleExtent([1, 1000])
            //.on(`zoom`, () => {

              //map.attr(`transform`, d3.event.transform);
              //zoomSVG(map, json, projection);
           // })
          );


        function zoomMap (d) {

          map.selectAll(`text`).remove()

          let zoomScale = d3.zoomTransform(svg.node());

          let neighbors = topojson.neighbors(topo.objects[`custom.geo`].geometries)

          projection.translate([zoomScale.x, zoomScale.y]).scale(zoomScale.k*120);

          let geos = [];

          let adm0_a3;

          json.features.forEach((Obj, i) => {

            if (d3.geoContains(Obj, projection.invert([uaX/2, uaY/2]))) {

              adm0_a3 = Obj.properties.adm0_a3;

              console.log(Obj.properties, zoomScale.k)
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

            d3.json(`/gp/twineJSON/${adm0_a3}_adm1.json`)

              .then(rds_json => {

                //d3.selectAll(`.water`).remove()

                rds_json = topojson.feature(rds_json, rds_json.objects[`${adm0_a3}_adm1.geo`]);

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
          }

          d3.selectAll(`path`).attr(`d`, path)     
        }

        /**
        @dev - mylocation
        **/

        //labelSVG(map, projection)

      })

    .catch(error => {throw error;});
  }

  let waterSVG = (e, angle) => {

    d3.json(`/gp/twineJSON/ne_50m_lakes.json`)

      .then(json => {

        let path = d3.geoPath().projection(angle);

        let map = e.append(`g`)
          .attr(`class`, `water`);

        json = topojson.feature(json, json.objects[`ne_50m_lakes.geo`])

        map.selectAll(`path`).data(json.features)
          .enter()
          .append(`path`)
          .attr(`d`, path)
          .attr(`stroke`, `#1185fe`)
          .attr(`fill`, `#1185fe`)

    })

    .catch(error => {throw error;});
  };

  let water2SVG = (e, angle) => {

    d3.json(`/gp/twineJSON/KEN_wat0.geo.json`)

      .then(json => {

        let path = d3.geoPath().projection(angle);

        let map = e.append(`g`)
          .attr(`class`, `rsv`);

        map.selectAll(`path`).data(json.features)
          .enter()
          .append(`path`)
          .attr(`d`, path)
          .attr(`stroke`, `#1185fe`)
          .attr(`fill`, `#1185fe`)

        map.select(`.rsv`)
          //.attr(`fill`, `#d7d7dd`)
          .attr(`stroke`, `#1185fe`)
          .style(`stroke-width`, 1.2)

    })

    .catch(error => {throw error;});
  };

  let zoomSVG = (e, json, angle) => {

    //e.selectAll(`path`).attr(`stroke-width`, 1.1 * .5)

    let zoomScale = d3.event.transform.k;

    /*if (zoomScale > 1.2) {e.selectAll(`path`).attr(`stroke-width`, 1.1 * .5)}
    
    if (zoomScale > 1.8) {e.selectAll(`path`).attr(`stroke-width`, 1.1 * .5)}

    if (zoomScale > 2) {e.selectAll(`path`).attr(`stroke-width`, 1.1 * .5)}*/

    let labelSVGZoom = () => {

      d3.selectAll(`#pins`)
        .attr(`stroke-width`, (.2)/zoomScale)
        .attr(`font-size`, (6)/zoomScale + `pt`)
        .attr(`textLength`, (.2)*zoomScale + `pt`)
        .attr(`transform`, `scale(1)`)
    }

    let onlabelSVGZoom = () => {

      if (zoomScale > 2) labelSVGZoom();

      if (zoomScale > 2.2) labelSVGZoom();

      if (zoomScale > 2.4) labelSVGZoom();

      if (zoomScale > 2.6) labelSVGZoom();

      if (zoomScale > 2.8) labelSVGZoom();

      if (zoomScale > 10) {

        e.selectAll(`#pins`)
        .attr(`stroke-width`, (.2)/zoomScale)
        .attr(`font-size`, 8/zoomScale + `pt`)
        .attr(`textLength`, (.2)*zoomScale + `pt`)

        .attr(`transform`, `scale(1)`)
      }

    }

    //onlabelSVGZoom()

    //if (zoomScale > 2.2) {

      //e.selectAll(`path`).attr(`stroke-width`, (1.8)/zoomScale);

      //e.selectAll(`path`).style(`stroke-width`, 0)

      //e.selectAll(`path`).attr(`stroke-width`, 1.1 * .25)

      e.selectAll(`path`).style(`stroke-width`, (1.5)/zoomScale)

      e.selectAll(`path`).attr(`stroke-opacity`, 1)
      
    //}

    //if (zoomScale > 16) 

    //labelSVG(e, angle)

    onlabelSVGZoom()
  }

  let labelSVG = (e, angle) => {

    //let zoomScale = d3.event.transform.k;

    //if (zoomScale < 2) return;

    d3.json(`/gp/twineJSON/HOMA_BAY.json`)//(`/gp/twineJSON/KEN_gaz.geo.json`)

      .then(json => {

        json = topojson.feature(json, json.objects[`34.3455738_-0.7830171_34.7117878_-0.3787922`])

        let sel = []

        json.features.forEach(Obj => {

          //if (Obj.ADM2 === `HOMA_BAY` && Obj.F_CLASS === `P`) sel.push(Obj);
          if (Obj.properties.amenity && Obj.properties.amenity === `school`) sel.push(Obj);
        })

        d3.select(`#map`).append(`g`)
          .attr(`id`, `lbls`)

      let labels = e.selectAll(`text`).data(sel)
      .enter()
      .append(`text`)
      .attr(`x`, d => {
      
        //return angle([d.LONG, d.LAT])[0] ;
        return angle(d.geometry.coordinates)[0] ;
      })
      .attr(`y`, d => {
      
        //return angle([d.LONG, d.LAT])[1];
        return angle(d.geometry.coordinates)[1] ;
      })
      .text(d => {
        //return d.NAME;
        return d.properties.name
      })
      .attr(`id`, `pins`)
      .attr(`stroke`, `#4f4f4f`)
      .attr(`font-size`, `0pt`)
      .attr(`textLength`, d => {
        //return d.NAME.length
        return d.properties.name.length
      })
      .attr(`lengthAdjust`, `spacing`)

    })

    .catch(error => {throw error;});
  };

  twinegyro();
})();