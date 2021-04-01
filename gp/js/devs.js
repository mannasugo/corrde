`use strict`;

(function () {

  const S = io();

  const Route = history;

  const AJSON = (reqs, allMeta, inCall) => {

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

    txt = txt.replace(new RegExp(/&/, `g`), `u/0026`);

    txt = txt.replace(new RegExp(`'`, `g`), `u/0027`);

    txt = txt.replace(new RegExp(`"`, `g`), `u/0022`);

    return txt
  }

  let Modals = e => {

    let to;

    if (e.id === `getPay`) {

      let PaySet = JSON.parse(document.querySelector(`#pays`).innerHTML);

      let Pay = PaySet[e.getAttribute(`sum`)];

      to = document.querySelector(`#ModalMyPay`);

      let ModelSource = to.querySelector(`._sZ2`);

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify([M.ModelMyPay(Pay)]);

    }

    if (!to) return;

    if (to.className === `_-Zz`) to.className = `-Zz`;

    else if (to.className === `-Zz`) to.className = `_-Zz`;

  }

  let foldModals = e => {

    let Modal;

    if (e.id === `foldMyPay`) Modal = document.querySelector(`#ModalMyPay`);

    if (!Modal) return;

    if (Modal.className === `-Zz`) Modal.className = `_-Zz`;
  }

  let domServe = () => {

    if (!JSStore.avail().developer || JSStore.avail().developer === false) return;

    let ModelSource = document.querySelector(`main`);

    let M = new Model();

    ModelSource.innerHTML = M.modelStringify(JSModel);
          
    AJSON([`/devs_reqs/`, `getPays`], {}, (A, B) => {

      if (B.exit === true) {

        document.querySelectorAll(`#payStatus`).forEach(Model => {console.log(Model)

          if (B.pays[Model.getAttribute(`sum`)]) Model.innerHTML = B.pays[Model.getAttribute(`sum`)].status;

          Model.className = `-Zz`;
        })
      }
    });
  }
 
  let e0 = e => {

    e = e.target;

    Modals(e);

    foldModals(e);
  }

  domServe();

  document.addEventListener(`click`, e0);
})();