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
  }

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

  let alertDevAva = e => {

    if (e.id === `place-devs-ava-ejs`) {

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

        document.querySelector(`#mug-ava > img`).src = imageData;

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

      if (vjs) JSStore.to({pfolio_text: document.querySelector(`#add-pfolio-text`).value.replace(new RegExp(/&/g, `g`), `u/0026`)});

      else if (!vjs) JSStore.to({pfolio_text: false});

      document.querySelector(`#add-pfolio-text`).value = ``;

      document.querySelector(`#add-pfolio`).setAttribute(`class`, `_-Zz`);

      AJXReq([`/devs_reqs/`, `pushStory`], JSStore.avail(), (A, B) => {

        if (B.exit === true) window.location = `/feed/`;
      });
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

  setGPSCookie();
  setMD5Cookie();

  document.addEventListener(`click`, e0);
  document.addEventListener(`change`, files);

})();