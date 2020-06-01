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

      AJXReq([`/devs_reqs/`, `setGPSCookie`], JSStore.avail(), (A, B) => {});

      }, (b) => {

        /**
        *@dev
        **/

        AJXReq([`/devs_reqs/`, `setGPSCookie`], JSStore.avail(), (A, B) => {});
    })    
  }

  let setMD5Cookie = () => {

    if (JSStore.avail().in) AJXReq([`/devs_reqs/`, `setMD5Cookie`], JSStore.avail(), (A, B) => {});
  } 

  setGPSCookie();
  setMD5Cookie();

})();