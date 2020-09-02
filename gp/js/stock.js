`use strict`;

(function () {

  const S = io.connect();

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

  let foldSettings = e => {

    if (e.id === `del`) {

      let modals = document.querySelectorAll(`[for = 'modal']`);

      for (let i = 0; i < modals.length; i++) {
        
        if (modals[i].className === `_aAY -Zz`) {

          modals[i].setAttribute(`class`, `_aAY _-Zz`);
        }
      }
    }

  }

  let rateStock = e => {

    if (!JSStore.avail().u_md5) return;

    if (e.id === `rateStock`) S.emit(`rateStock`, JSStore.avail());
  }

  let selfCart = () => {

    if (!document.querySelector(`#CartSet`)) return;

    if (!JSStore.avail().cart) JSStore.to({cart: []})

    JSStore.avail().cart.forEach(Stock => {

      if (Stock.store_md5 === JSStore.avail().store_md5 && Stock.stock_md5 === JSStore.avail().stock_md5) {

        document.querySelector(`#CartSet`).innerHTML = `Remove from Cart`;
      }
    })
  }

  let cartSet = e => {

    if (e.id === `CartSet`) {

      if (!JSStore.avail().cart) JSStore.to({cart: []})

      let Cart = [];

      JSStore.avail().cart.forEach(Stock => {

        if (Stock.store_md5 === JSStore.avail().store_md5 && Stock.stock_md5 === JSStore.avail().stock_md5) Cart.push(Stock);

      })

      if (Cart.length > 0) {

        Cart = [];

        document.querySelector(`#CartSet`).innerHTML = `Add to Cart`;

        JSStore.avail().cart.forEach(Stock => {

          if (Stock.stock_md5 !== JSStore.avail().stock_md5) Cart.push(Stock);

        })

        JSStore.to({cart: Cart});

      }

      else {

        Cart = JSStore.avail().cart;

        document.querySelector(`#CartSet`).innerHTML = `Remove from Cart`;

        Cart.push({
          items: 1,
          stock_alt: JSStore.avail().stock_alt,
          stock_img: JSStore.avail().stock_img,
          stock_md5: JSStore.avail().stock_md5,
          stock_USD: JSStore.avail().stock_USD,
          store_md5: JSStore.avail().store_md5
        })

        JSStore.to({cart: Cart})
      }
    }
  }

  let toCartServices = e => {

    if (e.id === `toCartServices`) {

      let cartServices = document.querySelector(`#cartServices`);

      let modals = document.querySelectorAll(`[for = 'modal']`);

      for (let i = 0; i < modals.length; i++) {
        
        if (modals[i].id !== `cartServices` && modals[i].className === `_aAY -Zz`) modals[i].setAttribute(`class`, `_aAY _-Zz`);
      }
        
      if (cartServices.className === `_aAY _-Zz`) cartServices.setAttribute(`class`, `_aAY -Zz`);
        
      else if (cartServices.className === `_aAY -Zz`) cartServices.setAttribute(`class`, `_aAY _-Zz`);

    }
  }

  let toCart = e => {

    if (e.id === `toCartSet` || e.id === `toOrders` || e.id === `toWishlist`) {

      let cartServices = document.querySelector(`#cartServices`);

      let ModelSource = document.querySelector(`#listCart`);

      let JsStack = new Model();

      if (cartServices.className === `_aAY -Zz`) cartServices.setAttribute(`class`, `_aAY _-Zz`);

      let toCart = document.querySelector(`#toCart`);

      if (e.id === `toCartSet`) {

        document.querySelector(`#cartAlt`).innerHTML = `Cart`;

        if (!JSStore.avail().cart) JSStore.to({cart: []})

        ModelSource.innerHTML = new Model().modelStringify([JsStack.listCart(JSStore.avail().cart)]);
      }

      else if (e.id === `toOrders`) document.querySelector(`#cartAlt`).innerHTML = `Orders`;

      else if (e.id === `toWishlist`) document.querySelector(`#cartAlt`).innerHTML = `Wishlist`;
        
      if (toCart.className === `_aAY _-Zz`) toCart.setAttribute(`class`, `_aAY -Zz`);

    }
  }

  let StockAdd = e => {

    if (e.id === `StockAdd`) {

      let For = e.getAttribute(`for`).split(`/`);

      let Cart = JSStore.avail().cart;

      let item;

      Cart.forEach(Stock => {

        if (Stock.store_md5 === For[0] && Stock.stock_md5 === For[1]) item = Cart.indexOf(Stock);
      });

      if (typeof item !== `number`) return;

      Cart[item].items += 1;

      JSStore.to({cart: Cart});

      let ModelSource = document.querySelector(`[item = '${e.getAttribute(`for`)}']`);

      ModelSource.querySelector(`#items`).innerHTML = Cart[item].items;

      ModelSource.querySelector(`#itemsCharge`).innerHTML = `$ ${Cart[item].stock_USD} * ${Cart[item].items}`


    }
  }

  let StockRemove = e => {

    if (e.id === `StockRemove`) {

      let For = e.getAttribute(`for`).split(`/`);

      let Cart = JSStore.avail().cart;

      let item;

      Cart.forEach(Stock => {

        if (Stock.store_md5 === For[0] && Stock.stock_md5 === For[1]) item = Cart.indexOf(Stock);
      });

      if (typeof item !== `number`) return;

      let CartSelf = [];

      let ModelSource = document.querySelector(`[item = '${e.getAttribute(`for`)}']`);

      Cart[item].items -= 1;

      if (Cart[item].items < 1) {

        Cart.forEach(Stock => {

          if (Stock.store_md5 !== For[0] && Stock.stock_md5 !== For[1]) item = CartSelf.push(Stock);
        });

        Cart = CartSelf;

        ModelSource.innerHTML = ``;

        ModelSource.style.display = `none`;
      }

      else {

        ModelSource.querySelector(`#items`).innerHTML = Cart[item].items;

        ModelSource.querySelector(`#itemsCharge`).innerHTML = `$ ${Cart[item].stock_USD} * ${Cart[item].items}`
      }

      JSStore.to({cart: Cart});
    }
  }

  let CartBuy = e => {

    if (e.id === `CartBuy`) {

      if (!JSStore.avail().u_md5) window.location = `/login/`;

      else if (JSStore.avail().u_md5 && JSStore.avail().cart.length > 0) {

        JSStore.to({payfor: JSStore.avail().cart});

        JSStore.to({cart: []});

        window.location = `/pay/`;
      }
    }
  }
 
  let e0 = e => {

    e = e.target;

    foldSettings(e);

    rateStock(e);

    cartSet(e);

    toCartServices(e);

    toCart(e);

    StockAdd(e);

    StockRemove(e);

    CartBuy(e);

  }

  document.addEventListener(`click`, e0);

  //document.addEventListener(`DOMLOADED`, () => {

    selfCart();
  //})

  S.on(`rateStock`, Args => {

    if (Args.stock_md5 === JSStore.avail().stock_md5 && JSStore.avail().u_md5 === Args.u_md5) {

      let rateStock = document.querySelector(`#rateStock`);

      if (rateStock.className === `-_tX HeartsColor`) rateStock.setAttribute(`class`, `-_tX HeartsGray`);

      else if (rateStock.className === `-_tX HeartsGray`) rateStock.setAttribute(`class`, `-_tX HeartsColor`);
    }
  })
})();