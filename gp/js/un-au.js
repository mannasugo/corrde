`use strict`;

(function () {

  //const REQS = `//corrde-reqs.corrde.com/`;
  const REQS = `/corrde-reqs/ua/`;

  function main (e) {
    let el = e.target;

    if (el.innerHTML === `Sign Up`) setup();
  }

  const setup = () => {
    let req = new Req();

    req.call(`POST`, REQS, {
      title: `setup`,
      JSON: JSON.stringify({}),
      to: () => {
        if (req.req.responseText.length < 1) return;
        createModal(JSON.parse(req.req.responseText));
      }
    });
  }

  const createModal = (model) => {
    delModal;

    let div = document.body.appendChild(document.createElement(`div`));
    div.innerHTML = ``;
    div.innerHTML = new Model().modelString(model)
  }

  const delModal = () => {
    if (document.querySelector(`div > .modal`)) document.body.removeChild(document.querySelector(`div > .modal`).parentNode);
  }

  document.querySelector(`button`).addEventListener(`click`, main); 
})();