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

  let payCart = () => {

    if (JSStore.avail().payfor.length > 0) {

      let ModelSource = document.querySelector(`#payfor`);

      let JsStack = new Model();

      ModelSource.innerHTML = new Model().modelStringify([JsStack.payCart(JSStore.avail().payfor)]);

    }
  }

  let payChannel = e => {

    if (e.id === `payChannel` && JSStore.avail().payfor.length > 0) {

      //JSStore.to({logSocket_pay: new Date().valueOf()})

      S.emit(`payArgString`, JSStore.avail());
    
      /*let AJX = (navigator.msie && intval(navigator.version) < 10) ? window.XDomainRequest : window.XMLHttpRequest;

      let Ajax = new AJX;
      
      Ajax.open('POST', `https://api.flutterwave.com/v3/payments`, true);

      //Ajax.setRequestHeader(`Authorization`, `Bearer FLWSECK-9da614832e3764fcdfa1eb9914f09d88-X`);

      //Ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      
      Ajax.onload = () => {
      
      };

      let RequestObject = {
        tx_ref: Date.now(),
        amount: 100,
        currency: `USD`,
        redirect_url: `https://corrde.com/pay`,
        payment_options: `account, card, credit, mpesa, banktransfer`,
        meta: {
          consumer_id: JSStore.avail().u_md5,
        },
        customer: {
          email: `mannasugo@gmail.com`,
          name: `Mann Asugo`
        }
      }

      Ajax.send(JSON.stringify({RequestObject}));*/


    }
  }
 
  let e0 = e => {

    e = e.target;

    foldSettings(e);

    payChannel(e);

  }

  document.addEventListener(`click`, e0);

  //document.addEventListener(`DOMLOADED`, () => {

    payCart();
  //})

  S.on(`payArgString`, Arg => {

    if (JSStore.avail().logSocket_pay !== Arg.logSocket) return;
    
    let AJX = (navigator.msie && intval(navigator.version) < 10) ? window.XDomainRequest : window.XMLHttpRequest;

    let Ajax = new AJX;
      
      Ajax.open('POST', Arg.post_to, true);

      Ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      
      Ajax.onload = () => {
      };

      Ajax.send(Arg.query);
  })
})();