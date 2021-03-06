`use strict`;

(function () {

  const S = io(),

    MJS = new Model(),

    Route = history;

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

    else if (e.id === `ShipBy`) {

      let g = (gArray, gBugs) => navigator.geolocation.getCurrentPosition(a => {gArray(a)}, b => {gBugs(b)});

      let gArray = (Geo) => {

        let G = Geo.coords;

        if (typeof G.latitude === `number` && typeof G.longitude === `number`) JSStore.to({gArray: [G.longitude, G.latitude]});
      }

      let M = new Model();

      let ModelSource = document.querySelector(`main`);

      ModelSource.innerHTML = M.modelStringify([M.ModelPaygate()]);

      JSStore.to({gArray: [], log_secs: new Date().valueOf()})

      g(a => {

        gArray(a);

        //S.emit(`flutterwave`, JSStore.avail());

      }, (b) => {

        //S.emit(`flutterwave`, JSStore.avail());
      });

    }

    else if (e.id === `pullRetailStock`) {

      if (document.querySelector(`#ModalRetailStock`)) {

        document.querySelectorAll(`#ModalRetailStock`).forEach(Source => {
      
          document.querySelector(`#corrde-root > main`).removeChild(Source.parentNode)
        });
      }

      let RetailStock = [];

      let Pull = false;

      if (JSStore.avail().myCart) RetailStock = JSStore.avail().myCart;

      RetailStock.forEach(S => {

        if (S.MD5 === e.getAttribute(`sum`)) Pull = S;
      })

      let ModelSource = document.createElement(`div`);

      let M = new Model();

      AJXReq([`/devs_reqs/`, `pullRetailStock`], {pull: Pull, sum: e.getAttribute(`sum`)}, (A, B) => {

        if (B.exit === true) {

          ModelSource.innerHTML = M.modelStringify([B.ModalRetailStock]);

          document.querySelector(`#corrde-root > main`).appendChild(ModelSource);
        }
      });
    }

    else if (e.id === `pullFile`) {

      e.parentNode.querySelectorAll(`#pullFile`).forEach(Source => {

        Source.style.background = `none`;
      })

      e.style.background = `#54575a`;

      e.parentNode.previousElementSibling.querySelector(`img`).src = `/` + e.getAttribute(`file`);
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

      JSStore.to({locale: e.innerHTML.toLowerCase()});

      document.querySelector(`#localeZone`).innerHTML = JSStore.avail().locale;
          
      AJXReq([`/devs_reqs/`, `localeCookie`], e.innerHTML.toLowerCase(), (A, B) => {

        if (B.exit === true) window.location = `/store/${JSStore.avail().route.replace(new RegExp(`u/0026`, `g`), `&`)}`;
      });
    }

    else if (e.id === `getRegion`) {

      JSStore.to({Billto: [e.innerHTML.toLowerCase(), false], myRegion: JSStore.avail().regionMeta});

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

    else if (e.id === `DelRetailStock`) {

      document.querySelector(`#corrde-root > main`).removeChild(document.querySelector(`#ModalRetailStock`).parentNode)
    }

    else if (e.id === `pullMailFee`) {

      document.querySelector(`#ModalRetailStock`).setAttribute(`class`, `_-Zz`);

      let RetailStock = [];

      let Pull = JSON.parse(e.getAttribute(`data`));

      if (JSStore.avail().myCart) RetailStock = JSStore.avail().myCart;

      RetailStock.forEach(S => {

        if (S.MD5 === e.getAttribute(`sum`)) Pull = S;
      })

      let ModelSource = document.createElement(`div`);

      let M = new Model();
      
      ModelSource.innerHTML = M.modelStringify([M.ModalMailFee([JSStore.avail().regionMeta, Pull])]);

      document.querySelector(`#corrde-root > main`).appendChild(ModelSource);
    }

    else if (e.id === `DelMailFee`) {

      document.querySelector(`#corrde-root > main`).removeChild(document.querySelector(`#ModalMailFee`).parentNode);

      document.querySelector(`#ModalRetailStock`).className = `-Zz`;
    }

    else if (e.id === `gate`) {

      if (e.getAttribute(`for`).toLowerCase() === `intasend`) {

        let M = new Model();

        let ModelSource = document.querySelector(`main`);

        ModelSource.innerHTML = M.modelStringify([M.ModelCustomPay(JSStore.avail())]);

      }
    }

    else if (e.id === `paycustom`) {

      let Payer = document.querySelector(`#payer`).value;

      if (Payer.length < 9 || Payer[0] !== `7`) return;

      JSStore.to({gateway: `intasend`, payer: Payer});

      let M = new Model();

      let ModelSource = document.querySelector(`main`);

      ModelSource.innerHTML = M.modelStringify([M.ModelWait()]);

      AJXReq([`/devs_reqs/`, `paygate`], JSStore.avail(), (A, B) => {

        if (B.exit === true) window.location = `/`;
      });
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

    if (e.id === `alterCart` || (e.id === `pollCartPile` && e.getAttribute(`role`) === `plus`)) {

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

      if (e.id === `pollCartPile`) {

        let toll = ((Data.dollars*Data.swap*Cart[item].items)).toFixed(2);

        e.parentNode.parentNode.parentNode.nextElementSibling.querySelector(`span`).innerHTML = `${Data.swapAlpha} ${toll.toLocaleString()}`;

        e.parentNode.previousElementSibling.querySelector(`span`).innerHTML = Cart[item].items;
      }

      if (e.getAttribute(`role`) === `max`) {

        let toll = ((Data.dollars*Data.swap*Cart[item].items)).toFixed(2);

        e.parentNode.parentNode.parentNode.previousElementSibling.querySelector(`span`).innerHTML = `${Data.swapAlpha} ${toll.toLocaleString()}`;

        e.parentNode.parentNode.parentNode.previousElementSibling.previousElementSibling.querySelector(`span`).innerHTML = Cart[item].items;
      }

      if (document.querySelector(`#myBag`)) {

        let ModelStat = document.querySelector(`#myBag`).querySelector(`span`);

        ModelStat.innerHTML = Cart.length;

        ModelStat.className = `-Zz _aAQ-`;
      }

      if (document.querySelector(`#ModelToast`)) document.querySelector(`#corrde-root`).removeChild(document.querySelector(`#ModelToast`));
              
      let ModelSource = document.createElement(`div`);

      ModelSource.setAttribute(`id`, `ModelToast`);

      let Ma = new Model();

      ModelSource.innerHTML = new Model().modelStringify([Ma.ModelToast()]);

      document.querySelector(`#corrde-root`).appendChild(ModelSource);

      document.querySelector(`#toastAlpha`).innerHTML = `+ ${Data.alpha}`;

      document.querySelector(`#toastPay`).innerHTML = `${Data.swapAlpha} ${(Data.dollars*Data.swap).toFixed(2)}`;

      setTimeout(() => {

        if (document.querySelector(`#ModelToast`)) document.querySelector(`#corrde-root`).removeChild(document.querySelector(`#ModelToast`));
        
      }, 5000);

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

    else if (e.id === `sliceCart` || (e.id === `pollCartPile` && e.getAttribute(`role`) === `minus`)) {

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

      if (e.id === `pollCartPile`) {

        let toll = ((Data.dollars*Data.swap*Cart[item].items)).toFixed(2);

        e.parentNode.parentNode.parentNode.nextElementSibling.querySelector(`span`).innerHTML = `${Data.swapAlpha} ${toll.toLocaleString()}`;

        e.parentNode.nextElementSibling.querySelector(`span`).innerHTML = Cart[item].items;
      }

      if (document.querySelector(`#myBag`)) {
        
        let ModelStat = document.querySelector(`#myBag`).querySelector(`span`);

        ModelStat.className = `_-Zz _aAQ-`;

        if (Cart.length > 0) {

          ModelStat.innerHTML = Cart.length;

          ModelStat.className = `-Zz _aAQ-`;
        }
      }

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

    if (!JSStore.avail().locale) {

      document.querySelector(`#ModelZones`).className = `-Zz`;
    }

    else if (JSStore.avail().locale && JSStore.avail().locale !== `global`) {

      if (JSStore.avail().locale !== `kenya`) return;

      let ModelSource = document.querySelector(`main`);

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify(JSModel);

      let Source = document.querySelector(`#myBag`);

      Source.setAttribute(`style`, `margin:0 15px;width:24px;height:24px;position:relative;overflow:visible;text-indent:unset`);

      let ModelStat = Source.appendChild(document.createElement(`span`));

      ModelStat.className = `_-Zz _aAQ-`;

      if (JSStore.avail().myCart && JSStore.avail().myCart.length > 0) {

        ModelStat.innerHTML = JSStore.avail().myCart.length;

        ModelStat.className = `_aAQ-`
      }

      document.querySelector(`#localeZone`).innerHTML = JSStore.avail().locale;
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

      JSStore.to({regionMeta: J.regions})

      let ModelSource = document.querySelector(`main`);

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify(J.ModelRetailSet);
    }
  });

  S.on(`flutterwave`, J => {

    if (JSStore.avail().log_secs === J.log_secs) {

      if (J.Pay) {

        let M = new Model();

        let ModelSource = document.querySelector(`main`);

        ModelSource.innerHTML = M.modelStringify([M.ModelPay({paygate: J.Pay[2]})]);

      }
    }
  })
})();