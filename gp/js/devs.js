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

    txt = txt.replace(new RegExp(`/`, `g`), `u/002F`);

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

    else if (e.id === `getStock`) {

      let ModelSource = document.createElement(`div`);

      let M = new Model();

      AJSON([`/devs_reqs/`, `getStock`], {sum: e.getAttribute(`sum`)}, (A, B) => {

        if (B.exit === true) {

          ModelSource.innerHTML = M.modelStringify([B.ModelShelfEditor]);

          document.querySelector(`#corrde-root > main`).appendChild(ModelSource);
        }
      });
    }

    else if (e.id === `Tools`) to = document.querySelector(`#ModalControllers`);

    else if (e.id === `pollFile`) JSStore.to({poll_file_temp: e.getAttribute(`sum`)});

    if (!to) return;

    if (to.className === `_-Zz`) to.className = `-Zz`;

    else if (to.className === `-Zz`) to.className = `_-Zz`;

  }

  let foldModals = e => {

    let Modal;

    if (e.id === `foldMyPay`) Modal = document.querySelector(`#ModalMyPay`);

    else if (e.id === `foldModalTools`) Modal = document.querySelector(`#ModalControllers`);

    else if (e.id === `getTool`) {

      document.querySelector(`#ModalControlsCatalog`).className = `-Zz`

      Modal = document.querySelector(`#ModalControllers`);
    }

    else if (e.id === `pollStock`) {

      let ModelSource = document.querySelector(`#corrde-root > main`);

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify([M.ModelWait()]);

      AJSON([`/devs_reqs/`, `pollStock`], {shelve: slim(e.getAttribute(`shelf`))}, (A, B) => {

        if (B.exit === true) {

          let M2 = new Model();

          ModelSource.innerHTML = M2.modelStringify(B.ModelController);
        }
      });
    }

    else if (e.id === `DelEditor`) {

      document.querySelector(`#corrde-root > main`).removeChild(document.querySelector(`#ModelShelfEditor`).parentNode)
    }

    else if (e.id === `pollTag`) {

      let pollTag = e.innerHTML;

      let ModelSource = document.querySelector(`#corrde-root > main`);

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify([M.ModelWait()]);

      AJSON([`/devs_reqs/`, `pollTag`], {pollTag: slim(pollTag), sum: e.getAttribute(`sum`)}, (A, B) => {

        if (B.exit === true) {

          let M2 = new Model();

          ModelSource.innerHTML = M2.modelStringify(B.ModelController);
        }
      });
    }

    else if (e.id === `pollSex`) {

      let ModelSource = document.querySelector(`#corrde-root > main`);

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify([M.ModelWait()]);

      AJSON([`/devs_reqs/`, `pollSex`], {pollSex: slim(e.innerHTML), sum: e.getAttribute(`sum`)}, (A, B) => {

        if (B.exit === true) {

          let M2 = new Model();

          ModelSource.innerHTML = M2.modelStringify(B.ModelController);
        }
      });
    }

    else if (e.id === `pollMake`) {

      let ModelSource = document.querySelector(`#corrde-root > main`);

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify([M.ModelWait()]);

      AJSON([`/devs_reqs/`, `pollMake`], {pollMake: slim(e.innerHTML), sum: e.getAttribute(`sum`)}, (A, B) => {

        if (B.exit === true) {

          let M2 = new Model();

          ModelSource.innerHTML = M2.modelStringify(B.ModelController);
        }
      });
    }

    else if (e.id === `pollZone`) {

      let ModelSource = document.querySelector(`#corrde-root > main`);

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify([M.ModelWait()]);

      AJSON([`/devs_reqs/`, `pollZone`], {pollZone: slim(e.innerHTML), sum: e.getAttribute(`sum`)}, (A, B) => {

        if (B.exit === true) {

          let M2 = new Model();

          ModelSource.innerHTML = M2.modelStringify(B.ModelController);
        }
      });
    }

    else if (e.id === `pollAltString`) {

      let ModelSource = document.querySelector(`#corrde-root > main`);

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify([M.ModelWait()]);

      let altString = e.parentNode.parentNode.querySelector(`#altString`).value;

      AJSON([`/devs_reqs/`, `pollAltString`], {pollAltString: slim(altString), sum: e.getAttribute(`sum`)}, (A, B) => {

        if (B.exit === true) {

          let M2 = new Model();

          ModelSource.innerHTML = M2.modelStringify(B.ModelController);
        }
      });
    }

    else if (e.id === `pollRetailRate`) {

      let ModelSource = document.querySelector(`#corrde-root > main`);

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify([M.ModelWait()]);

      let retailRate = e.parentNode.parentNode.querySelector(`#retailRate`).value;

      AJSON([`/devs_reqs/`, `pollRetailRate`], {pollRetailRate: slim(retailRate), sum: e.getAttribute(`sum`)}, (A, B) => {

        if (B.exit === true) {

          let M2 = new Model();

          ModelSource.innerHTML = M2.modelStringify(B.ModelController);
        }
      });
    }

    else if (e.id === `foldModalCatalog`) Modal = document.querySelector(`#ModalControlsCatalog`);

    if (!Modal) return;

    if (Modal.className === `-Zz`) Modal.className = `_-Zz`;
  }

  let domServe = () => {

    if (!JSStore.avail().developer || JSStore.avail().developer === false) return;

    let ModelSource = document.querySelector(`main`);

    let M = new Model();

    ModelSource.innerHTML = M.modelStringify(JSModel);
          
    /**AJSON([`/devs_reqs/`, `getPays`], {}, (A, B) => {

      if (B.exit === true) {

        document.querySelectorAll(`#payStatus`).forEach(Model => {

          if (B.pays[Model.getAttribute(`sum`)]) Model.innerHTML = B.pays[Model.getAttribute(`sum`)].status;

          Model.className = `-Zz`;
        })
      }
    });**/
  }

  let Files = e => {

    let File = e.target;

    if (File.id === `file`) {

      e.stopImmediatePropagation();

      JSStore.to({file: `SellFile`})

      PollFile(File.files);
    }
  }

  let allocFile = (img, file) => {

    let alloc = new FileReader();

    alloc.onload = (e) => img.src = e.target.result;

    alloc.readAsDataURL(file);
  }

  const PollFile = Files => {

    if (!Files || !Files.length) return;

    for (let i = 0; i < Files.length; i++) {

      let File = Files[i];

      if (!File.type.match(`image.*`) || File.size > 3048576) return;

      let Plane;

      if (!document.querySelector(`#plane`)) {

        Plane = new Image();

        Plane.setAttribute(`id`, `plane`);
      }

      else Plane = document.querySelector(`#plane`);

      allocFile(Plane, File);

      Plane.onload = () => {

        let fileSort;

        if (Plane.src.charAt(11) === `j`) fileSort = `data:image/jpeg;base64,`;

        else if (Plane.src.charAt(11) === `p`) fileSort = `data:image/png;base64,`;

        if (!fileSort) return;
        
        let b64 = Plane.src.replace(fileSort,``), Duals = atob(b64), Alloc = [];

        for (let i = 0; i < Duals.length; i++) {

          Alloc.push(Duals.charCodeAt(i));
        }
  
        let AllocFile = new Blob([new Uint8Array(Alloc)], {type: `image/jpeg`});

        let AJX = new AJXFile();

        let ModelSource = document.querySelector(`#corrde-root > main`);

        let M = new Model();

        ModelSource.innerHTML = M.modelStringify([M.ModelWait()]);

        AJX.call(`/devs_reqs/`, {
          value: JSON.stringify({file: `SellFile`, poll_file_temp: JSStore.avail().poll_file_temp}),
          to: () => {

            if (AJX.req.responseText.length > 0) {

              B = JSON.parse(AJX.req.responseText);

              if (B.exit === true) {

                let M2 = new Model();

                ModelSource.innerHTML = M2.modelStringify(B.ModelController);
              }
            }
          }}, AllocFile);
      };
          
    }
  }
 
  let e0 = e => {

    e = e.target;

    Modals(e);

    foldModals(e);
  }

  domServe();

  document.addEventListener(`click`, e0);

  document.addEventListener(`change`, Files);
})();