`use strict`;

(function () {

  const S = io.connect();

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

  let listSettings = e => {

    if (e.id === `to-settings`) {

      let to = document.querySelector(`#Settings`);

      if (to.className === `_aAY _-Zz`) {
        to.className = `_aAY -Zz`;
      }

      else if (to.className === `_aAY -Zz`) {
        to.className = `_aAY _-Zz`;
      }
    }
  }

  let foldSettings = e => {

    if (e.id === `del`) {

      let modals = document.querySelectorAll(`[for = 'modal']`);

      for (let i = 0; i < modals.length; i++) {
        
        if (modals[i].className === `_aAY -Zz`) {

          modals[i].setAttribute(`class`, `_aAY _-Zz`);
        }
      }
    }

  }

  let vService = e => {

    if (e.id === `vendor`) {

      let modal_ejs = document.querySelector(`#vService`);

      if (modal_ejs.className === `_-Zz`) {
        modal_ejs.className = `-Zz`;
      }
    }
  }

  let foldVService = e => {

    if (e.id === `foldVService`) {

      let modal_ejs = document.querySelector(`#vService`);

      if (modal_ejs.className === `_-Zz`) {
        modal_ejs.className = `-Zz`;
      }

      else if (modal_ejs.className === `-Zz`) {
        modal_ejs.className = `_-Zz`;
      }
    }
  }

  let vServiceCreate = e => {

    if (e.id === `vServiceCreate`) {

      let modal_ejs = document.querySelector(`#vService`);

      if (modal_ejs.className === `_-Zz`)  modal_ejs.className = `-Zz`;

      else if (modal_ejs.className === `-Zz`) modal_ejs.className = `_-Zz`;

      let vServiceSet = document.querySelector(`#vServiceSet`);

      if (vServiceSet.className === `_-Zz`)  vServiceSet.className = `-Zz`;
    }
  }

  let vServiceSetFold = e => {

    if (e.id === `vServiceSetFold`) {

      let modal_ejs = document.querySelector(`#vServiceSet`);

      if (modal_ejs.className === `_-Zz`) modal_ejs.className = `-Zz`;

      else if (modal_ejs.className === `-Zz`) modal_ejs.className = `_-Zz`;
    }
  }

  let vServicePush = e => {

    if (e.id === `vServicePush`) {

      let vServiceValue = new Auxll().longSlim(document.querySelector(`#vServiceValue`).value);

      if (vServiceValue && JSStore.avail().u_md5) {

        let modal_ejs = document.querySelector(`#vServiceSet`);

        if (modal_ejs.className === `_-Zz`) modal_ejs.className = `-Zz`;

        else if (modal_ejs.className === `-Zz`) modal_ejs.className = `_-Zz`;

        let Vals = {
          u_md5: JSStore.avail().u_md5,
          vServiceSet: slim(document.querySelector(`#vServiceValue`).value).replace(new RegExp(/&/g, `g`), `u/0026`)};

        document.querySelector(`#vServiceValue`).value = ``;

        S.emit(`create_vService`, Vals);
      }
    }
  }

  let listvServices = e => {

    if (e.id === `listvServices`) {

      JSStore.to({list_vServices_log_secs: new Date().valueOf()});

      S.emit(`list_vServices`, {u_md5: JSStore.avail().mug_u_md5, log_secs: JSStore.avail().list_vServices_log_secs});

    }
  }

  let listvServicesFold = e => {

    if (e.id === `listvServicesFold`) {

      document.querySelectorAll(`#listvServicesModals`).forEach(E => E.innerHTML = ``)
    }
  }
 
  let e0 = e => {

    e = e.target;

    listSettings(e);

    foldSettings(e);

    vService(e);

    foldVService(e);

    vServiceCreate(e);

    vServiceSetFold(e);

    vServicePush(e);

    listvServices(e);

    listvServicesFold(e);
  }

  document.addEventListener(`click`, e0);

  S.on(`create_vService`, Vals => {

    if (JSStore.avail().u_md5 === Vals.u_md5) window.location = `/store/${Vals.log_md5}/`;
  })

  S.on(`list_vServices`, A => {

    if (JSStore.avail().list_vServices_log_secs !== A.log_secs) return;
              
    let listvSericesParent = document.createElement(`div`);

    listvSericesParent.setAttribute(`id`, `listvServicesModals`);

    listvSericesParent.innerHTML = new Model().modelStringify([A.model]);

    document.querySelector(`#corrde-root`).appendChild(listvSericesParent);

    let modal_ejs = document.querySelector(`#listvServicesModal`);

    if (modal_ejs.className === `_-Zz`) modal_ejs.className = `-Zz`

  })
})();