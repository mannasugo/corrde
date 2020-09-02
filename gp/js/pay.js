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
    
      let AJX = (navigator.msie && intval(navigator.version) < 10) ? window.XDomainRequest : window.XMLHttpRequest;

      let Ajax = new XHR();

      let req = `https://www.pesapal.com/API/PostPesapalDirectOrderV4`;

      let ReqString = 
        `oauth_consumer_key=Pj4NoJh0Onuadd6l/ml60SF7nPhyPXi8
        `
      
      Ajax.open('POST', req, true);

      Ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      
      Ajax.onload = () => {
      
        /*if (call.status == 200) {
          if (call.responseText.length > 0) {
          Controller.callReturn = call.responseText; 
        } else {
          Controller.callReturn = null;
        }
        (act) ? act.onCall(): null;
      }*/
      };

      Ajax.send(ReqString);


          
          /*AJXReq([
            `https://www.pesapal.com/API/PostPesapalDirectOrderV4?oauth_consumer_key=Pj4NoJh0Onuadd6l/ml60SF7nPhyPXi8&`, 
            `StockSet`], JSStore.avail(), (A, B) => {

            if (B.exit === true) window.location = `/store/${JSStore.avail().store_log_md5}/`;
          });*/
    }
  }
 
  let e0 = e => {

    e = e.target;

    foldSettings(e);

    payChannel();

  }

  document.addEventListener(`click`, e0);

  //document.addEventListener(`DOMLOADED`, () => {

    payCart();
  //})
})();