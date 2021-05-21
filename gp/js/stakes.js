`use strict`;

(function () {

  const S = io();

  const Route = history;

  const Pull = (Arg) => {

    let Async = new Req();

    Async.call(`POST`, Arg[0][0], {
      title: Arg[0][1],
      JSON: JSON.stringify(Arg[1]),
      to: () => {

        let B = {}, A = {};

        if (Async.req.responseText.length < 1) {
          A[`server_err`] = `Server Error.`;
        }

        if (JSON.parse(Async.req.responseText).err) {
          A[`err`] = JSON.parse(Async.req.responseText).err;
        }

        if (Async.req.responseText.length > 0) {
          B = JSON.parse(Async.req.responseText);
        }

        Arg[2](A, B);
      }
    });
  }

  let ModelDOM = () => {

    let ModelSource = document.querySelector(`main`);

    let M = new Model();

    ModelSource.innerHTML = M.modelStringify(JSModel);

    Pull([[`/devs_reqs/`, `pullSecurities`], {}, (A, B) => {

      if (B.exit === true) {

        let M2 = new Model();

        let Source = document.querySelector(`#ModelPullSecurities`);

        Source.innerHTML = M2.modelStringify([M2.ModelPullSharePay(B), M2.ModelValuation(B)/*, M2.ModelSales(B)*/]);

        let wide = document.querySelector(`#ModelTillState`).clientWidth;

        if (document.querySelector(`#ModelStockState`)) {

          let ymax = document.querySelector(`#ModelStockState`).querySelector(`path`).getAttribute(`ymax`);

          let JS = JSON.parse(document.querySelector(`#ModelStockState`).querySelector(`path`).getAttribute(`data`));

          let line = `M`;

          JS.forEach(Stack => {

            line += (((wide*.94/3600000)*(Stack[0] - (B.secs - 3600000))) - wide*.09).toFixed(2) + ` ` + ((240*.9/ymax.split(`-`)[1])*(ymax.split(`-`)[1] - Stack[1]))/*((215 - (200 - (Stack[1] * 200/ymax))).toFixed(2))*/ + ` `;
          });

          document.querySelector(`#ModelStockState`).querySelector(`path`).setAttribute(`d`, line)
        }

        if (document.querySelector(`#ModelTillState`)) {

          let MAX = document.querySelector(`#ModelTillState`).querySelector(`path`).getAttribute(`ymax`).split(`-`);

          let JS = JSON.parse(document.querySelector(`#ModelTillState`).querySelector(`path`).getAttribute(`data`));

          let line = `M`;

          JS.forEach(Stack => {

            line += (((wide*.87/3600000)*(Stack[0] - (B.secs - 3600000))) + wide*.01).toFixed(2) + ` ` + ((240*MAX[2]/MAX[1])*(MAX[1] - Stack[1])) + ` `;
          });

          document.querySelector(`#ModelTillState`).querySelector(`path`).setAttribute(`d`, line)
        }
      }
    }])
  }

  ModelDOM();

  //setInterval(() => S.emit(`status`, {}), 1000);

  S.on(`status`, J => {

    //console.log(J.secs);
  })
})();