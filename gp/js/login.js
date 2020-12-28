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

  let pushCreds = e => {

    if (e.id === `to-app`) {

      let mail = new Auxll().longSlim(document.querySelector(`#mail`).value);

      let pass = new Auxll().longSlim(document.querySelector(`#pass`).value);

      let sign_in_errors = [];

      if (!mail) {

        mail = false;
        sign_in_errors.push(`false_mail_`)
      }

      else if (!pass) {

        pass = false;
        sign_in_errors.push(`false_pass_`);
      }

      if (sign_in_errors.length === 0) {

        JSStore.to({
          [`mail`]: slim(mail),
          [`pass`]: slim(pass)});

        AJXReq([`/devs_reqs/`, `pushCreds`], JSStore.avail(), (A, B) => {

          if (B.exit === true) window.location = `/`
        })
      } 
    }
  }
 
  let e0 = e => {

    e = e.target;

    pushCreds(e);
  }

  document.addEventListener(`click`, e0);
})();