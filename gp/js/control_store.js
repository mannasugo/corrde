`use strict`;

(function () {

  const S = io();

  const MJS = new Model();

  const Route = history;

  const Ajs = (reqs, allMeta, inCall) => {

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

      let Rawify = All => {

        All = All.replace(new RegExp(/&/, `g`), `u/0026`);

        return All;
      }

  let Modals = e => {

    let to;

    if (e.id === `getAlter`) {

      let J = JSON.parse(e.getAttribute(`data`));console.log(J)

      if (!JSStore.avail().catalogue[1][J.item]) return;

      if (!JSStore.avail().itemAlter) JSStore.to({itemAlter: {}});

      let Alter = JSStore.avail().itemAlter;

      Alter[JSON.parse(e.getAttribute(`data`)).sum] = JSON.parse(e.getAttribute(`data`));

      JSStore.to({itemAlter: Alter})

      let M = new Model();

      let ModelSource = document.querySelector(`#ModalStallCities ._oPQ`);

      ModelSource.innerHTML = M.modelStringify([
        M.ModelStallAlter([
          `edit your listing`, JSStore.avail().catalogue[1][J.item], JSON.parse(e.getAttribute(`data`))])]);

      to = document.querySelector(`#ModalStallCities`);

    }

    if (e.id === `Sell`) {

      to = document.querySelector(`#ModalSellSet`);
    }

    if (e.id === `getZone`) {

      JSStore.to({StallZones: [e.value, []]});

      document.querySelector(`#ModalStallCountry`).className = `_-Zz`;

      let M = new Model();

      let ModelSource = document.querySelector(`#ModalStallCities ._oPQ`);

      ModelSource.innerHTML = M.modelStringify([M.ModelStallCities(JSON.parse(e.getAttribute(`data`)))]);

      to = document.querySelector(`#ModalStallCities`);
    }

    if (e.id === `getCity`) {

      let Cities = [];

      if (JSStore.avail().StallZones[1].indexOf(e.value) > -1) {

        JSStore.avail().StallZones[1].forEach(Stall => {

          if (Stall !== e.value) Cities.push(Stall);
        })

      }

      else {

        Cities = JSStore.avail().StallZones[1];

        Cities.push(e.value);
      }

      JSStore.to({StallZones: [JSStore.avail().StallZones[0], Cities]});
    }

    if (e.id === `setStallCountry`) to = document.querySelector(`#ModalStallCountry`);

    if (!to) return;

    if (to.className === `_-Zz`) to.className = `-Zz`;

    else if (to.className === `-Zz`) to.className = `_-Zz`;

  }

  let foldModals = e => {

    let Modal;

    if (!JSStore.avail().itemAlter) JSStore.to({itemAlter: {}});

    let Keys = JSStore.avail().itemAlter;

    if (e.id === `getAvail`) {

      let sum = e.getAttribute(`sum`);

      if (e.value === `in stock`) Keys[sum][`feature`] = true;

      else Keys[sum][`feature`] = false

      JSStore.to({itemAlter: Keys})
    }

    if (e.id === `getStack`) {

      let sum = e.getAttribute(`sum`);

      Keys[sum][`unit`] = slim(e.value)

      JSStore.to({itemAlter: Keys})
    }

    if (e.id === `setAlter`) {

      let AlterKeys = JSStore.avail().itemAlter[e.getAttribute(`sum`)];

      let Args = [[`getAlpha`, `alpha`], [`getDollars`, `dollars`]];

      let Clean = new Auxll();

      Args.forEach(Arg => {

        let value = Clean.longSlim(document.querySelector(`#${Arg[0]}`).value);

        if (value) AlterKeys[Arg[1]] = slim(value);

        else if (AlterKeys[Arg[1]] === false) AlterKeys[Arg[1]] = false;
      });

      Keys[e.getAttribute(`sum`)] = AlterKeys;

      JSStore.to({itemAlter: Keys, itemAlterKey: e.getAttribute(`sum`)})

      let Modal = document.querySelector(`#ModalStallCities`);

      let ModelSource = document.querySelector(`main`);

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify([M.ModelWait()]);
          
      Ajs([`/devs_reqs/`, `SetAlterArgs`], JSStore.avail(), (A, B) => {

        JSStore.to({log_secs: new Date().valueOf()});

        if (B.exit === true) S.emit(`pullStallControls`, {stall: JSStore.avail().levels[0], log_secs: JSStore.avail().log_secs, mug: JSStore.avail().mug});
      });
    }

    if (e.id === `getStock`) {

      JSStore.to({pushSellStockArg: e.value});

      let Modal = document.querySelector(`#ModalStallCities`);

      let ModelSource = document.querySelector(`main`);

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify([M.ModelWait()]);
          
      Ajs([`/devs_reqs/`, `pushSellArgs`], JSStore.avail(), (A, B) => {

        if (B.exit === true) window.location = `/dashboard/${JSStore.avail().levels[0]}/`;
      });
    }

    if (e.id === `getSet`) {

      Modal = document.querySelector(`#ModalSellSet`);

      if (!JSStore.avail().catalogue[0][Rawify(e.value)]) return;

      let M = new Model();

      let ModelSource = document.querySelector(`#ModalStallCities ._oPQ`);

      ModelSource.innerHTML = M.modelStringify([
        M.ModelRadio([`choose product for your listing`, JSStore.avail().catalogue[0][Rawify(e.value)], `getStock`])]);

      JSStore.to({pushSellSetArg: e.value});

      document.querySelector(`#ModalStallCities`).className = `-Zz`;
    }

    if (e.id === `foldModalSellSet`) Modal = document.querySelector(`#ModalSellSet`);

    if (e.id === `setStallCity`) {

      if (!JSStore.avail().mug || JSStore.avail().mug === false) return;

      let ModelSource = document.querySelector(`main`);

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify([M.ModelWait()])

      JSStore.to({log_secs: new Date().valueOf()});

      S.emit(`pushStallCities`, {
        stall: JSStore.avail().levels[0], 
        StallZones: JSStore.avail().StallZones, 
        log_secs: JSStore.avail().log_secs, 
        mug: JSStore.avail().mug});
    }

    if (e.id === `DelModalStallCountry`) Modal = document.querySelector(`#ModalStallCountry`);

    if (e.id === `DelModalStallCities`) Modal = document.querySelector(`#ModalStallCities`);

    if (!Modal) return;

    if (Modal.className === `-Zz`) Modal.className = `_-Zz`;
  }

  let domServe = () => {

    if (!JSStore.avail().mug || JSStore.avail().mug === false) return;

    JSStore.to({log_secs: new Date().valueOf()});

    S.emit(`pullStallControls`, {stall: JSStore.avail().levels[0], log_secs: JSStore.avail().log_secs, mug: JSStore.avail().mug});
  }
 
  let e0 = e => {

    e = e.target;

    Modals(e);

    foldModals(e);
  }

  domServe();

  document.addEventListener(`click`, e0);

  S.on(`pullStallControls`, J => {

    if (JSStore.avail().log_secs === J.log_secs) {

      if (J.catalogue) JSStore.to({catalogue: J.catalogue});

      let M = new Model();

      let ModelSource = document.querySelector(`main`);

      ModelSource.innerHTML = M.modelStringify(J.ModelPullStallControls);

    }
  })
})();