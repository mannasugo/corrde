`use strict`;

(function () {

  const S = io();

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

  let SalesModal = (e) => {

    if (e.id === `toModalSales`) {

      JSStore.to({log_secs: new Date().valueOf()});

      S.emit(`sales`, JSStore.avail().log_secs);

      document.querySelector(`#listSales`).innerHTML = ``;
  
      let modal_ejs = document.querySelector(`#ModelSales`);
  
      if (modal_ejs.className === `_-Zz`) modal_ejs.className = `-Zz`;
    }
  }

  let foldModals = e => {

    if (e.id === `del`) {

      let modals = document.querySelectorAll(`[for = 'modal']`);

      for (let i = 0; i < modals.length; i++) {
        
        if (modals[i].className === `_aAY -Zz`) {

          modals[i].setAttribute(`class`, `_aAY _-Zz`);
        }
      }
    }

  }

  let foldSalesModal = e => {

    if (e.id === `foldSales`) {

      let modal_ejs = document.querySelector(`#ModelSales`);

      if (modal_ejs.className === `_-Zz`) {
        modal_ejs.className = `-Zz`;
      }

      else if (modal_ejs.className === `-Zz`) {
        modal_ejs.className = `_-Zz`;
      }
    }
  }

  let SaleModal = (e) => {

    if (e.id === `ModelSale`) {

      JSStore.to({log_secs: new Date().valueOf()});

      S.emit(`sale`, {log_secs: JSStore.avail().log_secs, log_md5: e.getAttribute(`for`)});

      document.querySelector(`#listSales`).innerHTML = ``;

      document.querySelector(`#Sale`).innerHTML = ``;
  
      let modal_ejs = document.querySelector(`#ModelSales`);
  
      if (modal_ejs.className === `_-Zz`) modal_ejs.className = `-Zz`;
    }
  }
 
  let e0 = e => {

    e = e.target;

    SalesModal(e);

    foldModals(e);

    foldSalesModal(e);

    SaleModal(e);
  }

  document.addEventListener(`click`, e0);

  S.on(`sales`, J => {

    if (JSStore.avail().log_secs === J.log_secs) {

      let ModelSource = document.querySelector(`#listSales`)

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify([J.ModelSales]);


    }
  })

  S.on(`sale`, J => {

    if (JSStore.avail().log_secs === J.log_secs) {

      let ModelSource = document.querySelector(`#Sale`)

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify([J.ModelSale]);


    }
  })
})();