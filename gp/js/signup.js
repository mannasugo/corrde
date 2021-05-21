`use strict`;

(function () {

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

  let AddCreds = (e) => {

    if (e.id === `add-u_md5`) {

      let A = new Auxll().longSlim(document.querySelector(`#ini_mail`).value);

      let B = new Auxll().longSlim(document.querySelector(`#pre`).value);

      let C = new Auxll().longSlim(document.querySelector(`#suff`).value);

      let D = new Auxll().longSlim(document.querySelector(`#pass`).value);

      let E = new Auxll().longSlim(document.querySelector(`#call`).value);

      if (A) JSStore.to({ini_mail: slim(document.querySelector(`#ini_mail`).value).replace(new RegExp(/&/g, `g`), `u/0026`)});

      if (B && C) JSStore.to({u_md5_alt: `${slim(document.querySelector(`#pre`).value).replace(new RegExp(/&/g, `g`), `u/0026`)} ${slim(document.querySelector(`#suff`).value).replace(new RegExp(/&/g, `g`), `u/0026`)}`});

      if (D) JSStore.to({ini_pass: slim(document.querySelector(`#pass`).value).replace(new RegExp(/&/g, `g`), `u/0026`)});

      if (E) JSStore.to({cellCall: parseInt(slim(document.querySelector(`#call`).value).replace(new RegExp(/&/g, `g`), `u/0026`))});

      document.querySelector(`#ini_mail`).value = ``;
      document.querySelector(`#call`).value = ``;
      document.querySelector(`#pre`).value = ``;
      document.querySelector(`#suff`).value = ``;
      document.querySelector(`#pass`).value = ``;

      if (A && B && C && D && E) {

        if (JSStore.avail().ini_mail && JSStore.avail().u_md5_alt && JSStore.avail().ini_pass) {
          
          AJXReq([`/devs_reqs/`, `AddCreds`], JSStore.avail(), (A, B) => {

            if (B.exit === true) window.location = `/`;
          }); 
        }
      }
    }
  }
 
  let e0 = e => {

    e = e.target;

    AddCreds(e);
  }

  document.addEventListener(`click`, e0);
})();