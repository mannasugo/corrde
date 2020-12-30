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

  let listMug = e => {

    let to;

    if (e.id === `mug-ava`) to = document.querySelector(`#mugger`);

    else if (e.id === `offmugger`) to = document.querySelector(`#offmug`);

    if (!to) return;

    if (to.className === `_aAY _-Zz`) to.className = `_aAY -Zz`;

    else if (to.className === `_aAY -Zz`) to.className = `_aAY _-Zz`;
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

  let Modals = e => {

    let to;

    if (e.id === `getSets`) to = document.querySelector(`#ModalSets`);

    else if (e.id === `SetZone`) {

      to = document.querySelector(`#ModelZones`);

      document.querySelector(`#DelModalZones`).setAttribute(`class`, `-_tX DelColor`);
    }

    else if (e.id === `getZoneOptions`) {

      let ModelSource = document.querySelector(`#ModalSet`);

      let M = new Model();

      let J = document.querySelector(`#ZonalModalSet`).innerHTML;

      J = JSON.parse(J);

      ModelSource.innerHTML = M.modelStringify([J.ZonalModalSet[e.getAttribute(`for`)]]);

      to = document.querySelector(`aside > #ModelZonalRates`);

    }

    else if (e.id === `myBag`) {

      let M = new Model();

      to = document.querySelector(`#ModalMyCart`);

      let ModelSource = to.querySelector(`._sZ2`);

      if (!JSStore.avail().myCart) JSStore.to({myCart: []})

      ModelSource.innerHTML = M.modelStringify([M.MyCart(JSStore.avail().myCart)]);
    }

    else if (e.id === `retailMaps`) to = document.querySelector(`#ModalRetailRates`);

    if (!to) return;

    if (to.className === `_-Zz`) to.className = `-Zz`;

    else if (to.className === `-Zz`) to.className = `_-Zz`;

  }

  let foldModals = e => {

    let Modal;

    if (e.id === `DelModalZones`) {

      Modal = document.querySelector(`#ModelZones`);

    }

    else if (e.id === `getZone`) {

      JSStore.to({locale: e.value.toLowerCase()});

      document.querySelector(`#localeZone`).innerHTML = JSStore.avail().locale;

      Modal = document.querySelector(`#ModelZones`);

      window.location = `/`;

      if (JSStore.avail().locale === `kenya`) {

        JSStore.to({log_secs: new Date().valueOf()});

        S.emit(`zonal`, {locale: JSStore.avail().locale, log_secs: JSStore.avail().log_secs, mug: JSStore.avail().mug});
      }
    }

    else if (e.id === `foldMyCart`) Modal = document.querySelector(`#ModalMyCart`);

    else if (e.id === `DelZonal`) Modal = document.querySelector(`aside > div`);

    else if (e.id === `foldModalSets`) Modal = document.querySelector(`#ModalSets`);

    else if (e.id === `DelRetailRates`) Modal = document.querySelector(`#ModalRetailRates`);

    if (!Modal) return;

    if (Modal.className === `-Zz`) Modal.className = `_-Zz`;
  }

  let AlterCart = e => {

    if (!JSStore.avail().myCart) JSStore.to({myCart: []});

    let Cart = JSStore.avail().myCart;

    let Data = JSON.parse(e.getAttribute(`data`));

    if (e.id === `alterCart`) {

      let item;

      Cart.forEach(Stock => {

        if (Stock.MD5 === Data[`MD5`]) item = Cart.indexOf(Stock);
      });

      if (typeof item !== `number`) {

        Cart.push({
          alpha: Data.alpha,
          dollars: Data.dollars,
          file: Data.file,
          items: 0,
          MD5: Data.MD5,
          swap: Data.swap,
          swapAlpha: Data.swapAlpha
        });

        item = Cart.length - 1;
      }

      Cart[item].items += 1;

      JSStore.to({myCart: Cart});

      if (!e.hasAttribute(`forPlus`)) return;

      let eCount = e.getAttribute(`forPlus`).split(`-`)[1],

        dollars = ((Data.dollars*Data.swap*Cart[item].items)).toFixed(2);

      document.querySelector(`#dollars_${Data.MD5}_${eCount}`).innerHTML = `${Data.swapAlpha}${dollars.toLocaleString()}`;

      document.querySelector(`#items_${Data.MD5}_${eCount}`).innerHTML = Cart[item].items;

    }

    else if (e.id === `sliceCart`) {

      let item;

      Cart.forEach(Stock => {

        if (Stock.MD5 === Data.MD5) item = Cart.indexOf(Stock);
      });

      if (typeof item !== `number`) return;

      let CartSelf = [];

      Cart[item].items -= 1;

      if (Cart[item].items < 1) {

        Cart.forEach(Stock => {

          if (Stock.MD5 !== Data.MD5) item = CartSelf.push(Stock);
        });

        Cart = CartSelf;
      }

      JSStore.to({myCart: Cart});

      let M = new Model();

      let to = document.querySelector(`#ModalMyCart`);

      let ModelSource = to.querySelector(`._sZ2`);

      ModelSource.innerHTML = M.modelStringify([M.MyCart(JSStore.avail().myCart)]);
    }
  }

  let domServe = () => {

    JSStore.to({log_secs: new Date().valueOf()});

    if (!JSStore.avail().locale) {

      document.querySelector(`#ModelZones`).className = `-Zz`;
    }

    else {

      if (JSStore.avail().retailSet) S.emit(`retailSet`, {
        locale: JSStore.avail().locale, log_secs: JSStore.avail().log_secs, mug: JSStore.avail().mug, retailSet: JSStore.avail().retailSet});
    }
  }
 
  let e0 = e => {

    e = e.target;

    listMug(e);

    unlistMug(e);

    Modals(e);

    foldModals(e);

    AlterCart(e)
  }

  domServe();

  document.addEventListener(`click`, e0);

  setInterval(() => {

    dailySale();
  }, 1000);

  S.on(`retailSet`, J => {

    if (JSStore.avail().log_secs === J.log_secs) {

      let ModelSource = document.querySelector(`main`);

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify(J.ModelRetailSet);
    }
  })
})();