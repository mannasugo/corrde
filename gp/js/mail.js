`use strict`;

(function () {

  const socket = io.connect();

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

  let u_md5_2_dev_md5 = e => {

    if (e.id === `dev_md5`) {

      socket.emit(`u_md5_2_dev_md5`, JSStore.avail().u_md5);
    }
  }

  let unlistServices = e => {

    if (e.id === `exit-msg`) {

      let modal_ejs = document.querySelector(`#dev_md5-txt`);

      document.querySelectorAll(`#_txt_`).forEach(E => E.innerHTML = ``)
    }
  }

  let msg_2_dev_md5 = e => {

    if (e.id === `msg`) {

      let msg = new Auxll().longSlim(document.querySelector(`#msg_value`).value);

      if (msg) JSStore.to({msg_2_dev_md5: slim(document.querySelector(`#msg_value`).value).replace(new RegExp(/&/g, `g`), `u/0026`)});

      document.querySelector(`#msg_value`).value = ``;

      if (msg) socket.emit(`msg_2_dev_md5`, {msg: JSStore.avail().msg_2_dev_md5, msg_u_md5: e.getAttribute(`u_md5`)});
    }
  }
 
  let e0 = e => {

    e = e.target;

    u_md5_2_dev_md5(e);

    unlistServices(e);

    msg_2_dev_md5(e);
  }

  document.addEventListener(`click`, e0);

  socket.on(`u_md5_2_dev_md5`, J => {
              
    let msg = document.createElement(`div`);

    msg.setAttribute(`id`, `_txt_`);

    msg.innerHTML = new Model().modelStringify([J]);

    document.querySelector(`#corrde-root`).appendChild(msg);

    let modal_ejs = document.querySelector(`#dev_md5-txt`);

    if (modal_ejs.className === `_-Zz`) modal_ejs.className = `-Zz`

    document.querySelector(`#msg--`).focus()

  })

  socket.on(`u_md5_as_dev_md5`, J => {

    if (!document.querySelector(`#u_md5_2_dev_md5`)) return;

    if (J.u_md5 !== JSStore.avail().u_md5) return;

    document.querySelector(`#u_md5_2_dev_md5`).innerHTML = new Model().modelStringify(J.html);

    document.querySelector(`#msg--`).focus()

  })
})();