`use strict`;

(function () {

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

  let slim = txt => {

    txt = txt.replace(new RegExp(`\f`, `g`), ` `);

    txt = txt.replace(new RegExp(`\n`, `g`), ` `);

    txt = txt.replace(new RegExp(`\t`, `g`), ` `);

    txt = txt.replace(new RegExp(`\r`, `g`), ` `);

    return txt
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
    JSStore.to({gps: [7.723, 50.533]});

    //JSStore.to({gps: false})

    GPS(a => {

      isCoords(a);

      AJXReq([`/devs_reqs/`, `setGPSCookie`], JSStore.avail(), (A, B) => {J_PJ()});

      }, (b) => {

        /**
        *@dev
        **/

        AJXReq([`/devs_reqs/`, `setGPSCookie`], JSStore.avail(), (A, B) => {J_PJ()});
    })    
  }

  let J_PJ = () => {

    if (document.querySelector(`#J_PJ`) && JSStore.avail().gps.length === 2) {

      document.querySelectorAll(`#J_PJ`).forEach(J => {

        J.innerHTML = (d3.geoDistance(JSStore.avail().gps, JSON.parse(J.innerHTML)) * 6888).toFixed(1) + ` Miles`;

      })
    }
  }

  let pushApplication = e => {

    if (e.id === `to-apps` || e.id === `del-apps`) {

      if (JSStore.avail().u_md5 && JSStore.avail().j_md5 && JSStore.avail().u_md5 !== JSStore.avail().j_u_md5) {

        AJXReq([`/devs_reqs/`, `pushApps`], JSStore.avail(), (A, B) => {

          if (B.exit === true) window.location = `/j/${JSStore.avail().j_md5}`;
        });
      }
    }
  }
 
  let e0 = e => {

    e = e.target;

    pushApplication(e)
  }

  document.addEventListener(`click`, e0);

  document.addEventListener(`DOMLOADED`, setGPSCookie());
})();