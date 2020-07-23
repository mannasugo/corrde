`use strict`;

(function () {

  let e0 = e => {

    e = e.target;

    alertDevAva(e);

    devAvaOut(e);

    iniDevAva(e);

    field2Service(e);

    saveService(e);

    iniStory(e);

    pushStory(e);

    startStoryMail(e);

    pushStoryMail(e);

    pushStoryMail2(e);
  }

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

    JSStore.to({gps: [7.723, 50.533]});//JSStore.to({gps: false});

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

  let setMD5Cookie = () => {

    if (JSStore.avail().in) AJXReq([`/devs_reqs/`, `setMD5Cookie`], JSStore.avail(), (A, B) => {});
  }

  let alertDevAva = e => {

    if (e.id === `place-devs-ava-ejs` || e.parentNode.id === `self`) {

      let modal_ejs = document.querySelector(`#ava-modal-ejs`);

      if (modal_ejs.className === `_-Zz`) {
        modal_ejs.className = `-Zz`;
      }
    }
  }

  let devAvaOut = e => {

    if (e.id === `ava-place-exit-ejs` || e.id === `ava-place-save-ejs`) {

      let modal_ejs = document.querySelector(`#ava-modal-ejs`);

      if (modal_ejs.className === `_-Zz`) {
        modal_ejs.className = `-Zz`;
      }

      else if (modal_ejs.className === `-Zz`) {
        modal_ejs.className = `_-Zz`;
      }
    }
  }

  let iniDevAva = e => {if (e.id === `devs-ava-ejs`) JSStore.to({file: `u_md5_ava`})}

  let iniStory = e => {if (e.id === `add-pfolio-img`) JSStore.to({file: `u_md5_pfolio_img`})}

  let files = e => {

    let e_ = e.target;

    if (e_.id === `file`) {
      e.stopImmediatePropagation();

      if (JSStore.avail().file === `u_md5_ava`) devAva(e_.files);

      else if (JSStore.avail().file === `u_md5_pfolio_img`) AddStory(e_.files);
    }
  }

  function allocFile (img, file) {

    let alloc = new FileReader();

    alloc.onload = (e) => {
      img.src = e.target.result;
    };

    alloc.readAsDataURL(file);
  }

  const devAva = files => {

    if (!files || !files.length) return;

    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      if (!file.type.match(`image.*`) || file.size > 1048576) return;

      let image;

      if (!document.querySelector(`#img`)) {
        image = new Image();
        image.setAttribute(`id`, `img`);
      } else {
        image = document.querySelector(`#img`);
      }

      allocFile(image, file);

      image.onload = () => {

        let img_x = image.naturalWidth, img_y = image.naturalHeight;
        let left_x, left_y, dim_x, dim_y;

        let ratio_xy = img_x/img_y;

        if (ratio_xy > 1) {
          left_y = 0;
          dim_y = img_y;
          dim_x = img_y * 1;
          left_x = (img_x - dim_x)/2;
        } else {
          left_x = 0;
          dim_x = img_x;
          dim_y = img_x * 1;
          left_y = (img_y - dim_y)/2;
        }

        let plane;

        if (!document.querySelector(`canvas`)) {
          plane = document.createElement(`canvas`);
        } else {
          plane = document.querySelector(`canvas`);
        }

        plane.width = dim_x, plane.height = dim_y;

        let canvas = plane.getContext(`2d`);
        canvas.drawImage(image, left_x, left_y, dim_x, dim_y, 0, 0, dim_x, dim_y);

        let imageData = plane.toDataURL(`image/jpeg`);
        let b64 = imageData.replace('data:image/jpeg;base64,',``);
        let binary = atob(b64);
        let array = [];

        for (let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
  
        let blob = new Blob([new Uint8Array(array)], {type: file.type});

        document.querySelector(`#devs-ava-ejs > img`).src = imageData;

        if (document.querySelector(`#mug-ava > img`)) document.querySelector(`#mug-ava > img`).src = imageData;

        if (document.querySelector(`#self > img`)) document.querySelector(`#self > img`).src = imageData;

        const fileTo = new AJXFile();

        fileTo.call(`/devs_reqs/`, {
          value: JSON.stringify(JSStore.avail()),
          to: () => {

            if (fileTo.req.responseText.length > 0) {
              B = JSON.parse(fileTo.req.responseText);

              if (B.u_md5_ava) {document.querySelector(`#ava-obj-ejs`).style.display = `none`;}
            }
          }}, blob);
      };
          
    }
  }

  const AddStory = files => {

    if (!files || !files.length) return;

    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      if (!file.type.match(`image.*`) || file.size > 1048576) return;

      let image;

      if (!document.querySelector(`#pfolio_img`)) {
        image = new Image();
        image.setAttribute(`id`, `pfolio_img`);
      } else {
        image = document.querySelector(`#pfolio_img`);
      }

      allocFile(image, file);

      image.onload = () => {

        let img_x = image.naturalWidth, img_y = image.naturalHeight;
        
        let b64 = image.src.replace('data:image/jpeg;base64,',``);
        let binary = atob(b64);
        let array = [];

        for (let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
  
        let blob = new Blob([new Uint8Array(array)], {type: file.type});

        document.querySelector(`._aGX`).setAttribute(`class`, `_aGX`);

        document.querySelector(`._g0z`).style.paddingBottom  = `${(img_y/img_x) * 100}%`;
        document.querySelector(`._g0z > img`).src = image.src;

        JSStore.to({pfolio_img_x: img_x, pfolio_img_y: img_y, pfolio_secs: new Date().valueOf()});

        const fileTo = new AJXFile();

        fileTo.call(`/devs_reqs/`, {
          value: JSON.stringify(JSStore.avail()),
          to: () => {

            if (fileTo.req.responseText.length > 0) {
              B = JSON.parse(fileTo.req.responseText);

              if (B.u_md5_pfolio_img) {JSStore.to({u_md5_pfolio_img: B.u_md5_pfolio_img});}
            }
          }}, blob);
      };
          
    }
  }

  let field2Service = e => {

    if (e.id === `field-ejs`) {

      document.querySelectorAll(`#service`).forEach(p => p.setAttribute(`class`, `_-Zz`));
      document.querySelector(`[field = "${e.getAttribute(`for`)}"]`).setAttribute(`class`, `-Zz`);

      JSStore.to({pfolio_field: e.value.replace(new RegExp(/&/g, `g`), `u/0026`)});
      JSStore.to({pfolio_service: false})

      document.querySelectorAll(`._g00 > p`)[0].innerHTML = e.value;
    }
  }

  let saveService = e => {

    if (e.id === `service-ejs`) {

      JSStore.to({pfolio_service: e.value.replace(new RegExp(/&/g, `g`), `u/0026`)});
      document.querySelector(`#hide-pfolio-ava`).setAttribute(`class`, `_QZg _gxM _aA2 _-Zz`);
      document.querySelector(`#hide-pfolio-img`).setAttribute(`class`, `_QZg -Zz`);

      document.querySelectorAll(`._g00 > p`)[1].innerHTML = e.value;
      document.querySelectorAll(`._sZ2`)[0].style.display = `none`;
    }
  }

  let pushStory = e => {

    if (e.id === `add-pfolio`) {

      let vjs = new Auxll().longSlim(document.querySelector(`#add-pfolio-text`).value.replace(new RegExp(/&/g, `g`), `u/0026`));

      if (vjs) JSStore.to({pfolio_text: slim(document.querySelector(`#add-pfolio-text`).value).replace(new RegExp(/&/g, `g`), `u/0026`)});

      else if (!vjs) JSStore.to({pfolio_text: false});

      document.querySelector(`#add-pfolio-text`).value = ``;

      document.querySelector(`#add-pfolio`).setAttribute(`class`, `_-Zz`);

      AJXReq([`/devs_reqs/`, `pushStory`], JSStore.avail(), (A, B) => {

        if (B.exit === true) window.location = `/feed/`;
      });
    }
  }

  let pushStoryMail = e => {

    if (e.id === `add-pfolio-mail`) {

      let vjs = new Auxll().longSlim(document.querySelector(`#pfolio-mail`).value);

      if (vjs) {

        JSStore.to({pfolio_mail: slim(vjs).replace(new RegExp(/&/g, `g`), `u/0026`)});

        document.querySelector(`#pfolio-mail`).value = ``;

        document.querySelector(`#hide-pfolio-mail`).setAttribute(`class`, `_-Zz _geQ _uZM`);

        AJXReq([`/devs_reqs/`, `pushStoryMail`], JSStore.avail(), (A, B) => {

          if (B.exit === true) socket.emit(`polyg_mail`, JSStore.avail())
        });
      }

      else if (!vjs) JSStore.to({pfolio_mail: false});
    }
  }

  let startStoryMail = e => {

    if (e.id === `start-pfolio-mail`) {

      let modal_ejs = document.querySelector(`#hide-pfolio-mail`);

      if (modal_ejs.className === `_-Zz _geQ _uZM`) modal_ejs.className = `-Zz _geQ _uZM`;

      else if (modal_ejs.className === `-Zz _geQ _uZM`) modal_ejs.className = `_-Zz _geQ _uZM`;
    }
  }

  let loadStory = e => {

    if (!JSStore.avail().u_md5) {

      if (document.querySelector(`#hide-pfolio-icons`)) document.querySelector(`#hide-pfolio-icons`).style.display = `none`;

      if (document.querySelector(`#hide-pfolio-mail`)) document.querySelector(`#hide-pfolio-mail`).style.display = `none`;
    }

    if (JSStore.avail().mail2 && JSStore.avail().mail2 === true) {

      if (document.querySelector(`#hide-pfolio-icons`)) document.querySelector(`#start-mail2`).setAttribute(`class`, `-_tX HeartsColor`)}
  }

  let pushStoryMail2 = e => {

    if (!JSStore.avail().u_md5) return;

    if (e.id === `start-mail2`) {

      AJXReq([`/devs_reqs/`, `pushStoryMail2`], JSStore.avail(), (A, B) => {

          if (B.exit === true) socket.emit(`mail2`, JSStore.avail());
        });
    }
  }

  let last_PJ =  () => {

    d3.json(`/gp/twineJSON/custom.json`)

      .then(json => {

        json = topojson.feature(json, json.objects[`custom.geo`]);

        let adm0_a3;

        json.features.forEach(Obj => {

          if (JSStore.avail().last_PJ && d3.geoContains(Obj, JSStore.avail().last_PJ)) adm0_a3 = Obj.properties.name_long;

        });

        if (JSStore.avail().last_PJ && adm0_a3 && document.querySelector(`#last_PJ`)) {

          let ejs = document.querySelector(`#last_PJ`);

          ejs.querySelectorAll(`p`)[0].innerHTML = adm0_a3;
          ejs.setAttribute(`class`, `_yZS _geQ _uZM -Zz`)
        }

      }).catch(error => {throw error});
  }

  let J_PJ = () => {

    if (document.querySelector(`#J_PJ`) && JSStore.avail().gps.length === 2) {

      document.querySelectorAll(`#J_PJ`).forEach(J => {

        J.innerHTML = (d3.geoDistance(JSStore.avail().gps, JSON.parse(J.innerHTML)) * 6888).toFixed(1) + ` Miles`;

      })
    }
  }

  let aroundSlides = d3.select(`#around-rotate-ejs`)
  d3.select(`#around-slide-ejs`).call(d3.zoom().scaleExtent([1, 1]).translateExtent([[0,0], [3250, 3250]]) .on(`zoom`, () => {
    aroundSlides.style(`transform`, `translate(${d3.event.transform.x}px)`)
  }))

  let storiesSlides = d3.select(`#stories-rotate-ejs`)
  d3.select(`#stories-slide-ejs`).call(d3.zoom().scaleExtent([1, 1]).translateExtent([[0,0], [3250, 3250]]) .on(`zoom`, () => {
    storiesSlides.style(`transform`, `translate3d(${d3.event.transform.x}px, 0, 0)`)
    storiesSlides.style(`transition-duration`, `0ms`)
  }))

  let skilledSlides = d3.select(`#skilled-rotate-ejs`)
  d3.select(`#skilled-slide-ejs`).call(d3.zoom().scaleExtent([1, 1]).translateExtent([[0,0], [3250, 3250]]) .on(`zoom`, () => {
    skilledSlides.style(`transform`, `translate3d(${d3.event.transform.x}px, 0, 0)`)
  }))

  let slideJobs = d3.select(`#jobs-rotate`)
  d3.select(`#jobs-slide`).call(d3.zoom().scaleExtent([1, 1]).translateExtent([[0,0], [3250, 3250]]) .on(`zoom`, () => {
    slideJobs.style(`transform`, `translate3d(${d3.event.transform.x}px, 0, 0)`)
  }))

  let fieldSlide = document.querySelectorAll(`#service-slide-ejs`)

  fieldSlide.forEach( slide => {

    slide = d3.select(slide)
    slide.call(d3.zoom().scaleExtent([1, 1]).translateExtent([[0,0], [3250, 3250]]) .on(`zoom`, () => {
     slide.select(`#service-rotate-ejs`).style(`transform`, `translate3d(${d3.event.transform.x}px, 0, 0)`)
  }))})

  setGPSCookie();
  setMD5Cookie();
  loadStory()
  last_PJ();

  document.addEventListener(`click`, e0);
  document.addEventListener(`change`, files);

  socket.on(`mail2`, polyg => {

    if (polyg.md5 === JSStore.avail().pfolio_log_md5 && JSStore.avail().u_md5) {

      let mail2;

      if (polyg.mail2Obj.indexOf(JSStore.avail().u_md5) !== -1) mail2 = true;

      else if (polyg.mail2Obj.indexOf(JSStore.avail().u_md5) === -1) mail2 = false;

      JSStore.to({mail2: mail2});

      if (JSStore.avail().mail2 === true) document.querySelector(`#start-mail2`).setAttribute(`class`, `-_tX HeartsColor`);

      else if (JSStore.avail().mail2 === false) document.querySelector(`#start-mail2`).setAttribute(`class`, `-_tX HeartsGray`);

      document.querySelector(`#mail2`).innerHTML = polyg.mail2Obj.length;
      
    }
  })

  socket.on(`polyg_mail`, polyg => {

    if (!document.querySelector(`#polyg-mail`)) return;

    if (polyg.md5 === JSStore.avail().pfolio_log_md5 && JSStore.avail().u_md5) {

      document.querySelector(`#mail`).innerHTML = polyg.mailObj.length;

      document.querySelector(`#polyg-mail`).innerHTML = new Model().modelStringify(polyg.model);
      
    }
  })

})();