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

  let dev_md5_2_u_md5 = e => {

    if (e.id === `text`) {

      socket.emit(`dev_md5_2_u_md5`, e.parentNode.id);
    }
  }

  let unlistServices = e => {

    if (e.id === `exit-msg`) {

      let modal_ejs = document.querySelector(`#u_md5-txt`);

      document.querySelectorAll(`#_txt_`).forEach(E => E.innerHTML = ``)
    }
  }

  let msg_2_u_md5 = e => {

    if (e.id === `msg`) {

      let msg = new Auxll().longSlim(document.querySelector(`#msg_value`).value);

      if (msg) JSStore.to({msg_2_u_md5: slim(document.querySelector(`#msg_value`).value).replace(new RegExp(/&/g, `g`), `u/0026`)});

      document.querySelector(`#msg_value`).value = ``;

      if (msg) socket.emit(`msg_2_u_md5`, {msg: JSStore.avail().msg_2_u_md5, msg_u_md5: e.getAttribute(`u_md5`)});
    }
  }
 
  let e0 = e => {

    e = e.target;

    listMug(e);

    unlistMug(e);

    dev_md5_2_u_md5(e);

    unlistServices(e);

    msg_2_u_md5(e);
  }

  document.addEventListener(`click`, e0);

  socket.on(`dev_md5_2_u_md5`, J => {
              
    let msg = document.createElement(`div`);

    msg.setAttribute(`id`, `_txt_`);

    msg.innerHTML = new Model().modelStringify([J]);

    document.querySelector(`#corrde-root`).appendChild(msg);

    let modal_ejs = document.querySelector(`#u_md5-txt`);

    if (modal_ejs.className === `_-Zz`) modal_ejs.className = `-Zz`

  })

  let aroundSlides = d3.select(`#around-rotate-ejs`)
  d3.select(`#around-slide-ejs`).call(d3.zoom().scaleExtent([1, 1]).translateExtent([[0,0], [3250, 3250]]) .on(`zoom`, () => {
    aroundSlides.style(`transform`, `translate(${d3.event.transform.x}px)`)
  }))
})();