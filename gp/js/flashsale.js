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

  let SetCurrency = e => {

    if (e.id === `SetCurrency`) {

      let to = document.querySelector(`#Monies`);

      if (to.className === `_aAY _-Zz`) to.className = `_aAY -Zz`;

      else if (to.className === `_aAY -Zz`) to.className = `_aAY _-Zz`;

    }
  }

  let setSaleMode = () => {

    if (JSStore.avail().sale_mode) {

      document.querySelector(`#SetCurrency > text`).innerHTML = JSStore.avail().sale_mode;

      let SaleModeMap = {
        aud: [1.37, `$`],
        cad: [1.31, `$`],
        eur: [0.84, `€`],
        gbp: [0.76, `£`],
        kes: [109, `Ks.`],
        usd: [1, `$`],
        yen: [104.50, `¥`]
      }

      document.querySelectorAll(`#denom`).forEach(Sale => {

        Sale.innerHTML = SaleModeMap[JSStore.avail().sale_mode][1];

      });

      document.querySelectorAll(`#denomValue`).forEach(Sale => {

        Sale.innerHTML = (SaleModeMap[JSStore.avail().sale_mode][0] * Sale.getAttribute(`usd`)).toFixed(2);

        if (JSStore.avail().sale_mode !== `kes`) Sale.innerHTML += ` ${(JSStore.avail().sale_mode).toUpperCase()}`

      });

      if (!document.querySelectorAll(`#saleValue`)) return;

      document.querySelectorAll(`#saleValue`).forEach(Sale => {

        Sale.innerHTML = SaleModeMap[JSStore.avail().sale_mode][1];

        Sale.innerHTML += (SaleModeMap[JSStore.avail().sale_mode][0] * Sale.getAttribute(`usd`)).toFixed(2);

        if (JSStore.avail().sale_mode !== `kes`) Sale.innerHTML += ` ${(JSStore.avail().sale_mode).toUpperCase()}`

      });
    }
  }

  let pickSaleMode = e => {

    if (e.id === `saleMode`) {

      JSStore.to({sale_mode: e.getAttribute(`for`)});

      document.querySelector(`#SetCurrency > text`).innerHTML = JSStore.avail().sale_mode;

      setSaleMode();
    }
  }

  let dailySale = () => {

    if (!document.querySelector(`#daily-span`)) return;

    let ModelDailySpan = document.querySelector(`#daily-span`);

    let epoch = ModelDailySpan.getAttribute(`epoch`);

    let now = new Date().valueOf();

    let milliSecs = epoch - now

    DailySpan = [0, 0, 0, 0]

    DailySpan[0] = parseInt(milliSecs/86400000);

    DailySpan[1] = parseInt((milliSecs%86400000)/3600000);

    DailySpan[2] = parseInt(((milliSecs%86400000)%3600000)/60000);

    DailySpan[3] = parseInt((((milliSecs%86400000)%3600000)%60000)/1000);

    if (DailySpan[0] < 10) DailySpan[0] = `0` + DailySpan[0]

    if (DailySpan[1] < 10) DailySpan[1] = `0` + DailySpan[1]

    if (DailySpan[2] < 10) DailySpan[2] = `0` + DailySpan[2]

    if (DailySpan[3] < 10) DailySpan[3] = `0` + DailySpan[3]

    ModelDailySpan.querySelector(`#D-span`).innerHTML = DailySpan[0]

    ModelDailySpan.querySelector(`#H-span`).innerHTML = DailySpan[1]

    ModelDailySpan.querySelector(`#M-span`).innerHTML = DailySpan[2]

    ModelDailySpan.querySelector(`#S-span`).innerHTML = DailySpan[3]
  }
 
  let e0 = e => {

    e = e.target;
    
    unlistMug(e)

    SetCurrency(e);

    pickSaleMode(e);
  }

  setSaleMode();

  document.addEventListener(`click`, e0);

  setInterval(() => {

    dailySale();
  }, 1000)
})();