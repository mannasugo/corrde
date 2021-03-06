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

    appendDevs(e);

    supportMsgModal(e);

    supportMsgOut(e);

    supportMsgDegree(e);

    pushSupportMsg(e)
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

    JSStore.to({gps: [7.723, 50.533]});

    GPS(a => {

      isCoords(a);

      AJXCall(`setGPSCookie`, JSStore.avail(), (A, B) => {J_PJ()});

      }, (b) => {

        /**
        *@dev
        **/

        AJXCall(`setGPSCookie`, JSStore.avail(), (A, B) => {J_PJ()});
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

  let supportMsgModal = e => {

    if (e.id === `support-msg-ejs`) {

      if (JSStore.avail().in) document.querySelector(`#support-to-ejs`).setAttribute(`class`, `_-Zz`);

      let modal_ejs = document.querySelector(`#support-msg-modal-ejs`);

      document.querySelector(`#push-quiz-true`).setAttribute(`class`, `_-Zz _sZ2`);
      document.querySelector(`#hide-support-msg-ejs`).setAttribute(`class`, `-Zz`);

      if (modal_ejs.className === `_-Zz`) modal_ejs.className = `-Zz`
    }
  }


  let supportMsgOut = e => {

    if (e.id === `support-exit-ejs`) {

      let modal_ejs = document.querySelector(`#support-msg-modal-ejs`);

      if (modal_ejs.className === `-Zz`) modal_ejs.className = `_-Zz`
    }
  }

  let supportMsgDegree = e => {

    if (e.id === `alert-level-ejs`) JSStore.to({support_msg: e.value});
  }

  let pushSupportMsg = e => {

    if (e.id === `push-support-quiz-ejs`) {

      let listSlims = [], listSpaces = [
        document.querySelector(`#support-q-mail-tjs`),
        document.querySelector(`#support-q-subject-tjs`),
        document.querySelector(`#support-quiz-tjs`)];

      for (let value = 0; value < listSpaces.length; ++value) {
        let slimValue = new Auxll().longSlim(listSpaces[value].value);
        (slimValue) ? listSlims[value] = slimValue: listSlims = [];
      }

      if (JSStore.avail().support_msg && (JSStore.avail().in && listSlims[1].length > 0 && listSlims[2].length > 0) || 
        (listSlims[0] && listSlims[0].length > 0 && listSlims[1].length > 0 && listSlims[2].length > 0)
        ) {

        JSStore.to({
          mail_to_devs: document.querySelector(`#support-q-mail-tjs`).value.replace(new RegExp(/&/g, `g`), `u/0026`),
          subj_to_devs: document.querySelector(`#support-q-subject-tjs`).value.replace(new RegExp(/&/g, `g`), `u/0026`),
          quiz_to_devs: document.querySelector(`#support-quiz-tjs`).value.replace(new RegExp(/&/g, `g`), `u/0026`)})

        document.querySelector(`#support-q-mail-tjs`).value = ``;

        let _tjs = 

          `Thank you for using corrde's support requests, 
          your question has been received by our support team, and will be answered shortly, since you aren't logged in, 
          our team will be reaching you through your email at <span class='_tXx' style='color:#1185fe'>${JSStore.avail().mail_to_devs}</span>`;

        if (JSStore.avail().u_md5) {

          JSStore.to({mail_to_devs: JSStore.avail().u_md5});
          JSStore.to({md5: true})

          _tjs =

           `Thank you for using corrde's support requests, 
            your question has been received by our support team, and will be answered shortly, since you are logged in, 
            our team will be reaching you through your corrde mail at <a href='/mail/' class='_tXx _aAa'>https://corrde/mail/</span>`;
        }

        AJXCall(`pushSupportMsg`, JSStore.avail(), (A, B) => {

          if (B.exit === true) {

            document.querySelector(`#push-quiz-true`).setAttribute(`class`, `-Zz _sZ2`);
            document.querySelector(`#hide-support-msg-ejs`).setAttribute(`class`, `_-Zz`);

            document.querySelector(`#quiz-true`).innerHTML = _tjs;

          }
        });
      }
    }
  }

  let preMail = () => {

    if (document.querySelector(`#devs`)) {

      if (JSStore.avail().pre_devs_mail && JSStore.avail().pre_devs_mail === true) {

        document.querySelectorAll(`.MailColor`).forEach(p => {p.setAttribute(`class`, `-_tX MailColor _-gm`)})
      }
    }
  }

  let slides = d3.select(`#team-rotate-ejs`)
  d3.select(`#team-slide-ejs`).call(d3.zoom().scaleExtent([1, 1]).translateExtent([[0,0], [3250, 3250]]) .on(`zoom`, () => {
    slides.style(`transform`, `translate(${d3.event.transform.x}px)`)
  }))

  let supportSlides = d3.select(`#support-rotate-ejs`)
  d3.select(`#support-slide-ejs`).call(d3.zoom().scaleExtent([1, 1]).translateExtent([[0,0], [3250, 3250]]) .on(`zoom`, () => {
    supportSlides.style(`transform`, `translate(${d3.event.transform.x}px)`)
  }))

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

  let jobsSlides = d3.select(`#jobs-rotate-ejs`)
      d3.select(`#jobs-slide-ejs`).call(d3.zoom().scaleExtent([1, 1]).translateExtent([[0,0], [3250, 3250]]) .on(`zoom`, () => {
    jobsSlides.style(`transform`, `translate3d(${d3.event.transform.x}px, 0, 0)`)
  }))
  
  let nearSlides = d3.select(`#near-rotate-ejs`)
  d3.select(`#near-slide-ejs`).call(d3.zoom().scaleExtent([1, 0]).translateExtent([[1,1], [3250, 0]]) .on(`zoom`, () => {
    nearSlides.style(`transform`, `translate3d(${d3.event.transform.x}px, 0, 0)`)
  }))

  let slideJobs = d3.select(`#jobs-rotate`)
  d3.select(`#jobs-slide`).call(d3.zoom().scaleExtent([1, 1]).translateExtent([[0,0], [3250, 3250]]) .on(`zoom`, () => {
    slideJobs.style(`transform`, `translate3d(${d3.event.transform.x}px, 0, 0)`)
  }))

  let last_PJ =  () => {

    d3.json(`/gp/twineJSON/custom.json`)

      .then(json => {

        json = topojson.feature(json, json.objects[`custom.geo`]);

        if (document.querySelector(`#last_PJ`)) {

          document.querySelectorAll(`#last_PJ`).forEach(J => {

            let adm0_a3;

            json.features.forEach(Obj => {

              if (JSON.parse(J.innerHTML).length === 2 && d3.geoContains(Obj, JSON.parse(J.innerHTML))) adm0_a3 = Obj.properties.name_long;

            });

            if (adm0_a3) J.innerHTML = adm0_a3;

          })
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

  setGPSCookie();

  preMail();

  last_PJ();

  document.addEventListener(`click`, e0);
  document.addEventListener(`change`, files);
})();