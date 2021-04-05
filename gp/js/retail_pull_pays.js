`use strict`;

(function () {

  const S = io();

  const MJS = new Model();

  const Route = history;

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

    else if (e.id === `ShipBy`) {

      let g = (gArray, gBugs) => navigator.geolocation.getCurrentPosition(a => {gArray(a)}, b => {gBugs(b)});

      let gArray = (Geo) => {

        let G = Geo.coords;

        if (typeof G.latitude === `number` && typeof G.longitude === `number`) JSStore.to({gArray: [G.longitude, G.latitude]});
      }

      let M = new Model();

      let ModelSource = document.querySelector(`main`);

      ModelSource.innerHTML = M.modelStringify([M.ModelProxy(`Arg`)]);

      JSStore.to({gArray: [], log_secs: new Date().valueOf()})

      g(a => {

        gArray(a);

        S.emit(`flutterwave`, JSStore.avail());

      }, (b) => {

        S.emit(`flutterwave`, JSStore.avail());
      });

    }

    else if (e.id === `getPay`) {

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

    if (e.id === `DelModalZones`) {

      Modal = document.querySelector(`#ModelZones`);

    }

    else if (e.id === `toCheckOut`) {

      Modal = document.querySelector(`#ModalMyCart`);

      if (JSStore.avail().myCart.length > 0) {

        Route.pushState({}, `billings`, `/checkout/billings/`);

        let ModelSource = document.querySelector(`main`);

        let ModalRegions = document.querySelector(`#ModalRegions`);

        ModelSource.innerHTML = MJS.modelStringify([MJS.ModelWait()]) + `<div id='ModelRegions' class='-Zz'>${ModalRegions.innerHTML}<div>`;

      }
    }

    else if (e.id === `getZone`) {

      JSStore.to({locale: e.value.toLowerCase()});

      document.querySelector(`#localeZone`).innerHTML = JSStore.avail().locale;

      Modal = document.querySelector(`#ModelZones`);

      window.location = `/`;
    }

    else if (e.id === `getRegion`) {

      JSStore.to({Billto: [e.value.toLowerCase(), false], myRegion: JSStore.avail().regionMeta});

      Modal = document.querySelector(`#ModalRegions`);

      let ModelSource = document.querySelector(`main`);

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify(M.ModelBill(JSStore.avail().myCart, JSStore.avail().myRegion, JSStore.avail().Billto))
    }

    else if (e.id === `paygate`) {

      let ModelSource = document.querySelector(`main`);

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify([M.ModelWait()])

      window.location = e.getAttribute(`route`);
    }

    else if (e.id === `foldMyCart`) Modal = document.querySelector(`#ModalMyCart`);

    else if (e.id === `foldModalSets`) Modal = document.querySelector(`#ModalSets`);

    else if (e.id === `DelZonal`) Modal = document.querySelector(`aside > div`);

    else if (e.id === `foldMyPay`) Modal = document.querySelector(`#ModalMyPay`);

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
          mass: Data.mass,
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

      if(!document.querySelector(`#mass_${Data.MD5}_${eCount}`)) return;

      document.querySelector(`#mass_${Data.MD5}_${eCount}`).innerHTML = Cart[item].mass*Cart[item].items + ` grams`;

      let M = new Model();

      document.querySelector(`#ModelSum`).innerHTML = M.modelStringify([M.ModelSum(JSStore.avail().myCart, JSStore.avail().myRegion, JSStore.avail().Billto)])

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

      if (document.querySelector(`#ModalMyCart`)) {

        let to = document.querySelector(`#ModalMyCart`);

        let ModelSource = to.querySelector(`._sZ2`);

        ModelSource.innerHTML = M.modelStringify([M.MyCart(JSStore.avail().myCart)]);
      }

      if (document.querySelector(`#ModelBilling`)) {

        let to = document.querySelector(`#ModelBilling`);

        let ModelSource = to.querySelector(`._gX0`);

        ModelSource.innerHTML = M.modelStringify([M.billing(JSStore.avail().myCart)]);

        let MA = new Model();

        document.querySelector(`#ModelSum`).innerHTML = MA.modelStringify([MA.ModelSum(JSStore.avail().myCart, JSStore.avail().myRegion, JSStore.avail().Billto)])
      }
    }
  }

  let domServe = () => {

    if (!JSStore.avail().mug || JSStore.avail().mug === false) window.location = `/`;

    else if (JSStore.avail().mug !== false) {

      let ModelSource = document.querySelector(`main`);

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify(JSModel);
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

  S.on(`flutterwave`, J => {

    if (JSStore.avail().log_secs === J.log_secs) {

      if (J.Pay) {

        let M = new Model();

        let ModelSource = document.querySelector(`main`);

        ModelSource.innerHTML = M.modelStringify([M.ModelPay({paygate: J.Pay[2]})]);

      }
    }
  });;

  S.on(`pullPays`, J => {

    if (JSStore.avail().log_secs === J.log_secs) {

      let M = new Model();

      let ModelSource = document.querySelector(`main`);

      ModelSource.innerHTML = M.modelStringify(J.ModelPullPays);

    }
  })
})();