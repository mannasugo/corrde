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

      AJXReq([`/devs_reqs/`, `setGPSCookie`], JSStore.avail(), (A, B) => {loadSeek()});

      }, (b) => {

        /**
        *@dev
        **/

        AJXReq([`/devs_reqs/`, `setGPSCookie`], JSStore.avail(), (A, B) => {loadSeek()});
    })    
  }

  let loadSeek = () => {

    if (typeof JSStore.avail().gps === `object` && JSStore.avail().gps.length === 2) {

      //document.querySelectorAll(`section`).forEach(s => s.style.display = `none`)

      document.querySelector(`#DOM`).setAttribute(`class`, `_ss7 -Zz`);
    }

    else {

      //document.querySelectorAll(`section`).forEach(s => s.style.display = `none`)

      document.querySelector(`#position-alert`).setAttribute(`class`, `-Zz`);
    }
  }

  let locate = e => {

    if (e.id === `locate`) setGPSCookie();
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

      document.querySelector(`#upload`).setAttribute(`class`, `-Zz`);

      document.querySelectorAll(`._g00 > p`)[1].innerHTML = e.value;
      document.querySelectorAll(`._sZ2`)[0].style.display = `none`;
    }
  }

  let iniCover = e => {if (e.id === `job-cover`) JSStore.to({file: `cover_img`})}

  let files = e => {

    let e_ = e.target;

    if (e_.id === `file`) {
      e.stopImmediatePropagation();

      if (JSStore.avail().file === `u_md5_ava`) devAva(e_.files);

      else if (JSStore.avail().file === `u_md5_pfolio_img`) AddStory(e_.files);

      else if (JSStore.avail().file === `cover_img`) AddCover(e_.files);
    }
  }

  function allocFile (img, file) {

    let alloc = new FileReader();

    alloc.onload = (e) => {
      img.src = e.target.result;
    };

    alloc.readAsDataURL(file);
  }


  const AddCover = files => {

    if (!files || !files.length) return;

    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      if (!file.type.match(`image.*`) || file.size > 1048576) return;

      let image;

      if (!document.querySelector(`#cover_img`)) {

        image = new Image();

        image.setAttribute(`id`, `cover_img`);

      } 

      else image = document.querySelector(`#cover_img`);

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

        document.querySelector(`#upload`).style.display = `none`;

        document.querySelector(`._aGX`).setAttribute(`class`, `_aGX`);

        document.querySelector(`._g0z`).style.paddingBottom  = `${(img_y/img_x) * 100}%`;
        document.querySelector(`._g0z > img`).src = image.src;

        JSStore.to({cover_img_x: img_x, cover_img_y: img_y, cover_secs: new Date().valueOf()});

        const fileTo = new AJXFile();

        fileTo.call(`/devs_reqs/`, {
          value: JSON.stringify(JSStore.avail()),
          to: () => {

            if (fileTo.req.responseText.length > 0) {
              B = JSON.parse(fileTo.req.responseText);

              if (B.cover_img) {JSStore.to({cover_img: B.cover_img});}
            }
          }}, blob);
      };
          
    }
  }

  let payWay = e => {

    if (e.id === `payrate`) {

      let contractpay = document.querySelectorAll(`#payrate`);

      for (var pay = 0; pay < contractpay.length; pay++) {

        contractpay[pay].nextElementSibling.setAttribute(`class`, `_tCw _aA2`);
      }

      e.nextElementSibling.setAttribute(`class`, `_tCw _tXv _tXx`);

      JSStore.to({payway: e.value})
    }
  }

  let addJob = (e) => {

    if (e.id === `add-job`) {

      let A = new Auxll().longSlim(document.querySelector(`#title`).value);

      let B = new Auxll().longSlim(document.querySelector(`#USD`).value);

      let C = new Auxll().longSlim(document.querySelector(`#duration`).value);

      let D = new Auxll().longSlim(document.querySelector(`#job-text`).value);

      if (A) JSStore.to({job_title: slim(document.querySelector(`#title`).value).replace(new RegExp(/&/g, `g`), `u/0026`)});

      if (typeof parseInt(B) === `number` && typeof parseInt(C) === `number`) JSStore.to({USD: parseInt(B), job_span: parseInt(C)});

      if (D) JSStore.to({job_text: slim(document.querySelector(`#job-text`).value).replace(new RegExp(/&/g, `g`), `u/0026`)});

      document.querySelector(`#title`).value = ``;
      document.querySelector(`#USD`).value = ``;
      document.querySelector(`#duration`).value = ``;
      document.querySelector(`#job-text`).value = ``;

      if (A && B && C && D && JSStore.avail().payway) {

        if (JSStore.avail().job_title && JSStore.avail().job_text && JSStore.avail().USD && JSStore.avail().job_span) {
          
          AJXReq([`/devs_reqs/`, `pushJob`], JSStore.avail(), (A, B) => {

            if (B.exit === true) window.location = `/feed/`;
          }); 
        }
      }
    }
  }

  let e0 = e => {

    e = e.target;

    field2Service(e);

    saveService(e);

    iniCover(e);

    payWay(e);

    addJob(e);
  }

  let fieldSlide = document.querySelectorAll(`#service-slide-ejs`)

  fieldSlide.forEach( slide => {

    slide = d3.select(slide)
    slide.call(d3.zoom().scaleExtent([1, 1]).translateExtent([[0,0], [3250, 3250]]) .on(`zoom`, () => {
     slide.select(`#service-rotate-ejs`).style(`transform`, `translate3d(${d3.event.transform.x}px, 0, 0)`)
  }))})

  setGPSCookie();

  document.addEventListener(`click`, e0);
  document.addEventListener(`change`, files);
})();