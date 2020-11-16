`use strict`;

(function () {

  const socket = io();

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

  let listMug = e => {

    if (e.id === `mug-ava`) {

      let to = document.querySelector(`#mugger`);

      if (to.className === `_aAY _-Zz`) {
        to.className = `_aAY -Zz`;
      }

      else if (to.className === `_aAY -Zz`) {
        to.className = `_aAY _-Zz`;
      }
    }
  }

  let unlistMug = e => {

    if (e.id === `del`) {

      let modals = document.querySelectorAll(`[for = 'modal']`);

      for (let i = 0; i < modals.length; i++) {
        
        if (modals[i].className === `_aAY -Zz`) {

          modals[i].setAttribute(`class`, `_aAY _-Zz`);
        }
      }
    }

  }

  let listServices = e => {

    if (e.id === `subs`) {

      socket.emit(`listServices`, e.innerHTML);
    }
  }

  let unlistServices = e => {

    if (e.id === `exit-subs`) {

      let modal_ejs = document.querySelector(`#list-subs`);

      document.querySelectorAll(`#_subs_`).forEach(E => E.innerHTML = ``)

      //if (modal_ejs.className === `-Zz`) modal_ejs.className = `_-Zz`
    }
  }

  let SetCurrency = e => {

    if (e.id === `SetCurrency`) {

      let to = document.querySelector(`#Monies`);

      if (to.className === `_aAY _-Zz`) to.className = `_aAY -Zz`;

      else if (to.className === `_aAY -Zz`) to.className = `_aAY _-Zz`;

    }
  }

  let setSaleMode = () => {

    if (JSStore.avail().sale_mode) {

      document.querySelector(`#SetCurrency > text`).innerHTML = JSStore.avail().sale_mode;

      let SaleModeMap = {
        aud: [1.37, `$`],
        cad: [1.31, `$`],
        eur: [0.84, `€`],
        gbp: [0.76, `£`],
        kes: [109, `KES`],
        usd: [1, `$`],
        yen: [104.50, `¥`]
      }

      document.querySelectorAll(`#denom`).forEach(Sale => {

        Sale.innerHTML = SaleModeMap[JSStore.avail().sale_mode][1];

      });

      document.querySelectorAll(`#denomValue`).forEach(Sale => {

        Sale.innerHTML = (SaleModeMap[JSStore.avail().sale_mode][0] * Sale.getAttribute(`usd`)).toFixed(2);

        if (JSStore.avail().sale_mode !== `kes`) Sale.innerHTML += ` ${(JSStore.avail().sale_mode).toUpperCase()}`

      });
    }
  }

  let pickSaleMode = e => {

    if (e.id === `saleMode`) {

      JSStore.to({sale_mode: e.getAttribute(`for`)});

      document.querySelector(`#SetCurrency > text`).innerHTML = JSStore.avail().sale_mode;

      setSaleMode();
    }
  }

  let setCouponModal = () => {

    if (JSStore.avail().u_md5) return;

    if (JSStore.avail().sale_cut) return;

    let modal_ejs = document.querySelector(`#Coupon`);

      if (modal_ejs.className === `_-Zz`) {
        modal_ejs.className = `-Zz`;
      }
  }

  let foldCoupon = e => {

    if (e.id === `foldCoupon`) {

      let modal_ejs = document.querySelector(`#Coupon`);

      if (modal_ejs.className === `_-Zz`) {
        modal_ejs.className = `-Zz`;
      }

      else if (modal_ejs.className === `-Zz`) {
        modal_ejs.className = `_-Zz`;
      }
    }
  }
 
  let e0 = e => {

    e = e.target;

    listMug(e);

    unlistMug(e);

    listServices(e);

    unlistServices(e);

    SetCurrency(e);

    pickSaleMode(e);

    foldCoupon(e)
  }

  setGPSCookie();

  setSaleMode();

  setCouponModal()

  document.addEventListener(`click`, e0);

  socket.on(`listServices`, J => {

    //document.querySelectorAll(`#modalView`).parentNode.removeChild(`div`);
              
    let msg = document.createElement(`div`);

    msg.setAttribute(`id`, `_subs_`);

    msg.innerHTML = new Model().modelStringify([J]);

    document.querySelector(`#corrde-root`).appendChild(msg);

    let modal_ejs = document.querySelector(`#list-subs`);

    if (modal_ejs.className === `_-Zz`) modal_ejs.className = `-Zz`

  })

  let supportSlides = d3.select(`#support-rotate-ejs`)
  d3.select(`#support-slide-ejs`).call(d3.zoom().scaleExtent([1, 1]).translateExtent([[0,0], [3250, 3250]]) .on(`zoom`, () => {
    supportSlides.style(`transform`, `translate(${d3.event.transform.x}px)`)
  }))


  let skilledSlides = d3.select(`#skilled-rotate-ejs`)
  d3.select(`#skilled-slide-ejs`).call(d3.zoom().scaleExtent([1, 1]).translateExtent([[0,0], [3250, 3250]]) .on(`zoom`, () => {
    skilledSlides.style(`transform`, `translate3d(${d3.event.transform.x}px, 0, 0)`)
  }))

  let jobsSlides = d3.select(`#jobs-rotate-ejs`)
      d3.select(`#jobs-slide-ejs`).call(d3.zoom().scaleExtent([1, 1]).translateExtent([[0,0], [3250, 3250]]) .on(`zoom`, () => {
    jobsSlides.style(`transform`, `translate3d(${d3.event.transform.x}px, 0, 0)`)
  }))


  let slideJobs = d3.select(`#jobs-rotate`)
  d3.select(`#jobs-slide`).call(d3.zoom().scaleExtent([1, 1]).translateExtent([[0,0], [3250, 3250]]) .on(`zoom`, () => {
    slideJobs.style(`transform`, `translate3d(${d3.event.transform.x}px, 0, 0)`)
  }))
})();