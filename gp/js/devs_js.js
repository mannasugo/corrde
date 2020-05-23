`use strict`;

(function () {

  let e0 = e => {

    e = e.target;

    createDev(e);

    accessDev(e);

    alertDevAva(e);

    devAvaOut(e);

    iniDevAva(e);

    alertPassReset(e);

    passReset(e);

    passResetAlertOut(e);

    appendDevsModal(e);

    teams2Roles(e);

    saveRole(e);

    appendDevs(e)
  }

  const WSREQS = io.connect(); 

  const REQS = `/devs_reqs/`;

  /**
  *@utils
  **/

  const AJXCall = (reqs, allMeta, inCall) => {

    let req = new Req();

    req.call(`POST`, REQS, {
      title: reqs,
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

      AJXCall(`setGPSCookie`, JSStore.avail(), (A, B) => {});

      }, (b) => {

        /**
        *@dev
        **/

        AJXCall(`setGPSCookie`, JSStore.avail(), (A, B) => {});
    })    
  }

  /**
  *@events
  **/

  let createDev = e => {

    if (e.id === `add-devs-ejs`) {

      let listSlims = [], listSpaces = [
        document.querySelector(`#token-tjs`),
        document.querySelector(`#pre-tjs`),
        document.querySelector(`#suff-tjs`),
        document.querySelector(`#pass-tjs`)];

      for (let value = 0; value < listSpaces.length; ++value) {
        let slimValue = new Auxll().longSlim(listSpaces[value].value);
        (slimValue) ? listSlims[value] = slimValue: listSlims = [];
      }

      if (listSlims.length !== 4) return;

      JSStore.to({
        devs_token: listSlims[0],
        devs_name: listSlims[1],
        devs_surname: listSlims[2],
        devs_pass: listSlims[3]});

      AJXCall(`createDev`, JSStore.avail(), (A, B) => {

        if (B.exit === true) window.location = `/devs/`
      })
    }
  }

  let accessDev = e => {

    if (e.id === `to-devs-ejs`) {

      let dev = new Auxll().longSlim(document.querySelector(`#dev-tjs`).value),
          pass = new Auxll().longSlim(document.querySelector(`#pass-tjs`).value),
          sign_in_errors = [];

      if (!dev) {

        dev = false;
        sign_in_errors.push(`false_mail_`)
      }

      else if (!pass) {

        pass = false;
        sign_in_errors.push(`false_pass_`);
      }

      if (sign_in_errors.length === 0) {

        JSStore.to({
          [`dev`]: dev,
          [`pass`]: pass});

        AJXCall(`accessDev`, JSStore.avail(), (A, B) => {

          if (B.exit === true) window.location = `/devs/`
        })
      } 
    }
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

  let iniDevAva = e => {if (e.id === `devs-ava-ejs`) JSStore.to({file: `dev_ava`})}

  let files = e => {

    let e_ = e.target;

    if (e_.id === `file`) {
      e.stopImmediatePropagation();

      if (JSStore.avail().file === `dev_ava`) devAva(e_.files);
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

        fileTo.call(REQS, {
          value: JSON.stringify(JSStore.avail()),
          to: () => {

            if (fileTo.req.responseText.length > 0) {
              B = JSON.parse(fileTo.req.responseText);

              if (B.reqs_devs_ava) JSStore.to({[`reqs_devs_ava`]: B.reqs_devs_ava});
            }
          }}, blob);
      };
          
    }
  }

  let alertPassReset = e => {

    if (e.id === `reset-devs-pass-ejs`) {

      let modal_ejs = document.querySelector(`#pass-reset-modal-ejs`);

      if (modal_ejs.className === `_-Zz`) modal_ejs.className = `-Zz`
    }
  }

  let passReset = e => {

    if (e.id === `reset-pass-devs-save-ejs`) {

      let listSlims = [], listSpaces = [
        document.querySelector(`#pass-tjs`),
        document.querySelector(`#reset-pass-tjs`)];

      for (let value = 0; value < listSpaces.length; ++value) {
        let slimValue = new Auxll().longSlim(listSpaces[value].value);
        (slimValue) ? listSlims[value] = slimValue: listSlims = [];
      }

      if (listSlims.length !== 2) return;

      if (listSlims[0] === listSlims[1]) {

        JSStore.to({
          pass_reset: listSlims[1]});

        AJXCall(`devPassReset`, JSStore.avail(), (A, B) => {

          if (B.exit === true) {

            document.querySelector(`#reset-response-ejs`).setAttribute(`class`, `-Zz _sZ2`);
            document.querySelector(`#reset-response-ejs`).style.border = `1px solid #8aff86`;
            document.querySelectorAll(`#reset-response-ejs > p`).forEach(p => p.setAttribute(`class`, `_-Zz`));
            document.querySelector(`#pass-match-true`).setAttribute(`class`, `_aA6 -Zz`);

            document.querySelector(`#reset-obj-ejs`).style.display = `none`;

          }
        });
      }

      else {

        document.querySelector(`#reset-response-ejs`).setAttribute(`class`, `-Zz _sZ2`);
        document.querySelector(`#reset-response-ejs`).style.border = `1px solid #ffacac`;
        document.querySelectorAll(`#reset-response-ejs > p`).forEach(p => p.setAttribute(`class`, `_-Zz`));
        document.querySelector(`#pass-match-false`).setAttribute(`class`, `_aA6 -Zz`);
      }
    }
  }

  let passResetAlertOut = e => {

    if (e.id === `pass-reset-exit-ejs`) {

      let modal_ejs = document.querySelector(`#pass-reset-modal-ejs`);

      if (modal_ejs.className === `-Zz`) modal_ejs.className = `_-Zz`
    }
  }

  let appendDevsModal = e => {

    if (e.id === `append-devs-ejs`) {

      let modal_ejs = document.querySelector(`#append-devs-modal-ejs`);

      if (modal_ejs.className === `_-Zz`) modal_ejs.className = `-Zz`
    }
  }

  let teams2Roles = e => {

    if (e.id === `team-ejs`) {

      document.querySelectorAll(`#roles`).forEach(p => p.setAttribute(`class`, `_-Zz`));
      document.querySelector(`[team = "${e.getAttribute(`for`)}"]`).setAttribute(`class`, `-Zz`);

      JSStore.to({add_devs_team: e.value.replace(new RegExp(/&/g, `g`), `u/0026`)});
      JSStore.to({add_devs_role: false})
    }
  }

  let saveRole = e => {

    if (e.id === `role-ejs`) JSStore.to({add_devs_role: e.value});
  }

  let appendDevs = e => {

    if (e.id === `add-dev-ejs`) {

      let listSlims = [], listSpaces = [
        document.querySelector(`#add-name-devs-tjs`),
        document.querySelector(`#add-surname-devs-tjs`)];

      for (let value = 0; value < listSpaces.length; ++value) {
        let slimValue = new Auxll().longSlim(listSpaces[value].value);
        (slimValue) ? listSlims[value] = slimValue: listSlims = [];
      }

      if (listSlims.length !== 2 || !JSStore.avail().add_devs_team || !JSStore.avail().add_devs_role || JSStore.avail().add_devs_role === false) {

        document.querySelector(`#add-devs-response-ejs`).setAttribute(`class`, `-Zz _sZ2`);
        document.querySelector(`#add-devs-response-ejs`).style.border = `1px solid #ffacac`;
        document.querySelectorAll(`#add-devs-response-ejs > p`).forEach(p => p.setAttribute(`class`, `_-Zz`));
        document.querySelector(`#add-devs-false`).setAttribute(`class`, `_aA6 -Zz`);
      }

      else {

        document.querySelector(`#add-dev-see-ejs`).setAttribute(`class`, `_-Zz _azX- _gMX _gp0 _gmg`);

        JSStore.to({
          add_devs_alt: listSlims[0], add_devs_alt2: listSlims[1]});

        AJXCall(`appendDevs`, JSStore.avail(), (A, B) => {

          if (B.exit === true) window.location = `/devs/`;
        });
      }
    }
  }

  let slides = d3.select(`#team-rotate-ejs`)
  d3.select(`#team-slide-ejs`).call(d3.zoom().translateExtent([[0,0], [3250, 3250]]) .on(`zoom`, () => {
    slides.style(`transform`, `translate(${d3.event.transform.x}px)`)
  }))

  setGPSCookie();

  document.addEventListener(`click`, e0);
  document.addEventListener(`change`, files);
})();